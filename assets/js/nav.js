/* nav.js — 全局导航
 * 下拉：苹果官网风，左侧大标题列 + 右侧链接列
 * 站点固定部署在 /README/ 下
 */

(function () {
  var BASE = "/README/";
  var path = window.location.pathname;
  var isZh = path.indexOf("/README/zh-Hans") === 0;
  var BRAND = isZh ? "主页" : "Home";
  var SITE = isZh ? (BASE + "zh-Hans/") : BASE;

  var T = isZh ? {
    nav: { projects: "项目", stack: "技术栈", about: "关于", github: "GitHub" },
    eyebrow: "探索项目",
    heading: "全部项目",
    groups: [
      {
        title: "项目",
        links: [
          { label: "Swift Zip Manager", href: SITE + "projects/swift-zip-manager.html" },
          { label: "RunProcess",        href: SITE + "projects/runprocess.html" }
        ]
      },
      {
        title: "了解更多",
        links: [
          { label: "所有项目", href: SITE + "projects/" },
          { label: "技术栈",   href: SITE + "#stack" },
          { label: "关于",     href: SITE + "about/" }
        ]
      },
      {
        title: "源码",
        links: [
          { label: "Swift Zip Manager 仓库", href: "https://github.com/CaoHaoran-Dev/Swift-Zip-Manager" },
          { label: "RunProcess 仓库",        href: "https://github.com/CaoHaoran-Dev/RunProcess" },
          { label: "Web Demo 仓库",          href: "https://github.com/CaoHaoran-Dev/RunProcess-WebDemo" }
        ]
      }
    ]
  } : {
    nav: { projects: "Projects", stack: "Stack", about: "About", github: "GitHub" },
    eyebrow: "Explore",
    heading: "All projects",
    groups: [
      {
        title: "Projects",
        links: [
          { label: "Swift Zip Manager", href: SITE + "projects/swift-zip-manager.html" },
          { label: "RunProcess",        href: SITE + "projects/runprocess.html" }
        ]
      },
      {
        title: "More",
        links: [
          { label: "All Projects", href: SITE + "projects/" },
          { label: "Stack",        href: SITE + "#stack" },
          { label: "About",        href: SITE + "about/" }
        ]
      },
      {
        title: "Source",
        links: [
          { label: "Swift Zip Manager Repo", href: "https://github.com/CaoHaoran-Dev/Swift-Zip-Manager" },
          { label: "RunProcess Repo",        href: "https://github.com/CaoHaoran-Dev/RunProcess" },
          { label: "Web Demo Repo",          href: "https://github.com/CaoHaoran-Dev/RunProcess-WebDemo" }
        ]
      }
    ]
  };

  function isActive(seg) { return path.indexOf(seg) !== -1; }

  // 左侧大标题列
  var bigLinksHTML = T.groups[0].links.map(function (l) {
    return '<a class="mega-item" href="' + l.href + '">' + l.label + '</a>';
  }).join("");

  // 右侧小字列
  var columnsHTML = T.groups.slice(1).map(function (g) {
    var items = g.links.map(function (l) {
      var ext = l.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : '';
      return '<li><a href="' + l.href + '"' + ext + '>' + l.label + '</a></li>';
    }).join("");
    return '<div class="mega-col">' +
             '<div class="mega-col-title">' + g.title + '</div>' +
             '<ul>' + items + '</ul>' +
           '</div>';
  }).join("");

  var megaHTML =
    '<div class="nav-dropdown">' +
      '<div class="nav-dropdown-inner">' +
        '<div class="mega-eyebrow">' + T.eyebrow + '</div>' +
        '<div class="mega-heading">' + T.heading + '</div>' +
        '<div class="mega-grid">' +
          '<div class="mega-big">' + bigLinksHTML + '</div>' +
          '<div class="mega-cols">' + columnsHTML + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var linksHTML =
    '<div class="nav-item has-dropdown">' +
      '<a href="' + SITE + 'projects/"' + (isActive("projects") ? ' class="active"' : '') + '>' + T.nav.projects + '</a>' +
      megaHTML +
    '</div>' +
    '<a href="' + SITE + '#stack">' + T.nav.stack + '</a>' +
    '<a href="' + SITE + 'about/"' + (isActive("about") ? ' class="active"' : '') + '>' + T.nav.about + '</a>' +
    '<a href="https://github.com/CaoHaoran-Dev" target="_blank" rel="noopener">' + T.nav.github + '</a>';

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