/* nav.js — injects the global nav on every page */

(function () {
  var BRAND = "Haoran Cao";
  var BRAND_HREF = "/README/";

  var LINKS = [
    { label: "Projects", href: "/README/projects/", match: "/projects" },
    { label: "Stack",    href: "/README/#stack",    match: null },
    { label: "About",    href: "/README/about/",    match: "/about" },
    { label: "GitHub",   href: "https://github.com/CaoHaoran-Dev", match: null, external: true }
  ];

  var path = window.location.pathname;

  function isActive(link) {
    if (!link.match) return false;
    return path.indexOf(link.match) !== -1;
  }

  var linksHTML = LINKS.map(function (l) {
    var active = isActive(l) ? ' class="active"' : "";
    var ext = l.external ? ' target="_blank" rel="noopener"' : "";
    return '<a href="' + l.href + '"' + active + ext + '>' + l.label + '</a>';
  }).join("");

  var navHTML =
    '<header class="global-nav">' +
      '<div class="global-nav-inner">' +
        '<a href="' + BRAND_HREF + '" class="brand">' + BRAND + '</a>' +
        '<nav>' + linksHTML + '</nav>' +
      '</div>' +
    '</header>';

  function inject() {
    document.body.insertAdjacentHTML("afterbegin", navHTML);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();