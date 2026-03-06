<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeve — Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Zen+Antique&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Special+Elite&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Rajdhani:wght@400;700&family=Orbitron:wght@400;700&family=Share+Tech+Mono&family=VT323&family=Exo+2:wght@400;700&family=Russo+One&family=Michroma&family=Nova+Square&display=swap" rel="stylesheet">
  <style>
    :root {
      --traje:#1e1c1a;--traje-light:#2a2826;--guante:#363432;
      --camisa:#dedad4;--camisa-dim:rgba(222,218,212,0.55);--camisa-muted:rgba(222,218,212,0.35);
      --corbata:#c8251c;--corbata-soft:rgba(200,37,28,0.15);--corbata-dim:rgba(200,37,28,0.08);
      --checker-dark:#5a5856;--checker-mid:#686664;--checker-light:#747270;--checker-pale:#807e7c;
      --stroke-dark:rgba(10,8,6,0.5);--shadow:2px 3px 0 rgba(10,8,6,0.3);
      --font-title:'Zen Antique',serif;--font-body:'Crimson Pro',serif;--font-mono:'Special Elite',monospace;
      --ov-emote-size:24px;
      --tt-panel-width: 320px;
    }
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
    body{background:var(--checker-mid);color:var(--traje);font-family:var(--font-body);min-height:100vh;overflow:hidden;}
    body.no-glow .platform-dot.ok{box-shadow:none!important;}
    body.no-glow #ws-dot.ok{box-shadow:none!important;}
    body.no-glow .msg-item.highlighted{box-shadow:none!important;}
    .particles{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;}
    .particle{position:absolute;background:var(--traje);opacity:0;border-radius:1px;animation:floatUp linear infinite;}
    @keyframes floatUp{0%{opacity:0;transform:translateY(105vh) rotate(var(--r,10deg));}12%{opacity:0.04;}88%{opacity:0.015;}100%{opacity:0;transform:translateY(-8vh) rotate(calc(var(--r)+20deg));}}
    header{position:fixed;top:0;left:0;right:0;height:54px;background:var(--traje);display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:200;border-bottom:2px solid var(--corbata);box-shadow:0 2px 0 rgba(200,37,28,0.2),0 6px 24px rgba(10,8,6,0.5);}
    .header-left{display:flex;align-items:center;gap:11px;}
    .logo-img{width:40px;height:40px;border-radius:50%;object-fit:cover;filter:grayscale(100%) contrast(1.35) brightness(0.8);border:1.5px solid var(--corbata);box-shadow:2px 2px 0 rgba(10,8,6,0.4),0 0 0 1px rgba(200,37,28,0.25);animation:logoWobble 6s ease-in-out infinite;flex-shrink:0;}
    @keyframes logoWobble{0%,100%{transform:rotate(-1.5deg) translateY(0);}35%{transform:rotate(1.2deg) translateY(-2px);}65%{transform:rotate(-0.4deg) translateY(-1px);}}
    .header-text{display:flex;flex-direction:column;gap:1px;}
    .header-title{font-family:var(--font-title);font-size:16px;letter-spacing:5px;color:var(--camisa);text-transform:uppercase;line-height:1;}
    .header-subtitle{font-family:var(--font-body);font-size:9px;font-style:italic;color:var(--camisa-dim);letter-spacing:1.5px;}
    .header-right{display:flex;align-items:center;gap:8px;}
    #ws-dot{width:7px;height:7px;border-radius:50%;background:var(--guante);border:1.5px solid var(--stroke-dark);transition:all 0.4s;flex-shrink:0;}
    #ws-dot.ok{background:var(--corbata);box-shadow:0 0 0 3px rgba(200,37,28,0.2);border-color:var(--corbata);animation:dotPulse 2.5s ease-in-out infinite;}
    @keyframes dotPulse{0%,100%{box-shadow:0 0 0 3px rgba(200,37,28,0.2);}50%{box-shadow:0 0 0 6px rgba(200,37,28,0.06);}}
    #ws-label{font-family:var(--font-mono);font-size:10px;color:var(--camisa-dim);letter-spacing:1px;text-transform:uppercase;}
    .layout{position:fixed;top:54px;left:0;right:0;bottom:0;display:flex;z-index:10;overflow:hidden;align-items:stretch;}
    .sidebar{width:294px;min-width:294px;height:calc(100vh - 54px);background:var(--checker-dark);border-right:1px solid rgba(10,8,6,0.4);box-shadow:2px 0 12px rgba(10,8,6,0.3);overflow-y:auto;overflow-x:hidden;padding:11px 10px 20px;display:block;transition:transform 0.4s cubic-bezier(0.4,0,0.2,1),min-width 0.4s,width 0.4s,border-color 0.3s,padding 0.4s;flex-shrink:0;z-index:20;}
    .sidebar .card{margin-bottom:7px;}.sidebar .card:last-child{margin-bottom:0;}
    .sidebar.collapsed{transform:translateX(-294px);min-width:0;width:0;border-color:transparent;padding:0;}
    .sidebar::-webkit-scrollbar{width:4px;}.sidebar::-webkit-scrollbar-track{background:rgba(10,8,6,0.2);}.sidebar::-webkit-scrollbar-thumb{background:var(--corbata);border-radius:2px;opacity:0.6;}
    #sidebar-toggle{position:fixed;top:50%;left:294px;transform:translateY(-50%) translateX(-50%);width:16px;height:44px;background:var(--checker-dark);border:1px solid rgba(10,8,6,0.35);border-left:none;border-radius:0 5px 5px 0;cursor:pointer;z-index:300;display:flex;align-items:center;justify-content:center;transition:left 0.4s cubic-bezier(0.4,0,0.2,1),background 0.2s;}
    #sidebar-toggle:hover{background:var(--guante);}
    #sidebar-toggle.collapsed{left:0;border-left:1px solid rgba(10,8,6,0.35);border-right:none;border-radius:5px 0 0 5px;}
    .toggle-arrow{font-size:9px;color:var(--camisa-muted);user-select:none;transition:transform 0.4s;}
    #sidebar-toggle.collapsed .toggle-arrow{transform:rotate(180deg);}
    #tt-panel{position:fixed;top:54px;right:0;width:var(--tt-panel-width);height:calc(100vh - 54px);background:var(--traje);border-left:2px solid rgba(255,45,120,0.35);box-shadow:-4px 0 24px rgba(255,45,120,0.1),-2px 0 8px rgba(10,8,6,0.4);z-index:150;display:flex;flex-direction:column;transform:translateX(100%);transition:transform 0.38s cubic-bezier(0.4,0,0.2,1),box-shadow 0.3s;overflow:hidden;}
    #tt-panel.open{transform:translateX(0);box-shadow:-6px 0 32px rgba(255,45,120,0.18),-2px 0 10px rgba(10,8,6,0.5);}
    #tt-toggle{position:fixed;top:50%;right:0;transform:translateY(-50%);width:22px;height:88px;background:var(--traje);border:2px solid rgba(255,45,120,0.4);border-right:none;border-radius:8px 0 0 8px;cursor:pointer;z-index:400;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;transition:right 0.38s cubic-bezier(0.4,0,0.2,1),background 0.2s,border-color 0.2s;padding:6px 3px;}
    #tt-toggle:hover{background:rgba(255,45,120,0.12);border-color:rgba(255,45,120,0.7);}
    #tt-toggle.open{right:var(--tt-panel-width);border-color:rgba(255,45,120,0.6);}
    #tt-toggle.open:hover{background:rgba(255,45,120,0.15);}
    .tt-toggle-icon{font-size:14px;line-height:1;}
    .tt-toggle-label{writing-mode:vertical-rl;text-orientation:mixed;font-family:var(--font-mono);font-size:6.5px;color:rgba(255,45,120,0.7);letter-spacing:1.5px;text-transform:uppercase;user-select:none;}
    #tt-toggle.open .tt-toggle-label{color:rgba(255,45,120,0.9);}
    .tt-panel-header{flex-shrink:0;display:flex;align-items:center;gap:8px;padding:10px 12px 9px;background:rgba(255,45,120,0.06);border-bottom:1px solid rgba(255,45,120,0.2);}
    .tt-panel-dot{width:7px;height:7px;border-radius:50%;background:#ff2d78;border:1.5px solid rgba(255,45,120,0.5);box-shadow:0 0 0 3px rgba(255,45,120,0.15);animation:ttDotPulse 2.5s ease-in-out infinite;flex-shrink:0;}
    @keyframes ttDotPulse{0%,100%{box-shadow:0 0 0 3px rgba(255,45,120,0.15);}50%{box-shadow:0 0 0 7px rgba(255,45,120,0.04);}}
    .tt-panel-title{font-family:var(--font-title);font-size:12px;letter-spacing:3px;color:#ff80b0;text-transform:uppercase;flex:1;}
    .tt-panel-actions{display:flex;gap:4px;}
    .tt-panel-btn{padding:3px 7px;background:none;border:1px solid rgba(255,45,120,0.3);border-radius:2px 4px 2px 3px;color:rgba(255,45,120,0.7);font-family:var(--font-mono);font-size:8px;cursor:pointer;transition:all 0.12s;letter-spacing:0.5px;text-transform:uppercase;}
    .tt-panel-btn:hover{background:rgba(255,45,120,0.15);color:#ff80b0;border-color:rgba(255,45,120,0.6);}
    .tt-url-bar{flex-shrink:0;display:flex;align-items:center;gap:0;border-bottom:1px solid rgba(255,45,120,0.15);background:rgba(10,8,6,0.3);}
    .tt-url-prefix{padding:7px 8px;font-family:var(--font-mono);font-size:8.5px;color:rgba(255,45,120,0.4);letter-spacing:0.3px;white-space:nowrap;flex-shrink:0;border-right:1px solid rgba(255,45,120,0.1);}
    #tt-user-input{flex:1;background:transparent;border:none;outline:none;padding:7px 8px;font-family:var(--font-mono);font-size:10px;color:var(--camisa);letter-spacing:0.5px;}
    #tt-user-input::placeholder{color:rgba(222,218,212,0.2);}
    .tt-go-btn{padding:7px 10px;background:rgba(255,45,120,0.12);border:none;border-left:1px solid rgba(255,45,120,0.15);color:rgba(255,45,120,0.8);font-family:var(--font-mono);font-size:9px;cursor:pointer;transition:all 0.12s;letter-spacing:0.5px;flex-shrink:0;}
    .tt-go-btn:hover{background:rgba(255,45,120,0.22);color:#ff2d78;}
    .tt-iframe-wrap{flex:1;position:relative;overflow:hidden;background:linear-gradient(160deg,#120008 0%,#0a0005 50%,#130012 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;}
    .tt-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;width:100%;}
    .tt-placeholder-icon{font-size:48px;animation:ttIconBounce 3s ease-in-out infinite;}
    @keyframes ttIconBounce{0%,100%{transform:scale(1) rotate(-4deg);}50%{transform:scale(1.1) rotate(4deg);}}
    .tt-placeholder-title{font-family:var(--font-title);font-size:14px;letter-spacing:3px;color:rgba(255,128,176,0.8);text-transform:uppercase;}
    .tt-placeholder-sub{font-family:var(--font-mono);font-size:8.5px;color:rgba(255,45,120,0.4);letter-spacing:1.5px;line-height:1.9;text-transform:uppercase;}
    .tt-placeholder-hint{font-family:var(--font-mono);font-size:8px;color:rgba(255,45,120,0.25);letter-spacing:1px;border:1px solid rgba(255,45,120,0.1);padding:6px 10px;border-radius:2px;line-height:1.7;}
    .tt-window-status{display:none;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;width:100%;}
    .tt-window-status.active{display:flex;}
    .tt-window-pulse{width:64px;height:64px;border-radius:50%;background:rgba(255,45,120,0.1);border:2px solid rgba(255,45,120,0.4);display:flex;align-items:center;justify-content:center;font-size:28px;animation:ttWinPulse 2s ease-in-out infinite;}
    @keyframes ttWinPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,45,120,0.3);}50%{box-shadow:0 0 0 14px rgba(255,45,120,0);}}
    .tt-window-label{font-family:var(--font-title);font-size:13px;letter-spacing:3px;color:rgba(255,128,176,0.9);text-transform:uppercase;}
    .tt-window-user{font-family:var(--font-mono);font-size:10px;color:rgba(255,45,120,0.6);letter-spacing:1.5px;}
    .tt-window-hint{font-family:var(--font-mono);font-size:8px;color:rgba(255,45,120,0.3);letter-spacing:1px;line-height:1.8;max-width:200px;}
    .tt-window-btns{display:flex;flex-direction:column;gap:6px;width:100%;max-width:200px;}
    .tt-win-btn{padding:7px 14px;border-radius:2px 4px 2px 3px;font-family:var(--font-mono);font-size:8.5px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;cursor:pointer;transition:all 0.13s;}
    .tt-win-btn-focus{background:rgba(255,45,120,0.15);border:1.5px solid rgba(255,45,120,0.5);color:#ff80b0;}
    .tt-win-btn-focus:hover{background:rgba(255,45,120,0.28);color:#ff2d78;}
    .tt-win-btn-close{background:rgba(10,8,6,0.4);border:1px solid rgba(255,45,120,0.2);color:rgba(255,45,120,0.4);}
    .tt-win-btn-close:hover{border-color:rgba(255,45,120,0.5);color:rgba(255,45,120,0.7);}
    .tt-visibility-note{flex-shrink:0;padding:5px 10px;background:rgba(255,45,120,0.07);border-top:1px solid rgba(255,45,120,0.12);font-family:var(--font-mono);font-size:7.5px;color:rgba(255,45,120,0.5);letter-spacing:0.8px;line-height:1.6;text-align:center;}
    .main{flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden;background:var(--checker-mid);position:relative;transition:margin-right 0.38s cubic-bezier(0.4,0,0.2,1);}
    .main.tt-open{margin-right:var(--tt-panel-width);}
    .main::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;background-image:repeating-linear-gradient(to bottom,transparent,transparent 29px,rgba(10,8,6,0.1) 29px,rgba(10,8,6,0.1) 30px);}
    .card{background:var(--guante);border-top:1.5px solid rgba(10,8,6,0.5);border-left:1.5px solid rgba(10,8,6,0.5);border-right:1px solid rgba(10,8,6,0.2);border-bottom:1px solid rgba(10,8,6,0.2);border-radius:2px 5px 3px 4px;padding:10px 12px;box-shadow:var(--shadow);position:relative;flex-shrink:0;overflow:visible;}
    .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--corbata),rgba(200,37,28,0.2) 55%,transparent);}
    .card-title{font-family:var(--font-title);font-size:8.5px;letter-spacing:3px;text-transform:uppercase;color:var(--camisa-dim);margin-bottom:8px;display:flex;align-items:center;gap:6px;}
    .card-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(200,37,28,0.3),transparent);}
    label{display:block;font-family:var(--font-mono);font-size:8.5px;color:var(--camisa-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;}
    .input-row{display:flex;gap:5px;}
    input[type=text],input[type=number],select{background:var(--traje-light);border-top:1px solid rgba(10,8,6,0.5);border-left:1px solid rgba(10,8,6,0.5);border-right:1px solid rgba(10,8,6,0.15);border-bottom:1px solid rgba(10,8,6,0.15);border-radius:2px 4px 3px 3px;padding:6px 9px;color:var(--camisa);font-family:var(--font-body);font-size:12px;outline:none;flex:1;transition:border-color 0.2s,box-shadow 0.2s;}
    input[type=text]:focus,input[type=number]:focus,select:focus{border-color:var(--corbata);box-shadow:0 0 0 2px var(--corbata-dim);}
    input::placeholder{color:var(--camisa-muted);}
    select{cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23dedad4'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center;padding-right:26px;background-color:var(--traje-light);}
    .btn{padding:6px 13px;border-radius:2px 4px 3px 3px;border:none;font-family:var(--font-mono);font-size:9.5px;font-weight:700;cursor:pointer;transition:all 0.13s;white-space:nowrap;letter-spacing:0.7px;text-transform:uppercase;}
    .btn-primary{background:var(--corbata);color:var(--camisa);border-top:1.5px solid rgba(200,37,28,0.9);border-left:1.5px solid rgba(200,37,28,0.9);border-right:1.5px solid rgba(200,37,28,0.4);border-bottom:1.5px solid rgba(200,37,28,0.4);box-shadow:var(--shadow);}
    .btn-primary:hover{background:#a01e16;transform:translate(-1px,-1px);box-shadow:3px 4px 0 rgba(10,8,6,0.3);}
    .btn-primary:active{transform:translate(1px,1px);box-shadow:none;}
    .btn-secondary{background:var(--traje-light);color:var(--camisa);border-top:1px solid rgba(10,8,6,0.5);border-left:1px solid rgba(10,8,6,0.5);border-right:1px solid rgba(10,8,6,0.15);border-bottom:1px solid rgba(10,8,6,0.15);box-shadow:var(--shadow);}
    .btn-secondary:hover{background:var(--guante);border-color:rgba(10,8,6,0.7);transform:translate(-1px,-1px);box-shadow:3px 4px 0 rgba(10,8,6,0.2);}
    .btn-secondary:active{transform:translate(1px,1px);box-shadow:none;}
    .btn-full{width:100%;}
    .btn-danger{background:var(--corbata-dim);color:var(--corbata);border:1.5px solid rgba(200,37,28,0.35);box-shadow:var(--shadow);}
    .btn-danger:hover{background:var(--corbata-soft);border-color:var(--corbata);}
    .btn-row{display:flex;gap:5px;}
    .toggle-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:3px 0;}
    .toggle-label{font-family:var(--font-mono);font-size:9.5px;color:var(--camisa);flex:1;}
    .toggle-switch{position:relative;width:34px;height:17px;flex-shrink:0;}
    .toggle-switch input{opacity:0;width:0;height:0;position:absolute;}
    .toggle-slider{position:absolute;inset:0;background:var(--traje);border:1px solid rgba(10,8,6,0.5);border-radius:17px;cursor:pointer;transition:all 0.22s;}
    .toggle-slider::before{content:'';position:absolute;width:11px;height:11px;left:2px;top:50%;transform:translateY(-50%);background:var(--checker-light);border-radius:50%;transition:all 0.22s;}
    .toggle-switch input:checked+.toggle-slider{background:var(--corbata);border-color:var(--corbata);}
    .toggle-switch input:checked+.toggle-slider::before{left:19px;background:var(--camisa);}
    .platform-row{display:flex;align-items:center;gap:8px;padding:6px 9px;background:var(--traje-light);border-top:1px solid rgba(10,8,6,0.45);border-left:1px solid rgba(10,8,6,0.45);border-right:1px solid rgba(10,8,6,0.12);border-bottom:1px solid rgba(10,8,6,0.12);border-radius:2px 4px 3px 3px;margin-bottom:4px;box-shadow:1px 2px 0 rgba(10,8,6,0.15);transition:border-color 0.2s;}
    .platform-row:last-child{margin-bottom:0;}.platform-row:hover{border-color:rgba(200,37,28,0.35);}
    .platform-dot{width:6px;height:6px;border-radius:50%;background:var(--guante);flex-shrink:0;border:1px solid rgba(10,8,6,0.4);transition:all 0.3s;}
    .platform-dot.ok{background:var(--corbata);box-shadow:0 0 0 3px rgba(200,37,28,0.18);border-color:var(--corbata);}
    .platform-icon{font-size:13px;filter:grayscale(100%) contrast(0.5) brightness(1.8);}
    .platform-info{flex:1;min-width:0;}
    .platform-name{font-family:var(--font-title);font-size:11.5px;color:var(--camisa);letter-spacing:0.3px;}
    .platform-channel{font-family:var(--font-mono);font-size:8.5px;color:var(--camisa-muted);}
    .info-box{border-radius:2px 4px 3px 3px;padding:7px 9px;font-family:var(--font-mono);font-size:9px;line-height:1.7;}
    .info-box a{color:inherit;}
    .info-red{background:var(--corbata-soft);border:1px solid rgba(200,37,28,0.4);color:var(--corbata);}
    .info-yellow{background:rgba(180,130,30,0.12);border:1px solid rgba(180,130,30,0.3);color:#c8a040;}
    .info-green{background:rgba(222,218,212,0.08);border:1px solid rgba(222,218,212,0.2);color:var(--camisa-dim);}
    .url-box{background:var(--traje);border:1px solid rgba(10,8,6,0.4);border-radius:2px 4px 3px 3px;padding:6px 9px;font-family:monospace;font-size:9.5px;color:var(--camisa-dim);word-break:break-all;cursor:pointer;transition:all 0.15s;line-height:1.5;opacity:0.8;}
    .url-box:hover{border-color:var(--corbata);opacity:1;}
    .hint{font-family:var(--font-mono);font-size:8.5px;color:var(--camisa-muted);line-height:1.6;}
    .font-preview{padding:6px 9px;background:var(--traje-light);border:1px solid rgba(10,8,6,0.4);border-radius:2px;font-size:13px;color:var(--camisa);text-align:center;min-height:30px;display:flex;align-items:center;justify-content:center;}
    .config-row{display:flex;align-items:center;gap:8px;}
    .value-display{font-family:var(--font-mono);color:var(--camisa);font-size:9.5px;min-width:32px;}
    input[type=range]{width:100%;cursor:pointer;-webkit-appearance:none;appearance:none;height:2px;background:rgba(222,218,212,0.15);border-radius:1px;outline:none;border:none;}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--corbata);cursor:pointer;border:2px solid var(--guante);box-shadow:1px 1px 0 rgba(10,8,6,0.3);}
    input[type=color]{width:32px;height:24px;border:1px solid rgba(200,37,28,0.4);border-radius:2px;cursor:pointer;background:transparent;padding:1px;}
    .separator{border-top:1px solid rgba(200,37,28,0.15);margin:5px 0;}
    .chat-panel{flex:1;overflow-y:auto;overflow-x:hidden;padding:13px 15px;display:flex;flex-direction:column;gap:5px;position:relative;z-index:1;}
    .chat-panel::-webkit-scrollbar{width:3px;}.chat-panel::-webkit-scrollbar-track{background:transparent;}.chat-panel::-webkit-scrollbar-thumb{background:rgba(10,8,6,0.25);border-radius:2px;}.chat-panel::-webkit-scrollbar-thumb:hover{background:rgba(200,37,28,0.4);}
    .chat-spacer{flex:1;min-height:0;}
    #chat-placeholder{text-align:center;color:rgba(10,8,6,0.4);font-family:var(--font-title);font-size:14px;font-style:italic;padding:70px 20px;letter-spacing:2px;line-height:2.8;}
    .msg-item{position:relative;display:flex;align-items:flex-start;gap:9px;padding:8px 11px;background:var(--traje-light);border-top:1.5px solid rgba(10,8,6,0.35);border-left:3px solid rgba(10,8,6,0.35);border-right:1px solid rgba(10,8,6,0.12);border-bottom:1px solid rgba(10,8,6,0.12);border-radius:1px 4px 3px 2px;cursor:pointer;animation:msgIn 0.25s cubic-bezier(0.2,0.9,0.3,1);transition:background 0.14s,border-left-color 0.14s,transform 0.12s,box-shadow 0.12s;flex-shrink:0;box-shadow:var(--shadow);}
    @keyframes msgIn{from{opacity:0;transform:translateX(-9px);}to{opacity:1;transform:translateX(0);}}
    .msg-item:hover{background:var(--guante);border-left-color:var(--corbata);transform:translateX(2px);box-shadow:3px 4px 0 rgba(10,8,6,0.2);}
    .msg-item.twitch{border-left-color:#7b5ea7;}.msg-item.kick{border-left-color:#3a8a2a;}.msg-item.tiktok{border-left-color:#b0003a;}.msg-item.youtube{border-left-color:#a01010;}.msg-item.custom{border-left-color:rgba(200,37,28,0.6);}.msg-item.system{border-left-color:var(--corbata);}
    .msg-item.highlighted{background:rgba(200,37,28,0.18);border-left:3px solid var(--corbata)!important;border-color:rgba(200,37,28,0.3);box-shadow:0 0 0 2px rgba(200,37,28,0.12),var(--shadow);animation:msgIn 0.25s cubic-bezier(0.2,0.9,0.3,1),hlPulse 3s ease-in-out infinite;}
    @keyframes hlPulse{0%,100%{box-shadow:0 0 0 2px rgba(200,37,28,0.12);}50%{box-shadow:0 0 0 5px rgba(200,37,28,0.06);}}
    .chat-panel.single-line .msg-item{align-items:center;padding:5px 11px;gap:7px;}
    .chat-panel.single-line .msg-avatar{width:20px!important;height:20px!important;min-width:20px;}
    .chat-panel.single-line .msg-body{display:flex;align-items:center;gap:5px;flex:1;min-width:0;overflow:hidden;}
    .chat-panel.single-line .msg-header{display:contents;}
    .chat-panel.single-line .msg-time{display:none;}
    .chat-panel.single-line .msg-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .msg-avatar{width:32px;height:32px;border-radius:50%;border:1.5px solid rgba(10,8,6,0.4);flex-shrink:0;overflow:hidden;background:var(--checker-dark);filter:grayscale(45%);box-shadow:1px 1px 0 rgba(10,8,6,0.25);}
    .msg-avatar img{width:100%;height:100%;object-fit:cover;display:block;}
    .msg-avatar-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:12px;opacity:0.45;color:var(--camisa);}
    .msg-body{flex:1;min-width:0;}
    .msg-header{display:flex;align-items:center;gap:5px;margin-bottom:3px;flex-wrap:wrap;}
    .msg-user{font-family:var(--font-title);font-size:13px;color:var(--camisa);letter-spacing:0.3px;white-space:nowrap;}
    .msg-platform{display:inline-flex;align-items:center;gap:2px;font-family:var(--font-mono);font-size:7.5px;padding:1px 5px;border-radius:2px;font-weight:700;letter-spacing:0.5px;background:rgba(222,218,212,0.07);border:1px solid rgba(222,218,212,0.15);color:var(--camisa-dim);}
    .msg-platform svg{width:8px;height:8px;flex-shrink:0;}
    .msg-time{font-family:var(--font-mono);font-size:8.5px;color:var(--camisa-muted);margin-left:auto;white-space:nowrap;}
    .msg-text{font-size:13px;color:var(--camisa);line-height:1.55;word-break:break-word;font-family:var(--font-body);}
    .msg-text img.emote{height:var(--ov-emote-size,24px);width:auto;vertical-align:middle;margin:0 2px;filter:grayscale(40%);}
    .msg-role{font-family:var(--font-mono);font-size:7.5px;padding:1px 4px;background:rgba(222,218,212,0.08);border:1px solid rgba(222,218,212,0.15);border-radius:2px;color:var(--camisa-dim);letter-spacing:0.5px;}
    .msg-highlight-btn{margin-left:auto;padding:2px 7px;font-size:7.5px;border-radius:2px;border:1px solid rgba(200,37,28,0.3);background:var(--corbata-dim);color:var(--corbata);cursor:pointer;display:none;font-family:var(--font-mono);font-weight:700;letter-spacing:0.5px;text-transform:uppercase;transition:all 0.12s;}
    .msg-highlight-btn:hover{background:var(--corbata);color:var(--camisa);border-color:var(--corbata);}
    .msg-item:hover .msg-highlight-btn,.msg-item.highlighted .msg-highlight-btn{display:inline-block;}
    .msg-donation-tag{margin-top:4px;padding:3px 9px;background:var(--corbata-soft);border:1px solid rgba(200,37,28,0.3);border-radius:2px;font-family:var(--font-mono);font-size:8.5px;font-weight:700;color:var(--corbata);text-align:center;text-transform:uppercase;letter-spacing:1.5px;}
    #hl-bar{padding:7px 14px;background:rgba(200,37,28,0.1);border-top:1px solid rgba(200,37,28,0.25);display:none;align-items:center;gap:9px;font-family:var(--font-mono);font-size:8.5px;color:var(--corbata);letter-spacing:0.5px;text-transform:uppercase;z-index:1;position:relative;}
    #hl-bar.active{display:flex;}
    #hl-bar strong{color:var(--camisa);max-width:400px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--font-body);font-size:12px;text-transform:none;font-weight:400;}
    .input-bar{border-top:2px solid var(--corbata);background:var(--traje);position:relative;z-index:1;display:flex;flex-direction:column;gap:0;}
    .chat-visor{position:absolute;top:0;left:0;right:0;bottom:0;z-index:50;display:flex;flex-direction:column;background:var(--traje);transform:translateY(100%);opacity:0;transition:transform 0.32s cubic-bezier(0.4,0,0.2,1),opacity 0.25s;pointer-events:none;}
    .chat-visor.open{transform:translateY(0);opacity:1;pointer-events:all;}
    .chat-visor-header{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--traje);border-bottom:1px solid rgba(200,37,28,0.15);flex-shrink:0;}
    .chat-visor-title{font-family:var(--font-title);font-size:12px;letter-spacing:3px;color:var(--camisa);text-transform:uppercase;flex:1;}
    .chat-visor-badge{font-family:var(--font-mono);font-size:8px;padding:2px 7px;border-radius:2px;font-weight:700;letter-spacing:0.5px;}
    .chat-visor-badge.twitch{background:rgba(145,70,255,0.18);border:1px solid rgba(145,70,255,0.4);color:#c9aff5;}
    .chat-visor-badge.kick{background:rgba(83,252,24,0.1);border:1px solid rgba(83,252,24,0.3);color:#7ecf6e;}
    .chat-visor-badge.youtube{background:rgba(255,68,68,0.12);border:1px solid rgba(255,68,68,0.35);color:#ff8888;}
    .chat-visor-badge.tiktok{background:rgba(255,45,120,0.12);border:1px solid rgba(255,45,120,0.35);color:#ff80b0;}
    .chat-visor-btn{padding:3px 9px;background:none;border:1px solid rgba(200,37,28,0.35);border-radius:2px 4px 3px 3px;color:var(--corbata);font-family:var(--font-mono);font-size:9px;cursor:pointer;transition:all 0.12s;letter-spacing:0.5px;text-transform:uppercase;}
    .chat-visor-btn:hover{background:var(--corbata);color:var(--camisa);}
    .chat-visor-btn.open-live{border-color:rgba(222,218,212,0.2);color:var(--camisa-dim);}
    .chat-visor-btn.open-live:hover{background:var(--guante);color:var(--camisa);border-color:rgba(222,218,212,0.4);}
    .chat-visor-iframe-wrap{flex:1;position:relative;overflow:hidden;background:var(--traje-light);}
    .chat-visor-iframe-wrap iframe{width:100%;height:100%;border:none;display:block;}
    .chat-visor-unavailable{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font-family:var(--font-title);font-size:13px;color:var(--camisa-muted);letter-spacing:2px;text-align:center;padding:30px;}
    .chat-visor-unavailable .uv-icon{font-size:36px;opacity:0.35;}
    .chat-visor-unavailable .uv-msg{color:var(--camisa-dim);font-size:13px;}
    .chat-visor-unavailable .uv-sub{font-family:var(--font-mono);font-size:9px;color:var(--camisa-muted);letter-spacing:1px;max-width:280px;line-height:1.8;opacity:0.7;}
    .chat-visor-unavailable .uv-btn{margin-top:4px;padding:7px 18px;background:none;font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:2px 4px 3px 3px;transition:all 0.15s;}
    .chat-visor-unavailable .uv-btn.twitch{border:1.5px solid rgba(145,70,255,0.5);color:#c9aff5;background:rgba(145,70,255,0.08);}
    .chat-visor-unavailable .uv-btn.twitch:hover{background:rgba(145,70,255,0.2);}
    .chat-visor-unavailable .uv-btn.kick{border:1.5px solid rgba(83,252,24,0.4);color:#7ecf6e;background:rgba(83,252,24,0.06);}
    .chat-visor-unavailable .uv-btn.kick:hover{background:rgba(83,252,24,0.14);}
    .chat-visor-unavailable .uv-btn.youtube{border:1.5px solid rgba(255,68,68,0.45);color:#ff8888;background:rgba(255,68,68,0.08);}
    .chat-visor-unavailable .uv-btn.youtube:hover{background:rgba(255,68,68,0.18);}
    .chat-visor-unavailable .uv-btn.tiktok{border:1.5px solid rgba(255,45,120,0.45);color:#ff80b0;background:rgba(255,45,120,0.08);}
    .chat-visor-unavailable .uv-btn.tiktok:hover{background:rgba(255,45,120,0.18);}
    .tt-preview-bg{position:absolute;inset:0;background:linear-gradient(135deg,#1a0010,#0d0008,#1a001a);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;}
    .tt-preview-logo{font-size:52px;animation:ttBounce 2s ease-in-out infinite;}
    @keyframes ttBounce{0%,100%{transform:scale(1) rotate(-3deg);}50%{transform:scale(1.08) rotate(3deg);}}
    .tt-preview-user{font-family:var(--font-title);font-size:16px;letter-spacing:4px;color:rgba(255,128,176,0.9);text-transform:uppercase;}
    .tt-preview-sub{font-family:var(--font-mono);font-size:9px;color:rgba(255,45,120,0.5);letter-spacing:2px;text-transform:uppercase;}
    .target-row{display:flex;align-items:center;gap:4px;padding:6px 13px 5px;border-bottom:1px solid rgba(200,37,28,0.12);background:rgba(10,8,6,0.18);overflow-x:auto;scrollbar-width:none;}
    .target-row::-webkit-scrollbar{display:none;}
    .target-label{font-family:var(--font-mono);font-size:7.5px;color:var(--camisa-muted);text-transform:uppercase;letter-spacing:1px;white-space:nowrap;margin-right:3px;flex-shrink:0;}
    .target-btn{display:inline-flex;align-items:center;gap:4px;padding:3px 8px 3px 6px;border-radius:2px 4px 2px 3px;border:1px solid rgba(10,8,6,0.45);background:var(--traje-light);font-family:var(--font-mono);font-size:8px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;cursor:pointer;transition:all 0.13s;white-space:nowrap;flex-shrink:0;color:var(--camisa-muted);box-shadow:1px 2px 0 rgba(10,8,6,0.2);position:relative;overflow:hidden;}
    .target-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 60%);pointer-events:none;}
    .target-btn .tb-dot{width:5px;height:5px;border-radius:50%;background:var(--guante);border:1px solid rgba(255,255,255,0.1);transition:all 0.15s;flex-shrink:0;}
    .target-btn:hover{border-color:rgba(222,218,212,0.25);color:var(--camisa);}
    .target-btn.active{border-color:var(--tb-color,var(--corbata));color:var(--tb-color,var(--corbata));background:var(--tb-bg,rgba(200,37,28,0.1));box-shadow:0 0 0 1px var(--tb-color,var(--corbata)),1px 2px 0 rgba(10,8,6,0.2);}
    .target-btn.active .tb-dot{background:var(--tb-color,var(--corbata));box-shadow:0 0 0 2px var(--tb-glow,rgba(200,37,28,0.2));border-color:var(--tb-color,var(--corbata));}
    .target-btn[data-target="twitch"]{--tb-color:#9146ff;--tb-bg:rgba(145,70,255,0.1);--tb-glow:rgba(145,70,255,0.2);}
    .target-btn[data-target="kick"]{--tb-color:#53fc18;--tb-bg:rgba(83,252,24,0.08);--tb-glow:rgba(83,252,24,0.18);}
    .target-btn[data-target="youtube"]{--tb-color:#ff4444;--tb-bg:rgba(255,68,68,0.1);--tb-glow:rgba(255,68,68,0.2);}
    .target-btn[data-target="tiktok"]{--tb-color:#ff2d78;--tb-bg:rgba(255,45,120,0.1);--tb-glow:rgba(255,45,120,0.2);}
    .target-btn.viewer-btn{--tb-color:#aaa;}
    .target-btn.viewer-btn[data-view="twitch"]{--tb-color:#9146ff;--tb-bg:rgba(145,70,255,0.1);--tb-glow:rgba(145,70,255,0.2);}
    .target-btn.viewer-btn[data-view="kick"]{--tb-color:#53fc18;--tb-bg:rgba(83,252,24,0.08);--tb-glow:rgba(83,252,24,0.18);}
    .target-btn.viewer-btn[data-view="youtube"]{--tb-color:#ff4444;--tb-bg:rgba(255,68,68,0.1);--tb-glow:rgba(255,68,68,0.2);}
    .target-btn.viewer-btn[data-view="tiktok"]{--tb-color:#ff2d78;--tb-bg:rgba(255,45,120,0.1);--tb-glow:rgba(255,45,120,0.2);}
    .target-btn.viewer-btn.viewing{border-color:var(--tb-color);color:var(--tb-color);background:var(--tb-bg);box-shadow:0 0 0 1px var(--tb-color),1px 2px 0 rgba(10,8,6,0.2);}
    .target-btn.viewer-btn.viewing .tb-dot{background:var(--tb-color);box-shadow:0 0 0 2px var(--tb-glow);border-color:var(--tb-color);animation:dotPulse 2s ease-in-out infinite;}
    .target-sep{width:1px;height:18px;background:rgba(200,37,28,0.2);flex-shrink:0;margin:0 4px;}
    .input-row-msg{display:flex;gap:7px;padding:8px 13px;}
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(10,8,6,0.7);z-index:500;align-items:center;justify-content:center;backdrop-filter:blur(4px);}
    .modal-overlay.open{display:flex;}
    .modal-box{background:var(--traje-light);border-top:2px solid var(--corbata);border-left:2px solid rgba(10,8,6,0.5);border-right:1.5px solid rgba(10,8,6,0.2);border-bottom:1.5px solid rgba(10,8,6,0.2);border-radius:2px 6px 4px 5px;padding:26px;max-width:480px;width:90%;position:relative;box-shadow:5px 6px 0 rgba(10,8,6,0.3),0 20px 50px rgba(10,8,6,0.5);}
    .modal-title{font-family:var(--font-title);font-size:16px;color:var(--camisa);margin-bottom:14px;letter-spacing:1px;}
    .modal-close{position:absolute;top:11px;right:13px;background:none;border:none;color:var(--camisa-muted);font-size:17px;cursor:pointer;}
    .modal-close:hover{color:var(--corbata);}
    .modal-box ol{padding-left:17px;line-height:2.3;font-size:11.5px;color:var(--camisa-dim);font-family:var(--font-mono);}
    .modal-box ol strong{color:var(--camisa);}
    .modal-box code{background:var(--traje);border:1px solid rgba(10,8,6,0.4);padding:2px 6px;border-radius:2px;font-size:10.5px;color:var(--camisa);}
    #toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%) translateY(50px);background:var(--corbata);color:var(--camisa);padding:8px 16px;border-radius:2px 4px 3px 3px;font-family:var(--font-mono);font-size:9.5px;letter-spacing:0.8px;text-transform:uppercase;z-index:999;opacity:0;transition:all 0.28s cubic-bezier(0.34,1.56,0.64,1);pointer-events:none;white-space:nowrap;box-shadow:3px 4px 0 rgba(10,8,6,0.35);}
    #toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

    /* TTS indicator en header */
    #tts-indicator{display:none;align-items:center;gap:5px;padding:3px 8px;border-radius:2px 4px 2px 3px;border:1px solid rgba(100,200,100,0.35);background:rgba(100,200,100,0.08);cursor:pointer;user-select:none;}
    #tts-indicator.active{display:flex;}
    #tts-indicator.speaking{border-color:rgba(100,200,100,0.7);background:rgba(100,200,100,0.15);animation:ttsSpeakPulse 0.8s ease-in-out infinite;}
    @keyframes ttsSpeakPulse{0%,100%{box-shadow:0 0 0 0 rgba(100,200,100,0.3);}50%{box-shadow:0 0 0 5px rgba(100,200,100,0);}}
    .tts-dot{width:6px;height:6px;border-radius:50%;background:#64c864;flex-shrink:0;}
    #tts-indicator.speaking .tts-dot{animation:ttsDotBlink 0.6s ease-in-out infinite;}
    @keyframes ttsDotBlink{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.7);}}
    #tts-indicator-label{font-family:var(--font-mono);font-size:8.5px;color:#64c864;letter-spacing:0.8px;text-transform:uppercase;}
    .tts-waves{display:none;align-items:flex-end;gap:2px;height:12px;}
    #tts-indicator.speaking .tts-waves{display:flex;}
    .tts-wave{width:2px;background:#64c864;border-radius:1px;animation:ttsWave 0.8s ease-in-out infinite;}
    .tts-wave:nth-child(1){height:4px;animation-delay:0s;}.tts-wave:nth-child(2){height:8px;animation-delay:0.1s;}.tts-wave:nth-child(3){height:12px;animation-delay:0.2s;}.tts-wave:nth-child(4){height:6px;animation-delay:0.3s;}.tts-wave:nth-child(5){height:3px;animation-delay:0.4s;}
    @keyframes ttsWave{0%,100%{transform:scaleY(0.4);}50%{transform:scaleY(1);}}

    /* TTS card en sidebar */
    .tts-platform-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:4px;}
    .tts-plat-btn{padding:4px 6px;border-radius:2px 4px 2px 3px;font-family:var(--font-mono);font-size:8px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;cursor:pointer;transition:all 0.13s;border:1.5px solid rgba(10,8,6,0.4);background:var(--traje-light);color:var(--camisa-muted);text-align:center;}
    .tts-plat-btn.ignored{background:rgba(200,37,28,0.06);border-color:rgba(200,37,28,0.25);color:var(--corbata);text-decoration:line-through;opacity:0.7;}
    .tts-list-wrap{background:var(--traje);border:1px solid rgba(10,8,6,0.4);border-radius:2px 4px 3px 3px;max-height:90px;overflow-y:auto;margin-bottom:4px;}
    .tts-list-wrap::-webkit-scrollbar{width:3px;}.tts-list-wrap::-webkit-scrollbar-thumb{background:rgba(200,37,28,0.3);}
    .tts-list-item{display:flex;align-items:center;justify-content:space-between;padding:3px 7px;border-bottom:1px solid rgba(10,8,6,0.2);font-family:var(--font-mono);font-size:9px;color:var(--camisa-dim);}
    .tts-list-item:last-child{border-bottom:none;}
    .tts-list-del{background:none;border:none;color:rgba(200,37,28,0.5);cursor:pointer;font-size:10px;padding:0 2px;transition:color 0.12s;}
    .tts-list-del:hover{color:var(--corbata);}
    .tts-list-empty{padding:6px 7px;font-family:var(--font-mono);font-size:8.5px;color:var(--camisa-muted);font-style:italic;}
    .tts-queue-bar{display:flex;align-items:center;gap:6px;padding:4px 8px;background:rgba(100,200,100,0.05);border:1px solid rgba(100,200,100,0.12);border-radius:2px;margin-bottom:4px;min-height:24px;}
    .tts-queue-label{font-family:var(--font-mono);font-size:8px;color:rgba(100,200,100,0.5);letter-spacing:0.8px;flex-shrink:0;}
    .tts-queue-text{font-family:var(--font-mono);font-size:8.5px;color:rgba(100,200,100,0.8);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .tts-queue-count{font-family:var(--font-mono);font-size:8px;color:rgba(100,200,100,0.4);flex-shrink:0;}
    .msg-item.tts-reading{border-left-color:#64c864!important;background:rgba(100,200,100,0.07)!important;}
    .tts-msg-badge{display:none;font-family:var(--font-mono);font-size:7px;padding:1px 5px;border-radius:2px;background:rgba(100,200,100,0.12);border:1px solid rgba(100,200,100,0.3);color:#64c864;letter-spacing:0.5px;margin-left:3px;}
    .msg-item.tts-reading .tts-msg-badge{display:inline-block;}

    /* TTS widget URL box */
    .tts-widget-url-box{background:var(--traje);border:1px solid rgba(100,200,100,0.3);border-radius:2px 4px 3px 3px;padding:5px 8px;font-family:monospace;font-size:8px;color:rgba(100,200,100,0.8);word-break:break-all;cursor:pointer;transition:all 0.15s;line-height:1.6;opacity:0.9;margin-bottom:3px;}
    .tts-widget-url-box:hover{border-color:rgba(100,200,100,0.6);opacity:1;}
  </style>
</head>
<body>
<div class="particles" id="particles"></div>
<header>
  <div class="header-left">
    <img class="logo-img" src="https://i.ibb.co/7xhK7QHb/279-sin-t-tulo-20250219223210.png" alt="Meeve" onerror="this.style.display='none'" />
    <div class="header-text">
      <div class="header-title">Meeve</div>
      <div class="header-subtitle">multichat dashboard</div>
    </div>
  </div>
  <div class="header-right">
    <div id="tts-indicator" title="TTS activo en widget OBS">
      <span class="tts-dot"></span>
      <span id="tts-indicator-label">TTS ON</span>
      <div class="tts-waves">
        <div class="tts-wave"></div><div class="tts-wave"></div><div class="tts-wave"></div><div class="tts-wave"></div><div class="tts-wave"></div>
      </div>
    </div>
    <div id="ws-dot"></div>
    <span id="ws-label">Desconectado</span>
  </div>
</header>

<div class="layout">
  <button id="sidebar-toggle" onclick="toggleSidebar()" title="Panel">
    <span class="toggle-arrow">&#9664;</span>
  </button>

  <!-- ════ SIDEBAR ════ -->
  <div class="sidebar">

    <div class="card">
      <div class="card-title">&#9675; Servidor</div>
      <label>URL del servidor</label>
      <div class="input-row" style="margin-bottom:5px;">
        <input id="serverUrl" type="text" placeholder="wss://tu-app.onrender.com" />
        <button class="btn btn-primary" onclick="saveAndConnect()">Conectar</button>
      </div>
      <div class="hint">Se guarda en el navegador</div>
    </div>

    <div class="card">
      <div class="card-title">&#9678; Estado Conexiones</div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-twitch"></span>
        <span class="platform-icon">&#x1F7E3;</span>
        <div class="platform-info"><div class="platform-name">Twitch</div><div class="platform-channel" id="ch-twitch">&#x2014;</div></div>
      </div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-kick"></span>
        <span class="platform-icon">&#x1F7E2;</span>
        <div class="platform-info"><div class="platform-name">Kick</div><div class="platform-channel" id="ch-kick">&#x2014;</div></div>
      </div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-tiktok"></span>
        <span class="platform-icon">&#x1F3B5;</span>
        <div class="platform-info"><div class="platform-name">TikTok</div><div class="platform-channel" id="ch-tiktok">&#x2014;</div></div>
      </div>
      <div class="platform-row">
        <span class="platform-dot" id="dot-youtube"></span>
        <span class="platform-icon">&#x25B6;&#xFE0F;</span>
        <div class="platform-info"><div class="platform-name">YouTube</div><div class="platform-channel" id="ch-youtube">&#x2014;</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">&#9689; Kick &#x2014; Chatroom</div>
      <div id="kick-status-box" class="info-box info-green" style="margin-bottom:8px;">Kick bloquea servidores. El navegador actua como puente.</div>
      <div class="btn-row">
        <button class="btn btn-secondary btn-full" onclick="resolveKickId()">&#x1F50D; Automatico</button>
        <button class="btn btn-secondary btn-full" onclick="toggleKickManual()">&#x270F; Manual</button>
      </div>
      <div id="kick-manual-wrap" style="display:none;margin-top:8px;">
        <label>Kick Channel ID</label>
        <div class="input-row">
          <input id="kickChannelId" type="text" placeholder="ej: 1234567" />
          <button class="btn btn-primary" onclick="sendKickId()">OK</button>
        </div>
        <div class="hint">F12 &rarr; Network &rarr; chatrooms.XXXXXX</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">&#9678; TikTok &#x2014; Bridge</div>
      <div id="ssn-status-box" class="info-box info-yellow" style="margin-bottom:8px;">&#x23F3; Sin conectar. Abre el bridge para recibir mensajes de TikTok.</div>
      <div class="btn-row" style="margin-bottom:6px;">
        <button class="btn btn-primary btn-full" onclick="openTikTokBridge()">&#x1F517; Abrir Bridge TikTok</button>
      </div>
      <div class="btn-row" style="margin-bottom:6px;">
        <button class="btn btn-secondary btn-full" onclick="toggleTikTokPanel()">&#9654; Panel Live</button>
      </div>
      <div class="hint">Abre el bridge, introduce la URL del servidor, genera el bookmarklet y arrástralo a tus favoritos. Luego úsalo en TikTok Live para enviar mensajes a Meeve.</div>
    </div>

    <div class="card">
      <div class="card-title">&#9675; YouTube</div>
      <div id="youtube-status-box" class="info-box info-yellow" style="margin-bottom:8px;">&#x23F3; Esperando conexion...</div>
      <div class="btn-row">
        <button class="btn btn-secondary btn-full" onclick="restartYouTube()">&#8634; Reconectar</button>
        <button class="btn btn-secondary btn-full" onclick="openYouTubeLive()">&#9654; Live</button>
      </div>
      <div class="hint" style="margin-top:5px;">Reconectar al encender el directo.</div>
    </div>

    <!-- ════ TTS CARD — Widget separado ════ -->
    <div class="card">
      <div class="card-title">&#9654; TTS &#x2014; Widget OBS</div>

      <!-- Estado edge-tts en servidor -->
      <div id="tts-server-status" class="info-box info-yellow" style="margin-bottom:8px;font-size:8px;">&#x23F3; Verificando edge-tts...</div>

      <!-- ON/OFF -->
      <div class="toggle-row" style="margin-bottom:6px;">
        <span class="toggle-label" style="font-size:10px;">TTS Activado</span>
        <label class="toggle-switch"><input type="checkbox" id="tts-enabled" onchange="ttsToggle(this.checked)"><span class="toggle-slider"></span></label>
      </div>

      <!-- Cola activa (reflejo del widget) -->
      <div class="tts-queue-bar" id="tts-queue-bar">
        <span class="tts-queue-label">&#9654;</span>
        <span class="tts-queue-text" id="tts-queue-text">Widget desconectado</span>
        <span class="tts-queue-count" id="tts-queue-count"></span>
      </div>

      <!-- Prefijo -->
      <label>Comando prefijo</label>
      <div class="input-row" style="margin-bottom:6px;">
        <input id="tts-prefix" type="text" value="," placeholder="ej: , o !tts" style="max-width:70px;" oninput="ttsSave()"/>
        <span class="hint" style="padding:6px 4px;">El msg debe empezar con esto</span>
      </div>

      <!-- Voz -->
      <label>Voz</label>
      <select id="tts-voice" onchange="ttsSave()" style="margin-bottom:6px;">
        <optgroup label="Español 🇪🇸">
          <option value="Edge Alvaro">Edge Alvaro</option>
          <option value="Edge Ximena">Edge Ximena</option>
          <option value="Google Translate Español">Google Translate Español</option>
        </optgroup>
        <optgroup label="Español (MX)">
          <option value="Edge Jorge">Edge Jorge</option>
        </optgroup>
        <optgroup label="Inglés 🇺🇸">
          <option value="Edge Aria">Edge Aria</option>
          <option value="Edge Guy">Edge Guy</option>
          <option value="Edge Jenny">Edge Jenny</option>
          <option value="Edge Andrew">Edge Andrew</option>
          <option value="Edge Ava">Edge Ava</option>
        </optgroup>
        <optgroup label="Portugués 🇧🇷">
          <option value="Edge Raquel">Edge Raquel</option>
          <option value="Edge Francisca">Edge Francisca</option>
          <option value="Edge Antonio">Edge Antonio</option>
          <option value="Google Translate Português">Google Translate Português</option>
        </optgroup>
      </select>

      <!-- Volumen -->
      <label>Volumen: <span class="value-display" id="tts-vol-display">100%</span></label>
      <input type="range" id="tts-volume" min="0" max="100" value="100" oninput="document.getElementById('tts-vol-display').textContent=this.value+'%';ttsSave();" style="margin-bottom:8px;">

      <!-- Velocidad -->
      <label>Velocidad: <span class="value-display" id="tts-rate-display">1.0x</span></label>
      <input type="range" id="tts-rate" min="0.5" max="2" step="0.1" value="1" oninput="document.getElementById('tts-rate-display').textContent=parseFloat(this.value).toFixed(1)+'x';ttsSave();" style="margin-bottom:8px;">

      <!-- Opciones -->
      <div class="toggle-row" style="margin-bottom:4px;">
        <span class="toggle-label">Leer nombre del usuario</span>
        <label class="toggle-switch"><input type="checkbox" id="tts-say-name" checked onchange="ttsSave()"><span class="toggle-slider"></span></label>
      </div>
      <div class="toggle-row" style="margin-bottom:8px;">
        <span class="toggle-label">Leer donaciones/subs/gifts</span>
        <label class="toggle-switch"><input type="checkbox" id="tts-say-donations" onchange="ttsSave()"><span class="toggle-slider"></span></label>
      </div>

      <div class="separator"></div>

      <!-- Plataformas ignoradas -->
      <label style="margin-bottom:4px;">Ignorar plataformas</label>
      <div class="tts-platform-grid">
        <button class="tts-plat-btn" data-plat="twitch"  onclick="ttsTogglePlatform('twitch')">Twitch</button>
        <button class="tts-plat-btn" data-plat="kick"    onclick="ttsTogglePlatform('kick')">Kick</button>
        <button class="tts-plat-btn" data-plat="youtube" onclick="ttsTogglePlatform('youtube')">YouTube</button>
        <button class="tts-plat-btn" data-plat="tiktok"  onclick="ttsTogglePlatform('tiktok')">TikTok</button>
      </div>

      <div class="separator"></div>

      <!-- Usuarios ignorados -->
      <label style="margin-bottom:3px;">Usuarios ignorados</label>
      <div class="input-row" style="margin-bottom:4px;">
        <input id="tts-ban-user-input" type="text" placeholder="Nombre de usuario..." onkeydown="if(event.key==='Enter')ttsAddUser()"/>
        <button class="btn btn-secondary" onclick="ttsAddUser()" style="padding:5px 9px;">+</button>
      </div>
      <div class="tts-list-wrap" id="tts-banned-users-list">
        <div class="tts-list-empty">Sin usuarios ignorados</div>
      </div>

      <div class="separator"></div>

      <!-- Palabras baneadas -->
      <label style="margin-bottom:3px;">Palabras / frases baneadas</label>
      <div class="input-row" style="margin-bottom:4px;">
        <input id="tts-ban-word-input" type="text" placeholder="Palabra o frase..." onkeydown="if(event.key==='Enter')ttsAddWord()"/>
        <button class="btn btn-secondary" onclick="ttsAddWord()" style="padding:5px 9px;">+</button>
      </div>
      <div class="tts-list-wrap" id="tts-banned-words-list">
        <div class="tts-list-empty">Sin palabras baneadas</div>
      </div>

      <div class="separator" style="margin-top:6px;"></div>

      <!-- URL del widget TTS para OBS -->
      <label style="margin-bottom:4px;">&#x1F508; URL Widget TTS para OBS</label>
      <div class="tts-widget-url-box" id="tts-widget-url" onclick="copyTtsWidgetUrl()" title="Click para copiar">Configura el servidor primero...</div>
      <div class="btn-row" style="margin-bottom:5px;">
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;" onclick="copyTtsWidgetUrl()">&#x2398; Copiar URL</button>
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;" onclick="openTtsWidget()">&#x2197; Abrir</button>
      </div>
      <div class="hint" style="margin-bottom:6px;">Añadir en OBS como Browser Source 1x1px.<br>&#x26A0; No silenciar la fuente en OBS.</div>
    </div>

    <div class="card">
      <div class="card-title">&#9678; URLs para OBS</div>
      <label>&#x1F4AC; Chat multichat</label>
      <div class="url-box" id="url-chat" onclick="copyUrl('url-chat')" title="Click para copiar">Configura el servidor...</div>
      <div class="btn-row" style="margin:4px 0 8px;">
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;padding:4px;" onclick="copyUrl('url-chat')">Copiar</button>
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;padding:4px;" onclick="openUrl('url-chat')">Abrir</button>
      </div>
      <label>&#x1F5E8; Chat un mensaje</label>
      <div class="url-box" id="url-chatuno" onclick="copyUrl('url-chatuno')" title="Click para copiar">Configura el servidor...</div>
      <div class="btn-row" style="margin:4px 0 8px;">
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;padding:4px;" onclick="copyUrl('url-chatuno')">Copiar</button>
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;padding:4px;" onclick="openUrl('url-chatuno')">Abrir</button>
      </div>
      <label>&#x1F4CC; Destacador</label>
      <div class="url-box" id="url-destacador" onclick="copyUrl('url-destacador')" title="Click para copiar">Configura el servidor...</div>
      <div class="btn-row" style="margin:4px 0 6px;">
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;padding:4px;" onclick="copyUrl('url-destacador')">Copiar</button>
        <button class="btn btn-secondary btn-full" style="font-size:8.5px;padding:4px;" onclick="openUrl('url-destacador')">Abrir</button>
      </div>
      <div class="hint">Tiempo visible: <input id="showtime-input" type="number" style="width:42px;padding:2px 4px;font-size:8.5px;" value="12" min="1" max="120" onchange="updateOverlayUrls()"> seg</div>
    </div>

    <div class="card">
      <div class="card-title">&#9680; Configuracion Visual</div>
      <label>Fuente del dashboard</label>
      <select id="fontSelector" onchange="applyFont(this.value)" style="margin-bottom:6px;">
        <option value="'Crimson Pro', serif">Crimson Pro (por defecto)</option>
        <option value="'Libre Baskerville', serif">Libre Baskerville</option>
        <option value="'Zen Antique', serif">Zen Antique</option>
        <option value="'Special Elite', monospace">Special Elite</option>
        <option value="'Rajdhani', sans-serif">Rajdhani</option>
        <option value="'Orbitron', sans-serif">Orbitron</option>
        <option value="'Share Tech Mono', monospace">Share Tech Mono</option>
        <option value="'VT323', monospace">VT323</option>
        <option value="'Exo 2', sans-serif">Exo 2</option>
        <option value="'Russo One', sans-serif">Russo One</option>
        <option value="'Michroma', sans-serif">Michroma</option>
        <option value="'Nova Square', sans-serif">Nova Square</option>
      </select>
      <div class="font-preview" id="font-preview">Meeve Dashboard &#x2014; Preview 123</div>
      <div class="separator" style="margin:7px 0;"></div>
      <div class="toggle-row">
        <span class="toggle-label">Brillo / glow</span>
        <label class="toggle-switch"><input type="checkbox" id="glowToggle" checked onchange="toggleGlow(this.checked)"><span class="toggle-slider"></span></label>
      </div>
      <div class="toggle-row">
        <span class="toggle-label">Modo linea unica</span>
        <label class="toggle-switch"><input type="checkbox" id="singleLineToggle" onchange="toggleSingleLine(this.checked)"><span class="toggle-slider"></span></label>
      </div>
      <div class="separator" style="margin:7px 0;"></div>
      <label>Tam. emotes: <span class="value-display" id="val-emote">24px</span></label>
      <input type="range" id="emoteSize" min="16" max="60" value="24" oninput="setCfgVar('--ov-emote-size',this.value+'px','val-emote')" style="margin-bottom:6px;">
      <label>Tam. nombre: <span class="value-display" id="val-fontName">13px</span></label>
      <input type="range" id="fontNameSize" min="8" max="22" value="13" oninput="setMsgNameSize(this.value)" style="margin-bottom:6px;">
      <label>Max. mensajes: <span class="value-display" id="val-maxMsg">200</span></label>
      <input type="range" id="maxMsgRange" min="20" max="1000" value="200" step="10" oninput="document.getElementById('val-maxMsg').textContent=this.value;MAX_MESSAGES=parseInt(this.value);" style="margin-bottom:6px;">
      <label>Color acento:</label>
      <div class="config-row" style="margin-bottom:8px;">
        <input type="color" id="colorPrimary" value="#c8251c" oninput="applyColorPrimary(this.value)">
        <span class="hint">Color de acento principal</span>
      </div>
      <div class="separator" style="margin:4px 0 8px;"></div>
      <button class="btn btn-danger btn-full" style="margin-bottom:5px;" onclick="clearChat()">Limpiar chat</button>
      <button class="btn btn-secondary btn-full" onclick="exportMessages()">Exportar mensajes</button>
    </div>
  </div>

  <!-- ════ AREA PRINCIPAL ════ -->
  <div class="main" id="main-area">
    <div class="chat-visor" id="chat-visor">
      <div class="chat-visor-header">
        <span class="chat-visor-title" id="visor-title">Preview</span>
        <span class="chat-visor-badge" id="visor-badge">&#x2014;</span>
        <button class="chat-visor-btn open-live" id="visor-open-btn" style="display:none;" onclick="visorOpenLive()">&#9654; Abrir Live</button>
        <button class="chat-visor-btn" onclick="closeChatVisor()">&#x2715; Cerrar</button>
      </div>
      <div class="chat-visor-iframe-wrap" id="visor-iframe-wrap">
        <div class="chat-visor-unavailable" id="visor-unavailable" style="display:none;">
          <span class="uv-icon" id="visor-uv-icon">&#x26A0;</span>
          <span class="uv-msg" id="visor-unavailable-msg">No disponible</span>
          <span class="uv-sub" id="visor-unavailable-sub">Canal no configurado.</span>
          <button class="uv-btn" id="visor-uv-btn" style="display:none;" onclick="visorOpenLive()">&#9654; Abrir en nueva pestana</button>
        </div>
        <iframe id="visor-iframe" src="about:blank" allow="autoplay" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"></iframe>
      </div>
    </div>

    <div class="chat-panel" id="chat-panel">
      <div class="chat-spacer" id="chat-spacer"></div>
      <div id="chat-placeholder">Los mensajes apareceran aqui<br><span style="font-size:11px;letter-spacing:3px;">&#x2014; &#x3072;&#x3068;&#x3064;&#x3081;&#x69D8; &#x2014;</span></div>
    </div>
    <div id="hl-bar">
      &#x1F4CC; Destacando:&nbsp;<strong id="hl-bar-text">&#x2014;</strong>
      <button class="btn btn-secondary" style="font-size:8.5px;padding:3px 8px;margin-left:auto;" onclick="clearHighlight()">&#x2715; Quitar</button>
    </div>
    <div class="input-bar">
      <div class="target-row">
        <span class="target-label">&#x1F441;</span>
        <button class="target-btn viewer-btn" data-view="twitch" onclick="openChatVisor('twitch')" id="view-twitch"><span class="tb-dot"></span>Twitch</button>
        <button class="target-btn viewer-btn" data-view="kick"   onclick="openChatVisor('kick')"   id="view-kick"><span class="tb-dot"></span>Kick</button>
        <button class="target-btn viewer-btn" data-view="youtube" onclick="openChatVisor('youtube')" id="view-youtube"><span class="tb-dot"></span>YouTube</button>
        <button class="target-btn viewer-btn" data-view="tiktok" onclick="openChatVisor('tiktok')" id="view-tiktok"><span class="tb-dot"></span>TikTok</button>
        <span class="target-sep"></span>
        <button class="target-btn" id="tt-panel-quick-btn" onclick="toggleTikTokPanel()"
          style="--tb-color:#ff2d78;--tb-bg:rgba(255,45,120,0.1);--tb-glow:rgba(255,45,120,0.2);">
          <span class="tb-dot"></span>🎵 TikTok Live
        </button>
      </div>
      <div class="input-row-msg">
        <input id="custom-msg-input" type="text" placeholder="Escribe y pulsa Enter..." onkeydown="if(event.key==='Enter')sendCustomMessage()" style="flex:1;" />
        <button class="btn btn-primary" onclick="sendCustomMessage()">Enviar</button>
        <button class="btn btn-secondary" onclick="injectTestMessage()" title="Mensaje de prueba">&#x1F9EA;</button>
      </div>
    </div>
  </div>
</div>

<!-- ════ PANEL TIKTOK ════ -->
<div id="tt-panel">
  <div class="tt-panel-header">
    <span class="tt-panel-dot"></span>
    <span class="tt-panel-title">TikTok Live</span>
    <div class="tt-panel-actions">
      <button class="tt-panel-btn" onclick="ttReloadIframe()">&#8634;</button>
      <button class="tt-panel-btn" onclick="ttOpenExternal()">&#x2197;</button>
      <button class="tt-panel-btn" onclick="toggleTikTokPanel()">&#x2715;</button>
    </div>
  </div>
  <div class="tt-url-bar">
    <span class="tt-url-prefix">tiktok.com/@</span>
    <input id="tt-user-input" type="text" placeholder="tu_usuario" onkeydown="if(event.key==='Enter')ttLoadUser()">
    <button class="tt-go-btn" onclick="ttLoadUser()">IR</button>
  </div>
  <div class="tt-iframe-wrap" id="tt-iframe-wrap">
    <div class="tt-placeholder" id="tt-placeholder">
      <div class="tt-placeholder-icon">🎵</div>
      <div class="tt-placeholder-title">TikTok Live</div>
      <div class="tt-placeholder-sub">Ventana flotante<br>de visibilidad</div>
      <div class="tt-placeholder-hint">Escribe tu usuario arriba<br>y presiona IR para abrir<br>una ventana pequeña de TikTok</div>
    </div>
    <div class="tt-window-status" id="tt-window-status">
      <div class="tt-window-pulse">🎵</div>
      <div class="tt-window-label">Ventana activa</div>
      <div class="tt-window-user" id="tt-window-user">@usuario</div>
      <div class="tt-window-hint">La ventana de TikTok está abierta.<br>No la cierres ni minimices<br>para evitar throttling.</div>
      <div class="tt-window-btns">
        <button class="tt-win-btn tt-win-btn-focus" onclick="ttFocusWindow()">&#x2197; Enfocar ventana</button>
        <button class="tt-win-btn tt-win-btn-close" onclick="ttCloseWindow()">&#x2715; Cerrar ventana</button>
      </div>
    </div>
  </div>
  <div class="tt-visibility-note">&#x26A1; La ventana TikTok debe estar visible (no minimizada)</div>
</div>

<button id="tt-toggle" onclick="toggleTikTokPanel()" title="Panel TikTok Live">
  <span class="tt-toggle-icon">🎵</span>
  <span class="tt-toggle-label">TikTok</span>
</button>

<!-- Modal TikTok session -->
<div id="tiktok-modal" class="modal-overlay">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('tiktok-modal')">&#x2715;</button>
    <div class="modal-title">Obtener TIKTOK_SESSION_ID</div>
    <ol>
      <li>Abre <strong>tiktok.com</strong> en Chrome e inicia sesion</li>
      <li>Pulsa <strong>F12</strong> &rarr; pestana <strong>Application</strong></li>
      <li>Panel: <strong>Cookies &rarr; https://www.tiktok.com</strong></li>
      <li>Busca <strong>sessionid</strong> y <strong>tt-target-idc</strong> &rarr; copia ambos valores</li>
      <li>En Render/Railway:<br><code>TIKTOK_SESSION_ID = (sessionid)</code><br><code>TIKTOK_TARGET_IDC = (tt-target-idc)</code></li>
      <li>Reinicia el servidor</li>
    </ol>
    <p style="margin-top:11px;" class="hint">&#x26A0; El sessionid caduca cada ~30 dias.</p>
  </div>
</div>

<div id="toast"></div>

<script>
// ═══ PARTICULAS ═══
(function(){
  var c=document.getElementById('particles');
  for(var i=0;i<16;i++){
    var p=document.createElement('div');p.className='particle';
    var s=Math.random()>0.45;
    p.style.cssText=['left:'+(Math.random()*100)+'%','width:'+(s?(Math.random()*0.7+0.3):(Math.random()*2+0.6))+'px','height:'+(s?(Math.random()*12+4):(Math.random()*2+1))+'px','animation-duration:'+(Math.random()*30+25)+'s','animation-delay:'+(Math.random()*22)+'s','--r:'+(Math.random()*40-20)+'deg'].join(';');
    c.appendChild(p);
  }
})();

var store={
  get:function(k,d){try{return localStorage.getItem(k)||d||'';}catch(e){return d||'';}},
  set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}}
};

var ws=null,retryDelay=1000,isConnected=false,autoKickDone=false;
var currentChannels={twitch:'',kick:'',tiktok:'',youtube:''};
var MAX_MESSAGES=200,messages=[],currentHighlightMid=null,autoScroll=true;
var currentVisor=null;

var LOGOS={
  twitch:'<svg viewBox="0 0 24 28" fill="currentColor"><path d="M2.149 0L.537 4.119v19.63h6.72V28l4.123-4.25h3.29L22.463 14V0H2.149zm18.24 13.18l-3.29 3.387h-3.948l-2.886 2.973v-2.973H6.584V2.387h13.805v10.793zM17.07 5.367h-2.148v6.42h2.148V5.367zm-5.907 0h-2.15v6.42h2.15V5.367z"/></svg>',
  kick:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 3h4v7l4.5-7H17L12 12l5.5 9H13L8.5 14v7H4V3z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/></svg>',
  youtube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>',
  custom:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  system:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'
};

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function processTwitchEmotes(t,e){if(!e||!e.length)return esc(t);var s=e.slice().sort(function(a,b){return a.start-b.start;}),r='',c=0;for(var i=0;i<s.length;i++){var x=s[i];if(x.start>c)r+=esc(t.slice(c,x.start));r+='<img class="emote" src="'+esc(x.url)+'" alt="'+esc(x.text)+'" onerror="this.style.display=\'none\'">';c=x.end+1;}if(c<t.length)r+=esc(t.slice(c));return r;}
function parseKickEmotes(t){return esc(t).replace(/\[emote:(\d+):([^\]]+)\]/g,function(m,id,n){return '<img class="emote" src="https://files.kick.com/emotes/'+id+'/fullsize" alt="'+esc(n)+'" onerror="this.style.display=\'none\'">';});}
function processMessageHTML(d){var t=d.chatmessage||'',p=d.platform||d.type||'';if(p==='twitch'&&d.chatemotes&&d.chatemotes.length)return processTwitchEmotes(t,d.chatemotes);if(p==='kick'||p==='kick_message')return parseKickEmotes(t);return esc(t);}

function toggleSidebar(){var s=document.querySelector('.sidebar'),b=document.getElementById('sidebar-toggle');var c=s.classList.toggle('collapsed');b.classList.toggle('collapsed',c);store.set('sidebarCollapsed',c?'1':'0');}

// ═══ PANEL TIKTOK ═══
var ttPanelOpen=false,ttCurrentUser='',ttPopupWindow=null,ttPopupCheckInterval=null;

function toggleTikTokPanel(){
  ttPanelOpen=!ttPanelOpen;
  var panel=document.getElementById('tt-panel'),toggle=document.getElementById('tt-toggle'),main=document.getElementById('main-area'),qb=document.getElementById('tt-panel-quick-btn');
  panel.classList.toggle('open',ttPanelOpen);toggle.classList.toggle('open',ttPanelOpen);main.classList.toggle('tt-open',ttPanelOpen);qb.classList.toggle('active',ttPanelOpen);
  store.set('ttPanelOpen',ttPanelOpen?'1':'0');
  if(ttPanelOpen&&!ttCurrentUser){var saved=store.get('ttPanelUser')||currentChannels.tiktok||'';if(saved)document.getElementById('tt-user-input').value=saved;}
}
function ttLoadUser(){var input=document.getElementById('tt-user-input');var user=input.value.trim().replace(/^@/,'');if(!user){toast('Escribe un usuario de TikTok');return;}ttCurrentUser=user;store.set('ttPanelUser',user);ttOpenPopup(user);}
function ttOpenPopup(user){
  if(ttPopupWindow&&!ttPopupWindow.closed){ttPopupWindow.location.href='https://www.tiktok.com/@'+encodeURIComponent(user)+'/live';ttPopupWindow.focus();ttUpdateStatusUI(user);return;}
  var pw=380,ph=520,px=window.screen.width-pw-10,py=window.screen.height-ph-60;
  ttPopupWindow=window.open('https://www.tiktok.com/@'+encodeURIComponent(user)+'/live','tiktok_live_panel','width='+pw+',height='+ph+',left='+px+',top='+py+',resizable=yes,scrollbars=yes');
  if(!ttPopupWindow){toast('⚠️ Permite popups para este sitio');return;}
  ttUpdateStatusUI(user);toast('🎵 TikTok Live abierto');
  if(ttPopupCheckInterval)clearInterval(ttPopupCheckInterval);
  ttPopupCheckInterval=setInterval(function(){if(!ttPopupWindow||ttPopupWindow.closed){clearInterval(ttPopupCheckInterval);ttPopupWindow=null;ttPopupCheckInterval=null;ttUpdateStatusUI(null);}},1500);
}
function ttUpdateStatusUI(user){
  var ph=document.getElementById('tt-placeholder'),ws2=document.getElementById('tt-window-status'),wu=document.getElementById('tt-window-user'),d=document.querySelector('.tt-panel-dot');
  if(user){ph.style.display='none';ws2.classList.add('active');if(wu)wu.textContent='@'+user;if(d)d.style.background='#ff2d78';}
  else{ph.style.display='flex';ws2.classList.remove('active');if(d)d.style.background='rgba(255,45,120,0.3)';}
}
function ttFocusWindow(){if(ttPopupWindow&&!ttPopupWindow.closed)ttPopupWindow.focus();else if(ttCurrentUser)ttOpenPopup(ttCurrentUser);}
function ttCloseWindow(){if(ttPopupWindow&&!ttPopupWindow.closed)ttPopupWindow.close();ttPopupWindow=null;if(ttPopupCheckInterval)clearInterval(ttPopupCheckInterval);ttUpdateStatusUI(null);toast('Ventana TikTok cerrada');}
function ttReloadIframe(){if(ttPopupWindow&&!ttPopupWindow.closed){ttPopupWindow.location.reload();toast('Recargando...');}else if(ttCurrentUser)ttOpenPopup(ttCurrentUser);else toast('No hay usuario cargado');}
function ttOpenExternal(){var user=ttCurrentUser||store.get('ttPanelUser')||currentChannels.tiktok||'';if(!user){toast('Sin usuario TikTok');return;}if(ttPopupWindow&&!ttPopupWindow.closed)ttPopupWindow.focus();else ttOpenPopup(user);}

// ═══ CHAT VISOR ═══
var _visorOpenFn=null;
var VISOR_CONFIG={
  twitch:{label:'Twitch Chat',badge:'TWITCH',getUrl:function(ch){return ch?'https://www.twitch.tv/popout/'+encodeURIComponent(ch)+'/chat?popout=':null;},openLive:function(ch){if(ch)window.open('https://www.twitch.tv/'+encodeURIComponent(ch),'_blank','noopener');},noChMsg:'Canal de Twitch no configurado',noChSub:'Conecta tu canal de Twitch en el servidor.'},
  kick:{label:'Kick Chat',badge:'KICK',getUrl:function(ch){return ch?'https://kick.com/'+encodeURIComponent(ch)+'/chatroom':null;},openLive:function(ch){if(ch)window.open('https://kick.com/'+encodeURIComponent(ch),'_blank','noopener');},noChMsg:'Canal de Kick no configurado',noChSub:'Conecta tu canal de Kick para ver el chat aqui.'},
  youtube:{label:'YouTube Live',badge:'YOUTUBE',getUrl:function(){return null;},openLive:function(ch){if(!ch)return;var h=ch.startsWith('@')?ch:'@'+ch;window.open('https://www.youtube.com/'+h+'/live','_blank','noopener');},noChMsg:'YouTube no permite chat embebido',noChSub:'YouTube bloquea los iframes. Abre el live directamente.',showOpenBtn:true},
  tiktok:{label:'TikTok Live',badge:'TIKTOK',getUrl:function(){return null;},openLive:function(ch){if(!ch)return;var u=ch.startsWith('@')?ch:'@'+ch;window.open('https://www.tiktok.com/'+u+'/live','_blank','noopener');},noChMsg:'TikTok — usar panel lateral',noChSub:'Usa el botón 🎵 TikTok Live para abrir el panel lateral derecho.',showOpenBtn:true,customPanel:function(ch){var user=ch||'';return '<div class="tt-preview-bg"><div class="tt-preview-logo">🎵</div>'+(user?'<div class="tt-preview-user">@'+esc(user)+'</div>':'')+'<div class="tt-preview-sub">Usa el panel lateral para TikTok</div></div>';}}
};
function visorOpenLive(){if(_visorOpenFn)_visorOpenFn();}
function openChatVisor(platform){
  var cfg=VISOR_CONFIG[platform];if(!cfg)return;
  if(currentVisor===platform){closeChatVisor();return;}
  var ch=currentChannels[platform]||'';var url=cfg.getUrl(ch);
  var visor=document.getElementById('chat-visor'),iframe=document.getElementById('visor-iframe');
  var titleEl=document.getElementById('visor-title'),badge=document.getElementById('visor-badge');
  var unavail=document.getElementById('visor-unavailable'),unavailMsg=document.getElementById('visor-unavailable-msg');
  var unavailSub=document.getElementById('visor-unavailable-sub'),unavailBtn=document.getElementById('visor-uv-btn');
  var unavailIcon=document.getElementById('visor-uv-icon'),openBtn=document.getElementById('visor-open-btn');
  var wrap=document.getElementById('visor-iframe-wrap');
  badge.className='chat-visor-badge '+platform;badge.textContent=cfg.badge;
  titleEl.textContent=cfg.label+(ch?' \u2014 @'+ch:'');
  _visorOpenFn=cfg.openLive?function(){cfg.openLive(ch);}:null;
  if(openBtn){openBtn.style.display=(_visorOpenFn&&ch)?'inline-block':'none';}
  var prev=wrap.querySelector('.tt-preview-bg');if(prev)prev.remove();
  if(url){iframe.style.display='block';unavail.style.display='none';iframe.src=url;}
  else if(cfg.customPanel&&ch){iframe.style.display='none';unavail.style.display='none';wrap.insertAdjacentHTML('beforeend',cfg.customPanel(ch));if(unavailBtn){unavailBtn.className='uv-btn '+platform;unavailBtn.style.display='inline-block';}}
  else{iframe.style.display='none';iframe.src='about:blank';unavail.style.display='flex';if(unavailIcon)unavailIcon.textContent='\u26A0';unavailMsg.textContent=cfg.noChMsg;unavailSub.textContent=cfg.noChSub;if(unavailBtn){if(cfg.showOpenBtn&&ch){unavailBtn.className='uv-btn '+platform;unavailBtn.style.display='inline-block';}else unavailBtn.style.display='none';}}
  document.querySelectorAll('.viewer-btn').forEach(function(b){b.classList.remove('viewing');});
  var btn=document.getElementById('view-'+platform);if(btn)btn.classList.add('viewing');
  currentVisor=platform;visor.classList.add('open');
}
function closeChatVisor(){
  var visor=document.getElementById('chat-visor'),iframe=document.getElementById('visor-iframe'),wrap=document.getElementById('visor-iframe-wrap');
  visor.classList.remove('open');document.querySelectorAll('.viewer-btn').forEach(function(b){b.classList.remove('viewing');});
  currentVisor=null;_visorOpenFn=null;
  setTimeout(function(){iframe.src='about:blank';var prev=wrap.querySelector('.tt-preview-bg');if(prev)prev.remove();},350);
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('serverUrl').value=store.get('serverUrl');
  updateOverlayUrls();
  if(store.get('serverUrl')){connectWS(store.get('serverUrl'));var base=store.get('serverUrl').replace(/^wss?/,'https').replace(/\/$/,'');checkEdgeTtsStatus(base);}
  if(store.get('sidebarCollapsed')==='1'){document.querySelector('.sidebar').classList.add('collapsed');document.getElementById('sidebar-toggle').classList.add('collapsed');}
  var sf=store.get('chatFont');if(sf){var sel=document.getElementById('fontSelector');for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===sf){sel.selectedIndex=i;break;}}applyFont(sf,true);}
  if(store.get('glowOff')==='1'){document.getElementById('glowToggle').checked=false;toggleGlow(false,true);}
  if(store.get('singleLine')==='1'){document.getElementById('singleLineToggle').checked=true;toggleSingleLine(true,true);}
  var sc=store.get('accentColor');if(sc){document.getElementById('colorPrimary').value=sc;applyColorPrimary(sc,true);}
  var se=store.get('emoteSize');if(se){document.getElementById('emoteSize').value=se;setCfgVar('--ov-emote-size',se+'px','val-emote');}
  var sm=store.get('maxMsg');if(sm){var n=parseInt(sm);MAX_MESSAGES=n;document.getElementById('maxMsgRange').value=n;document.getElementById('val-maxMsg').textContent=n;}
  document.getElementById('chat-panel').addEventListener('scroll',function(){autoScroll=(this.scrollHeight-this.scrollTop-this.clientHeight)<80;});
  if(store.get('ttPanelOpen')==='1'){setTimeout(function(){ttPanelOpen=false;toggleTikTokPanel();},200);}
  var savedTtUser=store.get('ttPanelUser');if(savedTtUser)document.getElementById('tt-user-input').value=savedTtUser;
  ttsLoad();
});

function applyFont(v,s){document.documentElement.style.setProperty('--font-body',v);document.getElementById('font-preview').style.fontFamily=v;store.set('chatFont',v);if(!s)toast('Fuente cambiada');}
function toggleGlow(e,s){store.set('glowOff',e?'0':'1');if(e){document.body.classList.remove('no-glow');if(!s)toast('Brillo activado');}else{document.body.classList.add('no-glow');if(!s)toast('Brillo desactivado');}}
function toggleSingleLine(e,s){store.set('singleLine',e?'1':'0');var p=document.getElementById('chat-panel');if(e){p.classList.add('single-line');if(!s)toast('Linea unica activado');}else{p.classList.remove('single-line');if(!s)toast('Modo normal');}}
function setCfgVar(cv,v,did){document.documentElement.style.setProperty(cv,v);if(did)document.getElementById(did).textContent=v;if(cv==='--ov-emote-size')store.set('emoteSize',parseInt(v));}
function setMsgNameSize(v){document.getElementById('val-fontName').textContent=v+'px';var el=document.getElementById('dyn-name');if(!el){el=document.createElement('style');el.id='dyn-name';document.head.appendChild(el);}el.textContent='.msg-user{font-size:'+v+'px!important;}';}
function applyColorPrimary(v,s){document.documentElement.style.setProperty('--corbata',v);if(!s){store.set('accentColor',v);toast('Color aplicado');}}

// ═══ WEBSOCKET ═══
var _clientSeenMids={};
function connectWS(url){
  if(!url)return;
  if(ws){try{ws.close();}catch(e){}}
  var wu=url.replace(/^https?/,'ws').replace(/\/$/,'');
  try{ws=new WebSocket(wu);}catch(e){setStatus(false);scheduleRetry(url);return;}
  ws.onopen=function(){isConnected=true;retryDelay=1000;setStatus(true);var id=store.get('kickChannelId');if(id)connectKickBrowser(id);};
  ws.onmessage=function(e){
    try{
      var d=JSON.parse(e.data);
      if(d.type==='status'){handleStatus(d);return;}
      if(d.type==='highlight'||d.type==='highlight_clear'||d.type==='custom_message')return;
      if(d.mid){var now=Date.now();if(_clientSeenMids[d.mid]&&(now-_clientSeenMids[d.mid])<6000)return;_clientSeenMids[d.mid]=now;}
      appendMessage(d);
    }catch(err){}
  };
  ws.onclose=function(){isConnected=false;setStatus(false);scheduleRetry(url);};
  ws.onerror=function(){ws.close();};
}
function scheduleRetry(url){retryDelay=Math.min(retryDelay*2,30000);setTimeout(function(){connectWS(url);},retryDelay);}
function setStatus(ok){document.getElementById('ws-dot').className=ok?'ok':'';document.getElementById('ws-label').textContent=ok?'Conectado':'Desconectado';}

function handleStatus(data){
  setPlatformStatus('twitch',data.twitch,(data.channels&&data.channels.twitch)||'');
  setPlatformStatus('kick',data.kick,(data.channels&&data.channels.kick)||'');
  setPlatformStatus('tiktok',data.tiktok,(data.channels&&data.channels.tiktok)||'');
  setPlatformStatus('youtube',data.youtube,(data.channels&&data.channels.youtube)||'');
  if(data.channels)currentChannels=data.channels;
  var ytBox=document.getElementById('youtube-status-box');
  if(ytBox){
    if(data.youtube){ytBox.className='info-box info-green';ytBox.innerHTML='&#x2713; Conectado al chat en vivo';}
    else if(data.channels&&data.channels.youtube){ytBox.className='info-box info-yellow';ytBox.innerHTML='&#x23F3; '+esc(data.channels.youtube)+' \u2014 Sin live activo.';}
    else{ytBox.className='info-box info-red';ytBox.innerHTML='Configura YOUTUBE_HANDLE en el servidor.';}
  }
  if(!data.kick){
    var sid=store.get('kickChannelId');
    if(sid&&(!kickWs||kickWs.readyState>1))connectKickBrowser(sid);
    else if(!sid&&!autoKickDone&&data.channels&&data.channels.kick){autoKickDone=true;setTimeout(resolveKickId,1500);}
  }
  if(data.channels&&data.channels.tiktok&&!store.get('ttPanelUser'))document.getElementById('tt-user-input').value=data.channels.tiktok;
  if(currentVisor){var cfg=VISOR_CONFIG[currentVisor];var ch=currentChannels[currentVisor]||'';if(cfg)document.getElementById('visor-title').textContent=cfg.label+(ch?' \u2014 @'+ch:'');}
}
function setPlatformStatus(p,c,ch){var dot=document.getElementById('dot-'+p),el=document.getElementById('ch-'+p);if(dot)dot.className='platform-dot'+(c?' ok':'');if(el)el.textContent=ch||'\u2014';}

// ═══ APPEND MESSAGE ═══
function appendMessage(data){
  if(!data.chatname&&!data.chatmessage)return;
  var panel=document.getElementById('chat-panel');
  var ph=document.getElementById('chat-placeholder');if(ph)ph.remove();

  // Normalizar plataforma — kick_message → kick
  var platform=(data.platform||data.type||'custom').toLowerCase().replace('_message','');
  var logo=LOGOS[platform]||LOGOS.custom;
  var time=new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
  var el=document.createElement('div');
  el.className='msg-item '+platform;
  el.dataset.mid=data.mid||'';
  var avatarInner='';
  if(data.chatimg)avatarInner='<img src="'+esc(data.chatimg)+'" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display=\'none\'">';
  var aHTML='<div class="msg-avatar">'+avatarInner+'<div class="msg-avatar-fallback" style="'+(data.chatimg?'display:none':'')+'">'+logo+'</div></div>';
  var pLabel=platform.charAt(0).toUpperCase()+platform.slice(1);
  var pBadge='<span class="msg-platform"><span style="width:8px;height:8px;display:inline-flex;opacity:0.5;">'+logo+'</span>'+pLabel+'</span>';
  var bHTML='';if(data.roles&&data.roles.length)data.roles.forEach(function(r){bHTML+='<span class="msg-role">'+esc(r.label||r.type)+'</span>';});
  var nStyle=data.nameColor?'color:'+esc(data.nameColor)+';':'';
  var mHTML=processMessageHTML(data);
  var dHTML='';
  if(data.type==='donation'&&(data.amount||data.donationType)){
    var dl=data.donationType==='bits'?'\uD83D\uDC8E '+data.amount+' Bits':data.donationType==='sub'?'\u2605 Nuevo Sub':data.donationType==='resub'?'\u21BA '+data.months+' meses':data.donationType==='subgift'?'\u2726 Sub regalada':data.donationType==='superchat'?'\u2726 '+(data.amountDisplay||data.amount):data.donationType==='member'?'\u2605 Nuevo Miembro':data.donationType==='gift'?'\u2726 Regalo TikTok':data.amount?'\u2726 '+data.amount:'';
    if(dl)dHTML='<div class="msg-donation-tag">'+dl+'</div>';
  }
  el.innerHTML=aHTML+'<div class="msg-body"><div class="msg-header"><span class="msg-user" style="'+nStyle+'">'+esc(data.chatname||'?')+'</span>'+pBadge+bHTML+'<span class="tts-msg-badge">&#9654; TTS</span><span class="msg-time">'+time+'</span><button class="msg-highlight-btn" onclick="event.stopPropagation();sendHighlight(this.closest(\'.msg-item\'))">&#x1F4CC; Destacar</button></div><div class="msg-text">'+mHTML+'</div>'+dHTML+'</div>';
  el._msgData=data;
  el.addEventListener('click',function(){sendHighlight(el);});
  panel.appendChild(el);
  messages.push({el:el,data:data});
  if(messages.length>MAX_MESSAGES){var old=messages.shift();if(old.el.parentNode)old.el.parentNode.removeChild(old.el);}
  if(autoScroll)requestAnimationFrame(function(){panel.scrollTop=panel.scrollHeight;});
}

// ═══ HIGHLIGHT ═══
function sendHighlight(el){
  if(!isConnected||!ws)return toast('Sin conexion');
  var data=el._msgData;if(!data)return;
  document.querySelectorAll('.msg-item.highlighted').forEach(function(m){m.classList.remove('highlighted');});
  el.classList.add('highlighted');currentHighlightMid=el.dataset.mid;
  document.getElementById('hl-bar').classList.add('active');
  document.getElementById('hl-bar-text').textContent=(data.chatname||'?')+': '+(data.chatmessage||'');
  if(data.mid)_clientSeenMids[data.mid]=Date.now()+60000;
  ws.send(JSON.stringify({type:'highlight',platform:data.platform||data.type||'custom',chatname:data.chatname||'',chatmessage:data.chatmessage||'',chatimg:data.chatimg||null,nameColor:data.nameColor||null,roles:data.roles||[],chatemotes:data.chatemotes||[],mid:data.mid||''}));
  toast('\uD83D\uDCCC Mensaje destacado');
}
function clearHighlight(){
  if(!isConnected||!ws)return;
  ws.send(JSON.stringify({type:'highlight_clear'}));
  document.querySelectorAll('.msg-item.highlighted').forEach(function(m){m.classList.remove('highlighted');});
  currentHighlightMid=null;document.getElementById('hl-bar').classList.remove('active');
  toast('Destacado quitado');
}

// ═══ KICK BRIDGE ═══
var kickWs=null,kickRetryDelay=3000,kickRetryTimeout=null;
function connectKickBrowser(channelId){
  if(!channelId)return;
  if(kickWs){try{kickWs.onmessage=null;kickWs.onclose=null;kickWs.onerror=null;kickWs.close();}catch(e){}kickWs=null;}
  if(kickRetryTimeout){clearTimeout(kickRetryTimeout);kickRetryTimeout=null;}
  var box=document.getElementById('kick-status-box');
  if(box){box.className='info-box info-yellow';box.innerHTML='\u23F3 Conectando a Kick...';}
  var urls=['wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false','wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false'];
  var idx=parseInt(localStorage.getItem('kickWsUrlIndex')||'0');
  tryKickUrl(channelId,urls,idx);
}
function tryKickUrl(c,u,i){
  if(i>=u.length)i=0;
  try{kickWs=new WebSocket(u[i]);}catch(e){kickRetryTimeout=setTimeout(function(){tryKickUrl(c,u,(i+1)%u.length);},5000);return;}
  kickWs.onopen=function(){
    kickRetryDelay=3000;localStorage.setItem('kickWsUrlIndex',i);
    kickWs.send(JSON.stringify({event:'pusher:subscribe',data:{auth:'',channel:'chatrooms.'+c+'.v2'}}));
  };
  kickWs.onmessage=function(e){
    try{
      var msg=JSON.parse(e.data),ev=msg.event||'';
      if(ev==='pusher:connection_established'||ev==='pusher:pong')return;
      if(ev==='pusher_internal:subscription_succeeded'){
        var box=document.getElementById('kick-status-box');
        if(box){box.className='info-box info-green';box.innerHTML='\u2713 Kick conectado (chatroom '+c+')';}
        if(ws&&ws.readyState===1)ws.send(JSON.stringify({type:'kick_connected'}));
        return;
      }
      if(ev==='pusher:error'){kickWs.close();return;}
      if(ev.indexOf('ChatMessageEvent')===-1)return;
      var d=typeof msg.data==='string'?JSON.parse(msg.data):msg.data;
      var kr=[],badges=(d.sender&&d.sender.identity&&d.sender.identity.badges)||[];
      badges.forEach(function(b){var bt=(b.type||'').toLowerCase();if(bt==='broadcaster'||bt==='owner')kr.push({type:'broadcaster',label:'Owner'});else if(bt==='moderator'||bt==='mod')kr.push({type:'moderator',label:'Mod'});else if(bt==='vip')kr.push({type:'vip',label:'VIP'});else if(bt==='subscriber'||bt==='sub')kr.push({type:'subscriber',label:'Sub'});else kr.push({type:bt,label:b.type});});
      var un=(d.sender&&d.sender.username)||'Unknown';
      var nc=(d.sender&&d.sender.identity&&d.sender.identity.color)||'#888';
      var mid=d.id||('kick-'+Date.now());
      var now=Date.now();
      if(_clientSeenMids[mid]&&(now-_clientSeenMids[mid])<6000)return;
      _clientSeenMids[mid]=now;
      getKickAvatarBrowser(un,function(av){
        // platform y type SIEMPRE como 'kick' para compatibilidad con TTS
        var cm={type:'kick',platform:'kick',chatname:un,chatmessage:d.content,nameColor:nc,chatimg:av||null,roles:kr,mid:mid};
        appendMessage(cm);
        if(ws&&ws.readyState===1)ws.send(JSON.stringify(cm));
      });
    }catch(err){}
  };
  kickWs.onclose=function(e){
    var box=document.getElementById('kick-status-box');if(box){box.className='info-box info-yellow';box.innerHTML='\u21BA Kick desconectado...';}
    if(ws&&ws.readyState===1)ws.send(JSON.stringify({type:'kick_disconnected'}));
    var ni=e.code===4001?(i+1)%u.length:i;
    kickRetryDelay=Math.min(kickRetryDelay*1.5,30000);
    kickRetryTimeout=setTimeout(function(){tryKickUrl(c,u,ni);},kickRetryDelay);
  };
  kickWs.onerror=function(){};
  var pi=setInterval(function(){if(kickWs&&kickWs.readyState===1)kickWs.send(JSON.stringify({event:'pusher:ping',data:{}}));else clearInterval(pi);},25000);
}
var kickAvatarCache={},kickAvatarPending={};
function getKickAvatarBrowser(username,cb){
  if(!username)return cb(null);
  var slug=username.toLowerCase();
  if(kickAvatarCache[slug])return cb(kickAvatarCache[slug]);
  if(kickAvatarPending[slug]){kickAvatarPending[slug].push(cb);return;}
  kickAvatarPending[slug]=[cb];
  fetch('https://kick.com/api/v2/channels/'+slug,{headers:{'Accept':'application/json'}})
    .then(function(r){return r.json();})
    .then(function(data){var av=(data.user&&(data.user.profile_pic||data.user.profilePic))||data.profile_pic||null;if(av)kickAvatarCache[slug]=av;var cbs=kickAvatarPending[slug]||[];delete kickAvatarPending[slug];cbs.forEach(function(c){c(av);});})
    .catch(function(){var cbs=kickAvatarPending[slug]||[];delete kickAvatarPending[slug];cbs.forEach(function(c){c(null);});});
}

// ═══ ACCIONES ═══
function saveAndConnect(){
  var url=document.getElementById('serverUrl').value.trim();
  if(!url)return toast('Introduce la URL');
  store.set('serverUrl',url);retryDelay=1000;autoKickDone=false;
  connectWS(url);updateOverlayUrls();
  toast('Conectando...');
  var base=url.replace(/^wss?/,'https').replace(/\/$/,'');
  checkEdgeTtsStatus(base);
}
function checkEdgeTtsStatus(base){
  var box=document.getElementById('tts-server-status');if(!box)return;
  fetch(base+'/api/tts/status')
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.available){box.className='info-box info-green';box.innerHTML='&#x2713; edge-tts disponible en servidor';}
      else{box.className='info-box info-yellow';box.innerHTML='&#x26A0; edge-tts no instalado.<br><code style="background:rgba(0,0,0,0.2);padding:1px 4px;font-size:8px;">pip install edge-tts</code>';}
      updateTtsWidgetUrl();
    })
    .catch(function(){box.className='info-box info-yellow';box.innerHTML='&#x26A0; Sin endpoint TTS en servidor';updateTtsWidgetUrl();});
}
function toggleKickManual(){var el=document.getElementById('kick-manual-wrap');el.style.display=el.style.display==='none'?'block':'none';}
async function resolveKickId(){
  var channel=currentChannels.kick||store.get('kickChannel')||'';
  var box=document.getElementById('kick-status-box');
  if(!channel){box.className='info-box info-red';box.innerHTML='Sin KICK_CHANNEL configurado.';return;}
  box.className='info-box info-yellow';box.innerHTML='\u23F3 Resolviendo ID...';
  try{
    var r=await fetch('https://kick.com/api/v2/channels/'+channel,{headers:{'Accept':'application/json'}});
    if(!r.ok)throw new Error('HTTP '+r.status);
    var d=await r.json();
    var id=String((d.chatroom&&d.chatroom.id)||d.id||'');
    if(!id)throw new Error('Sin chatroom.id');
    box.className='info-box info-green';box.innerHTML='\u2713 ID: <strong>'+id+'</strong>';
    document.getElementById('kickChannelId').value=id;
    await sendKickId(id);
  }catch(e){box.className='info-box info-red';box.innerHTML='Error: '+e.message;document.getElementById('kick-manual-wrap').style.display='block';}
}
async function sendKickId(idParam){
  var id=idParam||document.getElementById('kickChannelId').value.trim();
  if(!id)return toast('Introduce el Channel ID');
  var su=store.get('serverUrl');if(!su)return toast('Conecta al servidor primero');
  var hu=su.replace(/^wss?/,'https').replace(/\/$/,'');
  try{
    var r=await fetch(hu+'/api/kick/channel-id',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({channelId:id})});
    var d=await r.json();
    if(d.ok){store.set('kickChannelId',String(id));toast('\u2713 Kick ID '+id);connectKickBrowser(String(id));}
    else toast('Servidor rechazo el ID');
  }catch(e){toast('Error: '+e.message);}
}
async function restartTikTok(){var su=store.get('serverUrl');if(!su)return toast('Configura la URL');var hu=su.replace(/^wss?/,'https').replace(/\/$/,'');try{var r=await fetch(hu+'/api/tiktok/restart',{method:'POST'});var d=await r.json();toast(d.ok?'\u21BA TikTok reconectando...':'Error');}catch(e){toast('No se pudo conectar');}}
async function restartYouTube(){var su=store.get('serverUrl');if(!su)return toast('Configura la URL');var hu=su.replace(/^wss?/,'https').replace(/\/$/,'');var ytBox=document.getElementById('youtube-status-box');if(ytBox){ytBox.className='info-box info-yellow';ytBox.innerHTML='\u23F3 Buscando live...';}try{var r=await fetch(hu+'/api/youtube/restart',{method:'POST'});var d=await r.json();toast(d.ok?'\u21BA YouTube reconectando...':'Error');}catch(e){toast('No se pudo conectar');}}
function openYouTubeLive(){var c=currentChannels.youtube||'';if(!c)return toast('YouTube no configurado');var h=c.startsWith('@')?c:'@'+c;window.open('https://www.youtube.com/'+h+'/live','_blank','noopener');}
function sendCustomMessage(){var input=document.getElementById('custom-msg-input');var text=input.value.trim();if(!text)return;if(!isConnected||!ws){toast('Sin conexion al servidor');return;}ws.send(JSON.stringify({type:'custom_message',user:'Tu (dashboard)',text:text}));input.value='';}
function getBaseOverlayDir(){var href=window.location.href.split('?')[0].replace(/\/+$/,'');var base=href.replace(/\/dashboard(\/[^?]*)?$/,'/overlay');if(base===href)base=href.replace(/\/[^/]+$/,'/overlay');return base;}
function updateOverlayUrls(){
  var su=store.get('serverUrl');
  var st=(parseInt(document.getElementById('showtime-input').value)||12)*1000;
  var base=(window.location.protocol!=='file:')?getBaseOverlayDir():'';
  var ids={'url-chat':{file:'index.html',params:''},'url-chatuno':{file:'chat_uno.html',params:''},'url-destacador':{file:'destacador.html',params:'&showtime='+st}};
  Object.keys(ids).forEach(function(id){
    var box=document.getElementById(id);if(!box)return;
    if(!su){box.textContent='Configura el servidor primero...';box.dataset.url='';return;}
    if(!base){box.textContent='No disponible en local';box.dataset.url='';return;}
    var url=base+'/'+ids[id].file+'?server='+encodeURIComponent(su)+ids[id].params;
    box.textContent=url;box.dataset.url=url;
  });
  updateTtsWidgetUrl();
}
function copyUrl(id){var url=document.getElementById(id).dataset.url;if(!url)return toast('Configura el servidor primero');navigator.clipboard.writeText(url).then(function(){toast('URL copiada');});}
function openUrl(id){var url=document.getElementById(id).dataset.url;if(!url)return toast('Configura el servidor primero');window.open(url,'_blank');}
function clearChat(){if(!confirm('Limpiar mensajes?'))return;var panel=document.getElementById('chat-panel');panel.innerHTML='<div class="chat-spacer" id="chat-spacer"></div><div id="chat-placeholder">Los mensajes apareceran aqui<br><span style="font-size:11px;letter-spacing:3px;">\u2014 \u3072\u3068\u3064\u3081\u69D8 \u2014</span></div>';messages=[];toast('Chat limpiado');}
function exportMessages(){var data=messages.map(function(m,i){return{id:i+1,name:m.data.chatname,message:m.data.chatmessage,platform:m.data.platform||m.data.type,timestamp:new Date().toISOString()};});var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download='meeve_messages_'+Date.now()+'.json';a.click();URL.revokeObjectURL(url);toast('Exportado');}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function injectTestMessage(){
  appendMessage({type:'twitch',platform:'twitch',chatname:'TestViewer',chatmessage:',Hola desde Twitch! qué tal',nameColor:'#b892e8',chatemotes:[],mid:'test-tw-'+Date.now()});
  setTimeout(function(){appendMessage({type:'kick',platform:'kick',chatname:'TestKick',chatmessage:',Hola desde Kick! qué onda',nameColor:'#7ecf6e',mid:'test-kick-'+Date.now()});},400);
  setTimeout(function(){appendMessage({type:'donation',platform:'twitch',donationType:'bits',chatname:'Donator',chatmessage:'Gran stream!',amount:500,nameColor:'#e8a0a0',mid:'test-bits-'+Date.now()});},800);
  setTimeout(function(){appendMessage({type:'tiktok',platform:'tiktok',chatname:'TestTikTok',chatmessage:',Desde TikTok!',nameColor:'#FF0050',mid:'test-tt-'+Date.now()});},1200);
  toast('Mensajes de prueba listos');
}
function toast(msg){var el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(function(){el.classList.remove('show');},2800);}

// ══════════════════════════════════════════════════════════════
// TTS — Configuración del widget (sin audio en este dashboard)
// El audio se reproduce en tts_widget.html cargado en OBS
// ══════════════════════════════════════════════════════════════

var TTS = {
  enabled:          false,
  prefix:           ',',
  voice:            'Edge Alvaro',
  volume:           1.0,
  rate:             1.0,
  sayName:          true,
  sayDonations:     false,
  ignoredPlatforms: [],
  bannedUsers:      [],
  bannedWords:      [],
};

// ── Construir URL del widget TTS ──────────────────────────

function buildTtsWidgetUrl() {
  var su = store.get('serverUrl');
  if (!su) return '';

  // Mismo directorio base que los demás overlays (../overlay/ relativo al dashboard)
  var base = (window.location.protocol !== 'file:') ? getBaseOverlayDir() : '';

  var params = new URLSearchParams();
  params.set('server',      su);
  params.set('voice',       TTS.voice);
  params.set('rate',        String(TTS.rate));
  params.set('volume',      String(TTS.volume));
  params.set('prefix',      TTS.prefix);
  params.set('sayname',     TTS.sayName ? '1' : '0');
  params.set('saydon',      TTS.sayDonations ? '1' : '0');
  if (TTS.ignoredPlatforms.length) params.set('ignore', TTS.ignoredPlatforms.join(','));
  if (TTS.bannedUsers.length)      params.set('bannedusers', TTS.bannedUsers.join(','));
  if (TTS.bannedWords.length)      params.set('bannedwords', TTS.bannedWords.join('|'));

  return base + '/tts_widget.html?' + params.toString();
}

function updateTtsWidgetUrl() {
  var url = buildTtsWidgetUrl();
  var box = document.getElementById('tts-widget-url');
  if (!box) return;
  if (!url) { box.textContent = 'Configura el servidor primero...'; box.dataset.url = ''; return; }
  box.textContent = url;
  box.dataset.url = url;

  // Mostrar indicador en header si TTS activo
  var ind = document.getElementById('tts-indicator');
  if (ind) {
    ind.classList.toggle('active', TTS.enabled);
    ind.classList.toggle('speaking', false);
  }
}

function copyTtsWidgetUrl() {
  var url = buildTtsWidgetUrl();
  if (!url) return toast('Configura el servidor primero');
  navigator.clipboard.writeText(url).then(function() { toast('URL TTS widget copiada'); });
}

function openTtsWidget() {
  var url = buildTtsWidgetUrl();
  if (!url) return toast('Configura el servidor primero');
  window.open(url, '_blank');
}

// ── Controles de la card TTS ──────────────────────────────

function ttsToggle(on) {
  TTS.enabled = on;
  var ind = document.getElementById('tts-indicator');
  if (ind) ind.classList.toggle('active', on);
  ttsSave();
  if (on) toast('🔊 TTS activado — añade el widget a OBS');
  else    toast('🔇 TTS desactivado');
}

function ttsTogglePlatform(plat) {
  var idx = TTS.ignoredPlatforms.indexOf(plat);
  if (idx === -1) TTS.ignoredPlatforms.push(plat);
  else TTS.ignoredPlatforms.splice(idx, 1);
  document.querySelectorAll('.tts-plat-btn').forEach(function(b) {
    b.classList.toggle('ignored', TTS.ignoredPlatforms.indexOf(b.dataset.plat) !== -1);
  });
  ttsSave();
}

function ttsAddUser() {
  var inp = document.getElementById('tts-ban-user-input');
  var val = (inp.value || '').trim();
  if (!val) return;
  if (TTS.bannedUsers.indexOf(val) === -1) { TTS.bannedUsers.push(val); ttsSave(); ttsRenderLists(); }
  inp.value = '';
}

function ttsAddWord() {
  var inp = document.getElementById('tts-ban-word-input');
  var val = (inp.value || '').trim();
  if (!val) return;
  if (TTS.bannedWords.indexOf(val) === -1) { TTS.bannedWords.push(val); ttsSave(); ttsRenderLists(); }
  inp.value = '';
}

function ttsRemoveUser(idx) { TTS.bannedUsers.splice(idx, 1); ttsSave(); ttsRenderLists(); }
function ttsRemoveWord(idx) { TTS.bannedWords.splice(idx, 1); ttsSave(); ttsRenderLists(); }

function ttsRenderLists() {
  var ul = document.getElementById('tts-banned-users-list');
  if (ul) {
    if (!TTS.bannedUsers.length) ul.innerHTML = '<div class="tts-list-empty">Sin usuarios ignorados</div>';
    else ul.innerHTML = TTS.bannedUsers.map(function(u,i){return '<div class="tts-list-item"><span>'+esc(u)+'</span><button class="tts-list-del" onclick="ttsRemoveUser('+i+')">&#x2715;</button></div>';}).join('');
  }
  var wl = document.getElementById('tts-banned-words-list');
  if (wl) {
    if (!TTS.bannedWords.length) wl.innerHTML = '<div class="tts-list-empty">Sin palabras baneadas</div>';
    else wl.innerHTML = TTS.bannedWords.map(function(w,i){return '<div class="tts-list-item"><span>'+esc(w)+'</span><button class="tts-list-del" onclick="ttsRemoveWord('+i+')">&#x2715;</button></div>';}).join('');
  }
}

function ttsSave() {
  var pfx   = document.getElementById('tts-prefix');
  var voice = document.getElementById('tts-voice');
  var vol   = document.getElementById('tts-volume');
  var rate  = document.getElementById('tts-rate');
  var sayN  = document.getElementById('tts-say-name');
  var sayD  = document.getElementById('tts-say-donations');
  if (pfx)   TTS.prefix       = pfx.value || ',';
  if (voice) TTS.voice        = voice.value;
  if (vol)   TTS.volume       = parseFloat(vol.value) / 100;
  if (rate)  TTS.rate         = parseFloat(rate.value);
  if (sayN)  TTS.sayName      = sayN.checked;
  if (sayD)  TTS.sayDonations = sayD.checked;
  store.set('ttsConfig', JSON.stringify({
    enabled: TTS.enabled, prefix: TTS.prefix, voice: TTS.voice,
    volume: TTS.volume, rate: TTS.rate, sayName: TTS.sayName,
    sayDonations: TTS.sayDonations, ignoredPlatforms: TTS.ignoredPlatforms,
    bannedUsers: TTS.bannedUsers, bannedWords: TTS.bannedWords,
  }));
  updateTtsWidgetUrl();
}

// ── TikTok Bridge ─────────────────────────────────────────
function openTikTokBridge() {
  var base = (window.location.protocol !== 'file:') ? getBaseOverlayDir() : '';
  var su = store.get('serverUrl') || '';
  var url = base + '/tiktok_bridge.html' + (su ? '?server=' + encodeURIComponent(su) : '');
  window.open(url, '_blank');
}

function ttsLoad() {
  var raw = store.get('ttsConfig');
  if (!raw) { updateTtsWidgetUrl(); return; }
  try {
    var c = JSON.parse(raw);
    TTS.enabled          = !!c.enabled;
    TTS.prefix           = c.prefix  || ',';
    TTS.voice            = c.voice   || 'Edge Alvaro';
    TTS.volume           = c.volume  != null ? c.volume  : 1.0;
    TTS.rate             = c.rate    != null ? c.rate    : 1.0;
    TTS.sayName          = c.sayName != null ? !!c.sayName : true;
    TTS.sayDonations     = !!c.sayDonations;
    TTS.ignoredPlatforms = c.ignoredPlatforms || [];
    TTS.bannedUsers      = c.bannedUsers  || [];
    TTS.bannedWords      = c.bannedWords  || [];

    var enEl  = document.getElementById('tts-enabled');
    var pfx   = document.getElementById('tts-prefix');
    var voice = document.getElementById('tts-voice');
    var vol   = document.getElementById('tts-volume');
    var rate  = document.getElementById('tts-rate');
    var sayN  = document.getElementById('tts-say-name');
    var sayD  = document.getElementById('tts-say-donations');
    var vd    = document.getElementById('tts-vol-display');
    var rd    = document.getElementById('tts-rate-display');

    if (enEl)  enEl.checked  = TTS.enabled;
    if (pfx)   pfx.value     = TTS.prefix;
    if (voice) voice.value   = TTS.voice;
    if (vol)   { vol.value   = Math.round(TTS.volume * 100); if (vd) vd.textContent = vol.value + '%'; }
    if (rate)  { rate.value  = TTS.rate; if (rd) rd.textContent = TTS.rate.toFixed(1) + 'x'; }
    if (sayN)  sayN.checked  = TTS.sayName;
    if (sayD)  sayD.checked  = TTS.sayDonations;

    document.querySelectorAll('.tts-plat-btn').forEach(function(b) {
      b.classList.toggle('ignored', TTS.ignoredPlatforms.indexOf(b.dataset.plat) !== -1);
    });
    ttsRenderLists();
    updateTtsWidgetUrl();

    var ind = document.getElementById('tts-indicator');
    if (ind) ind.classList.toggle('active', TTS.enabled);
  } catch(e) { updateTtsWidgetUrl(); }
}
</script>
</body>
</html>
