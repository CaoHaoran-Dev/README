/* download.js — 设备检测与复合下载按钮 */
(function () {
  'use strict';

  function getRecommendedDownload() {
    var ua = navigator.userAgent.toLowerCase();
    var platform = navigator.platform.toLowerCase();
    var isMac = platform.indexOf('mac') > -1 || ua.indexOf('mac') > -1;
    var isWin = platform.indexOf('win') > -1 || ua.indexOf('windows') > -1;
    var isLinux = platform.indexOf('linux') > -1 || ua.indexOf('linux') > -1;
    var isArm = ua.indexOf('arm') > -1 || ua.indexOf('aarch64') > -1;

    var base = 'https://github.com/CaoHaoran-Dev/FuckLang/releases/latest/download/';

    if (isMac) {
      return { url: base + 'fucklang-darwin-' + (isArm ? 'arm64' : 'amd64'), label: 'macOS (' + (isArm ? 'Apple Silicon' : 'Intel') + ')' };
    } else if (isWin) {
      return { url: base + 'fucklang-windows-' + (isArm ? 'arm64' : 'amd64') + '.exe', label: 'Windows (' + (isArm ? 'ARM64' : 'x64') + ')' };
    } else if (isLinux) {
      return { url: base + 'fucklang-linux-' + (isArm ? 'arm64' : 'amd64'), label: 'Linux (' + (isArm ? 'ARM64' : 'x86_64') + ')' };
    }
    return null;
  }

  function applyDeviceDetection() {
    var recommended = getRecommendedDownload();

    var mainDlBtn = document.getElementById('fucklang-main-dl');
    if (mainDlBtn) {
      mainDlBtn.href = recommended ? recommended.url : 'https://github.com/CaoHaoran-Dev/FuckLang/releases';
    }

    var detailDlBtn = document.getElementById('fucklang-detail-dl');
    if (detailDlBtn) {
      var span = detailDlBtn.querySelector('span');
      var isZh = window.i18n && window.i18n.lang === 'zh-Hans';
      if (recommended) {
        detailDlBtn.href = recommended.url;
        if (span) span.textContent = (isZh ? '下载 ' : 'Download ') + recommended.label;
      } else {
        detailDlBtn.href = 'https://github.com/CaoHaoran-Dev/FuckLang/releases';
        if (span) span.textContent = isZh ? '前往 Releases' : 'Go to Releases';
      }
    }
  }

  function bindDropdown() {
    var toggleBtn = document.getElementById('fucklang-dropdown-toggle');
    var menu = document.getElementById('fucklang-dropdown-menu');
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      var isOpening = !menu.classList.contains('is-open');
      
      if (isOpening) {
        // 计算按钮的坐标
        var rect = toggleBtn.getBoundingClientRect();
        // 菜单显示在按钮正下方 10px 处
        menu.style.top = (rect.bottom + 10) + 'px';
        // 菜单的右边与按钮的右边对齐
        menu.style.right = (window.innerWidth - rect.right) + 'px';
        menu.style.left = 'auto';
        
        menu.classList.add('is-open');
      } else {
        menu.classList.remove('is-open');
      }
    });

    // 点击外部关闭菜单
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        menu.classList.remove('is-open');
      }
    });

    // 滚动页面时自动关闭菜单，防止菜单悬浮在空处
    window.addEventListener('scroll', function() {
      menu.classList.remove('is-open');
    }, { passive: true });
  }

  function init() {
    if (window.i18n && window.i18n.ready) {
      window.i18n.ready(applyDeviceDetection);
    } else {
      applyDeviceDetection();
    }
    bindDropdown();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();