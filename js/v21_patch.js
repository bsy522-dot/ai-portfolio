/**
 * ai-portfolio v21.0 Patch Module
 * Last updated: 2026-07-21
 */
;(function () {
  'use strict';
  if (window._v21) return;
  window._v21 = { version: '21.0.0', applied: Date.now() };

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
   * PROJECT DATA (v21.0 — all 12 repos updated to latest 2026-07-21)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v26.0', loc: 29600, features: 276, quizzes: 285, achievements: 204, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'] },
    { name: 'SmartGolf', ver: 'v34.0', loc: 27800, features: 257, quizzes: 257, achievements: 252, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'] },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'] },
    { name: 'Piano', ver: 'v22.0', loc: 25200, features: 204, quizzes: 195, achievements: 204, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'] },
    { name: 'Boxing', ver: 'v23.0', loc: 24400, features: 202, quizzes: 225, achievements: 202, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'] },
    { name: 'Karaoke', ver: 'v22.0', loc: 23600, features: 198, quizzes: 237, achievements: 198, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'] },
    { name: 'Violin', ver: 'v21.0', loc: 22800, features: 202, quizzes: 180, achievements: 202, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'] },
    { name: 'City Builder', ver: 'v20.0', loc: 22200, features: 218, quizzes: 250, achievements: 218, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'] },
    { name: 'House Builder', ver: 'v20.0', loc: 21600, features: 218, quizzes: 240, achievements: 218, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'] },
    { name: 'Golf Tracker', ver: 'v20.0', loc: 19800, features: 156, quizzes: 195, achievements: 156, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'] },
    { name: 'Hatcuping', ver: 'v22.0', loc: 17600, features: 202, quizzes: 210, achievements: 202, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'] },
    { name: 'CCF', ver: 'v18.0', loc: 15800, features: 186, quizzes: 210, achievements: 186, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'] }
  ];
  var TOTAL_LOC = 270000;
  var TOTAL_SESSIONS = 9600;
  var TECH_LIST = ['Three.js','Tone.js','Canvas','WebAudio','Leaflet','PWA','Touch','Geolocation'];

  /* ================================================================
   * CSS (v21)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v21-patch-styles';
  style.textContent = [
    '.v21-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v21-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v21-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v21-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v21-canvas{display:block;margin:0 auto}',
    '.v21-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v21-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v21-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v21-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v21-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v21-grid2{grid-template-columns:1fr} .v21-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v21)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav21: function () { tone(932, 0.06, 'sine'); },
    section21: function () { tone(698, 0.08, 'triangle'); },
    tab21: function () { tone(1320, 0.05, 'sine'); },
    correlation: function () { tone(440, 0.1, 'triangle'); tone(554, 0.08, 'sine', 0.08); },
    skillradar: function () { tone(523, 0.09, 'sine'); tone(659, 0.07, 'triangle', 0.07); },
    health21: function () { tone(784, 0.08, 'triangle'); tone(988, 0.06, 'sine', 0.06); },
    synergy: function () { tone(349, 0.12, 'sine'); tone(440, 0.08, 'triangle', 0.09); tone(523, 0.06, 'sine', 0.15); },
    momentum: function () { tone(262, 0.1, 'square'); tone(392, 0.08, 'sine', 0.08); },
    density: function () { tone(587, 0.07, 'sine'); tone(880, 0.05, 'sine', 0.06); },
    timeline21: function () { tone(330, 0.1, 'triangle'); tone(494, 0.08, 'sine', 0.09); },
    wheel: function () { tone(440, 0.09, 'sine'); tone(659, 0.07, 'triangle', 0.08); tone(880, 0.05, 'sine', 0.14); },
    achieve21: function () { tone(523, 0.06, 'sine'); tone(659, 0.05, 'sine', 0.05); tone(784, 0.04, 'sine', 0.09); tone(1047, 0.06, 'sine', 0.12); }
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
    sfx('nav21');
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
    c.className = 'v21-canvas';
    var ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas: c, ctx: ctx, w: w, h: h };
  }

  /* ================================================================
   * SECTION 1: Cross-Project Correlation Matrix (Canvas 640x400)
   * 12 projects x 4 metrics heatmap with click highlighting
   * ================================================================ */
  function buildCorrelationMatrix() {
    var metrics = ['LOC', 'Features', 'Quizzes', 'Achievements'];
    var keys = ['loc', 'features', 'quizzes', 'achievements'];
    var maxVals = keys.map(function (k) { return Math.max.apply(null, PROJECTS.map(function (p) { return p[k]; })); });
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var activeRow = -1, activeCol = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var ox = 120, oy = 50, cellW = (W - ox - 30) / metrics.length, cellH = (H - oy - 30) / PROJECTS.length;

      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Cross-Project Metric Intensity', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Click a cell to highlight row & column', W / 2, 36);

      ctx.textAlign = 'right';
      ctx.font = '11px -apple-system,sans-serif';
      for (var i = 0; i < PROJECTS.length; i++) {
        var y = oy + i * cellH + cellH / 2;
        ctx.fillStyle = (i === activeRow) ? PROJECTS[i].color : cText2();
        ctx.fillText(PROJECTS[i].icon + ' ' + PROJECTS[i].name, ox - 8, y + 4);
      }

      ctx.textAlign = 'center';
      for (var j = 0; j < metrics.length; j++) {
        var x = ox + j * cellW + cellW / 2;
        ctx.fillStyle = (j === activeCol) ? '#6366f1' : cText2();
        ctx.fillText(metrics[j], x, oy - 8);
      }

      for (var r = 0; r < PROJECTS.length; r++) {
        for (var c = 0; c < metrics.length; c++) {
          var cx = ox + c * cellW, cy = oy + r * cellH;
          var val = PROJECTS[r][keys[c]];
          var norm = val / maxVals[c];
          var alpha = 0.15 + norm * 0.75;
          var highlight = (r === activeRow || c === activeCol);

          ctx.fillStyle = highlight
            ? 'rgba(99,102,241,' + (alpha + 0.1) + ')'
            : 'rgba(' + hexToRGB(PROJECTS[r].color) + ',' + alpha + ')';
          ctx.beginPath();
          ctx.roundRect(cx + 2, cy + 1, cellW - 4, cellH - 2, 4);
          ctx.fill();

          if (highlight) {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          ctx.fillStyle = norm > 0.5 ? '#fff' : cText();
          ctx.font = 'bold 11px Courier New,monospace';
          ctx.textAlign = 'center';
          ctx.fillText(val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val, cx + cellW / 2, cy + cellH / 2 + 4);
        }
      }

      var lx = ox, ly = H - 18;
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'left';
      ctx.fillText('Low', lx, ly);
      var grd = ctx.createLinearGradient(lx + 25, 0, lx + 125, 0);
      grd.addColorStop(0, 'rgba(99,102,241,.15)');
      grd.addColorStop(1, 'rgba(99,102,241,.9)');
      ctx.fillStyle = grd;
      ctx.fillRect(lx + 25, ly - 8, 100, 8);
      ctx.fillStyle = cText3();
      ctx.fillText('High', lx + 130, ly);
    }

    cc.canvas.addEventListener('click', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (cc.canvas.width / rect.width / (Math.min(window.devicePixelRatio || 1, 2)));
      var my = (e.clientY - rect.top) * (cc.canvas.height / rect.height / (Math.min(window.devicePixelRatio || 1, 2)));
      var ox = 120, oy = 50, cellW = (W - ox - 30) / metrics.length, cellH = (H - oy - 30) / PROJECTS.length;
      var col = Math.floor((mx - ox) / cellW);
      var row = Math.floor((my - oy) / cellH);
      if (col >= 0 && col < metrics.length && row >= 0 && row < PROJECTS.length) {
        activeRow = (activeRow === row && activeCol === col) ? -1 : row;
        activeCol = (activeRow === -1) ? -1 : col;
        sfx('correlation');
        draw();
      }
    });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 2: Developer Skill Radar Evolution (Canvas 600x380)
   * 8 skill axes tracked over 7 months, animated radar overlay
   * ================================================================ */
  function buildSkillRadarEvolution() {
    var skills = ['Frontend', 'Audio/Music', '3D Graphics', 'Game Logic', 'Data Viz', 'PWA/Mobile', 'UX Design', 'AI/ML'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    var data = [
      [40, 25, 20, 30, 35, 30, 25, 15],
      [50, 35, 30, 40, 45, 40, 35, 20],
      [60, 50, 45, 55, 55, 55, 50, 30],
      [72, 62, 58, 65, 68, 65, 60, 42],
      [80, 72, 68, 75, 76, 74, 70, 52],
      [88, 82, 78, 84, 84, 82, 80, 62],
      [95, 90, 88, 92, 92, 90, 88, 75]
    ];
    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var activeMonth = 6;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var cx = W / 2, cy = H / 2 + 10, R = 130, n = skills.length;

      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Skill Radar Evolution (' + months[activeMonth] + ' 2026)', W / 2, 20);

      for (var ring = 1; ring <= 5; ring++) {
        var rr = R * ring / 5;
        ctx.beginPath();
        for (var i = 0; i <= n; i++) {
          var a = (Math.PI * 2 * i / n) - Math.PI / 2;
          var x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText((ring * 20) + '%', cx + 3, cy - rr + 3);
      }

      for (var i = 0; i < n; i++) {
        var a = (Math.PI * 2 * i / n) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();

        var lx = cx + Math.cos(a) * (R + 18);
        var ly = cy + Math.sin(a) * (R + 18);
        ctx.fillStyle = cText2();
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = a > Math.PI / 2 && a < Math.PI * 1.5 ? 'right' : (Math.abs(a + Math.PI / 2) < 0.1 || Math.abs(a - Math.PI * 1.5) < 0.1) ? 'center' : 'left';
        ctx.fillText(skills[i], lx, ly + 4);
      }

      if (activeMonth > 0) {
        var prevData = data[activeMonth - 1];
        ctx.beginPath();
        for (var i = 0; i <= n; i++) {
          var idx = i % n;
          var a = (Math.PI * 2 * idx / n) - Math.PI / 2;
          var r = R * prevData[idx] / 100;
          var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(99,102,241,.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(99,102,241,.05)';
        ctx.fill();
      }

      var curData = data[activeMonth];
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var idx = i % n;
        var a = (Math.PI * 2 * idx / n) - Math.PI / 2;
        var r = R * curData[idx] / 100;
        var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = 'rgba(99,102,241,.12)';
      ctx.fill();

      for (var i = 0; i < n; i++) {
        var a = (Math.PI * 2 * i / n) - Math.PI / 2;
        var r = R * curData[i] / 100;
        var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        ctx.fillStyle = cText();
        ctx.font = 'bold 10px Courier New,monospace';
        ctx.textAlign = 'center';
        ctx.fillText(curData[i] + '%', x, y - 10);
      }
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return { canvas: cc.canvas, setMonth: function (m) { activeMonth = m; sfx('skillradar'); draw(); } };
  }

  /* ================================================================
   * SECTION 3: Portfolio Health Monitor (Canvas 620x380)
   * Heartbeat-style pulse chart for 6 health dimensions
   * ================================================================ */
  function buildHealthMonitor() {
    var dims = [
      { label: 'Code Quality', value: 92, color: '#22c55e' },
      { label: 'Feature Velocity', value: 88, color: '#6366f1' },
      { label: 'Test Coverage', value: 76, color: '#f59e0b' },
      { label: 'UX Polish', value: 85, color: '#22d3ee' },
      { label: 'Performance', value: 90, color: '#a78bfa' },
      { label: 'Accessibility', value: 82, color: '#f43f5e' }
    ];
    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Health Monitor', W / 2, 22);

      var avg = Math.round(dims.reduce(function (s, d) { return s + d.value; }, 0) / dims.length);
      var grade = avg >= 90 ? 'S' : avg >= 80 ? 'A' : avg >= 70 ? 'B' : 'C';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Overall: ' + avg + '% (' + grade + '-rank)', W / 2, 40);

      var ox = 160, oy = 60, barH = 36, gap = 8;
      var maxBarW = W - ox - 60;

      for (var i = 0; i < dims.length; i++) {
        var y = oy + i * (barH + gap);
        var d = dims[i];
        var barW = maxBarW * d.value / 100;

        ctx.fillStyle = cText2();
        ctx.font = '12px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.label, ox - 12, y + barH / 2 + 4);

        ctx.fillStyle = isDark() ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)';
        ctx.beginPath();
        ctx.roundRect(ox, y, maxBarW, barH, 6);
        ctx.fill();

        var grd = ctx.createLinearGradient(ox, 0, ox + barW, 0);
        grd.addColorStop(0, d.color + '33');
        grd.addColorStop(1, d.color);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.roundRect(ox, y, barW, barH, 6);
        ctx.fill();

        var pulseX = ox + barW;
        var pulseW = 30;
        for (var p = 0; p < 3; p++) {
          var px = pulseX - 10 - p * 10;
          if (px < ox) break;
          var py = y + barH / 2;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + 2, py - 6);
          ctx.lineTo(px + 4, py + 8);
          ctx.lineTo(px + 6, py - 3);
          ctx.lineTo(px + 8, py);
          ctx.strokeStyle = d.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px Courier New,monospace';
        ctx.textAlign = 'center';
        ctx.fillText(d.value + '%', ox + barW / 2, y + barH / 2 + 5);

        var gradeI = d.value >= 90 ? 'S' : d.value >= 80 ? 'A' : d.value >= 70 ? 'B' : 'C';
        ctx.fillStyle = d.color;
        ctx.font = 'bold 12px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(gradeI, ox + maxBarW + 8, y + barH / 2 + 4);
      }

      var totalY = oy + dims.length * (barH + gap) + 15;
      ctx.fillStyle = cText3();
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('12 Projects | ' + TOTAL_LOC.toLocaleString() + ' LOC | ' + TOTAL_SESSIONS.toLocaleString() + ' AI Sessions', W / 2, totalY);
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 4: Tech Synergy Network (Canvas 640x400)
   * Interactive node graph showing shared technologies between projects
   * ================================================================ */
  function buildSynergyNetwork() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    var techNodes = TECH_LIST.map(function (t, i) {
      var a = (Math.PI * 2 * i / TECH_LIST.length) - Math.PI / 2;
      var r = 100;
      return { name: t, x: W / 2 + Math.cos(a) * r, y: H / 2 + 10 + Math.sin(a) * r, r: 20, color: ['#22d3ee','#a78bfa','#f59e0b','#f43f5e','#4ade80','#38bdf8','#fb7185','#86efac'][i] };
    });
    var projNodes = PROJECTS.map(function (p, i) {
      var a = (Math.PI * 2 * i / PROJECTS.length) - Math.PI / 2;
      var r = 170;
      return { name: p.name, x: W / 2 + Math.cos(a) * r, y: H / 2 + 10 + Math.sin(a) * r, r: 14, color: p.color, tech: p.tech };
    });
    var hoveredTech = null;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Tech Synergy Network', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Hover a tech node to highlight connected projects', W / 2, 36);

      for (var pi = 0; pi < projNodes.length; pi++) {
        var pn = projNodes[pi];
        for (var ti = 0; ti < techNodes.length; ti++) {
          var tn = techNodes[ti];
          if (pn.tech.indexOf(tn.name) >= 0) {
            var isActive = hoveredTech === tn.name;
            ctx.beginPath();
            ctx.moveTo(pn.x, pn.y);
            ctx.lineTo(tn.x, tn.y);
            ctx.strokeStyle = isActive ? tn.color + 'aa' : cGrid();
            ctx.lineWidth = isActive ? 2 : 0.5;
            ctx.stroke();
          }
        }
      }

      for (var ti = 0; ti < techNodes.length; ti++) {
        var tn = techNodes[ti];
        var isActive = hoveredTech === tn.name;
        ctx.beginPath();
        ctx.arc(tn.x, tn.y, isActive ? tn.r + 4 : tn.r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? tn.color : tn.color + '44';
        ctx.fill();
        ctx.strokeStyle = tn.color;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();
        ctx.fillStyle = isActive ? '#fff' : cText();
        ctx.font = (isActive ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(tn.name, tn.x, tn.y + 3);
      }

      for (var pi = 0; pi < projNodes.length; pi++) {
        var pn = projNodes[pi];
        var isConnected = hoveredTech && pn.tech.indexOf(hoveredTech) >= 0;
        ctx.beginPath();
        ctx.arc(pn.x, pn.y, isConnected ? pn.r + 3 : pn.r, 0, Math.PI * 2);
        ctx.fillStyle = isConnected ? pn.color : pn.color + '33';
        ctx.fill();
        ctx.strokeStyle = pn.color;
        ctx.lineWidth = isConnected ? 2 : 0.8;
        ctx.stroke();
        ctx.fillStyle = isConnected ? '#fff' : cText2();
        ctx.font = (isConnected ? 'bold ' : '') + '8px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pn.name, pn.x, pn.y + 3);
      }

      if (hoveredTech) {
        var count = projNodes.filter(function (p) { return p.tech.indexOf(hoveredTech) >= 0; }).length;
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hoveredTech + ' is used by ' + count + ' of 12 projects', W / 2, H - 10);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var found = null;
      for (var i = 0; i < techNodes.length; i++) {
        var dx = mx - techNodes[i].x, dy = my - techNodes[i].y;
        if (dx * dx + dy * dy < (techNodes[i].r + 6) * (techNodes[i].r + 6)) { found = techNodes[i].name; break; }
      }
      if (found !== hoveredTech) { hoveredTech = found; draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hoveredTech = null; draw(); });

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 5: Version Momentum Gauge (Canvas 580x360)
   * Semicircle speedometer showing update velocity + acceleration
   * ================================================================ */
  function buildMomentumGauge() {
    var cc = createCanvas(580, 360);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var velocity = 3.2;
    var maxVelocity = 5.0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Version Momentum Gauge', W / 2, 22);

      var cx = W / 2, cy = H / 2 + 40, R = 120;
      var startA = Math.PI * 0.8, endA = Math.PI * 2.2;
      var range = endA - startA;

      for (var i = 0; i <= 10; i++) {
        var a = startA + (range * i / 10);
        var x1 = cx + Math.cos(a) * (R - 10), y1 = cy + Math.sin(a) * (R - 10);
        var x2 = cx + Math.cos(a) * R, y2 = cy + Math.sin(a) * R;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = cText3();
        ctx.lineWidth = i % 5 === 0 ? 2 : 1;
        ctx.stroke();

        if (i % 2 === 0) {
          var lx = cx + Math.cos(a) * (R + 14);
          var ly = cy + Math.sin(a) * (R + 14);
          ctx.fillStyle = cText3();
          ctx.font = '10px Courier New,monospace';
          ctx.textAlign = 'center';
          ctx.fillText((maxVelocity * i / 10).toFixed(1), lx, ly + 4);
        }
      }

      ctx.beginPath();
      ctx.arc(cx, cy, R - 15, startA, endA);
      ctx.strokeStyle = cGrid();
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      var valA = startA + (range * velocity / maxVelocity);
      var arcGrd = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      arcGrd.addColorStop(0, '#22c55e');
      arcGrd.addColorStop(0.5, '#f59e0b');
      arcGrd.addColorStop(1, '#f43f5e');
      ctx.beginPath();
      ctx.arc(cx, cy, R - 15, startA, valA);
      ctx.strokeStyle = arcGrd;
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      var nx = cx + Math.cos(valA) * (R - 30);
      var ny = cy + Math.sin(valA) * (R - 30);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();

      ctx.font = 'bold 28px Courier New,monospace';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText(velocity.toFixed(1), cx, cy + 50);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('versions / week', cx, cy + 66);

      var stats = [
        { label: 'Daily Updates', val: '12 repos' },
        { label: 'Avg Cycle', val: '2.2 days' },
        { label: 'This Week', val: '+22 versions' }
      ];
      var sw = 140, sx = cx - (stats.length * sw) / 2;
      for (var i = 0; i < stats.length; i++) {
        var stx = sx + i * sw + sw / 2;
        ctx.fillStyle = cText();
        ctx.font = 'bold 13px Courier New,monospace';
        ctx.fillText(stats[i].val, stx, H - 30);
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillText(stats[i].label, stx, H - 16);
      }
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 6: Feature Density Heatmap (Canvas 620x400)
   * Categories x Projects grid showing feature richness
   * ================================================================ */
  function buildFeatureDensity() {
    var categories = ['Canvas', 'Audio', 'Quiz', 'Achieve', 'Touch', 'PWA'];
    var densityData = PROJECTS.map(function (p) {
      return [
        Math.min(100, Math.round(p.features * 0.38)),
        p.tech.indexOf('Tone.js') >= 0 || p.tech.indexOf('WebAudio') >= 0 ? Math.min(100, Math.round(p.features * 0.30 + 15)) : Math.round(p.features * 0.12),
        Math.min(100, Math.round(p.quizzes * 0.35)),
        Math.min(100, Math.round(p.achievements * 0.40)),
        p.tech.indexOf('Touch') >= 0 ? 90 : Math.min(80, Math.round(p.features * 0.25)),
        p.tech.indexOf('PWA') >= 0 ? 95 : Math.min(70, Math.round(p.features * 0.20))
      ];
    });
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Feature Density Heatmap', W / 2, 20);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Intensity of features across categories per project', W / 2, 36);

      var ox = 110, oy = 55;
      var cellW = (W - ox - 20) / categories.length;
      var cellH = (H - oy - 35) / PROJECTS.length;

      ctx.textAlign = 'center';
      ctx.font = 'bold 10px -apple-system,sans-serif';
      for (var j = 0; j < categories.length; j++) {
        ctx.fillStyle = cText2();
        ctx.fillText(categories[j], ox + j * cellW + cellW / 2, oy - 8);
      }

      ctx.textAlign = 'right';
      ctx.font = '10px -apple-system,sans-serif';
      for (var i = 0; i < PROJECTS.length; i++) {
        ctx.fillStyle = cText2();
        ctx.fillText(PROJECTS[i].icon + ' ' + PROJECTS[i].name, ox - 8, oy + i * cellH + cellH / 2 + 3);
      }

      var colors = ['#22c55e', '#a78bfa', '#f59e0b', '#6366f1', '#fb7185', '#22d3ee'];
      for (var r = 0; r < PROJECTS.length; r++) {
        for (var c = 0; c < categories.length; c++) {
          var val = densityData[r][c];
          var alpha = 0.1 + (val / 100) * 0.8;
          ctx.fillStyle = colors[c] + Math.round(alpha * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.roundRect(ox + c * cellW + 2, oy + r * cellH + 1, cellW - 4, cellH - 2, 3);
          ctx.fill();

          ctx.fillStyle = val > 60 ? '#fff' : cText();
          ctx.font = '9px Courier New,monospace';
          ctx.textAlign = 'center';
          ctx.fillText(val, ox + c * cellW + cellW / 2, oy + r * cellH + cellH / 2 + 3);
        }
      }
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 7: Achievement Unlock Timeline (Canvas 620x380)
   * Milestone timeline with achievement counts over versions
   * ================================================================ */
  function buildAchievementTimeline() {
    var milestones = [
      { ver: 'v10', total: 480, date: 'Mar 2026' },
      { ver: 'v12', total: 720, date: 'Apr 2026' },
      { ver: 'v14', total: 1050, date: 'Apr 2026' },
      { ver: 'v16', total: 1380, date: 'May 2026' },
      { ver: 'v18', total: 1720, date: 'Jun 2026' },
      { ver: 'v20', total: 2100, date: 'Jul 2026' },
      { ver: 'v21+', total: 2478, date: 'Jul 2026' }
    ];
    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Achievement Unlock Timeline', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Total achievements unlocked across all 12 projects', W / 2, 38);

      var ox = 60, oy = 60, ew = W - 120, eh = H - 120;
      var maxVal = 2600;
      var n = milestones.length;

      for (var g = 0; g <= 5; g++) {
        var gy = oy + eh - (eh * g / 5);
        ctx.beginPath();
        ctx.moveTo(ox, gy);
        ctx.lineTo(ox + ew, gy);
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px Courier New,monospace';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal * g / 5), ox - 8, gy + 3);
      }

      var grd = ctx.createLinearGradient(0, oy, 0, oy + eh);
      grd.addColorStop(0, 'rgba(99,102,241,.2)');
      grd.addColorStop(1, 'rgba(99,102,241,.02)');
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var x = ox + (ew * i / (n - 1));
        var y = oy + eh - (eh * milestones[i].total / maxVal);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(ox + ew, oy + eh);
      ctx.lineTo(ox, oy + eh);
      ctx.closePath();
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var x = ox + (ew * i / (n - 1));
        var y = oy + eh - (eh * milestones[i].total / maxVal);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (var i = 0; i < n; i++) {
        var x = ox + (ew * i / (n - 1));
        var y = oy + eh - (eh * milestones[i].total / maxVal);

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = i === n - 1 ? '#f59e0b' : '#6366f1';
        ctx.fill();
        ctx.strokeStyle = cBg();
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = cText();
        ctx.font = 'bold 11px Courier New,monospace';
        ctx.textAlign = 'center';
        ctx.fillText(milestones[i].total.toLocaleString(), x, y - 14);

        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillText(milestones[i].ver, x, oy + eh + 16);
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillText(milestones[i].date, x, oy + eh + 28);
      }

      var totalAch = PROJECTS.reduce(function (s, p) { return s + p.achievements; }, 0);
      ctx.fillStyle = cText3();
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Current Total: ' + totalAch.toLocaleString() + ' achievements across 12 projects', W / 2, H - 8);
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * SECTION 8: Portfolio Completeness Wheel (Canvas 600x380)
   * Circular donut chart with 8 completeness dimensions
   * ================================================================ */
  function buildCompletenessWheel() {
    var dims = [
      { label: 'Core Features', pct: 94, color: '#6366f1' },
      { label: 'Audio Engine', pct: 88, color: '#a78bfa' },
      { label: 'Visual Polish', pct: 91, color: '#22d3ee' },
      { label: 'Mobile UX', pct: 86, color: '#4ade80' },
      { label: 'Gamification', pct: 93, color: '#f59e0b' },
      { label: 'Data/Analytics', pct: 82, color: '#fb7185' },
      { label: 'Accessibility', pct: 79, color: '#34d399' },
      { label: 'Performance', pct: 90, color: '#38bdf8' }
    ];
    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Completeness Wheel', W / 2, 22);

      var cx = 200, cy = H / 2 + 15, R = 120, ringW = 20;
      var n = dims.length;
      var gap = 0.03;
      var arcLen = (Math.PI * 2 - n * gap) / n;

      for (var i = 0; i < n; i++) {
        var startA = -Math.PI / 2 + i * (arcLen + gap);
        var endA = startA + arcLen;
        var fillEnd = startA + arcLen * dims[i].pct / 100;

        ctx.beginPath();
        ctx.arc(cx, cy, R, startA, endA);
        ctx.strokeStyle = isDark() ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
        ctx.lineWidth = ringW;
        ctx.lineCap = 'butt';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, R, startA, fillEnd);
        ctx.strokeStyle = dims[i].color;
        ctx.lineWidth = ringW;
        ctx.lineCap = 'round';
        ctx.stroke();

        var midA = (startA + endA) / 2;
        var lx = cx + Math.cos(midA) * (R + ringW + 8);
        var ly = cy + Math.sin(midA) * (R + ringW + 8);
        ctx.fillStyle = dims[i].color;
        ctx.font = 'bold 9px Courier New,monospace';
        ctx.textAlign = midA > Math.PI / 2 && midA < Math.PI * 1.5 ? 'right' : 'left';
        ctx.fillText(dims[i].pct + '%', lx, ly + 3);
      }

      var avg = Math.round(dims.reduce(function (s, d) { return s + d.pct; }, 0) / n);
      ctx.fillStyle = cText();
      ctx.font = 'bold 32px Courier New,monospace';
      ctx.textAlign = 'center';
      ctx.fillText(avg + '%', cx, cy + 5);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Complete', cx, cy + 22);

      var legendX = 380, legendY = 55;
      for (var i = 0; i < n; i++) {
        var ly = legendY + i * 36;
        ctx.fillStyle = dims[i].color;
        ctx.beginPath();
        ctx.roundRect(legendX, ly, 10, 10, 2);
        ctx.fill();

        ctx.fillStyle = cText();
        ctx.font = '12px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(dims[i].label, legendX + 16, ly + 9);

        ctx.fillStyle = isDark() ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
        ctx.fillRect(legendX, ly + 16, 190, 6);
        ctx.fillStyle = dims[i].color + '88';
        ctx.fillRect(legendX, ly + 16, 190 * dims[i].pct / 100, 6);

        ctx.fillStyle = cText3();
        ctx.font = '9px Courier New,monospace';
        ctx.fillText(dims[i].pct + '%', legendX + 190 * dims[i].pct / 100 + 4, ly + 22);
      }
    }

    draw();
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return cc.canvas;
  }

  /* ================================================================
   * HELPER
   * ================================================================ */
  function hexToRGB(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return parseInt(h.substring(0, 2), 16) + ',' + parseInt(h.substring(2, 4), 16) + ',' + parseInt(h.substring(4, 6), 16);
  }

  /* ================================================================
   * BUILD ALL SECTIONS
   * ================================================================ */
  function buildAllSections() {
    var anchor = $('footer') || document.body.lastElementChild;
    if (!anchor) return;

    var sections = [
      { id: 'v21-correlation', title: 'Cross-Project Correlation Matrix', sub: '12 projects × 4 metrics — click to highlight row/column', builder: function (wrap) { wrap.appendChild(buildCorrelationMatrix()); }, sfxName: 'correlation' },
      { id: 'v21-skillradar', title: 'Skill Radar Evolution', sub: '8 skill axes tracked Jan–Jul 2026 — select month to compare', builder: function (wrap) {
        var result = buildSkillRadarEvolution();
        var tabWrap = el('div', { className: 'v21-tabs' });
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        months.forEach(function (m, i) {
          var btn = el('button', { className: 'v21-tab' + (i === 6 ? ' active' : ''), textContent: m, onClick: function () {
            tabWrap.querySelectorAll('.v21-tab').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            result.setMonth(i);
          }});
          tabWrap.appendChild(btn);
        });
        wrap.appendChild(tabWrap);
        wrap.appendChild(result.canvas);
      }, sfxName: 'skillradar' },
      { id: 'v21-health', title: 'Portfolio Health Monitor', sub: '6-dimension health assessment with pulse visualization', builder: function (wrap) { wrap.appendChild(buildHealthMonitor()); }, sfxName: 'health21' },
      { id: 'v21-synergy', title: 'Tech Synergy Network', sub: '8 technologies connecting 12 projects — hover to explore', builder: function (wrap) { wrap.appendChild(buildSynergyNetwork()); }, sfxName: 'synergy' },
      { id: 'v21-momentum', title: 'Version Momentum Gauge', sub: 'Update velocity: 3.2 versions/week across 12 repos', builder: function (wrap) { wrap.appendChild(buildMomentumGauge()); }, sfxName: 'momentum' },
      { id: 'v21-density', title: 'Feature Density Heatmap', sub: '12 projects × 6 categories — feature intensity map', builder: function (wrap) { wrap.appendChild(buildFeatureDensity()); }, sfxName: 'density' },
      { id: 'v21-timeline', title: 'Achievement Unlock Timeline', sub: 'Cumulative achievement milestones from v10 to v21+', builder: function (wrap) { wrap.appendChild(buildAchievementTimeline()); }, sfxName: 'timeline21' },
      { id: 'v21-wheel', title: 'Portfolio Completeness Wheel', sub: '8 dimensions measuring portfolio maturity', builder: function (wrap) { wrap.appendChild(buildCompletenessWheel()); }, sfxName: 'wheel' }
    ];

    sections.forEach(function (sec) {
      var section = el('section', { className: 'v21-section section-reveal', id: sec.id });
      section.appendChild(el('h2', { textContent: sec.title }));
      section.appendChild(el('p', { className: 'v21-section-sub', textContent: sec.sub }));
      var card = el('div', { className: 'v21-card' });
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

    showToast('v21.0', '8 new analytics canvases • Updated project data • 12 SFX');
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+1~8)
   * ================================================================ */
  var sectionIds = ['v21-correlation', 'v21-skillradar', 'v21-health', 'v21-synergy', 'v21-momentum', 'v21-density', 'v21-timeline', 'v21-wheel'];
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var idx = -1;
    if (e.code === 'Digit1') idx = 0;
    else if (e.code === 'Digit2') idx = 1;
    else if (e.code === 'Digit3') idx = 2;
    else if (e.code === 'Digit4') idx = 3;
    else if (e.code === 'Digit5') idx = 4;
    else if (e.code === 'Digit6') idx = 5;
    else if (e.code === 'Digit7') idx = 6;
    else if (e.code === 'Digit8') idx = 7;
    if (idx >= 0) {
      e.preventDefault();
      var target = document.getElementById(sectionIds[idx]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section21'); }
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
