const T={
en:{home:"Home",categories:"Categories",popular:"Popular",multiplayer:"Multiplayer",topRated:"Top Rated",new:"New Games",newGames:"NEW GAMES",all:"All Games",welcome:"WELCOME TO",tagline:"PLAY. ENJOY. WIN.",browse:"BROWSE GAMES",playOnline:"PLAY ONLINE",popularGames:"POPULAR GAMES",multiplayerGames:"MULTIPLAYER GAMES",games:"GAMES",search:"Search games...",instant:"PLAY INSTANTLY",free:"FREE FOREVER",safe:"SAFE & SECURE",safeSub:"Play safely",devices:"ALL DEVICES",trending:"Trending this week",originals:"Originals",leaderboard:"Leaderboard",more:"More categories",allGamesTitle:"DISCOVER GAMES",catalogGames:"games in AR CRAZYGAMES",shuffle:"Shuffle",page:"PAGE"},
fr:{home:"Accueil",categories:"Catégories",popular:"Populaires",multiplayer:"Multijoueur",topRated:"Top jeux",new:"Nouveaux",newGames:"NOUVEAUX JEUX",all:"Tous les jeux",welcome:"BIENVENUE SUR",tagline:"JOUE. PROFITE. GAGNE.",browse:"VOIR LES JEUX",playOnline:"JOUER EN LIGNE",popularGames:"JEUX POPULAIRES",multiplayerGames:"JEUX MULTIJOUEURS",games:"JEUX",search:"Rechercher...",instant:"JOUEZ INSTANTANÉMENT",free:"GRATUIT POUR TOUJOURS",safe:"SÛR ET SÉCURISÉ",safeSub:"Jouez en sécurité",devices:"TOUS LES APPAREILS",trending:"Tendances",originals:"Originaux",leaderboard:"Classement",more:"Plus de catégories",allGamesTitle:"DÉCOUVRIR LES JEUX",catalogGames:"jeux sur AR CRAZYGAMES",shuffle:"Mélanger",page:"PAGE"},
ar:{home:"الرئيسية",categories:"التصنيفات",popular:"الشائعة",multiplayer:"متعدد اللاعبين",topRated:"الأعلى تقييماً",new:"جديد",newGames:"ألعاب جديدة",all:"كل الألعاب",welcome:"مرحباً بكم في",tagline:"العب. استمتع. اربح.",browse:"تصفح الألعاب",playOnline:"العب أونلاين",popularGames:"الألعاب الشائعة",multiplayerGames:"ألعاب متعددة اللاعبين",games:"ألعاب",search:"ابحث عن لعبة...",instant:"العب فوراً",free:"مجاني دائماً",safe:"آمن ومحمي",safeSub:"العب بأمان",devices:"كل الأجهزة",trending:"الأكثر رواجاً هذا الأسبوع",originals:"ألعاب أصلية",leaderboard:"لوحة المتصدرين",more:"المزيد من التصنيفات",allGamesTitle:"اكتشف الألعاب",catalogGames:"لعبة في AR CRAZYGAMES",shuffle:"عشوائي",page:"الصفحة"},
es:{home:"Inicio",categories:"Categorías",popular:"Populares",multiplayer:"Multijugador",topRated:"Mejor valorados",new:"Nuevos",newGames:"NUEVOS JUEGOS",all:"Todos los juegos",welcome:"BIENVENIDO A",tagline:"JUEGA. DISFRUTA. GANA.",browse:"VER JUEGOS",playOnline:"JUGAR ONLINE",popularGames:"JUEGOS POPULARES",multiplayerGames:"JUEGOS MULTIJUGADOR",games:"JUEGOS",search:"Buscar juegos...",instant:"JUEGA AL INSTANTE",free:"GRATIS PARA SIEMPRE",safe:"SEGURO",safeSub:"Juega con seguridad",devices:"TODOS LOS DISPOSITIVOS",trending:"Tendencias",originals:"Originales",leaderboard:"Clasificación",more:"Más categorías",allGamesTitle:"DESCUBRIR JUEGOS",catalogGames:"juegos en AR CRAZYGAMES",shuffle:"Aleatorio",page:"PÁGINA"},
de:{home:"Start",categories:"Kategorien",popular:"Beliebt",multiplayer:"Mehrspieler",topRated:"Top bewertet",new:"Neu",newGames:"NEUE SPIELE",all:"Alle Spiele",welcome:"WILLKOMMEN BEI",tagline:"SPIEL. GENIESSE. GEWINNE.",browse:"SPIELE ANSEHEN",playOnline:"ONLINE SPIELEN",popularGames:"BELIEBTE SPIELE",multiplayerGames:"MEHRSPIELER-SPIELE",games:"SPIELE",search:"Spiele suchen...",instant:"SOFORT SPIELEN",free:"IMMER KOSTENLOS",safe:"SICHER",safeSub:"Sicher spielen",devices:"ALLE GERÄTE",trending:"Diese Woche im Trend",originals:"Originale",leaderboard:"Bestenliste",more:"Weitere Kategorien",allGamesTitle:"SPIELE ENTDECKEN",catalogGames:"Spiele auf AR CRAZYGAMES",shuffle:"Zufällig",page:"SEITE"},
zh:{home:"首页",categories:"分类",popular:"热门",multiplayer:"多人游戏",topRated:"高分游戏",new:"新游戏",newGames:"新游戏",all:"全部游戏",welcome:"欢迎来到",tagline:"玩得开心，尽情享受！",browse:"浏览游戏",playOnline:"在线游戏",popularGames:"热门游戏",multiplayerGames:"多人游戏",games:"游戏",search:"搜索游戏...",instant:"立即游戏",free:"永久免费",safe:"安全可靠",safeSub:"安心游玩",devices:"所有设备",trending:"本周热门",originals:"原创游戏",leaderboard:"排行榜",more:"更多分类",allGamesTitle:"发现游戏",catalogGames:"款 AR CRAZYGAMES 游戏",shuffle:"随机",page:"第"}};
const langs=[["en","🇬🇧","English"],["fr","🇫🇷","Français"],["ar","🇩🇿","العربية"],["es","🇪🇸","Español"],["de","🇩🇪","Deutsch"],["zh","🇨🇳","中文"]];

