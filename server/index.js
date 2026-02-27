// ============================================================
//  MEEVE MULTICHAT SERVER
//  Fix: Kick avatar resuelto via kick.com/api/v2 en el servidor
//  (el evento Pusher de Kick NO incluye foto de perfil)
// ============================================================

const express    = require('express');
const http       = require('http');
const https      = require('https');
const { WebSocketServer, WebSocket } = require('ws');
const tmi        = require('tmi.js');

let WebcastPushConnection;
try {
  ({ WebcastPushConnection } = require('tiktok-live-connector'));
} catch(e) {
  console.log('[TikTok] tiktok-live-connector no disponible');
}

const app    = express();
const server = http.createServer(app);
const wss    = new WebSocketServer({ server });

// ── CONFIG ───────────────────────────────────────────────────
const CONFIG = {
  twitch:     process.env.TWITCH_CHANNEL  || '',
  kick:       process.env.KICK_CHANNEL    || '',
  kickId:     process.env.KICK_CHANNEL_ID || '',
  tiktok:     process.env.TIKTOK_USERNAME || '',
  port:       process.env.PORT            || 3000,
  tiktokMode: process.env.TIKTOK_MODE     || 'connector',
};

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── ESTADO ───────────────────────────────────────────────────
const state = {
  clients:  new Set(),
  tiktok:   { connected: false, lastMsg: 0, instance: null, restartCount: 0 },
  twitch:   { connected: false },
  kick:     { connected: false },
  msgCount: 0,
};

// ══════════════════════════════════════════════════════════════
// KICK AVATAR CACHE
// El evento Pusher de Kick solo manda: id, username, slug, identity
// NO incluye profile_pic. Lo resolvemos via kick.com/api/v2/channels/{slug}
// y cacheamos en memoria para no repetir llamadas.
// ══════════════════════════════════════════════════════════════
const kickAvatarCache   = {};  // slug → avatarUrl
const kickAvatarPending = {};  // slug → [callbacks]

function getKickAvatar(username, callback) {
  if (!username) return callback(null);
  const slug = username.toLowerCase();

  if (kickAvatarCache[slug])   return callback(kickAvatarCache[slug]);
  if (kickAvatarPending[slug]) { kickAvatarPending[slug].push(callback); return; }

  kickAvatarPending[slug] = [callback];

  const url = `https://kick.com/api/v2/channels/${slug}`;
  console.log(`[Kick Avatar] Resolviendo avatar para: ${slug}`);

  const req = https.get(url, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      let avatar = null;
      try {
        const data = JSON.parse(body);
        // kick.com/api/v2/channels/{slug} → data.user.profile_pic
        avatar = (data.user && (data.user.profile_pic || data.user.profilePic))
               || data.profile_pic
               || null;
      } catch(e) {}

      if (avatar) {
        kickAvatarCache[slug] = avatar;
        console.log(`[Kick Avatar] ✅ ${slug} → ${avatar.substring(0, 50)}...`);
      } else {
        console.log(`[Kick Avatar] ⚠️  No se encontró avatar para: ${slug}`);
      }

      const cbs = kickAvatarPending[slug] || [];
      delete kickAvatarPending[slug];
      cbs.forEach(cb => cb(avatar));
    });
  });

  req.on('error', (e) => {
    console.error(`[Kick Avatar] Error para ${slug}:`, e.message);
    const cbs = kickAvatarPending[slug] || [];
    delete kickAvatarPending[slug];
    cbs.forEach(cb => cb(null));
  });

  req.setTimeout(8000, () => {
    req.destroy();
    console.warn(`[Kick Avatar] Timeout para: ${slug}`);
  });
}

// ── BROADCAST ────────────────────────────────────────────────
function broadcast(msg) {
  const raw = JSON.stringify(msg);
  state.clients.forEach(ws => {
    if (ws.readyState === 1) ws.send(raw);
  });
  state.msgCount++;
}

function broadcastStatus() {
  broadcast({
    type:    'status',
    twitch:  state.twitch.connected,
    kick:    state.kick.connected,
    tiktok:  state.tiktok.connected,
    tiktokMode: CONFIG.tiktokMode,
    channels: {
      twitch:  CONFIG.twitch,
      kick:    CONFIG.kick,
      tiktok:  CONFIG.tiktok,
    }
  });
}

