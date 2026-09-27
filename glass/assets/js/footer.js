/* footer.js — 页脚（glass 版）
 * 站点根从当前路径动态推导
 * SHOW_LANG_SWITCH = false，隐藏语言切换
 * 加一个「回主站」链接
 */

(function () {
  var SHOW_LANG_SWITCH = false;

  var path = window.location.pathname;

  var BETA_MARK = "/glass/";
  var betaIdx = path.indexOf(BETA_MARK);
  var BASE = betaIdx !== -1
    ? path.substring(0, betaIdx + BETA_MARK.length)
    : "/README/";

  var isZh = path.indexOf(BASE + "zh-Hans") === 0;

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

  /* 回主站 —— 从 /README/glass/... 推到 /README/ */
  var MAIN_HREF = BASE.replace(/glass\/$/, "");

  var linksHTML =
    '<div class="footer-links">' +
      '<span class="glass-switch-footer">' +
        '<a href="' + MAIN_HREF + '">‹ Back to main site</a>' +
      '</span>' +
      (SHOW_LANG_SWITCH ? langHTML : '') +
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