// ============================================================
//  MEEVE MULTICHAT SERVER v2.3
//  Fix TikTok: campos correctos según tiktok-live-connector v1.2.x
//  Fix TTS: edgeTtsGec() corregido — cálculo de ticks de Windows
//    era incorrecto (13 dígitos en vez de 18), causando que
//    Microsoft rechazara el WebSocket con 403 silencioso.
// ============================================================
const express  = require('express');
const http     = require('http');
const https    = require('https');
const { WebSocketServer, WebSocket: NodeWS } = require('ws');
const tmi      = require('tmi.js');

// ── TikTok: carga defensiva ──────────────────────────────────
let TikTokLiveConnection, WebcastEvent, ControlEvent, SignConfig;
try {
  const tt = require('tiktok-live-connector');
  TikTokLiveConnection = tt.TikTokLiveConnection;
  WebcastEvent         = tt.WebcastEvent;
  ControlEvent         = tt.ControlEvent;
  SignConfig           = tt.SignConfig;
  if (!TikTokLiveConnection) throw new Error('TikTokLiveConnection no encontrado. Ejecuta: npm install tiktok-live-connector@latest');
  console.log('[TikTok] tiktok-live-connector cargado OK');
} catch(e) {
  console.log('[TikTok] No disponible:', e.message);
}

const app    = express();
const server = http.createServer(app);
const wss    = new WebSocketServer({ server });

const CONFIG = {
  twitch:        process.env.TWITCH_CHANNEL    || '',
  kick:          process.env.KICK_CHANNEL      || '',
  kickId:        process.env.KICK_CHANNEL_ID   || '',
  tiktok:        process.env.TIKTOK_USERNAME   || '',
  youtubeHandle: (process.env.YOUTUBE_HANDLE   || '').trim(),
  port:          process.env.PORT              || 3000,
  tiktokSession: process.env.TIKTOK_SESSION_ID || null,
  tiktokIdc:     process.env.TIKTOK_TARGET_IDC || null,
  eulerApiKey:   process.env.EULER_API_KEY     || null,
};

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const state = {
  clients:  new Set(),
  tiktok:   { connected: false, lastMsg: 0, instance: null, restartCount: 0 },
  twitch:   { connected: false },
  kick:     { connected: false },
  youtube:  { connected: false, videoId: null },
  msgCount: 0,
};

// ── Utilidades Twitch ────────────────────────────────────────
function parseTwitchEmotes(message, emotesTag) {
  if (!emotesTag || typeof emotesTag !== 'object') return [];
  const result = [];
  for (const [emoteId, positions] of Object.entries(emotesTag)) {
    for (const pos of positions) {
      const [start, end] = pos.split('-').map(Number);
      result.push({ text: message.slice(start, end + 1), url: `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/1.0`, start, end });
    }
  }
  return result.sort((a, b) => a.start - b.start);
}

// ── Avatar caches ────────────────────────────────────────────
const kickAvatarCache = {}, kickAvatarPending = {};
const twitchAvatarCache = {}, twitchAvatarPending = {};

function getTwitchAvatar(username, callback) {
  if (!username) return callback(null);
  const slug = username.toLowerCase();
  if (twitchAvatarCache[slug]) return callback(twitchAvatarCache[slug]);
  if (twitchAvatarPending[slug]) { twitchAvatarPending[slug].push(callback); return; }
  twitchAvatarPending[slug] = [callback];
  const req = https.get(`https://decapi.me/twitch/avatar/${slug}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let body = ''; res.on('data', c => body += c);
    res.on('end', () => {
      const avatar = body.trim().startsWith('http') ? body.trim() : null;
      if (avatar) twitchAvatarCache[slug] = avatar;
      const cbs = twitchAvatarPending[slug] || []; delete twitchAvatarPending[slug];
      cbs.forEach(cb => cb(avatar));
    });
  });
  req.on('error', () => { const cbs = twitchAvatarPending[slug] || []; delete twitchAvatarPending[slug]; cbs.forEach(cb => cb(null)); });
  req.setTimeout(5000, () => req.destroy());
}

function getKickAvatar(username, callback) {
  if (!username) return callback(null);
  const slug = username.toLowerCase();
  if (kickAvatarCache[slug]) return callback(kickAvatarCache[slug]);
  if (kickAvatarPending[slug]) { kickAvatarPending[slug].push(callback); return; }
  kickAvatarPending[slug] = [callback];
  const req = https.get(`https://kick.com/api/v2/channels/${slug}`, { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    let body = ''; res.on('data', c => body += c);
    res.on('end', () => {
      let avatar = null;
      try { const d = JSON.parse(body); avatar = (d.user && (d.user.profile_pic || d.user.profilePic)) || d.profile_pic || null; } catch(e) {}
      if (avatar) kickAvatarCache[slug] = avatar;
      const cbs = kickAvatarPending[slug] || []; delete kickAvatarPending[slug];
      cbs.forEach(cb => cb(avatar));
    });
  });
  req.on('error', () => { const cbs = kickAvatarPending[slug] || []; delete kickAvatarPending[slug]; cbs.forEach(cb => cb(null)); });
  req.setTimeout(8000, () => req.destroy());
}

// ── Broadcast con dedup global por mid ──────────────────────
const _broadcastSeen = new Map();

