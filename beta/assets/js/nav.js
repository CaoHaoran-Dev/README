/* nav.js — 全局导航（beta，纯英文）
 * 顶栏：Home + Projects + Stack + About + GitHub + 汉堡
 * 汉堡 hover / 点击 → 展开下拉（桌面）
 * 汉堡点击 → 打开抽屉（移动端）
 */

(function () {
  var path = window.location.pathname;

  var BETA_MARK = "/beta/";
  var betaIdx = path.indexOf(BETA_MARK);
  var BASE = betaIdx !== -1
    ? path.substring(0, betaIdx + BETA_MARK.length)
    : "/README/";

  var SITE = BASE;

  var T = {
    nav: { projects: "Projects", stack: "Stack", about: "About", github: "GitHub" },
    eyebrow: "Explore",
    heading: "All projects",
    big: [
      { label: "Swift Zip Manager", href: SITE + "projects/swift-zip-manager.html" },
      { label: "RunProcess",        href: SITE + "projects/runprocess.html" }
    ],
    cols: [
      {
        title: "In Development",
        links: [
          { label: "TaskView", href: SITE + "projects/taskview.html" }
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
          { label: "TaskView Repo",          href: "https://github.com/CaoHaoran-Dev/TaskView" },
          { label: "Web Demo Repo",          href: "https://github.com/CaoHaoran-Dev/RunProcess-WebDemo" }
        ]
      }
    ]
  };

  function isActive(seg) { return path.indexOf(seg) !== -1; }

  var bigLinksHTML = T.big.map(function (l) {
    return '<a class="mega-item" href="' + l.href + '">' + l.label + '</a>';
  }).join("");

  var columnsHTML = T.cols.map(function (g) {
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
    '<a href="' + SITE + 'projects/"' + (isActive("projects") ? ' class="active"' : '') + '>' + T.nav.projects + '</a>' +
    '<a href="' + SITE + '#stack">' + T.nav.stack + '</a>' +
    '<a href="' + SITE + 'about/"' + (isActive("about") ? ' class="active"' : '') + '>' + T.nav.about + '</a>' +
    '<a href="https://github.com/CaoHaoran-Dev" target="_blank" rel="noopener">' + T.nav.github + '</a>';

  var drawerBig = T.big.map(function (l) {
    return '<a href="' + l.href + '">' + l.label + '</a>';
  }).join("");

  var drawerCols = T.cols.map(function (g) {
    var items = g.links.map(function (l) {
      var ext = l.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : '';
      return '<li><a href="' + l.href + '"' + ext + '>' + l.label + '</a></li>';
    }).join("");
    return '<div class="drawer-group">' +
             '<div class="drawer-group-title">' + g.title + '</div>' +
             '<ul>' + items + '</ul>' +
           '</div>';
  }).join("");

  var drawerHTML =
    '<div class="mobile-drawer">' +
      '<div class="mobile-drawer-header">' +
        '<span class="mobile-drawer-title">Menu</span>' +
        '<button class="mobile-drawer-close" aria-label="Close">' +
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="none">' +
            '<path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div class="mobile-drawer-body">' +
        '<div class="drawer-big">' + drawerBig + '</div>' +
        '<div class="drawer-cols">' + drawerCols + '</div>' +
      '</div>' +
    '</div>';

  var navHTML =
    '<div class="nav-shell">' +
      '<header class="global-nav">' +
        '<div class="global-nav-inner">' +
          '<a href="' + SITE + '" class="brand">Home</a>' +
          '<nav class="desktop-nav">' + linksHTML + '</nav>' +
          '<button class="nav-burger" aria-label="Menu">' +
            '<span></span>' +
            '<span></span>' +
          '</button>' +
        '</div>' +
      '</header>' +
      megaHTML +
    '</div>' +
    '<div class="nav-backdrop"></div>' +
    drawerHTML;

  function inject() {
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    var shell = document.querySelector('.nav-shell');
    var burger = document.querySelector('.nav-burger');
    var dropdown = document.querySelector('.nav-dropdown');
    var backdrop = document.querySelector('.nav-backdrop');
    var drawer = document.querySelector('.mobile-drawer');
    var closeBtn = document.querySelector('.mobile-drawer-close');

    if (burger && dropdown) {
      var closeTimer = null;

      var openDD = function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        dropdown.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-open');
      };

      var closeDD = function () {
        if (closeTimer) { clearTimeout(closeTimer); }
        closeTimer = setTimeout(function () {
          dropdown.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-open');
          closeTimer = null;
        }, 150);
      };

      burger.addEventListener('mouseenter', openDD);
      burger.addEventListener('mouseleave', closeDD);
      dropdown.addEventListener('mouseenter', openDD);
      dropdown.addEventListener('mouseleave', closeDD);

      burger.addEventListener('click', function (e) {
        e.preventDefault();
        var isMobile = window.matchMedia('(max-width: 734px)').matches;

        if (isMobile) {
          if (drawer) {
            drawer.classList.add('is-open');
            document.body.style.overflow = 'hidden';
          }
        } else {
          if (dropdown.classList.contains('is-open')) {
            closeDD();
          } else {
            openDD();
          }
        }
      });

      document.addEventListener('click', function (e) {
        if (!shell.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-open');
        }
      });
    }

    if (drawer) {
      var closeDrawer = function () {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      };

      if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
      }

      drawer.addEventListener('click', function (e) {
        if (e.target === drawer) {
          closeDrawer();
        }
      });

      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeDrawer);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();