const T={
en:{home:"HOME",now:"NOW PLAYING",provider:"Open provider",touch:"PRESS ANY KEY OR TOUCH ANYWHERE TO START",start:"START GAME",hint:"F = fullscreen • ESC = exit fullscreen",fullscreen:"Fullscreen",exit:"Exit",touchGame:"Touch game area to start",controls:"CONTROLS TUTORIAL",easy:"Easy controls guide",controlNote:"Taken directly from the game's CMS instructions when available.",type:"GAME TYPE",like:"Like",dislike:"Dislike",open:"Open game",footer:"Free game portal",online:"ONLINE MULTIPLAYER",solo:"SINGLE PLAYER"},
fr:{home:"ACCUEIL",now:"EN COURS",provider:"Ouvrir le fournisseur",touch:"APPUYEZ SUR UNE TOUCHE OU TOUCHEZ N'IMPORTE OÙ POUR COMMENCER",start:"DÉMARRER",hint:"F = plein écran • ESC = quitter",fullscreen:"Plein écran",exit:"Quitter",touchGame:"Touchez la zone de jeu pour commencer",controls:"TUTORIEL DES COMMANDES",easy:"Guide de commandes simple",controlNote:"Tiré des instructions CMS du jeu lorsqu'elles sont disponibles.",type:"TYPE DE JEU",like:"J'aime",dislike:"Je n'aime pas",open:"Ouvrir le jeu",footer:"Portail de jeux gratuit",online:"MULTIJOUEUR EN LIGNE",solo:"SOLO"},
ar:{home:"الرئيسية",now:"اللعب الآن",provider:"فتح الموقع الأصلي",touch:"اضغط أي زر أو المس أي مكان للبدء",start:"ابدأ اللعبة",hint:"F = ملء الشاشة • ESC = خروج",fullscreen:"ملء الشاشة",exit:"خروج",touchGame:"المس منطقة اللعب للبدء",controls:"شرح طريقة التحكم",easy:"دليل تحكم سهل",controlNote:"مأخوذ من تعليمات اللعبة الموجودة في قاعدة CMS عند توفرها.",type:"نوع اللعبة",like:"أعجبني",dislike:"لم تعجبني",open:"فتح اللعبة",footer:"بوابة ألعاب مجانية",online:"متعدد اللاعبين أونلاين",solo:"لاعب واحد"},
es:{home:"INICIO",now:"JUGANDO",provider:"Abrir proveedor",touch:"PULSA CUALQUIER TECLA O TOCA EN CUALQUIER LUGAR PARA EMPEZAR",start:"EMPEZAR",hint:"F = pantalla completa • ESC = salir",fullscreen:"Pantalla completa",exit:"Salir",touchGame:"Toca el área de juego para empezar",controls:"TUTORIAL DE CONTROLES",easy:"Guía de controles fácil",controlNote:"Tomado de las instrucciones CMS del juego cuando están disponibles.",type:"TIPO DE JUEGO",like:"Me gusta",dislike:"No me gusta",open:"Abrir juego",footer:"Portal de juegos gratis",online:"MULTIJUGADOR ONLINE",solo:"UN JUGADOR"},
de:{home:"START",now:"JETZT SPIELEN",provider:"Anbieter öffnen",touch:"DRÜCKE EINE TASTE ODER BERÜHRE DEN BILDSCHIRM ZUM STARTEN",start:"STARTEN",hint:"F = Vollbild • ESC = verlassen",fullscreen:"Vollbild",exit:"Verlassen",touchGame:"Spielbereich berühren zum Starten",controls:"STEUERUNGS-TUTORIAL",easy:"Einfache Steuerungsanleitung",controlNote:"Aus den CMS-Spielanweisungen übernommen, sofern vorhanden.",type:"SPIELTYP",like:"Gefällt mir",dislike:"Gefällt mir nicht",open:"Spiel öffnen",footer:"Kostenloses Spieleportal",online:"ONLINE-MEHRSPIELER",solo:"EINZELSPIELER"},
zh:{home:"首页",now:"正在游戏",provider:"打开提供商",touch:"按任意键或触摸任意位置开始",start:"开始游戏",hint:"F = 全屏 • ESC = 退出",fullscreen:"全屏",exit:"退出",touchGame:"触摸游戏区域开始",controls:"操作教程",easy:"简单操作指南",controlNote:"如果 CMS 中有说明，则直接使用游戏说明。",type:"游戏类型",like:"喜欢",dislike:"不喜欢",open:"打开游戏",footer:"免费游戏平台",online:"在线多人游戏",solo:"单人游戏"}};
const langs=[["en","🇬🇧","English"],["fr","🇫🇷","Français"],["ar","🇩🇿","العربية"],["es","🇪🇸","Español"],["de","🇩🇪","Deutsch"],["zh","🇨🇳","中文"]];
let lang=localStorage.getItem("argames_lang")||"en",started=false,games=[],game;
const $=id=>document.getElementById(id);
function prettyName(s){s=String(s||"").replace(/[_\-]+/g," ").replace(/\s+/g," ").trim();return s?s.split(" ").map(w=>/^[A-Z0-9]{2,}$/.test(w)&&w.length<5?w:w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" "):"Untitled Game"}
const esc=s=>String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function translate(){const t=T[lang];document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t[e.dataset.i18n]||e.textContent);$("langCode").textContent=lang.toUpperCase();document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";$("type").innerHTML=game.multiplayer?`<span class="online">🌐 ${t.online}</span>`:`<span class="solo">🎮 ${t.solo}</span>`}
function controls(text){text=String(text||"").trim();if(!text)return `<span class="control">🟩 <b>W A S D</b> — Move</span><span class="control">🖱️ <b>Mouse</b> — Aim / interact</span><span class="control">␣ <b>SPACE</b> — Jump / action</span><span class="control">🎯 <b>Mouse click</b> — Select / shoot</span><span class="control">F <b>Fullscreen</b></span><span class="control">ESC <b>Exit fullscreen</b></span>`;let parts=text.split(/[.;•|]/).map(x=>x.trim()).filter(Boolean).slice(0,12);return parts.map(x=>`<span class="control">⌨️ ${esc(x)}</span>`).join("")}
function setMeta(name,content){let e=document.querySelector(`meta[name="${name}"]`);if(!e){e=document.createElement("meta");e.name=name;document.head.appendChild(e)}e.content=content}
function setProp(prop,content){let e=document.querySelector(`meta[property="${prop}"]`);if(!e){e=document.createElement("meta");e.setAttribute("property",prop);document.head.appendChild(e)}e.content=content}
function cleanDesc(s){return String(s||"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()}
function seoDescription(g){const d=cleanDesc(g.description);const cat=String(g.category||"").replace(/ Games$/i,"");const tail=` Play this free ${cat.toLowerCase()} game online on ARGAMES.`;return (d?d.slice(0,150)+tail:`Play ${prettyName(g.name)} online for free on ARGAMES. Discover ${cat.toLowerCase()} gameplay, controls and related browser games.`).slice(0,180)}
function categorySlug(c){const s=String(c||"").toLowerCase();if(s===".io games"||s==="io games")return "io-games";return s.replace(/[^a-z0-9]+/g,"-").replace(/-+$/g,"")}
function updateSEO(){
 const name=prettyName(game.name), desc=seoDescription(game), origin=location.origin, url=origin+location.pathname+location.search;
 document.title=`${name} — Play Free Online | ARGAMES`;
 setMeta('description',desc); setProp('og:title',document.title);setProp('og:description',desc);setProp('og:url',url);setProp('og:image',game.image||origin+'/assets/argames-horizontal.png');setMeta('twitter:title',document.title);setMeta('twitter:description',desc);setMeta('twitter:image',game.image||origin+'/assets/argames-horizontal.png');
 const can=document.getElementById('canonical');if(can)can.href=url;
 const schema={"@context":"https://schema.org","@type":"VideoGame","name":name,"description":desc,"url":url,"image":game.image||origin+'/assets/argames-horizontal.png',"genre":String(game.category||"").replace(/ Games$/i,""),"gamePlatform":"Web Browser","applicationCategory":"Game","operatingSystem":"Any","publisher":{"@type":"Organization","name":"ARGAMES","url":origin}};
 if(Array.isArray(game.tags)&&game.tags.length)schema.keywords=game.tags.slice(0,12).join(", ");
 const sc=document.getElementById('game-schema');if(sc)sc.textContent=JSON.stringify(schema);
}
function related(){
 const mobilePool=isMobile()?games.filter(x=>String(x.mobile)==="1"):games;
 const same=mobilePool.filter(x=>String(x.id)!==String(game.id)&&x.category===game.category);
 const pool=same.length?same:mobilePool.filter(x=>String(x.id)!==String(game.id));
 const rel=pool.slice(0,8);
 const el=$("relatedGames");if(!el)return;
 el.innerHTML=rel.map(x=>`<a class="related-card" href="game.html?id=${encodeURIComponent(x.id)}" title="${esc(prettyName(x.name))}"><img loading="lazy" src="${esc(x.image)}" alt="${esc(prettyName(x.name))}"><span>${esc(prettyName(x.name))}</span></a>`).join("");
}
async function init(){if(Array.isArray(window.ARGAMES_GAMES)){games=window.ARGAMES_GAMES;}else{try{games=await fetch("../games.json").then(r=>r.json())}catch(e){games=[]}}let id=new URLSearchParams(location.search).get("id");game=games.find(g=>String(g.id)===String(id))||games[0];if(!game){document.title="Game not found | ARGAMES";setMeta('robots','noindex,follow');return}blockUnsupportedMobile();$("title").textContent=prettyName(game.name);$("crumb").textContent=prettyName(game.name);$("startTitle").textContent=prettyName(game.name);$("icon").textContent=game.multiplayer?"🌐":"🎮";$("meta").textContent=`${game.multiplayer?"🌐 ONLINE":"🎮 SOLO"} • ${game.category} • ${Number(game.plays||0).toLocaleString()} plays${isMobile()&&mobileCompatible()?" • 📱 Mobile":""}`;$('provider').href=game.url;$('provider').setAttribute('rel','nofollow noopener');$('open').href=game.url;$('open').setAttribute('rel','nofollow noopener');$("description").textContent=cleanDesc(game.description);$("controls").innerHTML=controls(game.instructions);const catLink=$("categoryLink");if(catLink){catLink.textContent=String(game.category||"All Games").replace(/ Games$/i,"")+" Games";catLink.href=`../categories/${categorySlug(game.category)}.html`;}const tags=$("gameTags");if(tags&&Array.isArray(game.tags))tags.innerHTML=game.tags.slice(0,10).map(t=>`<span>#${esc(t)}</span>`).join("");let l=Number(localStorage.getItem("like_"+game.id)||0),d=Number(localStorage.getItem("dislike_"+game.id)||0);$("likes").textContent=l;$("dislikes").textContent=d;$("like").onclick=()=>{$("likes").textContent=++l;localStorage.setItem("like_"+game.id,l)};$("dislike").onclick=()=>{$("dislikes").textContent=++d;localStorage.setItem("dislike_"+game.id,d)};updateSEO();related();translate()}
function needsLandscape(){
 const w=Number(game?.width||0), h=Number(game?.height||0);
 return w>0 && h>0 && w/h>=1.22;
}
function isMobile(){return window.matchMedia && window.matchMedia("(max-width:760px)").matches}
function mobileCompatible(){return String(game?.mobile)==="1"}
function blockUnsupportedMobile(){
 const panel=$("mobileUnsupported");
 if(!panel) return false;
 const blocked=isMobile() && !mobileCompatible();
 panel.classList.toggle("show",blocked);
 panel.setAttribute("aria-hidden",String(!blocked));
 const hide=["shell","actions","shortcuts","under-game-ad","playRight","infoGrid","related","bottomAd"];
 hide.forEach(id=>{const el=$(id);if(el)el.style.display=blocked?"none":""});
 return blocked;
}
function rotationNeeded(){
 return needsLandscape() && isMobile() && window.innerWidth < window.innerHeight;
}
function updateRotationUI(){
 const overlay=$("rotateOverlay");
 const needed=rotationNeeded();
 if(overlay){
   overlay.classList.toggle("show",needed);
   overlay.setAttribute("aria-hidden",String(!needed));
 }
 document.body.classList.toggle("game-landscape-needed",needsLandscape());
}
async function lockGameOrientation(){
 if(!needsLandscape() || !isMobile()) return;
 try{
   if(document.fullscreenElement && screen.orientation?.lock){
     await screen.orientation.lock("landscape");
   }
 }catch(e){}
 updateRotationUI();
}
async function enterGameFullscreen(){
 try{
   if(!document.fullscreenElement){
     await $("shell").requestFullscreen?.();
   }
 }catch(e){}
 await lockGameOrientation();
}
function start(){
 if(blockUnsupportedMobile())return;
 if(started)return;
 started=true;
 $("start").style.display="none";
 $("frame").style.display="block";
 $("frame").src=game.url;
 if(needsLandscape() && isMobile()) enterGameFullscreen();
 updateRotationUI();
}
async function fs(){
 if(document.fullscreenElement){
   try{await document.exitFullscreen()}catch(e){}
   try{await screen.orientation?.unlock?.()}catch(e){}
 }else{
   await enterGameFullscreen();
 }
 updateRotationUI();
}
$("startBtn").onclick=start;$("start").addEventListener("pointerdown",e=>{if(!e.target.closest("#startBtn"))start()});$("shell").addEventListener("touchstart",()=>{if(!started)start()},{passive:true});document.addEventListener("keydown",e=>{if(e.key==="F11")return;if(!started&&e.key.length===1){start();return}if(started&&e.key.toLowerCase()==="f"){e.preventDefault();fs()}});$("fs").onclick=fs;$("fs2").onclick=fs;$("close").onclick=()=>$("inter").classList.remove("show");
langs.forEach(([id,flag,name])=>{const b=document.createElement("button");b.textContent=flag+" "+name;b.onclick=()=>{lang=id;localStorage.setItem("argames_lang",id);$("langMenu").classList.remove("show");translate()};$("langMenu").appendChild(b)});$("langBtn").onclick=e=>{e.stopPropagation();$("langMenu").classList.toggle("show")};document.addEventListener("click",e=>{if(!e.target.closest(".langbox"))$("langMenu").classList.remove("show")});
window.addEventListener("resize",()=>{blockUnsupportedMobile();updateRotationUI()});
window.addEventListener("orientationchange",()=>setTimeout(updateRotationUI,120));
document.addEventListener("fullscreenchange",()=>{lockGameOrientation();updateRotationUI()});
init().then?.(()=>updateRotationUI());
updateRotationUI();
