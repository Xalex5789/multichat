// ============================================================
//  MEEVE MULTICHAT SERVER
//  Render.com deployment | Node.js + WebSocket
// ============================================================

const express    = require('express');
const http       = require('http');
const { WebSocketServer } = require('ws');
const tmi        = require('tmi.js');
const { WebcastPushConnection } = require('tiktok-live-connector');
// Puppeteer desactivado en plan Free — usar TIKTOK_MODE=connector

const app    = express();
const server = http.createServer(app);
const wss    = new WebSocketServer({ server });

// ── CONFIG ───────────────────────────────────────────────────
const CONFIG = {
  twitch:  process.env.TWITCH_CHANNEL  || '',
  kick:    process.env.KICK_CHANNEL    || '',     // nombre del canal kick (slug)
  kickId:  process.env.KICK_CHANNEL_ID || '',     // ID numérico (auto-resolver si falta)
  tiktok:  process.env.TIKTOK_USERNAME || '',
  port:    process.env.PORT            || 3000,
  tiktokMode: process.env.TIKTOK_MODE || 'connector',   // 'connector' | 'puppeteer'
};

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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

// ── BROADCAST ────────────────────────────────────────────────
function broadcast(msg) {
  const raw = JSON.stringify(msg);
  state.clients.forEach(ws => {
    if (ws.readyState === 1) ws.send(raw);
  });
  state.msgCount++;
}

// ── WEBSOCKET CLIENTS ────────────────────────────────────────
wss.on('connection', (ws, req) => {
  state.clients.add(ws);
  console.log(`[WS] Cliente conectado. Total: ${state.clients.size}`);

  // Enviar estado actual al cliente recién conectado
  ws.send(JSON.stringify({
    type: 'status',
    twitch:  state.twitch.connected,
    kick:    state.kick.connected,
    tiktok:  state.tiktok.connected,
    tiktokMode: CONFIG.tiktokMode,
    channels: {
      twitch:  CONFIG.twitch,
      kick:    CONFIG.kick,
      tiktok:  CONFIG.tiktok,
    }
  }));

  ws.on('close', () => {
    state.clients.delete(ws);
    console.log(`[WS] Cliente desconectado. Total: ${state.clients.size}`);
  });

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      // Mensaje de chat propio (custom) enviado desde el dashboard
      if (msg.type === 'custom_message') {
        broadcast({
          type: 'custom',
          platform: 'custom',
          chatname: msg.user || 'Tú',
          chatmessage: msg.text,
          nameColor: '#FF6B9D',
          mid: 'custom-' + Date.now(),
        });
      }
    } catch (e) {}
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
    console.log('[Twitch] ❌ Desconectado, reconectando...');
    broadcastStatus();
    setTimeout(connectTwitch, 5000);
  });

  client.on('message', (channel, tags, message, self) => {
    if (self) return;
    broadcast({
      type:        'twitch',
      platform:    'twitch',
      chatname:    tags['display-name'] || tags.username,
      chatmessage: message,
      nameColor:   tags.color || '#9146FF',
      chatimg:     tags['profile-image-url'] || null,
      mid:         tags.id || ('tw-' + Date.now()),
    });
  });
}

// ── KICK (Pusher WebSocket) ──────────────────────────────────
async function resolveKickId() {
  if (CONFIG.kickId) return CONFIG.kickId;
  try {
    const r = await fetch(`https://kick.com/api/v1/channels/${CONFIG.kick}`);
    const d = await r.json();
    CONFIG.kickId = String(d.chatroom?.id || d.id || '');
    console.log('[Kick] Channel ID resuelto:', CONFIG.kickId);
    return CONFIG.kickId;
  } catch (e) {
    console.error('[Kick] No se pudo resolver el ID:', e.message);
    return null;
  }
}

async function connectKick() {
  if (!CONFIG.kick) return console.log('[Kick] Sin canal configurado');

  const channelId = await resolveKickId();
  if (!channelId) return setTimeout(connectKick, 15000);

  const { default: WebSocket } = await import('ws').catch(() => ({ default: require('ws') }));
  // Usar módulo ws nativo
  const W = require('ws');
  const ws = new W(
    'wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false'
  );

  ws.on('open', () => {
    ws.send(JSON.stringify({
      event: 'pusher:subscribe',
      data:  { channel: `chatrooms.${channelId}.v2` }
    }));
    state.kick.connected = true;
    console.log('[Kick] ✅ Suscrito a chatroom', channelId);
    broadcastStatus();
  });

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.event === 'App\\Events\\ChatMessageEvent') {
        const d = JSON.parse(msg.data);
        broadcast({
          type:        'kick',
          platform:    'kick',
          chatname:    d.sender?.username || 'Unknown',
          chatmessage: d.content,
          nameColor:   '#53FC18',
          mid:         d.id || ('kick-' + Date.now()),
        });
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    state.kick.connected = false;
    broadcastStatus();
    console.log('[Kick] Desconectado, reconectando en 5s...');
    setTimeout(connectKick, 5000);
  });

  ws.on('error', (e) => {
    console.error('[Kick] Error WS:', e.message);
    ws.close();
  });

  // Ping para mantener viva la conexión Pusher
  setInterval(() => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ event: 'pusher:ping', data: {} }));
    }
  }, 30000);
}

