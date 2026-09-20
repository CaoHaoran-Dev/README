/* footer.js — injects the site footer */

(function () {
  var FOOTER_TEXT = "Designed and built for the Mac. Every pixel considered.";

  var footerHTML =
    '<footer class="site-footer">' +
      '<p>' + FOOTER_TEXT + '</p>' +
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