function broadcast(msg) {
  if (msg.mid) {
    const now = Date.now();
    const last = _broadcastSeen.get(msg.mid);
    if (last && (now - last) < 5000) return;
    _broadcastSeen.set(msg.mid, now);
    if (_broadcastSeen.size > 600) {
      const cutoff = now - 12000;
      for (const [k, v] of _broadcastSeen) { if (v < cutoff) _broadcastSeen.delete(k); }
    }
  }
  const raw = JSON.stringify(msg);
  state.clients.forEach(ws => { if (ws.readyState === 1) ws.send(raw); });
  state.msgCount++;
}

function broadcastStatus() {
  const raw = JSON.stringify({
    type: 'status',
    twitch: state.twitch.connected, kick: state.kick.connected,
    tiktok: state.tiktok.connected, youtube: state.youtube.connected,
    youtubeVideoId: state.youtube.videoId || null,
    channels: { twitch: CONFIG.twitch, kick: CONFIG.kick, tiktok: CONFIG.tiktok, youtube: CONFIG.youtubeHandle }
  });
  state.clients.forEach(ws => { if (ws.readyState === 1) ws.send(raw); });
}

wss.on('connection', (ws) => {
  state.clients.add(ws);
  ws.send(JSON.stringify({
    type: 'status',
    twitch: state.twitch.connected, kick: state.kick.connected,
    tiktok: state.tiktok.connected, youtube: state.youtube.connected,
    youtubeVideoId: state.youtube.videoId || null,
    channels: { twitch: CONFIG.twitch, kick: CONFIG.kick, tiktok: CONFIG.tiktok, youtube: CONFIG.youtubeHandle }
  }));
  ws.on('close', () => state.clients.delete(ws));
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'custom_message')    broadcast({ type: 'custom', platform: 'custom', chatname: msg.user || 'Tú', chatmessage: msg.text, nameColor: '#FF6B9D', mid: 'custom-' + Date.now() });
      if (msg.type === 'highlight')         broadcast({ type: 'highlight', platform: msg.platform || 'custom', chatname: msg.chatname || '', chatmessage: msg.chatmessage || '', chatimg: msg.chatimg || null, nameColor: msg.nameColor || '#FF6B9D', roles: msg.roles || [], chatemotes: msg.chatemotes || [], mid: msg.mid || ('hl-' + Date.now()) });
      if (msg.type === 'highlight_clear')   broadcast({ type: 'highlight_clear' });
      if (msg.type === 'kick_message')      handleKickMessageFromBrowser(msg);
      if (msg.type === 'kick_donation')     handleKickDonationFromBrowser(msg);
      if (msg.type === 'kick_redemption')   handleKickRedemptionFromBrowser(msg);
      if (msg.type === 'kick_disconnected') { state.kick.connected = false; broadcastStatus(); }
      if (msg.type === 'kick_connected')    { state.kick.connected = true;  broadcastStatus(); }
      if (msg.type === 'youtube_connect' && msg.videoId) connectYouTubeApi(msg.videoId);
      if (msg.type === 'youtube_disconnected') disconnectYouTubeApi();
    } catch(e) {}
  });
});

// ══════════════════════════════════════════════════════════════
// TWITCH
// ══════════════════════════════════════════════════════════════
function connectTwitch() {
  if (!CONFIG.twitch) return;
  const client = new tmi.Client({ options: { debug: false }, channels: [CONFIG.twitch] });
  client.connect().catch(() => setTimeout(connectTwitch, 10000));
  client.on('connected',    () => { state.twitch.connected = true;  broadcastStatus(); });
  client.on('disconnected', () => { state.twitch.connected = false; broadcastStatus(); setTimeout(connectTwitch, 5000); });
  client.on('message', (channel, tags, message, self) => {
    if (self) return;
    const badges = tags.badges || {}, roles = [];
    if (badges.broadcaster) roles.push({ type: 'broadcaster', label: 'Streamer' });
    if (badges.moderator)   roles.push({ type: 'moderator',   label: 'Mod' });
    if (badges.vip)         roles.push({ type: 'vip',         label: 'VIP' });
    if (badges.subscriber)  roles.push({ type: 'subscriber',  label: 'Sub' });
    if (badges.founder)     roles.push({ type: 'founder',     label: 'Founder' });
    const chatemotes = parseTwitchEmotes(message, tags.emotes);
    const bitsAmount = tags.bits ? parseInt(tags.bits) : 0;
    const twitchUser = tags['display-name'] || tags.username || '';
    getTwitchAvatar(twitchUser, (avatar) => {
      if (bitsAmount > 0) {
        broadcast({ type: 'donation', platform: 'twitch', donationType: 'bits', chatname: twitchUser, chatmessage: message.replace(/cheer\d+\s*/gi, '').trim() || `${bitsAmount} Bits`, chatemotes, amount: bitsAmount, currency: 'BITS', nameColor: tags.color || '#9146FF', chatimg: avatar || null, roles, mid: 'tw-bits-' + Date.now() });
      } else {
        broadcast({ type: 'twitch', platform: 'twitch', chatname: twitchUser, chatmessage: message, chatemotes, nameColor: tags.color || '#9146FF', chatimg: avatar || null, roles, mid: tags.id || ('tw-' + Date.now()) });
      }
    });
  });
  client.on('subscription',   (ch, u, method, msg, us) => broadcast({ type: 'donation', platform: 'twitch', donationType: 'sub',     chatname: us['display-name'] || u, chatmessage: msg || 'Nuevo suscriptor', subPlan: method?.plan || 'Prime', nameColor: us?.color || '#9146FF', chatimg: null, mid: 'tw-sub-'      + Date.now() }));
  client.on('resub',          (ch, u, months, msg, us, methods) => broadcast({ type: 'donation', platform: 'twitch', donationType: 'resub',   chatname: us['display-name'] || u, chatmessage: msg || `${months} meses`, months, subPlan: methods?.plan || 'Prime', nameColor: us?.color || '#9146FF', chatimg: null, mid: 'tw-resub-'    + Date.now() }));
  client.on('subgift',        (ch, u, s, recipient, methods, us) => broadcast({ type: 'donation', platform: 'twitch', donationType: 'subgift', chatname: us['display-name'] || u, chatmessage: `Regaló una sub a ${recipient}`, recipient, subPlan: methods?.plan || '1000', nameColor: us?.color || '#9146FF', chatimg: null, mid: 'tw-gift-'     + Date.now() }));
  client.on('submysterygift', (ch, u, num, methods, us) =>         broadcast({ type: 'donation', platform: 'twitch', donationType: 'subgift', chatname: us['display-name'] || u, chatmessage: `Regaló ${num} subs`, amount: num, nameColor: us?.color || '#9146FF', chatimg: null, mid: 'tw-massgift-' + Date.now() }));
}

