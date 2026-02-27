<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeve Multichat — Dashboard</title>
  <style>
    :root {
      --bg:     #0f172a;
      --panel:  #1e293b;
      --border: #334155;
      --text:   #f1f5f9;
      --muted:  #94a3b8;
      --green:  #22c55e;
      --red:    #ef4444;
      --yellow: #eab308;
      --twitch: #9146FF;
      --kick:   #53FC18;
      --tiktok: #FF0050;
      --custom: #FF6B9D;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:var(--bg); color:var(--text); font-family:'Segoe UI',system-ui,sans-serif; min-height:100vh; }

    header {
      background:var(--panel); border-bottom:1px solid var(--border);
      padding:16px 24px; display:flex; align-items:center;
      justify-content:space-between; gap:12px; flex-wrap:wrap;
    }
    header h1 {
      font-size:20px; font-weight:700;
      background:linear-gradient(135deg,#FF6B9D,#9146FF);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    }
    #ws-status { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--muted); }
    #ws-dot { width:10px; height:10px; border-radius:50%; background:var(--red); transition:background 0.3s; }
    #ws-dot.ok { background:var(--green); }

    .layout {
      display:grid; grid-template-columns:340px 1fr;
      height:calc(100vh - 57px); overflow:hidden;
    }
    .sidebar {
      background:var(--panel); border-right:1px solid var(--border);
      overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:14px;
    }
    .main { display:flex; flex-direction:column; overflow:hidden; }

    .card { background:var(--bg); border:1px solid var(--border); border-radius:12px; padding:16px; }
    .card-title {
      font-size:11px; font-weight:700; letter-spacing:1px;
      text-transform:uppercase; color:var(--muted); margin-bottom:12px;
    }

    .form-group { margin-bottom:10px; }
    .form-group label { display:block; font-size:12px; color:var(--muted); margin-bottom:4px; }
    .input-row { display:flex; gap:8px; }
    input[type=text] {
      flex:1; background:rgba(255,255,255,0.06); border:1px solid var(--border);
      border-radius:8px; padding:8px 12px; color:var(--text); font-size:13px; outline:none;
      transition:border-color 0.2s;
    }
    input[type=text]:focus { border-color:#FF6B9D; }
    input[type=text]::placeholder { color:var(--muted); }

    .btn {
      padding:8px 16px; border-radius:8px; border:none; font-size:13px;
      font-weight:600; cursor:pointer; transition:all 0.2s; white-space:nowrap;
    }
    .btn-primary { background:linear-gradient(135deg,#FF6B9D,#9146FF); color:#fff; }
    .btn-primary:hover { opacity:0.85; transform:translateY(-1px); }
    .btn-secondary { background:rgba(255,255,255,0.08); color:var(--text); border:1px solid var(--border); }
    .btn-secondary:hover { background:rgba(255,255,255,0.14); }
    .btn-tiktok { background:rgba(255,0,80,0.15); color:var(--tiktok); border:1px solid rgba(255,0,80,0.4); }
    .btn-tiktok:hover { background:rgba(255,0,80,0.25); }
    .btn-full { width:100%; }
    .hint { font-size:11px; color:var(--muted); margin-top:5px; }

    .platform-row {
      display:flex; align-items:center; gap:10px;
      padding:10px 12px; border-radius:8px;
      background:rgba(255,255,255,0.04); margin-bottom:6px;
    }
    .platform-dot { width:10px; height:10px; border-radius:50%; background:var(--red); flex-shrink:0; transition:background 0.3s; }
    .platform-dot.ok { background:var(--green); box-shadow:0 0 6px var(--green); }
    .platform-icon { font-size:18px; }
    .platform-name { font-weight:600; font-size:14px; flex:1; }
    .platform-channel { font-size:12px; color:var(--muted); }

    .tag { display:inline-block; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:600; }
    .tag-connector { background:rgba(34,197,94,0.15); color:var(--green); }
    .tag-puppeteer { background:rgba(234,179,8,0.15); color:var(--yellow); }

    .info-box { border-radius:8px; padding:10px 12px; font-size:12px; line-height:1.7; }
    .info-box.green { background:rgba(83,252,24,0.07); border:1px solid rgba(83,252,24,0.2); color:#a7f3a0; }
    .info-box.red   { background:rgba(255,0,80,0.08); border:1px solid rgba(255,0,80,0.25); color:#ffaaaa; }
    .info-box.warn  { background:rgba(234,179,8,0.08); border:1px solid rgba(234,179,8,0.25); color:#fde68a; }

    .url-box {
      background:rgba(255,255,255,0.04); border:1px solid var(--border);
      border-radius:8px; padding:10px 12px; font-size:12px;
      font-family:monospace; color:#7dd3fc; word-break:break-all;
      cursor:pointer; transition:background 0.2s;
    }
    .url-box:hover { background:rgba(255,255,255,0.08); }

    .chat-panel {
      flex:1; overflow-y:auto; padding:16px;
      display:flex; flex-direction:column; gap:8px; scroll-behavior:smooth;
    }
    .msg-item {
      display:flex; gap:10px; align-items:flex-start;
      padding:10px 12px; background:rgba(255,255,255,0.03);
      border-radius:10px; border-left:3px solid transparent;
      animation:fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    .msg-item.twitch { border-left-color:var(--twitch); }
    .msg-item.kick   { border-left-color:var(--kick); }
    .msg-item.tiktok { border-left-color:var(--tiktok); }
    .msg-item.custom { border-left-color:var(--custom); }
    .msg-avatar {
      width:32px; height:32px; border-radius:50%; background:var(--border);
      background-size:cover; background-position:center; flex-shrink:0;
      font-size:16px; display:flex; align-items:center; justify-content:center;
    }
    .msg-body { flex:1; min-width:0; }
    .msg-header { display:flex; align-items:center; gap:6px; margin-bottom:3px; flex-wrap:wrap; }
    .msg-user { font-weight:700; font-size:13px; }
    .msg-platform { font-size:10px; padding:1px 6px; border-radius:999px; font-weight:600; }
    .msg-platform.twitch { background:rgba(145,70,255,0.2); color:var(--twitch); }
    .msg-platform.kick   { background:rgba(83,252,24,0.15); color:var(--kick); }
    .msg-platform.tiktok { background:rgba(255,0,80,0.15); color:var(--tiktok); }
    .msg-platform.custom { background:rgba(255,107,157,0.15); color:var(--custom); }
    .msg-time { font-size:10px; color:var(--muted); margin-left:auto; }
    .msg-text { font-size:13px; color:var(--text); line-height:1.5; word-break:break-word; }

    .input-bar {
      padding:12px 16px; border-top:1px solid var(--border);
      background:var(--panel); display:flex; gap:8px;
    }
    .input-bar input { flex:1; }

    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }

    #toast {
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      background:#1e293b; border:1px solid #334155; color:var(--text);
      padding:10px 20px; border-radius:8px; font-size:13px; z-index:999;
      opacity:0; pointer-events:none; transition:opacity 0.3s; white-space:nowrap;
    }
    #toast.show { opacity:1; }

    .modal-overlay {
      display:none; position:fixed; inset:0;
      background:rgba(0,0,0,0.7); z-index:200;
      align-items:center; justify-content:center;
    }
    .modal-overlay.open { display:flex; }
    .modal-box {
      background:var(--panel); border:1px solid var(--border);
      border-radius:16px; padding:28px; max-width:500px; width:90%; position:relative;
    }
    .modal-close {
      position:absolute; top:14px; right:16px;
      background:transparent; border:none; color:var(--muted); font-size:20px; cursor:pointer;
    }
    .modal-box ol { padding-left:20px; line-height:2.2; font-size:13px; color:var(--muted); }
    .modal-box code { background:#0f172a; padding:4px 8px; border-radius:6px; font-size:12px; }
  </style>
</head>
<body>

<header>
  <h1>🎮 Meeve Multichat Dashboard</h1>
  <div id="ws-status">
    <span id="ws-dot"></span>
    <span id="ws-label">Desconectado</span>
  </div>
</header>

<div class="layout">
  <div class="sidebar">

    <div class="card">
      <div class="card-title">Servidor</div>
      <div class="form-group">
        <label>URL del servidor (Render / Railway)</label>
        <div class="input-row">
          <input id="serverUrl" type="text" placeholder="wss://tu-app.onrender.com" />
          <button class="btn btn-primary" onclick="saveAndConnect()">Conectar</button>
        </div>
        <div class="hint">Se guarda en el navegador automáticamente</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Estado conexiones</div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-twitch"></span>
        <span class="platform-icon">🟣</span>
        <div>
          <div class="platform-name">Twitch</div>
          <div class="platform-channel" id="ch-twitch">—</div>
        </div>
      </div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-kick"></span>
        <span class="platform-icon">🟢</span>
        <div>
          <div class="platform-name">Kick</div>
          <div class="platform-channel" id="ch-kick">—</div>
        </div>
      </div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-tiktok"></span>
        <span class="platform-icon">🎵</span>
        <div>
          <div class="platform-name">TikTok</div>
          <div class="platform-channel" id="ch-tiktok">—</div>
        </div>
        <span id="tiktok-mode-tag" class="tag tag-connector">connector</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Kick — Resolver ID</div>
      <div id="kick-status-box" class="info-box green" style="margin-bottom:10px;">
        kick.com bloquea al servidor por IP. Pulsa el botón para que <strong>tu navegador</strong> resuelva el ID del chatroom.
      </div>
      <div style="display:flex; gap:8px; margin-bottom:8px;">
        <button class="btn btn-secondary btn-full" onclick="resolveKickId()">🔍 Resolver automático</button>
        <button class="btn btn-secondary btn-full" onclick="toggleKickManual()">✏️ Manual</button>
      </div>
      <div id="kick-manual-wrap" style="display:none;">
        <div class="form-group" style="margin:0;">
          <label>Kick Channel ID (número)</label>
          <div class="input-row">
            <input id="kickChannelId" type="text" placeholder="ej: 1234567" />
            <button class="btn btn-primary" onclick="sendKickId()">Enviar</button>
          </div>
          <div class="hint">kick.com/tucanal → F12 → Network → busca "chatrooms.XXXXXX"</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">TikTok — Control</div>
      <div style="display:flex; gap:8px; margin-bottom:10px;">
        <button class="btn btn-tiktok btn-full" onclick="restartTikTok()">🔄 Reconectar</button>
        <button class="btn btn-secondary btn-full" onclick="openTikTokLive()">📺 Abrir Live</button>
      </div>
      <div class="info-box red">
        TikTok bloquea iframes — "Abrir Live" abre en nueva pestaña.<br>
        Si falla con error 403:
        <a href="#" onclick="openModal('tiktok-modal'); return false;" style="color:#FF6B9D;">¿Cómo usar TIKTOK_SESSION_ID?</a>
      </div>
    </div>

    <div class="card">
      <div class="card-title">URL del Overlay (OBS)</div>
      <div class="info-box warn" style="margin-bottom:10px; font-size:11px;">
        Introduce la URL donde está tu <strong>overlay/index.html</strong><br>
        (GitHub Pages, servidor local, etc.)
      </div>
      <div class="form-group">
        <label>URL base del overlay</label>
        <input id="overlayBase" type="text" placeholder="https://usuario.github.io/repo/overlay/index.html" />
        <div class="hint">La URL completa de tu overlay/index.html</div>
      </div>
      <div class="url-box" id="overlay-url" onclick="copyOverlayUrl()" title="Click para copiar" style="margin-bottom:8px;">
        Configura la URL del overlay...
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-secondary btn-full" style="font-size:12px;" onclick="copyOverlayUrl()">📋 Copiar URL OBS</button>
        <button class="btn btn-secondary btn-full" style="font-size:12px;" onclick="openOverlay()">🔗 Abrir</button>
      </div>
    </div>

  </div>

  <div class="main">
    <div class="chat-panel" id="chat-panel">
      <div id="chat-placeholder" style="text-align:center; color:var(--muted); margin:auto; font-size:14px;">
        Los mensajes aparecerán aquí cuando el servidor esté conectado ✨
      </div>
    </div>
    <div class="input-bar">
      <input id="custom-msg-input" type="text" placeholder="Escribe un mensaje personalizado y pulsa Enter…"
             onkeydown="if(event.key==='Enter') sendCustomMessage()" />
      <button class="btn btn-primary" onclick="sendCustomMessage()">Enviar ⭐</button>
      <button class="btn btn-secondary" onclick="injectTestMessage()" title="Inyectar mensaje de prueba local">🧪</button>
    </div>
  </div>
</div>

<div id="tiktok-modal" class="modal-overlay">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('tiktok-modal')">✕</button>
    <h3 style="margin-bottom:16px; font-size:16px;">🔑 Obtener TIKTOK_SESSION_ID</h3>
    <ol>
      <li>Abre <strong style="color:var(--text)">tiktok.com</strong> en Chrome e inicia sesión</li>
      <li>Pulsa <strong style="color:var(--text)">F12</strong> → pestaña <strong style="color:var(--text)">Application</strong></li>
      <li>Panel izquierdo: <strong style="color:var(--text)">Cookies → https://www.tiktok.com</strong></li>
      <li>Busca la cookie <strong style="color:#FF6B9D">sessionid</strong> y copia el valor</li>
      <li>En Render/Railway → Variables de entorno:<br>
        <code>TIKTOK_SESSION_ID = (el valor copiado)</code>
      </li>
      <li>Reinicia el servidor</li>
    </ol>
    <p style="margin-top:14px; font-size:12px; color:var(--muted);">⚠️ El sessionid caduca cada ~30 días.</p>
  </div>
</div>

<div id="toast"></div>

<script>
// ── STORAGE ──────────────────────────────────────────────────
var store = {
  get: function(k, d) { d=d||''; try { return localStorage.getItem(k)||d; } catch(e){return d;} },
  set: function(k, v) { try { localStorage.setItem(k,v); } catch(e){} }
};

// ── ESTADO ───────────────────────────────────────────────────
var ws = null, retryDelay = 1000, isConnected = false, autoKickDone = false;
var currentChannels = { twitch:'', kick:'', tiktok:'' };
var platformIcons   = { twitch:'🟣', kick:'🟢', tiktok:'🎵', custom:'⭐' };

// ══════════════════════════════════════════════════════════════
// KICK AVATAR CACHE — igual que Social Stream Ninja
// SSN resuelve avatares de Twitch con su proxy API:
//   chatimg = "https://api.socialstream.ninja/twitch/?username=" + username
// Nosotros hacemos lo mismo para Kick directamente desde kick.com/api/v2/channels/{username}
// Los avatares se cachean en memoria + localStorage para no repetir llamadas.
// ══════════════════════════════════════════════════════════════
var kickAvatarCache   = {};   // username_lower → URL
var kickAvatarPending = {};   // username_lower → [callbacks] (evitar llamadas duplicadas)

(function loadCache() {
  try { kickAvatarCache = JSON.parse(localStorage.getItem('kickAvatarCache')||'{}'); } catch(e){}
})();

function saveCache() {
  try {
    var keys = Object.keys(kickAvatarCache);
    if (keys.length > 200) {                            // Límite 200 entradas
      var t = {};
      keys.slice(-200).forEach(function(k){ t[k]=kickAvatarCache[k]; });
      kickAvatarCache = t;
    }
    localStorage.setItem('kickAvatarCache', JSON.stringify(kickAvatarCache));
  } catch(e){}
}

function getKickAvatar(username, callback) {
  if (!username) return callback(null);
  var lc = username.toLowerCase();

  if (kickAvatarCache[lc])   return callback(kickAvatarCache[lc]);   // hit caché
  if (kickAvatarPending[lc]) { kickAvatarPending[lc].push(callback); return; } // en vuelo

  kickAvatarPending[lc] = [callback];

  fetch('https://kick.com/api/v2/channels/' + lc, { headers:{'Accept':'application/json'} })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data){
      // SSN lee: data.user.profile_pic  (campo confirmado de la API pública de Kick)
      var avatar = null;
      if (data) {
        avatar = (data.user && (data.user.profile_pic || data.user.profilePic))
               || data.profile_pic
               || null;
      }
      if (avatar) { kickAvatarCache[lc] = avatar; saveCache(); }
      var cbs = kickAvatarPending[lc]||[]; delete kickAvatarPending[lc];
      cbs.forEach(function(cb){ cb(avatar); });
    })
    .catch(function(){
      var cbs = kickAvatarPending[lc]||[]; delete kickAvatarPending[lc];
      cbs.forEach(function(cb){ cb(null); });
    });
}

// ── KICK BROWSER WEBSOCKET ───────────────────────────────────
var kickWs = null, kickRetryDelay = 3000, kickRetryTimeout = null;

function connectKickBrowser(channelId) {
  if (!channelId) return;
  if (kickWs && kickWs.readyState <= 1) return;
  if (kickRetryTimeout) { clearTimeout(kickRetryTimeout); kickRetryTimeout = null; }

  var box = document.getElementById('kick-status-box');
  if (box) { box.className='info-box warn'; box.innerHTML='⏳ Conectando a Kick desde el navegador...'; }

  var urls = [
    'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false',
    'wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false',
  ];
  var urlIdx = parseInt(localStorage.getItem('kickWsUrlIndex')||'0');
  tryKickUrl(channelId, urls, urlIdx);
}

function tryKickUrl(channelId, urls, idx) {
  if (idx >= urls.length) idx = 0;
  try { kickWs = new WebSocket(urls[idx]); } catch(e) {
    kickRetryTimeout = setTimeout(function(){ tryKickUrl(channelId, urls, (idx+1)%urls.length); }, 5000);
    return;
  }

  kickWs.onopen = function() {
    kickRetryDelay = 3000;
    localStorage.setItem('kickWsUrlIndex', idx);
    kickWs.send(JSON.stringify({ event:'pusher:subscribe', data:{ auth:'', channel:'chatrooms.'+channelId+'.v2' } }));
  };

  kickWs.onmessage = function(e) {
    try {
      var msg   = JSON.parse(e.data);
      var event = msg.event || '';
      if (event === 'pusher:connection_established' || event === 'pusher:pong') return;

      if (event === 'pusher_internal:subscription_succeeded') {
        var box = document.getElementById('kick-status-box');
        if (box) { box.className='info-box green'; box.innerHTML='✅ Kick conectado desde el navegador (chatroom '+channelId+')'; }
        if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type:'kick_connected' }));
        return;
      }

      if (event === 'pusher:error') {
        var ed = typeof msg.data==='string' ? JSON.parse(msg.data) : (msg.data||{});
        console.warn('[Kick] Error Pusher:', ed.message||JSON.stringify(ed));
        kickWs.close(); return;
      }

      var isChatEvent = event==='App\Events\ChatMessageEvent'
                     || event==='App\\Events\\ChatMessageEvent'
                     || event.indexOf('ChatMessageEvent') !== -1;

      if (!isChatEvent) return;

      var d = typeof msg.data==='string' ? JSON.parse(msg.data) : msg.data;

      // Roles / badges
      var kickRoles = [];
      var badges = (d.sender && d.sender.identity && d.sender.identity.badges) || [];
      for (var bi=0; bi<badges.length; bi++) {
        var b = badges[bi], btype = (b.type||'').toLowerCase();
        if      (btype==='broadcaster'||btype==='owner') kickRoles.push({type:'broadcaster',label:'Owner'});
        else if (btype==='moderator'||btype==='mod')     kickRoles.push({type:'moderator',label:'Mod'});
        else if (btype==='vip')                          kickRoles.push({type:'vip',label:'VIP'});
        else if (btype==='subscriber'||btype==='sub')    kickRoles.push({type:'subscriber',label:'Sub'});
        else if (btype==='og')                           kickRoles.push({type:'og',label:'OG'});
        else if (b.type)                                 kickRoles.push({type:btype,label:b.type});
      }

      var username = (d.sender && d.sender.username) || 'Unknown';

      // ── AVATAR — mismo patrón que Social Stream Ninja ──────────────
      // 1. Intentar campo directo del evento Pusher
      var avatarInEvent = null;
      if (d.sender) {
        avatarInEvent = d.sender.profile_pic
                     || d.sender.profile_picture
                     || d.sender.profilePicture
                     || d.sender.profilePic
                     || d.sender.avatar
                     || null;
      }

      if (avatarInEvent) {
        // Si vino en el evento, cachear y enviar de inmediato
        kickAvatarCache[username.toLowerCase()] = avatarInEvent;
        saveCache();
        dispatchKickMsg(username, d, kickRoles, avatarInEvent);
      } else {
        // No vino en el evento → resolver via kick.com/api/v2 (como SSN)
        getKickAvatar(username, function(avatar) {
          dispatchKickMsg(username, d, kickRoles, avatar);
        });
      }

    } catch(err) { console.error('[Kick Browser] parse error:', err.message); }
  };

  kickWs.onclose = function(e) {
    var box = document.getElementById('kick-status-box');
    if (box) { box.className='info-box warn'; box.innerHTML='🔄 Kick desconectado, reintentando...'; }
    if (ws && ws.readyState===1) ws.send(JSON.stringify({type:'kick_disconnected'}));
    var nextIdx = e.code===4001 ? (idx+1)%urls.length : idx;
    kickRetryDelay = Math.min(kickRetryDelay*1.5, 30000);
    kickRetryTimeout = setTimeout(function(){ tryKickUrl(channelId, urls, nextIdx); }, kickRetryDelay);
  };

  kickWs.onerror = function(){ console.error('[Kick Browser] WS error'); };

  var pingInt = setInterval(function(){
    if (kickWs && kickWs.readyState===1) kickWs.send(JSON.stringify({event:'pusher:ping',data:{}}));
    else clearInterval(pingInt);
  }, 25000);
}

function dispatchKickMsg(username, d, kickRoles, avatar) {
  var chatMsg = {
    type:        'kick_message',
    platform:    'kick',
    chatname:    username,
    chatmessage: d.content,
    nameColor:   (d.sender && d.sender.identity && d.sender.identity.color) || '#53FC18',
    chatimg:     avatar || null,
    roles:       kickRoles,
    mid:         d.id || ('kick-'+Date.now())
  };
  if (ws && ws.readyState===1) ws.send(JSON.stringify(chatMsg));
  else appendMessage(chatMsg);
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var saved = store.get('serverUrl');
  document.getElementById('serverUrl').value = saved;

  var overlayInput = document.getElementById('overlayBase');
  if (overlayInput) {
    overlayInput.value = store.get('overlayBase') || '';
    overlayInput.addEventListener('input', function(){
      store.set('overlayBase', overlayInput.value.trim()); updateOverlayUrl();
    });
  }
  updateOverlayUrl();
  if (saved) connectWS(saved);
});

// ── WEBSOCKET ────────────────────────────────────────────────
function connectWS(url) {
  if (!url) return;
  if (ws) { try { ws.close(); } catch(e){} }
  var wsUrl = url.replace(/^https?/,'ws').replace(/\/$/,'');
  try { ws = new WebSocket(wsUrl); } catch(e) { setStatus(false); scheduleRetry(url); return; }

  ws.onopen = function(){
    isConnected=true; retryDelay=1000; setStatus(true);
    var id = store.get('kickChannelId');
    if (id && (!kickWs || kickWs.readyState>1)) connectKickBrowser(id);
  };
  ws.onmessage = function(e){
    try {
      var data = JSON.parse(e.data);
      if (data.type==='status') handleStatus(data); else appendMessage(data);
    } catch(err){}
  };
  ws.onclose = function(){ isConnected=false; setStatus(false); scheduleRetry(url); };
  ws.onerror = function(){ ws.close(); };
}

function scheduleRetry(url){
  retryDelay = Math.min(retryDelay*2, 30000);
  setTimeout(function(){ connectWS(url); }, retryDelay);
}
function setStatus(ok){
  document.getElementById('ws-dot').className = ok?'ok':'';
  document.getElementById('ws-label').textContent = ok?'Conectado':'Desconectado';
}

// ── STATUS ───────────────────────────────────────────────────
function handleStatus(data) {
  setPlatformStatus('twitch', data.twitch,  (data.channels&&data.channels.twitch)  ||'—');
  setPlatformStatus('kick',   data.kick,    (data.channels&&data.channels.kick)    ||'—');
  setPlatformStatus('tiktok', data.tiktok,  (data.channels&&data.channels.tiktok) ||'—');
  if (data.channels) currentChannels = data.channels;

  var modeTag = document.getElementById('tiktok-mode-tag');
  if (modeTag) {
    modeTag.textContent = data.tiktokMode||'connector';
    modeTag.className   = 'tag '+(data.tiktokMode==='puppeteer'?'tag-puppeteer':'tag-connector');
  }

  if (!data.kick && data.channels && data.channels.kick) {
    var savedId = store.get('kickChannelId');
    if (savedId) { if (!kickWs||kickWs.readyState>1) connectKickBrowser(savedId); }
    else if (!autoKickDone) { autoKickDone=true; setTimeout(resolveKickId, 1500); }
  }
}

function setPlatformStatus(platform, connected, channel){
  var dot=document.getElementById('dot-'+platform);
  var ch =document.getElementById('ch-' +platform);
  if (dot) dot.className='platform-dot'+(connected?' ok':'');
  if (ch)  ch.textContent=channel||'—';
}

// ── MENSAJES ─────────────────────────────────────────────────
function appendMessage(data) {
  var panel = document.getElementById('chat-panel');
  var ph    = document.getElementById('chat-placeholder');
  if (ph) ph.remove();

  var platform = data.platform||data.type||'custom';
  var icon     = platformIcons[platform]||'💬';
  var time     = new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
  var el       = document.createElement('div');
  el.className = 'msg-item '+platform;

  var avatarStyle   = data.chatimg ? "background-image:url('"+data.chatimg+"')" : '';
  var avatarContent = data.chatimg ? '' : icon;
  var nameStyle     = data.nameColor ? 'color:'+data.nameColor : '';

  el.innerHTML =
    '<div class="msg-avatar" style="'+avatarStyle+'">'+avatarContent+'</div>'+
    '<div class="msg-body">'+
      '<div class="msg-header">'+
        '<span class="msg-user" style="'+nameStyle+'">'+esc(data.chatname||'?')+'</span>'+
        '<span class="msg-platform '+platform+'">'+platform+'</span>'+
        '<span class="msg-time">'+time+'</span>'+
      '</div>'+
      '<div class="msg-text">'+esc(data.chatmessage||data.hasDonation||'')+'</div>'+
    '</div>';

  panel.appendChild(el);
  var msgs = panel.querySelectorAll('.msg-item');
  if (msgs.length > 200) msgs[0].remove();
  panel.scrollTop = panel.scrollHeight;
}

function esc(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── ACCIONES ─────────────────────────────────────────────────
function saveAndConnect(){
  var url = document.getElementById('serverUrl').value.trim();
  if (!url) return toast('Introduce la URL del servidor');
  store.set('serverUrl', url); retryDelay=1000; autoKickDone=false;
  connectWS(url); updateOverlayUrl(); toast('Conectando a '+url);
}

function toggleKickManual(){
  var el=document.getElementById('kick-manual-wrap');
  el.style.display = el.style.display==='none'?'block':'none';
}

async function resolveKickId(){
  var channel = currentChannels.kick || store.get('kickChannel') || '';
  var box = document.getElementById('kick-status-box');
  if (!channel){
    box.className='info-box warn';
    box.innerHTML='⚠️ El servidor no tiene <strong>KICK_CHANNEL</strong> configurado.';
    return;
  }
  box.className='info-box warn'; box.innerHTML='⏳ Resolviendo ID de kick.com/'+channel+'...';
  try {
    var r  = await fetch('https://kick.com/api/v2/channels/'+channel,{headers:{'Accept':'application/json'}});
    if (!r.ok) throw new Error('HTTP '+r.status);
    var d  = await r.json();
    var id = String((d.chatroom&&d.chatroom.id)||d.id||'');
    if (!id) throw new Error('No se encontró chatroom.id');

    // Cachear avatar del streamer principal al mismo tiempo
    var sv = (d.user&&(d.user.profile_pic||d.user.profilePic))||d.profile_pic||null;
    if (sv) { kickAvatarCache[channel.toLowerCase()]=sv; saveCache(); }

    box.className='info-box green';
    box.innerHTML='✅ ID encontrado: <strong>'+id+'</strong> — enviando al servidor...';
    document.getElementById('kickChannelId').value = id;
    await sendKickId(id);
  } catch(e){
    box.className='info-box red';
    box.innerHTML='❌ <strong>'+e.message+'</strong><br>Usa el botón Manual.';
    document.getElementById('kick-manual-wrap').style.display='block';
  }
}

async function sendKickId(idParam){
  var id = idParam || document.getElementById('kickChannelId').value.trim();
  if (!id) return toast('Introduce el Channel ID');
  var serverUrl = store.get('serverUrl');
  if (!serverUrl) return toast('Conecta al servidor primero');
  var httpUrl = serverUrl.replace(/^wss?/,'https').replace(/\/$/,'');
  try {
    var r = await fetch(httpUrl+'/api/kick/channel-id',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({channelId:id})
    });
    var d = await r.json();
    if (d.ok){
      store.set('kickChannelId', String(id));
      toast('✅ Kick conectando con ID '+id);
      connectKickBrowser(String(id));
      var box=document.getElementById('kick-status-box');
      box.className='info-box green';
      box.innerHTML='✅ Kick conectando con chatroom ID: <strong>'+id+'</strong>';
    } else { toast('❌ El servidor rechazó el ID'); }
  } catch(e){ toast('❌ Error contactando servidor: '+e.message); }
}

async function restartTikTok(){
  var serverUrl=store.get('serverUrl');
  if (!serverUrl) return toast('Configura la URL del servidor primero');
  var httpUrl=serverUrl.replace(/^wss?/,'https').replace(/\/$/,'');
  try {
    var r=await fetch(httpUrl+'/api/tiktok/restart',{method:'POST'});
    var d=await r.json();
    toast(d.ok?'🔄 TikTok reconectando... (#'+d.restarts+')':'❌ Error al reconectar TikTok');
  } catch(e){ toast('❌ No se pudo contactar el servidor'); }
}

function openTikTokLive(){
  var user=currentChannels.tiktok||'';
  if (!user) return toast('TikTok no configurado (variable TIKTOK_USERNAME)');
  window.open('https://www.tiktok.com/@'+user+'/live','_blank','noopener');
}

function sendCustomMessage(){
  var input=document.getElementById('custom-msg-input');
  var text=input.value.trim();
  if (!text) return;
  if (!isConnected||!ws) return toast('⚠️ No hay conexión con el servidor');
  ws.send(JSON.stringify({type:'custom_message',user:'Tú (dashboard)',text:text}));
  input.value='';
}

function getAutoOverlayUrl(){
  var href=window.location.href.split('?')[0].replace(/\/+$/,'');
  var result=href.replace(/\/dashboard(\/.*)?$/,'/overlay/index.html');
  if (result===href) result=href.replace(/\/[^/]+$/,'/overlay/index.html');
  return result;
}

function updateOverlayUrl(){
  var serverUrl=store.get('serverUrl');
  var box=document.getElementById('overlay-url');
  var inputEl=document.getElementById('overlayBase');
  var autoOverlay=window.location.protocol!=='file:'?getAutoOverlayUrl():'';
  var currentInput=inputEl?inputEl.value.trim():'';
  if (!currentInput||currentInput.indexOf('overlay')===-1){
    currentInput=autoOverlay;
    if (inputEl) inputEl.value=currentInput;
    if (currentInput) store.set('overlayBase',currentInput);
  }
  if (!serverUrl){ box.textContent='Configura el servidor primero...'; box.dataset.url=''; return; }
  if (!currentInput){ box.textContent='Introduce la URL del overlay arriba...'; box.dataset.url=''; return; }
  var url=currentInput.split('?')[0]+'?server='+encodeURIComponent(serverUrl);
  box.textContent=url; box.dataset.url=url;
}

function copyOverlayUrl(){
  var url=document.getElementById('overlay-url').dataset.url;
  if (!url) return toast('Configura el servidor primero');
  navigator.clipboard.writeText(url).then(function(){ toast('✅ URL copiada'); });
}
function openOverlay(){
  var url=document.getElementById('overlay-url').dataset.url;
  if (!url) return toast('Configura el servidor primero');
  window.open(url,'_blank');
}
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

function injectTestMessage(){
  appendMessage({type:'custom',platform:'custom',chatname:'Test local',
    chatmessage:'✅ El chat del dashboard funciona correctamente',
    nameColor:'#FF6B9D',mid:'test-'+Date.now()});
  toast('Mensaje de prueba inyectado');
}

function toast(msg, duration){
  duration=duration||3000;
  var el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  setTimeout(function(){ el.classList.remove('show'); }, duration);
}
</script>
</body>
</html>
