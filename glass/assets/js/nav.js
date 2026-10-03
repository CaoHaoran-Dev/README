/* nav.js — glass 版导航，i18n 版
 * 站点根：/README/glass/
 * 文案与主站共用 /README/locales/
 */
(function () {
  var path  = window.location.pathname;
  var BASE  = "/README/";
  var GLASS = BASE + "glass/";
  var MAIN  = BASE;

  function buildNav(t) {
    var topLinks =
      '<a href="' + GLASS + 'projects/"' + (path.indexOf("projects") !== -1 ? ' class="active"' : '') + '>' + t("nav.projects") + '</a>' +
      '<a href="' + GLASS + '#stack">' + t("nav.stack") + '</a>' +
      '<a href="' + GLASS + 'about/"' + (path.indexOf("about") !== -1 ? ' class="active"' : '') + '>' + t("nav.about") + '</a>' +
      '<a href="https://github.com/CaoHaoran-Dev" target="_blank" rel="noopener">' + t("nav.github") + '</a>';

    var big = [
      { label: t("nav.swiftZip"),   href: GLASS + "projects/swift-zip-manager.html" },
      { label: t("nav.runprocess"), href: GLASS + "projects/runprocess.html" },
      { label: t("nav.processSH"),  href: GLASS + "projects/processsh.html" }
    ];
    var cols = [
      { title: t("nav.inDev"), links: [
        { label: t("nav.taskview"), href: GLASS + "projects/taskview.html" }
      ]},
      { title: t("nav.more"), links: [
        { label: t("nav.allProjectsLink"), href: GLASS + "projects/" },
        { label: t("nav.stack"),           href: GLASS + "#stack" },
        { label: t("nav.about"),           href: GLASS + "about/" },
        { label: t("footer.backMain"),     href: MAIN }
      ]},
      { title: t("nav.source"), links: [
        { label: t("nav.repoSwiftZip"),   href: "https://github.com/CaoHaoran-Dev/Swift-Zip-Manager" },
        { label: t("nav.repoRunprocess"), href: "https://github.com/CaoHaoran-Dev/RunProcess" },
        { label: t("nav.repoProcessSH"),  href: "https://github.com/CaoHaoran-Dev/ProcessSH" },
        { label: t("nav.repoTaskview"),   href: "https://github.com/CaoHaoran-Dev/TaskView" },
        { label: t("nav.repoDemo"),       href: "https://github.com/CaoHaoran-Dev/RunProcess-WebDemo" }
      ]}
    ];

    var bigHTML = big.map(function (l) {
      return '<a class="mega-item" href="' + l.href + '">' + l.label + '</a>';
    }).join("");

    var colsHTML = cols.map(function (g) {
      var items = g.links.map(function (l) {
        var ext = l.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : '';
        return '<li><a href="' + l.href + '"' + ext + '>' + l.label + '</a></li>';
      }).join("");
      return '<div class="mega-col">' +
               '<div class="mega-col-title">' + g.title + '</div>' +
               '<ul>' + items + '</ul>' +
             '</div>';
    }).join("");

    var dropdownHTML =
      '<div class="nav-dropdown" id="nav-dropdown" role="dialog" aria-modal="true" aria-label="' + t("nav.menu") + '">' +
        '<div class="nav-dropdown-inner">' +
          '<div class="mega-eyebrow">' + t("nav.explore") + '</div>' +
          '<div class="mega-heading">' + t("nav.allProjects") + '</div>' +
          '<div class="mega-grid">' +
            '<div class="mega-big">' + bigHTML + '</div>' +
            '<div class="mega-cols">' + colsHTML + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    return '' +
      '<div class="nav-shell">' +
        '<header class="global-nav">' +
          '<div class="global-nav-inner">' +
            '<a href="' + GLASS + '" class="brand">' + t("nav.brand") + '</a>' +
            '<nav class="desktop-nav">' + topLinks + '</nav>' +
            '<button class="nav-burger" aria-label="' + t("nav.menu") + '" aria-expanded="false" aria-controls="nav-dropdown">' +
              '<span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</header>' +
        dropdownHTML +
      '</div>';
  }

  function buildDrawer(t) {
    var big = [
      { label: t("nav.swiftZip"),   href: GLASS + "projects/swift-zip-manager.html" },
      { label: t("nav.runprocess"), href: GLASS + "projects/runprocess.html" },
      { label: t("nav.processSH"),  href: GLASS + "projects/processsh.html" }
    ];
    var cols = [
      { title: t("nav.inDev"), links: [
        { label: t("nav.taskview"), href: GLASS + "projects/taskview.html" }
      ]},
      { title: t("nav.more"), links: [
        { label: t("nav.allProjectsLink"), href: GLASS + "projects/" },
        { label: t("nav.stack"),           href: GLASS + "#stack" },
        { label: t("nav.about"),           href: GLASS + "about/" },
        { label: t("footer.backMain"),     href: MAIN }
      ]},
      { title: t("nav.source"), links: [
        { label: t("nav.repoSwiftZip"),   href: "https://github.com/CaoHaoran-Dev/Swift-Zip-Manager" },
        { label: t("nav.repoRunprocess"), href: "https://github.com/CaoHaoran-Dev/RunProcess" },
        { label: t("nav.repoProcessSH"),  href: "https://github.com/CaoHaoran-Dev/ProcessSH" },
        { label: t("nav.repoTaskview"),   href: "https://github.com/CaoHaoran-Dev/TaskView" },
        { label: t("nav.repoDemo"),       href: "https://github.com/CaoHaoran-Dev/RunProcess-WebDemo" }
      ]}
    ];

    var bigHTML = big.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + '</a>';
    }).join("");

    var colsHTML = cols.map(function (g) {
      var items = g.links.map(function (l) {
        var ext = l.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : '';
        return '<li><a href="' + l.href + '"' + ext + '>' + l.label + '</a></li>';
      }).join("");
      return '<div class="drawer-group">' +
               '<div class="drawer-group-title">' + g.title + '</div>' +
               '<ul>' + items + '</ul>' +
             '</div>';
    }).join("");

    return '' +
      '<div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="' + t("nav.menu") + '">' +
        '<div class="mobile-drawer-header">' +
          '<span class="mobile-drawer-title">' + t("nav.menu") + '</span>' +
          '<button class="mobile-drawer-close" aria-label="' + t("nav.close") + '">' +
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none">' +
              '<path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
        '<div class="mobile-drawer-body">' +
          '<div class="drawer-big">' + bigHTML + '</div>' +
          '<div class="drawer-cols">' + colsHTML + '</div>' +
        '</div>' +
      '</div>';
  }

  function bindEvents() {
    var burger   = document.querySelector('.nav-burger');
    var dropdown = document.querySelector('.nav-dropdown');
    var backdrop = document.querySelector('.nav-backdrop');
    var drawer   = document.querySelector('.mobile-drawer');
    var closeBtn = document.querySelector('.mobile-drawer-close');

    if (!burger) return;

    var isMobile = function () {
      return window.matchMedia('(max-width: 734px)').matches;
    };

    var setExpanded = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    if (dropdown) {
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
        }, delay == null ? 200 : delay);
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
        if (isMobile()) return;
        toggleDD();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDD(0);
      });

      document.addEventListener('pointerdown', function (e) {
        if (isMobile()) return;
        if (!dropdown.classList.contains('is-open')) return;
        if (burger.contains(e.target)) return;
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
        document.body.style.overflow = '';
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

      burger.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isMobile()) return;
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }

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

  function inject() {
    window.i18n.ready(function (t) {
      document.body.insertAdjacentHTML("afterbegin",
        buildNav(t) +
        '<div class="nav-backdrop"></div>' +
        buildDrawer(t)
      );

      bindEvents();
      document.dispatchEvent(new CustomEvent('nav:ready'));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();