/* reveal.js — fade-in-up on scroll, Apple style */

(function () {
  var REVEAL_CLASS = "reveal";
  var VISIBLE_CLASS = "is-visible";

  // Elements to animate
  var SELECTORS = [
    ".section-header",
    ".project",
    ".stack-grid",
    ".detail-hero",
    ".detail-body > *",
    ".download-row"
  ];

  function init() {
    // Respect reduced motion
    var prefersReduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    var elements = document.querySelectorAll(SELECTORS.join(","));
    if (!elements.length) return;

    // Mark initial state
    elements.forEach(function (el) {
      el.classList.add(REVEAL_CLASS);
    });

    // IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything
      elements.forEach(function (el) {
        el.classList.add(VISIBLE_CLASS);
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();