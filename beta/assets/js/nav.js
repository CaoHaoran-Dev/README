/* nav.js — 全局导航（beta，纯英文）
 * 玻璃效果由 webglass 提供
 * 下拉：桌面 hover 展开，触摸设备点击展开，点击外部收起
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
    '<div class="nav-item has-dropdown">' +
      '<a href="' + SITE + 'projects/"' + (isActive("projects") ? ' class="active"' : '') + '>' + T.nav.projects + '</a>' +
    '</div>' +
    '<a href="' + SITE + '#stack">' + T.nav.stack + '</a>' +
    '<a href="' + SITE + 'about/"' + (isActive("about") ? ' class="active"' : '') + '>' + T.nav.about + '</a>' +
    '<a href="https://github.com/CaoHaoran-Dev" target="_blank" rel="noopener">' + T.nav.github + '</a>';

  var navHTML =
    '<div class="nav-shell">' +
      '<header class="global-nav">' +
        '<div class="global-nav-inner">' +
          '<a href="' + SITE + '" class="brand">Home</a>' +
          '<nav>' + linksHTML + '</nav>' +
        '</div>' +
      '</header>' +
      megaHTML +
      '<div class="nav-backdrop"></div>' +
    '</div>';

  function inject() {
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    var shell = document.querySelector('.nav-shell');
    var item = document.querySelector('.nav-item.has-dropdown');
    var trigger = item ? item.querySelector('a') : null;

    if (shell && item && trigger) {
      var closeTimer = null;

      var open = function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        shell.classList.add('is-open');
      };

      var close = function () {
        if (closeTimer) { clearTimeout(closeTimer); }
        closeTimer = setTimeout(function () {
          shell.classList.remove('is-open');
          closeTimer = null;
        }, 150);
      };

      /* 桌面：hover */
      item.addEventListener('mouseenter', open);
      shell.addEventListener('mouseleave', close);

      /* 键盘可访问性 */
      item.addEventListener('focusin', open);
      item.addEventListener('focusout', close);

      /* 触摸设备：点击切换 */
      trigger.addEventListener('click', function (e) {
        var isTouch = window.matchMedia('(hover: none)').matches;
        if (!isTouch) return;

        if (!shell.classList.contains('is-open')) {
          e.preventDefault();
          open();
        }
      });

      /* 点击外部收起 */
      document.addEventListener('click', function (e) {
        if (!shell.contains(e.target)) {
          shell.classList.remove('is-open');
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();