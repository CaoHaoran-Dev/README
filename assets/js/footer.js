/* footer.js — 主站页脚（Liquid Glass 入口 + 语言切换，i18n 版） */
(function () {
  var BASE  = "/README/";
  var GLASS = BASE + "glass/";
  var YEAR  = new Date().getFullYear();

  function inject() {
    window.i18n.ready(function (t) {
      var isZh = window.i18n.lang === "zh-Hans";

      // Liquid Glass 入口带上当前语言，点过去语言保持一致
      var glassHref = GLASS + "?lang=" + window.i18n.lang;

      var linksHTML =
        '<div class="footer-links">' +
          '<span class="glass-switch-footer">' +
            '<a href="' + glassHref + '">' + t("footer.glass") + '</a>' +
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

      // 语言切换
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