// ══════════════════════════════════════════════════════════════
// KICK
// ══════════════════════════════════════════════════════════════
app.get('/api/kick/channel-id',  (req, res) => res.json({ kickId: CONFIG.kickId || null, channel: CONFIG.kick }));
app.post('/api/kick/channel-id', (req, res) => {
  const { channelId } = req.body;
  if (!channelId) return res.status(400).json({ error: 'channelId requerido' });
  CONFIG.kickId = String(channelId);
  res.json({ ok: true, kickId: CONFIG.kickId });
});

function handleKickMessageFromBrowser(data) {
  if (!data.chatname && !data.chatmessage) return;
  const username = data.chatname || 'Unknown';
  const mid = data.mid || ('kick-' + Date.now());
  if (data.chatimg) {
    broadcast({ type: 'kick', platform: 'kick', chatname: username, chatmessage: data.chatmessage, nameColor: data.nameColor || '#53FC18', chatimg: data.chatimg, roles: data.roles || [], chatemotes: data.chatemotes || [], mid });
  } else {
    getKickAvatar(username, (avatar) => broadcast({ type: 'kick', platform: 'kick', chatname: username, chatmessage: data.chatmessage, nameColor: data.nameColor || '#53FC18', chatimg: avatar || null, roles: data.roles || [], chatemotes: data.chatemotes || [], mid }));
  }
}
function handleKickDonationFromBrowser(data) {
  getKickAvatar(data.chatname || 'Unknown', (avatar) => broadcast({ type: 'donation', platform: 'kick', donationType: data.donationType || 'giftedsub', chatname: data.chatname || 'Unknown', chatmessage: data.chatmessage || '', amount: data.amount || null, currency: data.currency || null, months: data.months || null, nameColor: data.nameColor || '#53FC18', chatimg: avatar || null, roles: data.roles || [], mid: data.mid || ('kick-don-' + Date.now()) }));
}
function handleKickRedemptionFromBrowser(data) {
  getKickAvatar(data.chatname || 'Unknown', (avatar) => broadcast({ type: 'redemption', platform: 'kick', chatname: data.chatname || 'Unknown', chatmessage: data.chatmessage || '', rewardTitle: data.rewardTitle || '', rewardCost: data.rewardCost || 0, nameColor: data.nameColor || '#53FC18', chatimg: avatar || null, mid: data.mid || ('kick-redeem-' + Date.now()) }));
}

const PUSHER_URLS = [
  'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false',
  'wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false',
];
let kickPusherWs = null, kickRetryDelay = 5000, kickRetryTimeout = null, kickUrlIndex = 0, kickPingInterval = null;