// ── TIKTOK — MODO CONNECTOR ──────────────────────────────────
async function connectTikTokConnector() {
  if (!CONFIG.tiktok) return console.log('[TikTok] Sin usuario configurado');

  const username = CONFIG.tiktok.startsWith('@') ? CONFIG.tiktok : '@' + CONFIG.tiktok;
  console.log('[TikTok] Conectando con tiktok-live-connector a', username);

  const conn = new WebcastPushConnection(username, {
    processInitialData: false,
    enableExtendedGiftInfo: true,
    enableWebsocketUpgrade: true,
    requestPollingIntervalMs: 2000,
  });

  state.tiktok.instance = conn;

  try {
    await conn.connect();
    state.tiktok.connected = true;
    state.tiktok.lastMsg   = Date.now();
    console.log('[TikTok] ✅ Conectado vía connector');
    broadcastStatus();
  } catch (e) {
    console.error('[TikTok] ❌ Connector falló:', e.message);
    console.log('[TikTok] Intentando reconexión en 15s...');
    broadcastStatus();
    setTimeout(() => connectTikTokConnector(), 15000);
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
    console.log('[TikTok] Connector desconectado, reconectando...');
    setTimeout(() => connectTikTokConnector(), 8000);
  });

  conn.on('error', (e) => {
    console.error('[TikTok] Error connector:', e.message);
  });
}

// ── TIKTOK — MODO PUPPETEER (desactivado en plan Free) ───────
async function connectTikTokPuppeteer() {
  console.log('[TikTok] Puppeteer no disponible en plan Free. Usando connector.');
  await connectTikTokConnector();
}

// ── TIKTOK INIT (elige modo) ─────────────────────────────────
async function connectTikTok() {
  if (CONFIG.tiktokMode === 'puppeteer') {
    await connectTikTokPuppeteer();
  } else {
    await connectTikTokConnector().catch(async (e) => {
      console.log('[TikTok] Connector no disponible, usando Puppeteer:', e.message);
      await connectTikTokPuppeteer();
    });
  }
}

// ── AUTO-RECONEXIÓN TIKTOK (watchdog) ───────────────────────
setInterval(() => {
  // Si TikTok lleva más de 2 min sin mensajes y estaba conectado → reconectar
  const noMsgTimeout = 2 * 60 * 1000;
  if (state.tiktok.connected && state.tiktok.lastMsg > 0 &&
      Date.now() - state.tiktok.lastMsg > noMsgTimeout) {
    console.log('[TikTok] Sin mensajes por 2min, reconectando...');
    state.tiktok.connected = false;
    broadcastStatus();
    connectTikTok();
  }
}, 60000);

// ── BROADCAST STATUS ─────────────────────────────────────────
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

// ── HTTP ENDPOINTS ───────────────────────────────────────────
// Health para UptimeRobot
app.get('/health', (req, res) => res.json({
  ok: true,
  uptime:   Math.floor(process.uptime()),
  messages: state.msgCount,
  clients:  state.clients.size,
  twitch:   state.twitch.connected,
  kick:     state.kick.connected,
  tiktok:   state.tiktok.connected,
}));

// Preview TikTok — iframe accesible desde el dashboard
app.get('/tiktok-preview', (req, res) => {
  const user = CONFIG.tiktok || '';
  res.send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>*{margin:0;padding:0;background:#000;}iframe{width:100vw;height:100vh;border:none;}</style>
</head><body>
<iframe src="https://www.tiktok.com/@${user}/live" allow="autoplay" allowfullscreen></iframe>
</body></html>`);
});

// Restart TikTok manualmente desde el dashboard
app.post('/api/tiktok/restart', (req, res) => {
  console.log('[API] Restart TikTok solicitado');
  state.tiktok.connected = false;
  state.tiktok.restartCount++;
  broadcastStatus();
  connectTikTok();
  res.json({ ok: true, restarts: state.tiktok.restartCount });
});

// Estado general
app.get('/api/status', (req, res) => res.json({
  twitch:  { connected: state.twitch.connected,  channel: CONFIG.twitch },
  kick:    { connected: state.kick.connected,    channel: CONFIG.kick },
  tiktok:  { connected: state.tiktok.connected,  user: CONFIG.tiktok, mode: CONFIG.tiktokMode, lastMsg: state.tiktok.lastMsg },
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
  console.log(`   Health  : /health`);
  console.log(`   Preview : /tiktok-preview\n`);

  connectTwitch();
  connectKick();
  connectTikTok();
});
