// ============================================================
//  MEEVE MULTICHAT SERVER — FIXED para Render/Railway
//  Fixes: Kick via Pusher directo, TikTok connector mejorado
// ============================================================

const express    = require('express');
const http       = require('http');
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
  twitch:  process.env.TWITCH_CHANNEL  || '',
  kick:    process.env.KICK_CHANNEL    || '',
  kickId:  process.env.KICK_CHANNEL_ID || '',
  tiktok:  process.env.TIKTOK_USERNAME || '',
  port:    process.env.PORT            || 3000,
  tiktokMode: process.env.TIKTOK_MODE  || 'connector',
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
  tiktok:   { connected: false, lastMsg: 0, instance: null, restartCount: 0, retrying: false },
  twitch:   { connected: false },
  kick:     { connected: false, ws: null, retrying: false },
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
wss.on('connection', (ws, req) => {
  state.clients.add(ws);
  console.log(`[WS] Cliente conectado. Total: ${state.clients.size}`);

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

// ── KICK — múltiples métodos de fallback ─────────────────────

// Método 1: API pública de Kick para resolver el channel ID
async function resolveKickChannelId() {
  if (CONFIG.kickId) return CONFIG.kickId;

  // Intentar varios endpoints de Kick
  const endpoints = [
    `https://kick.com/api/v2/channels/${CONFIG.kick}`,
    `https://kick.com/api/v1/channels/${CONFIG.kick}`,
  ];

  for (const url of endpoints) {
    try {
      const r = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Referer': 'https://kick.com',
        },
        signal: AbortSignal.timeout(8000),
      });

      if (!r.ok) continue;
      const d = await r.json();
      const id = String(d.chatroom?.id || d.id || '');
      if (id) {
        CONFIG.kickId = id;
        console.log('[Kick] ✅ Channel ID resuelto:', id, 'via', url);
        return id;
      }
    } catch (e) {
      console.log('[Kick] Endpoint falló:', url, '-', e.message);
    }
  }

  return null;
}

// Método Pusher con reintentos y ping mejorado
async function connectKick() {
  if (!CONFIG.kick) return console.log('[Kick] Sin canal configurado');
  if (state.kick.retrying) return;
  state.kick.retrying = true;

  const channelId = await resolveKickChannelId();
  state.kick.retrying = false;

  if (!channelId) {
    console.error('[Kick] ❌ No se pudo resolver el Channel ID. Reintentando en 30s...');
    console.log('[Kick] 💡 Tip: Configura KICK_CHANNEL_ID manualmente en las variables de entorno.');
    console.log('[Kick] 💡 Para encontrar tu ID: abre kick.com/' + CONFIG.kick + ', F12 → Network → busca "chatrooms"');
    setTimeout(connectKick, 30000);
    return;
  }

  _connectKickWS(channelId);
}

function _connectKickWS(channelId, attempt = 1) {
  // Pusher US2 — servidor público de Kick
  const pusherUrl = 'wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false';

  let ws;
  try {
    ws = new WebSocket(pusherUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://kick.com',
      }
    });
  } catch(e) {
    console.error('[Kick] No se pudo crear WebSocket:', e.message);
    const delay = Math.min(5000 * attempt, 60000);
    setTimeout(() => _connectKickWS(channelId, attempt + 1), delay);
    return;
  }

  state.kick.ws = ws;
  let pingInterval = null;

  ws.on('open', () => {
    // Suscribirse al chatroom de Kick
    ws.send(JSON.stringify({
      event: 'pusher:subscribe',
      data:  { auth: '', channel: `chatrooms.${channelId}.v2` }
    }));

    state.kick.connected = true;
    console.log(`[Kick] ✅ Suscrito al chatroom ${channelId} (intento #${attempt})`);
    broadcastStatus();

    // Ping cada 25s para mantener viva la conexión
    pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ event: 'pusher:ping', data: {} }));
      }
    }, 25000);
  });

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);

      if (msg.event === 'pusher:connection_established') {
        console.log('[Kick] Pusher conectado');
        return;
      }

      if (msg.event === 'pusher:pong') return;

      if (msg.event === 'App\\Events\\ChatMessageEvent') {
        const d = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
        broadcast({
          type:        'kick',
          platform:    'kick',
          chatname:    d.sender?.username || d.sender?.slug || 'Unknown',
          chatmessage: d.content,
          nameColor:   d.sender?.identity?.color || '#53FC18',
          chatimg:     d.sender?.profile_pic || null,
          mid:         d.id || ('kick-' + Date.now()),
        });
      }

      // Otros eventos de Kick (subs, bans, etc.) — ignorar silenciosamente
    } catch (e) {}
  });

  ws.on('close', (code, reason) => {
    state.kick.connected = false;
    broadcastStatus();
    if (pingInterval) clearInterval(pingInterval);

    const delay = Math.min(5000 * Math.min(attempt, 6), 60000);
    console.log(`[Kick] Desconectado (code: ${code}). Reconectando en ${delay/1000}s...`);
    setTimeout(() => _connectKickWS(channelId, attempt + 1), delay);
  });

  ws.on('error', (e) => {
    console.error('[Kick] Error WS:', e.message);
    // El evento 'close' se disparará después
  });
}