async function resolveKickChannelId(channelName) {
  return new Promise((resolve) => {
    const req = https.get(`https://kick.com/api/v2/channels/${channelName.toLowerCase()}`, { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = ''; res.on('data', c => body += c);
      res.on('end', () => { try { const d = JSON.parse(body); resolve(String((d.chatroom && d.chatroom.id) || d.id || '') || null); } catch(e) { resolve(null); } });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(10000, () => { req.destroy(); resolve(null); });
  });
}

async function connectKick() {
  if (!CONFIG.kick) return;
  if (!CONFIG.kickId) {
    const id = await resolveKickChannelId(CONFIG.kick);
    if (!id) { kickRetryTimeout = setTimeout(connectKick, 60000); return; }
    CONFIG.kickId = id;
    console.log(`[Kick] Chatroom ID: ${CONFIG.kickId}`);
  }
  tryKickPusher(CONFIG.kickId);
}

function tryKickPusher(channelId) {
  if (kickPusherWs) { try { kickPusherWs.terminate(); } catch(e) {} kickPusherWs = null; }
  if (kickPingInterval) { clearInterval(kickPingInterval); kickPingInterval = null; }
  const url = PUSHER_URLS[kickUrlIndex % PUSHER_URLS.length];
  let ws;
  try { ws = new NodeWS(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }); }
  catch(e) { kickRetryTimeout = setTimeout(() => { kickUrlIndex++; tryKickPusher(channelId); }, kickRetryDelay); return; }
  kickPusherWs = ws;

  ws.on('open', () => {
    kickRetryDelay = 5000;
    ws.send(JSON.stringify({ event: 'pusher:subscribe', data: { auth: '', channel: `chatrooms.${channelId}.v2` } }));
    kickPingInterval = setInterval(() => { if (ws.readyState === 1) ws.send(JSON.stringify({ event: 'pusher:ping', data: {} })); }, 25000);
  });

  ws.on('message', (raw) => {
    let msg; try { msg = JSON.parse(raw); } catch(e) { return; }
    const event = msg.event || '';
    if (event === 'pusher:connection_established' || event === 'pusher:pong') return;
    if (event === 'pusher_internal:subscription_succeeded') { console.log(`[Kick] Conectado chatroom ${channelId}`); state.kick.connected = true; broadcastStatus(); return; }
    if (event === 'pusher:error') { ws.terminate(); return; }
    let d; try { d = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data; } catch(e) { return; }
    if (!d) return;

    if (event === 'App\\Events\\ChatMessageEvent' || event === 'App.Events.ChatMessageEvent') {
      const sender = d.sender || {}, username = sender.username || 'KickUser', content = d.content || '';
      const badges = (sender.identity && sender.identity.badges) || [], nameColor = (sender.identity && sender.identity.color) || '#53FC18';
      const kickRoles = [];
      badges.forEach(b => {
        const bt = (b.type || '').toLowerCase();
        if (bt === 'broadcaster' || bt === 'owner') kickRoles.push({ type: 'broadcaster', label: 'Owner' });
        else if (bt === 'moderator' || bt === 'mod') kickRoles.push({ type: 'moderator', label: 'Mod' });
        else if (bt === 'vip') kickRoles.push({ type: 'vip', label: 'VIP' });
        else if (bt === 'subscriber' || bt === 'sub') kickRoles.push({ type: 'subscriber', label: 'Sub' });
        else kickRoles.push({ type: bt, label: b.type });
      });
      getKickAvatar(username, (avatar) => broadcast({ type: 'kick', platform: 'kick', chatname: username, chatmessage: content, nameColor, chatimg: avatar || null, roles: kickRoles, mid: d.id || ('kick-' + Date.now()) }));
      return;
    }
    if (event === 'App\\Events\\GiftedSubscriptionsEvent' || event === 'App.Events.GiftedSubscriptionsEvent') {
      const gifter = (d.gifted_by && d.gifted_by.username) || 'Anónimo', qty = (d.gifted_usernames && d.gifted_usernames.length) || 1;
      getKickAvatar(gifter, (avatar) => broadcast({ type: 'donation', platform: 'kick', donationType: 'giftedsub', chatname: gifter, chatmessage: `Regaló ${qty} sub${qty > 1 ? 's' : ''}`, amount: qty, chatimg: avatar || null, nameColor: '#53FC18', roles: [], mid: 'kick-gift-' + Date.now() }));
      return;
    }
    if (event === 'App\\Events\\SubscriptionEvent' || event === 'App.Events.SubscriptionEvent') {
      const uname = (d.usernames && d.usernames[0]) || 'KickUser', months = d.months || 1;
      getKickAvatar(uname, (avatar) => broadcast({ type: 'donation', platform: 'kick', donationType: months > 1 ? 'resub' : 'sub', chatname: uname, chatmessage: months > 1 ? `Resub ${months} meses` : 'Se suscribió', months, chatimg: avatar || null, nameColor: '#53FC18', roles: [], mid: 'kick-sub-' + Date.now() }));
      return;
    }
    if (event === 'App\\Events\\ChannelPointsRedemptionEvent' || event === 'App.Events.ChannelPointsRedemptionEvent') {
      const user = d.user || d.sender || {}, username = user.username || 'KickUser';
      const rewardTitle = (d.reward && d.reward.title) || 'Canje', rewardCost = (d.reward && d.reward.cost) || 0;
      const userInput = d.user_input || '', nameColor = (user.identity && user.identity.color) || '#53FC18';
      getKickAvatar(username, (avatar) => broadcast({ type: 'redemption', platform: 'kick', chatname: username, chatmessage: userInput ? `[${rewardTitle}] ${userInput}` : `[${rewardTitle}]`, rewardTitle, rewardCost, nameColor, chatimg: avatar || null, mid: 'kick-redeem-' + (d.id || Date.now()) }));
      return;
    }
  });

  ws.on('close', () => {
    if (kickPingInterval) { clearInterval(kickPingInterval); kickPingInterval = null; }
    state.kick.connected = false; broadcastStatus();
    kickUrlIndex++; kickRetryDelay = Math.min(kickRetryDelay * 1.5, 60000);
    kickRetryTimeout = setTimeout(() => tryKickPusher(channelId), kickRetryDelay);
  });
  ws.on('error', (e) => console.error('[Kick] WS error:', e.message));
}

// ══════════════════════════════════════════════════════════════
// TIKTOK v1.2.x
// ══════════════════════════════════════════════════════════════

let ttRetryDelay = 15000, ttRetryTimeout = null;

function getTikTokAvatar(user) {
  if (!user) return null;
  return user.profilePictureUrl
    || (Array.isArray(user.profilePictureUrls) && user.profilePictureUrls[0])
    || null;
}

async function connectTikTokConnector() {
  if (!CONFIG.tiktok || !TikTokLiveConnection) return;
  const username = CONFIG.tiktok.startsWith('@') ? CONFIG.tiktok.slice(1) : CONFIG.tiktok;

  if (state.tiktok.instance) { try { state.tiktok.instance.disconnect(); } catch(e) {} state.tiktok.instance = null; }
  if (ttRetryTimeout) { clearTimeout(ttRetryTimeout); ttRetryTimeout = null; }

  if (CONFIG.eulerApiKey && SignConfig) SignConfig.apiKey = CONFIG.eulerApiKey;

  const opts = {
    processInitialData:     false,
    enableExtendedGiftInfo: true,
  };

  if (CONFIG.tiktokSession && CONFIG.tiktokIdc) {
    opts.sessionId   = CONFIG.tiktokSession;
    opts.ttTargetIdc = CONFIG.tiktokIdc;
    console.log('[TikTok] Conectando con sessionId + ttTargetIdc');
  } else if (CONFIG.tiktokSession) {
    opts.sessionId = CONFIG.tiktokSession;
    console.log('[TikTok] Conectando con sessionId (sin ttTargetIdc)');
  } else {
    console.log('[TikTok] Conectando sin autenticacion');
  }

  let conn;
  try {
    conn = new TikTokLiveConnection(username, opts);
  } catch(e) {
    console.error('[TikTok] Error creando conexion:', e.message);
    ttRetryTimeout = setTimeout(connectTikTokConnector, ttRetryDelay);
    return;
  }
  state.tiktok.instance = conn;
  conn.on('error', (err) => console.error('[TikTok] Error interno:', err?.message || err));

  try {
    await conn.connect();
    state.tiktok.connected = true;
    state.tiktok.lastMsg   = Date.now();
    ttRetryDelay = 15000;
    broadcastStatus();
    console.log('[TikTok] Conectado a @' + username);
  } catch(e) {
    const msg = e?.message || String(e);
    console.error('[TikTok] Error al conectar:', msg);
    state.tiktok.connected = false;
    broadcastStatus();
    let delay = 30000;
    if (msg.includes('LIVE_NOT_FOUND') || msg.includes('not live'))  delay = 60000;
    else if (msg.includes('403') || msg.includes('Forbidden'))       delay = 300000;
    else if (msg.includes('captcha') || msg.includes('Captcha'))     delay = 180000;
    else delay = Math.min(ttRetryDelay * 1.5, 60000);
    ttRetryDelay = delay;
    ttRetryTimeout = setTimeout(connectTikTokConnector, delay);
    return;
  }

  conn.on(WebcastEvent.CHAT, (data) => {
    state.tiktok.lastMsg = Date.now();
    const uniqueId  = data.user?.uniqueId  || data.uniqueId  || 'TikToker';
    const userId    = data.user?.userId    || data.userId    || uniqueId;
    const avatar    = getTikTokAvatar(data.user);
    const mid = data.msgId ? `tt-msg-${data.msgId}` : `tt-${userId}-${Date.now()}`;
    broadcast({
      type:        'tiktok',
      platform:    'tiktok',
      chatname:    uniqueId,
      chatmessage: data.comment || '',
      chatimg:     avatar,
      nameColor:   '#FF0050',
      mid,
    });
  });

  conn.on(WebcastEvent.GIFT, (data) => {
    state.tiktok.lastMsg = Date.now();
    const giftType = data.giftDetails?.giftType ?? data.giftType;
    if (giftType === 1 && !data.repeatEnd) return;

    const uniqueId  = data.user?.uniqueId || data.uniqueId || 'TikToker';
    const userId    = data.user?.userId   || data.userId   || uniqueId;
    const avatar    = getTikTokAvatar(data.user);

    const giftName = data.giftDetails?.giftName
      || data.giftDetails?.name
      || data.giftName
      || `Gift #${data.giftId}`;

    const diamondCount = data.giftDetails?.diamondCount
      || data.giftDetails?.diamond_count
      || data.diamondCount
      || 0;

    const qty   = data.repeatCount || 1;
    const total = diamondCount * qty;

    broadcast({
      type:        'donation',
      platform:    'tiktok',
      donationType:'gift',
      chatname:    uniqueId,
      chatmessage: `Envió ${qty}x ${giftName}${total > 0 ? ` (${total} 💎)` : ''}`,
      giftName,
      amount:      total,
      currency:    'DIAMONDS',
      quantity:    qty,
      chatimg:     avatar,
      nameColor:   '#FF0050',
      mid: `tt-gift-${data.giftId}-${userId}-${qty}`,
    });
  });

  conn.on(WebcastEvent.SUBSCRIBE, (data) => {
    const uniqueId = data.user?.uniqueId || data.uniqueId || 'TikToker';
    const userId   = data.user?.userId   || uniqueId;
    const avatar   = getTikTokAvatar(data.user);
    broadcast({
      type:        'donation',
      platform:    'tiktok',
      donationType:'sub',
      chatname:    uniqueId,
      chatmessage: 'Se suscribió',
      chatimg:     avatar,
      nameColor:   '#FF0050',
      mid: `tt-sub-${userId}-${Date.now()}`,
    });
  });

  const onDisconnect = () => {
    console.log('[TikTok] Desconectado');
    state.tiktok.connected = false;
    broadcastStatus();
    ttRetryTimeout = setTimeout(connectTikTokConnector, ttRetryDelay);
  };
  if (ControlEvent?.DISCONNECTED) conn.on(ControlEvent.DISCONNECTED, onDisconnect);
  else conn.on('disconnected', onDisconnect);
}

setInterval(() => {
  if (state.tiktok.connected && state.tiktok.lastMsg > 0 && Date.now() - state.tiktok.lastMsg > 180000) {
    console.log('[TikTok] Watchdog: sin mensajes por 3 min, reconectando...');
    state.tiktok.connected = false;
    broadcastStatus();
    connectTikTokConnector();
  }
}, 60000);

// ══════════════════════════════════════════════════════════════
// YOUTUBE
// ══════════════════════════════════════════════════════════════
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
let ytPollState = { active: false, videoId: null, liveChatId: null, pageToken: null, pollTimer: null, errorCount: 0, seenIds: new Set() };

async function ytApiGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.get(`https://www.googleapis.com/youtube/v3/${path}&key=${YOUTUBE_API_KEY}`, { headers: { 'Accept': 'application/json' } }, (res) => {
      let body = ''; res.on('data', c => body += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, data: JSON.parse(body) }); } catch(e) { reject(new Error('JSON parse')); } });
    });
    req.on('error', reject); req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function getLiveChatId(videoId) {
  const r = await ytApiGet(`videos?part=liveStreamingDetails&id=${videoId}`);
  if (r.status !== 200) throw new Error(`API error ${r.status}`);
  const items = r.data.items; if (!items || !items.length) throw new Error('Video no encontrado');
  const details = items[0].liveStreamingDetails;
  if (!details || !details.activeLiveChatId) throw new Error('Sin chat en vivo activo');
  return details.activeLiveChatId;
}

