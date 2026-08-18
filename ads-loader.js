(() => {
  "use strict";

  /*
   * AR CRAZYGAMES ad loader
   *
   * IMPORTANT:
   * Every provider unit is executed inside its own iframe. The banner
   * provider uses a global `atOptions` object + document.write(), so putting
   * several units in the parent page makes them overwrite/collide. Isolating
   * every unit fixes that problem while keeping the original provider code.
   */
  const ADS = {
    native: {
      src: "https://pl30895524.effectivecpmnetwork.com/f349174b2846fc6c2afec1dd883bfc9f/invoke.js",
      id: "f349174b2846fc6c2afec1dd883bfc9f"
    },
    banners: {
      b468: { key: "4791e031f4b87b4bd5c030ff4c3e2671", w: 468, h: 60 },
      b320: { key: "8fb4dd283d6672b30de9a858ad507e8b", w: 320, h: 50 },
      b300: { key: "e1fdb6c6e7b6d37c8f957242d333d5f0", w: 300, h: 250 },
      b160x300: { key: "1bfa61b9ee125ff3aede8cdd74618c09", w: 160, h: 300 },
      b160x600: { key: "ff27115afaced71e3aedcbcd9cbec0a5", w: 160, h: 600 }
    }
  };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  function slot(className = "site-ad") {
    const el = document.createElement("div");
    el.className = className;
    el.setAttribute("aria-label", "Advertisement");
    return el;
  }

  function iframeShell(width, height, className) {
    const frame = document.createElement("iframe");
    frame.className = className;
    frame.width = String(width);
    frame.height = String(height);
    frame.setAttribute("title", "Advertisement");
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("marginwidth", "0");
    frame.setAttribute("marginheight", "0");
    frame.setAttribute("allow", "autoplay; fullscreen");
    frame.style.display = "block";
    frame.style.border = "0";
    frame.style.maxWidth = "100%";
    frame.style.background = "transparent";
    return frame;
  }

  function bannerAd(kind) {
    const cfg = ADS.banners[kind];
    const wrap = slot(`site-ad banner-ad banner-${cfg.w}x${cfg.h} banner-${kind}`);
    wrap.style.setProperty("--ad-w", `${cfg.w}px`);
    wrap.style.setProperty("--ad-h", `${cfg.h}px`);

    const frame = iframeShell(cfg.w, cfg.h, "isolated-ad-frame");
    const invoke = `https://www.highperformanceformat.com/${cfg.key}/invoke.js`;

    // The provider script is intentionally unchanged. It gets a private
    // document + private global scope inside this iframe.
    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:${cfg.w}px;height:${cfg.h}px;overflow:hidden;background:transparent}body{display:flex;align-items:flex-start;justify-content:flex-start}</style></head><body><script>var atOptions={key:"${esc(cfg.key)}",format:"iframe",height:${cfg.h},width:${cfg.w},params:{}};<\/script><script src="${invoke}"></script></body></html>`;
    wrap.appendChild(frame);
    return wrap;
  }

  function nativeAd() {
    const wrap = slot("site-ad native-ad");
    const frame = iframeShell(320, 320, "isolated-native-frame");
    const nativeId = ADS.native.id;
    const invoke = ADS.native.src;

    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:320px;height:320px;overflow:hidden;background:transparent}#container-${nativeId}{width:320px;min-height:320px;display:block}</style></head><body><div id="container-${nativeId}"></div><script async="async" data-cfasync="false" src="${invoke}"></script></body></html>`;
    wrap.appendChild(frame);
    return wrap;
  }

  function appendAd(target, node) {
    if (target && node) target.appendChild(node);
  }

  function addAllAds(target, verticalCount = 10) {
    if (!target) return;
    const row = document.createElement("div");
    row.className = "ad-row all-ads-row";

    appendAd(row, bannerAd("b468"));
    appendAd(row, bannerAd("b320"));
    appendAd(row, bannerAd("b300"));
    appendAd(row, bannerAd("b160x300"));
    for (let i = 0; i < verticalCount; i++) appendAd(row, bannerAd("b160x600"));
    appendAd(row, nativeAd());

    target.appendChild(row);
  }

  function addSmallExtraAds(target) {
    if (!target) return;
    const row = document.createElement("div");
    row.className = "ad-row extra-ads-row";
    appendAd(row, bannerAd("b300"));
    appendAd(row, bannerAd("b320"));
    appendAd(row, nativeAd());
    target.appendChild(row);
  }

  function pageAds() {
    const path = location.pathname.replace(/\/+$/, "/");
    const isGame = /\/game\/game\.html$/i.test(path);
    const isCategory = /\/categories\/[^/]+\.html$/i.test(path);
    const isHome = /\/(?:index\.html)?$/i.test(path);

    if (isHome) {
      /*
       * Games FIRST on mobile and desktop: place the first full ad block only
       * AFTER the complete NEW GAMES grid. Never put ads in the header/hero.
       */
      const newSection = document.querySelector("#new");
      const multiSection = document.querySelector("#multiplayer");
      const topSection = document.querySelector("#top");

      if (newSection) {
        const grid = newSection.querySelector("#newGrid");
        if (grid) {
          const holder = document.createElement("div");
          grid.after(holder);
          addAllAds(holder, 10);
        } else addAllAds(newSection, 10);
      }
      if (multiSection) {
        const grid = multiSection.querySelector("#multiGrid");
        if (grid) {
          const holder = document.createElement("div");
          grid.after(holder);
          addSmallExtraAds(holder);
        }
      }
      if (topSection) {
        const grid = topSection.querySelector("#topGrid");
        if (grid) {
          const holder = document.createElement("div");
          grid.after(holder);
          addSmallExtraAds(holder);
        }
      }
      return;
    }

    if (isCategory) {
      const main = document.querySelector("main.cat-page");
      const grid = document.querySelector(".cat-grid, .mosaic-grid");
      if (main && grid) {
        const holder = document.createElement("div");
        holder.className = "category-ad-holder";
        grid.after(holder);
        addAllAds(holder, 10);
      }
      return;
    }

    if (isGame) {
      const main = document.querySelector("main");
      const shell = document.querySelector("#shell");
      const info = document.querySelector("#infoGrid");
      const related = document.querySelector("#related");

      /* Never place an ad before the playable game. */
      if (shell) {
        const holder = document.createElement("div");
        holder.className = "game-ad-holder";
        shell.after(holder);
        addAllAds(holder, 10);
      } else if (main) {
        addAllAds(main, 10);
      }

      if (info) {
        const holder = document.createElement("div");
        info.after(holder);
        addSmallExtraAds(holder);
      }
      if (related) {
        const holder = document.createElement("div");
        related.after(holder);
        addSmallExtraAds(holder);
      }
    }
  }

  function boot() {
    if (document.documentElement.dataset.arAdsLoaded) return;
    document.documentElement.dataset.arAdsLoaded = "1";
    pageAds();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
