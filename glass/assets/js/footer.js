/* footer.js — glass 版页脚
 * base 从当前路径推导：/README/glass/...
 * 语言切换保留 /glass/ 前缀
 */
(function () {
  var path = window.location.pathname;
  var BASE = "/README/";
  var GLASS = BASE + "glass/";
  var MAIN = BASE;

  var YEAR = new Date().getFullYear();

  function inject() {
    window.i18n.ready(function (t) {
      var isZh = window.i18n.lang === "zh-Hans";

      var linksHTML =
        '<div class="footer-links">' +
          '<span class="glass-switch-footer">' +
            '<a href="' + MAIN + '">' + t("footer.backMain") + '</a>' +
          '</span>' +
          '<span class="lang-switch-footer">' +
            '<span class="lang-label">' + t("footer.language") + '</span>' +
            '<a href="#" data-lang="en"'      + (!isZh ? ' class="active"' : '') + '>' + t("footer.english") + '</a>' +
            '<span class="lang-sep">·</span>' +
            '<a href="#" data-lang="zh-Hans"' + ( isZh ? ' class="active"' : '') + '>' + t("footer.chinese") + '</a>' +
          '</span>' +
        '</div>';

      var html =
        '<footer class="site-footer">' +
          '<p>' + t("footer.rights", { year: YEAR }) + '</p>' +
          linksHTML +
        '</footer>';

      document.body.insertAdjacentHTML("beforeend", html);

      document.querySelectorAll('.lang-switch-footer a[data-lang]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          window.i18n.switchTo(a.getAttribute('data-lang'));
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();