async function pollYouTubeChat() {
  if (!ytPollState.active || !ytPollState.liveChatId || !YOUTUBE_API_KEY) return;
  try {
    let path = `liveChat/messages?part=snippet,authorDetails&liveChatId=${ytPollState.liveChatId}&maxResults=200`;
    if (ytPollState.pageToken) path += `&pageToken=${ytPollState.pageToken}`;
    const r = await ytApiGet(path);
    if (r.status === 403) { state.youtube.connected = false; broadcastStatus(); ytPollState.active = false; return; }
    if (r.status !== 200) throw new Error(`HTTP ${r.status}`);
    ytPollState.errorCount = 0;
    const data = r.data; if (data.nextPageToken) ytPollState.pageToken = data.nextPageToken;
    (data.items || []).forEach(item => {
      const id = item.id; if (!id || ytPollState.seenIds.has(id)) return;
      ytPollState.seenIds.add(id); if (ytPollState.seenIds.size > 1000) { const arr = Array.from(ytPollState.seenIds); ytPollState.seenIds = new Set(arr.slice(arr.length - 500)); }
      const snippet = item.snippet || {}, author = item.authorDetails || {};
      const msgType = snippet.type || '', name = author.displayName || 'YouTuber', avatar = author.profileImageUrl || null;
      const roles = [];
      if (author.isChatOwner) roles.push({ type: 'broadcaster', label: 'Streamer' });
      if (author.isChatModerator) roles.push({ type: 'moderator', label: 'Mod' });
      if (author.isChatSponsor) roles.push({ type: 'member', label: 'Miembro' });
      if (msgType === 'superChatEvent') { const sc = snippet.superChatDetails || {}; broadcast({ type: 'donation', platform: 'youtube', donationType: 'superchat', chatname: name, chatmessage: sc.userComment || 'Superchat', chatimg: avatar, nameColor: '#FF0000', amount: (sc.amountMicros || 0) / 1000000, amountDisplay: sc.amountDisplayString || '', roles, mid: 'yt-sc-' + id }); return; }
      if (msgType === 'memberMilestoneChatEvent' || msgType === 'newSponsorEvent') { broadcast({ type: 'donation', platform: 'youtube', donationType: 'member', chatname: name, chatmessage: snippet.memberMilestoneChatDetails?.userComment || 'Nuevo Miembro', chatimg: avatar, nameColor: '#FF0000', roles, mid: 'yt-mb-' + id }); return; }
      if (msgType === 'textMessageEvent') { const msgText = snippet.textMessageDetails?.messageText || ''; if (!msgText) return; broadcast({ type: 'youtube', platform: 'youtube', chatname: name, chatmessage: msgText, chatimg: avatar, nameColor: '#FF0000', roles, mid: 'yt-' + id }); }
    });
    const interval = Math.max((data.pollingIntervalMillis || 5000), 3000);
    if (ytPollState.active) ytPollState.pollTimer = setTimeout(pollYouTubeChat, interval);
  } catch(e) {
    ytPollState.errorCount++;
    if (ytPollState.errorCount > 5) { state.youtube.connected = false; ytPollState.active = false; broadcastStatus(); return; }
    if (ytPollState.active) ytPollState.pollTimer = setTimeout(pollYouTubeChat, 15000);
  }
}