let games=[],lang=localStorage.getItem("arcrazygames_lang")||"en",query="",cat="all",page=Number(new URLSearchParams(location.search).get("page")||1);
const PAGE_SIZE=36;
let visitOrder=[],visitSeed=(new URLSearchParams(location.search).has("page")?137503:Date.now()+Math.floor(Math.random()*1000000));
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const prettyName=s=>{
 s=String(s||"").replace(/[_\-]+/g," ").replace(/\s+/g," ").trim();
 if(!s)return "Untitled Game";
 const acronyms=new Set(["3D","2D","VR","FPS","RPG","IO","HTML5","PVP","PVE","AI","NBA","FIFA","FC","UFO","DIY"]);
 return s.split(" ").map(w=>acronyms.has(w.toUpperCase())?w.toUpperCase():w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" ");
};

function seededRand(seed){let t=seed>>>0;return()=>{t+=0x6D2B79F5;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function shuffle(arr,seed){const a=[...arr],r=seededRand(seed);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function iconForCategory(c){
 const s=String(c||"").toLowerCase();
 if(s.includes("action")||s.includes("shoot")||s.includes("fighting"))return "⚔";
 if(s.includes("adventure"))return "◇";
 if(s.includes("arcade"))return "✦";
 if(s.includes("racing"))return "⌁";
 if(s.includes("sport")||s.includes("soccer"))return "⚽";
 if(s.includes("puzzle")||s.includes("bejeweled"))return "✣";
 if(s.includes("strategy"))return "♜";
 if(s.includes("2 player")||s.includes("multiplayer"))return "♙";
 if(s.includes("3d"))return "◇";
 if(s.includes("cooking"))return "♨";
 return "✧";
}
function buildCats(){
 const names=[...new Set(games.map(g=>g.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
 const wanted=["Action Games","Adventure Games","Arcade Games","Racing Games","Sports Games","Puzzle Games","Shooting Games","2 Player Games",".io Games","3D Games","Strategy Games","Fighting Games","Cooking Games"];
 const cats=[...wanted.filter(x=>names.includes(x)),...names.filter(x=>!wanted.includes(x))];
 const initial=12;
 const draw=list=>`<button class="cat active" data-cat="all"><span class="cat-icon">⌂</span><span>${T[lang].all}</span></button>`+
   list.map(c=>`<button class="cat" data-cat="${esc(c)}"><span class="cat-icon">${iconForCategory(c)}</span><span>${esc(c.replace(/ Games$/,""))}</span></button>`).join("");
 const list=$("catList"); list.innerHTML=draw(cats.slice(0,initial));
 const more=$("moreCats");
 if(more){
  more.style.display=cats.length>initial?"block":"none";
  more.onclick=()=>{
   const expanded=list.dataset.expanded==="1";
   list.innerHTML=draw(expanded?cats.slice(0,initial):cats);
   list.dataset.expanded=expanded?"0":"1";
   more.querySelector("span").textContent=expanded?T[lang].more:"− "+T[lang].categories;
   bindCats();
  };
 }
 bindCats();
 function bindCats(){
  list.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{
   list.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));
   b.classList.add("active");cat=b.dataset.cat;page=1;history.replaceState({},"",cat==="all"?"./":"?category="+encodeURIComponent(cat));render();
  });
 }
}
function translate(){
 const t=T[lang];
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t[e.dataset.i18n]||e.textContent);
 document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=t[e.dataset.i18nPlaceholder]||e.placeholder);
 $("langCode").textContent=lang.toUpperCase();document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 const allBtn=document.querySelector('.cat[data-cat="all"]');if(allBtn)allBtn.innerHTML=`<span class="cat-icon">⌂</span><span>${t.all}</span>`;
}
function card(g,i){
 const cls="tile-square";
 const multi=g.multiplayer?'<span class="badge">🌐 MULTIPLAYER</span>':"";
 return `<a class="card ${cls}" href="game/game.html?id=${encodeURIComponent(g.id)}" title="${esc(prettyName(g.name))}">
  <div class="thumb">${multi}<img loading="lazy" src="${esc(g.image)}" alt="${esc(prettyName(g.name))}" onerror="this.style.opacity=.08"><span class="hover-name">${esc(prettyName(g.name))}</span></div>
  <div class="info"><h3>${esc(prettyName(g.name))}</h3><div class="meta"><span>${esc(String(g.category||"").replace(/ Games$/,""))}</span>${g.rating&&Number(g.rating)>0?`<span>★ ${esc(g.rating)}</span>`:""}</div></div>
 </a>`;
}
function isPhone(){return window.matchMedia && window.matchMedia("(max-width:760px)").matches}
function mobileCompatible(g){return String(g.mobile)==="1"}
function filter(g){
 const hay=(String(g.name||"")+" "+(Array.isArray(g.tags)?g.tags.join(" "):String(g.tags||""))).toLowerCase();
 const phoneOK=!isPhone()||mobileCompatible(g);
 return phoneOK&&(cat==="all"||g.category===cat)&&(!query||hay.includes(query));
}
function pagination(totalPages){
 const el=$("pagination"); if(!el)return;
 if(totalPages<=1){el.innerHTML="";return}
 const nums=[];
 const push=n=>{if(!nums.includes(n))nums.push(n)};
 push(1); push(totalPages);
 for(let n=page-2;n<=page+2;n++)if(n>1&&n<totalPages)push(n);
 nums.sort((a,b)=>a-b);
 const makeHref=n=>`?page=${n}`;
 let out=`<a class="page-arrow" href="${makeHref(Math.max(1,page-1))}" aria-label="Previous page">‹</a>`;
 let prev=0;
 nums.forEach(n=>{if(prev&&n-prev>1)out+=`<span class="ellipsis">…</span>`;out+=`<a class="page-btn ${n===page?"active":""}" href="${makeHref(n)}" aria-current="${n===page?"page":"false"}">${n}</a>`;prev=n});
 out+=`<a class="page-arrow" href="${makeHref(Math.min(totalPages,page+1))}" aria-label="Next page">›</a>`;
 el.innerHTML=out;
}
function render(){
 const visible=games.filter(filter);
 // A new randomized order is generated when the page is opened. Pagination then
 // uses that same order so pages stay stable while browsing.
 if(!visitOrder.length || query || cat!=="all"){
   visitOrder=shuffle(visible,visitSeed);
 } else {
   // Keep the current random order on ordinary pagination.
   const ids=new Set(visible.map(g=>String(g.id)));
   visitOrder=visitOrder.filter(g=>ids.has(String(g.id)));
   if(visitOrder.length!==visible.length)visitOrder=shuffle(visible,visitSeed);
 }
 if(query||cat!=="all"){
   visitOrder=shuffle(visible,visitSeed+String(cat).length+query.length);
 }
 const totalPages=Math.max(1,Math.ceil(visitOrder.length/PAGE_SIZE));
 if(page>totalPages)page=totalPages;
 const start=(page-1)*PAGE_SIZE;
 const current=visitOrder.slice(start,start+PAGE_SIZE);
 $("popularGrid").innerHTML=current.map((g,i)=>card(g,i)).join("");
 $("pageInfo").textContent=`${T[lang].page||"PAGE"} ${page} / ${totalPages}`;
 $("catalogCount").textContent=visible.length.toLocaleString();
 $("totalGames").textContent=(isPhone()?games.filter(mobileCompatible).length:games.length).toLocaleString();
 pagination(totalPages);

 const fresh=[...games].sort((a,b)=>Number(b.id)-Number(a.id)).filter(filter).slice(0,12);
 const multi=games.filter(g=>g.multiplayer&&(!query||String(g.name).toLowerCase().includes(query))).slice(0,12);
 const top=[...visible].sort((a,b)=>(Number(b.rating)-Number(a.rating))||(Number(b.plays)-Number(a.plays))).slice(0,12);
 $("newGrid").innerHTML=fresh.map((g,i)=>card(g,i)).join("");
 $("multiGrid").innerHTML=multi.map((g,i)=>card(g,i)).join("");
 $("topGrid").innerHTML=top.map((g,i)=>card(g,i)).join("");
 const heroPick=current[0]||fresh[0];
 if(heroPick){$("heroGameImage").src=heroPick.image;$("heroGameImage").alt=prettyName(heroPick.name);}
}
langs.forEach(([id,flag,name])=>{
 const b=document.createElement("button");b.textContent=flag+" "+name;
 b.onclick=()=>{lang=id;localStorage.setItem("arcrazygames_lang",id);const u=new URL(location.href);u.searchParams.set("lang",id);history.replaceState({},"",u.href);$("langMenu").classList.remove("show");page=1;visitOrder=[];buildCats();translate();render()};
 $("langMenu").appendChild(b)
});
$("langBtn").onclick=e=>{e.stopPropagation();$("langMenu").classList.toggle("show")};
document.addEventListener("click",e=>{if(!e.target.closest(".langbox"))$("langMenu").classList.remove("show")});
$("search").oninput=e=>{query=e.target.value.trim().toLowerCase();page=1;visitOrder=[];render()};
const shuffleLink=document.querySelector(".view-all");
if(shuffleLink)shuffleLink.onclick=e=>{e.preventDefault();visitSeed=Date.now()+Math.floor(Math.random()*1000000);page=1;visitOrder=[];render();window.scrollTo({top:$("popular").offsetTop-85,behavior:"smooth"})};
async function init(){
 if(Array.isArray(window.ARGAMES_GAMES)&&window.ARGAMES_GAMES.length)games=window.ARGAMES_GAMES;
 else{try{games=await fetch("games.json",{cache:"no-store"}).then(r=>r.json())}catch(e){games=[]}}
 games=games.map(g=>({...g,tags:Array.isArray(g.tags)?g.tags:(String(g.tags||"").split(",").map(x=>x.trim()).filter(Boolean))}));
 console.log("AR CRAZYGAMES catalog:",games.length);
 buildCats();translate();render();
}
init();

/* Mobile navigation */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("categories");
  const backdrop = document.getElementById("mobileBackdrop");
  const searchBox = document.querySelector(".search");
  const searchInput = document.getElementById("search");

  const closeMenu = () => {
    if (!sidebar || !backdrop || !menuBtn) return;
    sidebar.classList.remove("mobile-open");
    backdrop.classList.remove("mobile-open");
    menuBtn.setAttribute("aria-expanded","false");
    menuBtn.textContent = "☰";
  };

  if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener("click", () => {
      const open = sidebar.classList.toggle("mobile-open");
      backdrop.classList.toggle("mobile-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "✕" : "☰";
    });
    backdrop.addEventListener("click", closeMenu);
    sidebar.addEventListener("click", (e) => {
      if (e.target.closest("a,button") && !e.target.closest("#mobileMenuBtn")) {
        setTimeout(closeMenu, 80);
      }
    });
  }

  if (searchBox && searchInput) {
    searchBox.addEventListener("click", () => {
      if (window.matchMedia("(max-width:760px)").matches && !searchBox.classList.contains("mobile-search-open")) {
        searchBox.classList.add("mobile-search-open");
        searchInput.focus();
      }
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        searchBox.classList.remove("mobile-search-open");
        searchInput.blur();
      }
    });
  }
});

window.addEventListener("resize",()=>{
  const now=window.matchMedia("(max-width:760px)").matches;
  if(typeof window.__argamesPhoneState==="undefined") window.__argamesPhoneState=now;
  if(window.__argamesPhoneState!==now){
    window.__argamesPhoneState=now;
    page=1;visitOrder=[];render();
  }
});



