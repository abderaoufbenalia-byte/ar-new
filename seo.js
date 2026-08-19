(() => {
 const origin="https://arcrazygames.site", p=new URLSearchParams(location.search), langs=["en","fr","ar","es","de","zh"], lang=langs.includes(p.get("lang"))?p.get("lang"):(localStorage.getItem("arcrazygames_lang")||"en");
 const d={
 en:["AR CRAZYGAMES — Free Online Games | Play HTML5 Games","Play free online games on AR CRAZYGAMES. Discover action, racing, puzzle, sports, shooting, multiplayer and 3D HTML5 games with no download."],
 fr:["AR CRAZYGAMES — Jeux en ligne gratuits | Jeux HTML5","Jouez gratuitement à des jeux en ligne sur AR CRAZYGAMES. Découvrez des jeux HTML5 d’action, de course, de puzzle, de sport, de tir, multijoueurs et 3D sans téléchargement."],
 ar:["AR CRAZYGAMES — ألعاب مجانية عبر الإنترنت | ألعاب HTML5","العب ألعاباً مجانية عبر الإنترنت على AR CRAZYGAMES. اكتشف ألعاب الأكشن والسباق والألغاز والرياضة والتصويب والألعاب متعددة اللاعبين وألعاب 3D بدون تحميل."],
 es:["AR CRAZYGAMES — Juegos online gratis | Juegos HTML5","Juega gratis en línea en AR CRAZYGAMES. Descubre juegos HTML5 de acción, carreras, puzles, deportes, disparos, multijugador y 3D sin descargas."],
 de:["AR CRAZYGAMES — Kostenlose Online-Spiele | HTML5-Spiele","Spiele kostenlose Online-Spiele auf AR CRAZYGAMES. Entdecke HTML5-Spiele aus Action, Rennen, Puzzle, Sport, Schießen, Multiplayer und 3D ohne Download."],
 zh:["AR CRAZYGAMES — 免费在线游戏 | HTML5 游戏","在 AR CRAZYGAMES 免费在线玩游戏。发现动作、赛车、益智、体育、射击、多人和 3D HTML5 游戏，无需下载。"]};
 const [title,desc]=d[lang]||d.en; const set=(sel,a,v)=>{let e=document.querySelector(sel);if(e)e.setAttribute(a,v)};
 document.title=title; set('meta[name="description"]','content',desc); set('meta[property="og:title"]','content',title); set('meta[property="og:description"]','content',desc); set('meta[property="og:site_name"]','content','AR CRAZYGAMES'); set('meta[property="og:image"]','content',origin+'/assets/argames-horizontal.png'); set('meta[name="twitter:title"]','content',title); set('meta[name="twitter:description"]','content',desc); set('meta[name="twitter:image"]','content',origin+'/assets/argames-horizontal.png');
 document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 const canonical=origin+location.pathname+(p.get("lang")?"?lang="+lang:""); let c=document.querySelector('link[rel="canonical"]');if(c)c.href=canonical; set('meta[property="og:url"]','content',canonical);
 langs.forEach(x=>{let l=document.querySelector(`link[rel="alternate"][hreflang="${x}"]`);if(l)l.href=origin+location.pathname+`?lang=${x}`});
 const schema=document.getElementById('site-schema');if(schema){try{let x=JSON.parse(schema.textContent);x.name="AR CRAZYGAMES";x.url=canonical;x.inLanguage=lang;x.image=origin+"/assets/argames-horizontal.png";schema.textContent=JSON.stringify(x)}catch(e){}}
})();
