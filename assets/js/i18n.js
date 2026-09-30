/* i18n.js — 运行时本地化，Xcode 风格
 * 目录约定：
 *   locales/en.json
 *   locales/zh-Hans.json
 *
 * 语言优先级：
 *   1) URL 参数 ?lang=zh-Hans   （切换时用，写完 localStorage 再跳）
 *   2) localStorage.lang        （用户上次选择）
 *   3) navigator.language       （浏览器语言）
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
    // 1) URL 参数最优先（用户刚点的切换）
    var q = readLangFromURL();
    if (q) {
      try { localStorage.setItem("lang", q); } catch (e) {}
      return q;
    }

    // 2) localStorage
    try {
      var saved = localStorage.getItem("lang");
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}

    // 3) 浏览器语言
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

    // 文本内容
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.dataset.i18n;
      var args = el.dataset.i18nArgs ? JSON.parse(el.dataset.i18nArgs) : null;
      el.textContent = t(key, args);
    });

    // 属性：data-i18n-attr="placeholder:home.search,title:home.tip"
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(",").forEach(function (pair) {
        var i = pair.indexOf(":");
        if (i < 0) return;
        var attr = pair.slice(0, i).trim();
        var key  = pair.slice(i + 1).trim();
        el.setAttribute(attr, t(key));
      });
    });

    // <title>
    var titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey) document.title = t(titleKey);
  }

  function loadDict(lang) {
    return fetch(BASE + "locales/" + lang + ".json")
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; });
  }

  // persist=false 时不写 localStorage（比如由 URL 参数驱动时已写过）
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

  // 切换语言：写 localStorage，加 ?lang=xx 强制刷新，去掉旧参数
  function switchTo(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = FALLBACK;
    if (lang === current) return;

    try { localStorage.setItem("lang", lang); } catch (e) {}

    var url = new URL(window.location.href);
    url.searchParams.set("lang", lang);

    // 首次进来是 ?lang=xx 时，刷新后可以清掉参数，避免一直留在 URL 上
    // 但为了简单和可分享性，这里保留参数。
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

  // 如果 URL 带 ?lang= 且跟本地已经一致，清掉参数让 URL 干净
  // （可选，不喜欢可以删掉这段）
  (function cleanURL() {
    var q = readLangFromURL();
    if (!q) return;
    try {
      var url = new URL(window.location.href);
      url.searchParams.delete("lang");
      var clean = url.pathname + (url.search ? url.search : "") + url.hash;
      window.history.replaceState({}, "", clean);
    } catch (e) {}
  })();
})();