async function connectYouTubeApi(videoId) {
  if (ytPollState.pollTimer) { clearTimeout(ytPollState.pollTimer); ytPollState.pollTimer = null; }
  ytPollState.active = false; ytPollState.pageToken = null; ytPollState.errorCount = 0;
  if (!YOUTUBE_API_KEY) { broadcast({ type: 'system', platform: 'system', chatname: 'Sistema', chatmessage: 'Falta YOUTUBE_API_KEY', nameColor: '#ffaa00', mid: 'sys-yt-' + Date.now() }); return; }
  state.youtube.videoId = videoId;
  try {
    const liveChatId = await getLiveChatId(videoId);
    ytPollState.liveChatId = liveChatId; ytPollState.videoId = videoId; ytPollState.active = true;
    state.youtube.connected = true; state.youtube.videoId = videoId;
    console.log(`[YouTube] Conectado: ${liveChatId}`); broadcastStatus();
    ytPollState.pollTimer = setTimeout(pollYouTubeChat, 2000);
  } catch(e) {
    state.youtube.connected = false; state.youtube.videoId = null; broadcastStatus();
    broadcast({ type: 'system', platform: 'system', chatname: 'Sistema', chatmessage: 'YouTube: ' + e.message, nameColor: '#ff4444', mid: 'sys-yt-' + Date.now() });
  }
}

