/* download.js — 设备检测与原生下载选择器 */
(function () {
  'use strict';

  // 1. 设备检测逻辑
  function getRecommendedDownload() {
    var ua = navigator.userAgent.toLowerCase();
    var platform = navigator.platform.toLowerCase();
    
    // 强力拦截移动端设备，避免误识别为 Mac Intel
    var isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || 
                   (platform === 'macintel' && navigator.maxTouchPoints > 1);
    if (isMobile) return null;

    var isMac = platform.indexOf('mac') > -1 || ua.indexOf('mac') > -1;
    var isWin = platform.indexOf('win') > -1 || ua.indexOf('windows') > -1;
    var isLinux = platform.indexOf('linux') > -1 || ua.indexOf('linux') > -1;
    var isArm = ua.indexOf('arm') > -1 || ua.indexOf('aarch64') > -1 || ua.indexOf('apple silicon') > -1;

    var base = 'https://github.com/CaoHaoran-Dev/FuckLang/releases/latest/download/';

    if (isMac) {
      var macArch = isArm || ua.indexOf('intel') === -1 ? 'arm64' : 'amd64';
      return { url: base + 'fucklang-darwin-' + macArch, label: 'macOS (' + (macArch === 'arm64' ? 'Apple Silicon' : 'Intel') + ')' };
    } else if (isWin) {
      return { url: base + 'fucklang-windows-' + (isArm ? 'arm64' : 'amd64') + '.exe', label: 'Windows (' + (isArm ? 'ARM64' : 'x64') + ')' };
    } else if (isLinux) {
      return { url: base + 'fucklang-linux-' + (isArm ? 'arm64' : 'amd64'), label: 'Linux (' + (isArm ? 'ARM64' : 'x86_64') + ')' };
    }
    return null;
  }

  // 2. 应用检测结果到页面
  function applyDeviceDetection() {
    var recommended = getRecommendedDownload();

    // 处理主页的 FuckLang 按钮
    var mainDlBtn = document.getElementById('fucklang-main-dl');
    if (mainDlBtn) {
      if (recommended) {
        mainDlBtn.href = recommended.url;
      } else {
        mainDlBtn.href = 'https://github.com/CaoHaoran-Dev/FuckLang/releases';
      }
    }

    // 处理详情页的主按钮和文字
    var detailDlBtn = document.getElementById('fucklang-detail-dl');
    var detailDlText = document.getElementById('fucklang-dl-text');
    var isZh = window.i18n && window.i18n.lang === 'zh-Hans';

    if (detailDlBtn && detailDlText) {
      if (recommended) {
        detailDlBtn.href = recommended.url;
        detailDlText.textContent = (isZh ? '下载 ' : 'Download ') + recommended.label;
      } else {
        detailDlBtn.href = 'https://github.com/CaoHaoran-Dev/FuckLang/releases';
        detailDlText.textContent = isZh ? '前往 Releases' : 'Go to Releases';
      }
    }
  }

  // 3. 监听详情页下拉框的变化（只换文字和链接，不跳转）
  function bindSelect() {
    var select = document.getElementById('fucklang-select');
    var detailDlBtn = document.getElementById('fucklang-detail-dl');
    var detailDlText = document.getElementById('fucklang-dl-text');
    var isZh = window.i18n && window.i18n.lang === 'zh-Hans';

    if (!select || !detailDlBtn || !detailDlText) return;

    select.addEventListener('change', function (e) {
      var url = e.target.value;
      var selectedText = e.target.options[e.target.selectedIndex].text;
      
      if (url) {
        detailDlBtn.href = url;
        detailDlText.textContent = (isZh ? '下载 ' : 'Download ') + selectedText;
      }
    });
  }

  // 初始化
  function init() {
    if (window.i18n && window.i18n.ready) {
      window.i18n.ready(function () {
        applyDeviceDetection();
        bindSelect();
      });
    } else {
      applyDeviceDetection();
      bindSelect();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();