/* settings-apply.js — 从 localStorage 读回 settings 页调过的变量
 * 在 :root 上覆盖 token.css 的默认值。
 * 所有 /glass/ 页面都要加载这个脚本。
 */
(function () {
  'use strict';

  var KEY = 'glass-settings';

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    var keys = Object.keys(saved);
    if (!keys.length) return;

    var root = document.documentElement;
    keys.forEach(function (k) {
      if (k.indexOf('--') === 0) {
        root.style.setProperty(k, saved[k]);
      }
    });
  } catch (e) {}
})();