// ── WEBSOCKET CLIENTS ────────────────────────────────────────
wss.on('connection', (ws) => {
  state.clients.add(ws);
  console.log(`[WS] Cliente conectado. Total: ${state.clients.size}`);

  ws.send(JSON.stringify({
    type: 'status',
    twitch:  state.twitch.connected,
    kick:    state.kick.connected,
    tiktok:  state.tiktok.connected,
    tiktokMode: CONFIG.tiktokMode,
    channels: { twitch: CONFIG.twitch, kick: CONFIG.kick, tiktok: CONFIG.tiktok }
  }));

  ws.on('close', () => {
    state.clients.delete(ws);
    console.log(`[WS] Cliente desconectado. Total: ${state.clients.size}`);
  });

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);

      if (msg.type === 'custom_message') {
        broadcast({
          type: 'custom', platform: 'custom',
          chatname: msg.user || 'Tú',
          chatmessage: msg.text,
          nameColor: '#FF6B9D',
          mid: 'custom-' + Date.now(),
        });
      }

      if (msg.type === 'kick_message') {
        handleKickMessageFromBrowser(msg);
      }

      if (msg.type === 'kick_disconnected') {
        state.kick.connected = false;
        broadcastStatus();
      }

      if (msg.type === 'kick_connected') {
        state.kick.connected = true;
        broadcastStatus();
      }

    } catch(e) {}
  });
});

// ── TWITCH IRC ───────────────────────────────────────────────
function connectTwitch() {
  if (!CONFIG.twitch) return console.log('[Twitch] Sin canal configurado');

  const client = new tmi.Client({
    options: { debug: false },
    channels: [CONFIG.twitch],
  });

  client.connect().catch(err => {
    console.error('[Twitch] Error conectando:', err.message);
    setTimeout(connectTwitch, 10000);
  });

  client.on('connected', () => {
    state.twitch.connected = true;
    console.log('[Twitch] ✅ Conectado a #' + CONFIG.twitch);
    broadcastStatus();
  });

  client.on('disconnected', () => {
    state.twitch.connected = false;
    broadcastStatus();
    setTimeout(connectTwitch, 5000);
  });

  client.on('message', (channel, tags, message, self) => {
    if (self) return;
    const badges = tags.badges || {};
    const roles = [];
    if (badges.broadcaster)    roles.push({ type: 'broadcaster', label: 'Streamer' });
    if (badges.moderator)      roles.push({ type: 'moderator',   label: 'Mod' });
    if (badges.vip)            roles.push({ type: 'vip',         label: 'VIP' });
    if (badges.subscriber)     roles.push({ type: 'subscriber',  label: 'Sub' });
    if (badges.founder)        roles.push({ type: 'founder',     label: 'Founder' });
    if (badges['bits-leader']) roles.push({ type: 'bits',        label: 'Bits' });

    broadcast({
      type:        'twitch',
      platform:    'twitch',
      chatname:    tags['display-name'] || tags.username,
      chatmessage: message,
      nameColor:   tags.color || '#9146FF',
      chatimg:     tags['profile-image-url'] || null,
      roles,
      mid:         tags.id || ('tw-' + Date.now()),
    });
  });
}

// ── KICK ─────────────────────────────────────────────────────
app.get('/api/kick/channel-id', (req, res) => {
  res.json({ kickId: CONFIG.kickId || null, channel: CONFIG.kick });
});

app.post('/api/kick/channel-id', (req, res) => {
  const { channelId } = req.body;
  if (!channelId) return res.status(400).json({ error: 'channelId requerido' });
  CONFIG.kickId = String(channelId);
  console.log('[Kick] Channel ID guardado:', CONFIG.kickId);
  res.json({ ok: true, kickId: CONFIG.kickId });
});

// El dashboard reenvía mensajes de Kick recibidos via Pusher en el navegador.
// El evento Pusher NO incluye profile_pic, así que lo resolvemos aquí via API.
function handleKickMessageFromBrowser(data) {
  if (!data.chatname && !data.chatmessage) return;

  const username = data.chatname || 'Unknown';

  getKickAvatar(username, (avatar) => {
    broadcast({
      type:        'kick',
      platform:    'kick',
      chatname:    username,
      chatmessage: data.chatmessage,
      nameColor:   data.nameColor || '#53FC18',
      chatimg:     avatar || null,   // ← avatar resuelto via API
      roles:       data.roles || [],
      mid:         data.mid || ('kick-' + Date.now()),
    });
  });
}

function connectKick() {
  if (!CONFIG.kick) return console.log('[Kick] Sin canal configurado');
  console.log('[Kick] ⚠️  Conexión gestionada desde el navegador del dashboard.');
  state.kick.connected = false;
  broadcastStatus();
}

