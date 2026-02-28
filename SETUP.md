# 🎮 Meeve Multichat v3 — Guía Completa

Todo lo que necesitás saber para configurar el sistema desde cero, incluyendo las nuevas funciones de **envío de mensajes y picker de emotes**.

---

## ¿Qué hay de nuevo en v3?

| Función | v2 | v3 |
|---|---|---|
| Leer chat Twitch/Kick/TikTok/YouTube | ✅ | ✅ |
| **Enviar mensajes a Twitch** | ❌ | ✅ |
| **Enviar mensajes a Kick** | ❌ | ✅ |
| **Selector de plataformas destino** | ❌ | ✅ |
| **Picker de emotes Twitch** | ❌ | ✅ |
| **Picker de emotes Kick** | ❌ | ✅ |
| **Login OAuth en el dashboard** | ❌ | ✅ |

---

## Variables de entorno — Resumen completo

```env
# ── LECTURA DE CHAT (igual que v2) ──────────────
TWITCH_CHANNEL=meevepics
KICK_CHANNEL=meevepics
TIKTOK_USERNAME=meevepics
YOUTUBE_HANDLE=@Meevepics
YOUTUBE_API_KEY=AIzaSy...

# ── NUEVO: OAUTH para envío de mensajes ──────────
TWITCH_CLIENT_ID=xxxxxxxxxxxxxxx
TWITCH_CLIENT_SECRET=xxxxxxxxxxxxxxx

KICK_CLIENT_ID=xxxxxxxxxxxxxxx
KICK_CLIENT_SECRET=xxxxxxxxxxxxxxx

# ── Opcionales (igual que v2) ────────────────────
TIKTOK_SESSION_ID=      # Solo si TikTok da error 403
TIKTOK_MODE=connector   # No tocar
```

> ⚠️ **El sistema sigue funcionando sin las variables OAuth.** Solo el envío de mensajes las requiere. La lectura del chat es completamente independiente.

---

## PASO 1 — Registrar app en Twitch

Necesitás esto para poder enviar mensajes desde el dashboard.

1. Ve a [dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps) → **Registrar aplicación**
2. Completa el formulario:
   - **Nombre**: `meeve-multichat` (o cualquier nombre)
   - **OAuth Redirect URLs**: `https://tu-servidor.onrender.com` (la URL de Render/Railway, sin barra al final)
   - **Categoría**: `Chat Bot`
3. Clic en **Crear** → te lleva a la app creada
4. Clic en **Gestionar** → verás el **Client ID**
5. Clic en **Nuevo secreto** → copia el **Client Secret** (aparece solo una vez)
6. Agrega en Render/Railway:
   ```
   TWITCH_CLIENT_ID  = (el Client ID)
   TWITCH_CLIENT_SECRET = (el Client Secret)
   ```

### ¿Por qué desde el servidor y no directo en el browser?

El `client_secret` nunca debe estar en el frontend. El servidor actúa como proxy para el intercambio de códigos OAuth, protegiéndolo.

---

## PASO 2 — Registrar app en Kick (opcional, en beta)

El programa de desarrolladores de Kick todavía está en beta pública.

