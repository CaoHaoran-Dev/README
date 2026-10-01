/* settings-apply.js
 * 从 localStorage 读回 settings 页的所有设置，写到 <html>。
 * - 主题模式（light / dark / auto）→ data-theme 属性
 * - CSS 变量（--glass-* / --wg-* 等）→ style 属性
 *
 * 所有 /glass/ 页面 <head> 里加载：
 *   <script src=".../settings-apply.js"></script>
 *
 * 必须放在 main.css 之后、webglass.js 之前。
 *
 * 特性：
 * - ?reset 清空全部设置
 * - storage 事件跨 tab 同步
 */
(function () {
  'use strict';

  var KEY_SETTINGS = 'glass-settings';
  var KEY_THEME = 'glass-theme';
  var THEME_DEFAULT = 'light';

  /* ---------- 读 ---------- */
  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem(KEY_SETTINGS) || '{}');
    } catch (e) {
      return {};
    }
  }

  function readTheme() {
    try {
      var v = localStorage.getItem(KEY_THEME);
      if (v === 'light' || v === 'dark' || v === 'auto') return v;
    } catch (e) {}
    return THEME_DEFAULT;
  }

  /* ---------- 写 ---------- */
  function applySettings(obj) {
    var root = document.documentElement;

    /* 清掉之前写入的 -- 变量 */
    Array.from(root.style).forEach(function (p) {
      if (p.indexOf('--') === 0) root.style.removeProperty(p);
    });

    /* 写入新的 */
    Object.keys(obj).forEach(function (k) {
      if (k.indexOf('--') === 0) root.style.setProperty(k, obj[k]);
    });
  }

  function applyTheme(mode) {
    var root = document.documentElement;
    root.removeAttribute('data-theme');
    if (mode === 'auto') root.setAttribute('data-theme', 'auto');
    else if (mode === 'dark') root.setAttribute('data-theme', 'dark');
    else root.setAttribute('data-theme', 'light');
  }

  /* ---------- ?reset ---------- */
  if (location.search.indexOf('reset') !== -1) {
    try {
      localStorage.removeItem(KEY_SETTINGS);
      localStorage.removeItem(KEY_THEME);
    } catch (e) {}
    applySettings({});
    applyTheme(THEME_DEFAULT);
    return;
  }

  /* ---------- 初始应用（越早越好，防闪烁）---------- */
  applyTheme(readTheme());
  applySettings(readSettings());

  /* ---------- 跨 tab 同步 ---------- */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY_SETTINGS) applySettings(readSettings());
    if (e.key === KEY_THEME) applyTheme(readTheme());
  });

  /* ---------- 暴露 API（Settings 页用）---------- */
  window.glassSettings = {
    get theme() { return readTheme(); },
    setTheme: function (mode) {
      if (mode !== 'light' && mode !== 'dark' && mode !== 'auto') mode = THEME_DEFAULT;
      try { localStorage.setItem(KEY_THEME, mode); } catch (e) {}
      applyTheme(mode);
      window.dispatchEvent(new CustomEvent('theme:change', { detail: { mode: mode } }));
    },
    get vars() { return readSettings(); },
    setVars: function (obj) {
      try { localStorage.setItem(KEY_SETTINGS, JSON.stringify(obj)); } catch (e) {}
      applySettings(obj);
    },
    reset: function () {
      try {
        localStorage.removeItem(KEY_SETTINGS);
        localStorage.removeItem(KEY_THEME);
      } catch (e) {}
      applySettings({});
      applyTheme(THEME_DEFAULT);
    }
  };
})();