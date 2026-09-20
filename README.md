<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Haoran Cao</title>
<style>
  :root {
    --bg: #FFFFFF;
    --bg-alt: #F5F5F7;
    --text: #1D1D1F;
    --secondary: #6E6E73;
    --accent: #0071E3;
    --accent-hover: #0077ED;
    --divider: #D2D2D7;
    --link: #06C;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #000000;
      --bg-alt: #1D1D1F;
      --text: #F5F5F7;
      --secondary: #86868B;
      --accent: #2997FF;
      --accent-hover: #47A9FF;
      --divider: #424245;
      --link: #2997FF;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
                 "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.47059;
    letter-spacing: -0.022em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: var(--link);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* ============================================
     GLOBAL NAV — like apple.com's top bar
     ============================================ */

  .global-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid var(--divider);
  }

  @media (prefers-color-scheme: dark) {
    .global-nav {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  .global-nav-inner {
    max-width: 980px;
    margin: 0 auto;
    padding: 0 22px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .global-nav .brand {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
  }

  .global-nav .brand:hover {
    text-decoration: none;
    opacity: 0.7;
  }

  .global-nav nav {
    display: flex;
    gap: 28px;
  }

  .global-nav nav a {
    font-size: 12px;
    color: var(--text);
    opacity: 0.8;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .global-nav nav a:hover {
    opacity: 1;
    text-decoration: none;
  }

  /* ============================================
     HERO — large statement, like product launches
     ============================================ */

  .hero {
    text-align: center;
    padding: 100px 22px 80px;
    background: var(--bg);
  }

  .hero .eyebrow {
    font-size: 14px;
    font-weight: 500;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .hero h1 {
    font-size: 64px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 18px;
  }

  .hero .subhead {
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0.007em;
    color: var(--secondary);
    margin-bottom: 32px;
  }

  .hero .intro {
    font-size: 17px;
    color: var(--secondary);
    max-width: 560px;
    margin: 0 auto 12px;
  }

  .hero-links {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .hero-links a {
    font-size: 17px;
    color: var(--accent);
    font-weight: 400;
  }

  /* ============================================
     SECTION — modular blocks like apple.com
     ============================================ */

  .section {
    padding: 80px 22px;
    border-top: 1px solid var(--divider);
  }

  .section.alt {
    background: var(--bg-alt);
  }

  .section-inner {
    max-width: 980px;
    margin: 0 auto;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .section-header .eyebrow {
    font-size: 14px;
    font-weight: 500;
    color: var(--accent);
    margin-bottom: 8px;
  }

  .section-header h2 {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.08;
  }

  .section-header .subhead {
    font-size: 21px;
    font-weight: 400;
    color: var(--secondary);
    margin-top: 8px;
    letter-spacing: 0.011em;
  }

  /* ============================================
     PROJECT MODULE — not a card, a content block
     ============================================ */

  .project {
    padding: 40px 0;
    border-top: 1px solid var(--divider);
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 48px;
  }

  .project:first-child {
    border-top: none;
    padding-top: 0;
  }

  .project-meta h3 {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.015em;
    margin-bottom: 8px;
  }

  .project-meta .tagline {
    font-size: 17px;
    color: var(--secondary);
    font-style: italic;
  }

  .project-body p {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text);
    margin-bottom: 16px;
  }

  .project-body .spec {
    font-size: 13px;
    color: var(--secondary);
    margin-bottom: 8px;
  }

  .project-body .spec code {
    font-family: "SF Mono", ui-monospace, Menlo, monospace;
    font-size: 12px;
    background: var(--bg-alt);
    padding: 2px 7px;
    border-radius: 5px;
  }

  .project-body .stack {
    font-size: 13px;
    font-family: "SF Mono", ui-monospace, Menlo, monospace;
    color: var(--secondary);
    margin-bottom: 20px;
    line-height: 1.8;
  }

  .project-body .links {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .project-body .links a {
    font-size: 15px;
    font-weight: 400;
  }

  /* ============================================
     TECH STACK — simple grid of pills
     ============================================ */

  .stack-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .stack-grid span {
    font-size: 14px;
    font-family: "SF Mono", ui-monospace, Menlo, monospace;
    color: var(--text);
    background: var(--bg);
    border: 1px solid var(--divider);
    padding: 8px 16px;
    border-radius: 999px;
  }

  .section.alt .stack-grid span {
    background: var(--bg);
  }

  /* ============================================
     FOOTER
     ============================================ */

  footer {
    background: var(--bg-alt);
    border-top: 1px solid var(--divider);
    padding: 32px 22px;
    text-align: center;
  }

  footer p {
    font-size: 12px;
    color: var(--secondary);
    max-width: 980px;
    margin: 0 auto;
  }

  /* ============================================
     RESPONSIVE
     ============================================ */

  @media (max-width: 734px) {
    .hero {
      padding: 64px 22px 48px;
    }
    .hero h1 {
      font-size: 40px;
    }
    .hero .subhead {
      font-size: 21px;
    }
    .section {
      padding: 56px 22px;
    }
    .section-header h2 {
      font-size: 32px;
    }
    .section-header .subhead {
      font-size: 17px;
    }
    .project {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 32px 0;
    }
    .project-meta h3 {
      font-size: 22px;
    }
    .global-nav nav {
      gap: 18px;
    }
  }
</style>
</head>
<body>

<!-- Global Nav -->
<header class="global-nav">
  <div class="global-nav-inner">
    <a href="#" class="brand">Haoran Cao</a>
    <nav>
      <a href="#projects">Projects</a>
      <a href="#stack">Stack</a>
      <a href="https://github.com/CaoHaoran-Dev">GitHub</a>
    </nav>
  </div>
</header>

<!-- Hero -->
<section class="hero">
  <div class="eyebrow">Student Developer</div>
  <h1>Hi! I'm Haoran Cao</h1>
  <p class="subhead">Swift &amp; SwiftUI for the Mac.</p>
  <p class="intro">I'm a middle school student from Chengdu, Sichuan.</p>
  <p class="intro">I build small Mac tools to learn, one project at a time.</p>
  <p class="intro">Everything here is built with care, for the Mac.</p>
  <div class="hero-links">
    <a href="#projects">See projects ›</a>
  </div>
</section>

<!-- Featured Projects -->
<section class="section" id="projects">
  <div class="section-inner">
    <div class="section-header">
      <div class="eyebrow">Featured</div>
      <h2>Projects.</h2>
      <p class="subhead">Small tools, built with care.</p>
    </div>

    <article class="project">
      <div class="project-meta">
        <h3>Swift Zip Manager</h3>
        <p class="tagline">A native macOS archive manager built with Swift + SwiftUI.</p>
      </div>
      <div class="project-body">
        <p>Handles ZIP, TAR, GZ, 7Z, and RAR with encrypted archive support. Browse contents in List or Grid view, drag files straight from Finder, and extract or delete individual files. One-click install for 7zz and RAR tools, auto-update via GitHub API, multi-language support, and a hidden Developer Mode for experimental workflows.</p>
        <p class="spec"><strong>Current version:</strong> <code>1.0.0-Beta.9</code> · <strong>Status:</strong> In Development</p>
        <p class="stack">Swift 5 · SwiftUI · Process/Pipe · CryptoKit · macOS 13.5+</p>
        <div class="links">
          <a href="https://github.com/CaoHaoran-Dev/Swift-Zip-Manager">View Repository ›</a>
        </div>
      </div>
    </article>

    <article class="project">
      <div class="project-meta">
        <h3>RunProcess</h3>
        <p class="tagline">A Spotlight-style command launcher for macOS.</p>
      </div>
      <div class="project-body">
        <p>A lightweight menu bar app that wraps <code>/bin/zsh</code> in a polished, translucent floating window. Real-time output, Tab completion, command history, drag-and-drop file paths, sudo support with in-memory password handling, and a global hotkey. Three appearance modes — None, Frosted Glass, and Liquid Glass (macOS 26+) — with session mode for persistent shell state.</p>
        <p class="stack">SwiftUI · Process/Pipe · Menu Bar Extra · macOS 12.4+</p>
        <div class="links">
          <a href="https://github.com/CaoHaoran-Dev/RunProcess">View Repository ›</a>
        </div>
      </div>
    </article>

    <article class="project">
      <div class="project-meta">
        <h3>RunProcess Web Demo</h3>
        <p class="tagline">The browser-based recreation of RunProcess — pure frontend, no install.</p>
      </div>
      <div class="project-body">
        <p>Rebuilds the macOS desktop experience in HTML + CSS + JavaScript: menu bar with working dropdowns, draggable windows with functional traffic lights, a Dock, and customizable wallpaper. Simulates 50+ commands with mock output, includes Tab completion, command history via localStorage, and bilingual support.</p>
        <p class="stack">HTML · CSS · JavaScript · localStorage</p>
        <div class="links">
          <a href="https://github.com/CaoHaoran-Dev/RunProcess-WebDemo">View Repository ›</a>
          <a href="https://CaoHaoran-Dev.github.io/RunProcess-WebDemo/">Try Web Demo ›</a>
        </div>
      </div>
    </article>
  </div>
</section>

<!-- Tech Stack -->
<section class="section alt" id="stack">
  <div class="section-inner">
    <div class="section-header">
      <div class="eyebrow">Tools</div>
      <h2>Tech Stack.</h2>
    </div>
    <div class="stack-grid">
      <span>Swift</span>
      <span>SwiftUI</span>
      <span>macOS</span>
      <span>Xcode</span>
      <span>JavaScript</span>
      <span>HTML5</span>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <p>Designed and built for the Mac. Every pixel considered.</p>
</footer>

</body>
</html>