/* nav.js — glass 版导航（触控适配）
 * 顶栏：Home + Projects + Stack + About + GitHub + 汉堡
 * 桌面：鼠标 hover / 触控 click → 展开下拉
 * 移动端：汉堡 click → 打开抽屉
 * 站点根从当前路径动态推导
 */

(function () {
  var path = window.location.pathname;

  var BETA_MARK = "/glass/";
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
    ],
    drawer: { title: "Menu", close: "Close" }
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
        '<span class="mobile-drawer-title">' + T.drawer.title + '</span>' +
        '<button class="mobile-drawer-close" aria-label="' + T.drawer.close + '">' +
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
          '<button class="nav-burger" aria-label="' + T.drawer.title + '" aria-expanded="false">' +
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

    var isMobile = function () {
      return window.matchMedia('(max-width: 734px)').matches;
    };

    var setExpanded = function (open) {
      if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    /* ---------- 桌面下拉 ---------- */

    if (burger && dropdown) {
      var closeTimer = null;

      var openDD = function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        dropdown.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-open');
        setExpanded(true);
      };

      var closeDD = function (delay) {
        if (closeTimer) { clearTimeout(closeTimer); }
        closeTimer = setTimeout(function () {
          dropdown.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-open');
          setExpanded(false);
          closeTimer = null;
        }, delay == null ? 150 : delay);
      };

      var toggleDD = function () {
        if (dropdown.classList.contains('is-open')) {
          closeDD(0);
        } else {
          openDD();
        }
      };

      /* hover 只在鼠标指针时生效 —— 触屏滚动时不会误触发 */
      var onEnter = function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        if (isMobile()) return;
        openDD();
      };
      var onLeave = function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        if (isMobile()) return;
        closeDD();
      };

      burger.addEventListener('pointerenter', onEnter);
      burger.addEventListener('pointerleave', onLeave);
      dropdown.addEventListener('pointerenter', onEnter);
      dropdown.addEventListener('pointerleave', onLeave);

      /* click：触控 / 键盘 / 鼠标都走这里 */
      burger.addEventListener('click', function (e) {
        e.preventDefault();

        if (isMobile()) {
          if (drawer) {
            drawer.classList.add('is-open');
            document.body.style.overflow = 'hidden';
          }
          return;
        }

        toggleDD();
      });

      /* 键盘 Esc */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeDD(0);
        }
      });

      /* 点外面关闭。pointerdown 触屏也会触发 */
      document.addEventListener('pointerdown', function (e) {
        if (isMobile()) return;
        if (!dropdown.classList.contains('is-open')) return;
        if (shell && shell.contains(e.target)) return;
        if (dropdown.contains(e.target)) return;
        closeDD(0);
      });

      /* 点 backdrop 显式关闭（/glass/ 的 backdrop 是全屏 fixed） */
      if (backdrop) {
        backdrop.addEventListener('click', function () {
          closeDD(0);
        });
      }
    }

    /* ---------- 移动端抽屉 ---------- */

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

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeDrawer();
        }
      });
    }

    /* ---------- 视口切换时复位 ---------- */

    window.addEventListener('resize', function () {
      if (isMobile()) {
        if (dropdown) dropdown.classList.remove('is-open');
        if (backdrop) backdrop.classList.remove('is-open');
        setExpanded(false);
      } else {
        if (drawer) drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();