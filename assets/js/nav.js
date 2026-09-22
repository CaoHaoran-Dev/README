/* nav.js — 最简版，固定 /README/ 前缀 */

(function () {
  var BASE = "/README/";
  var BRAND = "Haoran Cao";
  var path = window.location.pathname;
  var isZh = path.indexOf("/README/zh-Hans") === 0;
  var SITE = isZh ? (BASE + "zh-Hans/") : BASE;

  var T = isZh ? {
    projects: "项目", stack: "技术栈", about: "关于", github: "GitHub",
    d1: "原生 macOS 压缩包管理器。",
    d2: "Spotlight 风格命令启动器。",
    d3: "浏览器里的 RunProcess。"
  } : {
    projects: "Projects", stack: "Stack", about: "About", github: "GitHub",
    d1: "A native macOS archive manager.",
    d2: "A Spotlight-style command launcher.",
    d3: "RunProcess, in your browser."
  };

  var PROJECTS = [
    { label: "Swift Zip Manager",  href: SITE + "projects/swift-zip-manager.html",  desc: T.d1 },
    { label: "RunProcess",         href: SITE + "projects/runprocess.html",         desc: T.d2 },
    { label: "RunProcess Web Demo", href: SITE + "projects/runprocess-webdemo.html", desc: T.d3 }
  ];

  function isActive(seg) { return path.indexOf(seg) !== -1; }

  var dropdownItemsHTML = PROJECTS.map(function (p) {
    return '<a class="nav-dropdown-item" href="' + p.href + '">' +
             '<span class="nav-dropdown-title">' + p.label + '</span>' +
             '<span class="nav-dropdown-desc">' + p.desc + '</span>' +
           '</a>';
  }).join("");

  var linksHTML =
    '<div class="nav-item has-dropdown">' +
      '<a href="' + SITE + 'projects/"' + (isActive("projects") ? ' class="active"' : '') + '>' + T.projects + '</a>' +
      '<div class="nav-dropdown"><div class="nav-dropdown-inner">' + dropdownItemsHTML + '</div></div>' +
    '</div>' +
    '<a href="' + SITE + '#stack">' + T.stack + '</a>' +
    '<a href="' + SITE + 'about/"' + (isActive("about") ? ' class="active"' : '') + '>' + T.about + '</a>' +
    '<a href="https://github.com/CaoHaoran-Dev" target="_blank" rel="noopener">' + T.github + '</a>';

  var navHTML =
    '<header class="global-nav">' +
      '<div class="global-nav-inner">' +
        '<a href="' + SITE + '" class="brand">' + BRAND + '</a>' +
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