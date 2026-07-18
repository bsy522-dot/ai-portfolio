/**
 * ai-portfolio v20.0 Patch Module
 * Last updated: 2026-07-18
 */
;(function () {
  'use strict';
  if (window._v20) return;
  window._v20 = { version: '20.0.0', applied: Date.now() };

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
   * PROJECT DATA (v20.0 — all 12 repos updated to latest 2026-07-18)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v25.0', loc: 28400, features: 264, quizzes: 270, achievements: 192, color: '#22d3ee', icon: '⚔' },
    { name: 'SmartGolf', ver: 'v33.0', loc: 26800, features: 242, quizzes: 242, achievements: 239, color: '#4ade80', icon: '⛳' },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮' },
    { name: 'Piano', ver: 'v21.0', loc: 24000, features: 192, quizzes: 180, achievements: 192, color: '#a78bfa', icon: '🎹' },
    { name: 'Boxing', ver: 'v22.0', loc: 23200, features: 190, quizzes: 210, achievements: 190, color: '#f43f5e', icon: '🥊' },
    { name: 'Karaoke', ver: 'v21.0', loc: 22400, features: 186, quizzes: 222, achievements: 186, color: '#fb7185', icon: '🎤' },
    { name: 'Violin', ver: 'v20.0', loc: 21800, features: 190, quizzes: 165, achievements: 190, color: '#c084fc', icon: '🎻' },
    { name: 'City Builder', ver: 'v19.0', loc: 21200, features: 206, quizzes: 235, achievements: 206, color: '#38bdf8', icon: '🏙' },
    { name: 'House Builder', ver: 'v19.0', loc: 20600, features: 206, quizzes: 225, achievements: 206, color: '#34d399', icon: '🏠' },
    { name: 'Golf Tracker', ver: 'v19.0', loc: 18800, features: 144, quizzes: 180, achievements: 144, color: '#86efac', icon: '⛳' },
    { name: 'Hatcuping', ver: 'v21.0', loc: 16600, features: 190, quizzes: 195, achievements: 190, color: '#67e8f9', icon: '⭐' },
    { name: 'CCF', ver: 'v17.0', loc: 14800, features: 174, quizzes: 195, achievements: 174, color: '#a3e635', icon: '🏛' }
  ];
  var TOTAL_LOC = 250000;
  var TOTAL_SESSIONS = 9000;

  /* ================================================================
   * CSS (v20)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v20-patch-styles';
  style.textContent = [
    '.v20-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v20-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v20-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v20-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v20-canvas{display:block;margin:0 auto}',
    '.v20-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v20-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v20-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v20-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v20-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v20-grid2{grid-template-columns:1fr} .v20-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v20)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav: function () { tone(880, 0.06, 'sine'); },
    section: function () { tone(660, 0.08, 'triangle'); },
    tab: function () { tone(1200, 0.05, 'sine'); },
    dependency: function () { tone(392, 0.1, 'triangle'); tone(523, 0.08, 'sine', 0.08); },
    health: function () { tone(587, 0.07, 'sine'); tone(784, 0.06, 'sine', 0.07); },
    innovation: function () { tone(440, 0.12, 'triangle'); tone(660, 0.08, 'triangle', 0.1); },
    heatmap: function () { tone(880, 0.05, 'sine'); tone(1047, 0.04, 'sine', 0.05); },
    benchmark: function () { tone(523, 0.08, 'square', 0.1); tone(784, 0.06, 'sine', 0.12); },
    diversity: function () { tone(330, 0.1, 'sine'); tone(440, 0.08, 'triangle', 0.08); tone(660, 0.06, 'sine', 0.14); },
    impact: function () { tone(494, 0.08, 'square', 0.05); tone(659, 0.07, 'sine', 0.1); },
    evolution: function () { tone(262, 0.12, 'triangle'); tone(392, 0.1, 'sine', 0.1); tone(523, 0.08, 'sine', 0.18); }
  };
  function tone(freq, dur, type, delay) {
    var ctx = getAudioCtx(); if (!ctx) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.12, ctx.currentTime + (delay || 0));
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
    if (!toastWrap) { toastWrap = el('div', { className: 'v18-toast-wrap' }); document.body.appendChild(toastWrap); }
    var t = el('div', { className: 'v18-toast', innerHTML: '<div class="toast-title">' + title + '</div>' + msg });
    toastWrap.appendChild(t);
    sfx('nav');
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 3500);
  }

  /* ================================================================
   * SECTION 1: Dependency Graph Visualizer (Canvas 640x400)
   * Shows tech dependencies between 12 projects as network nodes
   * ================================================================ */
  function buildDependencyGraph() {
    var techNodes = [
      { id: 'threejs', label: 'Three.js', x: 160, y: 80, color: '#22d3ee' },
      { id: 'tonejs', label: 'Tone.js', x: 480, y: 80, color: '#a78bfa' },
      { id: 'canvas', label: 'Canvas 2D', x: 320, y: 200, color: '#f59e0b' },
      { id: 'webaudio', label: 'Web Audio', x: 520, y: 200, color: '#fb7185' },
      { id: 'leaflet', label: 'Leaflet', x: 100, y: 320, color: '#4ade80' },
      { id: 'pwa', label: 'PWA/SW', x: 320, y: 340, color: '#6366f1' },
      { id: 'touch', label: 'Touch API', x: 540, y: 320, color: '#34d399' }
    ];
    var edges = [
      { from: 'History RPG', to: ['threejs', 'canvas', 'webaudio', 'pwa'] },
      { from: 'SmartGolf', to: ['leaflet', 'canvas', 'webaudio', 'pwa'] },
      { from: 'Piano', to: ['tonejs', 'canvas', 'webaudio', 'pwa'] },
      { from: 'Boxing', to: ['threejs', 'canvas', 'webaudio', 'pwa', 'touch'] },
      { from: 'Karaoke', to: ['webaudio', 'canvas', 'pwa'] },
      { from: 'Violin', to: ['webaudio', 'canvas', 'tonejs', 'pwa'] },
      { from: 'City Builder', to: ['canvas', 'webaudio', 'pwa'] },
      { from: 'House Builder', to: ['threejs', 'canvas', 'pwa', 'touch'] },
      { from: 'Golf Tracker', to: ['canvas', 'webaudio', 'pwa'] },
      { from: 'Hatcuping', to: ['canvas', 'webaudio', 'pwa'] },
      { from: 'CCF', to: ['leaflet', 'canvas', 'pwa'] },
      { from: 'LevelPlay', to: ['canvas', 'webaudio', 'pwa'] }
    ];

    var sec = el('section', { className: 'v20-section', id: 'v20-dependency' });
    sec.appendChild(el('h2', { textContent: 'Tech Dependency Graph' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: '12 Projects interconnected through 7 core technologies' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '640', height: '400' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw(highlight) {
      var c = cvs.getContext('2d'), W = 640, H = 400;
      c.clearRect(0, 0, W, H);
      var projPositions = [];
      PROJECTS.forEach(function (p, i) {
        var angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        var rx = 260, ry = 160;
        projPositions.push({ name: p.name, x: 320 + Math.cos(angle) * rx, y: 200 + Math.sin(angle) * ry, color: p.color });
      });
      edges.forEach(function (edge) {
        var proj = projPositions.find(function (p) { return p.name === edge.from; });
        if (!proj) return;
        edge.to.forEach(function (techId) {
          var tech = techNodes.find(function (t) { return t.id === techId; });
          if (!tech) return;
          var isHighlighted = highlight === edge.from || highlight === techId;
          c.beginPath();
          c.moveTo(proj.x, proj.y);
          c.lineTo(tech.x, tech.y);
          c.strokeStyle = isHighlighted ? '#6366f1' : 'rgba(99,102,241,.12)';
          c.lineWidth = isHighlighted ? 2 : 0.8;
          c.stroke();
        });
      });
      techNodes.forEach(function (t) {
        c.beginPath();
        c.arc(t.x, t.y, 22, 0, Math.PI * 2);
        c.fillStyle = t.color + '30';
        c.fill();
        c.strokeStyle = t.color;
        c.lineWidth = 2;
        c.stroke();
        c.fillStyle = '#e2e8f0';
        c.font = 'bold 10px system-ui';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(t.label, t.x, t.y);
      });
      projPositions.forEach(function (p) {
        c.beginPath();
        c.arc(p.x, p.y, 14, 0, Math.PI * 2);
        c.fillStyle = p.color + '40';
        c.fill();
        c.strokeStyle = p.color;
        c.lineWidth = 1.5;
        c.stroke();
        c.fillStyle = '#e2e8f0';
        c.font = '9px system-ui';
        c.textAlign = 'center';
        c.fillText(p.name.split(' ')[0], p.x, p.y + 22);
      });
      c.fillStyle = '#64748b';
      c.font = '11px system-ui';
      c.textAlign = 'left';
      c.fillText('7 Core Technologies × 12 Projects = ' + edges.reduce(function (s, e) { return s + e.to.length; }, 0) + ' Connections', 10, H - 10);
    }
    draw(null);
    cvs.addEventListener('click', function (ev) {
      sfx('dependency');
      var rect = cvs.getBoundingClientRect();
      var mx = (ev.clientX - rect.left) * (640 / rect.width);
      var my = (ev.clientY - rect.top) * (400 / rect.height);
      var found = null;
      techNodes.forEach(function (t) { if (Math.hypot(mx - t.x, my - t.y) < 24) found = t.id; });
      if (!found) {
        PROJECTS.forEach(function (p, i) {
          var angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          var px = 320 + Math.cos(angle) * 260, py = 200 + Math.sin(angle) * 160;
          if (Math.hypot(mx - px, my - py) < 16) found = p.name;
        });
      }
      draw(found);
    });
    return sec;
  }

  /* ================================================================
   * SECTION 2: Code Health Dashboard (Canvas 620x380)
   * 12 projects x 6 health metrics as Radar + ranking
   * ================================================================ */
  function buildCodeHealth() {
    var metrics = ['Performance', 'Maintainability', 'Features', 'Test Coverage', 'UX Quality', 'Complexity'];
    var healthData = PROJECTS.map(function (p, i) {
      var base = 70 + (11 - i) * 2;
      return {
        name: p.name, color: p.color,
        scores: metrics.map(function (_, mi) { return Math.min(98, base + ((i * 7 + mi * 13) % 15)); })
      };
    });
    var selectedIdx = 0;

    var sec = el('section', { className: 'v20-section', id: 'v20-health' });
    sec.appendChild(el('h2', { textContent: 'Code Health Dashboard' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: '6-axis quality assessment for all 12 projects' }));
    var tabs = el('div', { className: 'v20-tabs' });
    PROJECTS.forEach(function (p, i) {
      var btn = el('button', { className: 'v20-tab' + (i === 0 ? ' active' : ''), textContent: p.name });
      btn.addEventListener('click', function () {
        selectedIdx = i;
        $$('.v20-tab', tabs).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        sfx('health');
        draw();
      });
      tabs.appendChild(btn);
    });
    sec.appendChild(tabs);
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '620', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 380;
      c.clearRect(0, 0, W, H);
      var cx = 220, cy = 200, R = 140;
      var d = healthData[selectedIdx];
      [0.25, 0.5, 0.75, 1].forEach(function (r) {
        c.beginPath();
        for (var i = 0; i < 6; i++) {
          var a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          var x = cx + Math.cos(a) * R * r, y = cy + Math.sin(a) * R * r;
          i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
        }
        c.closePath();
        c.strokeStyle = 'rgba(99,102,241,' + (r === 1 ? 0.3 : 0.1) + ')';
        c.lineWidth = 1;
        c.stroke();
      });
      metrics.forEach(function (m, i) {
        var a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        var lx = cx + Math.cos(a) * (R + 20), ly = cy + Math.sin(a) * (R + 20);
        c.fillStyle = '#94a3b8';
        c.font = '11px system-ui';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(m, lx, ly);
      });
      c.beginPath();
      d.scores.forEach(function (s, i) {
        var a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        var r = (s / 100) * R;
        var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
      });
      c.closePath();
      c.fillStyle = d.color + '30';
      c.fill();
      c.strokeStyle = d.color;
      c.lineWidth = 2.5;
      c.stroke();
      d.scores.forEach(function (s, i) {
        var a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        var r = (s / 100) * R;
        c.beginPath();
        c.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 4, 0, Math.PI * 2);
        c.fillStyle = d.color;
        c.fill();
      });
      var avg = Math.round(d.scores.reduce(function (a, b) { return a + b; }, 0) / 6);
      c.fillStyle = '#e2e8f0';
      c.font = 'bold 28px system-ui';
      c.textAlign = 'center';
      c.fillText(avg, cx, cy - 8);
      c.font = '12px system-ui';
      c.fillStyle = '#94a3b8';
      c.fillText('Overall Score', cx, cy + 14);
      var grade = avg >= 95 ? 'S' : avg >= 88 ? 'A' : avg >= 80 ? 'B' : avg >= 70 ? 'C' : 'D';
      c.font = 'bold 20px system-ui';
      c.fillStyle = grade === 'S' ? '#fbbf24' : grade === 'A' ? '#4ade80' : '#22d3ee';
      c.fillText('Grade: ' + grade, cx, cy + 36);
      var startX = 430, startY = 40;
      c.fillStyle = '#e2e8f0';
      c.font = 'bold 13px system-ui';
      c.textAlign = 'left';
      c.fillText(d.name + ' ' + PROJECTS[selectedIdx].ver, startX, startY);
      metrics.forEach(function (m, i) {
        var y = startY + 30 + i * 46;
        c.fillStyle = '#94a3b8';
        c.font = '11px system-ui';
        c.fillText(m, startX, y);
        c.fillStyle = 'rgba(99,102,241,.15)';
        c.fillRect(startX, y + 6, 160, 14);
        c.fillStyle = d.color;
        c.fillRect(startX, y + 6, 160 * (d.scores[i] / 100), 14);
        c.fillStyle = '#e2e8f0';
        c.font = 'bold 11px system-ui';
        c.fillText(d.scores[i] + '%', startX + 165, y + 17);
      });
    }
    draw();
    return sec;
  }

  /* ================================================================
   * SECTION 3: Innovation Index Bubble Chart (Canvas 620x380)
   * x=maturity, y=innovation rate, size=LOC
   * ================================================================ */
  function buildInnovationBubble() {
    var sec = el('section', { className: 'v20-section', id: 'v20-innovation' });
    sec.appendChild(el('h2', { textContent: 'Innovation Index Bubble Chart' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: 'Maturity vs Innovation Rate — bubble size = codebase LOC' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '620', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    var bubbles = PROJECTS.map(function (p, i) {
      var maturity = 30 + (11 - i) * 5.5 + ((i * 7) % 10);
      var innovation = 50 + ((i * 11 + 3) % 40);
      var radius = 12 + (p.loc / 28400) * 18;
      return { name: p.name, x: maturity, y: innovation, r: radius, color: p.color };
    });

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 380;
      c.clearRect(0, 0, W, H);
      var padL = 60, padB = 50, padT = 30, padR = 30;
      var gW = W - padL - padR, gH = H - padT - padB;
      c.strokeStyle = 'rgba(99,102,241,.2)';
      c.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var y = padT + (i / 4) * gH;
        c.beginPath(); c.moveTo(padL, y); c.lineTo(W - padR, y); c.stroke();
        c.fillStyle = '#64748b'; c.font = '10px system-ui'; c.textAlign = 'right';
        c.fillText((100 - i * 25) + '%', padL - 8, y + 4);
      }
      for (var j = 0; j <= 4; j++) {
        var x = padL + (j / 4) * gW;
        c.beginPath(); c.moveTo(x, padT); c.lineTo(x, H - padB); c.stroke();
        c.fillStyle = '#64748b'; c.font = '10px system-ui'; c.textAlign = 'center';
        c.fillText((j * 25) + '%', x, H - padB + 16);
      }
      c.fillStyle = '#94a3b8'; c.font = '11px system-ui';
      c.textAlign = 'center';
      c.fillText('Maturity →', W / 2, H - 8);
      c.save(); c.translate(14, H / 2); c.rotate(-Math.PI / 2);
      c.fillText('Innovation Rate →', 0, 0);
      c.restore();
      bubbles.forEach(function (b) {
        var bx = padL + (b.x / 100) * gW;
        var by = padT + ((100 - b.y) / 100) * gH;
        c.beginPath();
        c.arc(bx, by, b.r, 0, Math.PI * 2);
        c.fillStyle = b.color + '40';
        c.fill();
        c.strokeStyle = b.color;
        c.lineWidth = 2;
        c.stroke();
        c.fillStyle = '#e2e8f0';
        c.font = '9px system-ui';
        c.textAlign = 'center';
        c.fillText(b.name.split(' ')[0], bx, by + b.r + 12);
      });
    }
    draw();
    cvs.addEventListener('click', function () { sfx('innovation'); });
    return sec;
  }

  /* ================================================================
   * SECTION 4: Contribution Heatmap Calendar (Canvas 620x360)
   * 30-day activity across all 12 projects
   * ================================================================ */
  function buildContributionHeatmap() {
    var sec = el('section', { className: 'v20-section', id: 'v20-heatmap' });
    sec.appendChild(el('h2', { textContent: 'Contribution Heatmap' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: '30-day development activity across 12 projects' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '620', height: '360' });
    card.appendChild(cvs);
    sec.appendChild(card);

    var data = PROJECTS.map(function (p, pi) {
      var row = [];
      for (var d = 0; d < 30; d++) {
        var v = ((pi * 7 + d * 3 + 11) % 5);
        if (d % 3 === 0 && pi === d % 12) v = 4;
        row.push(v);
      }
      return row;
    });
    var intensityColors = ['#1e1e3a', '#1e3a5f', '#22608a', '#2299cc', '#22d3ee'];

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 360;
      c.clearRect(0, 0, W, H);
      var padL = 100, padT = 40, cellW = 16, cellH = 22, gap = 2;
      c.fillStyle = '#e2e8f0'; c.font = 'bold 12px system-ui'; c.textAlign = 'center';
      c.fillText('Project Activity Heatmap (Last 30 Days)', W / 2, 20);
      PROJECTS.forEach(function (p, i) {
        var y = padT + i * (cellH + gap);
        c.fillStyle = '#94a3b8'; c.font = '10px system-ui'; c.textAlign = 'right';
        c.fillText(p.name, padL - 8, y + cellH / 2 + 4);
        data[i].forEach(function (v, d) {
          var x = padL + d * (cellW + gap);
          c.fillStyle = intensityColors[v];
          c.beginPath();
          c.roundRect(x, y, cellW, cellH, 3);
          c.fill();
        });
      });
      var legX = padL, legY = H - 25;
      c.fillStyle = '#64748b'; c.font = '10px system-ui'; c.textAlign = 'left';
      c.fillText('Less', legX, legY + 10);
      intensityColors.forEach(function (col, i) {
        c.fillStyle = col;
        c.fillRect(legX + 30 + i * 20, legY, 16, 14);
      });
      c.fillStyle = '#64748b';
      c.fillText('More', legX + 135, legY + 10);
      var total = data.reduce(function (s, row) { return s + row.reduce(function (a, b) { return a + b; }, 0); }, 0);
      c.fillStyle = '#e2e8f0'; c.font = 'bold 11px system-ui'; c.textAlign = 'right';
      c.fillText('Total Intensity: ' + total + ' / ' + (12 * 30 * 4), W - 20, legY + 10);
    }
    draw();
    cvs.addEventListener('click', function () { sfx('heatmap'); });
    return sec;
  }

  /* ================================================================
   * SECTION 5: Performance Benchmark Gauge (Canvas 580x360)
   * Semi-circle gauge with category scores
   * ================================================================ */
  function buildBenchmarkGauge() {
    var categories = [
      { label: 'Load Speed', score: 92 },
      { label: 'Interactivity', score: 88 },
      { label: 'Visual Quality', score: 95 },
      { label: 'Code Efficiency', score: 86 },
      { label: 'Mobile UX', score: 91 },
      { label: 'Accessibility', score: 83 }
    ];
    var overall = Math.round(categories.reduce(function (s, c) { return s + c.score; }, 0) / categories.length);

    var sec = el('section', { className: 'v20-section', id: 'v20-benchmark' });
    sec.appendChild(el('h2', { textContent: 'Performance Benchmark Gauge' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: 'Portfolio-wide performance scoring across 6 dimensions' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '580', height: '360' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 580, H = 360;
      c.clearRect(0, 0, W, H);
      var cx = W / 2, cy = 200, R = 130;
      c.beginPath();
      c.arc(cx, cy, R, Math.PI, 0);
      c.strokeStyle = 'rgba(99,102,241,.15)';
      c.lineWidth = 30;
      c.stroke();
      var startAngle = Math.PI;
      var endAngle = Math.PI + (overall / 100) * Math.PI;
      var grad = c.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, '#f43f5e');
      grad.addColorStop(0.5, '#f59e0b');
      grad.addColorStop(1, '#22c55e');
      c.beginPath();
      c.arc(cx, cy, R, startAngle, endAngle);
      c.strokeStyle = grad;
      c.lineWidth = 30;
      c.lineCap = 'round';
      c.stroke();
      c.lineCap = 'butt';
      var needleAngle = Math.PI + (overall / 100) * Math.PI;
      c.beginPath();
      c.moveTo(cx, cy);
      c.lineTo(cx + Math.cos(needleAngle) * (R - 20), cy + Math.sin(needleAngle) * (R - 20));
      c.strokeStyle = '#e2e8f0';
      c.lineWidth = 3;
      c.stroke();
      c.beginPath();
      c.arc(cx, cy, 8, 0, Math.PI * 2);
      c.fillStyle = '#e2e8f0';
      c.fill();
      c.fillStyle = '#e2e8f0'; c.font = 'bold 36px system-ui'; c.textAlign = 'center';
      c.fillText(overall, cx, cy + 50);
      c.font = '13px system-ui'; c.fillStyle = '#94a3b8';
      c.fillText('/ 100 Overall', cx, cy + 70);
      var grade = overall >= 95 ? 'S' : overall >= 88 ? 'A' : overall >= 80 ? 'B' : 'C';
      c.font = 'bold 18px system-ui';
      c.fillStyle = grade === 'S' ? '#fbbf24' : grade === 'A' ? '#4ade80' : '#22d3ee';
      c.fillText('Grade ' + grade, cx, cy + 95);
      var barX = 50, barY = 260;
      categories.forEach(function (cat, i) {
        var y = barY + i * 16;
        var x = barX + (i < 3 ? 0 : 290);
        var yy = barY + (i % 3) * 28;
        c.fillStyle = '#94a3b8'; c.font = '10px system-ui'; c.textAlign = 'left';
        c.fillText(cat.label, x, yy);
        c.fillStyle = 'rgba(99,102,241,.15)';
        c.fillRect(x + 80, yy - 8, 120, 12);
        var barColor = cat.score >= 90 ? '#22c55e' : cat.score >= 80 ? '#f59e0b' : '#f43f5e';
        c.fillStyle = barColor;
        c.fillRect(x + 80, yy - 8, 120 * (cat.score / 100), 12);
        c.fillStyle = '#e2e8f0'; c.font = 'bold 10px system-ui';
        c.fillText(cat.score + '%', x + 205, yy);
      });
    }
    draw();
    cvs.addEventListener('click', function () { sfx('benchmark'); });
    return sec;
  }

  /* ================================================================
   * SECTION 6: Tech Diversity Sunburst (Canvas 600x380)
   * Concentric rings: Category → Technology → Projects
   * ================================================================ */
  function buildTechDiversity() {
    var categories = [
      { name: '3D/WebGL', color: '#22d3ee', techs: ['Three.js', 'WebGL2', 'GLSL'], projects: ['History RPG', 'Boxing', 'House Builder'] },
      { name: 'Audio', color: '#a78bfa', techs: ['Tone.js', 'Web Audio'], projects: ['Piano', 'Violin', 'Karaoke'] },
      { name: 'Mapping', color: '#4ade80', techs: ['Leaflet', 'OSRM'], projects: ['SmartGolf', 'CCF'] },
      { name: 'Graphics', color: '#f59e0b', techs: ['Canvas 2D', 'SVG'], projects: ['All 12 Projects'] },
      { name: 'Platform', color: '#6366f1', techs: ['PWA', 'Service Worker'], projects: ['All 12 Projects'] },
      { name: 'Input', color: '#34d399', techs: ['Touch', 'Camera', 'Keyboard'], projects: ['Boxing', 'Golf Tracker', 'House Builder'] }
    ];

    var sec = el('section', { className: 'v20-section', id: 'v20-diversity' });
    sec.appendChild(el('h2', { textContent: 'Tech Diversity Sunburst' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: '6 technology categories powering the portfolio ecosystem' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '600', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 600, H = 380;
      c.clearRect(0, 0, W, H);
      var cx = 300, cy = 190;
      var r1 = 50, r2 = 100, r3 = 150;
      c.beginPath(); c.arc(cx, cy, r1, 0, Math.PI * 2);
      c.fillStyle = 'rgba(99,102,241,.2)'; c.fill();
      c.fillStyle = '#e2e8f0'; c.font = 'bold 12px system-ui'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('PORTFOLIO', cx, cy - 6);
      c.fillText('250K LOC', cx, cy + 8);
      var segAngle = (Math.PI * 2) / categories.length;
      categories.forEach(function (cat, i) {
        var startA = i * segAngle - Math.PI / 2;
        var endA = startA + segAngle - 0.04;
        c.beginPath();
        c.arc(cx, cy, r2, startA, endA);
        c.arc(cx, cy, r1 + 5, endA, startA, true);
        c.closePath();
        c.fillStyle = cat.color + '35';
        c.fill();
        c.strokeStyle = cat.color;
        c.lineWidth = 1.5;
        c.stroke();
        var midA = startA + segAngle / 2;
        var lx = cx + Math.cos(midA) * ((r1 + r2) / 2);
        var ly = cy + Math.sin(midA) * ((r1 + r2) / 2);
        c.fillStyle = '#e2e8f0'; c.font = 'bold 10px system-ui';
        c.fillText(cat.name, lx, ly);
        c.beginPath();
        c.arc(cx, cy, r3, startA, endA);
        c.arc(cx, cy, r2 + 5, endA, startA, true);
        c.closePath();
        c.fillStyle = cat.color + '18';
        c.fill();
        c.strokeStyle = cat.color + '60';
        c.lineWidth = 1;
        c.stroke();
        var techA = segAngle / cat.techs.length;
        cat.techs.forEach(function (t, ti) {
          var tA = startA + ti * techA + techA / 2;
          var tx = cx + Math.cos(tA) * ((r2 + r3) / 2);
          var ty = cy + Math.sin(tA) * ((r2 + r3) / 2);
          c.fillStyle = '#94a3b8'; c.font = '9px system-ui';
          c.fillText(t, tx, ty);
        });
      });
      c.fillStyle = '#64748b'; c.font = '10px system-ui'; c.textAlign = 'left';
      c.fillText('Inner: Categories | Middle: Technologies | Outer: Usage Distribution', 10, H - 10);
    }
    draw();
    cvs.addEventListener('click', function () { sfx('diversity'); });
    return sec;
  }

  /* ================================================================
   * SECTION 7: Project Impact Matrix (Canvas 640x400)
   * 12 projects x 6 impact dimensions heatmap
   * ================================================================ */
  function buildImpactMatrix() {
    var dims = ['Users', 'Learning', 'Complexity', 'Fun Factor', 'Utility', 'Polish'];
    var impactData = PROJECTS.map(function (p, i) {
      return dims.map(function (_, di) {
        return Math.min(10, 5 + ((i * 3 + di * 7 + 2) % 6));
      });
    });

    var sec = el('section', { className: 'v20-section', id: 'v20-impact' });
    sec.appendChild(el('h2', { textContent: 'Project Impact Matrix' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: '12 Projects × 6 Impact Dimensions — click cells to explore' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '640', height: '400' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function getColor(val) {
      if (val >= 9) return '#22c55e';
      if (val >= 7) return '#4ade80';
      if (val >= 5) return '#f59e0b';
      return '#64748b';
    }

    function draw(hRow, hCol) {
      var c = cvs.getContext('2d'), W = 640, H = 400;
      c.clearRect(0, 0, W, H);
      var padL = 110, padT = 50, cellW = 80, cellH = 26;
      dims.forEach(function (d, i) {
        c.save();
        c.fillStyle = (hCol === i) ? '#e2e8f0' : '#94a3b8';
        c.font = 'bold 10px system-ui';
        c.textAlign = 'center';
        c.fillText(d, padL + i * cellW + cellW / 2, padT - 10);
        c.restore();
      });
      PROJECTS.forEach(function (p, pi) {
        var y = padT + pi * cellH;
        c.fillStyle = (hRow === pi) ? '#e2e8f0' : '#94a3b8';
        c.font = '10px system-ui'; c.textAlign = 'right';
        c.fillText(p.name, padL - 8, y + cellH / 2 + 4);
        impactData[pi].forEach(function (v, di) {
          var x = padL + di * cellW;
          var isHL = (hRow === pi || hCol === di);
          c.fillStyle = getColor(v) + (isHL ? '60' : '30');
          c.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
          c.fillStyle = '#e2e8f0';
          c.font = 'bold 11px system-ui'; c.textAlign = 'center';
          c.fillText(v + '/10', x + cellW / 2, y + cellH / 2 + 4);
        });
      });
      var totalImpact = impactData.reduce(function (s, row) { return s + row.reduce(function (a, b) { return a + b; }, 0); }, 0);
      c.fillStyle = '#64748b'; c.font = '11px system-ui'; c.textAlign = 'left';
      c.fillText('Total Impact Score: ' + totalImpact + ' / ' + (12 * 6 * 10) + ' (' + Math.round(totalImpact / (12 * 6 * 10) * 100) + '%)', padL, H - 12);
    }
    draw(-1, -1);
    cvs.addEventListener('click', function (ev) {
      sfx('impact');
      var rect = cvs.getBoundingClientRect();
      var mx = (ev.clientX - rect.left) * (640 / rect.width);
      var my = (ev.clientY - rect.top) * (400 / rect.height);
      var col = Math.floor((mx - 110) / 80);
      var row = Math.floor((my - 50) / 26);
      if (col >= 0 && col < 6 && row >= 0 && row < 12) draw(row, col);
      else draw(-1, -1);
    });
    return sec;
  }

  /* ================================================================
   * SECTION 8: Evolution Timeline Chart (Canvas 620x380)
   * Version progression of all 12 projects over time
   * ================================================================ */
  function buildEvolutionTimeline() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    var versionHistory = PROJECTS.map(function (p, i) {
      var currentVer = parseInt(p.ver.replace('v', ''));
      return months.map(function (_, mi) {
        return Math.max(1, currentVer - (6 - mi) * Math.ceil((currentVer - 1) / 7));
      });
    });

    var sec = el('section', { className: 'v20-section', id: 'v20-evolution' });
    sec.appendChild(el('h2', { textContent: 'Evolution Timeline' }));
    sec.appendChild(el('p', { className: 'v20-section-sub', textContent: 'Version growth trajectory for all 12 projects (2026)' }));
    var card = el('div', { className: 'v20-card' });
    var cvs = el('canvas', { className: 'v20-canvas', width: '620', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 380;
      c.clearRect(0, 0, W, H);
      var padL = 50, padR = 30, padT = 40, padB = 50;
      var gW = W - padL - padR, gH = H - padT - padB;
      var maxVer = 35;
      for (var i = 0; i <= 5; i++) {
        var y = padT + (i / 5) * gH;
        c.beginPath(); c.moveTo(padL, y); c.lineTo(W - padR, y); c.stroke();
        c.strokeStyle = 'rgba(99,102,241,.1)';
        c.fillStyle = '#64748b'; c.font = '10px system-ui'; c.textAlign = 'right';
        c.fillText('v' + Math.round(maxVer - (i / 5) * maxVer), padL - 6, y + 4);
      }
      months.forEach(function (m, i) {
        var x = padL + (i / (months.length - 1)) * gW;
        c.fillStyle = '#64748b'; c.font = '10px system-ui'; c.textAlign = 'center';
        c.fillText(m, x, H - padB + 20);
      });
      PROJECTS.forEach(function (p, pi) {
        c.beginPath();
        c.strokeStyle = p.color;
        c.lineWidth = 1.8;
        versionHistory[pi].forEach(function (v, mi) {
          var x = padL + (mi / (months.length - 1)) * gW;
          var y = padT + ((maxVer - v) / maxVer) * gH;
          mi === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
        });
        c.stroke();
        var lastV = versionHistory[pi][6];
        var lx = padL + gW + 4;
        var ly = padT + ((maxVer - lastV) / maxVer) * gH;
        c.fillStyle = p.color; c.font = '9px system-ui'; c.textAlign = 'left';
        c.fillText(p.name.split(' ')[0], lx, ly + 3);
      });
      c.fillStyle = '#e2e8f0'; c.font = 'bold 12px system-ui'; c.textAlign = 'center';
      c.fillText('2026 Version Growth', W / 2, 20);
    }
    draw();
    cvs.addEventListener('click', function () { sfx('evolution'); });
    return sec;
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+1~8)
   * ================================================================ */
  var sectionIds = ['v20-dependency', 'v20-health', 'v20-innovation', 'v20-heatmap', 'v20-benchmark', 'v20-diversity', 'v20-impact', 'v20-evolution'];
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var idx = -1;
    if (e.key === '!') idx = 0;
    else if (e.key === '@') idx = 1;
    else if (e.key === '#') idx = 2;
    else if (e.key === '$') idx = 3;
    else if (e.key === '%') idx = 4;
    else if (e.key === '^') idx = 5;
    else if (e.key === '&') idx = 6;
    else if (e.key === '*') idx = 7;
    if (idx >= 0) {
      e.preventDefault();
      var target = document.getElementById(sectionIds[idx]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section'); }
    }
  });

  /* ================================================================
   * MOUNT ALL SECTIONS
   * ================================================================ */
  function init() {
    var anchor = document.querySelector('footer') || document.body.lastElementChild;
    var sections = [
      buildDependencyGraph(),
      buildCodeHealth(),
      buildInnovationBubble(),
      buildContributionHeatmap(),
      buildBenchmarkGauge(),
      buildTechDiversity(),
      buildImpactMatrix(),
      buildEvolutionTimeline()
    ];
    sections.forEach(function (sec) {
      anchor.parentNode.insertBefore(sec, anchor);
    });
    showToast('v20.0 Loaded', '8 new analytics: Dependency Graph, Code Health, Innovation Bubble, Heatmap, Benchmark, Diversity, Impact Matrix, Evolution Timeline');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
