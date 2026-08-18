(() => {
  "use strict";

  const ADS = {
    native: "https://pl30895524.effectivecpmnetwork.com/f349174b2846fc6c2afec1dd883bfc9f/invoke.js",
    nativeId: "f349174b2846fc6c2afec1dd883bfc9f",
    banners: {
      b468: {key:"4791e031f4b87b4bd5c030ff4c3e2671", w:468, h:60},
      b320: {key:"8fb4dd283d6672b30de9a858ad507e8b", w:320, h:50},
      b300: {key:"e1fdb6c6e7b6d37c8f957242d333d5f0", w:300, h:250},
      b160x300: {key:"1bfa61b9ee125ff3aede8cdd74618c09", w:160, h:300},
      b160x600: {key:"ff27115afaced71e3aedcbcd9cbec0a5", w:160, h:600}
    }
  };

  let seq = 0;

  function slot(cls="site-ad") {
    const el = document.createElement("div");
    el.className = `site-ad ${cls}`;
    el.setAttribute("aria-label","Advertisement");
    return el;
  }

  function nativeAd() {
    const wrap = slot("native-ad");
    const box = document.createElement("div");
    box.id = `container-${ADS.nativeId}`;
    box.className = "native-mount";
    wrap.appendChild(box);

    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync","false");
    s.src = ADS.native;
    return {wrap, script:s};
  }

  function bannerAd(kind) {
    const cfg = ADS.banners[kind];
    const wrap = slot(`banner-ad banner-${cfg.w}x${cfg.h} banner-${kind}`);
    wrap.style.setProperty("--ad-w", `${cfg.w}px`);
    wrap.style.setProperty("--ad-h", `${cfg.h}px`);

    const code = document.createElement("script");
    code.text = `window.atOptions={key:${JSON.stringify(cfg.key)},format:"iframe",height:${cfg.h},width:${cfg.w},params:{}};`;
    const loader = document.createElement("script");
    loader.src = `https://www.highperformanceformat.com/${cfg.key}/invoke.js`;
    loader.async = false;
    wrap.appendChild(code);
    wrap.appendChild(loader);
    return wrap;
  }

  function addNative(target, repeat=false) {
    if (!target) return;
    const {wrap,script} = nativeAd();
    target.appendChild(wrap);
    // A native unit may be repeated on a page, but the provider requires
    // a fresh script execution for each placement.
    wrap.appendChild(script);
    if (repeat) {
      const {wrap:wrap2,script:script2} = nativeAd();
      target.appendChild(wrap2);
      wrap2.appendChild(script2);
    }
  }

  function addBanner(target, kind) {
    if (!target) return;
    target.appendChild(bannerAd(kind));
  }

  function addAllAds(target, verticalCount=10) {
    if (!target) return;
    const row = document.createElement("div");
    row.className = "ad-row all-ads-row";
    addBanner(row, "b468");
    addBanner(row, "b320");
    addBanner(row, "b300");
    addBanner(row, "b160x300");
    for (let i = 0; i < verticalCount; i++) addBanner(row, "b160x600");
    addNative(row);
    target.appendChild(row);
  }

  function pageAds() {
    const path = location.pathname.replace(/\/+$/,"/");
    const isGame = /\/game\/game\.html$/i.test(path);
    const isCategory = /\/categories\/[^/]+\.html$/i.test(path);
    const isHome = /\/(?:index\.html)?$/i.test(path);

    if (isHome) {
      // IMPORTANT: no ad is inserted before the first game sections.
      // The gamer sees the site and games first; ads start after NEW GAMES.
      const newGames = document.querySelector("#new");
      const multi = document.querySelector("#multiplayer");
      const top = document.querySelector("#top");
      if (newGames) addAllAds(newGames, 4);
      if (multi) addAllAds(multi, 3);
      if (top) addAllAds(top, 3);
    }

    if (isCategory) {
      const main = document.querySelector("main.cat-page");
      const grid = document.querySelector(".cat-grid, .mosaic-grid");
      if (main && grid) {
        const row = document.createElement("div");
        row.className = "ad-row category-ads-after-games";
        addBanner(row, "b468");
        addBanner(row, "b320");
        addBanner(row, "b300");
        addBanner(row, "b160x300");
        for (let i = 0; i < 10; i++) addBanner(row, "b160x600");
        addNative(row);
        grid.after(row);
      }
    }

    if (isGame) {
      const main = document.querySelector("main");
      const shell = document.querySelector("#shell");
      const info = document.querySelector("#infoGrid");
      const related = document.querySelector("#related");
      // Game is always first. Ads begin only after the playable game area.
      if (main && shell) {
        const row = document.createElement("div");
        row.className = "ad-row game-ads-after";
        addBanner(row, "b468");
        addBanner(row, "b320");
        addBanner(row, "b300");
        addBanner(row, "b160x300");
        for (let i = 0; i < 10; i++) addBanner(row, "b160x600");
        addNative(row);
        shell.closest(".play-left")?.appendChild(row) || main.appendChild(row);
      } else if (main) {
        addAllAds(main, 10);
      }
      if (main && info) {
        const row = document.createElement("div");
        row.className = "ad-row game-ads-info";
        addBanner(row, "b300");
        addBanner(row, "b320");
        info.after(row);
      }
      if (main && related) {
        const row = document.createElement("div");
        row.className = "ad-row game-ads-related";
        addBanner(row, "b468");
        related.after(row);
      }
    }
  }

  function boot() {
    if (document.documentElement.dataset.arAdsLoaded) return;
    document.documentElement.dataset.arAdsLoaded = "1";
    pageAds();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }
})();