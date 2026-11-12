/* footer.js — 主站页脚（语言切换，i18n 版）
 * 站点根自动推导：/README/ 或 /
 * 注意：已移除 /glass/ 入口，glass 站仅可通过地址栏直接访问。
 */
(function () {
  var BASE = /^\/README\//.test(window.location.pathname) ? "/README/" : "/";
  var YEAR = new Date().getFullYear();

  function inject() {
    window.i18n.ready(function (t) {
      var isZh = window.i18n.lang === "zh-Hans";

      var linksHTML =
        '<div class="footer-links">' +
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
          var lang = a.getAttribute('data-lang');
          if (lang === window.i18n.lang) return;

          localStorage.setItem('lang', lang);
          var url = new URL(window.location.href);
          url.searchParams.set('lang', lang);
          window.location.href = url.toString();
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