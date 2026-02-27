# 🎮 Meeve Multichat

Multichat para streams: **Twitch + Kick + TikTok** con overlay personalizado de Meeve.  
100% online — sin instalar programas. GitHub Pages + Railway + UptimeRobot.

---

## 📁 Estructura del repositorio

```
multichat/
├── server/
│   ├── index.js        ← Servidor Node.js (Railway)
│   ├── package.json
│   └── railway.toml    ← Config de deploy Railway
├── overlay/
│   └── index.html      ← Overlay para OBS (GitHub Pages)
├── dashboard/
│   └── index.html      ← Panel de control (GitHub Pages)
└── README.md
```

---

## 🚀 Setup

### 1. GitHub Pages (overlay + dashboard)

1. Ve a **Settings → Pages**
2. Source: **Deploy from branch `main`**, carpeta **`/ (root)`**
3. URLs resultantes:
   - Dashboard: `https://TU_USUARIO.github.io/multichat/dashboard/`
   - Overlay OBS: `https://TU_USUARIO.github.io/multichat/overlay/?server=wss://TU-APP.up.railway.app`

---

### 2. Railway (servidor)

1. Entra a [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo**
2. Selecciona este repositorio
3. En **Settings** configura:
   - **Root Directory:** `server`
   - **Start Command:** `node index.js`
4. En la pestaña **Variables** añade:

| Variable          | Valor                       |
|-------------------|-----------------------------|
| `TWITCH_CHANNEL`  | tu canal (ej: `meeve_`)     |
| `KICK_CHANNEL`    | tu canal (ej: `meeve`)      |
| `KICK_CHANNEL_ID` | ID numérico (opcional)      |
| `TIKTOK_USERNAME` | tu usuario sin @            |
| `TIKTOK_MODE`     | `connector`                 |

5. Ve a **Settings → Networking → Generate Domain**
6. Copia la URL tipo: `wss://tu-app.up.railway.app`

---

### 3. UptimeRobot

1. [uptimerobot.com](https://uptimerobot.com) → **Add New Monitor → HTTP(s)**
2. URL: `https://tu-app.up.railway.app/health`
3. Interval: **5 minutes**

---

### 4. OBS

1. Abre el dashboard en tu navegador
2. Introduce la URL de Railway y pulsa **Conectar**
3. Copia la **URL del Overlay** generada
4. OBS → **Fuentes → Añadir → Navegador** → pega la URL

---

## 🎵 TikTok

| Modo | Descripción |
|------|-------------|
| `connector` | Sin ventana visible. Reintenta solo si falla. |
| `puppeteer` | Chrome headless en Railway. Más RAM pero más robusto. |

Desde el dashboard: botón **🔄 Reconectar** y **📺 Preview** para abrir el live en panel lateral.

---

## 🔗 Endpoints del servidor

| Endpoint | Uso |
|---|---|
| `GET /health` | UptimeRobot ping |
| `GET /api/status` | Estado JSON |
| `POST /api/tiktok/restart` | Reconectar TikTok |
| `WS /` | WebSocket de mensajes |
