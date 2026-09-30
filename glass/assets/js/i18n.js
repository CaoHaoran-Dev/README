/* i18n.js — 运行时本地化，Xcode 风格（glass 版与主站共用）
 * 目录约定：
 *   locales/en.json
 *   locales/zh-Hans.json
 *
 * 语言优先级：
 *   1) URL 参数 ?lang=zh-Hans
 *   2) localStorage.lang
 *   3) navigator.language
 *
 * 切换方式：footer 里点链接 → localStorage.setItem + 加 ?lang= 刷新
 * 不依赖 /README/zh-Hans/ 目录，只维护一份 HTML。
 */
(function () {
  var BASE = "/README/";
  var SUPPORTED = ["en", "zh-Hans"];
  var FALLBACK = "en";

  function normalize(lang) {
    if (!lang) return FALLBACK;
    var l = String(lang).toLowerCase();
    if (l.indexOf("zh") === 0) return "zh-Hans";
    if (l.indexOf("en") === 0) return "en";
    return FALLBACK;
  }

  function readLangFromURL() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = params.get("lang");
      if (q && SUPPORTED.indexOf(q) !== -1) return q;
    } catch (e) {}
    return null;
  }

  function detectLang() {
    var q = readLangFromURL();
    if (q) {
      try { localStorage.setItem("lang", q); } catch (e) {}
      return q;
    }

    try {
      var saved = localStorage.getItem("lang");
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}

    return normalize(navigator.language);
  }

  var current = detectLang();
  var dict = {};
  var fallbackDict = {};
  var ready = false;
  var pending = [];

  function interpolate(str, args) {
    if (!args) return str;
    return str.replace(/\{(\w+)\}/g, function (_, k) {
      return args[k] != null ? args[k] : "{" + k + "}";
    });
  }

  function t(key, args) {
    var s = dict[key];
    if (s == null) s = fallbackDict[key];
    if (s == null) return key;
    return interpolate(s, args);
  }

  function apply(root) {
    root = root || document;

    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.dataset.i18n;
      var args = el.dataset.i18nArgs ? JSON.parse(el.dataset.i18nArgs) : null;
      el.textContent = t(key, args);
    });

    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(",").forEach(function (pair) {
        var i = pair.indexOf(":");
        if (i < 0) return;
        var attr = pair.slice(0, i).trim();
        var key  = pair.slice(i + 1).trim();
        el.setAttribute(attr, t(key));
      });
    });

    var titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey) document.title = t(titleKey);
  }

  function loadDict(lang) {
    return fetch(BASE + "locales/" + lang + ".json")
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; });
  }

  function setLang(lang, persist) {
    if (SUPPORTED.indexOf(lang) === -1) lang = FALLBACK;
    current = lang;
    if (persist !== false) {
      try { localStorage.setItem("lang", lang); } catch (e) {}
    }
    document.documentElement.lang = lang;

    return Promise.all([loadDict(lang), loadDict(FALLBACK)])
      .then(function (res) {
        dict = res[0];
        fallbackDict = res[1];
        ready = true;
        apply();
        pending.forEach(function (fn) { fn(t); });
        pending = [];
      });
  }

  function ready_(fn) {
    if (ready) return fn(t);
    pending.push(fn);
  }

  function switchTo(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = FALLBACK;
    if (lang === current) return;

    try { localStorage.setItem("lang", lang); } catch (e) {}

    var url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }

  window.i18n = {
    t: t,
    apply: apply,
    setLang: setLang,
    switchTo: switchTo,
    ready: ready_,
    get lang() { return current; }
  };

  setLang(current, false);
})();