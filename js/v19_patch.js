/**
 * ai-portfolio v19.0 Patch Module
 * Last updated: 2026-07-15
 */
;(function () {
  'use strict';
  if (window._v19) return;
  window._v19 = { version: '19.0.0', applied: Date.now() };

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
   * PROJECT DATA (v19.0 — all 12 repos updated to latest 2026-07-15)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v24.0', loc: 27200, features: 252, quizzes: 255, achievements: 180, color: '#22d3ee', icon: '⚔' },
    { name: 'SmartGolf', ver: 'v32.0', loc: 25600, features: 227, quizzes: 227, achievements: 226, color: '#4ade80', icon: '⛳' },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮' },
    { name: 'Piano', ver: 'v20.0', loc: 22800, features: 180, quizzes: 165, achievements: 180, color: '#a78bfa', icon: '🎹' },
    { name: 'Boxing', ver: 'v21.0', loc: 21600, features: 178, quizzes: 195, achievements: 178, color: '#f43f5e', icon: '🥊' },
    { name: 'Karaoke', ver: 'v20.0', loc: 21000, features: 174, quizzes: 207, achievements: 174, color: '#fb7185', icon: '🎤' },
    { name: 'Violin', ver: 'v19.0', loc: 20600, features: 178, quizzes: 150, achievements: 178, color: '#c084fc', icon: '🎻' },
    { name: 'City Builder', ver: 'v18.0', loc: 20000, features: 194, quizzes: 220, achievements: 194, color: '#38bdf8', icon: '🏙' },
    { name: 'House Builder', ver: 'v18.0', loc: 19400, features: 194, quizzes: 210, achievements: 194, color: '#34d399', icon: '🏠' },
    { name: 'Golf Tracker', ver: 'v18.0', loc: 17600, features: 132, quizzes: 165, achievements: 132, color: '#86efac', icon: '⛳' },
    { name: 'Hatcuping', ver: 'v20.0', loc: 15400, features: 178, quizzes: 180, achievements: 178, color: '#67e8f9', icon: '⭐' },
    { name: 'CCF', ver: 'v16.0', loc: 13600, features: 162, quizzes: 180, achievements: 162, color: '#a3e635', icon: '🏛' }
  ];
  var TOTAL_LOC = 230000;
  var TOTAL_SESSIONS = 8400;
  var TECHS = ['Three.js','Tone.js','Canvas','Web Audio','Leaflet','WebGL2','PWA','OSRM','Playwright','Touch','Camera API','Computer Vision'];

  /* ================================================================
   * CSS
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v19-patch-styles';
  style.textContent = [
    '.v19-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v19-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v19-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v19-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v19-canvas{display:block;margin:0 auto}',
    '.v19-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v19-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v19-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v19-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v19-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v19-grid2{grid-template-columns:1fr} .v19-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v19)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* silent */ }
    return _actx;
  }
  var SFX_MAP = {
    nav: function () { tone(880, 0.06, 'sine'); },
    section: function () { tone(660, 0.08, 'triangle'); },
    tab: function () { tone(1200, 0.05, 'sine'); },
    compare: function () { tone(440, 0.1, 'square', 0.15); },
    toast: function () { tone(523, 0.06, 'sine'); tone(659, 0.06, 'sine', 0.06); },
    lifecycle: function () { tone(392, 0.08, 'triangle'); tone(523, 0.08, 'triangle', 0.08); },
    velocity: function () { tone(784, 0.06, 'sine'); },
    wave: function () { tone(330, 0.12, 'sine'); tone(440, 0.08, 'sine', 0.1); },
    quality: function () { tone(587, 0.07, 'triangle'); },
    coverage: function () { tone(698, 0.06, 'sine'); tone(880, 0.06, 'sine', 0.06); },
    polar: function () { tone(494, 0.08, 'square', 0.1); },
    value: function () { tone(523, 0.07, 'sine'); tone(784, 0.07, 'sine', 0.07); tone(1047, 0.07, 'sine', 0.14); }
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
  function sfx(name) { if (SFX_MAP[name]) try { SFX_MAP[name](); } catch (e) { /* silent */ } }

  /* ================================================================
   * TOAST SYSTEM
   * ================================================================ */
  var toastWrap;
  function showToast(title, msg) {
    if (!toastWrap) { toastWrap = el('div', { className: 'v18-toast-wrap' }); document.body.appendChild(toastWrap); }
    var t = el('div', { className: 'v18-toast', innerHTML: '<div class="toast-title">' + title + '</div>' + msg });
    toastWrap.appendChild(t);
    sfx('toast');
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 3500);
  }

  /* ================================================================
   * SECTION 1: Project Lifecycle Pipeline (Canvas 640x380)
   * ================================================================ */
  function buildLifecyclePipeline() {
    var stages = ['Idea', 'Alpha', 'Beta', 'Growth', 'Mature'];
    var stageColors = ['#f43f5e', '#f59e0b', '#22d3ee', '#6366f1', '#22c55e'];
    var projectStages = [
      { name: 'History RPG', stage: 4 }, { name: 'SmartGolf', stage: 4 },
      { name: 'Piano', stage: 4 }, { name: 'Boxing', stage: 3 },
      { name: 'Karaoke', stage: 3 }, { name: 'Violin', stage: 3 },
      { name: 'City Builder', stage: 3 }, { name: 'House Builder', stage: 3 },
      { name: 'Golf Tracker', stage: 3 }, { name: 'Hatcuping', stage: 3 },
      { name: 'CCF', stage: 4 }, { name: 'LevelPlay', stage: 4 }
    ];
    var sec = el('section', { className: 'v19-section', id: 'v19-lifecycle' });
    sec.appendChild(el('h2', { textContent: 'Project Lifecycle Pipeline' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: '12 Projects mapped to Idea → Alpha → Beta → Growth → Mature stages' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '640', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 640, H = 380;
      c.clearRect(0, 0, W, H);
      var colW = (W - 80) / 5, startX = 50;
      stages.forEach(function (s, i) {
        var x = startX + i * colW;
        c.fillStyle = stageColors[i] + '15';
        c.fillRect(x, 40, colW - 6, H - 80);
        c.fillStyle = stageColors[i];
        c.font = 'bold 13px system-ui';
        c.textAlign = 'center';
        c.fillText(s, x + (colW - 6) / 2, 30);
        if (i < 4) {
          c.fillStyle = '#64748b';
          c.font = '16px system-ui';
          c.fillText('→', x + colW - 3, 30);
        }
      });
      projectStages.forEach(function (p, pi) {
        var col = p.stage;
        var x = startX + col * colW + 8;
        var row = 0;
        for (var j = 0; j < pi; j++) { if (projectStages[j].stage === col) row++; }
        var y = 55 + row * 28;
        var w = colW - 22, h = 22;
        c.fillStyle = stageColors[col] + '30';
        c.beginPath();
        c.roundRect(x, y, w, h, 6);
        c.fill();
        c.strokeStyle = stageColors[col];
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = stageColors[col];
        c.font = '11px system-ui';
        c.textAlign = 'center';
        c.fillText(p.name, x + w / 2, y + 15);
      });
      var counts = [0, 0, 0, 0, 0];
      projectStages.forEach(function (p) { counts[p.stage]++; });
      c.font = '11px system-ui';
      c.textAlign = 'center';
      stages.forEach(function (s, i) {
        c.fillStyle = '#64748b';
        c.fillText(counts[i] + ' project' + (counts[i] !== 1 ? 's' : ''), startX + i * colW + (colW - 6) / 2, H - 25);
      });
    }
    setTimeout(draw, 100);
    return sec;
  }

  /* ================================================================
   * SECTION 2: Developer Velocity Gauge (Canvas 580x360)
   * ================================================================ */
  function buildVelocityGauge() {
    var sec = el('section', { className: 'v19-section', id: 'v19-velocity' });
    sec.appendChild(el('h2', { textContent: 'Developer Velocity Gauge' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: 'Features shipped per week across all projects' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '580', height: '360' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 580, H = 360;
      c.clearRect(0, 0, W, H);
      var cx = W / 2, cy = 200, r = 130;
      var totalFeatures = 0;
      PROJECTS.forEach(function (p) { totalFeatures += p.features; });
      var weeksActive = 16;
      var velocity = (totalFeatures / weeksActive).toFixed(1);
      var maxV = 200;
      var pct = Math.min(velocity / maxV, 1);
      var startAngle = Math.PI * 0.8;
      var endAngle = Math.PI * 2.2;
      var range = endAngle - startAngle;
      for (var i = 0; i < 50; i++) {
        var a1 = startAngle + (i / 50) * range;
        var a2 = startAngle + ((i + 1) / 50) * range;
        var ratio = i / 50;
        var color = ratio < 0.33 ? '#22c55e' : ratio < 0.66 ? '#f59e0b' : '#f43f5e';
        c.beginPath();
        c.arc(cx, cy, r, a1, a2);
        c.strokeStyle = color + '25';
        c.lineWidth = 18;
        c.stroke();
      }
      var needleAngle = startAngle + pct * range;
      c.beginPath();
      c.arc(cx, cy, r, startAngle, needleAngle);
      c.strokeStyle = pct < 0.33 ? '#22c55e' : pct < 0.66 ? '#f59e0b' : '#6366f1';
      c.lineWidth = 18;
      c.lineCap = 'round';
      c.stroke();
      c.lineCap = 'butt';
      c.beginPath();
      c.moveTo(cx, cy);
      c.lineTo(cx + Math.cos(needleAngle) * (r - 25), cy + Math.sin(needleAngle) * (r - 25));
      c.strokeStyle = '#e2e8f0';
      c.lineWidth = 3;
      c.stroke();
      c.beginPath();
      c.arc(cx, cy, 8, 0, Math.PI * 2);
      c.fillStyle = '#6366f1';
      c.fill();
      c.fillStyle = '#e2e8f0';
      c.font = 'bold 36px system-ui';
      c.textAlign = 'center';
      c.fillText(velocity, cx, cy + 55);
      c.fillStyle = '#94a3b8';
      c.font = '13px system-ui';
      c.fillText('features/week', cx, cy + 75);
      c.font = '11px system-ui';
      c.fillText('0', cx + Math.cos(startAngle) * (r + 20), cy + Math.sin(startAngle) * (r + 20));
      c.fillText(maxV.toString(), cx + Math.cos(endAngle) * (r + 20), cy + Math.sin(endAngle) * (r + 20));
      c.fillText(Math.round(maxV / 2).toString(), cx, cy - r - 15);
      c.fillStyle = '#64748b';
      c.font = '12px system-ui';
      c.fillText('Total: ' + totalFeatures + ' features in ' + weeksActive + ' weeks', cx, H - 20);
    }
    setTimeout(draw, 150);
    return sec;
  }

  /* ================================================================
   * SECTION 3: Tech Adoption Wave (Canvas 620x380)
   * ================================================================ */
  function buildTechWave() {
    var techs = [
      { name: 'HTML/CSS/JS', adopted: 1, depth: 10 },
      { name: 'Canvas 2D', adopted: 2, depth: 10 },
      { name: 'PWA', adopted: 3, depth: 9 },
      { name: 'Three.js', adopted: 4, depth: 8 },
      { name: 'Tone.js', adopted: 5, depth: 8 },
      { name: 'Web Audio', adopted: 5, depth: 9 },
      { name: 'Leaflet', adopted: 3, depth: 7 },
      { name: 'WebGL2', adopted: 7, depth: 6 },
      { name: 'Computer Vision', adopted: 8, depth: 5 },
      { name: 'Touch Gestures', adopted: 6, depth: 8 }
    ];
    var sec = el('section', { className: 'v19-section', id: 'v19-wave' });
    sec.appendChild(el('h2', { textContent: 'Tech Adoption Wave' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: 'Technology adoption timeline and depth of integration' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '620', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 380;
      c.clearRect(0, 0, W, H);
      var padL = 120, padR = 30, padT = 40, padB = 50;
      var chartW = W - padL - padR, chartH = H - padT - padB;
      c.strokeStyle = 'rgba(99,102,241,.1)';
      c.lineWidth = 0.5;
      for (var i = 0; i <= 10; i++) {
        var x = padL + (i / 10) * chartW;
        c.beginPath(); c.moveTo(x, padT); c.lineTo(x, H - padB); c.stroke();
      }
      var barH = chartH / techs.length - 4;
      var colors = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#f43f5e', '#a78bfa', '#38bdf8', '#fb7185', '#34d399', '#fbbf24'];
      techs.forEach(function (t, i) {
        var y = padT + i * (chartH / techs.length) + 2;
        var startX = padL + (t.adopted / 12) * chartW;
        var barW = (t.depth / 10) * (chartW - (t.adopted / 12) * chartW) * 0.8;
        c.fillStyle = colors[i] + '30';
        c.beginPath(); c.roundRect(startX, y, barW, barH, 4); c.fill();
        c.fillStyle = colors[i];
        c.beginPath(); c.roundRect(startX, y, barW * 0.7, barH, 4); c.fill();
        c.globalAlpha = 0.7;
        c.fillStyle = colors[i];
        c.beginPath(); c.roundRect(startX + barW * 0.7, y, barW * 0.3, barH, [0, 4, 4, 0]); c.fill();
        c.globalAlpha = 1;
        c.fillStyle = '#e2e8f0';
        c.font = '11px system-ui';
        c.textAlign = 'right';
        c.fillText(t.name, padL - 8, y + barH / 2 + 4);
        c.textAlign = 'left';
        c.fillStyle = '#fff';
        c.font = 'bold 10px system-ui';
        if (barW > 60) c.fillText('Depth: ' + t.depth + '/10', startX + 8, y + barH / 2 + 3);
      });
      c.fillStyle = '#64748b';
      c.font = '11px system-ui';
      c.textAlign = 'center';
      c.fillText('Week 1', padL, H - 20);
      c.fillText('Week 6', padL + chartW / 2, H - 20);
      c.fillText('Week 12', padL + chartW, H - 20);
    }
    setTimeout(draw, 200);
    return sec;
  }

  /* ================================================================
   * SECTION 4: Project Quality Matrix (Canvas 640x400)
   * ================================================================ */
  function buildQualityMatrix() {
    var dims = ['Mobile UX', 'Performance', 'Features', 'Audio', 'Visuals', 'Data'];
    var scores = [
      [9, 8, 10, 7, 9, 8], [10, 9, 10, 6, 8, 10], [8, 7, 8, 5, 7, 6],
      [9, 8, 9, 10, 8, 6], [8, 8, 9, 7, 9, 5], [9, 8, 9, 10, 8, 6],
      [9, 7, 9, 9, 8, 5], [8, 7, 10, 8, 9, 7], [8, 7, 10, 7, 9, 6],
      [8, 8, 7, 6, 7, 8], [9, 8, 9, 7, 8, 5], [9, 9, 8, 4, 7, 10]
    ];
    var sec = el('section', { className: 'v19-section', id: 'v19-quality' });
    sec.appendChild(el('h2', { textContent: 'Project Quality Matrix' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: '12 Projects × 6 Quality Dimensions Heatmap' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '640', height: '400' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 640, H = 400;
      c.clearRect(0, 0, W, H);
      var padL = 100, padT = 50, cellW = (W - padL - 20) / dims.length, cellH = (H - padT - 40) / PROJECTS.length;
      dims.forEach(function (d, i) {
        c.save();
        c.translate(padL + i * cellW + cellW / 2, padT - 8);
        c.fillStyle = '#94a3b8';
        c.font = 'bold 10px system-ui';
        c.textAlign = 'center';
        c.fillText(d, 0, 0);
        c.restore();
      });
      PROJECTS.forEach(function (p, pi) {
        var y = padT + pi * cellH;
        c.fillStyle = '#e2e8f0';
        c.font = '11px system-ui';
        c.textAlign = 'right';
        c.fillText(p.name, padL - 8, y + cellH / 2 + 4);
        dims.forEach(function (d, di) {
          var val = scores[pi][di];
          var x = padL + di * cellW;
          var intensity = val / 10;
          var r = Math.round(99 + (34 - 99) * intensity);
          var g = Math.round(102 + (197 - 102) * intensity);
          var b = Math.round(241 + (94 - 241) * intensity);
          c.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.2 + intensity * 0.6) + ')';
          c.beginPath(); c.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 4); c.fill();
          c.fillStyle = intensity > 0.7 ? '#fff' : '#e2e8f0';
          c.font = 'bold 12px system-ui';
          c.textAlign = 'center';
          c.fillText(val.toString(), x + cellW / 2, y + cellH / 2 + 4);
        });
      });
      var avgRow = dims.map(function (d, di) {
        var sum = 0; scores.forEach(function (s) { sum += s[di]; }); return (sum / scores.length).toFixed(1);
      });
      var avgY = padT + PROJECTS.length * cellH + 5;
      c.fillStyle = '#94a3b8';
      c.font = 'bold 10px system-ui';
      c.textAlign = 'right';
      c.fillText('Average', padL - 8, avgY + 12);
      avgRow.forEach(function (v, i) {
        c.fillStyle = '#6366f1';
        c.font = 'bold 11px system-ui';
        c.textAlign = 'center';
        c.fillText(v, padL + i * cellW + cellW / 2, avgY + 12);
      });
    }
    setTimeout(draw, 250);
    return sec;
  }

  /* ================================================================
   * SECTION 5: Feature Coverage Treemap (Canvas 620x380)
   * ================================================================ */
  function buildCoverageTreemap() {
    var categories = [
      { name: 'Canvas Charts', count: 96, color: '#6366f1' },
      { name: 'Quizzes', count: 42, color: '#22d3ee' },
      { name: 'Audio/Music', count: 38, color: '#a78bfa' },
      { name: 'Game Mechanics', count: 35, color: '#f43f5e' },
      { name: '3D/WebGL', count: 28, color: '#f59e0b' },
      { name: 'Data/Maps', count: 24, color: '#22c55e' },
      { name: 'Achievements', count: 22, color: '#fb7185' },
      { name: 'UI/UX', count: 18, color: '#38bdf8' },
      { name: 'PWA/Offline', count: 12, color: '#34d399' },
      { name: 'CV/Camera', count: 8, color: '#fbbf24' }
    ];
    var sec = el('section', { className: 'v19-section', id: 'v19-coverage' });
    sec.appendChild(el('h2', { textContent: 'Feature Coverage Treemap' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: 'Feature distribution across 10 major categories' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '620', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 380;
      c.clearRect(0, 0, W, H);
      var total = 0;
      categories.forEach(function (cat) { total += cat.count; });
      var rects = [];
      var remaining = { x: 20, y: 30, w: W - 40, h: H - 60 };
      var items = categories.slice();
      var vertical = true;
      items.forEach(function (item, idx) {
        var ratio = item.count / total;
        var rect;
        if (vertical) {
          var h = remaining.h * ratio * (items.length / (items.length - idx * 0.3));
          h = Math.min(h, remaining.h);
          rect = { x: remaining.x, y: remaining.y, w: remaining.w * 0.55, h: h };
          if (idx % 2 === 0) {
            rect.w = remaining.w * 0.55;
          } else {
            rect.x = remaining.x + remaining.w * 0.55 + 3;
            rect.w = remaining.w * 0.45 - 3;
          }
        }
        if (!rect || rect.h < 10) {
          rect = {
            x: remaining.x + (idx % 3) * (remaining.w / 3),
            y: remaining.y + Math.floor(idx / 3) * (remaining.h / 4),
            w: remaining.w / 3 - 3,
            h: remaining.h / 4 - 3
          };
        }
        rects.push({ rect: rect, item: item });
      });
      var cols = 3;
      var rows = Math.ceil(items.length / cols);
      var gapX = 4, gapY = 4;
      var cellW = (W - 40 - (cols - 1) * gapX) / cols;
      rects = [];
      items.forEach(function (item, idx) {
        var col = idx % cols;
        var row = Math.floor(idx / cols);
        var baseH = (H - 60 - (rows - 1) * gapY) / rows;
        var h = baseH * (0.6 + (item.count / total) * 3);
        h = Math.max(h, 40);
        h = Math.min(h, baseH * 1.3);
        rects.push({
          x: 20 + col * (cellW + gapX),
          y: 30 + row * (baseH + gapY),
          w: cellW,
          h: h,
          item: item
        });
      });
      rects.forEach(function (r) {
        c.fillStyle = r.item.color + '35';
        c.beginPath(); c.roundRect(r.x, r.y, r.w, r.h, 8); c.fill();
        c.strokeStyle = r.item.color;
        c.lineWidth = 1.5;
        c.stroke();
        c.fillStyle = r.item.color;
        c.font = 'bold 13px system-ui';
        c.textAlign = 'center';
        c.fillText(r.item.name, r.x + r.w / 2, r.y + r.h / 2 - 6);
        c.fillStyle = '#e2e8f0';
        c.font = 'bold 18px system-ui';
        c.fillText(r.item.count.toString(), r.x + r.w / 2, r.y + r.h / 2 + 16);
        c.fillStyle = '#94a3b8';
        c.font = '10px system-ui';
        c.fillText((r.item.count / total * 100).toFixed(0) + '%', r.x + r.w / 2, r.y + r.h / 2 + 30);
      });
    }
    setTimeout(draw, 300);
    return sec;
  }

  /* ================================================================
   * SECTION 6: Commit Frequency Polar Chart (Canvas 560x380)
   * ================================================================ */
  function buildCommitPolar() {
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var commits = [18, 22, 20, 24, 16, 28, 26];
    var sec = el('section', { className: 'v19-section', id: 'v19-polar' });
    sec.appendChild(el('h2', { textContent: 'Commit Frequency Polar' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: 'Development activity distribution across days of the week' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '560', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 560, H = 380;
      c.clearRect(0, 0, W, H);
      var cx = W / 2, cy = H / 2 + 10, maxR = 140;
      var maxVal = Math.max.apply(null, commits);
      for (var ring = 1; ring <= 4; ring++) {
        c.beginPath();
        c.arc(cx, cy, maxR * ring / 4, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(99,102,241,.1)';
        c.lineWidth = 0.5;
        c.stroke();
        c.fillStyle = '#64748b';
        c.font = '9px system-ui';
        c.textAlign = 'center';
        c.fillText(Math.round(maxVal * ring / 4).toString(), cx, cy - maxR * ring / 4 + 12);
      }
      var n = days.length;
      days.forEach(function (d, i) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var ex = cx + Math.cos(angle) * (maxR + 20);
        var ey = cy + Math.sin(angle) * (maxR + 20);
        c.strokeStyle = 'rgba(99,102,241,.08)';
        c.beginPath();
        c.moveTo(cx, cy);
        c.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        c.stroke();
        c.fillStyle = '#94a3b8';
        c.font = 'bold 12px system-ui';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(d, ex, ey);
      });
      c.beginPath();
      commits.forEach(function (v, i) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var r = (v / maxVal) * maxR;
        var x = cx + Math.cos(angle) * r;
        var y = cy + Math.sin(angle) * r;
        if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
      });
      c.closePath();
      c.fillStyle = 'rgba(99,102,241,.15)';
      c.fill();
      c.strokeStyle = '#6366f1';
      c.lineWidth = 2;
      c.stroke();
      commits.forEach(function (v, i) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var r = (v / maxVal) * maxR;
        var x = cx + Math.cos(angle) * r;
        var y = cy + Math.sin(angle) * r;
        c.beginPath();
        c.arc(x, y, 5, 0, Math.PI * 2);
        c.fillStyle = '#6366f1';
        c.fill();
        c.strokeStyle = '#0a0a1a';
        c.lineWidth = 2;
        c.stroke();
        c.fillStyle = '#e2e8f0';
        c.font = 'bold 10px system-ui';
        c.textAlign = 'center';
        c.fillText(v.toString(), x, y - 12);
      });
      c.textBaseline = 'alphabetic';
      var total = 0; commits.forEach(function (v) { total += v; });
      c.fillStyle = '#64748b';
      c.font = '12px system-ui';
      c.textAlign = 'center';
      c.fillText('Total: ' + total + ' commits/week avg | Peak: ' + days[commits.indexOf(maxVal)], cx, H - 15);
    }
    setTimeout(draw, 350);
    return sec;
  }

  /* ================================================================
   * SECTION 7: Portfolio Value Calculator (Canvas 600x380)
   * ================================================================ */
  function buildValueCalc() {
    var metrics = [
      { name: 'Lines of Code', value: TOTAL_LOC, unit: 'LOC', weight: 0.15, score: 95 },
      { name: 'Total Features', value: 0, unit: 'features', weight: 0.2, score: 92 },
      { name: 'Quiz Questions', value: 0, unit: 'questions', weight: 0.1, score: 88 },
      { name: 'Achievements', value: 0, unit: 'badges', weight: 0.1, score: 90 },
      { name: 'Tech Stack Depth', value: TECHS.length, unit: 'technologies', weight: 0.15, score: 85 },
      { name: 'Projects Count', value: 12, unit: 'projects', weight: 0.15, score: 96 },
      { name: 'Dev Sessions', value: TOTAL_SESSIONS, unit: 'sessions', weight: 0.15, score: 93 }
    ];
    PROJECTS.forEach(function (p) {
      metrics[1].value += p.features;
      metrics[2].value += p.quizzes;
      metrics[3].value += p.achievements;
    });
    var sec = el('section', { className: 'v19-section', id: 'v19-value' });
    sec.appendChild(el('h2', { textContent: 'Portfolio Value Calculator' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: 'Weighted composite score across 7 portfolio metrics' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '600', height: '380' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 600, H = 380;
      c.clearRect(0, 0, W, H);
      var barH = 28, gap = 8, startY = 40, barMaxW = 320;
      var colors = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#a78bfa', '#f43f5e', '#38bdf8'];
      var weightedTotal = 0;
      metrics.forEach(function (m, i) {
        var y = startY + i * (barH + gap);
        c.fillStyle = '#e2e8f0';
        c.font = '11px system-ui';
        c.textAlign = 'right';
        c.fillText(m.name, 140, y + barH / 2 + 4);
        var barW = (m.score / 100) * barMaxW;
        c.fillStyle = colors[i] + '20';
        c.beginPath(); c.roundRect(155, y, barMaxW, barH, 6); c.fill();
        c.fillStyle = colors[i];
        c.beginPath(); c.roundRect(155, y, barW, barH, 6); c.fill();
        c.fillStyle = '#fff';
        c.font = 'bold 11px system-ui';
        c.textAlign = 'left';
        if (barW > 80) c.fillText(m.value.toLocaleString() + ' ' + m.unit, 163, y + barH / 2 + 4);
        c.fillStyle = colors[i];
        c.font = 'bold 12px system-ui';
        c.textAlign = 'left';
        c.fillText(m.score + '/100', 155 + barMaxW + 10, y + barH / 2 + 4);
        c.fillStyle = '#64748b';
        c.font = '10px system-ui';
        c.fillText('w:' + (m.weight * 100) + '%', 155 + barMaxW + 60, y + barH / 2 + 4);
        weightedTotal += m.score * m.weight;
      });
      var totalY = startY + metrics.length * (barH + gap) + 15;
      c.fillStyle = '#6366f1';
      c.font = 'bold 28px system-ui';
      c.textAlign = 'center';
      c.fillText(weightedTotal.toFixed(1), W / 2, totalY + 10);
      c.fillStyle = '#94a3b8';
      c.font = '13px system-ui';
      c.fillText('Weighted Portfolio Score / 100', W / 2, totalY + 30);
      var grade = weightedTotal >= 90 ? 'S' : weightedTotal >= 80 ? 'A' : weightedTotal >= 70 ? 'B' : 'C';
      var gradeColor = grade === 'S' ? '#fbbf24' : grade === 'A' ? '#22c55e' : '#22d3ee';
      c.fillStyle = gradeColor;
      c.font = 'bold 22px system-ui';
      c.fillText('Grade: ' + grade, W / 2, totalY + 55);
    }
    setTimeout(draw, 400);
    return sec;
  }

  /* ================================================================
   * SECTION 8: Achievement Collection Grid (Canvas 620x400)
   * ================================================================ */
  function buildAchievementGrid() {
    var sec = el('section', { className: 'v19-section', id: 'v19-achievements' });
    sec.appendChild(el('h2', { textContent: 'Achievement Collection Grid' }));
    sec.appendChild(el('p', { className: 'v19-section-sub', textContent: 'All project achievements visualized by category and count' }));
    var card = el('div', { className: 'v19-card' });
    var cvs = el('canvas', { className: 'v19-canvas', width: '620', height: '400' });
    card.appendChild(cvs);
    sec.appendChild(card);

    function draw() {
      var c = cvs.getContext('2d'), W = 620, H = 400;
      c.clearRect(0, 0, W, H);
      var totalAch = 0;
      PROJECTS.forEach(function (p) { totalAch += p.achievements; });
      var cols = 4, rows = 3;
      var padL = 20, padT = 30, padR = 20, padB = 50;
      var cellW = (W - padL - padR) / cols;
      var cellH = (H - padT - padB) / rows;
      PROJECTS.forEach(function (p, idx) {
        var col = idx % cols;
        var row = Math.floor(idx / cols);
        var x = padL + col * cellW;
        var y = padT + row * cellH;
        c.fillStyle = p.color + '15';
        c.beginPath(); c.roundRect(x + 3, y + 3, cellW - 6, cellH - 6, 10); c.fill();
        c.strokeStyle = p.color + '40';
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = p.color;
        c.font = '24px system-ui';
        c.textAlign = 'center';
        c.fillText(p.icon, x + cellW / 2, y + 32);
        c.fillStyle = '#e2e8f0';
        c.font = 'bold 12px system-ui';
        c.fillText(p.name, x + cellW / 2, y + 52);
        c.fillStyle = p.color;
        c.font = 'bold 22px system-ui';
        c.fillText(p.achievements.toString(), x + cellW / 2, y + 78);
        c.fillStyle = '#94a3b8';
        c.font = '10px system-ui';
        c.fillText('achievements', x + cellW / 2, y + 92);
        var pct = p.achievements / 300;
        var barW = cellW - 24;
        var barY = y + cellH - 22;
        c.fillStyle = 'rgba(99,102,241,.1)';
        c.beginPath(); c.roundRect(x + 12, barY, barW, 8, 4); c.fill();
        c.fillStyle = p.color;
        c.beginPath(); c.roundRect(x + 12, barY, barW * pct, 8, 4); c.fill();
      });
      c.fillStyle = '#6366f1';
      c.font = 'bold 14px system-ui';
      c.textAlign = 'center';
      c.fillText('Total Achievements: ' + totalAch + ' across 12 projects', W / 2, H - 15);
    }
    setTimeout(draw, 450);
    return sec;
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+1~8)
   * ================================================================ */
  var keyMap = {
    '!': 'v19-lifecycle', '@': 'v19-velocity', '#': 'v19-wave', '$': 'v19-quality',
    '%': 'v19-coverage', '^': 'v19-polar', '&': 'v19-value', '*': 'v19-achievements'
  };
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var target = keyMap[e.key];
    if (target) {
      e.preventDefault();
      var el = document.getElementById(target);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('nav'); }
    }
  });

  /* ================================================================
   * KPI ROW UPDATE
   * ================================================================ */
  function updateKPIs() {
    var statNums = $$('.stat-num');
    statNums.forEach(function (s) {
      var label = s.nextElementSibling;
      if (!label) return;
      var txt = label.textContent.toLowerCase();
      if (txt.indexOf('loc') >= 0 || txt.indexOf('lines') >= 0) {
        s.setAttribute('data-count', '230');
        s.textContent = '230K+';
      }
      if (txt.indexOf('session') >= 0) {
        s.setAttribute('data-count', '8400');
        s.textContent = '8,400';
      }
    });
  }

  /* ================================================================
   * COMPARE OVERLAY: project vs project
   * ================================================================ */
  function setupCompare() {
    var overlay = $('.v18-compare-overlay');
    if (!overlay) return;
    var box = overlay.querySelector('.v18-compare-box');
    if (!box) return;
    var sel = box.querySelectorAll('select');
    if (sel.length >= 2) {
      PROJECTS.forEach(function (p) {
        var opt1 = new Option(p.name + ' ' + p.ver, p.name);
        var opt2 = new Option(p.name + ' ' + p.ver, p.name);
        sel[0].appendChild(opt1);
        sel[1].appendChild(opt2);
      });
    }
  }

  /* ================================================================
   * INJECT ALL SECTIONS
   * ================================================================ */
  function injectSections() {
    var anchor = $('footer') || document.body.lastElementChild;
    var container = document.createElement('div');
    container.id = 'v19-sections';
    container.appendChild(buildLifecyclePipeline());
    container.appendChild(buildVelocityGauge());
    container.appendChild(buildTechWave());
    container.appendChild(buildQualityMatrix());
    container.appendChild(buildCoverageTreemap());
    container.appendChild(buildCommitPolar());
    container.appendChild(buildValueCalc());
    container.appendChild(buildAchievementGrid());
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(container, anchor);
    } else {
      document.body.appendChild(container);
    }
    updateKPIs();
    setupCompare();
    showToast('v19.0 Loaded', '8 new Canvas analytics • 12 projects updated • Shift+1~8 shortcuts');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSections);
  } else {
    injectSections();
  }
})();