function disconnectYouTubeApi() {
  ytPollState.active = false; if (ytPollState.pollTimer) { clearTimeout(ytPollState.pollTimer); ytPollState.pollTimer = null; }
  ytPollState.liveChatId = null; ytPollState.pageToken = null; ytPollState.videoId = null;
  state.youtube.connected = false; state.youtube.videoId = null; broadcastStatus();
}

// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// TTS — via Python edge-tts (proceso hijo)
//
// El WebSocket directo a speech.platform.bing.com devuelve 403
// desde IPs de datacenter (Render, Railway, etc.).
// La librería Python `edge-tts` maneja esto correctamente con
// headers y reconexiones adecuadas.
//
// Render incluye Python 3 por defecto. Solo necesita:
//   pip install edge-tts   (o agregarlo al build command)
// ══════════════════════════════════════════════════════════════
const { spawn, execSync } = require('child_process');
const os   = require('os');
const path = require('path');
const fs   = require('fs');

const EDGE_TTS_VOICES = {
  'Edge Alvaro':               'es-ES-AlvaroNeural',
  'Edge Ximena':               'es-MX-DaliaNeural',
  'Google Translate Español':  'es-ES-AlvaroNeural',
  'Edge Jorge':                'es-MX-JorgeNeural',
  'Edge Aria':                 'en-US-AriaNeural',
  'Edge Guy':                  'en-US-GuyNeural',
  'Edge Jenny':                'en-US-JennyNeural',
  'Edge Andrew':               'en-US-AndrewNeural',
  'Edge Ava':                  'en-US-AvaNeural',
  'Edge Raquel':               'pt-PT-RaquelNeural',
  'Edge Francisca':            'pt-BR-FranciscaNeural',
  'Edge Antonio':              'pt-BR-AntonioNeural',
  'Google Translate Português':'pt-BR-AntonioNeural',
};

// ── Detectar Python y módulo edge_tts ───────────────────────
// Usamos `python3 -m edge_tts` en lugar del binario `edge-tts`
// para evitar problemas de PATH en Render/Railway.
let edgeTtsAvailable = false;
let edgeTtsPython    = 'python3';  // o 'python'

function detectEdgeTts() {
  // 1. Encontrar el ejecutable de Python
  const pythonCandidates = ['python3', 'python'];
  let pythonBin = null;
  for (const p of pythonCandidates) {
    try { execSync(`${p} --version`, { stdio: 'ignore', timeout: 3000 }); pythonBin = p; break; } catch(e) {}
  }
  if (!pythonBin) { console.warn('[TTS] Python no encontrado'); return; }
  edgeTtsPython = pythonBin;

  // 2. Verificar si edge_tts ya está instalado
  try {
    execSync(`${pythonBin} -c "import edge_tts"`, { stdio: 'ignore', timeout: 5000 });
    edgeTtsAvailable = true;
    console.log(`[TTS] edge_tts listo (${pythonBin} -m edge_tts)`);
    return;
  } catch(e) {}

  // 3. Instalar automáticamente
  console.log('[TTS] Instalando edge-tts via pip...');
  try {
    execSync(`${pythonBin} -m pip install edge-tts --quiet`, { timeout: 90000, stdio: 'pipe' });
    edgeTtsAvailable = true;
    console.log('[TTS] edge-tts instalado correctamente');
  } catch(e) {
    // Último intento con --break-system-packages
    try {
      execSync(`${pythonBin} -m pip install edge-tts --quiet --break-system-packages`, { timeout: 90000, stdio: 'pipe' });
      edgeTtsAvailable = true;
      console.log('[TTS] edge-tts instalado (break-system-packages)');
    } catch(e2) {
      console.warn('[TTS] No se pudo instalar edge-tts:', e2.message.slice(0, 120));
    }
  }
}
detectEdgeTts();

// ── Caché en memoria ─────────────────────────────────────────
const ttsMemCache = new Map();
const TTS_CACHE_MAX = 60;

// ── Generar audio via `python3 -m edge_tts` ──────────────────
// Usa el módulo directamente, sin depender del binario en PATH.
function edgeTtsGenerate(text, voiceName, rate, callback) {
  const rateNum = parseFloat(rate) || 1.0;
  const ratePct = (rateNum >= 1 ? '+' : '') + Math.round((rateNum - 1) * 100) + '%';

  // Script Python inline que escribe MP3 a stdout
  const pyScript = `
import asyncio, sys, edge_tts
async def run():
    c = edge_tts.Communicate(sys.argv[1], sys.argv[2], rate=sys.argv[3])
    async for chunk in c.stream():
        if chunk['type'] == 'audio':
            sys.stdout.buffer.write(chunk['data'])
asyncio.run(run())
`.trim();

  const args = ['-c', pyScript, text.slice(0, 500), voiceName, ratePct];
  const proc  = spawn(edgeTtsPython, args, { timeout: 25000 });
  const chunks = [];
  let   errOut = '';

  proc.stdout.on('data', d => chunks.push(d));
  proc.stderr.on('data', d => { errOut += d.toString(); });
  proc.on('close', code => {
    const buf = Buffer.concat(chunks);
    if (code === 0 && buf.length > 100) {
      callback(null, buf);
    } else {
      callback(new Error(errOut.trim().slice(0, 200) || `exit ${code}, buf=${buf.length}b`), null);
    }
  });
  proc.on('error', e => callback(e, null));
}

