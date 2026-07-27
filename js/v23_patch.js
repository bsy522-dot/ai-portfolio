/**
 * ai-portfolio v23.0 Patch Module
 * Last updated: 2026-07-27
 */
;(function () {
  'use strict';
  if (window._v23) return;
  window._v23 = { version: '23.0.0', applied: Date.now() };

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
   * PROJECT DATA (v23.0 — all 12 repos updated to latest 2026-07-27)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v28.0', loc: 32000, features: 300, quizzes: 315, achievements: 228, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.3, testCoverage: 83, uxScore: 89 },
    { name: 'SmartGolf', ver: 'v36.0', loc: 30500, features: 287, quizzes: 287, achievements: 284, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 8.9, testCoverage: 86, uxScore: 92 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86 },
    { name: 'Piano', ver: 'v24.0', loc: 27600, features: 228, quizzes: 225, achievements: 228, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.6, testCoverage: 81, uxScore: 91 },
    { name: 'Boxing', ver: 'v25.0', loc: 26800, features: 226, quizzes: 255, achievements: 226, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.8, testCoverage: 80, uxScore: 88 },
    { name: 'Karaoke', ver: 'v24.0', loc: 26000, features: 222, quizzes: 267, achievements: 222, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 8.4, testCoverage: 82, uxScore: 90 },
    { name: 'Violin', ver: 'v23.0', loc: 25200, features: 226, quizzes: 210, achievements: 226, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.7, testCoverage: 78, uxScore: 89 },
    { name: 'City Builder', ver: 'v22.0', loc: 24600, features: 242, quizzes: 280, achievements: 242, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 8.5, testCoverage: 84, uxScore: 87 },
    { name: 'House Builder', ver: 'v22.0', loc: 24000, features: 242, quizzes: 270, achievements: 242, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.3, testCoverage: 77, uxScore: 86 },
    { name: 'Golf Tracker', ver: 'v22.0', loc: 22200, features: 180, quizzes: 225, achievements: 180, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.0, testCoverage: 83, uxScore: 88 },
    { name: 'Hatcuping', ver: 'v24.0', loc: 20000, features: 226, quizzes: 240, achievements: 226, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 7.9, testCoverage: 76, uxScore: 91 },
    { name: 'CCF', ver: 'v20.0', loc: 18200, features: 210, quizzes: 240, achievements: 210, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 7.7, testCoverage: 85, uxScore: 89 }
  ];
  var TOTAL_LOC = 310000;
  var TOTAL_SESSIONS = 10800;

  /* ================================================================
   * CSS (v23)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v23-patch-styles';
  style.textContent = [
    '.v23-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v23-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v23-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v23-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v23-canvas{display:block;margin:0 auto}',
    '.v23-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v23-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v23-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v23-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v23-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v23-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v23-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v23)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav23: function () { tone(1047, 0.06, 'sine'); },
    section23: function () { tone(784, 0.08, 'triangle'); },
    tab23: function () { tone(1480, 0.05, 'sine'); },
    maintain: function () { tone(440, 0.12, 'triangle'); tone(554, 0.08, 'sine', 0.09); },
    techdebt: function () { tone(294, 0.1, 'sine'); tone(392, 0.07, 'triangle', 0.08); },
    impact: function () { tone(523, 0.1, 'triangle'); tone(784, 0.08, 'sine', 0.09); },
    productivity: function () { tone(330, 0.12, 'sine'); tone(440, 0.08, 'triangle', 0.09); tone(523, 0.06, 'sine', 0.15); },
    interconnect: function () { tone(659, 0.08, 'sine'); tone(880, 0.06, 'triangle', 0.07); },
    perfbudget: function () { tone(494, 0.1, 'sine'); tone(622, 0.07, 'sine', 0.08); },
    maturity: function () { tone(370, 0.1, 'triangle'); tone(554, 0.08, 'sine', 0.09); tone(740, 0.06, 'sine', 0.16); },
    engagement: function () { tone(523, 0.08, 'sine'); tone(698, 0.06, 'triangle', 0.07); },
    achieve23: function () { tone(554, 0.06, 'sine'); tone(698, 0.05, 'sine', 0.05); tone(831, 0.04, 'sine', 0.09); tone(1109, 0.06, 'sine', 0.12); }
  };
  function tone(freq, dur, type, delay) {
    var ctx = getAudioCtx(); if (!ctx) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.10, ctx.currentTime + (delay || 0));
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (delay || 0) + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(ctx.currentTime + (delay || 0));
    o.stop(ctx.currentTime + (delay || 0) + dur + 0.01);
  }
  function sfx(name) { if (SFX_MAP[name]) try { SFX_MAP[name](); } catch (e) {} }

  /* ================================================================
   * TOAST SYSTEM
   * ================================================================ */
  var toastWrap;
  function showToast(title, msg) {
    if (!toastWrap) {
      toastWrap = el('div', { style: { position: 'fixed', top: '70px', right: '16px', zIndex: '9990', display: 'flex', flexDirection: 'column', gap: '8px' } });
      document.body.appendChild(toastWrap);
    }
    var t = el('div', {
      innerHTML: '<strong style="color:#a5b4fc">' + title + '</strong> ' + msg,
      style: { background: 'rgba(18,18,42,.95)', border: '1px solid rgba(99,102,241,.3)', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', color: '#e2e8f0', maxWidth: '320px', backdropFilter: 'blur(10px)', opacity: '0', transform: 'translateX(30px)', transition: 'all .3s' }
    });
    toastWrap.appendChild(t);
    sfx('nav23');
    requestAnimationFrame(function () { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; });
    setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(30px)'; setTimeout(function () { t.remove(); }, 400); }, 3500);
  }

  /* ================================================================
   * CANVAS HELPERS
   * ================================================================ */
  var isDark = function () { return document.documentElement.getAttribute('data-theme') !== 'light'; };
  var cText = function () { return isDark() ? '#e2e8f0' : '#1e293b'; };
  var cText2 = function () { return isDark() ? '#94a3b8' : '#475569'; };
  var cText3 = function () { return isDark() ? '#64748b' : '#94a3b8'; };
  var cBg = function () { return isDark() ? '#12122a' : '#ffffff'; };
  var cGrid = function () { return isDark() ? 'rgba(99,102,241,.08)' : 'rgba(99,102,241,.06)'; };

  function createCanvas(w, h) {
    var c = document.createElement('canvas');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = w + 'px'; c.style.height = h + 'px';
    c.className = 'v23-canvas';
    var ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas: c, ctx: ctx, w: w, h: h };
  }

  /* ================================================================
   * SECTION 1: Code Maintainability Spectrum (Canvas 620x400)
   * 12 projects × 6 maintainability metrics horizontal stacked bar
   * ================================================================ */
  function buildMaintainabilitySpectrum() {
    var metrics = ['Readability', 'Modularity', 'Test Coverage', 'Doc Quality', 'Dep. Health', 'Refactor Ease'];
    var metricColors = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b', '#c084fc', '#f43f5e'];
    var data = PROJECTS.map(function (p) {
      var base = p.testCoverage / 100;
      return [
        Math.round(70 + base * 20 + (p.loc < 22000 ? 5 : 0)),
        Math.round(65 + base * 25 + (p.tech.length > 2 ? 3 : 0)),
        p.testCoverage,
        Math.round(60 + base * 20 + (p.features > 200 ? 5 : 0)),
        Math.round(75 + base * 15),
        Math.round(55 + base * 30 + (p.complexity < 8.5 ? 5 : 0))
      ];
    });

    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Code Maintainability Spectrum', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('6 metrics per project — hover to see individual scores', W / 2, 36);

      var ox = 95, oy = 55, maxW = W - ox - 30, bh = (H - oy - 70) / PROJECTS.length - 3;

      for (var i = 0; i < PROJECTS.length; i++) {
        var y = oy + i * (bh + 3);
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = hovered === i ? PROJECTS[i].color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(PROJECTS[i].name, ox - 8, y + bh / 2 + 4);

        var total = data[i].reduce(function (a, b) { return a + b; }, 0);
        var xOff = ox;
        for (var m = 0; m < metrics.length; m++) {
          var segW = (data[i][m] / total) * maxW * (total / 600);
          ctx.globalAlpha = hovered === i ? 1 : 0.75;
          ctx.fillStyle = metricColors[m];
          ctx.beginPath();
          if (m === 0) {
            ctx.roundRect(xOff, y, segW, bh, [3, 0, 0, 3]);
          } else if (m === metrics.length - 1) {
            ctx.roundRect(xOff, y, segW, bh, [0, 3, 3, 0]);
          } else {
            ctx.fillRect(xOff, y, segW, bh);
          }
          ctx.fill();
          ctx.globalAlpha = 1;
          xOff += segW;
        }

        if (hovered === i) {
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.fillStyle = cText();
          ctx.textAlign = 'left';
          ctx.fillText('Avg: ' + Math.round(total / metrics.length) + '%', xOff + 6, y + bh / 2 + 4);
        }
      }

      ctx.font = '10px -apple-system,sans-serif';
      var lx = ox;
      for (var j = 0; j < metrics.length; j++) {
        ctx.fillStyle = metricColors[j];
        ctx.fillRect(lx, H - 25, 10, 10);
        ctx.fillStyle = cText2();
        ctx.textAlign = 'left';
        ctx.fillText(metrics[j], lx + 14, H - 16);
        lx += ctx.measureText(metrics[j]).width + 24;
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 55, bh = (H - oy - 70) / PROJECTS.length - 3;
      var old = hovered;
      hovered = -1;
      for (var i = 0; i < PROJECTS.length; i++) {
        var y = oy + i * (bh + 3);
        if (my >= y && my <= y + bh) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 2: Technical Debt Radar (Canvas 620x400)
   * 12 projects × 6 debt dimensions — click to cycle projects
   * ================================================================ */
  function buildTechDebtRadar() {
    var dims = ['Legacy Code', 'Missing Tests', 'Coupling', 'Complexity', 'Outdated Deps', 'Dead Code'];
    var currentIdx = 0;
    var data = PROJECTS.map(function (p) {
      var inv = (100 - p.testCoverage) / 100;
      return [
        Math.round(15 + inv * 30 + (p.loc > 25000 ? 10 : 0)),
        Math.round(100 - p.testCoverage),
        Math.round(20 + (p.complexity - 7) * 8),
        Math.round(p.complexity * 8),
        Math.round(10 + inv * 15),
        Math.round(8 + inv * 20 + (p.features > 200 ? 5 : 0))
      ];
    });

    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Technical Debt Radar — ' + PROJECTS[currentIdx].name + ' ' + PROJECTS[currentIdx].ver, W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Click to cycle projects — lower is better', W / 2, 36);

      var cx = W / 2, cy = 220, r = 140, n = dims.length;
      for (var ring = 1; ring <= 4; ring++) {
        var rr = r * ring / 4;
        ctx.beginPath();
        for (var i = 0; i <= n; i++) {
          var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
          var x = cx + rr * Math.cos(angle);
          var y = cy + rr * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((ring * 25) + '%', cx - rr - 4, cy + 3);
      }

      for (var d = 0; d < n; d++) {
        var angle = (Math.PI * 2 * d / n) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = cGrid();
        ctx.stroke();
        var lx = cx + (r + 18) * Math.cos(angle);
        var ly = cy + (r + 18) * Math.sin(angle);
        ctx.font = '11px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.textAlign = angle > Math.PI / 2 && angle < Math.PI * 1.5 ? 'right' : angle < -Math.PI / 4 || angle > Math.PI / 4 ? 'center' : 'left';
        if (Math.abs(angle + Math.PI / 2) < 0.1) ctx.textAlign = 'center';
        ctx.fillText(dims[d], lx, ly + 4);
      }

      var d0 = data[currentIdx];
      ctx.beginPath();
      for (var d = 0; d < n; d++) {
        var angle = (Math.PI * 2 * d / n) - Math.PI / 2;
        var val = d0[d] / 100;
        var px = cx + r * val * Math.cos(angle);
        var py = cy + r * val * Math.sin(angle);
        d === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      var color = PROJECTS[currentIdx].color;
      ctx.fillStyle = color.replace(')', ',.2)').replace('rgb', 'rgba').replace('#', '');
      ctx.fillStyle = hexToRgba(color, 0.2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      for (var d = 0; d < n; d++) {
        var angle = (Math.PI * 2 * d / n) - Math.PI / 2;
        var val = d0[d] / 100;
        var px = cx + r * val * Math.cos(angle);
        var py = cy + r * val * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(d0[d] + '%', px, py - 10);
      }

      var grade = Math.round(d0.reduce(function (a, b) { return a + b; }, 0) / n);
      var gradeLabel = grade < 20 ? 'S' : grade < 30 ? 'A' : grade < 45 ? 'B' : grade < 60 ? 'C' : 'D';
      var gradeColor = gradeLabel === 'S' ? '#22c55e' : gradeLabel === 'A' ? '#4ade80' : gradeLabel === 'B' ? '#f59e0b' : gradeLabel === 'C' ? '#fb923c' : '#f43f5e';
      ctx.font = 'bold 28px -apple-system,sans-serif';
      ctx.fillStyle = gradeColor;
      ctx.textAlign = 'center';
      ctx.fillText(gradeLabel, cx, cy + 8);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.fillText('Avg: ' + grade + '%', cx, cy + 22);
    }

    function hexToRgba(hex, a) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    cc.canvas.addEventListener('click', function () {
      currentIdx = (currentIdx + 1) % PROJECTS.length;
      sfx('techdebt');
      draw();
    });
    cc.canvas.style.cursor = 'pointer';
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 3: Release Impact Heatmap (Canvas 640x400)
   * Versions v18~v23 × 6 impact metrics — cell brightness = impact
   * ================================================================ */
  function buildReleaseImpact() {
    var versions = ['v18', 'v19', 'v20', 'v21', 'v22', 'v23'];
    var metrics = ['New Features', 'Bug Fixes', 'UX Polish', 'Performance', 'Content Added', 'Refactoring'];
    var impactData = [
      [75, 60, 55, 50, 80, 40],
      [80, 55, 65, 55, 85, 45],
      [85, 65, 70, 60, 88, 50],
      [88, 60, 75, 65, 90, 55],
      [92, 55, 80, 70, 92, 48],
      [95, 50, 85, 75, 95, 52]
    ];
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hoveredCell = { r: -1, c: -1 };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Release Impact Heatmap', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Version evolution across 6 impact dimensions — hover cells', W / 2, 36);

      var ox = 110, oy = 60, cw = (W - ox - 30) / versions.length, ch = (H - oy - 50) / metrics.length;

      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.textAlign = 'center';
      for (var v = 0; v < versions.length; v++) {
        ctx.fillText(versions[v], ox + v * cw + cw / 2, oy - 8);
      }
      ctx.textAlign = 'right';
      for (var m = 0; m < metrics.length; m++) {
        ctx.fillText(metrics[m], ox - 8, oy + m * ch + ch / 2 + 4);
      }

      for (var r = 0; r < metrics.length; r++) {
        for (var c = 0; c < versions.length; c++) {
          var val = impactData[c][r];
          var intensity = val / 100;
          var isHov = hoveredCell.r === r && hoveredCell.c === c;
          ctx.fillStyle = 'rgba(99,102,241,' + (0.15 + intensity * 0.75) + ')';
          ctx.beginPath();
          ctx.roundRect(ox + c * cw + 2, oy + r * ch + 2, cw - 4, ch - 4, 4);
          ctx.fill();
          if (isHov) {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.font = (isHov ? 'bold ' : '') + '12px -apple-system,sans-serif';
          ctx.fillStyle = intensity > 0.5 ? '#fff' : cText();
          ctx.textAlign = 'center';
          ctx.fillText(val, ox + c * cw + cw / 2, oy + r * ch + ch / 2 + 4);
        }
      }

      var gx = ox, gy = H - 25;
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'left';
      ctx.fillText('Low', gx, gy);
      var gradW = 120;
      var grad = ctx.createLinearGradient(gx + 28, 0, gx + 28 + gradW, 0);
      grad.addColorStop(0, 'rgba(99,102,241,.15)');
      grad.addColorStop(1, 'rgba(99,102,241,.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(gx + 28, gy - 10, gradW, 10);
      ctx.fillStyle = cText3();
      ctx.fillText('High', gx + 28 + gradW + 4, gy);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var ox = 110, oy = 60, cw = (W - ox - 30) / versions.length, ch = (H - oy - 50) / metrics.length;
      var old = { r: hoveredCell.r, c: hoveredCell.c };
      hoveredCell = { r: -1, c: -1 };
      if (mx >= ox && my >= oy) {
        var c = Math.floor((mx - ox) / cw);
        var r = Math.floor((my - oy) / ch);
        if (c >= 0 && c < versions.length && r >= 0 && r < metrics.length) {
          hoveredCell = { r: r, c: c };
        }
      }
      if (hoveredCell.r !== old.r || hoveredCell.c !== old.c) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hoveredCell = { r: -1, c: -1 }; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 4: Developer Productivity Dashboard (Canvas 620x380)
   * Multi-gauge: 6 productivity KPIs with semi-circle gauges
   * ================================================================ */
  function buildProductivityDashboard() {
    var kpis = [
      { label: 'Features/Week', value: 28, max: 40, color: '#6366f1' },
      { label: 'Versions/Week', value: 3.4, max: 5, color: '#22d3ee' },
      { label: 'LOC/Session', value: 450, max: 600, color: '#4ade80' },
      { label: 'Bug Fix Rate', value: 92, max: 100, color: '#f59e0b' },
      { label: 'Quiz Questions', value: 35, max: 50, color: '#c084fc' },
      { label: 'SFX/Version', value: 14, max: 20, color: '#f43f5e' }
    ];

    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Developer Productivity Dashboard', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('6 KPIs — hover for details', W / 2, 36);

      var cols = 3, rows = 2;
      var gw = (W - 40) / cols, gh = (H - 60) / rows;

      for (var i = 0; i < kpis.length; i++) {
        var col = i % cols, row = Math.floor(i / cols);
        var cx = 20 + col * gw + gw / 2;
        var cy = 60 + row * gh + gh / 2 + 10;
        var r = Math.min(gw, gh) / 2 - 20;
        var pct = kpis[i].value / kpis[i].max;
        var isHov = hovered === i;

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * Math.min(pct, 1));
        ctx.strokeStyle = kpis[i].color;
        ctx.lineWidth = isHov ? 14 : 12;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.font = 'bold ' + (isHov ? '20' : '18') + 'px -apple-system,sans-serif';
        ctx.fillStyle = isHov ? kpis[i].color : cText();
        ctx.textAlign = 'center';
        var dispVal = kpis[i].value % 1 === 0 ? kpis[i].value.toString() : kpis[i].value.toFixed(1);
        ctx.fillText(dispVal, cx, cy - 2);

        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.fillText(kpis[i].label, cx, cy + 14);

        if (isHov) {
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = cText3();
          ctx.fillText(Math.round(pct * 100) + '% of max (' + kpis[i].max + ')', cx, cy + 28);
        }
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var cols = 3, gw = (W - 40) / cols, gh = (H - 60) / 2;
      var old = hovered;
      hovered = -1;
      for (var i = 0; i < kpis.length; i++) {
        var col = i % cols, row = Math.floor(i / cols);
        var cx = 20 + col * gw + gw / 2;
        var cy = 60 + row * gh + gh / 2 + 10;
        var dx = mx - cx, dy = my - cy;
        if (Math.sqrt(dx * dx + dy * dy) < 60) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 5: Project Interconnection Web (Canvas 640x400)
   * Network graph showing shared technologies between projects
   * ================================================================ */
  function buildInterconnectionWeb() {
    var techs = ['Three.js', 'Tone.js', 'Canvas', 'WebAudio', 'PWA', 'Leaflet', 'Touch', 'Geolocation'];
    var techColors = { 'Three.js': '#f43f5e', 'Tone.js': '#c084fc', 'Canvas': '#6366f1', 'WebAudio': '#22d3ee', 'PWA': '#4ade80', 'Leaflet': '#86efac', 'Touch': '#f59e0b', 'Geolocation': '#a3e635' };

    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var cx = W / 2, cy = 220;
    var hovered = -1;

    var positions = PROJECTS.map(function (_, i) {
      var angle = (Math.PI * 2 * i / PROJECTS.length) - Math.PI / 2;
      return { x: cx + 155 * Math.cos(angle), y: cy + 135 * Math.sin(angle) };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Project Interconnection Web', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Shared technologies connect projects — hover a node', W / 2, 36);

      for (var i = 0; i < PROJECTS.length; i++) {
        for (var j = i + 1; j < PROJECTS.length; j++) {
          var shared = PROJECTS[i].tech.filter(function (t) { return PROJECTS[j].tech.indexOf(t) >= 0; });
          if (shared.length > 0) {
            var isConnected = hovered === i || hovered === j;
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.strokeStyle = isConnected ? 'rgba(99,102,241,.5)' : 'rgba(99,102,241,.1)';
            ctx.lineWidth = isConnected ? shared.length * 1.5 : shared.length * 0.8;
            ctx.stroke();
          }
        }
      }

      for (var i = 0; i < PROJECTS.length; i++) {
        var p = positions[i];
        var isHov = hovered === i;
        var nodeR = isHov ? 22 : 18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? PROJECTS[i].color : hexToRgba(PROJECTS[i].color, 0.6);
        ctx.fill();
        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.font = (isHov ? 'bold 11' : '9') + 'px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        var labelY = p.y < cy ? p.y - nodeR - 6 : p.y + nodeR + 12;
        ctx.fillText(PROJECTS[i].name, p.x, labelY);

        if (isHov) {
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = cText3();
          ctx.fillText(PROJECTS[i].tech.join(' • '), p.x, labelY + 12);
        }
      }

      var lx = 10, ly = H - 20;
      ctx.font = '9px -apple-system,sans-serif';
      for (var t = 0; t < techs.length; t++) {
        ctx.fillStyle = techColors[techs[t]] || '#6366f1';
        ctx.fillRect(lx, ly - 8, 8, 8);
        ctx.fillStyle = cText3();
        ctx.textAlign = 'left';
        ctx.fillText(techs[t], lx + 12, ly);
        lx += ctx.measureText(techs[t]).width + 22;
      }
    }

    function hexToRgba(hex, a) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var old = hovered;
      hovered = -1;
      for (var i = 0; i < PROJECTS.length; i++) {
        var dx = mx - positions[i].x, dy = my - positions[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < 25) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 6: Performance Budget Tracker (Canvas 600x380)
   * 12 projects × 4 performance categories — budget vs actual bar
   * ================================================================ */
  function buildPerfBudget() {
    var categories = ['Load Time', 'Memory', 'Render FPS', 'Bundle Size'];
    var catColors = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b'];
    var budgets = [2.0, 50, 60, 300];
    var units = ['s', 'MB', 'fps', 'KB'];
    var currentCat = 0;
    var actuals = PROJECTS.map(function (p) {
      return [
        +(1.2 + (p.loc / 100000) * 0.8 + (p.tech.indexOf('Three.js') >= 0 ? 0.3 : 0)).toFixed(1),
        Math.round(28 + (p.loc / 1000) * 0.8 + (p.tech.indexOf('Three.js') >= 0 ? 8 : 0)),
        Math.round(58 + (100 - p.complexity * 5)),
        Math.round(180 + p.loc / 100 + (p.tech.indexOf('Three.js') >= 0 ? 40 : 0))
      ];
    });

    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Performance Budget Tracker — ' + categories[currentCat], W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Budget: ' + budgets[currentCat] + units[currentCat] + ' — green = within, red = over', W / 2, 36);

      var ox = 90, oy = 55, maxW = W - ox - 30, bh = (H - oy - 50) / PROJECTS.length - 3;
      var maxVal = budgets[currentCat] * 1.5;

      for (var i = 0; i < PROJECTS.length; i++) {
        var y = oy + i * (bh + 3);
        var val = actuals[i][currentCat];
        var budget = budgets[currentCat];
        var pct = val / maxVal;
        var barW = Math.min(pct, 1) * maxW;
        var withinBudget = currentCat === 2 ? val >= budget : val <= budget;

        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = hovered === i ? PROJECTS[i].color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(PROJECTS[i].name, ox - 8, y + bh / 2 + 4);

        ctx.fillStyle = withinBudget ? 'rgba(34,197,94,.6)' : 'rgba(244,63,94,.5)';
        ctx.beginPath();
        ctx.roundRect(ox, y, barW, bh, 3);
        ctx.fill();

        if (hovered === i) {
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.fillStyle = cText();
          ctx.textAlign = 'left';
          ctx.fillText(val + units[currentCat], ox + barW + 6, y + bh / 2 + 4);
        }
      }

      var budgetX = ox + (budgets[currentCat] / maxVal) * maxW;
      ctx.beginPath();
      ctx.moveTo(budgetX, oy - 5);
      ctx.lineTo(budgetX, H - 45);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.textAlign = 'center';
      ctx.fillText('Budget: ' + budgets[currentCat] + units[currentCat], budgetX, oy - 10);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 55, bh = (H - oy - 50) / PROJECTS.length - 3;
      var old = hovered;
      hovered = -1;
      for (var i = 0; i < PROJECTS.length; i++) {
        var y = oy + i * (bh + 3);
        if (my >= y && my <= y + bh) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return { canvas: cc.canvas, setCategory: function (idx) { currentCat = idx; draw(); } };
  }

  /* ================================================================
   * SECTION 7: Portfolio Maturity Assessment (Canvas 620x400)
   * 8 maturity dimensions — donut gauge + metrics
   * ================================================================ */
  function buildMaturityAssessment() {
    var dimensions = [
      { label: 'Code Quality', value: 87, color: '#6366f1' },
      { label: 'Feature Richness', value: 92, color: '#22d3ee' },
      { label: 'UX/UI Polish', value: 89, color: '#4ade80' },
      { label: 'Performance', value: 84, color: '#f59e0b' },
      { label: 'Accessibility', value: 76, color: '#c084fc' },
      { label: 'Documentation', value: 78, color: '#f43f5e' },
      { label: 'Testing', value: 81, color: '#38bdf8' },
      { label: 'Innovation', value: 94, color: '#34d399' }
    ];

    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Maturity Assessment', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('8 dimensions — hover segments for details', W / 2, 36);

      var cx = W / 2, cy = 200, outerR = 120, innerR = 70;
      var total = dimensions.reduce(function (a, d) { return a + d.value; }, 0);
      var startAngle = -Math.PI / 2;

      for (var i = 0; i < dimensions.length; i++) {
        var sweep = (dimensions[i].value / total) * Math.PI * 2;
        var isHov = hovered === i;
        var r = isHov ? outerR + 8 : outerR;

        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, startAngle + sweep);
        ctx.arc(cx, cy, innerR, startAngle + sweep, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = isHov ? dimensions[i].color : hexToRgba(dimensions[i].color, 0.7);
        ctx.fill();

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          var midAngle = startAngle + sweep / 2;
          var lx = cx + (r + 20) * Math.cos(midAngle);
          var ly = cy + (r + 20) * Math.sin(midAngle);
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.fillStyle = cText();
          ctx.textAlign = midAngle > Math.PI / 2 ? 'right' : 'left';
          ctx.fillText(dimensions[i].label + ': ' + dimensions[i].value + '%', lx, ly + 4);
        }

        startAngle += sweep;
      }

      var avg = Math.round(total / dimensions.length);
      var grade = avg >= 90 ? 'S' : avg >= 80 ? 'A' : avg >= 70 ? 'B' : avg >= 60 ? 'C' : 'D';
      var gradeColor = grade === 'S' ? '#22c55e' : grade === 'A' ? '#4ade80' : '#f59e0b';
      ctx.font = 'bold 32px -apple-system,sans-serif';
      ctx.fillStyle = gradeColor;
      ctx.textAlign = 'center';
      ctx.fillText(grade, cx, cy + 5);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText(avg + '% overall', cx, cy + 22);

      var lx = 20, ly = H - 30;
      ctx.font = '9px -apple-system,sans-serif';
      for (var d = 0; d < dimensions.length; d++) {
        ctx.fillStyle = dimensions[d].color;
        ctx.fillRect(lx, ly - 8, 8, 8);
        ctx.fillStyle = cText3();
        ctx.textAlign = 'left';
        ctx.fillText(dimensions[d].label, lx + 12, ly);
        lx += ctx.measureText(dimensions[d].label).width + 22;
        if (lx > W - 80 && d < dimensions.length - 1) { lx = 20; ly += 16; }
      }
    }

    function hexToRgba(hex, a) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var cx = W / 2, cy = 200;
      var dx = mx - cx, dy = my - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var old = hovered;
      hovered = -1;
      if (dist >= 70 && dist <= 130) {
        var angle = Math.atan2(dy, dx);
        if (angle < -Math.PI / 2) angle += Math.PI * 2;
        var total = dimensions.reduce(function (a, d) { return a + d.value; }, 0);
        var cumAngle = -Math.PI / 2;
        for (var i = 0; i < dimensions.length; i++) {
          var sweep = (dimensions[i].value / total) * Math.PI * 2;
          if (angle >= cumAngle && angle < cumAngle + sweep) { hovered = i; break; }
          cumAngle += sweep;
        }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 8: User Engagement Funnel (Canvas 620x380)
   * 6 engagement stages as funnel visualization
   * ================================================================ */
  function buildEngagementFunnel() {
    var stages = [
      { label: 'Page Visit', value: 10800, color: '#6366f1' },
      { label: 'Project Click', value: 7200, color: '#22d3ee' },
      { label: 'Feature Explored', value: 5400, color: '#4ade80' },
      { label: 'Quiz Attempted', value: 3600, color: '#f59e0b' },
      { label: 'Achievement Earned', value: 2400, color: '#c084fc' },
      { label: 'Return Visit', value: 1800, color: '#f43f5e' }
    ];

    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('User Engagement Funnel', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Session flow from visit to retention — hover for conversion rates', W / 2, 36);

      var ox = 80, oy = 55, maxW = W - 160, totalH = H - oy - 50;
      var segH = totalH / stages.length;
      var maxVal = stages[0].value;

      for (var i = 0; i < stages.length; i++) {
        var y = oy + i * segH;
        var barW = (stages[i].value / maxVal) * maxW;
        var nextW = i < stages.length - 1 ? (stages[i + 1].value / maxVal) * maxW : barW * 0.7;
        var isHov = hovered === i;
        var cx = W / 2;

        ctx.beginPath();
        ctx.moveTo(cx - barW / 2, y);
        ctx.lineTo(cx + barW / 2, y);
        ctx.lineTo(cx + nextW / 2, y + segH);
        ctx.lineTo(cx - nextW / 2, y + segH);
        ctx.closePath();
        ctx.fillStyle = isHov ? stages[i].color : hexToRgba(stages[i].color, 0.65);
        ctx.fill();
        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.font = (isHov ? 'bold 12' : '11') + 'px -apple-system,sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(stages[i].label, cx, y + segH / 2 - 2);
        ctx.font = 'bold 13px Courier New,monospace';
        ctx.fillText(stages[i].value.toLocaleString(), cx, y + segH / 2 + 14);

        if (i > 0) {
          var convRate = Math.round((stages[i].value / stages[i - 1].value) * 100);
          ctx.font = '10px -apple-system,sans-serif';
          ctx.fillStyle = cText3();
          ctx.textAlign = 'left';
          ctx.fillText(convRate + '%', cx + barW / 2 + 10, y + 8);
        }
      }
    }

    function hexToRgba(hex, a) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 55, segH = (H - oy - 50) / stages.length;
      var old = hovered;
      hovered = -1;
      for (var i = 0; i < stages.length; i++) {
        var y = oy + i * segH;
        if (my >= y && my <= y + segH) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * BUILD ALL SECTIONS
   * ================================================================ */
  function buildAllSections() {
    var anchor = $('footer');
    if (!anchor) return;

    var sections = [
      { id: 'v23-maintain', title: 'Code Maintainability Spectrum', sub: '12 projects × 6 metrics — hover to see individual breakdown', builder: function (wrap) { wrap.appendChild(buildMaintainabilitySpectrum()); }, sfxName: 'maintain' },
      { id: 'v23-techdebt', title: 'Technical Debt Radar', sub: '6 debt dimensions per project — click to cycle projects', builder: function (wrap) { wrap.appendChild(buildTechDebtRadar()); }, sfxName: 'techdebt' },
      { id: 'v23-impact', title: 'Release Impact Heatmap', sub: 'v18–v23 impact across 6 dimensions — hover cells', builder: function (wrap) { wrap.appendChild(buildReleaseImpact()); }, sfxName: 'impact' },
      { id: 'v23-productivity', title: 'Developer Productivity Dashboard', sub: '6 KPI gauges — hover for details', builder: function (wrap) { wrap.appendChild(buildProductivityDashboard()); }, sfxName: 'productivity' },
      { id: 'v23-interconnect', title: 'Project Interconnection Web', sub: 'Shared technologies form connections — hover a project node', builder: function (wrap) { wrap.appendChild(buildInterconnectionWeb()); }, sfxName: 'interconnect' },
      { id: 'v23-perfbudget', title: 'Performance Budget Tracker', sub: 'Budget vs actual per project — click tabs to switch metrics', builder: function (wrap) {
        var result = buildPerfBudget();
        var tabWrap = el('div', { className: 'v23-tabs' });
        var labels = ['Load Time', 'Memory', 'Render FPS', 'Bundle Size'];
        labels.forEach(function (m, i) {
          var btn = el('button', { className: 'v23-tab' + (i === 0 ? ' active' : ''), textContent: m, onClick: function () {
            tabWrap.querySelectorAll('.v23-tab').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            result.setCategory(i);
          }});
          tabWrap.appendChild(btn);
        });
        wrap.appendChild(tabWrap);
        wrap.appendChild(result.canvas);
      }, sfxName: 'perfbudget' },
      { id: 'v23-maturity', title: 'Portfolio Maturity Assessment', sub: '8 dimensions donut gauge — hover segments', builder: function (wrap) { wrap.appendChild(buildMaturityAssessment()); }, sfxName: 'maturity' },
      { id: 'v23-engagement', title: 'User Engagement Funnel', sub: 'Session flow from visit to retention — hover for conversion rates', builder: function (wrap) { wrap.appendChild(buildEngagementFunnel()); }, sfxName: 'engagement' }
    ];

    sections.forEach(function (sec) {
      var section = el('section', { className: 'v23-section section-reveal', id: sec.id });
      section.appendChild(el('h2', { textContent: sec.title }));
      section.appendChild(el('p', { className: 'v23-section-sub', textContent: sec.sub }));
      var card = el('div', { className: 'v23-card' });
      sec.builder(card);
      section.appendChild(card);
      anchor.parentNode.insertBefore(section, anchor);

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('revealed'); sfx(sec.sfxName); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      obs.observe(section);
    });

    showToast('v23.0', '8 new analytics canvases • 310K+ LOC • 12 SFX • Project data updated');
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+I~P + Shift+0)
   * ================================================================ */
  var sectionIds = ['v23-maintain', 'v23-techdebt', 'v23-impact', 'v23-productivity', 'v23-interconnect', 'v23-perfbudget', 'v23-maturity', 'v23-engagement'];
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var idx = -1;
    if (e.code === 'KeyI') idx = 0;
    else if (e.code === 'KeyJ') idx = 1;
    else if (e.code === 'KeyK') idx = 2;
    else if (e.code === 'KeyL') idx = 3;
    else if (e.code === 'KeyM') idx = 4;
    else if (e.code === 'KeyN') idx = 5;
    else if (e.code === 'KeyO') idx = 6;
    else if (e.code === 'KeyP') idx = 7;
    if (idx >= 0) {
      e.preventDefault();
      var target = document.getElementById(sectionIds[idx]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section23'); }
    }
  });

  /* ================================================================
   * INIT
   * ================================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildAllSections);
  } else {
    buildAllSections();
  }
})();
