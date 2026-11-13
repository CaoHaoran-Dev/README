/* nav.js — 主站导航，Apple.com 2023 风格
 * 桌面端：导航链接直接显示，仅汉堡按钮悬停打开 mega dropdown
 * 移动端：汉堡点击打开右上角圆角面板
 * 断点统一 834px，与 CSS 一致
 */
(function () {
  var path = window.location.pathname;
  var BASE = /^\/README\//.test(path) ? "/README/" : "/";
  var SITE = BASE;

  function buildHTML(t) {
    var T = {
      nav: {
        projects: t("nav.projects"),
        stack:    t("nav.stack"),
        about:    t("nav.about"),
        github:   t("nav.github")
      },
      brand:   t("nav.brand"),
      eyebrow: t("nav.explore"),
      heading: t("nav.allProjects"),
      big: [
        { label: t("nav.runprocess"), href: SITE + "projects/runprocess.html" },
        { label: t("nav.processSH"),  href: SITE + "projects/processsh.html" },
        { label: t("nav.swiftZip"),   href: SITE + "projects/swift-zip-manager.html" }
      ],
      cols: [
        { title: t("nav.inDev"), links: [
          { label: t("nav.taskview"), href: SITE + "projects/taskview.html" },
          { label: t("nav.remoteLinkKit"), href: SITE + "projects/remotelinkkit.html" }
        ]},
        { title: t("nav.other"), links: [
          { label: t("nav.fucklang"), href: SITE + "projects/fucklang.html" }
        ]},
        { title: t("nav.more"), links: [
          { label: t("nav.allProjectsLink"), href: SITE + "projects/" },
          { label: t("nav.stack"),           href: SITE + "#stack" },
          { label: t("nav.about"),           href: SITE + "about/" }
        ]},
        { title: t("nav.source"), links: [
          { label: t("nav.repoSwiftZip"),   href: "https://github.com/CaoHaoran-Dev/Swift-Zip-Manager" },
          { label: t("nav.repoRunprocess"), href: "https://github.com/CaoHaoran-Dev/RunProcess" },
          { label: t("nav.repoProcessSH"),  href: "https://github.com/CaoHaoran-Dev/ProcessSH" },
          { label: t("nav.repoTaskview"),   href: "https://github.com/CaoHaoran-Dev/TaskView" },
          { label: t("nav.repoRemote"),     href: "https://github.com/CaoHaoran-Dev/RemoteLinkKit" },
          { label: t("nav.repoDemo"),       href: "https://github.com/CaoHaoran-Dev/RunProcess-WebDemo" }
        ]}
      ],
      drawer: { title: t("nav.menu"), close: t("nav.close") }
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

    // 【关键修改】：将 megaHTML 放到 nav-shell 内部
    return '<div class="nav-shell">' +
             '<header class="global-nav">' +
               '<div class="global-nav-inner">' +
                 '<a href="' + SITE + '" class="brand">' + T.brand + '</a>' +
                 '<nav class="desktop-nav">' + linksHTML + '</nav>' +
                 '<button class="nav-burger" aria-label="' + T.drawer.title + '" aria-expanded="false">' +
                   '<span></span><span></span>' +
                 '</button>' +
               '</div>' +
             '</header>' +
             megaHTML + 
           '</div>' +
           '<div class="nav-backdrop"></div>' +
           drawerHTML;
  }

  function bindEvents() {
    var shell = document.querySelector('.nav-shell');
    var burger = document.querySelector('.nav-burger');
    var dropdown = document.querySelector('.nav-dropdown');
    var backdrop = document.querySelector('.nav-backdrop');
    var drawer = document.querySelector('.mobile-drawer');
    var closeBtn = document.querySelector('.mobile-drawer-close');

    var isMobile = function () {
      return window.matchMedia('(max-width: 834px)').matches;
    };

    var setExpanded = function (open) {
      if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    if (burger && dropdown) {
      var closeTimer = null;

      var openDD = function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        dropdown.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-open');
        setExpanded(true);
      };

      var closeDD = function (delay) {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          dropdown.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-open');
          setExpanded(false);
          closeTimer = null;
        }, delay == null ? 150 : delay);
      };

      var toggleDD = function () {
        if (dropdown.classList.contains('is-open')) closeDD(0);
        else openDD();
      };

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

      burger.addEventListener('click', function (e) {
        e.preventDefault();
        if (isMobile()) {
          if (drawer) drawer.classList.add('is-open');
          return;
        }
        toggleDD();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDD(0);
      });

      document.addEventListener('pointerdown', function (e) {
        if (isMobile()) return;
        if (!dropdown.classList.contains('is-open')) return;
        if (shell && shell.contains(e.target)) return;
        if (dropdown.contains(e.target)) return;
        closeDD(0);
      });

      if (backdrop) {
        backdrop.addEventListener('click', function () { closeDD(0); });
      }
    }

    if (drawer) {
      var closeDrawer = function () {
        drawer.classList.remove('is-open');
      };

      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

      drawer.addEventListener('click', function (e) {
        if (e.target === drawer) closeDrawer();
      });

      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeDrawer);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDrawer();
      });
    }

    window.addEventListener('resize', function () {
      if (isMobile()) {
        if (dropdown) dropdown.classList.remove('is-open');
        if (backdrop) backdrop.classList.remove('is-open');
        setExpanded(false);
      } else {
        if (drawer) drawer.classList.remove('is-open');
      }
    }, { passive: true });
  }

  function inject() {
    window.i18n.ready(function (t) {
      document.body.insertAdjacentHTML("afterbegin", buildHTML(t));
      bindEvents();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();