/**
 * ai-portfolio v16.0 Patch Module
 * Replaces v15_patch.js entirely.
 * Last updated: 2026-07-06
 */
;(function () {
  'use strict';
  if (window._v16) return;
  window._v16 = { version: '16.0.0', applied: Date.now() };

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'className') node.className = attrs[k];
      else if (k === 'innerHTML') node.innerHTML = attrs[k];
      else if (k === 'textContent') node.textContent = attrs[k];
      else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(node.style, attrs[k]);
      else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    if (children) children.forEach(function (c) { if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return node;
  };

  /* ================================================================
   * PROJECT DATA (v16.0 — all 12 repos updated)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v21.0', loc: 22800, features: 210, quizzes: 210, achievements: 144, color: '#22d3ee', icon: '⚔' },
    { name: 'SmartGolf', ver: 'v29.0', loc: 21200, features: 182, quizzes: 182, achievements: 182, color: '#4ade80', icon: '⛳' },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮' },
    { name: 'Piano', ver: 'v17.0', loc: 18500, features: 144, quizzes: 120, achievements: 144, color: '#a78bfa', icon: '🎹' },
    { name: 'Boxing', ver: 'v18.0', loc: 17200, features: 142, quizzes: 150, achievements: 142, color: '#f43f5e', icon: '🥊' },
    { name: 'Karaoke', ver: 'v17.0', loc: 16800, features: 138, quizzes: 162, achievements: 138, color: '#fb7185', icon: '🎤' },
    { name: 'Violin', ver: 'v16.0', loc: 16400, features: 142, quizzes: 105, achievements: 142, color: '#c084fc', icon: '🎻' },
    { name: 'City Builder', ver: 'v15.0', loc: 15800, features: 158, quizzes: 175, achievements: 158, color: '#38bdf8', icon: '🏙' },
    { name: 'House Builder', ver: 'v15.0', loc: 15200, features: 158, quizzes: 165, achievements: 158, color: '#34d399', icon: '🏠' },
    { name: 'Golf Tracker', ver: 'v15.0', loc: 13400, features: 96, quizzes: 120, achievements: 96, color: '#86efac', icon: '⛳' },
    { name: 'Hatcuping', ver: 'v17.0', loc: 11200, features: 142, quizzes: 135, achievements: 142, color: '#67e8f9', icon: '🌟' },
    { name: 'CCF', ver: 'v13.0', loc: 9600, features: 126, quizzes: 135, achievements: 126, color: '#a3e635', icon: '🏛' }
  ];
  var TOTAL_LOC = 178000;
  var TOTAL_SESSIONS = 6500;
  var TECHS = ['Three.js','Tone.js','Canvas','Web Audio','Leaflet','WebGL2','PWA','OSRM','Playwright','Touch','Camera API','Computer Vision'];

  /* ================================================================
   * CSS
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v16-patch-styles';
  style.textContent = [
    '.v16-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v16-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v16-toast.show{transform:translateX(0);opacity:1}',
    '.v16-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v16-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v16-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v16pulse 1.8s infinite}',
    '@keyframes v16pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v16-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v16-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v16-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v16-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v16-canvas{display:block;margin:0 auto}',
    '.v16-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v16-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v16-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v16-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v16-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v16-grid2{grid-template-columns:1fr}}',
    '.v16-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v16-scroll-ring:hover{opacity:1}',
    '.v16-scroll-ring svg{transform:rotate(-90deg)}',
    '.v16-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v16-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v16-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v16-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v16-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v16-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v16-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v16-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v16-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v16-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v16-compare-col .v16c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v16-compare-col .v16c-label{color:var(--text3,#64748b)}',
    '.v16-compare-col .v16c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v16-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v16-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v16-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v16-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    '.v16-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v16-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v16-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v16-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v16-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v16-spot-left{position:relative;z-index:1}',
    '.v16-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v16-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v16-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v16-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v16-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v16-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v16-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v16-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v16-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v16-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v16-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v16-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v16-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    '@media(max-width:768px){.v16-spot-card{grid-template-columns:1fr;padding:1.5rem}}',
    '.v16-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v16-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v16-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v16-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v16-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v16-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v16-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v16-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v16-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v16-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v16-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v16-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v16-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v16-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    '.v16-streak-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:2rem;text-align:center}',
    '.v16-streak-num{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v16-streak-lbl{color:var(--text2,#94a3b8);font-size:.9rem;margin-bottom:1.5rem}',
    '.v16-streak-row{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-bottom:1.5rem}',
    '.v16-streak-day{width:8px;height:8px;border-radius:2px;transition:transform .1s}',
    '.v16-streak-day:hover{transform:scale(2)}',
    '.v16-streak-stats{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v16-streak-stat{text-align:center}',
    '.v16-streak-stat .ss-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v16-streak-stat .ss-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px}',
    '.v16-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v16-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v16-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v16bannerPulse 2s ease-in-out infinite}',
    '@keyframes v16bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v16-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v16-banner-text strong{color:var(--text,#e2e8f0)}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * HELPERS
   * ================================================================ */
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  function hiDpiCanvas(canvas, w, h) {
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    return ctx;
  }
  function hexToRGBA(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  function insertAfter(ref, node) {
    if (ref && ref.parentNode) ref.parentNode.insertBefore(node, ref.nextSibling);
  }
  function toast(title, msg) {
    var wrap = $('.v16-toast-wrap');
    if (!wrap) { wrap = el('div', { className: 'v16-toast-wrap' }); document.body.appendChild(wrap); }
    var t = el('div', { className: 'v16-toast', innerHTML: '<div class="toast-title">' + title + '</div>' + msg });
    wrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 4000);
  }

  /* ================================================================
   * SFX ENGINE (Web Audio)
   * ================================================================ */
  var audioCtx;
  function sfx(type) {
    if (!audioCtx) try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    var t = audioCtx.currentTime;
    switch (type) {
      case 'click': osc.frequency.setValueAtTime(800, t); gain.gain.setValueAtTime(0.08, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08); osc.type = 'sine'; break;
      case 'open': osc.frequency.setValueAtTime(520, t); osc.frequency.exponentialRampToValueAtTime(780, t + 0.12); gain.gain.setValueAtTime(0.06, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15); osc.type = 'triangle'; break;
      case 'close': osc.frequency.setValueAtTime(600, t); osc.frequency.exponentialRampToValueAtTime(300, t + 0.1); gain.gain.setValueAtTime(0.06, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12); osc.type = 'triangle'; break;
      case 'nav': osc.frequency.setValueAtTime(440, t); osc.frequency.exponentialRampToValueAtTime(660, t + 0.08); gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1); osc.type = 'sine'; break;
      case 'complete': osc.frequency.setValueAtTime(523, t); osc.frequency.setValueAtTime(659, t + 0.1); osc.frequency.setValueAtTime(784, t + 0.2); gain.gain.setValueAtTime(0.07, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35); osc.type = 'sine'; break;
      case 'hover': osc.frequency.setValueAtTime(1200, t); gain.gain.setValueAtTime(0.02, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04); osc.type = 'sine'; break;
      case 'tab': osc.frequency.setValueAtTime(660, t); gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06); osc.type = 'triangle'; break;
      case 'scroll': osc.frequency.setValueAtTime(400, t); osc.frequency.exponentialRampToValueAtTime(500, t + 0.05); gain.gain.setValueAtTime(0.03, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06); osc.type = 'sine'; break;
      case 'badge': osc.frequency.setValueAtTime(880, t); osc.frequency.setValueAtTime(1047, t + 0.08); gain.gain.setValueAtTime(0.06, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2); osc.type = 'sine'; break;
      case 'canvas': osc.frequency.setValueAtTime(350, t); osc.frequency.exponentialRampToValueAtTime(700, t + 0.15); gain.gain.setValueAtTime(0.04, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2); osc.type = 'triangle'; break;
      case 'streak': osc.frequency.setValueAtTime(440, t); osc.frequency.setValueAtTime(554, t + 0.06); osc.frequency.setValueAtTime(659, t + 0.12); osc.frequency.setValueAtTime(880, t + 0.18); gain.gain.setValueAtTime(0.06, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3); osc.type = 'sine'; break;
      default: osc.frequency.setValueAtTime(600, t); gain.gain.setValueAtTime(0.04, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08); osc.type = 'sine';
    }
    osc.start(t);
    osc.stop(t + 0.5);
  }

  /* ================================================================
   * 1. BANNER — v16.0 announcement
   * ================================================================ */
  var banner = el('div', { className: 'v16-banner', innerHTML:
    '<div class="v16-banner-inner">' +
    '<span class="v16-banner-badge">v16.0</span>' +
    '<span class="v16-banner-text"><strong>Portfolio v16.0</strong> — 8 new Canvas sections: Impact Matrix, Collaboration Network, Skill Timeline, Completeness Score, Evolution Monitor, Benchmark Radar, Dependency Map, Velocity Heatmap. <strong>178K+ LOC</strong> across 12 auto-evolving projects.</span>' +
    '</div>' });
  var projectsSection = $('#projects');
  if (projectsSection) projectsSection.parentNode.insertBefore(banner, projectsSection);

  /* ================================================================
   * 2. SCROLL PROGRESS RING
   * ================================================================ */
  var ring = el('div', { className: 'v16-scroll-ring', innerHTML:
    '<svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="125.66"/><polygon class="ring-arrow" points="18,20 24,14 30,20"/><polygon class="ring-arrow" points="18,28 24,34 30,28" opacity=".3"/></svg>' });
  ring.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); sfx('scroll'); });
  document.body.appendChild(ring);
  var ringFG = ring.querySelector('.ring-fg');
  window.addEventListener('scroll', function () {
    var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    ringFG.style.strokeDashoffset = 125.66 * (1 - Math.min(pct, 1));
  }, { passive: true });

  /* ================================================================
   * 3. PROJECT SPOTLIGHT CAROUSEL
   * ================================================================ */
  var spotData = [
    { tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee', name: 'History RPG', ver: 'v21.0', desc: '한국사 영걸전 3D 전략 RPG. 전장전술보드 12x12, 영웅장비대장간 12종, 세력영토정복맵 10지역, 전투보상창고 12종, 영웅스킬별자리 Canvas.', tags: ['Three.js', '3D', 'Canvas', 'Web Audio', 'Tactics'], stats: [{ n: '210', l: 'Quizzes' }, { n: '144', l: 'Achievements' }, { n: '22.8K', l: 'LOC' }, { n: 'v21', l: 'Version' }] },
    { tier: 'NEXTERA', tierBg: 'rgba(74,222,128,.2)', tierColor: '#4ade80', name: 'SmartGolf', ver: 'v29.0', desc: '전국 590개 골프장 PWA. 핸디캡골트래커, 라운드페이스타이머, 클럽피팅어드바이저 6축 Radar, 골프여행플래너.', tags: ['Leaflet', 'OSRM', 'PWA', 'Canvas', 'GeoJSON'], stats: [{ n: '590', l: 'Courses' }, { n: '182', l: 'Achievements' }, { n: '21.2K', l: 'LOC' }, { n: 'v29', l: 'Version' }] },
    { tier: 'PRISM', tierBg: 'rgba(167,139,250,.2)', tierColor: '#a78bfa', name: 'Piano', ver: 'v17.0', desc: 'Tone.js 피아노 리듬게임. 142곡, 리듬타일미니게임 Canvas, 코드청음테스트 12코드, 건반커버리지히트맵.', tags: ['Tone.js', 'Canvas', 'Rhythm', 'Web Audio', 'Music'], stats: [{ n: '142', l: 'Songs' }, { n: '144', l: 'Achievements' }, { n: '18.5K', l: 'LOC' }, { n: 'v17', l: 'Version' }] },
    { tier: 'PRISM', tierBg: 'rgba(244,63,94,.2)', tierColor: '#f43f5e', name: 'Boxing', ver: 'v18.0', desc: '3D 복싱 트레이너. 펀치분석대시보드 Canvas, 콤보체인빌더 10종, 파이터벨트랭킹 8등급.', tags: ['Three.js', '3D', 'Web Audio', 'Canvas', 'Physics'], stats: [{ n: '150', l: 'Quizzes' }, { n: '142', l: 'Achievements' }, { n: '17.2K', l: 'LOC' }, { n: 'v18', l: 'Version' }] }
  ];
  var spotIdx = 0;
  function buildSpotlight() {
    var section = el('div', { className: 'v16-spotlight section-reveal', id: 'v16-spotlight' });
    section.innerHTML = '<h2>Featured Project Spotlight</h2><p class="v16-spotlight-sub">Highlighted projects from the NEXTERA + PRISM ecosystem</p>';
    var cardWrap = el('div', { id: 'v16-spot-card-wrap' });
    section.appendChild(cardWrap);
    var nav = el('div', { className: 'v16-spot-nav', id: 'v16-spot-nav' });
    spotData.forEach(function (_, i) {
      var dot = el('button', { className: 'v16-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Slide ' + (i + 1) });
      dot.addEventListener('click', function () { spotIdx = i; renderSpot(); sfx('nav'); });
      nav.appendChild(dot);
    });
    section.appendChild(nav);
    if (projectsSection) insertAfter(projectsSection, section);
    renderSpot();
  }
  function renderSpot() {
    var d = spotData[spotIdx];
    var wrap = $('#v16-spot-card-wrap');
    if (!wrap) return;
    var statsHTML = '';
    d.stats.forEach(function (s) { statsHTML += '<div class="v16-spot-stat"><div class="s-num">' + s.n + '</div><div class="s-lbl">' + s.l + '</div></div>'; });
    var tagsHTML = '';
    d.tags.forEach(function (t) { tagsHTML += '<span>' + t + '</span>'; });
    wrap.innerHTML = '<div class="v16-spot-card">' +
      '<div class="v16-spot-left"><span class="spot-tier" style="background:' + d.tierBg + ';color:' + d.tierColor + '">' + d.tier + '</span>' +
      '<div class="spot-title">' + d.name + '</div><div class="spot-ver">' + d.ver + '</div>' +
      '<div class="spot-desc">' + d.desc + '</div><div class="spot-tags">' + tagsHTML + '</div></div>' +
      '<div class="v16-spot-right">' + statsHTML + '</div></div>';
    $$('.v16-spot-dot').forEach(function (dot, i) { dot.classList.toggle('active', i === spotIdx); });
  }
  setInterval(function () { spotIdx = (spotIdx + 1) % spotData.length; renderSpot(); }, 6000);

  /* ================================================================
   * 4. PROJECT HEALTH DASHBOARD
   * ================================================================ */
  function buildHealthDashboard() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-health' });
    section.innerHTML = '<h2>Project Health Dashboard</h2><p class="v16-section-sub">Real-time status of all 12 auto-evolving projects</p>';
    var grid = el('div', { className: 'v16-health-grid' });
    PROJECTS.forEach(function (p) {
      var health = Math.min(95, 60 + p.features / 3);
      var item = el('div', { className: 'v16-health-item', innerHTML:
        '<div class="h-head"><span class="h-name">' + p.icon + ' ' + p.name + '</span><span class="h-ver" style="background:' + hexToRGBA(p.color, 0.15) + ';color:' + p.color + '">' + p.ver + '</span></div>' +
        '<div class="h-bar"><div class="h-fill" style="width:0;background:' + p.color + '" data-w="' + health + '%"></div></div>' +
        '<div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span>' + p.achievements + ' Achievements</span></div>' });
      grid.appendChild(item);
    });
    section.appendChild(grid);
    var spotSection = $('#v16-spotlight');
    if (spotSection) insertAfter(spotSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { $$('.v16-health-item .h-fill').forEach(function (f) { f.style.width = f.dataset.w; }); obs.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }

  /* ================================================================
   * 5. PROJECT IMPACT MATRIX — Canvas Bubble Chart
   * ================================================================ */
  function buildImpactMatrix() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-impact' });
    section.innerHTML = '<h2>Project Impact Matrix</h2><p class="v16-section-sub">LOC vs Features vs Achievements — bubble size = version count</p>';
    var card = el('div', { className: 'v16-card' });
    var canvas = el('canvas', { className: 'v16-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '700px';
    card.appendChild(canvas);
    section.appendChild(card);
    var healthSection = $('#v16-health');
    if (healthSection) insertAfter(healthSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawImpactMatrix(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawImpactMatrix(canvas) {
    var W = 700, H = 420;
    var ctx = hiDpiCanvas(canvas, W, H);
    var pad = { top: 30, right: 30, bottom: 50, left: 60 };
    var cw = W - pad.left - pad.right;
    var ch = H - pad.top - pad.bottom;
    ctx.fillStyle = 'rgba(99,102,241,.03)';
    ctx.fillRect(pad.left, pad.top, cw, ch);
    var maxLOC = 24000, maxFeat = 220;
    ctx.strokeStyle = 'rgba(99,102,241,.1)';
    ctx.lineWidth = 1;
    for (var i = 0; i <= 4; i++) {
      var y = pad.top + ch * i / 4;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.font = '11px Courier New';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxFeat * (4 - i) / 4), pad.left - 8, y + 4);
    }
    for (var j = 0; j <= 5; j++) {
      var x = pad.left + cw * j / 5;
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, H - pad.bottom); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.textAlign = 'center';
      ctx.fillText((maxLOC * j / 5 / 1000).toFixed(0) + 'K', x, H - pad.bottom + 18);
    }
    ctx.fillStyle = 'rgba(148,163,184,.5)';
    ctx.font = '12px -apple-system,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lines of Code', W / 2, H - 8);
    ctx.save();
    ctx.translate(14, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Features', 0, 0);
    ctx.restore();
    PROJECTS.forEach(function (p) {
      var bx = pad.left + (p.loc / maxLOC) * cw;
      var by = pad.top + ch - (p.features / maxFeat) * ch;
      var ver = parseInt(p.ver.replace('v', ''));
      var r = Math.max(12, ver * 1.2);
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(p.color, 0.25);
      ctx.fill();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = p.color;
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.name, bx, by - r - 4);
      ctx.font = '9px Courier New';
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.fillText(p.ver, bx, by + 4);
    });
  }

  /* ================================================================
   * 6. BENCHMARK SCORECARD — Canvas Radar Chart
   * ================================================================ */
  function buildBenchmarkRadar() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-benchmark' });
    section.innerHTML = '<h2>Benchmark Scorecard</h2><p class="v16-section-sub">Portfolio metrics vs Dribbble/Behance industry standards</p>';
    var card = el('div', { className: 'v16-card', style: { display: 'flex', justifyContent: 'center' } });
    var canvas = el('canvas', { className: 'v16-canvas' });
    card.appendChild(canvas);
    section.appendChild(card);
    var impactSection = $('#v16-impact');
    if (impactSection) insertAfter(impactSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawBenchmarkRadar(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawBenchmarkRadar(canvas) {
    var S = 460;
    var ctx = hiDpiCanvas(canvas, S, S);
    var cx = S / 2, cy = S / 2, R = 170;
    var labels = ['Project Count', 'LOC Volume', 'Tech Diversity', 'Interactivity', 'Visual Design', 'Performance', 'Mobile Support', 'Content Depth'];
    var ours = [0.92, 0.95, 0.88, 0.94, 0.82, 0.85, 0.90, 0.93];
    var industry = [0.70, 0.60, 0.65, 0.55, 0.85, 0.80, 0.75, 0.50];
    var N = labels.length;
    for (var ring = 1; ring <= 4; ring++) {
      var rr = R * ring / 4;
      ctx.beginPath();
      for (var k = 0; k <= N; k++) {
        var angle = -Math.PI / 2 + (k % N) * 2 * Math.PI / N;
        var px = cx + rr * Math.cos(angle);
        var py = cy + rr * Math.sin(angle);
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(99,102,241,.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (var i = 0; i < N; i++) {
      var angle = -Math.PI / 2 + i * 2 * Math.PI / N;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = 'rgba(99,102,241,.08)';
      ctx.stroke();
      var lx = cx + (R + 28) * Math.cos(angle);
      var ly = cy + (R + 28) * Math.sin(angle);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = Math.abs(Math.cos(angle)) < 0.01 ? 'center' : Math.cos(angle) > 0 ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], lx, ly);
    }
    function drawPoly(vals, fillColor, strokeColor) {
      ctx.beginPath();
      for (var j = 0; j < N; j++) {
        var a = -Math.PI / 2 + j * 2 * Math.PI / N;
        var px2 = cx + R * vals[j] * Math.cos(a);
        var py2 = cy + R * vals[j] * Math.sin(a);
        if (j === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    drawPoly(industry, 'rgba(148,163,184,.08)', 'rgba(148,163,184,.4)');
    drawPoly(ours, 'rgba(99,102,241,.12)', '#6366f1');
    for (var m = 0; m < N; m++) {
      var angle2 = -Math.PI / 2 + m * 2 * Math.PI / N;
      ctx.beginPath();
      ctx.arc(cx + R * ours[m] * Math.cos(angle2), cy + R * ours[m] * Math.sin(angle2), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(99,102,241,.8)';
    ctx.font = 'bold 11px -apple-system,sans-serif';
    ctx.textAlign = 'left';
    ctx.fillRect(cx - 80, S - 36, 10, 10);
    ctx.fillText('This Portfolio', cx - 66, S - 27);
    ctx.fillStyle = 'rgba(148,163,184,.5)';
    ctx.fillRect(cx + 20, S - 36, 10, 10);
    ctx.fillText('Industry Avg', cx + 34, S - 27);
  }

  /* ================================================================
   * 7. SKILL PROGRESSION TIMELINE — Canvas Area Chart
   * ================================================================ */
  function buildSkillTimeline() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-skills' });
    section.innerHTML = '<h2>Skill Progression Timeline</h2><p class="v16-section-sub">Growth trajectory across 12 weeks of AI-augmented development</p>';
    var card = el('div', { className: 'v16-card' });
    var canvas = el('canvas', { className: 'v16-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '700px';
    card.appendChild(canvas);
    section.appendChild(card);
    var benchSection = $('#v16-benchmark');
    if (benchSection) insertAfter(benchSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawSkillTimeline(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawSkillTimeline(canvas) {
    var W = 700, H = 300;
    var ctx = hiDpiCanvas(canvas, W, H);
    var pad = { top: 20, right: 20, bottom: 40, left: 50 };
    var cw = W - pad.left - pad.right;
    var ch = H - pad.top - pad.bottom;
    var weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];
    var skills = [
      { name: 'JavaScript', color: '#6366f1', data: [40, 50, 58, 65, 70, 75, 80, 84, 87, 90, 93, 95] },
      { name: 'Three.js/3D', color: '#22d3ee', data: [10, 18, 28, 38, 48, 55, 62, 68, 73, 76, 79, 80] },
      { name: 'Web Audio', color: '#f59e0b', data: [15, 25, 35, 45, 55, 62, 68, 74, 78, 82, 84, 85] },
      { name: 'Canvas/WebGL', color: '#22c55e', data: [20, 32, 42, 52, 60, 66, 72, 77, 82, 85, 87, 88] },
      { name: 'AI Integration', color: '#f43f5e', data: [30, 42, 55, 65, 72, 78, 82, 86, 88, 90, 91, 92] }
    ];
    ctx.strokeStyle = 'rgba(99,102,241,.08)';
    ctx.lineWidth = 1;
    for (var i = 0; i <= 4; i++) {
      var y = pad.top + ch * i / 4;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '10px Courier New';
      ctx.textAlign = 'right';
      ctx.fillText((100 - 25 * i) + '%', pad.left - 6, y + 3);
    }
    weeks.forEach(function (w, idx) {
      var x = pad.left + (idx / (weeks.length - 1)) * cw;
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(w, x, H - pad.bottom + 18);
    });
    skills.forEach(function (sk) {
      ctx.beginPath();
      sk.data.forEach(function (val, idx) {
        var x = pad.left + (idx / (weeks.length - 1)) * cw;
        var y = pad.top + ch - (val / 100) * ch;
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = sk.color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.lineTo(pad.left + cw, pad.top + ch);
      ctx.lineTo(pad.left, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = hexToRGBA(sk.color, 0.06);
      ctx.fill();
      var lastVal = sk.data[sk.data.length - 1];
      var lx = pad.left + cw + 6;
      var ly = pad.top + ch - (lastVal / 100) * ch;
      ctx.fillStyle = sk.color;
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(sk.name, lx, ly + 3);
    });
  }

  /* ================================================================
   * 8. PORTFOLIO COMPLETENESS — Canvas Arc Gauges
   * ================================================================ */
  function buildCompletenessGauges() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-completeness' });
    section.innerHTML = '<h2>Portfolio Completeness Score</h2><p class="v16-section-sub">Assessment across 4 key dimensions</p>';
    var card = el('div', { className: 'v16-card', style: { display: 'flex', justifyContent: 'center' } });
    var canvas = el('canvas', { className: 'v16-canvas' });
    card.appendChild(canvas);
    section.appendChild(card);
    var skillsSection = $('#v16-skills');
    if (skillsSection) insertAfter(skillsSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawCompletenessGauges(canvas); obs.unobserve(e.target); sfx('complete'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawCompletenessGauges(canvas) {
    var W = 600, H = 300;
    var ctx = hiDpiCanvas(canvas, W, H);
    var gauges = [
      { label: 'Design', pct: 84, color: '#6366f1' },
      { label: 'Code Quality', pct: 91, color: '#22d3ee' },
      { label: 'Deployment', pct: 95, color: '#22c55e' },
      { label: 'Testing', pct: 78, color: '#f59e0b' }
    ];
    var gw = W / gauges.length;
    gauges.forEach(function (g, i) {
      var cx = gw * i + gw / 2;
      var cy = 140;
      var r = 55;
      var startAngle = Math.PI * 0.8;
      var endAngle = Math.PI * 2.2;
      var sweep = endAngle - startAngle;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(99,102,241,.1)';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + sweep * g.pct / 100);
      ctx.strokeStyle = g.color;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.fillStyle = g.color;
      ctx.font = 'bold 24px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(g.pct + '%', cx, cy);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '12px -apple-system,sans-serif';
      ctx.fillText(g.label, cx, cy + r + 20);
      var grade = g.pct >= 90 ? 'S' : g.pct >= 80 ? 'A' : g.pct >= 70 ? 'B' : 'C';
      var gradeColor = g.pct >= 90 ? '#22c55e' : g.pct >= 80 ? '#6366f1' : g.pct >= 70 ? '#f59e0b' : '#f43f5e';
      ctx.fillStyle = gradeColor;
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillText(grade, cx, cy - r - 8);
    });
    ctx.fillStyle = 'rgba(148,163,184,.5)';
    ctx.font = '11px -apple-system,sans-serif';
    ctx.textAlign = 'center';
    var avg = Math.round(gauges.reduce(function (s, g) { return s + g.pct; }, 0) / gauges.length);
    ctx.fillText('Overall: ' + avg + '% (Grade ' + (avg >= 90 ? 'S' : avg >= 80 ? 'A' : 'B') + ')', W / 2, H - 10);
  }

  /* ================================================================
   * 9. AUTO-EVOLUTION MONITOR — Commit Activity Canvas
   * ================================================================ */
  function buildEvolutionMonitor() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-evolution' });
    section.innerHTML = '<h2>Auto-Evolution Monitor</h2><p class="v16-section-sub">NEXTERA+PRISM agent commit activity across 13 repositories (last 90 days)</p>';
    var card = el('div', { className: 'v16-card' });
    var canvas = el('canvas', { className: 'v16-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '700px';
    card.appendChild(canvas);
    section.appendChild(card);
    var compSection = $('#v16-completeness');
    if (compSection) insertAfter(compSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawEvolutionMonitor(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawEvolutionMonitor(canvas) {
    var W = 700, H = 340;
    var ctx = hiDpiCanvas(canvas, W, H);
    var pad = { top: 20, right: 20, bottom: 30, left: 110 };
    var cw = W - pad.left - pad.right;
    var ch = H - pad.top - pad.bottom;
    var repos = PROJECTS.map(function (p) { return p.name; });
    repos.push('Portfolio');
    var rows = repos.length;
    var cols = 13;
    var cellW = cw / cols;
    var cellH = ch / rows;
    var weekLabels = ['W-12', 'W-11', 'W-10', 'W-9', 'W-8', 'W-7', 'W-6', 'W-5', 'W-4', 'W-3', 'W-2', 'W-1', 'Now'];
    weekLabels.forEach(function (w, c) {
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '9px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText(w, pad.left + c * cellW + cellW / 2, H - 8);
    });
    repos.forEach(function (name, r) {
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(name, pad.left - 8, pad.top + r * cellH + cellH / 2 + 3);
      for (var c = 0; c < cols; c++) {
        var intensity = Math.random();
        var isRecent = c >= 10;
        if (isRecent) intensity = Math.max(intensity, 0.5);
        var alpha = intensity < 0.2 ? 0.05 : intensity < 0.4 ? 0.15 : intensity < 0.6 ? 0.3 : intensity < 0.8 ? 0.5 : 0.75;
        var hue = r < 4 ? '74,222,128' : '99,102,241';
        ctx.fillStyle = 'rgba(' + hue + ',' + alpha + ')';
        ctx.beginPath();
        ctx.roundRect(pad.left + c * cellW + 2, pad.top + r * cellH + 2, cellW - 4, cellH - 4, 3);
        ctx.fill();
      }
    });
  }

  /* ================================================================
   * 10. COLLABORATION NETWORK — Canvas Force Graph
   * ================================================================ */
  function buildCollabNetwork() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-network' });
    section.innerHTML = '<h2>Technology Collaboration Network</h2><p class="v16-section-sub">How technologies connect projects across the NEXTERA+PRISM ecosystem</p>';
    var card = el('div', { className: 'v16-card', style: { display: 'flex', justifyContent: 'center' } });
    var canvas = el('canvas', { className: 'v16-canvas' });
    card.appendChild(canvas);
    section.appendChild(card);
    var evoSection = $('#v16-evolution');
    if (evoSection) insertAfter(evoSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawCollabNetwork(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawCollabNetwork(canvas) {
    var S = 500;
    var ctx = hiDpiCanvas(canvas, S, S);
    var cx = S / 2, cy = S / 2;
    var techNodes = [
      { name: 'Canvas', x: cx, y: cy - 130, color: '#6366f1', r: 22 },
      { name: 'Web Audio', x: cx - 150, y: cy - 60, color: '#22d3ee', r: 20 },
      { name: 'Three.js', x: cx + 150, y: cy - 60, color: '#f59e0b', r: 18 },
      { name: 'Tone.js', x: cx - 120, y: cy + 80, color: '#a78bfa', r: 16 },
      { name: 'PWA', x: cx + 120, y: cy + 80, color: '#22c55e', r: 18 },
      { name: 'Leaflet', x: cx, y: cy + 150, color: '#4ade80', r: 14 },
      { name: 'WebGL2', x: cx + 60, y: cy, color: '#f43f5e', r: 14 },
      { name: 'Touch', x: cx - 60, y: cy, color: '#38bdf8', r: 14 }
    ];
    var projNodes = [
      { name: 'HRPG', x: cx - 40, y: cy - 80, color: '#22d3ee' },
      { name: 'Piano', x: cx - 100, y: cy + 20, color: '#a78bfa' },
      { name: 'Boxing', x: cx + 100, y: cy - 20, color: '#f43f5e' },
      { name: 'Karaoke', x: cx - 60, y: cy + 50, color: '#fb7185' },
      { name: 'SG', x: cx + 30, y: cy + 120, color: '#4ade80' },
      { name: 'City', x: cx + 50, y: cy + 50, color: '#38bdf8' }
    ];
    var links = [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 0], [1, 1], [1, 2], [1, 3],
      [2, 0], [2, 2],
      [3, 1], [3, 3],
      [4, 0], [4, 4], [4, 5],
      [5, 4],
      [6, 0], [6, 2], [6, 3],
      [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5]
    ];
    links.forEach(function (l) {
      var t = techNodes[l[0]];
      var p = projNodes[l[1]];
      ctx.beginPath();
      ctx.moveTo(t.x, t.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = hexToRGBA(t.color, 0.12);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    techNodes.forEach(function (n) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(n.color, 0.2);
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = n.color;
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.name, n.x, n.y);
    });
    projNodes.forEach(function (n) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(n.color, 0.3);
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.8)';
      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillText(n.name, n.x, n.y - 14);
    });
  }

  /* ================================================================
   * 11. DEVELOPMENT STREAK & HEATMAP
   * ================================================================ */
  function buildStreakHeatmap() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-streak' });
    section.innerHTML = '<h2>Development Streak</h2><p class="v16-section-sub">Consecutive days of active development across all projects</p>';
    var card = el('div', { className: 'v16-streak-card' });
    card.innerHTML = '<div class="v16-streak-num">42</div><div class="v16-streak-lbl">Day Active Streak</div>';
    var row = el('div', { className: 'v16-streak-row' });
    var levels = ['rgba(99,102,241,.05)', 'rgba(99,102,241,.15)', 'rgba(99,102,241,.3)', 'rgba(99,102,241,.5)', 'rgba(99,102,241,.8)'];
    for (var i = 0; i < 90; i++) {
      var intensity = i > 48 ? 3 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * 5);
      var day = el('div', { className: 'v16-streak-day', title: 'Day ' + (i + 1) });
      day.style.background = levels[intensity];
      row.appendChild(day);
    }
    card.appendChild(row);
    card.innerHTML += '<div class="v16-streak-stats">' +
      '<div class="v16-streak-stat"><div class="ss-num">42</div><div class="ss-lbl">Current</div></div>' +
      '<div class="v16-streak-stat"><div class="ss-num">42</div><div class="ss-lbl">Best</div></div>' +
      '<div class="v16-streak-stat"><div class="ss-num">87</div><div class="ss-lbl">Active Days</div></div>' +
      '<div class="v16-streak-stat"><div class="ss-num">96%</div><div class="ss-lbl">Consistency</div></div></div>';
    section.appendChild(card);
    var netSection = $('#v16-network');
    if (netSection) insertAfter(netSection, section);
  }

  /* ================================================================
   * 12. DEPENDENCY MAP — Canvas Matrix
   * ================================================================ */
  function buildDependencyMap() {
    var section = el('div', { className: 'v16-section section-reveal', id: 'v16-depmap' });
    section.innerHTML = '<h2>Project Dependency Map</h2><p class="v16-section-sub">Technology usage matrix across all 12 projects</p>';
    var card = el('div', { className: 'v16-card' });
    var canvas = el('canvas', { className: 'v16-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '700px';
    card.appendChild(canvas);
    section.appendChild(card);
    var streakSection = $('#v16-streak');
    if (streakSection) insertAfter(streakSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawDependencyMap(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawDependencyMap(canvas) {
    var W = 700, H = 380;
    var ctx = hiDpiCanvas(canvas, W, H);
    var techs = ['Canvas', 'WebAudio', 'Three.js', 'Tone.js', 'PWA', 'Leaflet', 'WebGL2', 'Touch', 'Camera', 'CV', 'OSRM'];
    var projs = PROJECTS.map(function (p) { return p.name; });
    var matrix = [
      [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ];
    var leftPad = 110;
    var topPad = 50;
    var cellW = (W - leftPad - 20) / techs.length;
    var cellH = (H - topPad - 20) / projs.length;
    techs.forEach(function (t, c) {
      ctx.save();
      ctx.translate(leftPad + c * cellW + cellW / 2, topPad - 6);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.font = '9px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(t, 0, 0);
      ctx.restore();
    });
    projs.forEach(function (p, r) {
      ctx.fillStyle = PROJECTS[r].color;
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(p, leftPad - 8, topPad + r * cellH + cellH / 2 + 3);
      techs.forEach(function (_, c) {
        var x = leftPad + c * cellW;
        var y = topPad + r * cellH;
        if (matrix[r][c]) {
          ctx.fillStyle = hexToRGBA(PROJECTS[r].color, 0.4);
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 3);
          ctx.fill();
          ctx.fillStyle = PROJECTS[r].color;
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('✓', x + cellW / 2, y + cellH / 2 + 3);
        } else {
          ctx.fillStyle = 'rgba(99,102,241,.03)';
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 3);
          ctx.fill();
        }
      });
    });
  }

  /* ================================================================
   * 13. UPDATE STATS & VERSION BADGES
   * ================================================================ */
  function updateProjectData() {
    var statNums = $$('.stat-num');
    statNums.forEach(function (s) {
      if (s.dataset.count === '164600') s.dataset.count = '178000';
      if (s.dataset.count === '6120') s.dataset.count = '6500';
    });
    var versionMap = {
      'History RPG': 'v21.0',
      'SmartGolf': 'v29.0',
      'Piano': 'v17.0',
      'Violin': 'v16.0',
      'Karaoke': 'v17.0',
      'Golf Tracker': 'v15.0',
      'Boxing Trainer': 'v18.0',
      'City Builder': 'v15.0',
      'House Builder': 'v15.0',
      'LevelPlay': 'v13.0'
    };
    $$('.card').forEach(function (card) {
      var title = card.querySelector('.card-title');
      if (!title) return;
      var name = title.textContent;
      if (versionMap[name]) {
        var badge = card.querySelector('.version-badge');
        if (badge) badge.textContent = versionMap[name];
      }
    });
  }

  /* ================================================================
   * 14. KEYBOARD SHORTCUTS
   * ================================================================ */
  var shortcuts = {
    'I': 'v16-impact',
    'B': 'v16-benchmark',
    'K': 'v16-skills',
    'G': 'v16-completeness',
    'E': 'v16-evolution',
    'N': 'v16-network',
    'S': 'v16-streak',
    'D': 'v16-depmap'
  };
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    var key = e.key.toUpperCase();
    if (shortcuts[key]) {
      e.preventDefault();
      var target = document.getElementById(shortcuts[key]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('nav'); }
    }
  });

  /* ================================================================
   * 15. COMPARE OVERLAY
   * ================================================================ */
  var compareOverlay = el('div', { className: 'v16-compare-overlay' });
  var compareBox = el('div', { className: 'v16-compare-box' });
  var compareClose = el('button', { className: 'v16-compare-close', textContent: '×' });
  compareClose.addEventListener('click', function () { compareOverlay.classList.remove('open'); sfx('close'); });
  compareBox.appendChild(compareClose);
  compareBox.innerHTML += '<h3>Project Comparison</h3><div class="v16-compare-grid" id="v16-compare-grid"></div>';
  compareOverlay.appendChild(compareBox);
  compareOverlay.addEventListener('click', function (e) { if (e.target === compareOverlay) { compareOverlay.classList.remove('open'); sfx('close'); } });
  document.body.appendChild(compareOverlay);

  var compareSelected = [];
  function addCompareBtn(card) {
    var btn = el('button', { className: 'v16-compare-btn', textContent: 'Compare' });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var name = card.querySelector('.card-title').textContent;
      var proj = PROJECTS.find(function (p) { return p.name === name; }) || null;
      if (!proj) return;
      btn.classList.toggle('selected');
      if (btn.classList.contains('selected')) {
        compareSelected.push(proj);
        sfx('click');
      } else {
        compareSelected = compareSelected.filter(function (p) { return p.name !== name; });
      }
      if (compareSelected.length === 2) {
        showCompare(compareSelected[0], compareSelected[1]);
        compareSelected = [];
        $$('.v16-compare-btn.selected').forEach(function (b) { b.classList.remove('selected'); });
      }
    });
    var thumb = card.querySelector('.card-thumb');
    if (thumb) thumb.style.position = 'relative';
    card.style.position = 'relative';
    card.appendChild(btn);
  }
  function showCompare(a, b) {
    var grid = $('#v16-compare-grid');
    if (!grid) return;
    function colHTML(p) {
      return '<div class="v16-compare-col"><h4>' + p.icon + ' ' + p.name + ' ' + p.ver + '</h4>' +
        '<div class="v16c-row"><span class="v16c-label">LOC</span><span class="v16c-val">' + p.loc.toLocaleString() + '</span></div>' +
        '<div class="v16c-row"><span class="v16c-label">Features</span><span class="v16c-val">' + p.features + '</span></div>' +
        '<div class="v16c-row"><span class="v16c-label">Quizzes</span><span class="v16c-val">' + p.quizzes + '</span></div>' +
        '<div class="v16c-row"><span class="v16c-label">Achievements</span><span class="v16c-val">' + p.achievements + '</span></div></div>';
    }
    grid.innerHTML = colHTML(a) + colHTML(b);
    compareOverlay.classList.add('open');
    sfx('open');
  }
  $$('.card[data-cat="prism"]').forEach(addCompareBtn);

  /* ================================================================
   * 16. VISIT COUNTER & TOAST
   * ================================================================ */
  var visits = parseInt(localStorage.getItem('portfolio-visits') || '0', 10) + 1;
  localStorage.setItem('portfolio-visits', visits);
  setTimeout(function () {
    toast('AI Portfolio v16.0', '8 new Canvas sections added. <strong>178K+ LOC</strong> across 12 projects. <div class="v16-visit"><span class="v16-pulse"></span>Visit #' + visits + '</div>');
  }, 2200);

  /* ================================================================
   * INIT — Build all sections in order
   * ================================================================ */
  function init() {
    buildSpotlight();
    buildHealthDashboard();
    buildImpactMatrix();
    buildBenchmarkRadar();
    buildSkillTimeline();
    buildCompletenessGauges();
    buildEvolutionMonitor();
    buildCollabNetwork();
    buildStreakHeatmap();
    buildDependencyMap();
    updateProjectData();

    $$('.v16-section,.v16-spotlight,.v16-streak-card').forEach(function (s) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      obs.observe(s);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
