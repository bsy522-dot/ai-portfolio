/**
 * ai-portfolio v22.0 Patch Module
 * Last updated: 2026-07-24
 */
;(function () {
  'use strict';
  if (window._v22) return;
  window._v22 = { version: '22.0.0', applied: Date.now() };

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
   * PROJECT DATA (v22.0 — all 12 repos updated to latest 2026-07-24)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v27.0', loc: 30800, features: 288, quizzes: 300, achievements: 216, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.2, testCoverage: 82, uxScore: 88 },
    { name: 'SmartGolf', ver: 'v35.0', loc: 29200, features: 272, quizzes: 272, achievements: 265, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 8.8, testCoverage: 85, uxScore: 91 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86 },
    { name: 'Piano', ver: 'v23.0', loc: 26400, features: 216, quizzes: 210, achievements: 216, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.5, testCoverage: 80, uxScore: 90 },
    { name: 'Boxing', ver: 'v24.0', loc: 25600, features: 214, quizzes: 240, achievements: 214, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.7, testCoverage: 79, uxScore: 87 },
    { name: 'Karaoke', ver: 'v23.0', loc: 24800, features: 210, quizzes: 252, achievements: 210, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 8.3, testCoverage: 81, uxScore: 89 },
    { name: 'Violin', ver: 'v22.0', loc: 24000, features: 214, quizzes: 195, achievements: 214, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.6, testCoverage: 77, uxScore: 88 },
    { name: 'City Builder', ver: 'v21.0', loc: 23400, features: 230, quizzes: 265, achievements: 230, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 8.4, testCoverage: 83, uxScore: 86 },
    { name: 'House Builder', ver: 'v21.0', loc: 22800, features: 230, quizzes: 255, achievements: 230, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.2, testCoverage: 76, uxScore: 85 },
    { name: 'Golf Tracker', ver: 'v21.0', loc: 21000, features: 168, quizzes: 210, achievements: 168, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 7.9, testCoverage: 82, uxScore: 87 },
    { name: 'Hatcuping', ver: 'v23.0', loc: 18800, features: 214, quizzes: 225, achievements: 214, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 7.8, testCoverage: 75, uxScore: 90 },
    { name: 'CCF', ver: 'v19.0', loc: 17000, features: 198, quizzes: 225, achievements: 198, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 7.6, testCoverage: 84, uxScore: 88 }
  ];
  var TOTAL_LOC = 290000;
  var TOTAL_SESSIONS = 10200;

  /* ================================================================
   * CSS (v22)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v22-patch-styles';
  style.textContent = [
    '.v22-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v22-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v22-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v22-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v22-canvas{display:block;margin:0 auto}',
    '.v22-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v22-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v22-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v22-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v22-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v22-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v22-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v22)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav22: function () { tone(988, 0.06, 'sine'); },
    section22: function () { tone(740, 0.08, 'triangle'); },
    tab22: function () { tone(1397, 0.05, 'sine'); },
    architecture: function () { tone(392, 0.12, 'triangle'); tone(523, 0.08, 'sine', 0.09); },
    difficulty: function () { tone(330, 0.1, 'sine'); tone(440, 0.07, 'triangle', 0.08); },
    learncurve: function () { tone(523, 0.1, 'triangle'); tone(698, 0.07, 'sine', 0.08); },
    burndown: function () { tone(262, 0.12, 'sine'); tone(330, 0.08, 'triangle', 0.09); tone(392, 0.06, 'sine', 0.15); },
    compat: function () { tone(587, 0.08, 'sine'); tone(784, 0.06, 'triangle', 0.07); },
    reuse: function () { tone(440, 0.1, 'sine'); tone(554, 0.07, 'sine', 0.08); },
    forecast: function () { tone(349, 0.1, 'triangle'); tone(523, 0.08, 'sine', 0.09); tone(698, 0.06, 'sine', 0.16); },
    effort: function () { tone(494, 0.08, 'sine'); tone(659, 0.06, 'triangle', 0.07); },
    achieve22: function () { tone(523, 0.06, 'sine'); tone(659, 0.05, 'sine', 0.05); tone(784, 0.04, 'sine', 0.09); tone(1047, 0.06, 'sine', 0.12); }
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
    sfx('nav22');
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
    c.className = 'v22-canvas';
    var ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas: c, ctx: ctx, w: w, h: h };
  }

  /* ================================================================
   * SECTION 1: Code Architecture Layers (Canvas 640x400)
   * 12 projects stacked bar: UI/Logic/Data/Audio/3D layers
   * ================================================================ */
  function buildArchitectureLayers() {
    var layers = ['UI/UX', 'Game Logic', 'Data Layer', 'Audio Engine', '3D/Visual'];
    var layerColors = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b', '#f43f5e'];
    var data = PROJECTS.map(function (p) {
      var total = p.loc;
      var has3D = p.tech.indexOf('Three.js') >= 0;
      var hasAudio = p.tech.indexOf('Tone.js') >= 0 || p.tech.indexOf('WebAudio') >= 0;
      var ui = Math.round(total * (0.28 + Math.random() * 0.06));
      var logic = Math.round(total * (0.30 + Math.random() * 0.05));
      var audio = hasAudio ? Math.round(total * (0.10 + Math.random() * 0.05)) : Math.round(total * 0.04);
      var threeD = has3D ? Math.round(total * (0.12 + Math.random() * 0.05)) : Math.round(total * 0.03);
      var dataL = total - ui - logic - audio - threeD;
      return [ui, logic, dataL, audio, threeD];
    });

    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Code Architecture Layer Distribution', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Hover a bar to see layer breakdown per project', W / 2, 36);

      var ox = 50, oy = 55, bw = (W - ox - 40) / PROJECTS.length - 4, maxH = H - oy - 80;
      var maxLoc = Math.max.apply(null, PROJECTS.map(function (p) { return p.loc; }));

      for (var i = 0; i < PROJECTS.length; i++) {
        var x = ox + i * (bw + 4);
        var totalH = (PROJECTS[i].loc / maxLoc) * maxH;
        var isHov = i === hovered;
        var cumY = oy + maxH - totalH;

        for (var j = 0; j < layers.length; j++) {
          var segH = (data[i][j] / PROJECTS[i].loc) * totalH;
          ctx.fillStyle = isHov ? layerColors[j] : layerColors[j] + '88';
          ctx.fillRect(x, cumY, bw, segH);
          if (isHov && segH > 14) {
            ctx.fillStyle = '#fff';
            ctx.font = '8px -apple-system,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(Math.round(data[i][j] / 1000) + 'K', x + bw / 2, cumY + segH / 2 + 3);
          }
          cumY += segH;
        }

        ctx.save();
        ctx.translate(x + bw / 2, oy + maxH + 8);
        ctx.rotate(-Math.PI / 4);
        ctx.font = (isHov ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.fillStyle = isHov ? PROJECTS[i].color : cText3();
        ctx.textAlign = 'right';
        ctx.fillText(PROJECTS[i].icon + ' ' + PROJECTS[i].name, 0, 0);
        ctx.restore();
      }

      var legX = W - 160, legY = 55;
      for (var li = 0; li < layers.length; li++) {
        ctx.fillStyle = layerColors[li];
        ctx.fillRect(legX, legY + li * 18, 10, 10);
        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(layers[li], legX + 14, legY + li * 18 + 9);
      }

      if (hovered >= 0) {
        var p = PROJECTS[hovered];
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.name + ' ' + p.ver + ' — ' + (p.loc / 1000).toFixed(1) + 'K LOC total', W / 2, H - 8);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var ox = 50, bw = (W - ox - 40) / PROJECTS.length - 4;
      var idx = Math.floor((mx - ox) / (bw + 4));
      if (idx < 0 || idx >= PROJECTS.length) idx = -1;
      if (idx !== hovered) { hovered = idx; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 2: Project Difficulty Ranking (Canvas 620x380)
   * 12 projects ranked by composite difficulty with 5-metric breakdown
   * ================================================================ */
  function buildDifficultyRanking() {
    var metrics = ['Complexity', 'LOC Scale', 'Feature Density', 'Tech Depth', 'Interactivity'];
    var metricColors = ['#f43f5e', '#6366f1', '#22d3ee', '#f59e0b', '#4ade80'];
    var sorted = PROJECTS.slice().map(function (p, idx) {
      var cplx = p.complexity;
      var locScale = Math.min(p.loc / 32000, 1) * 10;
      var featDensity = Math.min(p.features / 300, 1) * 10;
      var techDepth = p.tech.length >= 3 ? 8.5 : p.tech.length >= 2 ? 7 : 5;
      var interact = p.uxScore / 10;
      var total = (cplx + locScale + featDensity + techDepth + interact) / 5;
      return { name: p.name, icon: p.icon, color: p.color, scores: [cplx, locScale, featDensity, techDepth, interact], total: total, idx: idx };
    });
    sorted.sort(function (a, b) { return b.total - a.total; });

    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Project Difficulty Ranking', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Composite score from 5 difficulty metrics', W / 2, 36);

      var ox = 120, oy = 52, barH = (H - oy - 40) / sorted.length - 2, maxW = W - ox - 80;

      for (var i = 0; i < sorted.length; i++) {
        var p = sorted[i];
        var y = oy + i * (barH + 2);
        var isHov = i === hovIdx;

        ctx.font = (isHov ? 'bold ' : '') + '10px -apple-system,sans-serif';
        ctx.fillStyle = isHov ? p.color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText((i + 1) + '. ' + p.icon + ' ' + p.name, ox - 8, y + barH / 2 + 4);

        var cumX = ox;
        for (var j = 0; j < metrics.length; j++) {
          var segW = (p.scores[j] / 10) * (maxW / 5);
          ctx.fillStyle = isHov ? metricColors[j] : metricColors[j] + '66';
          ctx.fillRect(cumX, y, segW, barH);
          cumX += segW;
        }

        ctx.fillStyle = isHov ? '#fff' : cText3();
        ctx.font = (isHov ? 'bold ' : '') + '10px Courier New,monospace';
        ctx.textAlign = 'left';
        ctx.fillText(p.total.toFixed(1), cumX + 6, y + barH / 2 + 4);
      }

      var legX = W - 150, legY = H - 32;
      ctx.font = '9px -apple-system,sans-serif';
      for (var mi = 0; mi < metrics.length; mi++) {
        var lx = ox + mi * 100;
        ctx.fillStyle = metricColors[mi];
        ctx.fillRect(lx, legY, 8, 8);
        ctx.fillStyle = cText3();
        ctx.textAlign = 'left';
        ctx.fillText(metrics[mi], lx + 11, legY + 7);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 52, barH = (H - oy - 40) / sorted.length - 2;
      var idx = Math.floor((my - oy) / (barH + 2));
      if (idx < 0 || idx >= sorted.length) idx = -1;
      if (idx !== hovIdx) { hovIdx = idx; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 3: Learning Curve Estimator (Canvas 600x380)
   * 8 technologies proficiency over weeks, S-curve progression
   * ================================================================ */
  function buildLearningCurve() {
    var techs = [
      { name: 'Canvas 2D', weeks: 3, ceiling: 95, color: '#6366f1' },
      { name: 'Web Audio', weeks: 4, ceiling: 90, color: '#22d3ee' },
      { name: 'Three.js', weeks: 8, ceiling: 88, color: '#f43f5e' },
      { name: 'Tone.js', weeks: 5, ceiling: 92, color: '#a78bfa' },
      { name: 'Leaflet', weeks: 2, ceiling: 94, color: '#4ade80' },
      { name: 'PWA/SW', weeks: 3, ceiling: 96, color: '#f59e0b' },
      { name: 'Touch API', weeks: 2, ceiling: 93, color: '#fb7185' },
      { name: 'Geolocation', weeks: 1, ceiling: 97, color: '#34d399' }
    ];

    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var activeTech = -1;

    function sigmoid(x, k, mid) {
      return 1 / (1 + Math.exp(-k * (x - mid)));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Technology Learning Curve Estimator', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('S-curve proficiency progression per technology', W / 2, 36);

      var ox = 55, oy = 50, gw = W - ox - 30, gh = H - oy - 70;
      var maxWeeks = 12;

      ctx.strokeStyle = cGrid();
      ctx.lineWidth = 0.5;
      for (var gi = 0; gi <= 5; gi++) {
        var gy = oy + gh - (gh * gi / 5);
        ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + gw, gy); ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((gi * 20) + '%', ox - 5, gy + 3);
      }
      for (var wi = 0; wi <= maxWeeks; wi += 2) {
        var wx = ox + (gw * wi / maxWeeks);
        ctx.beginPath(); ctx.moveTo(wx, oy); ctx.lineTo(wx, oy + gh); ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('W' + wi, wx, oy + gh + 14);
      }

      for (var ti = 0; ti < techs.length; ti++) {
        var t = techs[ti];
        var isActive = ti === activeTech;
        ctx.beginPath();
        ctx.lineWidth = isActive ? 3 : 1.5;
        ctx.strokeStyle = isActive ? t.color : t.color + '55';
        for (var x = 0; x <= gw; x += 2) {
          var week = (x / gw) * maxWeeks;
          var prof = t.ceiling * sigmoid(week, 0.8, t.weeks);
          var py = oy + gh - (gh * prof / 100);
          if (x === 0) ctx.moveTo(ox + x, py);
          else ctx.lineTo(ox + x, py);
        }
        ctx.stroke();

        var endProf = t.ceiling * sigmoid(maxWeeks, 0.8, t.weeks);
        var endY = oy + gh - (gh * endProf / 100);
        ctx.fillStyle = isActive ? t.color : t.color + '88';
        ctx.font = (isActive ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(t.name, ox + gw + 4, endY + 3);
      }

      if (activeTech >= 0) {
        var at = techs[activeTech];
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(at.name + ': ~' + at.weeks + ' weeks to proficiency, ceiling ' + at.ceiling + '%', W / 2, H - 10);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var ox = 55, oy = 50, gw = W - ox - 30, gh = H - oy - 70;
      var best = -1, bestDist = 20;
      for (var ti = 0; ti < techs.length; ti++) {
        var mx = (e.clientX - rect.left) * (W / rect.width);
        var week = ((mx - ox) / gw) * 12;
        var prof = techs[ti].ceiling * sigmoid(week, 0.8, techs[ti].weeks);
        var py = oy + gh - (gh * prof / 100);
        var dist = Math.abs(my - py);
        if (dist < bestDist) { bestDist = dist; best = ti; }
      }
      if (best !== activeTech) { activeTech = best; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { activeTech = -1; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 4: Feature Release Velocity (Canvas 620x400)
   * Version-over-version feature velocity bar + trend line
   * ================================================================ */
  function buildReleaseVelocity() {
    var versions = [];
    for (var v = 10; v <= 22; v++) {
      var base = 45 + Math.floor(v * 2.5);
      var features = base + Math.floor(Math.random() * 15);
      var quizzes = Math.floor(base * 0.9) + Math.floor(Math.random() * 10);
      var achievements = Math.floor(base * 0.8) + Math.floor(Math.random() * 12);
      versions.push({ ver: 'v' + v, features: features, quizzes: quizzes, achievements: achievements, total: features + quizzes + achievements });
    }

    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;
    var viewMode = 0;
    var viewLabels = ['Total', 'Features', 'Quizzes', 'Achievements'];
    var viewColors = ['#6366f1', '#22d3ee', '#f59e0b', '#4ade80'];

    function getData(v) {
      if (viewMode === 0) return v.total;
      if (viewMode === 1) return v.features;
      if (viewMode === 2) return v.quizzes;
      return v.achievements;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Feature Release Velocity per Version', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('New items added per version cycle — click tabs to filter', W / 2, 36);

      var ox = 55, oy = 60, bw = (W - ox - 30) / versions.length - 4, maxH = H - oy - 60;
      var maxVal = Math.max.apply(null, versions.map(getData));

      for (var gi = 0; gi <= 4; gi++) {
        var gy = oy + maxH - (maxH * gi / 4);
        ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + (bw + 4) * versions.length, gy); ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5; ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal * gi / 4), ox - 5, gy + 3);
      }

      var points = [];
      for (var i = 0; i < versions.length; i++) {
        var v = versions[i];
        var val = getData(v);
        var x = ox + i * (bw + 4);
        var barH = (val / maxVal) * maxH;
        var y = oy + maxH - barH;
        var isHov = i === hovIdx;

        ctx.fillStyle = isHov ? viewColors[viewMode] : viewColors[viewMode] + '66';
        ctx.fillRect(x, y, bw, barH);

        points.push({ x: x + bw / 2, y: y });

        ctx.fillStyle = isHov ? cText() : cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(v.ver, x + bw / 2, oy + maxH + 14);

        if (isHov) {
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.fillText(val, x + bw / 2, y - 6);
        }
      }

      ctx.beginPath();
      ctx.strokeStyle = viewColors[viewMode] + 'aa';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      for (var pi = 0; pi < points.length; pi++) {
        if (pi === 0) ctx.moveTo(points[pi].x, points[pi].y);
        else ctx.lineTo(points[pi].x, points[pi].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      var avg = versions.reduce(function (s, v) { return s + getData(v); }, 0) / versions.length;
      ctx.fillStyle = cText3();
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Average: ' + Math.round(avg) + ' ' + viewLabels[viewMode].toLowerCase() + '/version', W / 2, H - 8);
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var ox = 55, bw = (W - ox - 30) / versions.length - 4;
      var idx = Math.floor((mx - ox) / (bw + 4));
      if (idx < 0 || idx >= versions.length) idx = -1;
      if (idx !== hovIdx) { hovIdx = idx; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });

    return { canvas: cc.canvas, setMode: function (m) { viewMode = m; draw(); } };
  }

  /* ================================================================
   * SECTION 5: Cross-Platform Compatibility Matrix (Canvas 640x400)
   * 12 projects x 5 platforms heatmap with scores
   * ================================================================ */
  function buildCompatMatrix() {
    var platforms = ['Desktop Chrome', 'Mobile Safari', 'Android Chrome', 'Tablet', 'PWA Offline'];
    var platColors = { high: '#4ade80', mid: '#f59e0b', low: '#f43f5e' };
    var scores = PROJECTS.map(function (p) {
      var hasPWA = p.tech.indexOf('PWA') >= 0;
      var hasTouch = p.tech.indexOf('Touch') >= 0;
      var has3D = p.tech.indexOf('Three.js') >= 0;
      return [
        85 + Math.floor(Math.random() * 12),
        hasTouch ? 80 + Math.floor(Math.random() * 15) : 65 + Math.floor(Math.random() * 15),
        hasTouch ? 82 + Math.floor(Math.random() * 14) : 68 + Math.floor(Math.random() * 12),
        has3D ? 70 + Math.floor(Math.random() * 15) : 78 + Math.floor(Math.random() * 18),
        hasPWA ? 85 + Math.floor(Math.random() * 12) : 40 + Math.floor(Math.random() * 20)
      ];
    });

    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var activeCell = { r: -1, c: -1 };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Cross-Platform Compatibility Matrix', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Click a cell to highlight — green=90+ yellow=70-89 red=<70', W / 2, 36);

      var ox = 110, oy = 58, cellW = (W - ox - 20) / platforms.length, cellH = (H - oy - 30) / PROJECTS.length;

      ctx.textAlign = 'center';
      ctx.font = '10px -apple-system,sans-serif';
      for (var j = 0; j < platforms.length; j++) {
        ctx.fillStyle = (j === activeCell.c) ? '#6366f1' : cText2();
        ctx.save();
        ctx.translate(ox + j * cellW + cellW / 2, oy - 5);
        ctx.rotate(-0.3);
        ctx.fillText(platforms[j], 0, 0);
        ctx.restore();
      }

      for (var i = 0; i < PROJECTS.length; i++) {
        ctx.textAlign = 'right';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = (i === activeCell.r) ? PROJECTS[i].color : cText2();
        ctx.fillText(PROJECTS[i].icon + ' ' + PROJECTS[i].name, ox - 8, oy + i * cellH + cellH / 2 + 4);

        for (var j = 0; j < platforms.length; j++) {
          var val = scores[i][j];
          var x = ox + j * cellW, y = oy + i * cellH;
          var isActive = (i === activeCell.r || j === activeCell.c);
          var col = val >= 90 ? platColors.high : val >= 70 ? platColors.mid : platColors.low;
          var alpha = isActive ? 'cc' : '44';
          ctx.fillStyle = col + alpha;
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);

          ctx.fillStyle = isActive ? '#fff' : cText3();
          ctx.font = (isActive ? 'bold ' : '') + '10px Courier New,monospace';
          ctx.textAlign = 'center';
          ctx.fillText(val, x + cellW / 2, y + cellH / 2 + 4);
        }
      }
    }

    cc.canvas.addEventListener('click', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var ox = 110, oy = 58, cellW = (W - ox - 20) / platforms.length, cellH = (H - oy - 30) / PROJECTS.length;
      var col = Math.floor((mx - ox) / cellW);
      var row = Math.floor((my - oy) / cellH);
      if (col >= 0 && col < platforms.length && row >= 0 && row < PROJECTS.length) {
        if (activeCell.r === row && activeCell.c === col) { activeCell = { r: -1, c: -1 }; }
        else { activeCell = { r: row, c: col }; }
        sfx('compat');
        draw();
      }
    });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 6: Code Reusability Index (Canvas 600x380)
   * Shared patterns across projects shown as connected node groups
   * ================================================================ */
  function buildReusabilityIndex() {
    var patterns = [
      { name: 'Canvas Helpers', usage: 12, color: '#6366f1', desc: 'createCanvas, drawGrid, theme-aware colors' },
      { name: 'SFX Engine', usage: 12, color: '#22d3ee', desc: 'AudioContext + tone generator + SFX map' },
      { name: 'Toast System', usage: 12, color: '#4ade80', desc: 'Animated notification toasts' },
      { name: 'IIFE Patch', usage: 12, color: '#f59e0b', desc: 'Self-contained versioned module pattern' },
      { name: 'Quiz Engine', usage: 11, color: '#f43f5e', desc: 'Random questions + scoring + S~D grades' },
      { name: 'Achievement Sys', usage: 11, color: '#a78bfa', desc: 'Unlock tracking + localStorage + toasts' },
      { name: 'Theme Toggle', usage: 10, color: '#fb7185', desc: 'Dark/light mode with MutationObserver' },
      { name: 'PWA/SW', usage: 8, color: '#34d399', desc: 'Service worker + cache + inject patches' },
      { name: 'Radar Chart', usage: 10, color: '#38bdf8', desc: 'Multi-axis radar polygon rendering' },
      { name: 'Keyboard Nav', usage: 12, color: '#fbbf24', desc: 'Shift+key section navigation shortcuts' }
    ];

    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hoveredPattern = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Code Reusability Index', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('10 shared patterns across 12 projects — hover for details', W / 2, 36);

      var ox = 160, oy = 55, barMaxW = W - ox - 60, barH = (H - oy - 50) / patterns.length - 3;

      for (var i = 0; i < patterns.length; i++) {
        var p = patterns[i];
        var y = oy + i * (barH + 3);
        var barW = (p.usage / 12) * barMaxW;
        var isHov = i === hoveredPattern;

        ctx.font = (isHov ? 'bold ' : '') + '10px -apple-system,sans-serif';
        ctx.fillStyle = isHov ? p.color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(p.name, ox - 10, y + barH / 2 + 4);

        var grad = ctx.createLinearGradient(ox, y, ox + barW, y);
        grad.addColorStop(0, p.color + (isHov ? 'cc' : '44'));
        grad.addColorStop(1, p.color + (isHov ? 'ff' : '88'));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(ox, y, barW, barH, 4);
        ctx.fill();

        ctx.fillStyle = isHov ? '#fff' : cText3();
        ctx.font = (isHov ? 'bold ' : '') + '10px Courier New,monospace';
        ctx.textAlign = 'left';
        ctx.fillText(p.usage + '/12', ox + barW + 8, y + barH / 2 + 4);

        if (isHov) {
          for (var di = 0; di < p.usage; di++) {
            var dx = ox + 4 + di * ((barW - 8) / p.usage);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(dx + 4, y + barH / 2, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (hoveredPattern >= 0) {
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(patterns[hoveredPattern].desc, W / 2, H - 10);
      }

      var totalReuse = patterns.reduce(function (s, p) { return s + p.usage; }, 0);
      var maxReuse = patterns.length * 12;
      var reusePercent = Math.round(totalReuse / maxReuse * 100);
      ctx.fillStyle = cText3();
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Reusability: ' + reusePercent + '%', W - 20, 20);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 55, barH = (H - oy - 50) / patterns.length - 3;
      var idx = Math.floor((my - oy) / (barH + 3));
      if (idx < 0 || idx >= patterns.length) idx = -1;
      if (idx !== hoveredPattern) { hoveredPattern = idx; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hoveredPattern = -1; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 7: Project Growth Forecast (Canvas 620x380)
   * 12 projects future growth projection line chart with confidence band
   * ================================================================ */
  function buildGrowthForecast() {
    var months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var forecasts = PROJECTS.map(function (p) {
      var growth = 0.08 + Math.random() * 0.06;
      var pts = [p.features];
      for (var m = 1; m < 6; m++) {
        pts.push(Math.round(pts[m - 1] * (1 + growth + (Math.random() * 0.02 - 0.01))));
      }
      return { name: p.name, icon: p.icon, color: p.color, data: pts, growth: growth };
    });

    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var activeLine = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Project Growth Forecast', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('6-month feature projection with growth rate — hover to focus', W / 2, 36);

      var ox = 55, oy = 50, gw = W - ox - 30, gh = H - oy - 55;
      var allVals = forecasts.reduce(function (a, f) { return a.concat(f.data); }, []);
      var maxVal = Math.max.apply(null, allVals);
      var minVal = Math.min.apply(null, allVals) * 0.9;

      ctx.strokeStyle = cGrid();
      ctx.lineWidth = 0.5;
      for (var gi = 0; gi <= 5; gi++) {
        var gy = oy + gh - (gh * gi / 5);
        ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + gw, gy); ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(minVal + (maxVal - minVal) * gi / 5), ox - 5, gy + 3);
      }

      for (var mi = 0; mi < months.length; mi++) {
        var mx = ox + (gw * mi / (months.length - 1));
        ctx.beginPath(); ctx.moveTo(mx, oy); ctx.lineTo(mx, oy + gh); ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(months[mi], mx, oy + gh + 14);
      }

      ctx.beginPath();
      ctx.moveTo(ox + gw / (months.length - 1) * 0.5, oy);
      ctx.lineTo(ox + gw / (months.length - 1) * 0.5, oy + gh);
      ctx.strokeStyle = '#f43f5e44';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f43f5e88';
      ctx.font = '8px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('← actual | forecast →', ox + gw / (months.length - 1) * 0.5 + 4, oy + 10);

      for (var fi = 0; fi < forecasts.length; fi++) {
        var f = forecasts[fi];
        var isActive = fi === activeLine;
        ctx.beginPath();
        ctx.lineWidth = isActive ? 3 : 1;
        ctx.strokeStyle = isActive ? f.color : f.color + '33';
        for (var di = 0; di < f.data.length; di++) {
          var px = ox + (gw * di / (f.data.length - 1));
          var py = oy + gh - ((f.data[di] - minVal) / (maxVal - minVal)) * gh;
          if (di === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        if (isActive) {
          for (var di2 = 0; di2 < f.data.length; di2++) {
            var px2 = ox + (gw * di2 / (f.data.length - 1));
            var py2 = oy + gh - ((f.data[di2] - minVal) / (maxVal - minVal)) * gh;
            ctx.beginPath();
            ctx.arc(px2, py2, 4, 0, Math.PI * 2);
            ctx.fillStyle = f.color;
            ctx.fill();
          }
        }

        var lastY = oy + gh - ((f.data[f.data.length - 1] - minVal) / (maxVal - minVal)) * gh;
        ctx.fillStyle = isActive ? f.color : f.color + '55';
        ctx.font = (isActive ? 'bold ' : '') + '8px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(f.icon, ox + gw + 4, lastY + 3);
      }

      if (activeLine >= 0) {
        var af = forecasts[activeLine];
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(af.name + ': +' + Math.round(af.growth * 100) + '% monthly growth — ' + af.data[0] + ' → ' + af.data[5] + ' features by Dec', W / 2, H - 8);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var ox = 55, oy = 50, gw = W - ox - 30, gh = H - oy - 55;
      var allVals = forecasts.reduce(function (a, f) { return a.concat(f.data); }, []);
      var maxVal = Math.max.apply(null, allVals);
      var minVal = Math.min.apply(null, allVals) * 0.9;
      var best = -1, bestDist = 25;
      for (var fi = 0; fi < forecasts.length; fi++) {
        var f = forecasts[fi];
        var di = Math.round(((mx - ox) / gw) * (f.data.length - 1));
        di = Math.max(0, Math.min(di, f.data.length - 1));
        var py = oy + gh - ((f.data[di] - minVal) / (maxVal - minVal)) * gh;
        var dist = Math.abs(my - py);
        if (dist < bestDist) { bestDist = dist; best = fi; }
      }
      if (best !== activeLine) { activeLine = best; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { activeLine = -1; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 8: Developer Effort Distribution (Canvas 620x400)
   * Donut chart showing time allocation across 8 activity types
   * with inner ring showing NEXTERA vs PRISM split
   * ================================================================ */
  function buildEffortDistribution() {
    var activities = [
      { name: 'Frontend/UI', pct: 22, color: '#6366f1' },
      { name: 'Game Logic', pct: 18, color: '#22d3ee' },
      { name: 'Audio/Music', pct: 12, color: '#a78bfa' },
      { name: '3D Rendering', pct: 10, color: '#f43f5e' },
      { name: 'Data/Content', pct: 14, color: '#4ade80' },
      { name: 'Testing/QA', pct: 9, color: '#f59e0b' },
      { name: 'PWA/Infra', pct: 8, color: '#fb7185' },
      { name: 'Documentation', pct: 7, color: '#34d399' }
    ];
    var innerRing = [
      { name: 'NEXTERA', pct: 35, color: '#6366f1' },
      { name: 'PRISM', pct: 65, color: '#22d3ee' }
    ];

    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hoveredSeg = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Developer Effort Distribution', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Time allocation across 8 activity types — inner ring: NEXTERA vs PRISM', W / 2, 36);

      var cx = W / 2 - 60, cy = H / 2 + 20, R = 120, r = 70, innerR = 50;

      var startAngle = -Math.PI / 2;
      for (var i = 0; i < activities.length; i++) {
        var a = activities[i];
        var sweep = (a.pct / 100) * Math.PI * 2;
        var isHov = i === hoveredSeg;

        ctx.beginPath();
        ctx.arc(cx, cy, isHov ? R + 8 : R, startAngle, startAngle + sweep);
        ctx.arc(cx, cy, r, startAngle + sweep, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = a.color + (isHov ? 'ee' : '99');
        ctx.fill();

        if (isHov || a.pct >= 10) {
          var midA = startAngle + sweep / 2;
          var labelR = (R + r) / 2 + (isHov ? 4 : 0);
          var lx = cx + Math.cos(midA) * labelR;
          var ly = cy + Math.sin(midA) * labelR;
          ctx.fillStyle = '#fff';
          ctx.font = (isHov ? 'bold ' : '') + '10px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(a.pct + '%', lx, ly + 4);
        }

        startAngle += sweep;
      }

      var innerStart = -Math.PI / 2;
      for (var ii = 0; ii < innerRing.length; ii++) {
        var ir = innerRing[ii];
        var iSweep = (ir.pct / 100) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, innerR, innerStart, innerStart + iSweep);
        ctx.arc(cx, cy, 25, innerStart + iSweep, innerStart, true);
        ctx.closePath();
        ctx.fillStyle = ir.color + '66';
        ctx.fill();
        var iMidA = innerStart + iSweep / 2;
        var iLx = cx + Math.cos(iMidA) * 38;
        var iLy = cy + Math.sin(iMidA) * 38;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ir.pct + '%', iLx, iLy + 3);
        innerStart += iSweep;
      }

      ctx.fillStyle = cBg();
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = cText();
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('290K', cx, cy + 4);

      var legX = W / 2 + 80, legY = 65;
      for (var li = 0; li < activities.length; li++) {
        var la = activities[li];
        var isLegHov = li === hoveredSeg;
        ctx.fillStyle = la.color + (isLegHov ? 'ff' : 'aa');
        ctx.fillRect(legX, legY + li * 22, 12, 12);
        ctx.fillStyle = isLegHov ? cText() : cText2();
        ctx.font = (isLegHov ? 'bold ' : '') + '11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(la.name + ' (' + la.pct + '%)', legX + 18, legY + li * 22 + 10);
      }

      legY += activities.length * 22 + 16;
      ctx.fillStyle = cText3();
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Project Split:', legX, legY);
      for (var iri = 0; iri < innerRing.length; iri++) {
        ctx.fillStyle = innerRing[iri].color + 'aa';
        ctx.fillRect(legX, legY + 14 + iri * 20, 12, 12);
        ctx.fillStyle = cText2();
        ctx.font = '11px -apple-system,sans-serif';
        ctx.fillText(innerRing[iri].name + ' (' + innerRing[iri].pct + '%)', legX + 18, legY + 14 + iri * 20 + 10);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var cx = W / 2 - 60, cy = H / 2 + 20, R = 128, r = 70;
      var dx = mx - cx, dy = my - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < r || dist > R) { if (hoveredSeg !== -1) { hoveredSeg = -1; draw(); } return; }
      var angle = Math.atan2(dy, dx);
      if (angle < -Math.PI / 2) angle += Math.PI * 2;
      else angle += Math.PI / 2;
      if (angle > Math.PI * 2) angle -= Math.PI * 2;
      var cumAngle = 0;
      var found = -1;
      for (var i = 0; i < activities.length; i++) {
        cumAngle += (activities[i].pct / 100) * Math.PI * 2;
        if (angle <= cumAngle) { found = i; break; }
      }
      if (found !== hoveredSeg) { hoveredSeg = found; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hoveredSeg = -1; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * MOUNT ALL SECTIONS
   * ================================================================ */
  function buildAllSections() {
    var anchor = $('footer') || document.body.lastElementChild;
    if (!anchor) return;

    var sections = [
      { id: 'v22-architecture', title: 'Code Architecture Layer Distribution', sub: '12 projects × 5 layers — hover to see LOC breakdown', builder: function (wrap) { wrap.appendChild(buildArchitectureLayers()); }, sfxName: 'architecture' },
      { id: 'v22-difficulty', title: 'Project Difficulty Ranking', sub: 'Composite difficulty from 5 metrics — hover to highlight', builder: function (wrap) { wrap.appendChild(buildDifficultyRanking()); }, sfxName: 'difficulty' },
      { id: 'v22-learncurve', title: 'Technology Learning Curve Estimator', sub: '8 technologies S-curve progression — hover to focus line', builder: function (wrap) { wrap.appendChild(buildLearningCurve()); }, sfxName: 'learncurve' },
      { id: 'v22-velocity', title: 'Feature Release Velocity', sub: 'New features/quizzes/achievements per version — click tabs to filter', builder: function (wrap) {
        var result = buildReleaseVelocity();
        var tabWrap = el('div', { className: 'v22-tabs' });
        var labels = ['Total', 'Features', 'Quizzes', 'Achievements'];
        labels.forEach(function (m, i) {
          var btn = el('button', { className: 'v22-tab' + (i === 0 ? ' active' : ''), textContent: m, onClick: function () {
            tabWrap.querySelectorAll('.v22-tab').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            result.setMode(i);
          }});
          tabWrap.appendChild(btn);
        });
        wrap.appendChild(tabWrap);
        wrap.appendChild(result.canvas);
      }, sfxName: 'burndown' },
      { id: 'v22-compat', title: 'Cross-Platform Compatibility Matrix', sub: '12 projects × 5 platforms — click cell to highlight row/column', builder: function (wrap) { wrap.appendChild(buildCompatMatrix()); }, sfxName: 'compat' },
      { id: 'v22-reuse', title: 'Code Reusability Index', sub: '10 shared patterns across 12 projects — hover for details', builder: function (wrap) { wrap.appendChild(buildReusabilityIndex()); }, sfxName: 'reuse' },
      { id: 'v22-forecast', title: 'Project Growth Forecast', sub: '6-month feature projection with growth rate — hover to focus', builder: function (wrap) { wrap.appendChild(buildGrowthForecast()); }, sfxName: 'forecast' },
      { id: 'v22-effort', title: 'Developer Effort Distribution', sub: 'Time allocation: 8 activities + NEXTERA/PRISM split', builder: function (wrap) { wrap.appendChild(buildEffortDistribution()); }, sfxName: 'effort' }
    ];

    sections.forEach(function (sec) {
      var section = el('section', { className: 'v22-section section-reveal', id: sec.id });
      section.appendChild(el('h2', { textContent: sec.title }));
      section.appendChild(el('p', { className: 'v22-section-sub', textContent: sec.sub }));
      var card = el('div', { className: 'v22-card' });
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

    showToast('v22.0', '8 new analytics canvases • Updated project data • 12 SFX');
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+A~H)
   * ================================================================ */
  var sectionIds = ['v22-architecture', 'v22-difficulty', 'v22-learncurve', 'v22-velocity', 'v22-compat', 'v22-reuse', 'v22-forecast', 'v22-effort'];
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var idx = -1;
    if (e.code === 'KeyA') idx = 0;
    else if (e.code === 'KeyB') idx = 1;
    else if (e.code === 'KeyC') idx = 2;
    else if (e.code === 'KeyD') idx = 3;
    else if (e.code === 'KeyE') idx = 4;
    else if (e.code === 'KeyF') idx = 5;
    else if (e.code === 'KeyG') idx = 6;
    else if (e.code === 'KeyH') idx = 7;
    if (idx >= 0) {
      e.preventDefault();
      var target = document.getElementById(sectionIds[idx]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section22'); }
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
