/* footer.js — 页脚 + 语言切换 + Liquid Glass 入口
 * 站点固定部署在 /README/ 下，本地和 GitHub Pages 通用
 */

(function () {
  var BASE = "/README/";
  var path = window.location.pathname;
  var isZh = path.indexOf("/README/zh-Hans/") !== -1 ||
             path.indexOf("/README/zh-Hans") === 0;

  var page = document.documentElement.getAttribute("data-page") || "index.html";

  var enHref = BASE + page;
  var zhHref = BASE + "zh-Hans/" + page;

  var YEAR = new Date().getFullYear();

  var FOOTER_TEXT = isZh
    ? "© " + YEAR + " Haoran Cao. 保留所有权利。"
    : "© " + YEAR + " Haoran Cao. All rights reserved.";

  var LANG_LABEL = isZh ? "语言" : "Language";

  var GLASS_HREF = BASE + "glass/";

  var linksHTML =
    '<div class="footer-links">' +
      '<span class="glass-switch-footer">' +
        '<a href="' + GLASS_HREF + '">Liquid Glass (EN) ›</a>' +
      '</span>' +
      '<span class="lang-switch-footer">' +
        '<span class="lang-label">' + LANG_LABEL + '</span>' +
        '<a href="' + enHref + '"' + (!isZh ? ' class="active"' : '') + '>English</a>' +
        '<span class="lang-sep">·</span>' +
        '<a href="' + zhHref + '"' + (isZh ? ' class="active"' : '') + '>简体中文</a>' +
      '</span>' +
    '</div>';

  var footerHTML =
    '<footer class="site-footer">' +
      '<p>' + FOOTER_TEXT + '</p>' +
      linksHTML +
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