// ── TIKTOK — CONNECTOR (mejorado para cloud) ─────────────────
async function connectTikTokConnector() {
  if (!CONFIG.tiktok) return console.log('[TikTok] Sin usuario configurado');
  if (!WebcastPushConnection) {
    console.log('[TikTok] ❌ tiktok-live-connector no instalado');
    return;
  }

  const username = CONFIG.tiktok.startsWith('@') ? CONFIG.tiktok : '@' + CONFIG.tiktok;
  console.log('[TikTok] Conectando con tiktok-live-connector a', username);

  // Limpiar instancia anterior
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
    // Opciones para evitar bloqueos en cloud
    requestOptions: {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    }
  });

  state.tiktok.instance = conn;

  try {
    const state_info = await conn.connect();
    state.tiktok.connected = true;
    state.tiktok.lastMsg   = Date.now();
    console.log('[TikTok] ✅ Conectado. Room ID:', state_info?.roomId || 'unknown');
    broadcastStatus();
  } catch (e) {
    console.error('[TikTok] ❌ Connector falló:', e.message);

    // Diagnóstico de error
    if (e.message?.includes('LIVE_NOT_FOUND') || e.message?.includes('not found')) {
      console.log('[TikTok] ⚠️  El usuario no está en live ahora mismo. Reintentando en 60s...');
      broadcastStatus();
      setTimeout(() => connectTikTokConnector(), 60000);
    } else if (e.message?.includes('429') || e.message?.includes('rate limit')) {
      console.log('[TikTok] ⚠️  Rate limit. Esperando 2 minutos...');
      broadcastStatus();
      setTimeout(() => connectTikTokConnector(), 120000);
    } else if (e.message?.includes('403') || e.message?.includes('blocked')) {
      console.log('[TikTok] ⚠️  IP bloqueada por TikTok. Necesitas TIKTOK_SESSION_ID.');
      console.log('[TikTok] 💡 Cómo obtener sessionid: kick.com → F12 → Application → Cookies → sessionid');
      broadcastStatus();
      // Reintento largo si IP bloqueada
      setTimeout(() => connectTikTokConnector(), 300000); // 5 min
    } else {
      console.log('[TikTok] Reintentando en 15s...');
      broadcastStatus();
      setTimeout(() => connectTikTokConnector(), 15000);
    }
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
    console.log('[TikTok] Connector desconectado, reconectando en 10s...');
    setTimeout(() => connectTikTokConnector(), 10000);
  });

  conn.on('error', (e) => {
    console.error('[TikTok] Error connector:', e?.message || e);
  });
}

async function connectTikTok() {
  await connectTikTokConnector();
}

// ── WATCHDOG TIKTOK ───────────────────────────────────────────
setInterval(() => {
  const noMsgTimeout = 3 * 60 * 1000; // 3 min
  if (state.tiktok.connected && state.tiktok.lastMsg > 0 &&
      Date.now() - state.tiktok.lastMsg > noMsgTimeout) {
    console.log('[TikTok] Sin mensajes por 3min, reconectando...');
    state.tiktok.connected = false;
    broadcastStatus();
    connectTikTok();
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
}));

// Preview TikTok — proxy simple para evitar el bloqueo de iframe
// En lugar de iframe, abre una nueva ventana en el cliente
app.get('/tiktok-preview', (req, res) => {
  const user = CONFIG.tiktok || req.query.user || '';
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TikTok Live Preview</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background: #0f0f0f;
      color: #fff;
      font-family: system-ui, sans-serif;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      min-height: 100vh; gap: 20px; text-align: center; padding: 20px;
    }
    .logo { font-size: 60px; }
    h2 { font-size: 22px; }
    p { color: #888; font-size: 14px; max-width: 400px; line-height: 1.6; }
    a {
      display: inline-block; margin-top: 10px;
      background: #FF0050; color: #fff;
      padding: 12px 28px; border-radius: 999px;
      text-decoration: none; font-weight: 700; font-size: 16px;
    }
    a:hover { opacity: 0.85; }
    .tip {
      background: rgba(255,0,80,0.1);
      border: 1px solid rgba(255,0,80,0.3);
      border-radius: 12px; padding: 16px 20px;
      font-size: 13px; color: #ffaaaa;
      max-width: 420px;
    }
  </style>
</head>
<body>
  <div class="logo">🎵</div>
  <h2>TikTok no permite embeds</h2>
  <p>TikTok bloquea su web dentro de iframes por seguridad.<br>Abre el live directamente en una nueva pestaña.</p>
  ${user ? `<a href="https://www.tiktok.com/@${user}/live" target="_blank" rel="noopener">
    🔴 Ver @${user} en vivo
  </a>` : '<p style="color:#666">Usuario no configurado</p>'}
  <div class="tip">
    💡 <strong>Para el overlay:</strong> El servidor detecta los mensajes automáticamente.
    No necesitas mantener el preview abierto si el connector funciona.
  </div>
</body>
</html>`);
});

app.post('/api/tiktok/restart', (req, res) => {
  console.log('[API] Restart TikTok solicitado');
  state.tiktok.connected = false;
  state.tiktok.restartCount++;
  broadcastStatus();
  connectTikTok();
  res.json({ ok: true, restarts: state.tiktok.restartCount });
});

app.get('/api/status', (req, res) => res.json({
  twitch:  { connected: state.twitch.connected,  channel: CONFIG.twitch },
  kick:    { connected: state.kick.connected,    channel: CONFIG.kick,   kickId: CONFIG.kickId },
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
  console.log(`   Kick    : ${CONFIG.kick    || '(no config)'} ${CONFIG.kickId ? '(ID: '+CONFIG.kickId+')' : '(ID: auto-resolver)'}`);
  console.log(`   TikTok  : ${CONFIG.tiktok  || '(no config)'} [${CONFIG.tiktokMode}]`);
  console.log(`   Health  : /health`);
  console.log(`   Preview : /tiktok-preview\n`);

  connectTwitch();
  connectKick();
  connectTikTok();
});
