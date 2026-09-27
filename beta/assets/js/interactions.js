/* interactions.js — 液态玻璃交互特效
 * 1. 光照角度追踪 + 环境借色 + 光标追踪光晕
 * 2. 按压变形（凹陷）
 * 3. 拖动形变（拉伸）
 * 4. 弹性回弹
 * 5. 下拉弹性入场
 */

(function () {
  'use strict';

  var isTouch = window.matchMedia('(hover: none)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  var LIGHT_SELECTOR =
    '.global-nav, .nav-burger, .nav-dropdown, ' +
    '.glass-project, .detail-specs, .download-row, ' +
    '.btn-primary, .btn-secondary, ' +
    '.project-body .links a.glass, .detail-body a.glass, ' +
    '.back-link.glass, .elsewhere-links a.glass';

  var PRESS_SELECTOR =
    '.global-nav, .detail-specs, .download-row, ' +
    '.btn-primary, .btn-secondary, .nav-burger, ' +
    '.project-body .links a.glass, .detail-body a.glass, ' +
    '.back-link.glass, .elsewhere-links a.glass';

  var DRAG_SELECTOR =
    '.global-nav, .glass-project, .detail-specs, .download-row, ' +
    '.btn-primary, .btn-secondary, ' +
    '.project-body .links a.glass, .detail-body a.glass, ' +
    '.back-link.glass, .elsewhere-links a.glass';

  /* 大块玻璃：走「卡片档」拖动幅度 */
  function isLargeGlass(el) {
    return el.classList.contains('glass-project') ||
           el.classList.contains('detail-specs') ||
           el.classList.contains('download-row') ||
           el.classList.contains('global-nav');
  }

  /* 内部有链接/按钮的容器：点它们时跳过 */
  function hasInnerControls(el) {
    return el.classList.contains('global-nav') ||
           el.classList.contains('detail-specs') ||
           el.classList.contains('download-row');
  }

  function disableNativeDrag(el) {
    el.setAttribute('draggable', 'false');
    el.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
  }

  /* ============================================
     1. 光照角度追踪 + 环境借色 + 光晕跟随
     ============================================ */
  function initLight() {
    if (isTouch) return;

    document.querySelectorAll(LIGHT_SELECTOR).forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();

        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        var angle = Math.atan2(y, x) * 180 / Math.PI;
        el.style.setProperty('--wg-light-angle', angle.toFixed(1));

        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', mx + '%');
        el.style.setProperty('--my', my + '%');

        var behind = document.elementFromPoint(e.clientX, e.clientY);
        if (behind && behind !== el && !el.contains(behind)) {
          var bg = getComputedStyle(behind).backgroundColor;
          var match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            el.style.setProperty('--wg-tint', match[0] + ', ' + match[1] + ', ' + match[2]);
          }
        }
      });

      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--wg-light-angle', '-55');
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
      });
    });
  }

  /* ============================================
     2. 按压变形（凹陷）
     ============================================ */
  function initPressDeform() {
    document.querySelectorAll(PRESS_SELECTOR).forEach(function (el) {
      disableNativeDrag(el);

      el.addEventListener('pointerdown', function (e) {
        if (hasInnerControls(el) && e.target.closest('a, button')) {
          return;
        }

        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;

        var dx = (x - 0.5) * 4;
        var dy = (y - 0.5) * 4;

        el.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)';
        el.style.transform =
          'translate(' + dx + 'px, ' + dy + 'px) scale(0.96)';
      });

      el.addEventListener('pointerup', function () {
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = '';
      });

      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ============================================
     3. 拖动形变（拉伸）
     ============================================ */
  function initDragMorph() {
    if (isTouch) return;

    document.querySelectorAll(DRAG_SELECTOR).forEach(function (el) {
      disableNativeDrag(el);

      var isDragging = false;
      var wasDragged = false;
      var startX = 0, startY = 0;
      var isCard = isLargeGlass(el);

      var maxStretch = isCard ? 0.06 : 0.12;
      var follow = isCard ? 0.15 : 0.3;

      el.addEventListener('pointerdown', function (e) {
        if (isCard) {
          if (e.target.closest('a, button')) return;
        } else {
          if (e.target !== el && e.target.closest('a, button') !== el) return;
        }

        isDragging = true;
        wasDragged = false;
        startX = e.clientX;
        startY = e.clientY;
        el.setPointerCapture(e.pointerId);
        el.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        if (isCard) el.style.cursor = 'grabbing';
      });

      el.addEventListener('pointermove', function (e) {
        if (!isDragging) return;

        var dx = e.clientX - startX;
        var dy = e.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          wasDragged = true;
        }

        var scaleX = 1 + Math.min(Math.abs(dx) / 800, maxStretch);
        var scaleY = 1 + Math.min(Math.abs(dy) / 800, maxStretch);

        var stretchAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        var sx = stretchAxis === 'x' ? scaleX : 1 - (scaleX - 1) * 0.4;
        var sy = stretchAxis === 'y' ? scaleY : 1 - (scaleY - 1) * 0.4;

        el.style.transform =
          'translate(' + (dx * follow) + 'px, ' + (dy * follow) + 'px) ' +
          'scale(' + sx + ', ' + sy + ')';
      });

      el.addEventListener('pointerup', function (e) {
        if (!isDragging) return;
        isDragging = false;
        el.releasePointerCapture(e.pointerId);
        el.style.cursor = '';

        el.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = '';
      });

      el.addEventListener('pointercancel', function () {
        isDragging = false;
        wasDragged = false;
        el.style.cursor = '';
        el.style.transform = '';
      });

      el.addEventListener('click', function (e) {
        if (wasDragged) {
          e.preventDefault();
          e.stopPropagation();
          wasDragged = false;
        }
      }, true);
    });
  }

  /* ============================================
     4. 下拉展开弹性
     ============================================ */
  function initDropdown() {
    var dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class') {
          if (dropdown.classList.contains('is-open')) {
            dropdown.style.transition =
              'max-height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), ' +
              'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
          } else {
            dropdown.style.transition =
              'max-height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), ' +
              'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
          }
        }
      });
    });

    observer.observe(dropdown, { attributes: true, attributeFilter: ['class'] });
  }

  function init() {
    initLight();
    initPressDeform();
    initDragMorph();
    initDropdown();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();