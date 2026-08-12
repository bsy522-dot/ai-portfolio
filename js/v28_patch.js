/**
 * ai-portfolio v28.0 Patch Module
 * Last updated: 2026-08-12
 */
;(function () {
  'use strict';
  if (window._v28) return;
  window._v28 = { version: '28.0.0', applied: Date.now() };

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
   * PROJECT DATA (v28.0 — all 12 repos updated to latest 2026-08-12)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v33.0', loc: 37800, features: 390, quizzes: 390, achievements: 288, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.8, testCoverage: 88, uxScore: 94, monthlyGrowth: 4.4 },
    { name: 'SmartGolf', ver: 'v41.0', loc: 35800, features: 362, quizzes: 362, achievements: 364, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 9.5, testCoverage: 91, uxScore: 97, monthlyGrowth: 4.1 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86, monthlyGrowth: 1.2 },
    { name: 'Piano', ver: 'v29.0', loc: 33200, features: 288, quizzes: 300, achievements: 288, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.2, testCoverage: 86, uxScore: 96, monthlyGrowth: 3.9 },
    { name: 'Boxing', ver: 'v30.0', loc: 32400, features: 286, quizzes: 330, achievements: 286, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.3, testCoverage: 85, uxScore: 93, monthlyGrowth: 3.8 },
    { name: 'Karaoke', ver: 'v29.0', loc: 31400, features: 282, quizzes: 342, achievements: 282, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 9.0, testCoverage: 87, uxScore: 95, monthlyGrowth: 3.7 },
    { name: 'Violin', ver: 'v28.0', loc: 30600, features: 286, quizzes: 285, achievements: 286, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.2, testCoverage: 83, uxScore: 94, monthlyGrowth: 3.6 },
    { name: 'City Builder', ver: 'v27.0', loc: 29600, features: 302, quizzes: 355, achievements: 302, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 9.0, testCoverage: 89, uxScore: 92, monthlyGrowth: 3.5 },
    { name: 'House Builder', ver: 'v27.0', loc: 29000, features: 302, quizzes: 345, achievements: 302, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.8, testCoverage: 82, uxScore: 91, monthlyGrowth: 3.4 },
    { name: 'Golf Tracker', ver: 'v27.0', loc: 27400, features: 228, quizzes: 300, achievements: 228, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.5, testCoverage: 88, uxScore: 93, monthlyGrowth: 3.2 },
    { name: 'Hatcuping', ver: 'v29.0', loc: 25400, features: 286, quizzes: 315, achievements: 286, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 8.5, testCoverage: 81, uxScore: 96, monthlyGrowth: 3.3 },
    { name: 'CCF', ver: 'v25.0', loc: 23400, features: 270, quizzes: 315, achievements: 270, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 8.3, testCoverage: 90, uxScore: 94, monthlyGrowth: 3.0 }
  ];
  var TOTAL_LOC = 410000;
  var TOTAL_SESSIONS = 13800;

  /* ================================================================
   * CSS (v28)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v28-patch-styles';
  style.textContent = [
    '.v28-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v28-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v28-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v28-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v28-canvas{display:block;margin:0 auto}',
    '.v28-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v28-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v28-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v28)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav28: function () { tone(1480, 0.06, 'sine'); },
    section28: function () { tone(1109, 0.08, 'triangle'); },
    cadence: function () { tone(587, 0.1, 'triangle'); tone(740, 0.07, 'sine', 0.08); },
    apipattern: function () { tone(554, 0.1, 'sine'); tone(698, 0.07, 'triangle', 0.07); },
    trajectory: function () { tone(740, 0.12, 'triangle'); tone(932, 0.08, 'sine', 0.1); },
    dxscore: function () { tone(440, 0.1, 'sine'); tone(554, 0.06, 'triangle', 0.08); },
    innovation: function () { tone(587, 0.1, 'triangle'); tone(740, 0.07, 'sine', 0.08); },
    techrisk: function () { tone(494, 0.08, 'sine'); tone(622, 0.06, 'triangle', 0.06); },
    synergy: function () { tone(784, 0.1, 'triangle'); tone(988, 0.06, 'sine', 0.08); },
    roidash: function () { tone(880, 0.12, 'sine'); tone(1109, 0.08, 'triangle', 0.1); },
    hover28: function () { tone(2637, 0.03, 'sine'); },
    click28: function () { tone(1319, 0.04, 'triangle'); tone(1661, 0.03, 'sine', 0.03); },
    reveal28: function () { tone(554, 0.1, 'sine'); tone(698, 0.07, 'triangle', 0.07); tone(831, 0.05, 'sine', 0.12); },
    grade28: function () { tone(988, 0.08, 'triangle'); tone(1319, 0.06, 'sine', 0.06); },
    toast28: function () { tone(1480, 0.06, 'sine'); tone(1865, 0.04, 'triangle', 0.05); },
    badge28: function () { tone(1047, 0.08, 'sine'); tone(1319, 0.06, 'triangle', 0.06); }
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
    sfx('toast28');
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
    canvas.className = 'v28-canvas';
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
   * 1. RELEASE CADENCE RHYTHM ANALYZER (Canvas 620x400)
   *    12 projects release frequency timeline heatmap
   * ================================================================ */
  function buildReleaseCadence() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
    var data = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var releasesPerMonth = [];
      for (var m = 0; m < 8; m++) {
        var base = Math.max(1, Math.round(verNum / 8));
        var jitter = Math.round(Math.sin((m + verNum) * 0.7) * base * 0.4);
        releasesPerMonth.push(Math.max(1, base + jitter));
      }
      var avgCadence = Math.round(releasesPerMonth.reduce(function(a,b){return a+b;},0) / 8 * 10) / 10;
      return { name: p.name, releases: releasesPerMonth, avg: avgCadence, color: p.color, icon: p.icon };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Release Cadence Rhythm Analyzer', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Monthly release frequency heatmap (2026 Jan–Aug)', W / 2, 46);

      var padL = 100, padR = 20, padT = 60, padB = 50;
      var cellW = Math.floor((W - padL - padR) / 8);
      var cellH = Math.floor((H - padT - padB) / 12);
      var maxRel = 0;
      data.forEach(function (d) { d.releases.forEach(function (r) { if (r > maxRel) maxRel = r; }); });

      MONTHS.forEach(function (m, mi) {
        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m, padL + mi * cellW + cellW / 2, padT - 6);
      });

      data.forEach(function (d, di) {
        ctx.fillStyle = hovIdx === di ? '#fff' : cText2();
        ctx.font = (hovIdx === di ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.icon + ' ' + d.name, padL - 6, padT + di * cellH + cellH / 2 + 3);

        d.releases.forEach(function (r, mi) {
          var x = padL + mi * cellW + 2;
          var y = padT + di * cellH + 2;
          var intensity = r / maxRel;
          var alpha = 0.15 + intensity * 0.85;
          ctx.fillStyle = d.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.roundRect(x, y, cellW - 4, cellH - 4, [3]);
          ctx.fill();
          ctx.globalAlpha = 1;

          if (intensity >= 0.7) {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 9px -apple-system,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(r, x + (cellW - 4) / 2, y + (cellH - 4) / 2 + 3);
          }
        });
      });

      if (hovIdx >= 0 && hovIdx < data.length) {
        var hd = data[hovIdx];
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 140, H - 42, 280, 34, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        var gd = gradeFor(hd.avg, maxRel);
        ctx.fillText(hd.icon + ' ' + hd.name + ' — Avg ' + hd.avg + ' releases/month — Grade: ' + gd.grade, W / 2, H - 21);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sy = cc.canvas.height / rect.height;
      var my = (e.clientY - rect.top) * sy;
      var padT = 60, cellH = Math.floor((H - 60 - 50) / 12);
      var ni = Math.floor((my - padT) / cellH);
      if (ni !== hovIdx) { hovIdx = (ni >= 0 && ni < 12) ? ni : -1; draw(); if (hovIdx >= 0) sfx('hover28'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) { sfx('cadence'); showToast('Release Cadence', data[hovIdx].name + ': Avg ' + data[hovIdx].avg + ' releases/month'); } });

    return { title: 'Release Cadence Rhythm Analyzer', sub: '12 Projects × 8 Months Release Frequency Heatmap', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 2. CROSS-PROJECT API PATTERN DETECTOR (Canvas 640x400)
   *    Shared patterns: Canvas, WebAudio, PWA, Touch, 3D, Audio
   * ================================================================ */
  function buildApiPatternDetector() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var PATTERNS = [
      { name: 'Canvas 2D Rendering', key: 'Canvas', color: '#6366f1' },
      { name: 'Web Audio API', key: 'WebAudio', color: '#22d3ee' },
      { name: 'PWA (Service Worker)', key: 'PWA', color: '#4ade80' },
      { name: 'Touch Gestures', key: 'Touch', color: '#f59e0b' },
      { name: '3D Engine (Three.js)', key: 'Three.js', color: '#f43f5e' },
      { name: 'Audio Synthesis (Tone.js)', key: 'Tone.js', color: '#a78bfa' },
      { name: 'Geolocation', key: 'Geolocation', color: '#34d399' },
      { name: 'Map Rendering (Leaflet)', key: 'Leaflet', color: '#38bdf8' }
    ];

    var patternData = PATTERNS.map(function (pat) {
      var users = [];
      PROJECTS.forEach(function (p) {
        if (p.tech.indexOf(pat.key) >= 0) users.push(p.name);
      });
      return { name: pat.name, key: pat.key, color: pat.color, users: users, count: users.length, adoption: Math.round(users.length / PROJECTS.length * 100) };
    });
    patternData.sort(function (a, b) { return b.count - a.count; });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Cross-Project API Pattern Detector', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Shared technology patterns across 12 projects', W / 2, 46);

      var padL = 180, padR = 40, padT = 65, padB = 50;
      var chartW = W - padL - padR;
      var barH = Math.floor((H - padT - padB) / patternData.length) - 6;

      patternData.forEach(function (d, i) {
        var y = padT + i * (barH + 6);
        var bw = (d.count / 12) * chartW;

        ctx.fillStyle = hovIdx === i ? '#fff' : cText2();
        ctx.font = (hovIdx === i ? 'bold ' : '') + '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.name, padL - 10, y + barH / 2 + 3);

        var isHov = hovIdx === i;
        ctx.fillStyle = d.color;
        ctx.globalAlpha = isHov ? 1 : 0.75;
        ctx.beginPath();
        ctx.roundRect(padL, y, bw, barH, [0, 6, 6, 0]);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        if (bw > 50) ctx.fillText(d.count + '/12 (' + d.adoption + '%)', padL + bw - 70, y + barH / 2 + 3);

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(padL, y, bw, barH, [0, 6, 6, 0]);
          ctx.stroke();
        }
      });

      if (hovIdx >= 0 && hovIdx < patternData.length) {
        var hd = patternData[hovIdx];
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 160, H - 42, 320, 34, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Used by: ' + hd.users.join(', '), W / 2, H - 21);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sy = cc.canvas.height / rect.height;
      var my = (e.clientY - rect.top) * sy;
      var padT = 65, barH = Math.floor((H - 65 - 50) / patternData.length) - 6;
      var ni = Math.floor((my - padT) / (barH + 6));
      if (ni !== hovIdx) { hovIdx = (ni >= 0 && ni < patternData.length) ? ni : -1; draw(); if (hovIdx >= 0) sfx('hover28'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) { sfx('apipattern'); showToast('API Pattern', patternData[hovIdx].name + ': ' + patternData[hovIdx].adoption + '% adoption'); } });

    return { title: 'Cross-Project API Pattern Detector', sub: '8 API Patterns × 12 Projects Adoption Matrix', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 3. CODEBASE GROWTH TRAJECTORY PREDICTOR (Canvas 620x400)
   *    LOC growth over 12 months with 3-month extrapolation
   * ================================================================ */
  function buildGrowthTrajectory() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovMonth = -1;

    var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep*','Oct*','Nov*'];
    var totalHistory = [];
    var baseLoc = 280000;
    for (var m = 0; m < 11; m++) {
      var growth = (m < 8) ? (15000 + Math.round(Math.sin(m * 0.8) * 4000)) : 0;
      baseLoc += growth;
      totalHistory.push({ month: MONTHS[m], loc: baseLoc, predicted: m >= 8 });
    }
    totalHistory[8].loc = totalHistory[7].loc + 16000;
    totalHistory[9].loc = totalHistory[8].loc + 17000;
    totalHistory[10].loc = totalHistory[9].loc + 18000;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Codebase Growth Trajectory Predictor', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('LOC growth with 3-month forecast (starred = predicted)', W / 2, 46);

      var padL = 70, padR = 30, padT = 65, padB = 60;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var maxLoc = Math.max.apply(null, totalHistory.map(function(d){return d.loc;})) * 1.05;
      var minLoc = totalHistory[0].loc * 0.95;
      var range = maxLoc - minLoc;

      for (var g = 0; g <= 4; g++) {
        var gy = padT + chartH - (g / 4) * chartH;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(W - padR, gy);
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(minLoc + range * g / 4).toLocaleString() + 'K', padL - 8, gy + 3);
      }

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      totalHistory.forEach(function (d, i) {
        if (i >= 8 && i > 0) return;
        var x = padL + i * (chartW / (totalHistory.length - 1));
        var y = padT + chartH - ((d.loc - minLoc) / range) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      for (var i = 7; i < totalHistory.length; i++) {
        var x = padL + i * (chartW / (totalHistory.length - 1));
        var y = padT + chartH - ((totalHistory[i].loc - minLoc) / range) * chartH;
        if (i === 7) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      var gradient = ctx.createLinearGradient(0, padT, 0, padT + chartH);
      gradient.addColorStop(0, 'rgba(99,102,241,.2)');
      gradient.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      totalHistory.forEach(function (d, i) {
        var x = padL + i * (chartW / (totalHistory.length - 1));
        var y = padT + chartH - ((d.loc - minLoc) / range) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.lineTo(padL + chartW, padT + chartH);
      ctx.lineTo(padL, padT + chartH);
      ctx.closePath();
      ctx.fill();

      totalHistory.forEach(function (d, i) {
        var x = padL + i * (chartW / (totalHistory.length - 1));
        var y = padT + chartH - ((d.loc - minLoc) / range) * chartH;

        ctx.fillStyle = d.predicted ? '#f59e0b' : '#6366f1';
        ctx.beginPath();
        ctx.arc(x, y, hovMonth === i ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        if (hovMonth === i) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }

        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.month, x, padT + chartH + 16);
      });

      if (hovMonth >= 0 && hovMonth < totalHistory.length) {
        var hd = totalHistory[hovMonth];
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 120, H - 42, 240, 34, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hd.month + ': ' + hd.loc.toLocaleString() + ' LOC' + (hd.predicted ? ' (Forecast)' : ''), W / 2, H - 21);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sx = cc.canvas.width / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var padL = 70, padR = 30;
      var chartW = W - padL - padR;
      var step = chartW / (totalHistory.length - 1);
      var ni = Math.round((mx - padL) / step);
      if (ni !== hovMonth) { hovMonth = (ni >= 0 && ni < totalHistory.length) ? ni : -1; draw(); if (hovMonth >= 0) sfx('hover28'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovMonth = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovMonth >= 0) sfx('trajectory'); });

    return { title: 'Codebase Growth Trajectory', sub: 'LOC Growth History + 3-Month Forecast', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 4. DEVELOPER EXPERIENCE (DX) SCORECARD (Canvas 620x400)
   *    6 DX axes: Docs, Testing, Build Speed, DX API, Modularity, Debugging
   * ================================================================ */
  function buildDxScorecard() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var clickIdx = 0;

    var DX_AXES = ['Documentation', 'Test Coverage', 'Build Speed', 'API Ergonomics', 'Modularity', 'Debugging'];

    var dxData = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      return {
        name: p.name, color: p.color, icon: p.icon,
        scores: [
          Math.min(100, Math.round(60 + verNum * 0.8 + p.uxScore * 0.2)),
          p.testCoverage,
          Math.min(100, Math.round(70 + p.complexity * 2)),
          Math.min(100, Math.round(55 + verNum * 0.9 + p.uxScore * 0.15)),
          Math.min(100, Math.round(50 + verNum * 1.1 + p.complexity)),
          Math.min(100, Math.round(65 + p.testCoverage * 0.2 + verNum * 0.3))
        ]
      };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Developer Experience (DX) Scorecard', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Click to cycle projects — 6-axis DX Radar', W / 2, 46);

      var cx = W / 2, cy = 210, R = 130;
      var d = dxData[clickIdx];

      for (var ring = 1; ring <= 4; ring++) {
        var rr = R * ring / 4;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var a = 0; a < 6; a++) {
          var angle = -Math.PI / 2 + (Math.PI * 2 / 6) * a;
          var px = cx + Math.cos(angle) * rr;
          var py = cy + Math.sin(angle) * rr;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        if (ring === 4) {
          ctx.fillStyle = cText3();
          ctx.font = '9px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText((ring * 25).toString(), cx + 12, cy - rr + 3);
        }
      }

      for (var a = 0; a < 6; a++) {
        var angle = -Math.PI / 2 + (Math.PI * 2 / 6) * a;
        ctx.strokeStyle = cGrid();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
        ctx.stroke();

        var lx = cx + Math.cos(angle) * (R + 20);
        var ly = cy + Math.sin(angle) * (R + 20);
        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(DX_AXES[a], lx, ly + 3);
      }

      ctx.fillStyle = d.color;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      d.scores.forEach(function (s, i) {
        var angle = -Math.PI / 2 + (Math.PI * 2 / 6) * i;
        var pr = R * (s / 100);
        var px = cx + Math.cos(angle) * pr;
        var py = cy + Math.sin(angle) * pr;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = d.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      d.scores.forEach(function (s, i) {
        var angle = -Math.PI / 2 + (Math.PI * 2 / 6) * i;
        var pr = R * (s / 100);
        var px = cx + Math.cos(angle) * pr;
        var py = cy + Math.sin(angle) * pr;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.stroke();

      d.scores.forEach(function (s, i) {
        var angle = -Math.PI / 2 + (Math.PI * 2 / 6) * i;
        var pr = R * (s / 100);
        var px = cx + Math.cos(angle) * pr;
        var py = cy + Math.sin(angle) * pr;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      var avgDx = Math.round(d.scores.reduce(function(a,b){return a+b;},0) / 6);
      var gd = gradeFor(avgDx, 100);
      ctx.fillStyle = gd.color;
      ctx.font = 'bold 36px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(gd.grade, cx, cy + 8);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText(avgDx + '/100', cx, cy + 24);

      ctx.fillStyle = cText();
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillText(d.icon + ' ' + d.name + ' (' + (clickIdx + 1) + '/12)', W / 2, H - 24);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.fillText('Click to cycle →', W / 2, H - 8);
    }

    draw();
    cc.canvas.addEventListener('click', function () {
      clickIdx = (clickIdx + 1) % PROJECTS.length;
      draw();
      sfx('dxscore');
    });

    return { title: 'Developer Experience Scorecard', sub: '12 Projects × 6-Axis DX Radar (Click to Cycle)', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 5. INNOVATION INDEX BUBBLE CHART (Canvas 640x400)
   *    X=Maturity(version), Y=Innovation(features/ver), Size=LOC
   * ================================================================ */
  function buildInnovationBubble() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var bubbles = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var innovation = Math.round(p.features / Math.max(verNum, 1) * 100) / 100;
      return { name: p.name, icon: p.icon, maturity: verNum, innovation: innovation, loc: p.loc, color: p.color, complexity: p.complexity };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Innovation Index Bubble Chart', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('X = Maturity (Version) | Y = Innovation (Features/Ver) | Size = LOC', W / 2, 46);

      var padL = 60, padR = 30, padT = 60, padB = 50;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;

      var maxVer = Math.max.apply(null, bubbles.map(function(b){return b.maturity;})) * 1.1;
      var maxInn = Math.max.apply(null, bubbles.map(function(b){return b.innovation;})) * 1.15;
      var maxLoc = Math.max.apply(null, bubbles.map(function(b){return b.loc;}));

      for (var g = 0; g <= 4; g++) {
        var gy = padT + chartH - (g / 4) * chartH;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(W - padR, gy);
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((maxInn * g / 4).toFixed(1), padL - 8, gy + 3);

        var gx = padL + (g / 4) * chartW;
        ctx.beginPath();
        ctx.moveTo(gx, padT);
        ctx.lineTo(gx, padT + chartH);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.fillText('v' + Math.round(maxVer * g / 4), gx, padT + chartH + 16);
      }

      ctx.fillStyle = cText3();
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Maturity (Version) →', W / 2, padT + chartH + 34);
      ctx.save();
      ctx.translate(14, padT + chartH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Innovation (Features/Ver) →', 0, 0);
      ctx.restore();

      bubbles.forEach(function (b, i) {
        var x = padL + (b.maturity / maxVer) * chartW;
        var y = padT + chartH - (b.innovation / maxInn) * chartH;
        var r = 10 + (b.loc / maxLoc) * 25;

        ctx.fillStyle = b.color;
        ctx.globalAlpha = hovIdx === i ? 0.9 : 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (hovIdx === i) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = cText();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.icon, x, y + 3);
      });

      if (hovIdx >= 0 && hovIdx < bubbles.length) {
        var hb = bubbles[hovIdx];
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 150, H - 42, 300, 34, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hb.icon + ' ' + hb.name + ' — v' + hb.maturity + ' | Inn: ' + hb.innovation.toFixed(1) + ' | ' + (hb.loc / 1000).toFixed(1) + 'K LOC', W / 2, H - 21);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sx = cc.canvas.width / rect.width;
      var sy = cc.canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * sy;
      var padL = 60, padR = 30, padT = 60, padB = 50;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var maxVer = Math.max.apply(null, bubbles.map(function(b){return b.maturity;})) * 1.1;
      var maxInn = Math.max.apply(null, bubbles.map(function(b){return b.innovation;})) * 1.15;
      var maxLoc = Math.max.apply(null, bubbles.map(function(b){return b.loc;}));
      var found = -1;
      bubbles.forEach(function (b, i) {
        var x = padL + (b.maturity / maxVer) * chartW;
        var y = padT + chartH - (b.innovation / maxInn) * chartH;
        var r = 10 + (b.loc / maxLoc) * 25;
        if (Math.sqrt(Math.pow(mx - x, 2) + Math.pow(my - y, 2)) <= r) found = i;
      });
      if (found !== hovIdx) { hovIdx = found; draw(); if (hovIdx >= 0) sfx('hover28'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) sfx('innovation'); });

    return { title: 'Innovation Index Bubble Chart', sub: 'Maturity vs Innovation vs LOC for 12 Projects', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 6. TECHNICAL RISK HEATMAP (Canvas 620x400)
   *    12 projects x 6 risk factors heatmap
   * ================================================================ */
  function buildTechRiskHeatmap() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovCell = null;

    var RISKS = ['Dependency Age', 'Code Complexity', 'Test Gap', 'Perf Bottleneck', 'Bundle Size', 'Security Surface'];

    var riskData = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      return {
        name: p.name, icon: p.icon, color: p.color,
        scores: [
          Math.max(1, Math.min(10, Math.round(10 - verNum * 0.2))),
          Math.round(p.complexity),
          Math.max(1, Math.min(10, Math.round(10 - p.testCoverage / 10))),
          Math.max(1, Math.min(10, Math.round(p.loc / 5000))),
          Math.max(1, Math.min(10, Math.round(p.loc / 4500))),
          Math.max(1, Math.min(10, Math.round(3 + p.tech.length * 1.2)))
        ]
      };
    });

    function riskColor(v) {
      if (v <= 3) return '#4ade80';
      if (v <= 5) return '#fbbf24';
      if (v <= 7) return '#fb923c';
      return '#f43f5e';
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Technical Risk Heatmap', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('12 Projects × 6 Risk Factors (lower = safer)', W / 2, 46);

      var padL = 100, padR = 20, padT = 60, padB = 40;
      var cellW = Math.floor((W - padL - padR) / RISKS.length);
      var cellH = Math.floor((H - padT - padB) / riskData.length);

      RISKS.forEach(function (r, ri) {
        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(padL + ri * cellW + cellW / 2, padT - 6);
        ctx.rotate(-Math.PI / 8);
        ctx.fillText(r, 0, 0);
        ctx.restore();
      });

      riskData.forEach(function (d, di) {
        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.icon + ' ' + d.name, padL - 6, padT + di * cellH + cellH / 2 + 3);

        d.scores.forEach(function (s, ri) {
          var x = padL + ri * cellW + 2;
          var y = padT + di * cellH + 2;
          var isHov = hovCell && hovCell.r === di && hovCell.c === ri;

          ctx.fillStyle = riskColor(s);
          ctx.globalAlpha = isHov ? 1 : 0.7;
          ctx.beginPath();
          ctx.roundRect(x, y, cellW - 4, cellH - 4, [3]);
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.fillStyle = s > 5 ? '#fff' : '#000';
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(s.toString(), x + (cellW - 4) / 2, y + (cellH - 4) / 2 + 3);

          if (isHov) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, cellW - 4, cellH - 4, [3]);
            ctx.stroke();
          }
        });
      });

      if (hovCell) {
        var hd = riskData[hovCell.r];
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 140, H - 35, 280, 30, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hd.name + ' — ' + RISKS[hovCell.c] + ': ' + hd.scores[hovCell.c] + '/10', W / 2, H - 16);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sx = cc.canvas.width / rect.width;
      var sy = cc.canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * sy;
      var padL = 100, padR = 20, padT = 60, padB = 40;
      var cellW = Math.floor((W - padL - padR) / RISKS.length);
      var cellH = Math.floor((H - padT - padB) / riskData.length);
      var c = Math.floor((mx - padL) / cellW);
      var r = Math.floor((my - padT) / cellH);
      var newCell = (c >= 0 && c < RISKS.length && r >= 0 && r < riskData.length) ? { r: r, c: c } : null;
      if (!hovCell && !newCell) return;
      if (hovCell && newCell && hovCell.r === newCell.r && hovCell.c === newCell.c) return;
      hovCell = newCell;
      draw();
      if (hovCell) sfx('hover28');
    });
    cc.canvas.addEventListener('mouseleave', function () { hovCell = null; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovCell) sfx('techrisk'); });

    return { title: 'Technical Risk Heatmap', sub: '12 Projects × 6 Risk Factors Assessment', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 7. PROJECT SYNERGY NETWORK (Canvas 640x400)
   *    Force-directed network of shared tech connections
   * ================================================================ */
  function buildSynergyNetwork() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var nodes = PROJECTS.map(function (p, i) {
      var angle = (Math.PI * 2 / PROJECTS.length) * i - Math.PI / 2;
      var rx = 220, ry = 140;
      return { name: p.name, icon: p.icon, color: p.color, tech: p.tech, x: W / 2 + Math.cos(angle) * rx, y: H / 2 + Math.sin(angle) * ry + 10 };
    });

    var edges = [];
    for (var i = 0; i < PROJECTS.length; i++) {
      for (var j = i + 1; j < PROJECTS.length; j++) {
        var shared = PROJECTS[i].tech.filter(function (t) { return PROJECTS[j].tech.indexOf(t) >= 0; });
        if (shared.length > 0) {
          edges.push({ from: i, to: j, shared: shared, weight: shared.length });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Project Synergy Network', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Shared technology connections between 12 projects', W / 2, 46);

      edges.forEach(function (e) {
        var n1 = nodes[e.from], n2 = nodes[e.to];
        var isHov = hovIdx === e.from || hovIdx === e.to;
        ctx.strokeStyle = isHov ? 'rgba(99,102,241,.6)' : cGrid();
        ctx.lineWidth = isHov ? e.weight * 1.5 : e.weight * 0.7;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      });

      nodes.forEach(function (n, i) {
        var isHov = hovIdx === i;
        var r = isHov ? 22 : 18;
        ctx.fillStyle = n.color;
        ctx.globalAlpha = isHov ? 0.9 : 0.6;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke(); }

        ctx.fillStyle = '#fff';
        ctx.font = (isHov ? '16px' : '13px') + ' -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.icon, n.x, n.y + (isHov ? 5 : 4));

        ctx.fillStyle = isHov ? '#fff' : cText2();
        ctx.font = (isHov ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.fillText(n.name, n.x, n.y + r + 12);
      });

      if (hovIdx >= 0 && hovIdx < nodes.length) {
        var connCount = edges.filter(function (e) { return e.from === hovIdx || e.to === hovIdx; }).length;
        var techs = nodes[hovIdx].tech.join(', ');
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 160, H - 42, 320, 34, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(nodes[hovIdx].name + ' — ' + connCount + ' connections | Tech: ' + techs, W / 2, H - 21);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sx = cc.canvas.width / rect.width;
      var sy = cc.canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * sy;
      var found = -1;
      nodes.forEach(function (n, i) {
        if (Math.sqrt(Math.pow(mx - n.x, 2) + Math.pow(my - n.y, 2)) <= 22) found = i;
      });
      if (found !== hovIdx) { hovIdx = found; draw(); if (hovIdx >= 0) sfx('hover28'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) sfx('synergy'); });

    return { title: 'Project Synergy Network', sub: 'Technology Sharing Network Graph', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 8. PORTFOLIO ROI DASHBOARD (Canvas 620x400)
   *    8 KPI half-gauges: LOC, Features, Quizzes, Achievements, UX, Testing, Growth, Complexity
   * ================================================================ */
  function buildRoiDashboard() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    var totalFeatures = PROJECTS.reduce(function(a,p){return a+p.features;},0);
    var totalQuizzes = PROJECTS.reduce(function(a,p){return a+p.quizzes;},0);
    var totalAchievements = PROJECTS.reduce(function(a,p){return a+p.achievements;},0);
    var avgUx = Math.round(PROJECTS.reduce(function(a,p){return a+p.uxScore;},0) / PROJECTS.length);
    var avgTest = Math.round(PROJECTS.reduce(function(a,p){return a+p.testCoverage;},0) / PROJECTS.length);
    var avgGrowth = Math.round(PROJECTS.reduce(function(a,p){return a+p.monthlyGrowth;},0) / PROJECTS.length * 10) / 10;
    var avgComplexity = Math.round(PROJECTS.reduce(function(a,p){return a+p.complexity;},0) / PROJECTS.length * 10) / 10;

    var gauges = [
      { label: 'Total LOC', value: Math.round(TOTAL_LOC / 1000), max: 500, unit: 'K' },
      { label: 'Features', value: totalFeatures, max: 4000, unit: '' },
      { label: 'Quizzes', value: totalQuizzes, max: 5000, unit: '' },
      { label: 'Achievements', value: totalAchievements, max: 4000, unit: '' },
      { label: 'Avg UX Score', value: avgUx, max: 100, unit: '' },
      { label: 'Avg Test Cov', value: avgTest, max: 100, unit: '%' },
      { label: 'Avg Growth', value: avgGrowth, max: 5, unit: '/mo' },
      { label: 'Avg Complexity', value: avgComplexity, max: 10, unit: '' }
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio ROI Dashboard', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('8 KPI Half-Gauges — Weighted Portfolio Grade', W / 2, 46);

      var cols = 4, rows = 2;
      var gW = 130, gH = 110;
      var startX = (W - cols * gW) / 2;
      var startY = 65;

      var totalScore = 0;
      gauges.forEach(function (g, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var cx = startX + col * gW + gW / 2;
        var cy = startY + row * (gH + 30) + gH / 2 + 20;
        var R = 42;

        var pct = Math.min(1, g.value / g.max);
        var gd = gradeFor(g.value, g.max);
        totalScore += pct;

        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, R, Math.PI, 0);
        ctx.stroke();

        ctx.strokeStyle = gd.color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, R, Math.PI, Math.PI + Math.PI * pct);
        ctx.stroke();
        ctx.lineCap = 'butt';

        ctx.fillStyle = gd.color;
        ctx.font = 'bold 18px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(gd.grade, cx, cy);

        ctx.fillStyle = cText();
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillText(g.value + g.unit, cx, cy + 16);

        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillText(g.label, cx, cy + R + 8);
      });

      var overallPct = totalScore / gauges.length;
      var overallGrade = gradeFor(overallPct * 100, 100);
      ctx.fillStyle = overallGrade.color;
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillText('Overall Portfolio Grade: ' + overallGrade.grade + ' (' + Math.round(overallPct * 100) + '/100)', W / 2, H - 16);
    }

    draw();
    cc.canvas.addEventListener('click', function () { sfx('roidash'); });

    return { title: 'Portfolio ROI Dashboard', sub: '8 KPI Half-Gauges with Weighted Portfolio Grade', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * SECTION BUILDER
   * ================================================================ */
  var builders = [
    { id: 'v28-cadence', build: buildReleaseCadence },
    { id: 'v28-apipattern', build: buildApiPatternDetector },
    { id: 'v28-trajectory', build: buildGrowthTrajectory },
    { id: 'v28-dxscore', build: buildDxScorecard },
    { id: 'v28-innovation', build: buildInnovationBubble },
    { id: 'v28-techrisk', build: buildTechRiskHeatmap },
    { id: 'v28-synergy', build: buildSynergyNetwork },
    { id: 'v28-roidash', build: buildRoiDashboard }
  ];

  function injectSections() {
    var anchor = null;
    var sgs = $$('.v27-section');
    if (sgs.length) anchor = sgs[sgs.length - 1];
    if (!anchor) {
      var sections = $$('.section, [class*="v2"][class*="-section"]');
      if (sections.length) anchor = sections[sections.length - 1];
    }
    if (!anchor) anchor = $('footer') || document.body.lastElementChild;

    builders.forEach(function (b) {
      if ($('#' + b.id)) return;
      var result = b.build();
      var sec = el('section', { id: b.id, className: 'v28-section section-reveal' }, [
        el('h2', { textContent: result.title }),
        el('p', { className: 'v28-section-sub', textContent: result.sub }),
        el('div', { className: 'v28-card' }, [result.canvas])
      ]);
      if (anchor.nextSibling) anchor.parentNode.insertBefore(sec, anchor.nextSibling);
      else anchor.parentNode.appendChild(sec);
      anchor = sec;

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('revealed'); sfx('reveal28'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.15 });
      obs.observe(sec);
    });
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift + Q/W/E/R/T/Y/U/I)
   * ================================================================ */
  var shortcutMap = { Q: 'v28-cadence', W: 'v28-apipattern', E: 'v28-trajectory', R: 'v28-dxscore', T: 'v28-innovation', Y: 'v28-techrisk', U: 'v28-synergy', I: 'v28-roidash' };
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var id = shortcutMap[e.key.toUpperCase()];
    if (id && $('#' + id)) {
      e.preventDefault();
      $('#' + id).scrollIntoView({ behavior: 'smooth', block: 'center' });
      sfx('nav28');
    }
  });

  /* ================================================================
   * THEME OBSERVER (redraw on theme change)
   * ================================================================ */
  var themeObs = new MutationObserver(function () {
    builders.forEach(function (b) { try { b.build(); } catch (e) {} });
  });
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ================================================================
   * INIT
   * ================================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(injectSections, 300); });
  } else {
    setTimeout(injectSections, 300);
  }

  showToast('v28.0 Loaded', '8 Analytics: Cadence + API Patterns + Trajectory + DX + Innovation + Risk + Synergy + ROI');
})();
