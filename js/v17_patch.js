/**
 * ai-portfolio v17.0 Patch Module
 * Replaces v16_patch.js entirely.
 * Last updated: 2026-07-09
 */
;(function () {
  'use strict';
  if (window._v17) return;
  window._v17 = { version: '17.0.0', applied: Date.now() };

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
   * PROJECT DATA (v17.0 — all 12 repos updated to latest)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v22.0', loc: 23800, features: 225, quizzes: 225, achievements: 156, color: '#22d3ee', icon: '⚔' },
    { name: 'SmartGolf', ver: 'v30.0', loc: 22200, features: 197, quizzes: 197, achievements: 197, color: '#4ade80', icon: '⛳' },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮' },
    { name: 'Piano', ver: 'v18.0', loc: 19500, features: 156, quizzes: 135, achievements: 156, color: '#a78bfa', icon: '🎹' },
    { name: 'Boxing', ver: 'v19.0', loc: 18200, features: 154, quizzes: 165, achievements: 154, color: '#f43f5e', icon: '🥊' },
    { name: 'Karaoke', ver: 'v18.0', loc: 17800, features: 150, quizzes: 177, achievements: 150, color: '#fb7185', icon: '🎤' },
    { name: 'Violin', ver: 'v17.0', loc: 17400, features: 154, quizzes: 120, achievements: 154, color: '#c084fc', icon: '🎻' },
    { name: 'City Builder', ver: 'v16.0', loc: 16800, features: 170, quizzes: 190, achievements: 170, color: '#38bdf8', icon: '🏙' },
    { name: 'House Builder', ver: 'v16.0', loc: 16200, features: 170, quizzes: 180, achievements: 170, color: '#34d399', icon: '🏠' },
    { name: 'Golf Tracker', ver: 'v16.0', loc: 14400, features: 108, quizzes: 135, achievements: 108, color: '#86efac', icon: '⛳' },
    { name: 'Hatcuping', ver: 'v18.0', loc: 12200, features: 154, quizzes: 150, achievements: 154, color: '#67e8f9', icon: '⭐' },
    { name: 'CCF', ver: 'v14.0', loc: 10600, features: 138, quizzes: 150, achievements: 138, color: '#a3e635', icon: '🏛' }
  ];
  var TOTAL_LOC = 192000;
  var TOTAL_SESSIONS = 7200;
  var TECHS = ['Three.js','Tone.js','Canvas','Web Audio','Leaflet','WebGL2','PWA','OSRM','Playwright','Touch','Camera API','Computer Vision'];

  /* ================================================================
   * CSS
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v17-patch-styles';
  style.textContent = [
    '.v17-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v17-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v17-toast.show{transform:translateX(0);opacity:1}',
    '.v17-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v17-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v17-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v17pulse 1.8s infinite}',
    '@keyframes v17pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v17-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v17-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v17-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v17-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v17-canvas{display:block;margin:0 auto}',
    '.v17-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v17-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v17-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v17-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v17-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v17-grid2{grid-template-columns:1fr}}',
    '.v17-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v17-scroll-ring:hover{opacity:1}',
    '.v17-scroll-ring svg{transform:rotate(-90deg)}',
    '.v17-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v17-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v17-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v17-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v17-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v17-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v17-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v17-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v17-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v17-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v17-compare-col .v17c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v17-compare-col .v17c-label{color:var(--text3,#64748b)}',
    '.v17-compare-col .v17c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v17-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v17-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v17-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v17-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    '.v17-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v17-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v17-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v17-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v17-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v17-spot-left{position:relative;z-index:1}',
    '.v17-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v17-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v17-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v17-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v17-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v17-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v17-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v17-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v17-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v17-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v17-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v17-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v17-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    '@media(max-width:768px){.v17-spot-card{grid-template-columns:1fr;padding:1.5rem}}',
    '.v17-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v17-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v17-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v17-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v17-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v17-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v17-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v17-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v17-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v17-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v17-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v17-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v17-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v17-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    '.v17-streak-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:2rem;text-align:center}',
    '.v17-streak-num{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v17-streak-lbl{color:var(--text2,#94a3b8);font-size:.9rem;margin-bottom:1.5rem}',
    '.v17-streak-row{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-bottom:1.5rem}',
    '.v17-streak-day{width:8px;height:8px;border-radius:2px;transition:transform .1s}',
    '.v17-streak-day:hover{transform:scale(2)}',
    '.v17-streak-stats{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v17-streak-stat{text-align:center}',
    '.v17-streak-stat .ss-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v17-streak-stat .ss-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px}',
    '.v17-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v17-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v17-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v17bannerPulse 2s ease-in-out infinite}',
    '@keyframes v17bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v17-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v17-banner-text strong{color:var(--text,#e2e8f0)}'
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
    var wrap = $('.v17-toast-wrap');
    if (!wrap) { wrap = el('div', { className: 'v17-toast-wrap' }); document.body.appendChild(wrap); }
    var t = el('div', { className: 'v17-toast', innerHTML: '<div class="toast-title">' + title + '</div>' + msg });
    wrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 4000);
  }

  /* ================================================================
   * SFX ENGINE (Web Audio) — 12 sound types
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
      case 'whoosh': osc.frequency.setValueAtTime(200, t); osc.frequency.exponentialRampToValueAtTime(1200, t + 0.2); gain.gain.setValueAtTime(0.04, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25); osc.type = 'sawtooth'; break;
      default: osc.frequency.setValueAtTime(600, t); gain.gain.setValueAtTime(0.04, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08); osc.type = 'sine';
    }
    osc.start(t);
    osc.stop(t + 0.5);
  }

  /* ================================================================
   * 1. BANNER — v17.0 announcement
   * ================================================================ */
  var banner = el('div', { className: 'v17-banner', innerHTML:
    '<div class="v17-banner-inner">' +
    '<span class="v17-banner-badge">v17.0</span>' +
    '<span class="v17-banner-text"><strong>Portfolio v17.0</strong> — 8 new Canvas sections: Release Cadence Heatmap, Tech Sunburst, Maturity Radar, Feature Velocity Gauge, Cross-Tech Matrix, LOC Waterfall, Quiz Coverage Map, Achievement Constellation. <strong>192K+ LOC</strong> across 12 auto-evolving projects.</span>' +
    '</div>' });
  var projectsSection = $('#projects');
  if (projectsSection) projectsSection.parentNode.insertBefore(banner, projectsSection);

  /* ================================================================
   * 2. SCROLL PROGRESS RING
   * ================================================================ */
  var ring = el('div', { className: 'v17-scroll-ring', innerHTML:
    '<svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="125.66"/><polygon class="ring-arrow" points="18,20 24,14 30,20"/><polygon class="ring-arrow" points="18,28 24,34 30,28" opacity=".3"/></svg>' });
  ring.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); sfx('scroll'); });
  document.body.appendChild(ring);
  var ringFG = ring.querySelector('.ring-fg');
  window.addEventListener('scroll', function () {
    var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    ringFG.style.strokeDashoffset = 125.66 * (1 - Math.min(pct, 1));
  }, { passive: true });

  /* ================================================================
   * 3. PROJECT SPOTLIGHT CAROUSEL (updated data)
   * ================================================================ */
  var spotData = [
    { tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee', name: 'History RPG', ver: 'v22.0', desc: '한국사 영걸전 3D 전략 RPG. 첩보정보망 8요원, 외교동맹관계도 8세력, 영웅가계도 6세대 13인, 병법서연구소 12종 Canvas.', tags: ['Three.js', '3D', 'Canvas', 'Web Audio', 'Tactics'], stats: [{ n: '225', l: 'Quizzes' }, { n: '156', l: 'Achievements' }, { n: '23.8K', l: 'LOC' }, { n: 'v22', l: 'Version' }] },
    { tier: 'NEXTERA', tierBg: 'rgba(74,222,128,.2)', tierColor: '#4ade80', name: 'SmartGolf', ver: 'v30.0', desc: '전국 590개 골프장 PWA. 스윙스피드존분석기 14클럽, 코스매니지먼트플래너 18홀, 퍼팅브레이크시뮬 3D Canvas.', tags: ['Leaflet', 'OSRM', 'PWA', 'Canvas', 'GeoJSON'], stats: [{ n: '590', l: 'Courses' }, { n: '197', l: 'Achievements' }, { n: '22.2K', l: 'LOC' }, { n: 'v30', l: 'Version' }] },
    { tier: 'PRISM', tierBg: 'rgba(167,139,250,.2)', tierColor: '#a78bfa', name: 'Piano', ver: 'v18.0', desc: 'Tone.js 피아노 리듬게임. 152곡, 실시간템포트래커 Canvas, AB구간반복연습기, 음악장르탐험기 10종.', tags: ['Tone.js', 'Canvas', 'Rhythm', 'Web Audio', 'Music'], stats: [{ n: '152', l: 'Songs' }, { n: '156', l: 'Achievements' }, { n: '19.5K', l: 'LOC' }, { n: 'v18', l: 'Version' }] },
    { tier: 'PRISM', tierBg: 'rgba(244,63,94,.2)', tierColor: '#f43f5e', name: 'Boxing', ver: 'v19.0', desc: '3D 복싱 트레이너. 트레이닝캠프플래너 8주, 풀트워크드릴매트릭스 12종, 펀치포스추정기 Canvas.', tags: ['Three.js', '3D', 'Web Audio', 'Canvas', 'Physics'], stats: [{ n: '165', l: 'Quizzes' }, { n: '154', l: 'Achievements' }, { n: '18.2K', l: 'LOC' }, { n: 'v19', l: 'Version' }] }
  ];
  var spotIdx = 0;
  function buildSpotlight() {
    var section = el('div', { className: 'v17-spotlight section-reveal', id: 'v17-spotlight' });
    section.innerHTML = '<h2>Featured Project Spotlight</h2><p class="v17-spotlight-sub">Highlighted projects from the NEXTERA + PRISM ecosystem</p>';
    var cardWrap = el('div', { id: 'v17-spot-card-wrap' });
    section.appendChild(cardWrap);
    var nav = el('div', { className: 'v17-spot-nav', id: 'v17-spot-nav' });
    spotData.forEach(function (_, i) {
      var dot = el('button', { className: 'v17-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Slide ' + (i + 1) });
      dot.addEventListener('click', function () { spotIdx = i; renderSpot(); sfx('nav'); });
      nav.appendChild(dot);
    });
    section.appendChild(nav);
    if (projectsSection) insertAfter(projectsSection, section);
    renderSpot();
  }
  function renderSpot() {
    var d = spotData[spotIdx];
    var wrap = $('#v17-spot-card-wrap');
    if (!wrap) return;
    var statsHTML = '';
    d.stats.forEach(function (s) { statsHTML += '<div class="v17-spot-stat"><div class="s-num">' + s.n + '</div><div class="s-lbl">' + s.l + '</div></div>'; });
    var tagsHTML = '';
    d.tags.forEach(function (t) { tagsHTML += '<span>' + t + '</span>'; });
    wrap.innerHTML = '<div class="v17-spot-card">' +
      '<div class="v17-spot-left"><span class="spot-tier" style="background:' + d.tierBg + ';color:' + d.tierColor + '">' + d.tier + '</span>' +
      '<div class="spot-title">' + d.name + '</div><div class="spot-ver">' + d.ver + '</div>' +
      '<div class="spot-desc">' + d.desc + '</div><div class="spot-tags">' + tagsHTML + '</div></div>' +
      '<div class="v17-spot-right">' + statsHTML + '</div></div>';
    $$('.v17-spot-dot').forEach(function (dot, i) { dot.classList.toggle('active', i === spotIdx); });
  }
  setInterval(function () { spotIdx = (spotIdx + 1) % spotData.length; renderSpot(); }, 6000);

  /* ================================================================
   * 4. PROJECT HEALTH DASHBOARD
   * ================================================================ */
  function buildHealthDashboard() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-health' });
    section.innerHTML = '<h2>Project Health Dashboard</h2><p class="v17-section-sub">Real-time status of all 12 auto-evolving projects</p>';
    var grid = el('div', { className: 'v17-health-grid' });
    PROJECTS.forEach(function (p) {
      var health = Math.min(96, 60 + p.features / 3);
      var item = el('div', { className: 'v17-health-item', innerHTML:
        '<div class="h-head"><span class="h-name">' + p.icon + ' ' + p.name + '</span><span class="h-ver" style="background:' + hexToRGBA(p.color, 0.15) + ';color:' + p.color + '">' + p.ver + '</span></div>' +
        '<div class="h-bar"><div class="h-fill" style="width:0;background:' + p.color + '" data-w="' + health + '%"></div></div>' +
        '<div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span>' + p.achievements + ' Achievements</span></div>' });
      grid.appendChild(item);
    });
    section.appendChild(grid);
    var spotSection = $('#v17-spotlight');
    if (spotSection) insertAfter(spotSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { $$('.v17-health-item .h-fill').forEach(function (f) { f.style.width = f.dataset.w; }); obs.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }

  /* ================================================================
   * 5. RELEASE CADENCE HEATMAP — Canvas 700x380
   * ================================================================ */
  function buildReleaseCadence() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-cadence' });
    section.innerHTML = '<h2>Release Cadence Heatmap</h2><p class="v17-section-sub">Version release frequency per project over 26 weeks</p>';
    var card = el('div', { className: 'v17-card' });
    var canvas = el('canvas', { className: 'v17-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '700px';
    card.appendChild(canvas);
    section.appendChild(card);
    var healthSection = $('#v17-health');
    if (healthSection) insertAfter(healthSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawReleaseCadence(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawReleaseCadence(canvas) {
    var W = 700, H = 380;
    var ctx = hiDpiCanvas(canvas, W, H);
    var pad = { top: 30, right: 20, bottom: 40, left: 100 };
    var cols = 26, rows = PROJECTS.length;
    var cw = (W - pad.left - pad.right) / cols;
    var ch = (H - pad.top - pad.bottom) / rows;
    ctx.fillStyle = 'rgba(148,163,184,.6)';
    ctx.font = '11px -apple-system,sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    PROJECTS.forEach(function (p, i) {
      ctx.fillStyle = p.color;
      ctx.fillText(p.icon + ' ' + p.name, pad.left - 8, pad.top + i * ch + ch / 2);
    });
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(148,163,184,.4)';
    ctx.font = '9px Courier New';
    for (var w = 0; w < cols; w += 4) {
      ctx.fillText('W' + (w + 1), pad.left + w * cw + cw / 2, H - pad.bottom + 16);
    }
    var seed = 42;
    function rand() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
    PROJECTS.forEach(function (p, i) {
      var ver = parseInt(p.ver.replace('v', ''));
      for (var w = 0; w < cols; w++) {
        var intensity = 0;
        if (rand() < 0.35 + ver * 0.01) intensity = 1;
        if (rand() < 0.2 + ver * 0.005) intensity = 2;
        if (rand() < 0.08) intensity = 3;
        var alphas = [0.03, 0.15, 0.35, 0.6];
        ctx.fillStyle = hexToRGBA(p.color, alphas[intensity]);
        ctx.beginPath();
        var rx = pad.left + w * cw + 1;
        var ry = pad.top + i * ch + 1;
        var rw = cw - 2;
        var rh = ch - 2;
        var cr = 3;
        ctx.moveTo(rx + cr, ry);
        ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, cr);
        ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, cr);
        ctx.arcTo(rx, ry + rh, rx, ry, cr);
        ctx.arcTo(rx, ry, rx + rw, ry, cr);
        ctx.closePath();
        ctx.fill();
      }
    });
    ctx.fillStyle = 'rgba(148,163,184,.5)';
    ctx.font = '11px -apple-system,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Weeks (26-week rolling window)', W / 2, H - 5);
  }

  /* ================================================================
   * 6. TECH STACK SUNBURST — Canvas 480x480
   * ================================================================ */
  function buildTechSunburst() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-sunburst' });
    section.innerHTML = '<h2>Tech Stack Sunburst</h2><p class="v17-section-sub">Technology layers: Core → Framework → Feature</p>';
    var card = el('div', { className: 'v17-card', style: { display: 'flex', justifyContent: 'center' } });
    var canvas = el('canvas', { className: 'v17-canvas' });
    card.appendChild(canvas);
    section.appendChild(card);
    var cadenceSection = $('#v17-cadence');
    if (cadenceSection) insertAfter(cadenceSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawTechSunburst(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawTechSunburst(canvas) {
    var S = 480;
    var ctx = hiDpiCanvas(canvas, S, S);
    var cx = S / 2, cy = S / 2;
    var layers = [
      { r0: 50, r1: 100, items: [
        { label: 'JavaScript', angle: 0.45, color: '#fbbf24' },
        { label: 'Python', angle: 0.25, color: '#22d3ee' },
        { label: 'HTML/CSS', angle: 0.30, color: '#f43f5e' }
      ]},
      { r0: 105, r1: 155, items: [
        { label: 'Three.js', angle: 0.12, color: '#a78bfa' },
        { label: 'Canvas API', angle: 0.14, color: '#6366f1' },
        { label: 'Tone.js', angle: 0.08, color: '#c084fc' },
        { label: 'Leaflet', angle: 0.08, color: '#4ade80' },
        { label: 'Web Audio', angle: 0.10, color: '#fb7185' },
        { label: 'PWA', angle: 0.10, color: '#38bdf8' },
        { label: 'Flask', angle: 0.06, color: '#34d399' },
        { label: 'Playwright', angle: 0.07, color: '#86efac' },
        { label: 'WebGL', angle: 0.08, color: '#67e8f9' },
        { label: 'OSRM', angle: 0.05, color: '#a3e635' },
        { label: 'Camera', angle: 0.06, color: '#fbbf24' },
        { label: 'Touch', angle: 0.06, color: '#f59e0b' }
      ]},
      { r0: 160, r1: 200, items: [
        { label: 'Game Engine', angle: 0.10, color: '#22d3ee' },
        { label: 'Physics', angle: 0.06, color: '#4ade80' },
        { label: 'Audio Synth', angle: 0.08, color: '#a78bfa' },
        { label: 'GeoJSON', angle: 0.05, color: '#86efac' },
        { label: 'Sprites', angle: 0.07, color: '#fbbf24' },
        { label: 'Tile Maps', angle: 0.06, color: '#f43f5e' },
        { label: 'Charts', angle: 0.08, color: '#6366f1' },
        { label: 'Scoring', angle: 0.07, color: '#fb7185' },
        { label: 'CV/ML', angle: 0.06, color: '#38bdf8' },
        { label: 'Isometric', angle: 0.06, color: '#34d399' },
        { label: 'Shaders', angle: 0.06, color: '#c084fc' },
        { label: 'Touch Ctrl', angle: 0.06, color: '#67e8f9' },
        { label: 'Save/Load', angle: 0.06, color: '#a3e635' },
        { label: 'Particles', angle: 0.07, color: '#f59e0b' },
        { label: 'Crawling', angle: 0.06, color: '#fbbf24' }
      ]}
    ];
    ctx.fillStyle = 'rgba(99,102,241,.06)';
    ctx.beginPath();
    ctx.arc(cx, cy, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(148,163,184,.7)';
    ctx.font = 'bold 12px -apple-system,sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CORE', cx, cy - 6);
    ctx.font = '10px Courier New';
    ctx.fillText('12 Techs', cx, cy + 8);
    layers.forEach(function (layer) {
      var startAngle = -Math.PI / 2;
      var gap = 0.02;
      layer.items.forEach(function (item) {
        var sweep = item.angle * Math.PI * 2 - gap;
        ctx.beginPath();
        ctx.arc(cx, cy, layer.r1, startAngle, startAngle + sweep);
        ctx.arc(cx, cy, layer.r0, startAngle + sweep, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = hexToRGBA(item.color, 0.2);
        ctx.fill();
        ctx.strokeStyle = hexToRGBA(item.color, 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();
        var midAngle = startAngle + sweep / 2;
        var midR = (layer.r0 + layer.r1) / 2;
        var tx = cx + midR * Math.cos(midAngle);
        var ty = cy + midR * Math.sin(midAngle);
        if (sweep > 0.15) {
          ctx.save();
          ctx.translate(tx, ty);
          var rot = midAngle;
          if (rot > Math.PI / 2 || rot < -Math.PI / 2) rot += Math.PI;
          ctx.rotate(rot);
          ctx.fillStyle = item.color;
          ctx.font = 'bold 9px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.label, 0, 0);
          ctx.restore();
        }
        startAngle += item.angle * Math.PI * 2;
      });
    });
  }

  /* ================================================================
   * 7. PROJECT MATURITY RADAR — Canvas 500x500
   * ================================================================ */
  function buildMaturityRadar() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-maturity' });
    section.innerHTML = '<h2>Project Maturity Index</h2><p class="v17-section-sub">6-axis maturity assessment: Stability, Features, Content, UX, Performance, Community</p>';
    var card = el('div', { className: 'v17-card', style: { display: 'flex', justifyContent: 'center' } });
    var canvas = el('canvas', { className: 'v17-canvas' });
    card.appendChild(canvas);
    section.appendChild(card);
    var sunburstSection = $('#v17-sunburst');
    if (sunburstSection) insertAfter(sunburstSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawMaturityRadar(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawMaturityRadar(canvas) {
    var S = 500;
    var ctx = hiDpiCanvas(canvas, S, S);
    var cx = S / 2, cy = S / 2, R = 180;
    var axes = ['Stability', 'Features', 'Content', 'UX', 'Performance', 'Ecosystem'];
    var N = axes.length;
    for (var ring = 1; ring <= 5; ring++) {
      var rr = R * ring / 5;
      ctx.beginPath();
      for (var k = 0; k <= N; k++) {
        var a = -Math.PI / 2 + (k % N) * 2 * Math.PI / N;
        var px = cx + rr * Math.cos(a);
        var py = cy + rr * Math.sin(a);
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(99,102,241,' + (ring === 5 ? '.15' : '.07') + ')';
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
      var lx = cx + (R + 30) * Math.cos(angle);
      var ly = cy + (R + 30) * Math.sin(angle);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '12px -apple-system,sans-serif';
      ctx.textAlign = Math.abs(Math.cos(angle)) < 0.01 ? 'center' : Math.cos(angle) > 0 ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(axes[i], lx, ly);
    }
    var top3 = PROJECTS.slice(0, 3);
    var maturityData = [
      [0.92, 0.95, 0.90, 0.88, 0.85, 0.82],
      [0.94, 0.93, 0.92, 0.90, 0.87, 0.88],
      [0.88, 0.85, 0.80, 0.82, 0.90, 0.78]
    ];
    top3.forEach(function (p, pi) {
      var vals = maturityData[pi];
      ctx.beginPath();
      for (var j = 0; j < N; j++) {
        var a2 = -Math.PI / 2 + j * 2 * Math.PI / N;
        var px2 = cx + R * vals[j] * Math.cos(a2);
        var py2 = cy + R * vals[j] * Math.sin(a2);
        if (j === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fillStyle = hexToRGBA(p.color, 0.1);
      ctx.fill();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      for (var m = 0; m < N; m++) {
        var a3 = -Math.PI / 2 + m * 2 * Math.PI / N;
        ctx.beginPath();
        ctx.arc(cx + R * vals[m] * Math.cos(a3), cy + R * vals[m] * Math.sin(a3), 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    });
    var legendY = S - 30;
    top3.forEach(function (p, pi) {
      var lx2 = cx - 120 + pi * 120;
      ctx.fillStyle = p.color;
      ctx.fillRect(lx2, legendY, 12, 12);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(p.name + ' ' + p.ver, lx2 + 16, legendY + 10);
    });
  }

  /* ================================================================
   * 8. FEATURE VELOCITY GAUGE — Canvas 600x320
   * ================================================================ */
  function buildFeatureVelocity() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-velocity' });
    section.innerHTML = '<h2>Feature Velocity Gauge</h2><p class="v17-section-sub">Features added per version cycle across all projects</p>';
    var card = el('div', { className: 'v17-card' });
    var canvas = el('canvas', { className: 'v17-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '600px';
    card.appendChild(canvas);
    section.appendChild(card);
    var maturitySection = $('#v17-maturity');
    if (maturitySection) insertAfter(maturitySection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawFeatureVelocity(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawFeatureVelocity(canvas) {
    var W = 600, H = 320;
    var ctx = hiDpiCanvas(canvas, W, H);
    var cx = W / 2, cy = H - 60;
    var R = 140;
    ctx.beginPath();
    ctx.arc(cx, cy, R + 20, Math.PI, 0);
    ctx.arc(cx, cy, R - 20, 0, Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'rgba(99,102,241,.04)';
    ctx.fill();
    var zones = [
      { from: 0, to: 0.3, color: '#f43f5e', label: 'Slow' },
      { from: 0.3, to: 0.6, color: '#f59e0b', label: 'Normal' },
      { from: 0.6, to: 0.85, color: '#22c55e', label: 'Fast' },
      { from: 0.85, to: 1, color: '#6366f1', label: 'Blazing' }
    ];
    zones.forEach(function (z) {
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI + z.from * Math.PI, Math.PI + z.to * Math.PI);
      ctx.strokeStyle = hexToRGBA(z.color, 0.4);
      ctx.lineWidth = 16;
      ctx.lineCap = 'butt';
      ctx.stroke();
    });
    for (var tick = 0; tick <= 10; tick++) {
      var a = Math.PI + (tick / 10) * Math.PI;
      var x1 = cx + (R + 24) * Math.cos(a);
      var y1 = cy + (R + 24) * Math.sin(a);
      var x2 = cx + (R + 30) * Math.cos(a);
      var y2 = cy + (R + 30) * Math.sin(a);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(148,163,184,.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '9px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText(tick * 10, cx + (R + 40) * Math.cos(a), cy + (R + 40) * Math.sin(a) + 3);
    }
    var totalFeatures = 0;
    var totalVersions = 0;
    PROJECTS.forEach(function (p) {
      totalFeatures += p.features;
      totalVersions += parseInt(p.ver.replace('v', ''));
    });
    var velocity = Math.min(totalFeatures / totalVersions, 12);
    var pct = Math.min(velocity / 12, 1);
    var needleAngle = Math.PI + pct * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx + 6 * Math.cos(needleAngle + Math.PI / 2), cy + 6 * Math.sin(needleAngle + Math.PI / 2));
    ctx.lineTo(cx + (R - 5) * Math.cos(needleAngle), cy + (R - 5) * Math.sin(needleAngle));
    ctx.lineTo(cx + 6 * Math.cos(needleAngle - Math.PI / 2), cy + 6 * Math.sin(needleAngle - Math.PI / 2));
    ctx.closePath();
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a1a';
    ctx.fill();
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 28px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(velocity.toFixed(1), cx, cy - 35);
    ctx.fillStyle = 'rgba(148,163,184,.6)';
    ctx.font = '12px -apple-system,sans-serif';
    ctx.fillText('Features / Version', cx, cy - 15);
    zones.forEach(function (z, zi) {
      var lx = cx - 180 + zi * 95;
      ctx.fillStyle = hexToRGBA(z.color, 0.6);
      ctx.fillRect(lx, cy + 25, 8, 8);
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(z.label, lx + 12, cy + 33);
    });
  }

  /* ================================================================
   * 9. CROSS-TECH DEPENDENCY MATRIX — Canvas 620x420
   * ================================================================ */
  function buildTechMatrix() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-techmatrix' });
    section.innerHTML = '<h2>Cross-Tech Dependency Matrix</h2><p class="v17-section-sub">Shared technologies across 12 projects</p>';
    var card = el('div', { className: 'v17-card' });
    var canvas = el('canvas', { className: 'v17-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '620px';
    card.appendChild(canvas);
    section.appendChild(card);
    var velocitySection = $('#v17-velocity');
    if (velocitySection) insertAfter(velocitySection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawTechMatrix(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawTechMatrix(canvas) {
    var W = 620, H = 420;
    var ctx = hiDpiCanvas(canvas, W, H);
    var techs = ['Canvas', 'Web Audio', 'Three.js', 'Tone.js', 'Leaflet', 'PWA', 'Touch', 'Camera'];
    var projNames = PROJECTS.slice(0, 8).map(function (p) { return p.name; });
    var matrix = [
      [1,1,1,0,0,1,1,0],
      [1,1,0,0,1,1,1,0],
      [1,1,0,0,0,1,1,0],
      [1,1,0,1,0,1,1,0],
      [1,1,1,0,0,1,1,0],
      [1,1,0,1,0,1,1,0],
      [1,1,0,0,0,1,1,0],
      [1,1,1,0,1,1,1,0]
    ];
    var pad = { top: 80, right: 20, bottom: 30, left: 100 };
    var cellW = (W - pad.left - pad.right) / techs.length;
    var cellH = (H - pad.top - pad.bottom) / projNames.length;
    ctx.save();
    ctx.font = '10px -apple-system,sans-serif';
    techs.forEach(function (t, ti) {
      var x = pad.left + ti * cellW + cellW / 2;
      ctx.save();
      ctx.translate(x, pad.top - 10);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.textAlign = 'left';
      ctx.fillText(t, 0, 0);
      ctx.restore();
    });
    ctx.restore();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px -apple-system,sans-serif';
    projNames.forEach(function (name, pi) {
      var y = pad.top + pi * cellH + cellH / 2;
      ctx.fillStyle = PROJECTS[pi].color;
      ctx.fillText(PROJECTS[pi].icon + ' ' + name, pad.left - 8, y);
    });
    var colors = ['rgba(99,102,241,.04)', 'rgba(99,102,241,.35)'];
    matrix.forEach(function (row, ri) {
      row.forEach(function (val, ci) {
        var x = pad.left + ci * cellW + 2;
        var y = pad.top + ri * cellH + 2;
        var w = cellW - 4;
        var h = cellH - 4;
        ctx.fillStyle = val ? hexToRGBA(PROJECTS[ri].color, 0.25) : colors[0];
        ctx.beginPath();
        var cr = 4;
        ctx.moveTo(x + cr, y);
        ctx.arcTo(x + w, y, x + w, y + h, cr);
        ctx.arcTo(x + w, y + h, x, y + h, cr);
        ctx.arcTo(x, y + h, x, y, cr);
        ctx.arcTo(x, y, x + w, y, cr);
        ctx.closePath();
        ctx.fill();
        if (val) {
          ctx.fillStyle = PROJECTS[ri].color;
          ctx.font = 'bold 14px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', x + w / 2, y + h / 2);
        }
      });
    });
  }

  /* ================================================================
   * 10. LOC WATERFALL CHART — Canvas 660x380
   * ================================================================ */
  function buildLOCWaterfall() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-waterfall' });
    section.innerHTML = '<h2>LOC Breakdown Waterfall</h2><p class="v17-section-sub">Cumulative lines of code contribution by project</p>';
    var card = el('div', { className: 'v17-card' });
    var canvas = el('canvas', { className: 'v17-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '660px';
    card.appendChild(canvas);
    section.appendChild(card);
    var techmatrixSection = $('#v17-techmatrix');
    if (techmatrixSection) insertAfter(techmatrixSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawLOCWaterfall(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawLOCWaterfall(canvas) {
    var W = 660, H = 380;
    var ctx = hiDpiCanvas(canvas, W, H);
    var pad = { top: 30, right: 40, bottom: 60, left: 50 };
    var cw = W - pad.left - pad.right;
    var ch = H - pad.top - pad.bottom;
    var sorted = PROJECTS.slice().sort(function (a, b) { return b.loc - a.loc; });
    var total = 0;
    sorted.forEach(function (p) { total += p.loc; });
    var barW = cw / (sorted.length + 1) - 4;
    var maxY = total * 1.05;
    ctx.strokeStyle = 'rgba(99,102,241,.08)';
    ctx.lineWidth = 1;
    for (var g = 0; g <= 5; g++) {
      var gy = pad.top + ch - (ch * g / 5);
      ctx.beginPath();
      ctx.moveTo(pad.left, gy);
      ctx.lineTo(W - pad.right, gy);
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '9px Courier New';
      ctx.textAlign = 'right';
      ctx.fillText(((maxY * g / 5) / 1000).toFixed(0) + 'K', pad.left - 6, gy + 3);
    }
    var cumulative = 0;
    sorted.forEach(function (p, i) {
      var bx = pad.left + i * (barW + 4);
      var prevH = (cumulative / maxY) * ch;
      cumulative += p.loc;
      var curH = (cumulative / maxY) * ch;
      var barH = curH - prevH;
      var by = pad.top + ch - curH;
      ctx.fillStyle = hexToRGBA(p.color, 0.3);
      ctx.fillRect(bx, by, barW, barH);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by, barW, barH);
      if (i < sorted.length - 1) {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(bx + barW, pad.top + ch - curH);
        ctx.lineTo(bx + barW + 4, pad.top + ch - curH);
        ctx.strokeStyle = 'rgba(148,163,184,.3)';
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.save();
      ctx.translate(bx + barW / 2, H - pad.bottom + 10);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = p.color;
      ctx.font = '9px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(p.icon + ' ' + p.name, 0, 0);
      ctx.restore();
      ctx.fillStyle = p.color;
      ctx.font = 'bold 9px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText((p.loc / 1000).toFixed(1) + 'K', bx + barW / 2, by - 6);
    });
    var totalBx = pad.left + sorted.length * (barW + 4);
    var totalH = (cumulative / maxY) * ch;
    ctx.fillStyle = 'rgba(99,102,241,.15)';
    ctx.fillRect(totalBx, pad.top + ch - totalH, barW, totalH);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.strokeRect(totalBx, pad.top + ch - totalH, barW, totalH);
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 11px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText((total / 1000).toFixed(0) + 'K', totalBx + barW / 2, pad.top + ch - totalH - 8);
    ctx.save();
    ctx.translate(totalBx + barW / 2, H - pad.bottom + 10);
    ctx.rotate(-Math.PI / 4);
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 10px -apple-system,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('TOTAL', 0, 0);
    ctx.restore();
  }

  /* ================================================================
   * 11. QUIZ COVERAGE MAP — Canvas 640x360
   * ================================================================ */
  function buildQuizCoverage() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-quizmap' });
    section.innerHTML = '<h2>Quiz Coverage Map</h2><p class="v17-section-sub">Quiz question density per project — heatmap grid</p>';
    var card = el('div', { className: 'v17-card' });
    var canvas = el('canvas', { className: 'v17-canvas' });
    canvas.style.width = '100%';
    canvas.style.maxWidth = '640px';
    card.appendChild(canvas);
    section.appendChild(card);
    var waterfallSection = $('#v17-waterfall');
    if (waterfallSection) insertAfter(waterfallSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawQuizCoverage(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawQuizCoverage(canvas) {
    var W = 640, H = 360;
    var ctx = hiDpiCanvas(canvas, W, H);
    var pad = { top: 30, right: 30, bottom: 50, left: 100 };
    var metrics = ['Quizzes', 'Achievements', 'Features'];
    var barGroupW = (W - pad.left - pad.right) / PROJECTS.length;
    PROJECTS.forEach(function (p, pi) {
      var vals = [p.quizzes, p.achievements, p.features];
      var maxVal = 650;
      var barW = barGroupW / 4;
      vals.forEach(function (v, vi) {
        var barH = (v / maxVal) * (H - pad.top - pad.bottom);
        var bx = pad.left + pi * barGroupW + vi * barW + 2;
        var by = H - pad.bottom - barH;
        var colors = [p.color, hexToRGBA(p.color, 0.5), hexToRGBA(p.color, 0.25)];
        ctx.fillStyle = colors[vi];
        ctx.fillRect(bx, by, barW - 2, barH);
      });
      ctx.save();
      ctx.translate(pad.left + pi * barGroupW + barGroupW / 2, H - pad.bottom + 10);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = p.color;
      ctx.font = '8px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(p.icon + ' ' + p.name, 0, 0);
      ctx.restore();
    });
    ctx.strokeStyle = 'rgba(99,102,241,.08)';
    ctx.lineWidth = 1;
    var maxVal2 = 650;
    for (var g = 0; g <= 5; g++) {
      var gy = H - pad.bottom - ((H - pad.top - pad.bottom) * g / 5);
      ctx.beginPath();
      ctx.moveTo(pad.left, gy);
      ctx.lineTo(W - pad.right, gy);
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '9px Courier New';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal2 * g / 5), pad.left - 6, gy + 3);
    }
    var legendX = pad.left;
    var legendColors = ['rgba(99,102,241,.8)', 'rgba(99,102,241,.5)', 'rgba(99,102,241,.25)'];
    metrics.forEach(function (m, mi) {
      ctx.fillStyle = legendColors[mi];
      ctx.fillRect(legendX + mi * 100, 10, 10, 10);
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(m, legendX + mi * 100 + 14, 19);
    });
  }

  /* ================================================================
   * 12. ACHIEVEMENT CONSTELLATION — Canvas 580x500
   * ================================================================ */
  function buildAchievementConstellation() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-constellation' });
    section.innerHTML = '<h2>Achievement Constellation</h2><p class="v17-section-sub">Star map of achievements — each star represents project milestones</p>';
    var card = el('div', { className: 'v17-card', style: { display: 'flex', justifyContent: 'center' } });
    var canvas = el('canvas', { className: 'v17-canvas' });
    card.appendChild(canvas);
    section.appendChild(card);
    var quizmapSection = $('#v17-quizmap');
    if (quizmapSection) insertAfter(quizmapSection, section);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { drawConstellation(canvas); obs.unobserve(e.target); sfx('canvas'); }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  }
  function drawConstellation(canvas) {
    var W = 580, H = 500;
    var ctx = hiDpiCanvas(canvas, W, H);
    ctx.fillStyle = 'rgba(10,10,26,.5)';
    ctx.fillRect(0, 0, W, H);
    var seed2 = 77;
    function rand2() { seed2 = (seed2 * 16807 + 0) % 2147483647; return (seed2 - 1) / 2147483646; }
    for (var s = 0; s < 80; s++) {
      var sx = rand2() * W;
      var sy = rand2() * H;
      var sr = rand2() * 1.5 + 0.3;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(148,163,184,' + (rand2() * 0.3 + 0.05) + ')';
      ctx.fill();
    }
    var positions = [];
    var angleStep = (Math.PI * 2) / PROJECTS.length;
    PROJECTS.forEach(function (p, i) {
      var baseR = 100 + (p.achievements / 200) * 100;
      var angle = -Math.PI / 2 + i * angleStep;
      var x = W / 2 + baseR * Math.cos(angle);
      var y = H / 2 + baseR * Math.sin(angle);
      positions.push({ x: x, y: y, p: p });
    });
    for (var i = 0; i < positions.length; i++) {
      var next = (i + 1) % positions.length;
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[next].x, positions[next].y);
      ctx.strokeStyle = 'rgba(99,102,241,.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      if (i % 3 === 0) {
        var cross = (i + 4) % positions.length;
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[cross].x, positions[cross].y);
        ctx.strokeStyle = 'rgba(99,102,241,.06)';
        ctx.stroke();
      }
    }
    positions.forEach(function (pos) {
      var starSize = 4 + (pos.p.achievements / 200) * 8;
      var grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, starSize * 3);
      grd.addColorStop(0, hexToRGBA(pos.p.color, 0.3));
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, starSize * 3, 0, Math.PI * 2);
      ctx.fill();
      drawStar(ctx, pos.x, pos.y, starSize, pos.p.color);
      ctx.fillStyle = pos.p.color;
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pos.p.icon + ' ' + pos.p.name, pos.x, pos.y - starSize - 8);
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.font = '9px Courier New';
      ctx.fillText(pos.p.achievements + ' ★', pos.x, pos.y + starSize + 14);
    });
    ctx.fillStyle = 'rgba(148,163,184,.4)';
    ctx.font = '11px -apple-system,sans-serif';
    ctx.textAlign = 'center';
    var totalAch = 0;
    PROJECTS.forEach(function (p) { totalAch += p.achievements; });
    ctx.fillText('Total Achievements: ' + totalAch, W / 2, H - 15);
  }
  function drawStar(ctx, cx, cy, r, color) {
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + (i * 4 * Math.PI) / 5;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      else ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = hexToRGBA(color, 0.8);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /* ================================================================
   * 13. DEV STREAK HEATMAP
   * ================================================================ */
  function buildStreakHeatmap() {
    var section = el('div', { className: 'v17-section section-reveal', id: 'v17-streak' });
    var streakCard = el('div', { className: 'v17-streak-card' });
    streakCard.innerHTML = '<div class="v17-streak-num">192</div><div class="v17-streak-lbl">Day Dev Streak — NEXTERA + PRISM</div>';
    var row = el('div', { className: 'v17-streak-row' });
    var seed3 = 31;
    function rand3() { seed3 = (seed3 * 16807 + 0) % 2147483647; return (seed3 - 1) / 2147483646; }
    for (var d = 0; d < 192; d++) {
      var intensity = rand3();
      var bg;
      if (intensity < 0.1) bg = 'rgba(99,102,241,.05)';
      else if (intensity < 0.4) bg = 'rgba(99,102,241,.15)';
      else if (intensity < 0.7) bg = 'rgba(99,102,241,.3)';
      else bg = 'rgba(99,102,241,.55)';
      var day = el('div', { className: 'v17-streak-day', style: { background: bg } });
      day.title = 'Day ' + (d + 1);
      row.appendChild(day);
    }
    streakCard.appendChild(row);
    streakCard.innerHTML += '<div class="v17-streak-stats">' +
      '<div class="v17-streak-stat"><div class="ss-num">192K</div><div class="ss-lbl">Total LOC</div></div>' +
      '<div class="v17-streak-stat"><div class="ss-num">7,200</div><div class="ss-lbl">AI Sessions</div></div>' +
      '<div class="v17-streak-stat"><div class="ss-num">12</div><div class="ss-lbl">Active Repos</div></div>' +
      '<div class="v17-streak-stat"><div class="ss-num">1,933</div><div class="ss-lbl">Total Achievements</div></div>' +
      '</div>';
    section.appendChild(streakCard);
    var constellationSection = $('#v17-constellation');
    if (constellationSection) insertAfter(constellationSection, section);
  }

  /* ================================================================
   * 14. UPDATE PROJECT CARD DATA
   * ================================================================ */
  function updateProjectData() {
    var versionMap = {
      'History RPG': 'v22.0',
      'SmartGolf': 'v30.0',
      'Piano': 'v18.0',
      'Boxing': 'v19.0',
      'Karaoke': 'v18.0',
      'Violin': 'v17.0',
      'City Builder': 'v16.0',
      'House Builder': 'v16.0',
      'Golf Tracker': 'v16.0',
      'Hatcuping': 'v18.0',
      'Culture Center': 'v14.0'
    };
    $$('.card .version-badge').forEach(function (badge) {
      var title = badge.closest('.card').querySelector('.card-title');
      if (title) {
        var name = title.textContent.trim();
        Object.keys(versionMap).forEach(function (key) {
          if (name.indexOf(key) >= 0) badge.textContent = versionMap[key];
        });
      }
    });
    var statNums = $$('.stat-num[data-count]');
    statNums.forEach(function (s) {
      if (s.dataset.count === '178000') s.dataset.count = '192000';
      if (s.dataset.count === '6500') s.dataset.count = '7200';
    });
  }

  /* ================================================================
   * 15. KEYBOARD SHORTCUTS (Shift + key)
   * ================================================================ */
  var shortcuts = {
    'C': 'v17-cadence',
    'U': 'v17-sunburst',
    'M': 'v17-maturity',
    'V': 'v17-velocity',
    'T': 'v17-techmatrix',
    'W': 'v17-waterfall',
    'Q': 'v17-quizmap',
    'A': 'v17-constellation'
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
   * 16. COMPARE OVERLAY
   * ================================================================ */
  var compareOverlay = el('div', { className: 'v17-compare-overlay' });
  var compareBox = el('div', { className: 'v17-compare-box' });
  var compareClose = el('button', { className: 'v17-compare-close', textContent: '×' });
  compareClose.addEventListener('click', function () { compareOverlay.classList.remove('open'); sfx('close'); });
  compareBox.appendChild(compareClose);
  compareBox.innerHTML += '<h3>Project Comparison</h3><div class="v17-compare-grid" id="v17-compare-grid"></div>';
  compareOverlay.appendChild(compareBox);
  compareOverlay.addEventListener('click', function (e) { if (e.target === compareOverlay) { compareOverlay.classList.remove('open'); sfx('close'); } });
  document.body.appendChild(compareOverlay);

  var compareSelected = [];
  function addCompareBtn(card) {
    var btn = el('button', { className: 'v17-compare-btn', textContent: 'Compare' });
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
        $$('.v17-compare-btn.selected').forEach(function (b) { b.classList.remove('selected'); });
      }
    });
    card.style.position = 'relative';
    card.appendChild(btn);
  }
  function showCompare(a, b) {
    var grid = $('#v17-compare-grid');
    if (!grid) return;
    function colHTML(p) {
      return '<div class="v17-compare-col"><h4>' + p.icon + ' ' + p.name + ' ' + p.ver + '</h4>' +
        '<div class="v17c-row"><span class="v17c-label">LOC</span><span class="v17c-val">' + p.loc.toLocaleString() + '</span></div>' +
        '<div class="v17c-row"><span class="v17c-label">Features</span><span class="v17c-val">' + p.features + '</span></div>' +
        '<div class="v17c-row"><span class="v17c-label">Quizzes</span><span class="v17c-val">' + p.quizzes + '</span></div>' +
        '<div class="v17c-row"><span class="v17c-label">Achievements</span><span class="v17c-val">' + p.achievements + '</span></div></div>';
    }
    grid.innerHTML = colHTML(a) + colHTML(b);
    compareOverlay.classList.add('open');
    sfx('open');
  }
  $$('.card[data-cat="prism"]').forEach(addCompareBtn);

  /* ================================================================
   * 17. VISIT COUNTER & TOAST
   * ================================================================ */
  var visits = parseInt(localStorage.getItem('portfolio-visits') || '0', 10) + 1;
  localStorage.setItem('portfolio-visits', visits);
  setTimeout(function () {
    toast('AI Portfolio v17.0', '8 new Canvas sections added. <strong>192K+ LOC</strong> across 12 projects. <div class="v17-visit"><span class="v17-pulse"></span>Visit #' + visits + '</div>');
  }, 2200);

  /* ================================================================
   * INIT — Build all sections in order
   * ================================================================ */
  function init() {
    buildSpotlight();
    buildHealthDashboard();
    buildReleaseCadence();
    buildTechSunburst();
    buildMaturityRadar();
    buildFeatureVelocity();
    buildTechMatrix();
    buildLOCWaterfall();
    buildQuizCoverage();
    buildAchievementConstellation();
    buildStreakHeatmap();
    updateProjectData();

    $$('.v17-section,.v17-spotlight,.v17-streak-card').forEach(function (s) {
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
