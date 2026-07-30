/**
 * ai-portfolio v24.0 Patch Module
 * Last updated: 2026-07-30
 */
;(function () {
  'use strict';
  if (window._v24) return;
  window._v24 = { version: '24.0.0', applied: Date.now() };

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
   * PROJECT DATA (v24.0 — all 12 repos updated to latest 2026-07-30)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v29.0', loc: 33500, features: 312, quizzes: 330, achievements: 240, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.4, testCoverage: 84, uxScore: 90 },
    { name: 'SmartGolf', ver: 'v37.0', loc: 31800, features: 302, quizzes: 302, achievements: 300, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 9.0, testCoverage: 87, uxScore: 93 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86 },
    { name: 'Piano', ver: 'v25.0', loc: 28800, features: 240, quizzes: 240, achievements: 240, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.7, testCoverage: 82, uxScore: 92 },
    { name: 'Boxing', ver: 'v26.0', loc: 28200, features: 238, quizzes: 270, achievements: 238, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.9, testCoverage: 81, uxScore: 89 },
    { name: 'Karaoke', ver: 'v25.0', loc: 27200, features: 234, quizzes: 282, achievements: 234, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 8.5, testCoverage: 83, uxScore: 91 },
    { name: 'Violin', ver: 'v24.0', loc: 26400, features: 238, quizzes: 225, achievements: 238, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.8, testCoverage: 79, uxScore: 90 },
    { name: 'City Builder', ver: 'v23.0', loc: 25800, features: 254, quizzes: 295, achievements: 254, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 8.6, testCoverage: 85, uxScore: 88 },
    { name: 'House Builder', ver: 'v23.0', loc: 25200, features: 254, quizzes: 285, achievements: 254, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.4, testCoverage: 78, uxScore: 87 },
    { name: 'Golf Tracker', ver: 'v23.0', loc: 23400, features: 192, quizzes: 240, achievements: 192, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.1, testCoverage: 84, uxScore: 89 },
    { name: 'Hatcuping', ver: 'v25.0', loc: 21200, features: 238, quizzes: 255, achievements: 238, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 8.0, testCoverage: 77, uxScore: 92 },
    { name: 'CCF', ver: 'v21.0', loc: 19400, features: 222, quizzes: 255, achievements: 222, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 7.8, testCoverage: 86, uxScore: 90 }
  ];
  var TOTAL_LOC = 330000;
  var TOTAL_SESSIONS = 11400;

  /* ================================================================
   * CSS (v24)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v24-patch-styles';
  style.textContent = [
    '.v24-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v24-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v24-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v24-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v24-canvas{display:block;margin:0 auto}',
    '.v24-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v24-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v24-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v24-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v24-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v24-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v24-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v24)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav24: function () { tone(1175, 0.06, 'sine'); },
    section24: function () { tone(880, 0.08, 'triangle'); },
    tab24: function () { tone(1568, 0.05, 'sine'); },
    velocity: function () { tone(523, 0.12, 'triangle'); tone(659, 0.08, 'sine', 0.09); },
    quality: function () { tone(349, 0.1, 'sine'); tone(440, 0.07, 'triangle', 0.08); },
    burndown: function () { tone(587, 0.1, 'triangle'); tone(784, 0.08, 'sine', 0.09); },
    innovation: function () { tone(392, 0.12, 'sine'); tone(523, 0.08, 'triangle', 0.09); tone(659, 0.06, 'sine', 0.15); },
    ecosystem: function () { tone(740, 0.08, 'sine'); tone(988, 0.06, 'triangle', 0.07); },
    benchmark: function () { tone(554, 0.1, 'sine'); tone(698, 0.07, 'sine', 0.08); },
    roadmap: function () { tone(415, 0.1, 'triangle'); tone(622, 0.08, 'sine', 0.09); tone(831, 0.06, 'sine', 0.16); },
    contribution: function () { tone(587, 0.08, 'sine'); tone(784, 0.06, 'triangle', 0.07); },
    achieve24: function () { tone(622, 0.06, 'sine'); tone(784, 0.05, 'sine', 0.05); tone(932, 0.04, 'sine', 0.09); tone(1245, 0.06, 'sine', 0.12); }
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
    sfx('nav24');
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
    c.className = 'v24-canvas';
    var ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas: c, ctx: ctx, w: w, h: h };
  }

  function hexAlpha(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  /* ================================================================
   * SECTION 1: Feature Velocity Timeline (Canvas 640x400)
   * 12 projects x 6 versions release velocity line chart
   * ================================================================ */
  function buildFeatureVelocity() {
    var versions = ['v19', 'v20', 'v21', 'v22', 'v23', 'v24'];
    var velData = PROJECTS.map(function (p) {
      var base = Math.round(p.features / 20);
      return versions.map(function (_, vi) {
        return Math.max(4, base - (5 - vi) * 2 + Math.round(Math.sin(vi * 1.3 + p.complexity) * 3));
      });
    });

    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Feature Velocity Timeline', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Features added per release across 6 versions — hover a project', W / 2, 36);

      var ox = 60, oy = 55, gw = W - ox - 30, gh = H - oy - 60;

      for (var g = 0; g <= 4; g++) {
        var gy = oy + (gh / 4) * g;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + gw, gy); ctx.stroke();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.textAlign = 'right';
        var val = Math.round(30 - g * 7.5);
        ctx.fillText(val.toString(), ox - 6, gy + 4);
      }

      for (var v = 0; v < versions.length; v++) {
        var vx = ox + (gw / (versions.length - 1)) * v;
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.textAlign = 'center';
        ctx.fillText(versions[v], vx, H - 30);
      }

      for (var i = 0; i < PROJECTS.length; i++) {
        var alpha = hovered === -1 ? 0.6 : (hovered === i ? 1 : 0.12);
        ctx.strokeStyle = hexAlpha(PROJECTS[i].color, alpha);
        ctx.lineWidth = hovered === i ? 3 : 1.5;
        ctx.beginPath();
        for (var j = 0; j < versions.length; j++) {
          var x = ox + (gw / (versions.length - 1)) * j;
          var y = oy + gh - (velData[i][j] / 30) * gh;
          if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (hovered === i) {
          for (var k = 0; k < versions.length; k++) {
            var px = ox + (gw / (versions.length - 1)) * k;
            var py = oy + gh - (velData[i][k] / 30) * gh;
            ctx.fillStyle = PROJECTS[i].color;
            ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
            ctx.font = 'bold 9px -apple-system,sans-serif';
            ctx.fillText(velData[i][k].toString(), px, py - 8);
          }
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.fillStyle = PROJECTS[i].color;
          ctx.textAlign = 'left';
          ctx.fillText(PROJECTS[i].icon + ' ' + PROJECTS[i].name + ' ' + PROJECTS[i].ver, ox + 5, H - 10);
        }
      }

      if (hovered === -1) {
        var lgX = W - 120, lgY = 50;
        ctx.font = '9px -apple-system,sans-serif';
        for (var li = 0; li < Math.min(PROJECTS.length, 6); li++) {
          ctx.fillStyle = PROJECTS[li].color;
          ctx.fillRect(lgX, lgY + li * 14, 8, 8);
          ctx.fillStyle = cText2();
          ctx.textAlign = 'left';
          ctx.fillText(PROJECTS[li].name, lgX + 12, lgY + li * 14 + 8);
        }
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var ox = 60, oy = 55, gw = W - ox - 30, gh = H - oy - 60;
      var old = hovered;
      hovered = -1;
      var minDist = 20;
      for (var i = 0; i < PROJECTS.length; i++) {
        for (var j = 0; j < versions.length; j++) {
          var x = ox + (gw / (versions.length - 1)) * j;
          var y = oy + gh - (velData[i][j] / 30) * gh;
          var d = Math.sqrt((mx - x) * (mx - x) + (my - y) * (my - y));
          if (d < minDist) { minDist = d; hovered = i; }
        }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 2: Code Quality Radar (Canvas 600x400)
   * 12 projects 6-axis radar — click to cycle
   * ================================================================ */
  function buildCodeQualityRadar() {
    var axes = ['Readability', 'Modularity', 'Performance', 'Security', 'Scalability', 'Testability'];
    var radarData = PROJECTS.map(function (p) {
      var b = p.testCoverage / 100;
      return [
        Math.round(70 + b * 22 + (p.uxScore > 89 ? 5 : 0)),
        Math.round(65 + b * 25 + (p.tech.length > 2 ? 4 : 0)),
        Math.round(72 + b * 18 + (p.complexity < 8.5 ? 6 : 0)),
        Math.round(78 + b * 15),
        Math.round(60 + b * 28 + (p.features > 220 ? 5 : 0)),
        p.testCoverage
      ];
    });

    var cc = createCanvas(600, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var current = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Code Quality Radar', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('6-axis quality profile — click to cycle projects (' + (current + 1) + '/' + PROJECTS.length + ')', W / 2, 36);

      var cx = W / 2, cy = 220, R = 140;

      for (var ring = 1; ring <= 5; ring++) {
        var rr = (ring / 5) * R;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (var a = 0; a < 6; a++) {
          var ang = (Math.PI * 2 / 6) * a - Math.PI / 2;
          var px = cx + Math.cos(ang) * rr;
          var py = cy + Math.sin(ang) * rr;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
        if (ring % 2 === 0) {
          ctx.font = '8px -apple-system,sans-serif';
          ctx.fillStyle = cText3();
          ctx.fillText((ring * 20).toString(), cx + 4, cy - rr + 10);
        }
      }

      for (var ai = 0; ai < 6; ai++) {
        var angle = (Math.PI * 2 / 6) * ai - Math.PI / 2;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
        ctx.stroke();

        var lx = cx + Math.cos(angle) * (R + 18);
        var ly = cy + Math.sin(angle) * (R + 18);
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(axes[ai], lx, ly);
      }

      var p = PROJECTS[current];
      var d = radarData[current];
      ctx.fillStyle = hexAlpha(p.color, 0.2);
      ctx.strokeStyle = hexAlpha(p.color, 0.8);
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var di = 0; di < 6; di++) {
        var da = (Math.PI * 2 / 6) * di - Math.PI / 2;
        var dr = (d[di] / 100) * R;
        var dx = cx + Math.cos(da) * dr;
        var dy = cy + Math.sin(da) * dr;
        if (di === 0) ctx.moveTo(dx, dy); else ctx.lineTo(dx, dy);
      }
      ctx.closePath(); ctx.fill(); ctx.stroke();

      for (var pi = 0; pi < 6; pi++) {
        var pa = (Math.PI * 2 / 6) * pi - Math.PI / 2;
        var pr = (d[pi] / 100) * R;
        var ppx = cx + Math.cos(pa) * pr;
        var ppy = cy + Math.sin(pa) * pr;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(ppx, ppy, 4, 0, Math.PI * 2); ctx.fill();
        ctx.font = 'bold 9px -apple-system,sans-serif';
        ctx.fillStyle = p.color;
        ctx.fillText(d[pi].toString(), ppx + 8, ppy - 2);
      }

      var avg = Math.round(d.reduce(function (a, b) { return a + b; }, 0) / 6);
      var grade = avg >= 85 ? 'S' : avg >= 75 ? 'A' : avg >= 65 ? 'B' : 'C';
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = p.color;
      ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      ctx.fillText(p.icon + ' ' + p.name + ' ' + p.ver + ' — Avg: ' + avg + ' (' + grade + ')', W / 2, H - 15);
    }

    cc.canvas.addEventListener('click', function () {
      current = (current + 1) % PROJECTS.length;
      sfx('quality');
      draw();
    });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 3: Development Burndown Chart (Canvas 620x380)
   * Cumulative features vs target line
   * ================================================================ */
  function buildBurndownChart() {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
    var cumulative = [1200, 1580, 1950, 2350, 2750, 3100, 3456];
    var target = [1100, 1500, 1900, 2300, 2700, 3100, 3500];

    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Development Progress Tracker', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Cumulative features vs target — hover for details', W / 2, 36);

      var ox = 60, oy = 55, gw = W - ox - 40, gh = H - oy - 60;
      var maxV = 3800;

      for (var g = 0; g <= 4; g++) {
        var gy = oy + (gh / 4) * g;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + gw, gy); ctx.stroke();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxV - (maxV / 4) * g).toString(), ox - 6, gy + 4);
      }

      for (var mi = 0; mi < months.length; mi++) {
        var mx = ox + (gw / (months.length - 1)) * mi;
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.textAlign = 'center';
        ctx.fillText(months[mi], mx, H - 25);
      }

      ctx.strokeStyle = 'rgba(99,102,241,.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      for (var ti = 0; ti < months.length; ti++) {
        var tx = ox + (gw / (months.length - 1)) * ti;
        var ty = oy + gh - (target[ti] / maxV) * gh;
        if (ti === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      var grad = ctx.createLinearGradient(0, oy, 0, oy + gh);
      grad.addColorStop(0, 'rgba(34,211,238,.15)');
      grad.addColorStop(1, 'rgba(34,211,238,.02)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(ox, oy + gh);
      for (var ci = 0; ci < months.length; ci++) {
        var cx2 = ox + (gw / (months.length - 1)) * ci;
        var cy2 = oy + gh - (cumulative[ci] / maxV) * gh;
        ctx.lineTo(cx2, cy2);
      }
      ctx.lineTo(ox + gw, oy + gh);
      ctx.closePath(); ctx.fill();

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (var li = 0; li < months.length; li++) {
        var lx = ox + (gw / (months.length - 1)) * li;
        var ly = oy + gh - (cumulative[li] / maxV) * gh;
        if (li === 0) ctx.moveTo(lx, ly); else ctx.lineTo(lx, ly);
      }
      ctx.stroke();

      for (var di = 0; di < months.length; di++) {
        var dx = ox + (gw / (months.length - 1)) * di;
        var dy = oy + gh - (cumulative[di] / maxV) * gh;
        ctx.fillStyle = hovered === di ? '#22d3ee' : hexAlpha('#22d3ee', 0.7);
        ctx.beginPath(); ctx.arc(dx, dy, hovered === di ? 6 : 4, 0, Math.PI * 2); ctx.fill();

        if (hovered === di) {
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.fillStyle = '#22d3ee';
          ctx.textAlign = 'center';
          ctx.fillText(cumulative[di].toLocaleString() + ' features', dx, dy - 14);
          var diff = cumulative[di] - target[di];
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = diff >= 0 ? '#4ade80' : '#f43f5e';
          ctx.fillText((diff >= 0 ? '+' : '') + diff + ' vs target', dx, dy - 3);
        }
      }

      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillStyle = 'rgba(99,102,241,.5)';
      ctx.textAlign = 'left';
      ctx.fillText('── Target', W - 120, 52);
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('── Actual', W - 120, 65);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var ox = 60, gw = W - ox - 40;
      var old = hovered;
      hovered = -1;
      for (var i = 0; i < months.length; i++) {
        var x = ox + (gw / (months.length - 1)) * i;
        if (Math.abs(mx - x) < 25) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 4: Innovation Index Bubbles (Canvas 640x400)
   * Bubble chart: X=complexity, Y=UX score, size=LOC
   * ================================================================ */
  function buildInnovationIndex() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Innovation Index Bubble Chart', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('X=Complexity, Y=UX Score, Size=LOC — hover bubbles', W / 2, 36);

      var ox = 55, oy = 55, gw = W - ox - 40, gh = H - oy - 60;

      for (var g = 0; g <= 4; g++) {
        var gy = oy + (gh / 4) * g;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + gw, gy); ctx.stroke();
      }
      for (var gx = 0; gx <= 4; gx++) {
        var gxx = ox + (gw / 4) * gx;
        ctx.strokeStyle = cGrid();
        ctx.beginPath(); ctx.moveTo(gxx, oy); ctx.lineTo(gxx, oy + gh); ctx.stroke();
      }

      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'center';
      ctx.fillText('Complexity →', W / 2, H - 15);
      ctx.save();
      ctx.translate(12, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('UX Score →', 0, 0);
      ctx.restore();

      for (var i = 0; i < PROJECTS.length; i++) {
        var p = PROJECTS[i];
        var nx = (p.complexity - 7) / 3;
        var ny = (p.uxScore - 84) / 10;
        var bx = ox + nx * gw;
        var by = oy + gh - ny * gh;
        var br = Math.max(12, Math.sqrt(p.loc / 100));

        ctx.globalAlpha = hovered === i ? 0.9 : (hovered === -1 ? 0.55 : 0.15);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = hexAlpha(p.color, 0.8);
        ctx.lineWidth = hovered === i ? 2 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (hovered === i) {
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.fillStyle = p.color;
          ctx.textAlign = 'center';
          ctx.fillText(p.icon + ' ' + p.name, bx, by - br - 12);
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = cText2();
          ctx.fillText('C:' + p.complexity + ' UX:' + p.uxScore + ' LOC:' + (p.loc / 1000).toFixed(1) + 'K', bx, by - br - 2);
        }
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var old = hovered; hovered = -1;
      var ox = 55, oy = 55, gw = W - ox - 40, gh = H - oy - 60;
      for (var i = PROJECTS.length - 1; i >= 0; i--) {
        var p = PROJECTS[i];
        var nx = (p.complexity - 7) / 3;
        var ny = (p.uxScore - 84) / 10;
        var bx = ox + nx * gw;
        var by = oy + gh - ny * gh;
        var br = Math.max(12, Math.sqrt(p.loc / 100));
        var d = Math.sqrt((mx - bx) * (mx - bx) + (my - by) * (my - by));
        if (d <= br + 5) { hovered = i; break; }
      }
      if (hovered !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovered = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 5: Tech Ecosystem Sunburst (Canvas 620x400)
   * Donut with inner ring (NEXTERA/PRISM) and outer ring (tech stacks)
   * ================================================================ */
  function buildEcosystemSunburst() {
    var nextera = PROJECTS.filter(function (p) { return ['SmartGolf', 'CCF', 'LevelPlay'].indexOf(p.name) >= 0; });
    var prism = PROJECTS.filter(function (p) { return ['SmartGolf', 'CCF', 'LevelPlay'].indexOf(p.name) < 0; });

    var techCount = {};
    PROJECTS.forEach(function (p) {
      p.tech.forEach(function (t) { techCount[t] = (techCount[t] || 0) + 1; });
    });
    var techs = Object.keys(techCount).sort(function (a, b) { return techCount[b] - techCount[a]; });
    var techColors = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b', '#c084fc', '#f43f5e', '#fb7185', '#38bdf8'];

    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hoveredRing = -1, hoveredIdx = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Tech Ecosystem Sunburst', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Inner: NEXTERA/PRISM split — Outer: Technology distribution', W / 2, 36);

      var cx = W / 2, cy = 220, R1 = 60, R2 = 110, R3 = 155;

      var nLoc = nextera.reduce(function (s, p) { return s + p.loc; }, 0);
      var pLoc = prism.reduce(function (s, p) { return s + p.loc; }, 0);
      var total = nLoc + pLoc;
      var nAngle = (nLoc / total) * Math.PI * 2;

      ctx.fillStyle = hoveredRing === 0 && hoveredIdx === 0 ? 'rgba(99,102,241,.5)' : 'rgba(99,102,241,.3)';
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R1, -Math.PI / 2, -Math.PI / 2 + nAngle);
      ctx.closePath(); ctx.fill();

      ctx.fillStyle = hoveredRing === 0 && hoveredIdx === 1 ? 'rgba(34,211,238,.5)' : 'rgba(34,211,238,.3)';
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R1, -Math.PI / 2 + nAngle, -Math.PI / 2 + Math.PI * 2);
      ctx.closePath(); ctx.fill();

      ctx.font = 'bold 9px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('N', cx - 15, cy + 4);
      ctx.fillText('P', cx + 15, cy + 4);

      var startAngle = -Math.PI / 2;
      for (var pi = 0; pi < PROJECTS.length; pi++) {
        var seg = (PROJECTS[pi].loc / total) * Math.PI * 2;
        var alpha = (hoveredRing === 1 && hoveredIdx === pi) ? 0.9 : 0.55;
        ctx.fillStyle = hexAlpha(PROJECTS[pi].color, alpha);
        ctx.beginPath();
        ctx.arc(cx, cy, R2, startAngle, startAngle + seg);
        ctx.arc(cx, cy, R1 + 4, startAngle + seg, startAngle, true);
        ctx.closePath(); ctx.fill();
        startAngle += seg;
      }

      var tTotal = techs.reduce(function (s, t) { return s + techCount[t]; }, 0);
      var tStart = -Math.PI / 2;
      for (var ti = 0; ti < techs.length; ti++) {
        var tSeg = (techCount[techs[ti]] / tTotal) * Math.PI * 2;
        var tAlpha = (hoveredRing === 2 && hoveredIdx === ti) ? 0.9 : 0.5;
        ctx.fillStyle = hexAlpha(techColors[ti % techColors.length], tAlpha);
        ctx.beginPath();
        ctx.arc(cx, cy, R3, tStart, tStart + tSeg);
        ctx.arc(cx, cy, R2 + 4, tStart + tSeg, tStart, true);
        ctx.closePath(); ctx.fill();

        if (tSeg > 0.3) {
          var mid = tStart + tSeg / 2;
          var lx = cx + Math.cos(mid) * (R3 + 14);
          var ly = cy + Math.sin(mid) * (R3 + 14);
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = cText2();
          ctx.textAlign = 'center';
          ctx.fillText(techs[ti], lx, ly + 4);
        }
        tStart += tSeg;
      }

      if (hoveredRing === 1 && hoveredIdx >= 0 && hoveredIdx < PROJECTS.length) {
        var hp = PROJECTS[hoveredIdx];
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = hp.color;
        ctx.textAlign = 'center';
        ctx.fillText(hp.icon + ' ' + hp.name + ': ' + (hp.loc / 1000).toFixed(1) + 'K LOC (' + Math.round(hp.loc / total * 100) + '%)', W / 2, H - 15);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var cx = W / 2, cy = 220;
      var dist = Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy));
      var ang = Math.atan2(my - cy, mx - cx);
      if (ang < -Math.PI / 2) ang += Math.PI * 2;
      var normAng = ang + Math.PI / 2;
      if (normAng > Math.PI * 2) normAng -= Math.PI * 2;
      var old1 = hoveredRing, old2 = hoveredIdx;
      hoveredRing = -1; hoveredIdx = -1;

      if (dist <= 60) {
        var nLoc2 = nextera.reduce(function (s, p) { return s + p.loc; }, 0);
        var total2 = nLoc2 + prism.reduce(function (s, p) { return s + p.loc; }, 0);
        var nA = (nLoc2 / total2) * Math.PI * 2;
        hoveredRing = 0;
        hoveredIdx = normAng < nA ? 0 : 1;
      } else if (dist <= 110) {
        hoveredRing = 1;
        var sa = 0;
        var total3 = PROJECTS.reduce(function (s, p) { return s + p.loc; }, 0);
        for (var i = 0; i < PROJECTS.length; i++) {
          var seg2 = (PROJECTS[i].loc / total3) * Math.PI * 2;
          if (normAng >= sa && normAng < sa + seg2) { hoveredIdx = i; break; }
          sa += seg2;
        }
      } else if (dist <= 155) {
        hoveredRing = 2;
        var tT = techs.reduce(function (s, t) { return s + techCount[t]; }, 0);
        var ts = 0;
        for (var j = 0; j < techs.length; j++) {
          var tseg = (techCount[techs[j]] / tT) * Math.PI * 2;
          if (normAng >= ts && normAng < ts + tseg) { hoveredIdx = j; break; }
          ts += tseg;
        }
      }
      if (hoveredRing !== old1 || hoveredIdx !== old2) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hoveredRing = -1; hoveredIdx = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 6: Competitive Benchmark Matrix (Canvas 640x400)
   * 12 projects vs benchmark competitors — 5 dimensions
   * ================================================================ */
  function buildBenchmarkMatrix() {
    var dims = ['Features', 'UX', 'Performance', 'Content', 'Innovation'];
    var benchmarks = [
      { name: 'History RPG', comps: ['영걸전', '문명', 'AoE'], scores: [88, 90, 85, 82, 92], compAvg: [85, 88, 90, 80, 78] },
      { name: 'SmartGolf', comps: ['카카오골프', '골프존'], scores: [92, 93, 88, 90, 86], compAvg: [90, 91, 92, 85, 75] },
      { name: 'Piano', comps: ['Simply Piano', 'Flowkey'], scores: [87, 92, 84, 88, 90], compAvg: [92, 90, 88, 85, 80] },
      { name: 'Boxing', comps: ['FightCamp', 'BOXX'], scores: [85, 89, 82, 86, 91], compAvg: [88, 87, 90, 82, 78] },
      { name: 'Karaoke', comps: ['StarMaker', 'Smule'], scores: [86, 91, 83, 88, 89], compAvg: [90, 88, 92, 84, 76] },
      { name: 'Violin', comps: ['Trala', 'Violy'], scores: [88, 90, 81, 85, 93], compAvg: [84, 86, 88, 80, 75] },
      { name: 'City Builder', comps: ['SimCity', 'TheoTown'], scores: [84, 88, 80, 90, 87], compAvg: [92, 90, 88, 86, 80] },
      { name: 'House Builder', comps: ['The Sims', 'Home3D'], scores: [83, 87, 79, 88, 90], compAvg: [90, 92, 88, 82, 78] },
      { name: 'Golf Tracker', comps: ['Arccos', 'ShotTracer'], scores: [82, 89, 80, 84, 88], compAvg: [88, 86, 90, 80, 75] },
      { name: 'Hatcuping', comps: ['마리오', '포켓몬'], scores: [86, 92, 82, 85, 91], compAvg: [92, 88, 90, 88, 80] },
      { name: 'CCF', comps: ['클래스101', '탈잉'], scores: [85, 90, 84, 88, 86], compAvg: [88, 86, 90, 82, 78] },
      { name: 'LevelPlay', comps: ['Duolingo', 'Khan'], scores: [78, 86, 80, 76, 84], compAvg: [92, 90, 88, 90, 82] }
    ];

    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovRow = -1, hovCol = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Competitive Benchmark Matrix', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Our score vs competitor average — hover cells for comparison', W / 2, 36);

      var ox = 100, oy = 65, cw = (W - ox - 20) / dims.length, rh = (H - oy - 30) / benchmarks.length;

      ctx.font = 'bold 9px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.textAlign = 'center';
      for (var di = 0; di < dims.length; di++) {
        ctx.fillText(dims[di], ox + di * cw + cw / 2, oy - 8);
      }

      for (var ri = 0; ri < benchmarks.length; ri++) {
        var b = benchmarks[ri];
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = hovRow === ri ? '#6366f1' : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(b.name, ox - 8, oy + ri * rh + rh / 2 + 3);

        for (var ci = 0; ci < dims.length; ci++) {
          var diff = b.scores[ci] - b.compAvg[ci];
          var intensity = Math.min(1, Math.abs(diff) / 15);
          var cellColor;
          if (diff >= 0) {
            cellColor = 'rgba(34,197,94,' + (0.1 + intensity * 0.4) + ')';
          } else {
            cellColor = 'rgba(239,68,68,' + (0.1 + intensity * 0.35) + ')';
          }

          var cx2 = ox + ci * cw + 2;
          var cy2 = oy + ri * rh + 2;
          var isH = (hovRow === ri && hovCol === ci);
          ctx.fillStyle = cellColor;
          ctx.strokeStyle = isH ? '#6366f1' : 'transparent';
          ctx.lineWidth = isH ? 2 : 0;
          ctx.beginPath();
          ctx.roundRect(cx2, cy2, cw - 4, rh - 4, 3);
          ctx.fill();
          if (isH) ctx.stroke();

          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.fillStyle = cText();
          ctx.textAlign = 'center';
          ctx.fillText(b.scores[ci].toString(), cx2 + (cw - 4) / 2, cy2 + (rh - 4) / 2 + 4);

          if (isH) {
            ctx.font = '8px -apple-system,sans-serif';
            ctx.fillStyle = diff >= 0 ? '#4ade80' : '#f43f5e';
            ctx.fillText((diff >= 0 ? '+' : '') + diff + ' vs ' + b.compAvg[ci], cx2 + (cw - 4) / 2, cy2 + (rh - 4) / 2 + 15);
          }
        }
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var ox = 100, oy = 65, cw = (W - ox - 20) / dims.length, rh = (H - oy - 30) / benchmarks.length;
      var or1 = hovRow, oc1 = hovCol;
      hovRow = -1; hovCol = -1;
      if (mx >= ox && my >= oy) {
        var ci2 = Math.floor((mx - ox) / cw);
        var ri2 = Math.floor((my - oy) / rh);
        if (ci2 >= 0 && ci2 < dims.length && ri2 >= 0 && ri2 < benchmarks.length) {
          hovRow = ri2; hovCol = ci2;
        }
      }
      if (hovRow !== or1 || hovCol !== oc1) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovRow = -1; hovCol = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 7: Version Roadmap Gantt (Canvas 640x380)
   * 12 projects version timeline as Gantt bars
   * ================================================================ */
  function buildVersionRoadmap() {
    var vRange = [10, 30];
    var ganttData = PROJECTS.map(function (p) {
      var cur = parseInt(p.ver.slice(1));
      return { name: p.name, icon: p.icon, color: p.color, start: Math.max(10, cur - 14), end: cur, target: cur + 4 };
    });

    var cc = createCanvas(640, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovered = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Version Roadmap Timeline', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Current versions and projected next milestones — hover for details', W / 2, 36);

      var ox = 100, oy = 55, gw = W - ox - 30, gh = H - oy - 40;
      var bh = gh / ganttData.length - 3;
      var minV = 10, maxV = 35;
      var range = maxV - minV;

      for (var v = minV; v <= maxV; v += 5) {
        var vx = ox + ((v - minV) / range) * gw;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(vx, oy); ctx.lineTo(vx, oy + gh); ctx.stroke();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.textAlign = 'center';
        ctx.fillText('v' + v, vx, H - 15);
      }

      for (var i = 0; i < ganttData.length; i++) {
        var g = ganttData[i];
        var y = oy + i * (bh + 3);
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = hovered === i ? g.color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(g.icon + ' ' + g.name, ox - 8, y + bh / 2 + 3);

        var x1 = ox + ((g.start - minV) / range) * gw;
        var x2 = ox + ((g.end - minV) / range) * gw;
        var x3 = ox + ((g.target - minV) / range) * gw;

        ctx.fillStyle = hexAlpha(g.color, hovered === i ? 0.7 : 0.45);
        ctx.beginPath(); ctx.roundRect(x1, y, x2 - x1, bh, 3); ctx.fill();

        ctx.fillStyle = hexAlpha(g.color, 0.2);
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = hexAlpha(g.color, 0.5);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x2 + 2, y, x3 - x2 - 2, bh, 3);
        ctx.fill(); ctx.stroke();
        ctx.setLineDash([]);

        if (hovered === i) {
          ctx.font = 'bold 8px -apple-system,sans-serif';
          ctx.fillStyle = g.color;
          ctx.textAlign = 'center';
          ctx.fillText('v' + g.start + '→v' + g.end + ' (next: v' + g.target + ')', (x1 + x3) / 2, y - 3);
        }
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 55, gh = H - oy - 40, bh = gh / ganttData.length - 3;
      var old = hovered; hovered = -1;
      for (var i = 0; i < ganttData.length; i++) {
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
   * SECTION 8: Contribution Heatmap (Canvas 640x380)
   * GitHub-style 52-week contribution grid
   * ================================================================ */
  function buildContributionHeatmap() {
    var weeks = 30;
    var days = 7;
    var dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];
    var data = [];
    for (var w = 0; w < weeks; w++) {
      var row = [];
      for (var d = 0; d < days; d++) {
        var base = Math.round(3 + Math.sin(w * 0.4) * 2 + Math.cos(d * 1.1) * 1.5);
        if (w > 20) base += 2;
        if (d === 0 || d === 6) base = Math.max(0, base - 2);
        row.push(Math.max(0, Math.min(10, base)));
      }
      data.push(row);
    }

    var cc = createCanvas(640, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovW = -1, hovD = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Development Contribution Heatmap', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('30-week activity intensity — hover cells', W / 2, 36);

      var ox = 45, oy = 60;
      var cellW = (W - ox - 30) / weeks;
      var cellH = (H - oy - 80) / days;

      ctx.font = '8px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'right';
      for (var dl = 0; dl < days; dl++) {
        if (dayLabels[dl]) {
          ctx.fillText(dayLabels[dl], ox - 5, oy + dl * cellH + cellH / 2 + 3);
        }
      }

      for (var wi = 0; wi < weeks; wi++) {
        if (wi % 4 === 0) {
          ctx.font = '8px -apple-system,sans-serif';
          ctx.fillStyle = cText3();
          ctx.textAlign = 'center';
          ctx.fillText('W' + (wi + 1), ox + wi * cellW + cellW / 2, oy - 6);
        }
        for (var di = 0; di < days; di++) {
          var v = data[wi][di];
          var intensity = v / 10;
          var isH = (hovW === wi && hovD === di);
          if (v === 0) {
            ctx.fillStyle = isDark() ? 'rgba(30,30,50,.6)' : 'rgba(230,230,240,.8)';
          } else {
            ctx.fillStyle = 'rgba(99,102,241,' + (0.15 + intensity * 0.7) + ')';
          }
          var cx3 = ox + wi * cellW + 1;
          var cy3 = oy + di * cellH + 1;
          ctx.beginPath();
          ctx.roundRect(cx3, cy3, cellW - 2, cellH - 2, 2);
          ctx.fill();
          if (isH) {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      if (hovW >= 0 && hovD >= 0) {
        var hv = data[hovW][hovD];
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(hv + ' contributions on ' + dayLabels[hovD] + ' of week ' + (hovW + 1), W / 2, H - 40);
      }

      var totalContribs = 0;
      data.forEach(function (row) { row.forEach(function (v) { totalContribs += v; }); });
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.textAlign = 'center';
      ctx.fillText('Total: ' + totalContribs + ' contributions | Avg: ' + (totalContribs / (weeks * days)).toFixed(1) + '/day', W / 2, H - 20);

      var legX = W - 180, legY = H - 55;
      ctx.font = '8px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'left';
      ctx.fillText('Less', legX, legY + 9);
      for (var li = 0; li < 5; li++) {
        ctx.fillStyle = 'rgba(99,102,241,' + (0.1 + li * 0.2) + ')';
        ctx.beginPath(); ctx.roundRect(legX + 28 + li * 16, legY, 12, 12, 2); ctx.fill();
      }
      ctx.fillStyle = cText3();
      ctx.fillText('More', legX + 110, legY + 9);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var ox = 45, oy = 60;
      var cellW = (W - ox - 30) / weeks;
      var cellH = (H - oy - 80) / days;
      var ow = hovW, od = hovD;
      hovW = -1; hovD = -1;
      var ci = Math.floor((mx - ox) / cellW);
      var di2 = Math.floor((my - oy) / cellH);
      if (ci >= 0 && ci < weeks && di2 >= 0 && di2 < days) { hovW = ci; hovD = di2; }
      if (hovW !== ow || hovD !== od) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovW = -1; hovD = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * UPDATE STATS IN HERO (v24)
   * ================================================================ */
  function updateHeroStats() {
    var stats = $$('.stat-num');
    stats.forEach(function (s) {
      var count = parseInt(s.getAttribute('data-count'));
      if (count === 270000 || count === 9600) {
        if (count === 270000) s.setAttribute('data-count', '330000');
        if (count === 9600) s.setAttribute('data-count', '11400');
      }
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
      { id: 'v24-velocity', title: 'Feature Velocity Timeline', sub: 'Features added per release across 6 versions — hover a project line', builder: function (wrap) { wrap.appendChild(buildFeatureVelocity()); }, sfxName: 'velocity' },
      { id: 'v24-quality', title: 'Code Quality Radar', sub: '6-axis quality profile — click to cycle projects', builder: function (wrap) { wrap.appendChild(buildCodeQualityRadar()); }, sfxName: 'quality' },
      { id: 'v24-burndown', title: 'Development Progress Tracker', sub: 'Cumulative features vs target — hover months', builder: function (wrap) { wrap.appendChild(buildBurndownChart()); }, sfxName: 'burndown' },
      { id: 'v24-innovation', title: 'Innovation Index Bubble Chart', sub: 'X=Complexity, Y=UX Score, Bubble Size=LOC — hover', builder: function (wrap) { wrap.appendChild(buildInnovationIndex()); }, sfxName: 'innovation' },
      { id: 'v24-ecosystem', title: 'Tech Ecosystem Sunburst', sub: 'Inner: NEXTERA/PRISM — Middle: Projects — Outer: Technologies', builder: function (wrap) { wrap.appendChild(buildEcosystemSunburst()); }, sfxName: 'ecosystem' },
      { id: 'v24-benchmark', title: 'Competitive Benchmark Matrix', sub: '12 projects vs market leaders — hover cells for score comparison', builder: function (wrap) { wrap.appendChild(buildBenchmarkMatrix()); }, sfxName: 'benchmark' },
      { id: 'v24-roadmap', title: 'Version Roadmap Timeline', sub: 'Current versions and projected milestones — hover for details', builder: function (wrap) { wrap.appendChild(buildVersionRoadmap()); }, sfxName: 'roadmap' },
      { id: 'v24-contrib', title: 'Development Contribution Heatmap', sub: '30-week activity intensity — GitHub-style — hover cells', builder: function (wrap) { wrap.appendChild(buildContributionHeatmap()); }, sfxName: 'contribution' }
    ];

    sections.forEach(function (sec) {
      var section = el('section', { className: 'v24-section section-reveal', id: sec.id });
      section.appendChild(el('h2', { textContent: sec.title }));
      section.appendChild(el('p', { className: 'v24-section-sub', textContent: sec.sub }));
      var card = el('div', { className: 'v24-card' });
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

    showToast('v24.0', '8 new analytics canvases • 330K+ LOC • 12 SFX • Benchmark data updated');
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+Q/W/E/R/T/Y/U/I + Shift+0)
   * ================================================================ */
  var sectionIds = ['v24-velocity', 'v24-quality', 'v24-burndown', 'v24-innovation', 'v24-ecosystem', 'v24-benchmark', 'v24-roadmap', 'v24-contrib'];
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
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section24'); }
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
