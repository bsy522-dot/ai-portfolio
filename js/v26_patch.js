/**
 * ai-portfolio v26.0 Patch Module
 * Last updated: 2026-08-06
 */
;(function () {
  'use strict';
  if (window._v26) return;
  window._v26 = { version: '26.0.0', applied: Date.now() };

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
   * PROJECT DATA (v26.0 — all 12 repos updated to latest 2026-08-06)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v31.0', loc: 35600, features: 336, quizzes: 360, achievements: 264, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.6, testCoverage: 86, uxScore: 92 },
    { name: 'SmartGolf', ver: 'v39.0', loc: 33800, features: 326, quizzes: 332, achievements: 332, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 9.2, testCoverage: 89, uxScore: 95 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86 },
    { name: 'Piano', ver: 'v27.0', loc: 31000, features: 264, quizzes: 270, achievements: 264, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.9, testCoverage: 84, uxScore: 94 },
    { name: 'Boxing', ver: 'v28.0', loc: 30400, features: 262, quizzes: 300, achievements: 262, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.1, testCoverage: 83, uxScore: 91 },
    { name: 'Karaoke', ver: 'v27.0', loc: 29400, features: 258, quizzes: 312, achievements: 258, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 8.7, testCoverage: 85, uxScore: 93 },
    { name: 'Violin', ver: 'v26.0', loc: 28600, features: 262, quizzes: 255, achievements: 262, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.0, testCoverage: 81, uxScore: 92 },
    { name: 'City Builder', ver: 'v25.0', loc: 27800, features: 278, quizzes: 325, achievements: 278, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 8.8, testCoverage: 87, uxScore: 90 },
    { name: 'House Builder', ver: 'v25.0', loc: 27200, features: 278, quizzes: 315, achievements: 278, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.6, testCoverage: 80, uxScore: 89 },
    { name: 'Golf Tracker', ver: 'v25.0', loc: 25400, features: 204, quizzes: 270, achievements: 204, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.3, testCoverage: 86, uxScore: 91 },
    { name: 'Hatcuping', ver: 'v27.0', loc: 23400, features: 262, quizzes: 285, achievements: 262, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 8.2, testCoverage: 79, uxScore: 94 },
    { name: 'CCF', ver: 'v23.0', loc: 21200, features: 246, quizzes: 285, achievements: 246, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 8.0, testCoverage: 88, uxScore: 92 }
  ];
  var TOTAL_LOC = 370000;
  var TOTAL_SESSIONS = 12600;

  /* ================================================================
   * CSS (v26)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v26-patch-styles';
  style.textContent = [
    '.v26-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v26-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v26-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v26-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v26-canvas{display:block;margin:0 auto}',
    '.v26-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v26-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v26-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v26-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v26-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v26-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v26-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v26)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav26: function () { tone(1319, 0.06, 'sine'); },
    section26: function () { tone(988, 0.08, 'triangle'); },
    tab26: function () { tone(1760, 0.05, 'sine'); },
    depgraph: function () { tone(587, 0.1, 'triangle'); tone(740, 0.07, 'sine', 0.08); },
    bugdensity: function () { tone(494, 0.1, 'sine'); tone(622, 0.07, 'triangle', 0.07); },
    milestone: function () { tone(659, 0.12, 'triangle'); tone(831, 0.08, 'sine', 0.1); },
    techdebt: function () { tone(392, 0.1, 'sine'); tone(494, 0.06, 'triangle', 0.08); },
    teamload: function () { tone(523, 0.1, 'triangle'); tone(659, 0.07, 'sine', 0.08); },
    momentum: function () { tone(440, 0.08, 'sine'); tone(554, 0.06, 'triangle', 0.06); },
    coverage: function () { tone(698, 0.1, 'triangle'); tone(880, 0.06, 'sine', 0.08); },
    ecosystem: function () { tone(784, 0.12, 'sine'); tone(988, 0.08, 'triangle', 0.1); },
    hover26: function () { tone(2349, 0.03, 'sine'); },
    click26: function () { tone(1175, 0.04, 'triangle'); tone(1480, 0.03, 'sine', 0.03); },
    reveal26: function () { tone(494, 0.1, 'sine'); tone(622, 0.07, 'triangle', 0.07); tone(740, 0.05, 'sine', 0.12); },
    grade26: function () { tone(880, 0.08, 'triangle'); tone(1175, 0.06, 'sine', 0.06); },
    toast26: function () { tone(1319, 0.06, 'sine'); tone(1661, 0.04, 'triangle', 0.05); }
  };
  function sfx(name) {
    try { if (SFX_MAP[name]) SFX_MAP[name](); } catch (e) {}
  }
  function tone(freq, dur, type, delay) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ctx.currentTime + (delay || 0));
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (delay || 0) + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + (delay || 0));
    osc.stop(ctx.currentTime + (delay || 0) + dur + 0.05);
  }

  /* ================================================================
   * TOAST NOTIFICATION
   * ================================================================ */
  function showToast(title, msg) {
    var t = el('div', { style: { position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%) translateY(30px)', background: 'rgba(99,102,241,.95)', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', zIndex: '10002', opacity: '0', transition: 'all .4s', backdropFilter: 'blur(10px)', maxWidth: '90vw', textAlign: 'center', boxShadow: '0 8px 30px rgba(99,102,241,.4)' } });
    t.textContent = title + ' — ' + msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(30px)'; setTimeout(function () { t.remove(); }, 400); }, 4000);
    sfx('toast26');
  }

  /* ================================================================
   * UTILITY
   * ================================================================ */
  function isDark() { return document.documentElement.getAttribute('data-theme') !== 'light'; }
  function cText() { return isDark() ? '#e2e8f0' : '#1e293b'; }
  function cText2() { return isDark() ? '#94a3b8' : '#475569'; }
  function cText3() { return isDark() ? '#64748b' : '#94a3b8'; }
  function cCard() { return isDark() ? '#12122a' : '#ffffff'; }
  function cGrid() { return isDark() ? 'rgba(99,102,241,.08)' : 'rgba(99,102,241,.06)'; }

  function createCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    canvas.className = 'v26-canvas';
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    return { canvas: canvas, ctx: canvas.getContext('2d'), w: w, h: h };
  }

  function gradeFor(score, max) {
    var pct = score / max;
    if (pct >= 0.9) return { grade: 'S', color: '#fbbf24' };
    if (pct >= 0.8) return { grade: 'A', color: '#4ade80' };
    if (pct >= 0.7) return { grade: 'B', color: '#22d3ee' };
    if (pct >= 0.6) return { grade: 'C', color: '#fb923c' };
    return { grade: 'D', color: '#f43f5e' };
  }

  /* ================================================================
   * 1. DEPENDENCY GRAPH (Canvas 640x400)
   *    12 projects technology dependency network with force layout
   * ================================================================ */
  function buildDependencyGraph() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var techList = ['Three.js', 'Tone.js', 'Canvas', 'WebAudio', 'PWA', 'Leaflet', 'Touch', 'Geolocation'];
    var techColors = ['#f43f5e', '#a78bfa', '#6366f1', '#22d3ee', '#4ade80', '#34d399', '#fbbf24', '#fb923c'];
    var cx = W / 2, cy = H / 2;

    var nodes = PROJECTS.map(function (p, i) {
      var angle = (i / PROJECTS.length) * Math.PI * 2 - Math.PI / 2;
      var rx = 200, ry = 140;
      return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry, p: p, idx: i };
    });
    var techNodes = techList.map(function (t, i) {
      var angle = (i / techList.length) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(angle) * 85, y: cy + Math.sin(angle) * 65, name: t, color: techColors[i] };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Technology Dependency Network', W / 2, 20);

      nodes.forEach(function (n) {
        n.p.tech.forEach(function (t) {
          var ti = techList.indexOf(t);
          if (ti < 0) return;
          var tn = techNodes[ti];
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(tn.x, tn.y);
          ctx.strokeStyle = hovIdx === n.idx ? tn.color : (isDark() ? 'rgba(99,102,241,.12)' : 'rgba(99,102,241,.1)');
          ctx.lineWidth = hovIdx === n.idx ? 2.5 : 1;
          ctx.stroke();
        });
      });

      techNodes.forEach(function (tn) {
        ctx.beginPath();
        ctx.arc(tn.x, tn.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = tn.color + '33';
        ctx.fill();
        ctx.strokeStyle = tn.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = tn.color;
        ctx.fillText(tn.name, tn.x, tn.y + 26);
      });

      nodes.forEach(function (n, i) {
        var r = hovIdx === i ? 22 : 18;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.p.color + (hovIdx === i ? '55' : '22');
        ctx.fill();
        ctx.strokeStyle = n.p.color;
        ctx.lineWidth = hovIdx === i ? 2.5 : 1.5;
        ctx.stroke();
        ctx.font = (hovIdx === i ? 'bold 11px' : '10px') + ' -apple-system,sans-serif';
        ctx.fillStyle = hovIdx === i ? cText() : cText2();
        ctx.textAlign = 'center';
        ctx.fillText(n.p.name, n.x, n.y + 3);
        if (hovIdx === i) {
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = n.p.color;
          ctx.fillText(n.p.ver + ' | ' + n.p.tech.join(', '), n.x, n.y + r + 14);
        }
      });

      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.fillText(PROJECTS.length + ' projects × ' + techList.length + ' technologies — hover to explore', W / 2, H - 12);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var old = hovIdx; hovIdx = -1;
      nodes.forEach(function (n, i) {
        if (Math.hypot(mx - n.x, my - n.y) < 22) hovIdx = i;
      });
      if (hovIdx !== old) { draw(); if (hovIdx >= 0) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 2. BUG DENSITY HEATMAP (Canvas 620x400)
   *    12 projects x 6 quality categories heatmap
   * ================================================================ */
  function buildBugDensityHeatmap() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var cats = ['Logic', 'UI/UX', 'Perf', 'Security', 'A11y', 'Compat'];
    var catColors = ['#f43f5e', '#6366f1', '#fbbf24', '#22d3ee', '#4ade80', '#fb923c'];
    var hovCell = null;

    var data = PROJECTS.map(function (p) {
      var base = 100 - p.testCoverage;
      return cats.map(function (_, ci) {
        var noise = Math.sin(p.complexity * (ci + 1) * 1.37) * 4;
        return Math.max(0, Math.min(10, Math.round(base / 3 + noise)));
      });
    });

    function cellColor(val) {
      if (val <= 2) return '#22c55e';
      if (val <= 4) return '#a3e635';
      if (val <= 6) return '#fbbf24';
      if (val <= 8) return '#fb923c';
      return '#ef4444';
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var left = 100, top = 50, cw = (W - left - 30) / cats.length, ch = (H - top - 60) / PROJECTS.length;

      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Code Quality Density Matrix', W / 2, 22);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.fillText('Lower = better quality (0–10 scale)', W / 2, 38);

      ctx.textAlign = 'center';
      ctx.font = 'bold 10px -apple-system,sans-serif';
      cats.forEach(function (c, ci) {
        ctx.fillStyle = catColors[ci];
        ctx.fillText(c, left + ci * cw + cw / 2, top - 6);
      });

      ctx.textAlign = 'right';
      ctx.font = '10px -apple-system,sans-serif';
      PROJECTS.forEach(function (p, pi) {
        ctx.fillStyle = p.color;
        ctx.fillText(p.name, left - 8, top + pi * ch + ch / 2 + 3);
      });

      PROJECTS.forEach(function (p, pi) {
        cats.forEach(function (c, ci) {
          var x = left + ci * cw, y = top + pi * ch;
          var val = data[pi][ci];
          var isHov = hovCell && hovCell[0] === pi && hovCell[1] === ci;
          ctx.fillStyle = cellColor(val) + (isHov ? 'cc' : '66');
          ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
          ctx.fillStyle = cText();
          ctx.textAlign = 'center';
          ctx.font = (isHov ? 'bold 11px' : '10px') + ' -apple-system,sans-serif';
          ctx.fillText(val, x + cw / 2, y + ch / 2 + 4);
        });
      });

      if (hovCell) {
        var p = PROJECTS[hovCell[0]], val = data[hovCell[0]][hovCell[1]];
        var g = gradeFor(10 - val, 10);
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(p.name + ' × ' + cats[hovCell[1]] + ': ' + val + '/10 issues — Grade ', W / 2 - 20, H - 16);
        ctx.fillStyle = g.color;
        ctx.fillText(g.grade, W / 2 + 100, H - 16);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var left = 100, top = 50, cw = (W - left - 30) / cats.length, ch = (H - top - 60) / PROJECTS.length;
      var ci = Math.floor((mx - left) / cw), pi = Math.floor((my - top) / ch);
      var old = hovCell ? hovCell[0] * 10 + hovCell[1] : -1;
      hovCell = (ci >= 0 && ci < cats.length && pi >= 0 && pi < PROJECTS.length) ? [pi, ci] : null;
      var cur = hovCell ? hovCell[0] * 10 + hovCell[1] : -1;
      if (old !== cur) { draw(); if (hovCell) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovCell = null; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 3. MILESTONE TIMELINE (Canvas 640x400)
   *    Project version milestones from v10 to v26
   * ================================================================ */
  function buildMilestoneTimeline() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var milestones = [
      { ver: 'v10', date: '2025-01', desc: 'Initial launch with 6 projects', features: 48, color: '#6366f1' },
      { ver: 'v12', date: '2025-03', desc: 'Canvas visualizations added to all', features: 96, color: '#22d3ee' },
      { ver: 'v15', date: '2025-06', desc: 'PRISM suite expanded to 9 games', features: 180, color: '#4ade80' },
      { ver: 'v18', date: '2025-09', desc: 'PWA + Service Workers deployed', features: 420, color: '#fbbf24' },
      { ver: 'v20', date: '2025-11', desc: '200K LOC milestone reached', features: 800, color: '#f43f5e' },
      { ver: 'v22', date: '2026-03', desc: 'Quiz system 2000+ questions', features: 1600, color: '#a78bfa' },
      { ver: 'v24', date: '2026-06', desc: '300K LOC, 2500+ achievements', features: 2800, color: '#fb923c' },
      { ver: 'v26', date: '2026-08', desc: '370K LOC, 12 repos auto-evolving', features: 3200, color: '#c084fc' }
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Evolution Timeline', W / 2, 22);

      var left = 60, right = W - 40, top = 70, bottom = H - 60;
      var trackY = top + (bottom - top) * 0.4;

      ctx.beginPath();
      ctx.moveTo(left, trackY);
      ctx.lineTo(right, trackY);
      ctx.strokeStyle = cGrid();
      ctx.lineWidth = 3;
      ctx.stroke();

      var gap = (right - left) / (milestones.length - 1);
      milestones.forEach(function (m, i) {
        var x = left + i * gap;
        var isHov = hovIdx === i;
        var above = i % 2 === 0;
        var dy = above ? -1 : 1;

        ctx.beginPath();
        ctx.arc(x, trackY, isHov ? 10 : 7, 0, Math.PI * 2);
        ctx.fillStyle = m.color + (isHov ? 'cc' : '88');
        ctx.fill();
        ctx.strokeStyle = m.color;
        ctx.lineWidth = isHov ? 2.5 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, trackY + dy * (isHov ? 10 : 7));
        ctx.lineTo(x, trackY + dy * 55);
        ctx.strokeStyle = m.color + '44';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = 'bold 12px -apple-system,sans-serif';
        ctx.fillStyle = m.color;
        ctx.fillText(m.ver, x, trackY + dy * 68);
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.fillText(m.date, x, trackY + dy * 82);

        if (isHov) {
          ctx.font = '11px -apple-system,sans-serif';
          ctx.fillStyle = cText();
          ctx.fillText(m.desc, x, trackY + dy * 97);
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.fillStyle = m.color;
          ctx.fillText(m.features + ' cumulative features', x, trackY + dy * 112);
        }
      });

      var barH = 6, barTop = bottom + 5;
      ctx.fillStyle = cGrid();
      ctx.fillRect(left, barTop, right - left, barH);
      var prog = (right - left);
      var grd = ctx.createLinearGradient(left, 0, left + prog, 0);
      grd.addColorStop(0, '#6366f1');
      grd.addColorStop(0.5, '#22d3ee');
      grd.addColorStop(1, '#4ade80');
      ctx.fillStyle = grd;
      ctx.fillRect(left, barTop, prog, barH);

      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'center';
      ctx.fillText(milestones.length + ' major milestones — ' + milestones[milestones.length - 1].features + ' features shipped', W / 2, H - 12);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var left = 60, right = W - 40;
      var gap = (right - left) / (milestones.length - 1);
      var old = hovIdx; hovIdx = -1;
      milestones.forEach(function (m, i) {
        if (Math.abs(mx - (left + i * gap)) < 25) hovIdx = i;
      });
      if (hovIdx !== old) { draw(); if (hovIdx >= 0) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 4. TECH DEBT TRACKER (Canvas 620x400)
   *    6 debt categories × 12 projects stacked horizontal bar
   * ================================================================ */
  function buildTechDebtTracker() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var cats = ['Duplication', 'Complexity', 'Coverage Gap', 'Deps Outdated', 'Doc Debt', 'Style Debt'];
    var catColors = ['#f43f5e', '#fb923c', '#fbbf24', '#22d3ee', '#a78bfa', '#6366f1'];
    var hovIdx = -1;

    var debts = PROJECTS.map(function (p) {
      return cats.map(function (_, ci) {
        var base = (100 - p.testCoverage) * 0.6 + (10 - p.complexity) * 2;
        var noise = Math.sin(p.loc / 5000 * (ci + 1)) * 5;
        return Math.max(1, Math.min(20, Math.round(base + noise)));
      });
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var left = 100, top = 55, barH = (H - top - 65) / PROJECTS.length - 2, maxTotal = 0;

      debts.forEach(function (d) {
        var t = d.reduce(function (a, b) { return a + b; }, 0);
        if (t > maxTotal) maxTotal = t;
      });

      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Technical Debt Distribution', W / 2, 22);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.fillText('Lower total = healthier codebase', W / 2, 38);

      PROJECTS.forEach(function (p, pi) {
        var y = top + pi * (barH + 2);
        var isHov = hovIdx === pi;
        ctx.textAlign = 'right';
        ctx.font = (isHov ? 'bold 11px' : '10px') + ' -apple-system,sans-serif';
        ctx.fillStyle = isHov ? p.color : cText2();
        ctx.fillText(p.name, left - 8, y + barH / 2 + 4);

        var x = left;
        var avail = W - left - 60;
        debts[pi].forEach(function (v, ci) {
          var w = (v / maxTotal) * avail;
          ctx.fillStyle = catColors[ci] + (isHov ? 'bb' : '66');
          ctx.fillRect(x, y, w, barH);
          x += w;
        });

        var total = debts[pi].reduce(function (a, b) { return a + b; }, 0);
        ctx.textAlign = 'left';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.fillText(total, x + 5, y + barH / 2 + 3);
      });

      var legY = H - 22;
      ctx.textAlign = 'center';
      var legX = W / 2 - cats.length * 42;
      cats.forEach(function (c, ci) {
        ctx.fillStyle = catColors[ci] + '99';
        ctx.fillRect(legX + ci * 84, legY - 7, 10, 10);
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.fillText(c, legX + ci * 84 + 44, legY + 2);
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var top2 = 55, barH = (H - top2 - 65) / PROJECTS.length - 2;
      var old = hovIdx; hovIdx = -1;
      PROJECTS.forEach(function (_, i) {
        var y = top2 + i * (barH + 2);
        if (my >= y && my <= y + barH) hovIdx = i;
      });
      if (hovIdx !== old) { draw(); if (hovIdx >= 0) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 5. TEAM WORKLOAD BALANCE (Canvas 620x400)
   *    8 development roles allocation across 3 project groups
   * ================================================================ */
  function buildTeamWorkload() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var roles = ['Frontend', 'Backend', 'Audio', '3D Engine', 'Content', 'Testing', 'DevOps', 'Design'];
    var roleColors = ['#6366f1', '#22d3ee', '#a78bfa', '#f43f5e', '#4ade80', '#fbbf24', '#fb923c', '#c084fc'];
    var groups = ['NEXTERA', 'PRISM Core', 'PRISM Extra'];
    var groupColors = ['#22d3ee', '#6366f1', '#4ade80'];
    var alloc = [
      [25, 20, 5, 5, 20, 15, 5, 5],
      [30, 15, 20, 20, 10, 3, 1, 1],
      [20, 10, 15, 15, 20, 12, 4, 4]
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Team Workload Distribution', W / 2, 22);

      var left = 110, top = 55, barW = (W - left - 40) / groups.length - 10;
      var maxVal = 35, chartH = H - top - 70;

      for (var g = 0; g <= 5; g++) {
        var y = top + (chartH / 5) * g;
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(W - 30, y);
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.fillText((maxVal - g * 7) + '%', left - 6, y + 3);
      }

      groups.forEach(function (gName, gi) {
        var gx = left + gi * (barW + 10);
        ctx.textAlign = 'center';
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillStyle = groupColors[gi];
        ctx.fillText(gName, gx + barW / 2, top - 10);

        var subW = barW / roles.length;
        roles.forEach(function (r, ri) {
          var val = alloc[gi][ri];
          var h = (val / maxVal) * chartH;
          var x = gx + ri * subW;
          var y = top + chartH - h;
          var isHov = hovIdx === gi * 10 + ri;
          ctx.fillStyle = roleColors[ri] + (isHov ? 'cc' : '77');
          ctx.fillRect(x + 1, y, subW - 2, h);
          if (isHov) {
            ctx.font = 'bold 9px -apple-system,sans-serif';
            ctx.fillStyle = cText();
            ctx.textAlign = 'center';
            ctx.fillText(val + '%', x + subW / 2, y - 5);
          }
        });
      });

      var legY = H - 20;
      var legStart = W / 2 - roles.length * 38;
      roles.forEach(function (r, ri) {
        ctx.fillStyle = roleColors[ri] + '99';
        ctx.fillRect(legStart + ri * 76, legY - 7, 8, 8);
        ctx.font = '8px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.textAlign = 'left';
        ctx.fillText(r, legStart + ri * 76 + 11, legY);
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var left2 = 110, top2 = 55, barW = (W - left2 - 40) / groups.length - 10;
      var chartH = H - top2 - 70;
      var old = hovIdx; hovIdx = -1;
      groups.forEach(function (_, gi) {
        var gx = left2 + gi * (barW + 10);
        var subW = barW / roles.length;
        roles.forEach(function (_, ri) {
          var x = gx + ri * subW;
          if (mx >= x && mx <= x + subW && my >= top2 && my <= top2 + chartH) hovIdx = gi * 10 + ri;
        });
      });
      if (hovIdx !== old) { draw(); if (hovIdx >= 0) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 6. PROJECT MOMENTUM GAUGE (Canvas 600x380)
   *    12 projects release momentum semicircle gauges in 4x3 grid
   * ================================================================ */
  function buildMomentumGauge() {
    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var momentums = PROJECTS.map(function (p) {
      var verNum = parseInt(p.ver.slice(1));
      return Math.min(100, Math.round(verNum * 3.2 + p.uxScore * 0.3));
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Release Momentum Index', W / 2, 22);

      var cols = 4, rows = 3;
      var cellW = W / cols, cellH = (H - 45) / rows;

      PROJECTS.forEach(function (p, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var cx = col * cellW + cellW / 2;
        var cy = 50 + row * cellH + cellH / 2 + 5;
        var r = Math.min(cellW, cellH) * 0.3;
        var isHov = hovIdx === i;
        var val = momentums[i];
        var g = gradeFor(val, 100);

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI);
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 8;
        ctx.stroke();

        var endAngle = Math.PI + (val / 100) * Math.PI;
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, endAngle);
        ctx.strokeStyle = p.color + (isHov ? 'dd' : '99');
        ctx.lineWidth = isHov ? 10 : 8;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.lineCap = 'butt';

        ctx.font = (isHov ? 'bold 14px' : 'bold 12px') + ' -apple-system,sans-serif';
        ctx.fillStyle = isHov ? cText() : cText2();
        ctx.textAlign = 'center';
        ctx.fillText(val, cx, cy - 2);

        ctx.font = '8px -apple-system,sans-serif';
        ctx.fillStyle = g.color;
        ctx.fillText(g.grade, cx, cy + 10);

        ctx.font = (isHov ? 'bold 10px' : '9px') + ' -apple-system,sans-serif';
        ctx.fillStyle = p.color;
        ctx.fillText(p.name, cx, cy + r + 14);

        if (isHov) {
          ctx.font = '8px -apple-system,sans-serif';
          ctx.fillStyle = cText3();
          ctx.fillText(p.ver, cx, cy + r + 24);
        }
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var cols = 4, cellW = W / cols, cellH = (H - 45) / 3;
      var old = hovIdx; hovIdx = -1;
      PROJECTS.forEach(function (_, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var cx = col * cellW + cellW / 2;
        var cy = 50 + row * cellH + cellH / 2 + 5;
        if (Math.hypot(mx - cx, my - cy) < cellW * 0.35) hovIdx = i;
      });
      if (hovIdx !== old) { draw(); if (hovIdx >= 0) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 7. TEST COVERAGE RADAR (Canvas 620x400)
   *    12 projects 6-axis radar: Unit, Integration, E2E, Visual, Perf, A11y
   * ================================================================ */
  function buildCoverageRadar() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var selIdx = 0;
    var axes = ['Unit', 'Integration', 'E2E', 'Visual', 'Perf', 'A11y'];

    var coverages = PROJECTS.map(function (p) {
      var base = p.testCoverage;
      return axes.map(function (_, ai) {
        var offset = Math.sin(p.complexity * (ai + 1) * 0.7) * 12;
        return Math.max(30, Math.min(100, Math.round(base + offset)));
      });
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Test Coverage Radar', W / 2, 22);

      var cx = W / 2, cy = H / 2 + 15, r = 130;

      for (var ring = 1; ring <= 5; ring++) {
        var rr = r * ring / 5;
        ctx.beginPath();
        axes.forEach(function (_, ai) {
          var angle = (ai / axes.length) * Math.PI * 2 - Math.PI / 2;
          var x = cx + Math.cos(angle) * rr, y = cy + Math.sin(angle) * rr;
          ai === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      axes.forEach(function (a, ai) {
        var angle = (ai / axes.length) * Math.PI * 2 - Math.PI / 2;
        var x = cx + Math.cos(angle) * (r + 20), y = cy + Math.sin(angle) * (r + 20);
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(a, x, y);
      });
      ctx.textBaseline = 'alphabetic';

      var p = PROJECTS[selIdx], cov = coverages[selIdx];
      ctx.beginPath();
      cov.forEach(function (v, ai) {
        var angle = (ai / axes.length) * Math.PI * 2 - Math.PI / 2;
        var x = cx + Math.cos(angle) * (r * v / 100);
        var y = cy + Math.sin(angle) * (r * v / 100);
        ai === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = p.color + '33';
      ctx.fill();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      cov.forEach(function (v, ai) {
        var angle = (ai / axes.length) * Math.PI * 2 - Math.PI / 2;
        var x = cx + Math.cos(angle) * (r * v / 100);
        var y = cy + Math.sin(angle) * (r * v / 100);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(v + '%', x, y - 10);
      });

      var avg = Math.round(cov.reduce(function (a, b) { return a + b; }, 0) / cov.length);
      var g = gradeFor(avg, 100);
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.fillStyle = p.color;
      ctx.textAlign = 'center';
      ctx.fillText(p.name + ' ' + p.ver, cx, cy - r - 10);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Avg: ' + avg + '% — Grade ', cx - 15, H - 14);
      ctx.fillStyle = g.color;
      ctx.fillText(g.grade, cx + 40, H - 14);
    }

    cc.canvas.addEventListener('click', function () {
      selIdx = (selIdx + 1) % PROJECTS.length;
      draw();
      sfx('click26');
    });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 8. PORTFOLIO ECOSYSTEM OVERVIEW (Canvas 640x400)
   *    NEXTERA + PRISM ecosystem sunburst with 3 rings
   * ================================================================ */
  function buildEcosystemOverview() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovSeg = null;

    var groups = [
      { name: 'NEXTERA', color: '#22d3ee', projects: ['SmartGolf', 'CCF', 'Portfolio'], pct: 22 },
      { name: 'PRISM', color: '#6366f1', projects: ['History RPG', 'Piano', 'Boxing', 'Karaoke', 'Violin', 'Hatcuping', 'City Builder', 'House Builder', 'Golf Tracker'], pct: 78 }
    ];
    var techRing = [
      { name: 'Three.js', color: '#f43f5e', pct: 20 },
      { name: 'Tone.js', color: '#a78bfa', pct: 12 },
      { name: 'Canvas', color: '#6366f1', pct: 30 },
      { name: 'WebAudio', color: '#22d3ee', pct: 18 },
      { name: 'PWA', color: '#4ade80', pct: 15 },
      { name: 'Other', color: '#fbbf24', pct: 5 }
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Ecosystem Architecture', W / 2, 22);

      var cx = W / 2, cy = H / 2 + 10;
      var r1 = 50, r2 = 100, r3 = 150;

      ctx.beginPath();
      ctx.arc(cx, cy, r1, 0, Math.PI * 2);
      var coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
      coreGrd.addColorStop(0, '#6366f1' + '44');
      coreGrd.addColorStop(1, '#22d3ee' + '22');
      ctx.fillStyle = coreGrd;
      ctx.fill();
      ctx.strokeStyle = '#6366f1' + '66';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.fillText('PRIME', cx, cy - 5);
      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Holdings', cx, cy + 8);

      var angle = -Math.PI / 2;
      groups.forEach(function (g, gi) {
        var sweep = (g.pct / 100) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r2, angle, angle + sweep);
        ctx.arc(cx, cy, r1 + 5, angle + sweep, angle, true);
        ctx.closePath();
        var isHov = hovSeg && hovSeg[0] === 1 && hovSeg[1] === gi;
        ctx.fillStyle = g.color + (isHov ? '66' : '33');
        ctx.fill();
        ctx.strokeStyle = g.color + '88';
        ctx.lineWidth = 1;
        ctx.stroke();

        var mid = angle + sweep / 2;
        var lx = cx + Math.cos(mid) * (r1 + (r2 - r1) / 2 + 5);
        var ly = cy + Math.sin(mid) * (r1 + (r2 - r1) / 2 + 5);
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillStyle = g.color;
        ctx.textAlign = 'center';
        ctx.fillText(g.name, lx, ly + 3);

        angle += sweep;
      });

      var tAngle = -Math.PI / 2;
      techRing.forEach(function (t, ti) {
        var sweep = (t.pct / 100) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r3, tAngle, tAngle + sweep);
        ctx.arc(cx, cy, r2 + 5, tAngle + sweep, tAngle, true);
        ctx.closePath();
        var isHov = hovSeg && hovSeg[0] === 2 && hovSeg[1] === ti;
        ctx.fillStyle = t.color + (isHov ? '55' : '22');
        ctx.fill();
        ctx.strokeStyle = t.color + '66';
        ctx.lineWidth = 1;
        ctx.stroke();

        var mid = tAngle + sweep / 2;
        var lx = cx + Math.cos(mid) * (r2 + (r3 - r2) / 2 + 5);
        var ly = cy + Math.sin(mid) * (r2 + (r3 - r2) / 2 + 5);
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = t.color;
        ctx.textAlign = 'center';
        ctx.fillText(t.name + ' ' + t.pct + '%', lx, ly + 3);

        tAngle += sweep;
      });

      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'center';
      ctx.fillText('3-ring architecture: Core → Business Units → Technology Stack', W / 2, H - 12);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var cx = W / 2, cy = H / 2 + 10;
      var dist = Math.hypot(mx - cx, my - cy);
      var old = hovSeg ? hovSeg[0] * 10 + hovSeg[1] : -1;
      hovSeg = null;

      if (dist > 55 && dist < 100) {
        var ang = Math.atan2(my - cy, mx - cx);
        if (ang < -Math.PI / 2) ang += Math.PI * 2;
        var a = -Math.PI / 2, cumPct = 0;
        groups.forEach(function (g, gi) {
          var sweep = (g.pct / 100) * Math.PI * 2;
          var normAng = ang < a ? ang + Math.PI * 2 : ang;
          if (normAng >= a && normAng < a + sweep) hovSeg = [1, gi];
          a += sweep;
        });
      } else if (dist > 105 && dist < 150) {
        var ang2 = Math.atan2(my - cy, mx - cx);
        if (ang2 < -Math.PI / 2) ang2 += Math.PI * 2;
        var a2 = -Math.PI / 2;
        techRing.forEach(function (t, ti) {
          var sweep = (t.pct / 100) * Math.PI * 2;
          var normAng = ang2 < a2 ? ang2 + Math.PI * 2 : ang2;
          if (normAng >= a2 && normAng < a2 + sweep) hovSeg = [2, ti];
          a2 += sweep;
        });
      }
      var cur = hovSeg ? hovSeg[0] * 10 + hovSeg[1] : -1;
      if (old !== cur) { draw(); if (hovSeg) sfx('hover26'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovSeg = null; draw(); });

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * UPDATE STATS IN HERO (v26)
   * ================================================================ */
  function updateHeroStats() {
    var stats = $$('.stat-num');
    stats.forEach(function (s) {
      var count = parseInt(s.getAttribute('data-count'));
      if (count === 350000 || count === 330000 || count === 310000 || count === 270000) s.setAttribute('data-count', '370000');
      if (count === 12000 || count === 11400 || count === 10800 || count === 10200 || count === 9600) s.setAttribute('data-count', '12600');
    });
  }

  /* ================================================================
   * BUILD ALL SECTIONS
   * ================================================================ */
  function buildAllSections() {
    var anchor = $('footer');
    if (!anchor) return;

    updateHeroStats();

    var sections = [
      { id: 'v26-depgraph', title: 'Technology Dependency Graph', sub: '12 projects × 8 technologies — network visualization with hover exploration', builder: function (wrap) { wrap.appendChild(buildDependencyGraph()); }, sfxName: 'depgraph' },
      { id: 'v26-bugdensity', title: 'Code Quality Density Matrix', sub: '12 projects × 6 quality categories — issue density heatmap', builder: function (wrap) { wrap.appendChild(buildBugDensityHeatmap()); }, sfxName: 'bugdensity' },
      { id: 'v26-milestone', title: 'Portfolio Evolution Timeline', sub: '8 major milestones from v10 to v26 — feature growth trajectory', builder: function (wrap) { wrap.appendChild(buildMilestoneTimeline()); }, sfxName: 'milestone' },
      { id: 'v26-techdebt', title: 'Technical Debt Distribution', sub: '6 debt categories × 12 projects — stacked bar analysis', builder: function (wrap) { wrap.appendChild(buildTechDebtTracker()); }, sfxName: 'techdebt' },
      { id: 'v26-teamload', title: 'Team Workload Distribution', sub: '8 roles × 3 project groups — resource allocation balance', builder: function (wrap) { wrap.appendChild(buildTeamWorkload()); }, sfxName: 'teamload' },
      { id: 'v26-momentum', title: 'Release Momentum Index', sub: '12 projects semicircle gauges — version velocity S~D grades', builder: function (wrap) { wrap.appendChild(buildMomentumGauge()); }, sfxName: 'momentum' },
      { id: 'v26-coverage', title: 'Test Coverage Radar', sub: '6-axis quality radar — click to cycle 12 projects', builder: function (wrap) { wrap.appendChild(buildCoverageRadar()); }, sfxName: 'coverage' },
      { id: 'v26-ecosystem', title: 'Portfolio Ecosystem Architecture', sub: '3-ring sunburst — Core → Business Units → Technology Stack', builder: function (wrap) { wrap.appendChild(buildEcosystemOverview()); }, sfxName: 'ecosystem' }
    ];

    sections.forEach(function (sec) {
      var section = el('section', { className: 'v26-section section-reveal', id: sec.id });
      section.appendChild(el('h2', { textContent: sec.title }));
      section.appendChild(el('p', { className: 'v26-section-sub', textContent: sec.sub }));
      var card = el('div', { className: 'v26-card' });
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

    showToast('v26.0', '8 new analytics canvases • 370K+ LOC • 16 SFX • All 12 project data updated');
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+Q/W/E/R/T/Y/U/I + Shift+0)
   * ================================================================ */
  var sectionIds = ['v26-depgraph', 'v26-bugdensity', 'v26-milestone', 'v26-techdebt', 'v26-teamload', 'v26-momentum', 'v26-coverage', 'v26-ecosystem'];
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var idx = -1;
    if (e.code === 'KeyQ') idx = 0;
    else if (e.code === 'KeyW') idx = 1;
    else if (e.code === 'KeyE') idx = 2;
    else if (e.code === 'KeyR') idx = 3;
    else if (e.code === 'KeyT') idx = 4;
    else if (e.code === 'KeyY') idx = 5;
    else if (e.code === 'KeyU') idx = 6;
    else if (e.code === 'KeyI') idx = 7;
    if (idx >= 0) {
      e.preventDefault();
      var target = document.getElementById(sectionIds[idx]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section26'); }
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
