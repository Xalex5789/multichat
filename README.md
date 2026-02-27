# 🎮 Meeve Multichat

Multichat para streams: **Twitch + Kick + TikTok** con overlay personalizado de Meeve.  
100% online — sin instalar programas. Funciona con GitHub Pages + Render + UptimeRobot.

---

## 📁 Estructura

```
/
├── server/          ← Node.js en Render
│   ├── index.js
│   └── package.json
├── overlay/
│   └── index.html   ← Overlay para OBS (GitHub Pages)
├── dashboard/
│   └── index.html   ← Panel de control (GitHub Pages)
└── render.yaml      ← Config deploy de Render
```

---

## 🚀 Setup (una sola vez)

### 1. GitHub

1. Crea un repositorio público: `multichat-overlay`
2. Sube todos los archivos de este proyecto
3. Ve a **Settings → Pages → Deploy from branch `main`** (carpeta raíz o `/docs`)

**URLs resultantes:**
- Dashboard: `https://TU_USUARIO.github.io/multichat-overlay/dashboard/`
- Overlay OBS: `https://TU_USUARIO.github.io/multichat-overlay/overlay/?server=wss://TU-APP.onrender.com`

---

### 2. Render

1. Crea cuenta en [render.com](https://render.com)
2. **New → Web Service → conecta tu repo de GitHub**
3. Configuración:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
4. En **Environment Variables**, añade:

| Variable          | Valor                        |
|-------------------|------------------------------|
| `TWITCH_CHANNEL`  | tu_canal (ej: `meeve_`)      |
| `KICK_CHANNEL`    | tu_canal (ej: `meeve`)       |
| `KICK_CHANNEL_ID` | ID numérico (opcional)        |
| `TIKTOK_USERNAME` | tu_usuario (sin @)            |
| `TIKTOK_MODE`     | `connector` (o `puppeteer`)  |

5. Copia la URL del servicio (ej: `https://meeve-multichat.onrender.com`)

---

### 3. UptimeRobot

Para que Render no se suspenda en el plan Free:

1. Ve a [uptimerobot.com](https://uptimerobot.com)
2. **Add New Monitor → HTTP(s)**
3. URL: `https://TU-APP.onrender.com/health`
4. Interval: **5 minutes**

---

### 4. OBS

1. Abre el **Dashboard** en tu navegador
2. Introduce la URL de Render (`wss://tu-app.onrender.com`) y pulsa **Conectar**
3. Copia la **URL del Overlay** que aparece abajo
4. En OBS: **Fuentes → Añadir → Navegador** → pega la URL

---

## 🎵 TikTok

TikTok no tiene API pública. El sistema usa dos modos:

- **`connector`** (por defecto): `tiktok-live-connector`. No necesita ventana visible.  
  Si TikTok lo bloquea, el servidor reintenta automáticamente.
- **`puppeteer`**: Abre Chrome headless en Render. Más robusto pero consume más RAM.

**Desde el Dashboard:**
- Botón **🔄 Reconectar**: reinicia la conexión TikTok en el servidor
- Botón **📺 Preview**: abre tu live de TikTok en un panel lateral — mantenlo visible si el connector falla

---

## 🔗 Endpoints del servidor

| Endpoint                    | Uso                              |
|-----------------------------|----------------------------------|
| `GET /health`               | UptimeRobot ping                 |
| `GET /api/status`           | Estado JSON de todas las fuentes |
| `POST /api/tiktok/restart`  | Reconectar TikTok desde dashboard|
| `GET /tiktok-preview`       | Página con iframe del live       |
| `WS /`                      | WebSocket de mensajes            |

---

## 📦 Dependencias del servidor

```json
{
  "express": "^4.18.2",
  "tmi.js": "^1.8.5",
  "tiktok-live-connector": "^1.1.9",
  "puppeteer-extra": "^3.3.6",
  "puppeteer-extra-plugin-stealth": "^2.11.2",
  "puppeteer": "^21.0.0",
  "ws": "^8.14.2"
}
```