app.post('/api/tts', (req, res) => {
  const { text, voice, rate } = req.body;
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text requerido' });

  if (!edgeTtsAvailable) {
    return res.status(503).json({ error: 'edge-tts no disponible en el servidor. Ejecuta: pip install edge-tts' });
  }

  const voiceName = EDGE_TTS_VOICES[voice] || EDGE_TTS_VOICES['Edge Alvaro'];
  const rateNum   = parseFloat(rate) || 1.0;
  const rateDelta = Math.round((rateNum - 1.0) * 100);
  const ratePct   = (rateDelta >= 0 ? '+' : '') + rateDelta + '%';
  const textClean = text.toLowerCase().slice(0, 500);
  const cacheKey  = `${voiceName}|${ratePct}|${textClean}`;

  // Servir desde caché si existe
  if (ttsMemCache.has(cacheKey)) {
    const cached = ttsMemCache.get(cacheKey);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    return res.end(cached);
  }

  edgeTtsGenerate(textClean, voiceName, rateNum, (err, buf) => {
    if (err) {
      console.error('[TTS] Error edge-tts:', err.message);
      if (!res.headersSent) return res.status(500).json({ error: err.message });
      return res.end();
    }
    // Cachear
    if (ttsMemCache.size >= TTS_CACHE_MAX) ttsMemCache.delete(ttsMemCache.keys().next().value);
    ttsMemCache.set(cacheKey, buf);
    console.log(`[TTS] OK — ${voiceName} [${ratePct}] "${textClean.slice(0, 40)}..."`);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    res.end(buf);
  });
});

app.get('/api/tts/status', (req, res) => res.json({
  available: edgeTtsAvailable,
  engine:    edgeTtsAvailable ? 'edge-tts-python' : 'unavailable',
  bin:       edgeTtsPython,
  voices:    Object.keys(EDGE_TTS_VOICES),
}));

// ══════════════════════════════════════════════════════════════
// ENDPOINTS
// ══════════════════════════════════════════════════════════════
app.get('/health', (req, res) => res.json({ ok: true, uptime: Math.floor(process.uptime()), messages: state.msgCount, clients: state.clients.size, twitch: state.twitch.connected, kick: state.kick.connected, tiktok: state.tiktok.connected, youtube: state.youtube.connected }));
app.get('/api/status', (req, res) => res.json({ twitch: { connected: state.twitch.connected, channel: CONFIG.twitch }, kick: { connected: state.kick.connected, channel: CONFIG.kick }, tiktok: { connected: state.tiktok.connected, user: CONFIG.tiktok }, youtube: { connected: state.youtube.connected, videoId: state.youtube.videoId }, clients: state.clients.size, messages: state.msgCount, uptime: Math.floor(process.uptime()) }));
app.post('/api/tiktok/restart', (req, res) => { state.tiktok.connected = false; state.tiktok.restartCount++; ttRetryDelay = 15000; broadcastStatus(); connectTikTokConnector(); res.json({ ok: true, restarts: state.tiktok.restartCount }); });
app.post('/api/kick/restart', (req, res) => { if (kickRetryTimeout) clearTimeout(kickRetryTimeout); state.kick.connected = false; CONFIG.kickId = process.env.KICK_CHANNEL_ID || ''; broadcastStatus(); connectKick(); res.json({ ok: true }); });
app.post('/api/youtube/restart', (req, res) => { if (state.youtube.videoId) { connectYouTubeApi(state.youtube.videoId); res.json({ ok: true }); } else res.json({ ok: false }); });
app.post('/api/youtube/connect', (req, res) => { const { videoId } = req.body; if (!videoId) return res.status(400).json({ error: 'videoId requerido' }); connectYouTubeApi(videoId); res.json({ ok: true, videoId }); });
app.post('/api/youtube/disconnect', (req, res) => { disconnectYouTubeApi(); res.json({ ok: true }); });

// ══════════════════════════════════════════════════════════════
// START
// ══════════════════════════════════════════════════════════════
server.listen(CONFIG.port, () => {
  console.log(`\nMEEVE MULTICHAT SERVER v2.3`);
  console.log(`Puerto   : ${CONFIG.port}`);
  console.log(`Twitch   : ${CONFIG.twitch || '(no config)'}`);
  console.log(`Kick     : ${CONFIG.kick || '(no config)'} (ID: ${CONFIG.kickId || 'auto'})`);
  console.log(`TikTok   : ${CONFIG.tiktok || '(no config)'} ${CONFIG.tiktokSession ? '[sessionId OK]' : '[sin sessionId]'} ${CONFIG.tiktokIdc ? `[idc: ${CONFIG.tiktokIdc}]` : ''}`);
  console.log(`YouTube  : ${YOUTUBE_API_KEY ? 'API key OK' : 'FALTA YOUTUBE_API_KEY'}`);
  console.log(`Euler    : ${CONFIG.eulerApiKey ? 'API key OK' : '(sin key - usando servicio publico)'}\n`);
  connectTwitch();
  connectKick();
  connectTikTokConnector();
});