1. Ve a [kick.com/developer](https://kick.com/developer) → solicitar acceso como developer
2. Una vez aprobado (puede tomar días), crear una app con:
   - **Redirect URI**: `https://tu-servidor.onrender.com`
   - **Scope**: `chat:write user:read`
3. Agrega en Render/Railway:
   ```
   KICK_CLIENT_ID     = (el Client ID)
   KICK_CLIENT_SECRET = (el Client Secret)
   ```

> ℹ️ Kick usa **OAuth 2.1 con PKCE**, que es el estándar moderno más seguro. El dashboard lo maneja automáticamente.

---

## PASO 3 — Iniciar sesión en el Dashboard

Una vez configuradas las variables en el servidor:

1. Abrí el dashboard → conectá al servidor
2. En la card **"Cuentas — Envío de mensajes"** verás Twitch y Kick
3. Clic en **Login** junto a Twitch → se abre una ventana de autorización de Twitch
4. Autorizá la app → el dashboard detecta el token automáticamente
5. El botón cambia a **Logout** y muestra tu nombre de usuario
6. Repetí con Kick si lo tenés configurado

El token se guarda en el navegador (`localStorage`) — no hace falta volver a iniciar sesión cada vez.

---

## PASO 4 — Enviar mensajes

Una vez con sesión iniciada:

1. En la barra inferior verás los selectores de plataforma: **Twitch | Kick | TikTok | YouTube**
2. Las plataformas con sesión activa son clickeables, el resto están deshabilitadas
3. Clic en **Twitch** y/o **Kick** para activar el envío a esa plataforma (el fondo se oscurece y el dot se ilumina)
4. Escribí tu mensaje y presioná **Enter** o el botón **Enviar**
5. El mensaje se envía simultáneamente a todas las plataformas activas
6. Un toast muestra `✓ Twitch | ✓ Kick` si salió bien, o el error si algo falló

---

## PASO 5 — Picker de emotes

El botón 😀 en el input abre el picker de emotes.

### Twitch
- Requiere sesión iniciada en Twitch
- Muestra los emotes del **canal configurado** (subs, bits) + emotes **globales**
- Click en un emote → se inserta el nombre en el input (Twitch los detecta por nombre)
- Podés buscar por nombre en la barra de búsqueda

### Kick
- No requiere sesión — carga los emotes del canal configurado + globales de Kick
- Los emotes de Kick se insertan como texto normal (el chat de Kick los renderiza automáticamente)
- El formato interno `[emote:ID:nombre]` es manejado por el sistema existente

### Tabs
- Cambiá entre **Twitch** y **Kick** con los tabs en la parte superior del picker

---

## Flujo OAuth — Cómo funciona internamente

```
Dashboard (browser)
   │
   ├─→ Abre popup con URL de autorización de Twitch/Kick
   │       └─→ Usuario autoriza → Twitch redirige a tu servidor URL con token
   │
   ├─→ Dashboard detecta el token en la URL (o espera el popup)
   │
   └─→ Llama a /api/twitch/me para obtener user_id
           └─→ Guarda token + user_id en localStorage

Al enviar mensaje:
   Dashboard → POST /api/twitch/send → servidor → POST api.twitch.tv/helix/chat/messages
   Dashboard → POST /api/kick/send   → servidor → POST api.kick.com/public/v1/chat
```

---

## Nuevos Endpoints del servidor v3

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/twitch/token` | POST | Intercambia código OAuth por token (proxy) |
| `/api/twitch/me` | GET | Info del usuario con el token dado |
| `/api/twitch/send` | POST | Envía mensaje a Twitch |
| `/api/twitch/emotes` | GET | Lista emotes del canal + globales |
| `/api/kick/token` | POST | Intercambia código OAuth Kick por token |
| `/api/kick/send` | POST | Envía mensaje a Kick |
| `/api/kick/emotes` | GET | Lista emotes del canal Kick |
| `/health` | GET | Estado general |
| `/api/status` | GET | Estado detallado con info OAuth |

### Ejemplo de POST /api/twitch/send
```json
// Request
{
  "token": "user_access_token",
  "senderId": "12345678",
  "message": "Hola chat! PogChamp",
  "channel": "meevepics"
}
// Response
{ "ok": true }
```

### Ejemplo de POST /api/kick/send
```json
// Request
{
  "token": "kick_access_token",
  "message": "Hola chat!",
  "chatroomId": "1234567"
}
// Response
{ "ok": true, "data": {...} }
```

---

## Solución de problemas

### "Configura TWITCH_CLIENT_ID en el servidor"
El servidor no tiene la variable `TWITCH_CLIENT_ID`. Seguí el Paso 1 de esta guía.

### "Error verificando token Twitch"
El token expiró (duran ~60 días por defecto). Clic en **Logout** en la card de Twitch y volvé a hacer Login.

### El popup de OAuth se cierra solo sin completar
1. Verificá que la **Redirect URL** en dev.twitch.tv coincide exactamente con la URL de tu servidor (sin `/` al final)
2. Verificá que el popup no está siendo bloqueado por el navegador (permitir popups para esta página)

### Kick: "KICK_CLIENT_ID y KICK_CLIENT_SECRET no configurados"
El programa de developers de Kick todavía está en beta. Si no tenés acceso, el envío a Kick no está disponible, pero la lectura del chat sigue funcionando normalmente.

### Los emotes de Twitch no se cargan
- Verificá que tenés sesión iniciada en Twitch
- Los emotes del canal solo aparecen si el canal tiene emotes custom (requiere afiliado o partner)
- Los emotes globales siempre deberían cargarse

### Envié un mensaje pero no aparece en el chat
El servidor envía el mensaje a Twitch/Kick, pero el chat lee los mensajes por IRC/WebSocket. El mensaje debería aparecer en unos segundos. Si no aparece, puede que el bot no tenga permisos para chatear en el canal — verificá en la configuración de Twitch que tu app tiene el scope `user:write:chat`.

---

## Estructura del repositorio v3

```
multichat/
├── server/
│   ├── index.js          ← servidor v3 (con OAuth + envío)
│   └── package.json
├── dashboard/
│   └── index.html        ← dashboard v3 (con login, picker de emotes, envío)
├── overlay/
│   └── index.html        ← overlay OBS (sin cambios desde v2)
└── SETUP.md              ← esta guía
```

---

*Última actualización: febrero 2026 — v3*
