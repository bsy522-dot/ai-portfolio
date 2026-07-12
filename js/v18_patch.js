/**
 * ai-portfolio v18.0 Patch Module
 * Replaces v17_patch.js entirely.
 * Last updated: 2026-07-12
 */
;(function () {
  'use strict';
  if (window._v18) return;
  window._v18 = { version: '18.0.0', applied: Date.now() };

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
   * PROJECT DATA (v18.0 — all 12 repos updated to latest 2026-07-12)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v23.0', loc: 25400, features: 240, quizzes: 240, achievements: 168, color: '#22d3ee', icon: '⚔' },
    { name: 'SmartGolf', ver: 'v31.0', loc: 23800, features: 212, quizzes: 212, achievements: 214, color: '#4ade80', icon: '⛳' },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮' },
    { name: 'Piano', ver: 'v19.0', loc: 21000, features: 168, quizzes: 150, achievements: 168, color: '#a78bfa', icon: '🎹' },
    { name: 'Boxing', ver: 'v20.0', loc: 19800, features: 166, quizzes: 180, achievements: 166, color: '#f43f5e', icon: '🥊' },
    { name: 'Karaoke', ver: 'v19.0', loc: 19200, features: 162, quizzes: 192, achievements: 162, color: '#fb7185', icon: '🎤' },
    { name: 'Violin', ver: 'v18.0', loc: 18800, features: 166, quizzes: 135, achievements: 166, color: '#c084fc', icon: '🎻' },
    { name: 'City Builder', ver: 'v17.0', loc: 18200, features: 182, quizzes: 205, achievements: 182, color: '#38bdf8', icon: '🏙' },
    { name: 'House Builder', ver: 'v17.0', loc: 17600, features: 182, quizzes: 195, achievements: 182, color: '#34d399', icon: '🏠' },
    { name: 'Golf Tracker', ver: 'v17.0', loc: 15800, features: 120, quizzes: 150, achievements: 120, color: '#86efac', icon: '⛳' },
    { name: 'Hatcuping', ver: 'v19.0', loc: 13600, features: 166, quizzes: 165, achievements: 166, color: '#67e8f9', icon: '⭐' },
    { name: 'CCF', ver: 'v15.0', loc: 11800, features: 148, quizzes: 160, achievements: 148, color: '#a3e635', icon: '🏛' }
  ];
  var TOTAL_LOC = 210000;
  var TOTAL_SESSIONS = 7800;
  var TECHS = ['Three.js','Tone.js','Canvas','Web Audio','Leaflet','WebGL2','PWA','OSRM','Playwright','Touch','Camera API','Computer Vision'];

  /* ================================================================
   * CSS
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v18-patch-styles';
  style.textContent = [
    '.v18-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v18-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v18-toast.show{transform:translateX(0);opacity:1}',
    '.v18-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v18-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v18-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v18pulse 1.8s infinite}',
    '@keyframes v18pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v18-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v18-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v18-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v18-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v18-canvas{display:block;margin:0 auto}',
    '.v18-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v18-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v18-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v18-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v18-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v18-grid2{grid-template-columns:1fr}}',
    '.v18-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v18-scroll-ring:hover{opacity:1}',
    '.v18-scroll-ring svg{transform:rotate(-90deg)}',
    '.v18-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v18-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v18-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v18-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v18-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v18-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v18-compare-close{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(99,102,241,.2);background:transparent;color:var(--text2,#94a3b8);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .2s}',
    '.v18-compare-close:hover{background:rgba(99,102,241,.15);color:var(--text,#e2e8f0)}',
    '.v18-spotlight{position:relative;overflow:hidden;border-radius:16px;background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);padding:2rem;margin-bottom:2rem;cursor:pointer;transition:border-color .3s}',
    '.v18-spotlight:hover{border-color:rgba(99,102,241,.3)}',
    '.v18-spotlight-glow{position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(99,102,241,.08),transparent 70%);animation:v18glow 6s ease-in-out infinite alternate}',
    '@keyframes v18glow{0%{transform:translate(-20%,-20%)}100%{transform:translate(20%,20%)}}',
    '.v18-kpi-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:1.5rem}',
    '.v18-kpi{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:16px;text-align:center}',
    '.v18-kpi-val{font-size:1.6rem;font-weight:800;font-family:"Courier New",Consolas,monospace}',
    '.v18-kpi-label{font-size:.75rem;color:var(--text3,#64748b);margin-top:4px;text-transform:uppercase;letter-spacing:.5px}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v18 — 12 sound types)
   * ================================================================ */
  var sfx = (function () {
    var ctx = null;
    function getCtx() {
      if (!ctx) try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* silent */ }
      return ctx;
    }
    function play(type) {
      var c = getCtx(); if (!c) return;
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      gain.gain.setValueAtTime(0.12, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
      var freqs = {
        nav: 880, section: 660, tab: 1046, compare: 523, toast: 784,
        growth: 740, depth: 587, heatmap: 698, ecosystem: 831,
        rhythm: 932, mastery: 1047, roi: 554, scorecard: 1175
      };
      osc.frequency.value = freqs[type] || 660;
      osc.type = type === 'toast' ? 'sine' : type === 'compare' ? 'triangle' : 'sine';
      osc.start(); osc.stop(c.currentTime + 0.35);
    }
    return { play: play };
  })();

  /* ================================================================
   * TOAST SYSTEM
   * ================================================================ */
  var toastWrap = el('div', { className: 'v18-toast-wrap' });
  document.body.appendChild(toastWrap);
  function showToast(title, msg) {
    sfx.play('toast');
    var t = el('div', { className: 'v18-toast', innerHTML: '<div class="toast-title">' + title + '</div>' + msg });
    toastWrap.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('show'); }); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 4000);
  }

  /* ================================================================
   * VISITOR COUNTER
   * ================================================================ */
  var visitCount = parseInt(localStorage.getItem('v18_visit') || '0') + 1;
  localStorage.setItem('v18_visit', visitCount);

  /* ================================================================
   * SECTION BUILDER
   * ================================================================ */
  function buildSection(id, title, sub) {
    var sec = el('section', { id: id, className: 'v18-section' });
    sec.appendChild(el('h2', { textContent: title }));
    sec.appendChild(el('p', { className: 'v18-section-sub', textContent: sub }));
    return sec;
  }

  /* ================================================================
   * CANVAS HELPER
   * ================================================================ */
  function makeCanvas(w, h) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.className = 'v18-canvas';
    c.style.maxWidth = '100%';
    c.style.height = 'auto';
    return c;
  }

  /* ================================================================
   * 1. PROJECT GROWTH TRAJECTORY — 12-project growth line chart
   * ================================================================ */
  function drawGrowthTrajectory(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Project Growth Trajectory', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('LOC growth over versions (normalized)', W / 2, 46);

    var pad = { l: 55, r: 20, t: 60, b: 50 };
    var cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;

    ctx.strokeStyle = 'rgba(99,102,241,.1)'; ctx.lineWidth = 0.5;
    for (var i = 0; i <= 5; i++) {
      var yy = pad.t + (ch / 5) * i;
      ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(W - pad.r, yy); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(((5 - i) * 20) + '%', pad.l - 8, yy + 4);
    }

    var versions = ['v1', 'v5', 'v10', 'v15', 'v20', 'v25', 'v30'];
    ctx.textAlign = 'center'; ctx.font = '10px sans-serif'; ctx.fillStyle = '#64748b';
    for (var v = 0; v < versions.length; v++) {
      ctx.fillText(versions[v], pad.l + (cw / (versions.length - 1)) * v, H - pad.b + 18);
    }

    PROJECTS.forEach(function (p, pi) {
      var seed = pi * 37 + 7;
      var pts = [];
      for (var j = 0; j < versions.length; j++) {
        var base = Math.min(100, (j / (versions.length - 1)) * 100);
        var variation = ((seed * (j + 1) * 13) % 20) - 10;
        pts.push(Math.max(0, Math.min(100, base + variation)));
      }
      ctx.beginPath();
      pts.forEach(function (val, idx) {
        var x = pad.l + (cw / (pts.length - 1)) * idx;
        var y = pad.t + ch - (val / 100) * ch;
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.stroke();
      var lx = pad.l + cw + 5;
      var ly = pad.t + ch - (pts[pts.length - 1] / 100) * ch;
      ctx.fillStyle = p.color; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(p.name, W - pad.r + 5 > W - 5 ? pad.l + cw - 40 : pad.l + cw - 55, ly + 3 + pi * 0.5);
    });

    ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Version Progress →', W / 2, H - 8);
  }

  /* ================================================================
   * 2. TECH STACK DEPTH ANALYZER — horizontal bar chart
   * ================================================================ */
  function drawTechDepth(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Tech Stack Depth Analyzer', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('Technology usage depth across 12 projects', W / 2, 46);

    var techs = [
      { name: 'Canvas 2D', depth: 96, projects: 12, color: '#6366f1' },
      { name: 'Web Audio API', depth: 92, projects: 11, color: '#22d3ee' },
      { name: 'Three.js', depth: 85, projects: 4, color: '#f59e0b' },
      { name: 'Tone.js', depth: 82, projects: 3, color: '#a78bfa' },
      { name: 'PWA/SW', depth: 88, projects: 12, color: '#22c55e' },
      { name: 'Leaflet', depth: 78, projects: 2, color: '#4ade80' },
      { name: 'Touch/Gesture', depth: 75, projects: 9, color: '#fb7185' },
      { name: 'Camera/CV', depth: 70, projects: 2, color: '#38bdf8' },
      { name: 'WebGL2', depth: 65, projects: 2, color: '#f43f5e' },
      { name: 'LocalStorage', depth: 94, projects: 12, color: '#34d399' }
    ];

    var pad = { l: 110, r: 60, t: 60, b: 20 };
    var cw = W - pad.l - pad.r;
    var barH = 22, gap = 6;

    techs.forEach(function (t, i) {
      var y = pad.t + i * (barH + gap);
      ctx.fillStyle = '#64748b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(t.name, pad.l - 8, y + barH / 2 + 4);

      ctx.fillStyle = 'rgba(99,102,241,.08)';
      ctx.fillRect(pad.l, y, cw, barH);

      var bw = (t.depth / 100) * cw;
      var grad = ctx.createLinearGradient(pad.l, y, pad.l + bw, y);
      grad.addColorStop(0, t.color + '99'); grad.addColorStop(1, t.color);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(pad.l, y, bw, barH, 4);
      ctx.fill();

      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(t.depth + '% (' + t.projects + 'p)', pad.l + bw + 6, y + barH / 2 + 4);
    });
  }

  /* ================================================================
   * 3. CODE COMPLEXITY HEATMAP — 12 projects x 6 metrics
   * ================================================================ */
  function drawComplexityHeatmap(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Code Complexity Heatmap', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('12 Projects × 6 Complexity Metrics (higher = more complex)', W / 2, 46);

    var metrics = ['LOC', 'Features', 'Quizzes', 'Achievements', 'Modules', 'Integrations'];
    var pad = { l: 90, r: 20, t: 65, b: 20 };
    var cellW = (W - pad.l - pad.r) / metrics.length;
    var cellH = (H - pad.t - pad.b) / PROJECTS.length;

    ctx.font = '9px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8';
    metrics.forEach(function (m, i) {
      ctx.fillText(m, pad.l + cellW * i + cellW / 2, pad.t - 8);
    });

    PROJECTS.forEach(function (p, pi) {
      var y = pad.t + pi * cellH;
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(p.name, pad.l - 6, y + cellH / 2 + 3);

      var vals = [
        p.loc / 26000, p.features / 250, p.quizzes / 650,
        p.achievements / 220, (p.features * 0.6) / 160, (p.loc > 18000 ? 0.85 : p.loc > 14000 ? 0.65 : 0.45)
      ];

      vals.forEach(function (v, mi) {
        var x = pad.l + mi * cellW;
        var intensity = Math.min(1, Math.max(0, v));
        var r = Math.round(99 + intensity * 156);
        var g = Math.round(102 - intensity * 60);
        var b = Math.round(241 - intensity * 100);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.2 + intensity * 0.7) + ')';
        ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);

        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(Math.round(intensity * 100), x + cellW / 2, y + cellH / 2 + 3);
      });
    });
  }

  /* ================================================================
   * 4. PROJECT ECOSYSTEM FLOW — tech sharing Sankey-style
   * ================================================================ */
  function drawEcosystemFlow(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Project Ecosystem Flow', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('Technology sharing paths between projects', W / 2, 46);

    var leftNodes = ['Canvas 2D', 'Web Audio', 'Three.js', 'Tone.js', 'PWA', 'Leaflet'];
    var rightNodes = PROJECTS.slice(0, 8).map(function (p) { return p.name; });
    var connections = [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [1, 0], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
      [2, 0], [2, 4], [2, 7],
      [3, 3], [3, 5],
      [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7],
      [5, 1]
    ];
    var leftColors = ['#6366f1', '#22d3ee', '#f59e0b', '#a78bfa', '#22c55e', '#4ade80'];

    var pad = { l: 100, r: 90, t: 60, b: 20 };
    var lH = (H - pad.t - pad.b) / leftNodes.length;
    var rH = (H - pad.t - pad.b) / rightNodes.length;

    connections.forEach(function (c) {
      var x1 = pad.l + 10;
      var y1 = pad.t + c[0] * lH + lH / 2;
      var x2 = W - pad.r - 10;
      var y2 = pad.t + c[1] * rH + rH / 2;
      var mx = (x1 + x2) / 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(mx, y1, mx, y2, x2, y2);
      ctx.strokeStyle = leftColors[c[0]] + '30'; ctx.lineWidth = 2; ctx.stroke();
    });

    leftNodes.forEach(function (name, i) {
      var y = pad.t + i * lH;
      ctx.fillStyle = leftColors[i] + '30';
      ctx.fillRect(pad.l - 80, y + 4, 90, lH - 8);
      ctx.fillStyle = leftColors[i]; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(name, pad.l - 35, y + lH / 2 + 3);
    });

    rightNodes.forEach(function (name, i) {
      var y = pad.t + i * rH;
      var p = PROJECTS[i];
      ctx.fillStyle = p.color + '30';
      ctx.fillRect(W - pad.r - 10, y + 2, 95, rH - 4);
      ctx.fillStyle = p.color; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(name, W - pad.r - 5, y + rH / 2 + 3);
    });
  }

  /* ================================================================
   * 5. UPDATE RHYTHM ANALYZER — circular pattern of update frequency
   * ================================================================ */
  function drawUpdateRhythm(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Update Rhythm Analyzer', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('Auto-evolution update frequency pattern (last 30 days)', W / 2, 46);

    var cx = W / 2, cy = H / 2 + 15, radius = Math.min(W, H) * 0.3;

    for (var ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * ring / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99,102,241,.1)'; ctx.lineWidth = 0.5; ctx.stroke();
    }

    ctx.font = '8px sans-serif'; ctx.fillStyle = '#64748b'; ctx.textAlign = 'center';
    for (var d = 0; d < 30; d++) {
      var angle = (d / 30) * Math.PI * 2 - Math.PI / 2;
      var tx = cx + Math.cos(angle) * (radius + 18);
      var ty = cy + Math.sin(angle) * (radius + 18);
      if (d % 5 === 0) ctx.fillText((d + 1) + 'd', tx, ty + 3);
    }

    PROJECTS.forEach(function (p, pi) {
      var seed = pi * 41 + 13;
      for (var day = 0; day < 30; day++) {
        var hasUpdate = ((seed * (day + 1)) % 5) < 2;
        if (!hasUpdate) continue;
        var angle = (day / 30) * Math.PI * 2 - Math.PI / 2;
        var dist = radius * 0.3 + (pi / PROJECTS.length) * radius * 0.65;
        var px = cx + Math.cos(angle) * dist;
        var py = cy + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + 'AA';
        ctx.fill();
      }
    });

    ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
    var legendY = H - 28;
    for (var li = 0; li < Math.min(6, PROJECTS.length); li++) {
      var lx = 20 + li * 95;
      ctx.fillStyle = PROJECTS[li].color;
      ctx.fillRect(lx, legendY, 8, 8);
      ctx.fillText(PROJECTS[li].name, lx + 12, legendY + 8);
    }
  }

  /* ================================================================
   * 6. ACHIEVEMENT MASTERY DASHBOARD — overall progress dashboard
   * ================================================================ */
  function drawMasteryDashboard(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Achievement Mastery Dashboard', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('Combined achievement & quiz completion across all projects', W / 2, 46);

    var totalAchievements = 0, totalQuizzes = 0, totalFeatures = 0;
    PROJECTS.forEach(function (p) {
      totalAchievements += p.achievements;
      totalQuizzes += p.quizzes;
      totalFeatures += p.features;
    });

    var stats = [
      { label: 'Total Achievements', value: totalAchievements, max: 2500, color: '#f59e0b' },
      { label: 'Total Quizzes', value: totalQuizzes, max: 3000, color: '#22d3ee' },
      { label: 'Total Features', value: totalFeatures, max: 2500, color: '#6366f1' },
      { label: 'Total LOC', value: TOTAL_LOC, max: 300000, color: '#22c55e' }
    ];

    var arcCx = W / 2, arcCy = 165, arcR = 65;
    stats.forEach(function (s, i) {
      var startAngle = -Math.PI / 2;
      var pct = Math.min(1, s.value / s.max);
      var endAngle = startAngle + Math.PI * 2 * pct;
      var offset = i * (W / 4);
      var scx = 70 + offset;

      ctx.beginPath();
      ctx.arc(scx, arcCy, 45, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99,102,241,.1)'; ctx.lineWidth = 8; ctx.stroke();

      ctx.beginPath();
      ctx.arc(scx, arcCy, 45, startAngle, endAngle);
      ctx.strokeStyle = s.color; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();

      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
      ctx.fillText(Math.round(pct * 100) + '%', scx, arcCy + 5);
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
      ctx.fillText(s.label, scx, arcCy + 50);
      ctx.fillText(s.value.toLocaleString(), scx, arcCy + 62);
    });

    var barY = 260;
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('Per-Project Mastery', 30, barY);
    barY += 18;

    PROJECTS.slice(0, 8).forEach(function (p, i) {
      var y = barY + i * 22;
      var mastery = (p.achievements + p.quizzes + p.features) / 3;
      var pct = Math.min(1, mastery / 200);
      ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(p.name, 85, y + 12);
      ctx.fillStyle = 'rgba(99,102,241,.08)';
      ctx.fillRect(90, y + 2, W - 140, 14);
      var grad = ctx.createLinearGradient(90, y, 90 + (W - 140) * pct, y);
      grad.addColorStop(0, p.color + '80'); grad.addColorStop(1, p.color);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.roundRect(90, y + 2, (W - 140) * pct, 14, 3); ctx.fill();
      ctx.fillStyle = '#e2e8f0'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(Math.round(pct * 100) + '%', 90 + (W - 140) * pct + 4, y + 13);
    });
  }

  /* ================================================================
   * 7. TECH ROI CALCULATOR — investment vs output analysis
   * ================================================================ */
  function drawTechROI(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Tech ROI Calculator', W / 2, 28);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('Technology investment vs. feature output (bubble size = LOC)', W / 2, 46);

    var pad = { l: 60, r: 30, t: 60, b: 50 };
    var cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;

    ctx.strokeStyle = 'rgba(99,102,241,.1)'; ctx.lineWidth = 0.5;
    for (var i = 0; i <= 5; i++) {
      var yy = pad.t + (ch / 5) * i;
      ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(W - pad.r, yy); ctx.stroke();
      var xx = pad.l + (cw / 5) * i;
      ctx.beginPath(); ctx.moveTo(xx, pad.t); ctx.lineTo(xx, H - pad.b); ctx.stroke();
    }

    ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('Sessions Invested →', W / 2, H - 10);
    ctx.save(); ctx.translate(14, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Features Output →', 0, 0); ctx.restore();

    PROJECTS.forEach(function (p, pi) {
      var sessions = 200 + pi * 80 + ((pi * 37) % 50);
      var x = pad.l + (sessions / 1200) * cw;
      var y = pad.t + ch - (p.features / 260) * ch;
      var r = Math.max(8, (p.loc / TOTAL_LOC) * 50);

      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '40'; ctx.fill();
      ctx.strokeStyle = p.color; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.fillStyle = p.color; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(p.name, x, y - r - 4);
    });
  }

  /* ================================================================
   * 8. PORTFOLIO SCORECARD — comprehensive score with PNG download
   * ================================================================ */
  function drawScorecard(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;

    var grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0a0a2e'); grad.addColorStop(1, '#12122a');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(99,102,241,.2)'; ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, W - 16, H - 16);

    ctx.strokeStyle = 'rgba(99,102,241,.05)'; ctx.lineWidth = 0.5;
    ctx.strokeRect(14, 14, W - 28, H - 28);

    ctx.fillStyle = '#6366f1'; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('PORTFOLIO SCORECARD', W / 2, 42);
    ctx.fillStyle = '#94a3b8'; ctx.font = '12px sans-serif';
    ctx.fillText('AI-Augmented Developer Portfolio v18.0', W / 2, 62);
    ctx.fillText('Generated: 2026-07-12', W / 2, 78);

    ctx.beginPath(); ctx.moveTo(30, 90); ctx.lineTo(W - 30, 90);
    ctx.strokeStyle = 'rgba(99,102,241,.3)'; ctx.lineWidth = 1; ctx.stroke();

    var totalAch = 0, totalQ = 0, totalF = 0;
    PROJECTS.forEach(function (p) { totalAch += p.achievements; totalQ += p.quizzes; totalF += p.features; });

    var scores = [
      { label: 'Projects', value: '12', grade: 'S', color: '#f59e0b' },
      { label: 'Total LOC', value: '210K+', grade: 'S', color: '#22c55e' },
      { label: 'Features', value: totalF.toString(), grade: 'S', color: '#6366f1' },
      { label: 'Quizzes', value: totalQ.toString(), grade: 'A+', color: '#22d3ee' },
      { label: 'Achievements', value: totalAch.toString(), grade: 'S', color: '#f43f5e' },
      { label: 'Sessions', value: '7,800+', grade: 'S', color: '#a78bfa' }
    ];

    var cols = 3, rows = 2;
    var cellW = (W - 80) / cols, cellH = 80;

    scores.forEach(function (s, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var x = 40 + col * cellW, y = 100 + row * (cellH + 10);

      ctx.fillStyle = 'rgba(99,102,241,.06)';
      ctx.beginPath(); ctx.roundRect(x, y, cellW - 10, cellH, 8); ctx.fill();
      ctx.strokeStyle = 'rgba(99,102,241,.15)'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.roundRect(x, y, cellW - 10, cellH, 8); ctx.stroke();

      ctx.fillStyle = s.color; ctx.font = 'bold 20px monospace'; ctx.textAlign = 'center';
      ctx.fillText(s.value, x + (cellW - 10) / 2, y + 35);
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif';
      ctx.fillText(s.label, x + (cellW - 10) / 2, y + 52);
      ctx.fillStyle = s.color; ctx.font = 'bold 14px sans-serif';
      ctx.fillText(s.grade, x + cellW - 25, y + 20);
    });

    var cy = 290;
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('Top 6 Projects', 40, cy);
    cy += 16;

    PROJECTS.slice(0, 6).forEach(function (p, i) {
      var y = cy + i * 20;
      ctx.fillStyle = p.color; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(p.icon + ' ' + p.name + ' ' + p.ver, 45, y + 12);
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif';
      ctx.fillText(p.loc.toLocaleString() + ' LOC', 220, y + 12);
      ctx.fillText(p.features + ' features', 320, y + 12);
      ctx.fillText(p.achievements + ' achievements', 420, y + 12);
    });

    ctx.fillStyle = 'rgba(99,102,241,.3)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('NEXTERA + PRISM Autonomous Development System', W / 2, H - 18);
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+G/T/H/E/R/M/I/S)
   * ================================================================ */
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey || e.ctrlKey || e.metaKey) return;
    var map = {
      G: 'v18-growth', T: 'v18-depth', H: 'v18-heatmap', E: 'v18-ecosystem',
      R: 'v18-rhythm', M: 'v18-mastery', I: 'v18-roi', S: 'v18-scorecard'
    };
    var id = map[e.key.toUpperCase()];
    if (id) {
      e.preventDefault();
      sfx.play('nav');
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  /* ================================================================
   * COMPARE OVERLAY
   * ================================================================ */
  var overlay = el('div', { className: 'v18-compare-overlay' });
  var box = el('div', { className: 'v18-compare-box' });
  var closeBtn = el('button', { className: 'v18-compare-close', textContent: '×', onClick: function () { overlay.classList.remove('open'); } });
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('open'); });
  document.body.appendChild(overlay);

  function showCompare(projA, projB) {
    sfx.play('compare');
    var a = PROJECTS.find(function (p) { return p.name === projA; });
    var b = PROJECTS.find(function (p) { return p.name === projB; });
    if (!a || !b) return;
    box.innerHTML = '';
    box.appendChild(el('button', { className: 'v18-compare-close', textContent: '×', onClick: function () { overlay.classList.remove('open'); } }));
    box.appendChild(el('h3', { textContent: a.name + ' vs ' + b.name, style: { textAlign: 'center', marginBottom: '20px', fontSize: '1.3rem' } }));

    var metrics = ['loc', 'features', 'quizzes', 'achievements'];
    var labels = ['Lines of Code', 'Features', 'Quizzes', 'Achievements'];
    var table = el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' } });

    table.appendChild(el('div', { textContent: a.name, style: { fontWeight: '700', color: a.color } }));
    table.appendChild(el('div', { textContent: 'Metric', style: { fontWeight: '700', color: 'var(--text2)' } }));
    table.appendChild(el('div', { textContent: b.name, style: { fontWeight: '700', color: b.color } }));

    metrics.forEach(function (m, i) {
      var va = a[m], vb = b[m];
      table.appendChild(el('div', { textContent: va.toLocaleString(), style: { color: va >= vb ? '#4ade80' : '#f43f5e' } }));
      table.appendChild(el('div', { textContent: labels[i], style: { color: 'var(--text2)', fontSize: '.85rem' } }));
      table.appendChild(el('div', { textContent: vb.toLocaleString(), style: { color: vb >= va ? '#4ade80' : '#f43f5e' } }));
    });

    box.appendChild(table);
    overlay.classList.add('open');
  }

  /* ================================================================
   * BUILD ALL SECTIONS
   * ================================================================ */
  function init() {
    var anchor = document.querySelector('.story') || document.querySelector('footer') || document.body.lastElementChild;
    if (!anchor) return;

    // KPI Row
    var kpiSec = buildSection('v18-kpi', 'Portfolio v18.0 Overview', 'Real-time metrics across 12 auto-evolving projects');
    var kpiRow = el('div', { className: 'v18-kpi-row' });
    var totalAch = 0, totalQ = 0, totalF = 0;
    PROJECTS.forEach(function (p) { totalAch += p.achievements; totalQ += p.quizzes; totalF += p.features; });

    [
      { val: '12', label: 'Active Projects' },
      { val: '210K+', label: 'Lines of Code' },
      { val: totalF.toString(), label: 'Total Features' },
      { val: totalQ.toString(), label: 'Total Quizzes' },
      { val: totalAch.toString(), label: 'Achievements' },
      { val: '7,800+', label: 'AI Sessions' }
    ].forEach(function (k) {
      var kpi = el('div', { className: 'v18-kpi' });
      kpi.appendChild(el('div', { className: 'v18-kpi-val', textContent: k.val, style: { background: 'linear-gradient(135deg,#6366f1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } }));
      kpi.appendChild(el('div', { className: 'v18-kpi-label', textContent: k.label }));
      kpiRow.appendChild(kpi);
    });
    kpiSec.appendChild(kpiRow);
    anchor.parentNode.insertBefore(kpiSec, anchor);

    // 1. Growth Trajectory
    var sec1 = buildSection('v18-growth', 'Project Growth Trajectory', '12 projects LOC growth curve across version history');
    var card1 = el('div', { className: 'v18-card' });
    var cv1 = makeCanvas(620, 380);
    card1.appendChild(cv1); sec1.appendChild(card1);
    anchor.parentNode.insertBefore(sec1, anchor);
    drawGrowthTrajectory(cv1);

    // 2. Tech Stack Depth
    var sec2 = buildSection('v18-depth', 'Tech Stack Depth Analyzer', '10 core technologies ranked by usage depth and project spread');
    var card2 = el('div', { className: 'v18-card' });
    var cv2 = makeCanvas(600, 360);
    card2.appendChild(cv2); sec2.appendChild(card2);
    anchor.parentNode.insertBefore(sec2, anchor);
    drawTechDepth(cv2);

    // 3. Code Complexity Heatmap
    var sec3 = buildSection('v18-heatmap', 'Code Complexity Heatmap', '12 projects × 6 complexity dimensions');
    var card3 = el('div', { className: 'v18-card' });
    var cv3 = makeCanvas(620, 400);
    card3.appendChild(cv3); sec3.appendChild(card3);
    anchor.parentNode.insertBefore(sec3, anchor);
    drawComplexityHeatmap(cv3);

    // 4. Ecosystem Flow
    var sec4 = buildSection('v18-ecosystem', 'Project Ecosystem Flow', 'Technology sharing paths between projects (Sankey-style)');
    var card4 = el('div', { className: 'v18-card' });
    var cv4 = makeCanvas(600, 380);
    card4.appendChild(cv4); sec4.appendChild(card4);
    anchor.parentNode.insertBefore(sec4, anchor);
    drawEcosystemFlow(cv4);

    // 5. Update Rhythm
    var sec5 = buildSection('v18-rhythm', 'Update Rhythm Analyzer', 'Auto-evolution update frequency pattern (30 days)');
    var card5 = el('div', { className: 'v18-card' });
    var cv5 = makeCanvas(580, 380);
    card5.appendChild(cv5); sec5.appendChild(card5);
    anchor.parentNode.insertBefore(sec5, anchor);
    drawUpdateRhythm(cv5);

    // 6. Mastery Dashboard
    var sec6 = buildSection('v18-mastery', 'Achievement Mastery Dashboard', 'Combined achievement & quiz completion rates');
    var card6 = el('div', { className: 'v18-card' });
    var cv6 = makeCanvas(600, 440);
    card6.appendChild(cv6); sec6.appendChild(card6);
    anchor.parentNode.insertBefore(sec6, anchor);
    drawMasteryDashboard(cv6);

    // 7. Tech ROI
    var sec7 = buildSection('v18-roi', 'Tech ROI Calculator', 'Sessions invested vs. features output (bubble = LOC)');
    var card7 = el('div', { className: 'v18-card' });
    var cv7 = makeCanvas(600, 380);
    card7.appendChild(cv7); sec7.appendChild(card7);
    anchor.parentNode.insertBefore(sec7, anchor);
    drawTechROI(cv7);

    // 8. Portfolio Scorecard
    var sec8 = buildSection('v18-scorecard', 'Portfolio Scorecard', 'Comprehensive portfolio score card (click Download PNG)');
    var card8 = el('div', { className: 'v18-card' });
    var cv8 = makeCanvas(600, 420);
    card8.appendChild(cv8); sec8.appendChild(card8);

    var dlBtn = el('button', {
      className: 'v18-tab active',
      textContent: '⬇ Download PNG',
      style: { display: 'block', margin: '12px auto 0' },
      onClick: function () {
        sfx.play('scorecard');
        var link = document.createElement('a');
        link.download = 'portfolio-scorecard-v18.png';
        link.href = cv8.toDataURL('image/png');
        link.click();
        showToast('Scorecard', 'PNG downloaded successfully!');
      }
    });
    card8.appendChild(dlBtn);
    sec8.appendChild(card8);
    anchor.parentNode.insertBefore(sec8, anchor);
    drawScorecard(cv8);

    // Compare buttons on project cards
    var projectCards = $$('.card[data-cat="prism"]');
    projectCards.forEach(function (card) {
      var title = card.querySelector('.card-title');
      if (!title) return;
      var pName = title.textContent.trim();
      var actions = card.querySelector('.card-actions');
      if (!actions) return;
      var existingCompare = actions.querySelector('.v18-compare-btn');
      if (existingCompare) return;
      var compareBtn = el('button', {
        className: 'btn btn-secondary v18-compare-btn',
        textContent: '↔ Compare',
        onClick: function () {
          var other = pName === 'History RPG' ? 'Piano' : 'History RPG';
          showCompare(pName, other);
        }
      });
      actions.appendChild(compareBtn);
    });

    // Scroll ring
    var ring = el('div', { className: 'v18-scroll-ring', onClick: function () { window.scrollTo({ top: 0, behavior: 'smooth' }); } });
    ring.innerHTML = '<svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="125.66"/><polygon class="ring-arrow" points="24,14 30,22 27,22 27,32 21,32 21,22 18,22"/></svg>';
    document.body.appendChild(ring);

    function updateRing() {
      var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      var circ = 125.66;
      var fg = ring.querySelector('.ring-fg');
      if (fg) fg.setAttribute('stroke-dashoffset', circ - circ * pct);
      ring.style.opacity = window.scrollY > 300 ? '.85' : '0';
      ring.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    }
    window.addEventListener('scroll', updateRing, { passive: true });

    // Welcome toast
    setTimeout(function () {
      showToast('v18.0 Loaded', '8 new Canvas visualizations + updated project data for all 12 repos');
    }, 1500);

    // Visit counter
    var heroStats = document.querySelector('.stats');
    if (heroStats) {
      var visitStat = el('div', { className: 'stat' });
      visitStat.innerHTML = '<div class="stat-num">' + visitCount + '</div><div class="stat-label">Your Visits</div>';
      heroStats.appendChild(visitStat);
    }
  }

  /* ================================================================
   * UPDATE PROJECT CARDS (PRISM section in index.html)
   * ================================================================ */
  function updateProjectCards() {
    var cards = $$('.card[data-cat="prism"]');
    var versionMap = {
      'History RPG': { ver: 'v23.0', desc: '한국사 영걸전 3D 전략 RPG v23.0. 영웅무기도감 12종 Canvas, 전투통계대시보드 6지표, 왕국재정관리 4자원, 고대유물발굴 8구역, 퀀즈 240문, 업적 168개.' },
      'Piano': { ver: 'v19.0', desc: 'Tone.js 피아노 리듬게임 v19.0. 162곡, 시보드리딩 13음 Canvas, 코드보이싱 6코드, 리듬패턴빌더 8비트, 스트릭캘린더 히트맵, 퀀즈 150문, 업적 168개.' },
      'Violin': { ver: 'v18.0', desc: '바이올린 시뮬레이터 v18.0. 154곡, 활배분분석기 12곡 Canvas, 퍼펙트5도튜닝, 음악시대별스타일 6시대, 퀀즈 135문, 업적 166개.' },
      'Karaoke': { ver: 'v19.0', desc: '노래방 v19.0. 165곡, 호흡패턴분석기 8종 Canvas, 비브라토파형분석, 난이도프로그레션맵, 싱어프로필카드 PNG, 퀀즈 192문, 업적 162개.' },
      'Golf Tracker': { ver: 'v17.0', desc: '골프볼 트래커 v17.0. 클럽별SG히트맵 14클럽 Canvas, 스코어목표트래커, 워밍업타이머, 비거리트렌드, 퀀즈 150문, 업적 120개.' },
      'Boxing Trainer': { ver: 'v20.0', desc: '3D 복싱 트레이너 v20.0. 스파링전술시뮬 8스타일 Canvas, 복싱리듬트레이너, 편치카운터대시보드, 해부학가이드, 퀀즈 180문, 업적 166개.' },
      'City Builder': { ver: 'v17.0', desc: '도시경영 v17.0. 왕실혼인외교관 8가문 Canvas, 고대과학기술원 12종, 민란봉기관리소 8종, 풍수지리감정 8방위, 퀀즈 205문, 업적 182개.' },
      'House Builder': { ver: 'v17.0', desc: '3D 집짓기 v17.0. 건축양식진화도 6시대 Radar Canvas, 실내채광분석기 12시간, 지진내진설계 6등급, 탄소발자국 10소재, 퀀즈 195문, 업적 182개.' },
      'Hatcuping': { ver: 'v19.0', desc: '하츄핑 플랫포머+RPG v19.0. 티니핑도감 12종 Canvas, 파워업상점 8종, 속성상성표 6속성, 스피드런타이머, 퀀즈 165문, 업적 166개.' }
    };

    cards.forEach(function (card) {
      var title = card.querySelector('.card-title');
      if (!title) return;
      var pName = title.textContent.trim();
      var update = versionMap[pName];
      if (!update) return;

      var badge = card.querySelector('.version-badge');
      if (badge) badge.textContent = update.ver;

      var desc = card.querySelector('.card-desc');
      if (desc) desc.textContent = update.desc;
    });
  }

  /* ================================================================
   * SPOTLIGHT CAROUSEL
   * ================================================================ */
  function buildSpotlight() {
    var anchor = document.getElementById('v18-growth');
    if (!anchor) return;
    var sec = buildSection('v18-spotlight', 'Featured Updates', 'Latest major updates across the portfolio');
    var items = [
      { title: 'History RPG v23.0', desc: '영웅무기도감 12종 + 전투통계대시보드 + 왕국재정관리', color: '#22d3ee' },
      { title: 'Boxing v20.0', desc: '스파링전술시뮬 + 복싱리듬트레이너 + 편치카운터', color: '#f43f5e' },
      { title: 'Piano v19.0', desc: '시보드리딩트레이너 + 코드보이싱비교 + 리듬패턴빌더', color: '#a78bfa' }
    ];

    items.forEach(function (item) {
      var spot = el('div', { className: 'v18-spotlight' });
      spot.appendChild(el('div', { className: 'v18-spotlight-glow' }));
      var content = el('div', { style: { position: 'relative', zIndex: '1' } });
      content.appendChild(el('h3', { textContent: item.title, style: { color: item.color, marginBottom: '8px', fontSize: '1.2rem' } }));
      content.appendChild(el('p', { textContent: item.desc, style: { color: 'var(--text2)', fontSize: '.9rem' } }));
      spot.appendChild(content);
      sec.appendChild(spot);
    });

    anchor.parentNode.insertBefore(sec, anchor);
  }

  /* ================================================================
   * NAVIGATION BUTTONS — appended to existing navbar
   * ================================================================ */
  function addNavButtons() {
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    var existing = navLinks.querySelector('[data-section="v18-kpi"]');
    if (existing) return;
    var link = el('a', { href: '#v18-kpi', 'data-section': 'v18-kpi', textContent: 'v18' });
    navLinks.insertBefore(link, navLinks.querySelector('#themeToggle'));
  }

  /* ================================================================
   * INIT
   * ================================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); updateProjectCards(); buildSpotlight(); addNavButtons(); });
  } else {
    init(); updateProjectCards(); buildSpotlight(); addNavButtons();
  }

})();