// ── TIKTOK ───────────────────────────────────────────────────
async function connectTikTokConnector() {
  if (!CONFIG.tiktok) return console.log('[TikTok] Sin usuario configurado');
  if (!WebcastPushConnection) { console.log('[TikTok] ❌ tiktok-live-connector no instalado'); return; }

  const username = CONFIG.tiktok.startsWith('@') ? CONFIG.tiktok : '@' + CONFIG.tiktok;
  console.log('[TikTok] Conectando a', username);

  if (state.tiktok.instance) {
    try { state.tiktok.instance.disconnect(); } catch(e) {}
    state.tiktok.instance = null;
  }

  const conn = new WebcastPushConnection(username, {
    processInitialData: false,
    enableExtendedGiftInfo: false,
    enableWebsocketUpgrade: true,
    requestPollingIntervalMs: 2000,
    sessionId: process.env.TIKTOK_SESSION_ID || undefined,
    requestOptions: {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }
  });

  state.tiktok.instance = conn;

  try {
    const info = await conn.connect();
    state.tiktok.connected = true;
    state.tiktok.lastMsg   = Date.now();
    console.log('[TikTok] ✅ Conectado. Room ID:', info?.roomId || 'unknown');
    broadcastStatus();
  } catch(e) {
    console.error('[TikTok] ❌ Falló:', e.message);
    broadcastStatus();
    const delay = e.message?.includes('LIVE_NOT_FOUND') ? 60000
                : e.message?.includes('429')            ? 120000
                : e.message?.includes('403')            ? 300000
                : 15000;
    setTimeout(() => connectTikTokConnector(), delay);
    return;
  }

  conn.on('chat', (data) => {
    state.tiktok.lastMsg = Date.now();
    broadcast({
      type:        'tiktok',
      platform:    'tiktok',
      chatname:    data.uniqueId || data.nickname || 'TikToker',
      chatmessage: data.comment,
      chatimg:     data.profilePictureUrl || null,
      nameColor:   '#FF0050',
      mid:         'tt-' + Date.now() + '-' + Math.random(),
    });
  });

  conn.on('disconnected', () => {
    state.tiktok.connected = false;
    broadcastStatus();
    setTimeout(() => connectTikTokConnector(), 10000);
  });

  conn.on('error', (e) => console.error('[TikTok] Error:', e?.message || e));
}

// Watchdog TikTok
setInterval(() => {
  if (state.tiktok.connected && state.tiktok.lastMsg > 0 &&
      Date.now() - state.tiktok.lastMsg > 3 * 60 * 1000) {
    console.log('[TikTok] Sin mensajes por 3min, reconectando...');
    state.tiktok.connected = false;
    broadcastStatus();
    connectTikTokConnector();
  }
}, 60000);

// ── HTTP ENDPOINTS ───────────────────────────────────────────
app.get('/health', (req, res) => res.json({
  ok: true,
  uptime:   Math.floor(process.uptime()),
  messages: state.msgCount,
  clients:  state.clients.size,
  twitch:   state.twitch.connected,
  kick:     state.kick.connected,
  tiktok:   state.tiktok.connected,
  kickAvatarsCached: Object.keys(kickAvatarCache).length,
}));

app.get('/tiktok-preview', (req, res) => {
  const user = CONFIG.tiktok || req.query.user || '';
  res.send(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>TikTok Preview</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0f0f0f;color:#fff;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:20px;text-align:center;padding:20px;}a{display:inline-block;margin-top:10px;background:#FF0050;color:#fff;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:16px;}</style>
</head><body><div style="font-size:60px">🎵</div><h2>TikTok no permite embeds</h2>
${user ? `<a href="https://www.tiktok.com/@${user}/live" target="_blank" rel="noopener">🔴 Ver @${user} en vivo</a>` : ''}
</body></html>`);
});

app.post('/api/tiktok/restart', (req, res) => {
  state.tiktok.connected = false;
  state.tiktok.restartCount++;
  broadcastStatus();
  connectTikTokConnector();
  res.json({ ok: true, restarts: state.tiktok.restartCount });
});

app.get('/api/status', (req, res) => res.json({
  twitch:  { connected: state.twitch.connected, channel: CONFIG.twitch },
  kick:    { connected: state.kick.connected,   channel: CONFIG.kick, kickId: CONFIG.kickId, avatarsCached: Object.keys(kickAvatarCache).length },
  tiktok:  { connected: state.tiktok.connected, user: CONFIG.tiktok, mode: CONFIG.tiktokMode, lastMsg: state.tiktok.lastMsg },
  clients: state.clients.size,
  messages: state.msgCount,
  uptime:  Math.floor(process.uptime()),
}));

// ── ARRANCAR ─────────────────────────────────────────────────
server.listen(CONFIG.port, () => {
  console.log(`\n🎮 MEEVE MULTICHAT SERVER`);
  console.log(`   Puerto  : ${CONFIG.port}`);
  console.log(`   Twitch  : ${CONFIG.twitch  || '(no config)'}`);
  console.log(`   Kick    : ${CONFIG.kick    || '(no config)'}`);
  console.log(`   TikTok  : ${CONFIG.tiktok  || '(no config)'} [${CONFIG.tiktokMode}]`);
  console.log(`   Health  : /health\n`);

  connectTwitch();
  connectKick();
  connectTikTokConnector();
});
