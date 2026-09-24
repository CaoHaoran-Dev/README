/* footer.js — 页脚 + 底部语言选择
 * 站点固定部署在 /README/ 下，本地和 GitHub Pages 通用
 */

(function () {
  var BASE = "/README/";
  var path = window.location.pathname;
  var isZh = path.indexOf("/README/zh-Hans/") !== -1 ||
             path.indexOf("/README/zh-Hans") === 0;

  // 当前页面相对站点根的路径（不含语言段），如 index.html / projects/runprocess.html
  var page = document.documentElement.getAttribute("data-page") || "index.html";

  var enHref = BASE + page;
  var zhHref = BASE + "zh-Hans/" + page;

  var YEAR = new Date().getFullYear();

  var FOOTER_TEXT = isZh
    ? "© " + YEAR + " Haoran Cao. 保留所有权利。"
    : "© " + YEAR + " Haoran Cao. All rights reserved.";

  var LANG_LABEL = isZh ? "语言" : "Language";

  var langHTML =
    '<div class="lang-switch-footer">' +
      '<span class="lang-label">' + LANG_LABEL + '</span>' +
      '<a href="' + enHref + '"' + (!isZh ? ' class="active"' : '') + '>English</a>' +
      '<span class="lang-sep">·</span>' +
      '<a href="' + zhHref + '"' + (isZh ? ' class="active"' : '') + '>简体中文</a>' +
    '</div>';

  var footerHTML =
    '<footer class="site-footer glass glass-refract">' +
      '<p>' + FOOTER_TEXT + '</p>' +
      langHTML +
    '</footer>';

  function inject() {
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();