/* nav.js — injects the global nav with a dropdown on "Projects" */

(function () {
  var BRAND = "Haoran Cao";
  var BRAND_HREF = "/README/";

  var PROJECTS = [
    {
      label: "Swift Zip Manager",
      href: "/README/projects/swift-zip-manager.html",
      desc: "A native macOS archive manager."
    },
    {
      label: "RunProcess",
      href: "/README/projects/runprocess.html",
      desc: "A Spotlight-style command launcher."
    },
    {
      label: "RunProcess Web Demo",
      href: "/README/projects/runprocess-webdemo.html",
      desc: "RunProcess, in your browser."
    }
  ];

  var LINKS = [
    { label: "Projects", href: "/README/projects/", match: "/projects", dropdown: "projects" },
    { label: "Stack",    href: "/README/#stack",    match: null },
    { label: "About",    href: "/README/about/",    match: "/about" },
    { label: "GitHub",   href: "https://github.com/CaoHaoran-Dev", match: null, external: true }
  ];

  var path = window.location.pathname;

  function isActive(link) {
    if (!link.match) return false;
    return path.indexOf(link.match) !== -1;
  }

  // Build dropdown items
  var dropdownItemsHTML = PROJECTS.map(function (p) {
    return '<a class="nav-dropdown-item" href="' + p.href + '">' +
             '<span class="nav-dropdown-title">' + p.label + '</span>' +
             '<span class="nav-dropdown-desc">' + p.desc + '</span>' +
           '</a>';
  }).join("");

  // Build nav links
  var linksHTML = LINKS.map(function (l) {
    var active = isActive(l) ? ' class="active"' : "";
    var ext = l.external ? ' target="_blank" rel="noopener"' : "";

    if (l.dropdown === "projects") {
      return '<div class="nav-item has-dropdown">' +
               '<a href="' + l.href + '"' + active + ext + '>' + l.label + '</a>' +
               '<div class="nav-dropdown">' +
                 '<div class="nav-dropdown-inner">' +
                   dropdownItemsHTML +
                 '</div>' +
               '</div>' +
             '</div>';
    }

    return '<a href="' + l.href + '"' + active + ext + '>' + l.label + '</a>';
  }).join("");

  var navHTML =
    '<header class="global-nav">' +
      '<div class="global-nav-inner">' +
        '<a href="' + BRAND_HREF + '" class="brand">' + BRAND + '</a>' +
        '<nav>' + linksHTML + '</nav>' +
      '</div>' +
      '<div class="nav-backdrop"></div>' +
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