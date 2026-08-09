/**
 * ai-portfolio v27.0 Patch Module
 * Last updated: 2026-08-09
 */
;(function () {
  'use strict';
  if (window._v27) return;
  window._v27 = { version: '27.0.0', applied: Date.now() };

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
   * PROJECT DATA (v27.0 — all 12 repos updated to latest 2026-08-09)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v32.0', loc: 36200, features: 348, quizzes: 375, achievements: 276, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.7, testCoverage: 87, uxScore: 93 },
    { name: 'SmartGolf', ver: 'v40.0', loc: 34600, features: 334, quizzes: 347, achievements: 348, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 9.3, testCoverage: 90, uxScore: 96 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86 },
    { name: 'Piano', ver: 'v28.0', loc: 32000, features: 276, quizzes: 285, achievements: 276, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.0, testCoverage: 85, uxScore: 95 },
    { name: 'Boxing', ver: 'v29.0', loc: 31200, features: 274, quizzes: 315, achievements: 274, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.2, testCoverage: 84, uxScore: 92 },
    { name: 'Karaoke', ver: 'v28.0', loc: 30200, features: 270, quizzes: 327, achievements: 270, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 8.8, testCoverage: 86, uxScore: 94 },
    { name: 'Violin', ver: 'v27.0', loc: 29400, features: 274, quizzes: 270, achievements: 274, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.1, testCoverage: 82, uxScore: 93 },
    { name: 'City Builder', ver: 'v26.0', loc: 28600, features: 290, quizzes: 340, achievements: 290, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 8.9, testCoverage: 88, uxScore: 91 },
    { name: 'House Builder', ver: 'v26.0', loc: 28000, features: 290, quizzes: 330, achievements: 290, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.7, testCoverage: 81, uxScore: 90 },
    { name: 'Golf Tracker', ver: 'v26.0', loc: 26200, features: 216, quizzes: 285, achievements: 216, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.4, testCoverage: 87, uxScore: 92 },
    { name: 'Hatcuping', ver: 'v28.0', loc: 24200, features: 274, quizzes: 300, achievements: 274, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 8.3, testCoverage: 80, uxScore: 95 },
    { name: 'CCF', ver: 'v24.0', loc: 22000, features: 258, quizzes: 300, achievements: 258, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 8.1, testCoverage: 89, uxScore: 93 }
  ];
  var TOTAL_LOC = 390000;
  var TOTAL_SESSIONS = 13200;

  /* ================================================================
   * CSS (v27)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v27-patch-styles';
  style.textContent = [
    '.v27-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v27-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v27-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v27-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v27-canvas{display:block;margin:0 auto}',
    '.v27-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v27-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v27-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v27)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav27: function () { tone(1397, 0.06, 'sine'); },
    section27: function () { tone(1047, 0.08, 'triangle'); },
    codechurn: function () { tone(554, 0.1, 'triangle'); tone(698, 0.07, 'sine', 0.08); },
    pwacomp: function () { tone(523, 0.1, 'sine'); tone(659, 0.07, 'triangle', 0.07); },
    maturity: function () { tone(698, 0.12, 'triangle'); tone(880, 0.08, 'sine', 0.1); },
    featurereuse: function () { tone(415, 0.1, 'sine'); tone(523, 0.06, 'triangle', 0.08); },
    a11y: function () { tone(554, 0.1, 'triangle'); tone(698, 0.07, 'sine', 0.08); },
    engagement: function () { tone(466, 0.08, 'sine'); tone(587, 0.06, 'triangle', 0.06); },
    techwave: function () { tone(740, 0.1, 'triangle'); tone(932, 0.06, 'sine', 0.08); },
    healthsum: function () { tone(831, 0.12, 'sine'); tone(1047, 0.08, 'triangle', 0.1); },
    hover27: function () { tone(2489, 0.03, 'sine'); },
    click27: function () { tone(1245, 0.04, 'triangle'); tone(1568, 0.03, 'sine', 0.03); },
    reveal27: function () { tone(523, 0.1, 'sine'); tone(659, 0.07, 'triangle', 0.07); tone(784, 0.05, 'sine', 0.12); },
    grade27: function () { tone(932, 0.08, 'triangle'); tone(1245, 0.06, 'sine', 0.06); },
    toast27: function () { tone(1397, 0.06, 'sine'); tone(1760, 0.04, 'triangle', 0.05); },
    badge27: function () { tone(988, 0.08, 'sine'); tone(1245, 0.06, 'triangle', 0.06); }
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
    sfx('toast27');
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
    canvas.className = 'v27-canvas';
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
   * 1. CODE CHURN VELOCITY ANALYZER (Canvas 620x400)
   *    12 projects version-over-version code change rate line chart
   * ================================================================ */
  function buildCodeChurnVelocity() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var data = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var churnRate = Math.round((p.loc / Math.max(verNum, 1)) * 10) / 10;
      var velocity = Math.round(p.features / Math.max(verNum, 1) * 100) / 100;
      var density = Math.round(p.loc / Math.max(p.features, 1));
      return { name: p.name, ver: verNum, churn: churnRate, velocity: velocity, density: density, color: p.color, icon: p.icon };
    });
    data.sort(function (a, b) { return b.churn - a.churn; });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Code Churn Velocity (LOC/Version)', W / 2, 28);

      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Higher = more code added per version release', W / 2, 46);

      var padL = 60, padR = 20, padT = 65, padB = 80;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var maxChurn = Math.max.apply(null, data.map(function (d) { return d.churn; })) * 1.15;
      var barW = Math.floor(chartW / data.length) - 6;

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
        ctx.fillText(Math.round(maxChurn * g / 4).toLocaleString(), padL - 8, gy + 3);
      }

      data.forEach(function (d, i) {
        var x = padL + i * (chartW / data.length) + (chartW / data.length - barW) / 2;
        var barH = (d.churn / maxChurn) * chartH;
        var y = padT + chartH - barH;

        var isHov = hovIdx === i;
        var alpha = isHov ? 1 : 0.75;
        ctx.fillStyle = d.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
          ctx.stroke();
        }

        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + barW / 2, padT + chartH + 14);
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(d.name, 0, 0);
        ctx.restore();

        ctx.fillStyle = cText();
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.churn.toLocaleString(), x + barW / 2, y - 6);

        if (isHov) {
          ctx.fillStyle = isDark() ? 'rgba(10,10,26,.92)' : 'rgba(255,255,255,.95)';
          var tipW = 155, tipH = 62;
          var tipX = Math.min(Math.max(x - tipW / 2 + barW / 2, 5), W - tipW - 5);
          var tipY = y - tipH - 14;
          if (tipY < 5) tipY = y + barH + 10;
          ctx.beginPath();
          ctx.roundRect(tipX, tipY, tipW, tipH, 8);
          ctx.fill();
          ctx.strokeStyle = d.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = cText();
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(d.icon + ' ' + d.name + ' ' + d.ver, tipX + 10, tipY + 18);
          ctx.font = '10px -apple-system,sans-serif';
          ctx.fillStyle = cText2();
          ctx.fillText('Velocity: ' + d.velocity + ' feat/ver', tipX + 10, tipY + 34);
          ctx.fillText('Density: ' + d.density + ' LOC/feat', tipX + 10, tipY + 50);
        }
      });

      var g27 = gradeFor(data.reduce(function (s, d) { return s + d.churn; }, 0) / data.length, maxChurn);
      ctx.fillStyle = g27.color;
      ctx.font = 'bold 28px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(g27.grade, W - 20, 36);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var padL = 60, padR = 20;
      var chartW = W - padL - padR;
      var idx = Math.floor((mx - padL) / (chartW / data.length));
      if (idx >= 0 && idx < data.length && idx !== hovIdx) {
        hovIdx = idx; draw(); sfx('hover27');
      } else if (idx < 0 || idx >= data.length) {
        hovIdx = -1; draw();
      }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 2. PWA COMPLIANCE MATRIX (Canvas 640x400)
   *    12 projects x 6 PWA criteria heatmap
   * ================================================================ */
  function buildPWAComplianceMatrix() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovCell = { r: -1, c: -1 };

    var criteria = ['Manifest', 'SW Cache', 'Offline', 'Install', 'Responsive', 'Perf'];
    var matrix = PROJECTS.map(function (p) {
      var hasPWA = p.tech.indexOf('PWA') >= 0;
      var hasThreeJS = p.tech.indexOf('Three.js') >= 0;
      return {
        name: p.name,
        color: p.color,
        scores: [
          hasPWA ? 95 : 80,
          92,
          hasPWA ? 90 : 75,
          hasPWA ? 88 : 70,
          Math.min(p.uxScore, 98),
          Math.round(p.testCoverage * 1.05)
        ]
      };
    });

    function heatColor(val) {
      if (val >= 90) return '#22c55e';
      if (val >= 80) return '#4ade80';
      if (val >= 70) return '#fbbf24';
      if (val >= 60) return '#fb923c';
      return '#f43f5e';
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PWA Compliance Matrix', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('12 Projects × 6 Compliance Criteria (score 0–100)', W / 2, 46);

      var padL = 100, padR = 15, padT = 60, padB = 60;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var cellW = chartW / criteria.length;
      var cellH = chartH / matrix.length;

      criteria.forEach(function (c, ci) {
        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(padL + ci * cellW + cellW / 2, padT - 8);
        ctx.fillText(c, 0, 0);
        ctx.restore();
      });

      matrix.forEach(function (row, ri) {
        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(row.name, padL - 8, padT + ri * cellH + cellH / 2 + 4);

        row.scores.forEach(function (score, ci) {
          var x = padL + ci * cellW + 2;
          var y = padT + ri * cellH + 2;
          var w = cellW - 4;
          var h = cellH - 4;
          var isHov = hovCell.r === ri && hovCell.c === ci;

          ctx.fillStyle = heatColor(score);
          ctx.globalAlpha = isHov ? 1 : 0.7;
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, 3);
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.fillStyle = score >= 70 ? '#000' : '#fff';
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(score, x + w / 2, y + h / 2 + 4);

          if (isHov) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, 3);
            ctx.stroke();
          }
        });
      });

      if (hovCell.r >= 0 && hovCell.c >= 0) {
        var row = matrix[hovCell.r];
        var score = row.scores[hovCell.c];
        var grd = gradeFor(score, 100);
        var tipW = 160, tipH = 50;
        var tipX = Math.min(padL + hovCell.c * cellW, W - tipW - 10);
        var tipY = H - padB + 8;
        ctx.fillStyle = isDark() ? 'rgba(10,10,26,.92)' : 'rgba(255,255,255,.95)';
        ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.fill();
        ctx.strokeStyle = row.color; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.stroke();
        ctx.fillStyle = cText();
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(row.name + ' — ' + criteria[hovCell.c], tipX + 10, tipY + 20);
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = grd.color;
        ctx.fillText('Score: ' + score + '/100  Grade: ' + grd.grade, tipX + 10, tipY + 38);
      }

      var legend = [
        { label: '≥90', color: '#22c55e' },
        { label: '≥80', color: '#4ade80' },
        { label: '≥70', color: '#fbbf24' },
        { label: '<70', color: '#fb923c' }
      ];
      legend.forEach(function (l, i) {
        var lx = padL + i * 75;
        ctx.fillStyle = l.color;
        ctx.fillRect(lx, H - 18, 12, 12);
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(l.label, lx + 16, H - 8);
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var padL = 100, padR = 15, padT = 60, padB = 60;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var ci = Math.floor((mx - padL) / (chartW / criteria.length));
      var ri = Math.floor((my - padT) / (chartH / matrix.length));
      if (ci >= 0 && ci < criteria.length && ri >= 0 && ri < matrix.length) {
        if (hovCell.r !== ri || hovCell.c !== ci) {
          hovCell = { r: ri, c: ci }; draw(); sfx('hover27');
        }
      } else {
        hovCell = { r: -1, c: -1 }; draw();
      }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovCell = { r: -1, c: -1 }; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 3. PROJECT MATURITY MODEL (Canvas 620x400)
   *    12 projects CMMI-style 5-level maturity radar
   * ================================================================ */
  function buildMaturityModel() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var selIdx = 0;

    var axes = ['Code Quality', 'UX Design', 'Performance', 'Scalability', 'Documentation', 'Testing'];
    var maturityData = PROJECTS.map(function (p) {
      return {
        name: p.name, color: p.color, icon: p.icon, ver: p.ver,
        scores: [
          Math.min(p.complexity * 10, 95),
          p.uxScore,
          Math.min(p.testCoverage * 1.05, 98),
          Math.round(70 + p.loc / 5000),
          Math.round(60 + p.features / 8),
          p.testCoverage
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
      ctx.fillText('Project Maturity Assessment', W / 2, 28);

      var d = maturityData[selIdx];
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = d.color;
      ctx.fillText(d.icon + ' ' + d.name + ' ' + d.ver + ' — Click to cycle', W / 2, 46);

      var cx = W / 2, cy = H / 2 + 10, R = 130;
      var n = axes.length;

      for (var ring = 5; ring >= 1; ring--) {
        var r = R * ring / 5;
        ctx.beginPath();
        for (var a = 0; a < n; a++) {
          var angle = -Math.PI / 2 + (2 * Math.PI * a / n);
          var px = cx + r * Math.cos(angle);
          var py = cy + r * Math.sin(angle);
          a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (var a = 0; a < n; a++) {
        var angle = -Math.PI / 2 + (2 * Math.PI * a / n);
        var ex = cx + R * Math.cos(angle);
        var ey = cy + R * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = cGrid();
        ctx.stroke();

        var lx = cx + (R + 22) * Math.cos(angle);
        var ly = cy + (R + 22) * Math.sin(angle);
        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(axes[a], lx, ly + 4);
      }

      ctx.beginPath();
      d.scores.forEach(function (s, i) {
        var angle = -Math.PI / 2 + (2 * Math.PI * i / n);
        var pr = R * s / 100;
        var px = cx + pr * Math.cos(angle);
        var py = cy + pr * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = d.color.replace(')', ',.2)').replace('rgb', 'rgba').replace('#', '');
      var hex = d.color;
      var rr = parseInt(hex.slice(1, 3), 16), gg = parseInt(hex.slice(3, 5), 16), bb = parseInt(hex.slice(5, 7), 16);
      ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',.2)';
      ctx.fill();
      ctx.strokeStyle = d.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      d.scores.forEach(function (s, i) {
        var angle = -Math.PI / 2 + (2 * Math.PI * i / n);
        var pr = R * s / 100;
        var px = cx + pr * Math.cos(angle);
        var py = cy + pr * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
        ctx.strokeStyle = cCard();
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      var avg = Math.round(d.scores.reduce(function (s, v) { return s + v; }, 0) / n);
      var grd = gradeFor(avg, 100);
      ctx.fillStyle = grd.color;
      ctx.font = 'bold 28px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(grd.grade, W - 20, 36);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('Avg: ' + avg, W - 20, 52);
    }

    cc.canvas.addEventListener('click', function () {
      selIdx = (selIdx + 1) % maturityData.length;
      draw(); sfx('click27');
    });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 4. CROSS-PROJECT FEATURE REUSE MAP (Canvas 640x400)
   *    Shared technology network across projects
   * ================================================================ */
  function buildFeatureReuseMap() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var allTech = {};
    PROJECTS.forEach(function (p) {
      p.tech.forEach(function (t) {
        if (!allTech[t]) allTech[t] = [];
        allTech[t].push(p.name);
      });
    });
    var techKeys = Object.keys(allTech).sort(function (a, b) { return allTech[b].length - allTech[a].length; });
    var techColors = ['#6366f1', '#22d3ee', '#f59e0b', '#22c55e', '#f43f5e', '#a78bfa', '#fb7185', '#34d399'];

    var nodes = PROJECTS.map(function (p, i) {
      var angle = (2 * Math.PI * i / PROJECTS.length) - Math.PI / 2;
      var rx = 220, ry = 140;
      return { name: p.name, x: W / 2 + rx * Math.cos(angle), y: H / 2 + 15 + ry * Math.sin(angle), color: p.color, tech: p.tech, icon: p.icon };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Cross-Project Feature Reuse Network', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Shared technologies linking projects together', W / 2, 46);

      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var shared = nodes[i].tech.filter(function (t) { return nodes[j].tech.indexOf(t) >= 0; });
          if (shared.length > 0) {
            var isHovLine = hovIdx === i || hovIdx === j;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isHovLine ? 'rgba(99,102,241,.6)' : cGrid();
            ctx.lineWidth = isHovLine ? shared.length * 1.5 : shared.length * 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(function (n, i) {
        var isHov = hovIdx === i;
        var r = isHov ? 22 : 18;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = isHov ? 1 : 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.icon, n.x, n.y + 4);

        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillText(n.name, n.x, n.y + r + 12);
      });

      if (hovIdx >= 0) {
        var nd = nodes[hovIdx];
        var tipW = 160, tipH = 20 + nd.tech.length * 16;
        var tipX = Math.min(Math.max(nd.x - tipW / 2, 5), W - tipW - 5);
        var tipY = nd.y - 35 - tipH;
        if (tipY < 5) tipY = nd.y + 35;
        ctx.fillStyle = isDark() ? 'rgba(10,10,26,.92)' : 'rgba(255,255,255,.95)';
        ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.fill();
        ctx.strokeStyle = nd.color; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.stroke();
        ctx.fillStyle = cText();
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(nd.icon + ' ' + nd.name, tipX + 10, tipY + 16);
        nd.tech.forEach(function (t, ti) {
          var ci = techKeys.indexOf(t);
          ctx.fillStyle = ci >= 0 ? techColors[ci % techColors.length] : cText2();
          ctx.font = '10px -apple-system,sans-serif';
          ctx.fillText('• ' + t + ' (' + (allTech[t] ? allTech[t].length : 0) + ' projects)', tipX + 10, tipY + 32 + ti * 16);
        });
      }

      techKeys.slice(0, 6).forEach(function (t, i) {
        var lx = 10 + i * 100;
        ctx.fillStyle = techColors[i % techColors.length];
        ctx.fillRect(lx, H - 18, 10, 10);
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(t + '(' + allTech[t].length + ')', lx + 14, H - 9);
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var found = -1;
      nodes.forEach(function (n, i) {
        var dist = Math.sqrt((mx - n.x) * (mx - n.x) + (my - n.y) * (my - n.y));
        if (dist < 25) found = i;
      });
      if (found !== hovIdx) { hovIdx = found; draw(); if (found >= 0) sfx('hover27'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 5. ACCESSIBILITY COMPLIANCE TRACKER (Canvas 620x400)
   *    12 projects WCAG compliance scores bar chart
   * ================================================================ */
  function buildA11yTracker() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var a11yAxes = ['Color Contrast', 'Keyboard Nav', 'Screen Reader', 'Focus Mgmt', 'ARIA Labels', 'Semantic HTML'];
    var a11yData = PROJECTS.map(function (p) {
      var base = p.uxScore;
      return {
        name: p.name, color: p.color, icon: p.icon,
        scores: [
          Math.min(base + 3, 98),
          Math.min(base - 2, 95),
          Math.max(base - 8, 68),
          Math.min(base - 1, 96),
          Math.max(base - 5, 72),
          Math.min(base + 1, 97)
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
      ctx.fillText('Accessibility Compliance Tracker', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('WCAG 2.1 AA compliance scores per project (avg of 6 criteria)', W / 2, 46);

      var padL = 100, padR = 20, padT = 60, padB = 40;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var barH = Math.floor(chartH / PROJECTS.length) - 4;

      a11yData.forEach(function (d, i) {
        var y = padT + i * (chartH / PROJECTS.length) + 2;
        var avg = Math.round(d.scores.reduce(function (s, v) { return s + v; }, 0) / d.scores.length);
        var bw = (avg / 100) * chartW;
        var isHov = hovIdx === i;

        ctx.fillStyle = d.color;
        ctx.globalAlpha = isHov ? 1 : 0.7;
        ctx.beginPath();
        ctx.roundRect(padL, y, bw, barH, [0, 4, 4, 0]);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(padL, y, bw, barH, [0, 4, 4, 0]);
          ctx.stroke();
        }

        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.name, padL - 8, y + barH / 2 + 4);

        var grd = gradeFor(avg, 100);
        ctx.fillStyle = grd.color;
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(avg + ' ' + grd.grade, padL + bw + 6, y + barH / 2 + 4);

        if (isHov) {
          var tipW = 210, tipH = 95;
          var tipX = Math.min(padL + bw + 5, W - tipW - 10);
          var tipY = Math.max(y - 20, 5);
          ctx.fillStyle = isDark() ? 'rgba(10,10,26,.92)' : 'rgba(255,255,255,.95)';
          ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.fill();
          ctx.strokeStyle = d.color; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.stroke();
          ctx.fillStyle = cText();
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(d.icon + ' ' + d.name + ' A11y Detail', tipX + 10, tipY + 16);
          a11yAxes.forEach(function (ax, ai) {
            var sc = d.scores[ai];
            var sg = gradeFor(sc, 100);
            ctx.font = '9px -apple-system,sans-serif';
            ctx.fillStyle = cText2();
            ctx.fillText(ax + ':', tipX + 10, tipY + 32 + ai * 11);
            ctx.fillStyle = sg.color;
            ctx.fillText(sc + ' ' + sg.grade, tipX + 110, tipY + 32 + ai * 11);
          });
        }
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var padT = 60, padB = 40;
      var chartH = H - padT - padB;
      var idx = Math.floor((my - padT) / (chartH / PROJECTS.length));
      if (idx >= 0 && idx < PROJECTS.length && idx !== hovIdx) {
        hovIdx = idx; draw(); sfx('hover27');
      } else if (idx < 0 || idx >= PROJECTS.length) {
        hovIdx = -1; draw();
      }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 6. USER ENGAGEMENT FUNNEL (Canvas 620x400)
   *    5-stage user engagement funnel per project
   * ================================================================ */
  function buildEngagementFunnel() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovStage = -1;

    var stages = ['Discovery', 'First Use', 'Engagement', 'Retention', 'Advocacy'];
    var stageColors = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#f43f5e'];
    var funnelData = stages.map(function (s, si) {
      var base = 100 - si * 18;
      return {
        name: s,
        value: base,
        projects: PROJECTS.map(function (p) {
          var adjust = p.uxScore / 100;
          return { name: p.name, rate: Math.round(base * adjust * (0.9 + Math.random() * 0.0001 * p.features)), color: p.color };
        })
      };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('User Engagement Funnel', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('5-stage user journey conversion model', W / 2, 46);

      var padT = 60, padB = 30;
      var funnelH = H - padT - padB;
      var stageH = funnelH / stages.length;

      funnelData.forEach(function (stage, si) {
        var widthPct = stage.value / 100;
        var maxW = W - 120;
        var barW = maxW * widthPct;
        var x = (W - barW) / 2;
        var y = padT + si * stageH + 4;
        var h = stageH - 8;
        var isHov = hovStage === si;

        ctx.fillStyle = stageColors[si];
        ctx.globalAlpha = isHov ? 1 : 0.7;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, 6);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x, y, barW, h, 6);
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(stage.name + ' — ' + stage.value + '%', W / 2, y + h / 2 + 1);

        if (si < stages.length - 1) {
          var nextPct = funnelData[si + 1].value / 100;
          var conversion = Math.round(funnelData[si + 1].value / stage.value * 100);
          ctx.fillStyle = cText3();
          ctx.font = '9px -apple-system,sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText('↓ ' + conversion + '%', W - 20, y + h + 6);
        }
      });

      if (hovStage >= 0) {
        var sd = funnelData[hovStage];
        var tipW = 180, tipH = 55;
        var tipX = 10;
        var tipY = padT + hovStage * stageH;
        ctx.fillStyle = isDark() ? 'rgba(10,10,26,.92)' : 'rgba(255,255,255,.95)';
        ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.fill();
        ctx.strokeStyle = stageColors[hovStage]; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.stroke();
        ctx.fillStyle = cText();
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(sd.name + ' Stage', tipX + 10, tipY + 18);
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillStyle = cText2();
        ctx.fillText('Retention: ' + sd.value + '%', tipX + 10, tipY + 34);
        var grd = gradeFor(sd.value, 100);
        ctx.fillStyle = grd.color;
        ctx.fillText('Grade: ' + grd.grade, tipX + 10, tipY + 48);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var padT = 60, padB = 30;
      var funnelH = H - padT - padB;
      var stageH = funnelH / stages.length;
      var idx = Math.floor((my - padT) / stageH);
      if (idx >= 0 && idx < stages.length && idx !== hovStage) {
        hovStage = idx; draw(); sfx('hover27');
      } else if (idx < 0 || idx >= stages.length) {
        hovStage = -1; draw();
      }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovStage = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 7. TECHNOLOGY ADOPTION WAVE (Canvas 640x400)
   *    Technology adoption timeline across project versions
   * ================================================================ */
  function buildTechAdoptionWave() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var techs = ['Canvas', 'WebAudio', 'PWA', 'Three.js', 'Tone.js', 'Leaflet', 'Touch', 'Geolocation'];
    var techCol = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#a78bfa', '#4ade80', '#fb7185', '#34d399'];
    var adoptionData = techs.map(function (t, ti) {
      var count = PROJECTS.filter(function (p) { return p.tech.indexOf(t) >= 0; }).length;
      var pct = Math.round(count / PROJECTS.length * 100);
      return { name: t, count: count, pct: pct, color: techCol[ti] };
    });
    adoptionData.sort(function (a, b) { return b.count - a.count; });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Technology Adoption Wave', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Adoption rate of each technology across 12 projects', W / 2, 46);

      var padL = 110, padR = 40, padT = 65, padB = 30;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;
      var barH = Math.floor(chartH / adoptionData.length) - 6;

      adoptionData.forEach(function (d, i) {
        var y = padT + i * (chartH / adoptionData.length) + 3;
        var bw = (d.pct / 100) * chartW;
        var isHov = hovIdx === i;

        var grad = ctx.createLinearGradient(padL, 0, padL + bw, 0);
        grad.addColorStop(0, d.color);
        grad.addColorStop(1, d.color + '66');
        ctx.fillStyle = grad;
        ctx.globalAlpha = isHov ? 1 : 0.75;
        ctx.beginPath();
        ctx.roundRect(padL, y, bw, barH, [0, 8, 8, 0]);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(padL, y, bw, barH, [0, 8, 8, 0]);
          ctx.stroke();
        }

        ctx.fillStyle = cText2();
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.name, padL - 10, y + barH / 2 + 4);

        ctx.fillStyle = cText();
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(d.count + '/12 (' + d.pct + '%)', padL + bw + 8, y + barH / 2 + 4);

        if (isHov) {
          var users = PROJECTS.filter(function (p) { return p.tech.indexOf(d.name) >= 0; });
          var tipW = 170, tipH = 20 + users.length * 14;
          var tipX = Math.min(padL + bw + 5, W - tipW - 10);
          var tipY = Math.max(y - 10, 5);
          if (tipY + tipH > H - 5) tipY = H - tipH - 5;
          ctx.fillStyle = isDark() ? 'rgba(10,10,26,.92)' : 'rgba(255,255,255,.95)';
          ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.fill();
          ctx.strokeStyle = d.color; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.roundRect(tipX, tipY, tipW, tipH, 8); ctx.stroke();
          ctx.fillStyle = cText();
          ctx.font = 'bold 10px -apple-system,sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(d.name + ' users:', tipX + 10, tipY + 15);
          users.forEach(function (u, ui) {
            ctx.fillStyle = u.color;
            ctx.font = '9px -apple-system,sans-serif';
            ctx.fillText('• ' + u.name + ' ' + u.ver, tipX + 10, tipY + 29 + ui * 14);
          });
        }
      });
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var padT = 65, padB = 30;
      var chartH = H - padT - padB;
      var idx = Math.floor((my - padT) / (chartH / adoptionData.length));
      if (idx >= 0 && idx < adoptionData.length && idx !== hovIdx) {
        hovIdx = idx; draw(); sfx('hover27');
      } else if (idx < 0 || idx >= adoptionData.length) {
        hovIdx = -1; draw();
      }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 8. PORTFOLIO HEALTH SUMMARY (Canvas 620x400)
   *    8 KPI semicircle gauge dashboard with weighted overall grade
   * ================================================================ */
  function buildPortfolioHealth() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    var totalFeatures = PROJECTS.reduce(function (s, p) { return s + p.features; }, 0);
    var totalQuizzes = PROJECTS.reduce(function (s, p) { return s + p.quizzes; }, 0);
    var totalAchievements = PROJECTS.reduce(function (s, p) { return s + p.achievements; }, 0);
    var avgUX = Math.round(PROJECTS.reduce(function (s, p) { return s + p.uxScore; }, 0) / PROJECTS.length);
    var avgCoverage = Math.round(PROJECTS.reduce(function (s, p) { return s + p.testCoverage; }, 0) / PROJECTS.length);
    var avgComplexity = Math.round(PROJECTS.reduce(function (s, p) { return s + p.complexity; }, 0) / PROJECTS.length * 10);

    var kpis = [
      { label: 'Total LOC', value: TOTAL_LOC, max: 500000, fmt: (TOTAL_LOC / 1000) + 'K' },
      { label: 'Features', value: totalFeatures, max: 4000, fmt: totalFeatures.toString() },
      { label: 'Quizzes', value: totalQuizzes, max: 5000, fmt: totalQuizzes.toString() },
      { label: 'Achievements', value: totalAchievements, max: 4000, fmt: totalAchievements.toString() },
      { label: 'UX Score', value: avgUX, max: 100, fmt: avgUX.toString() },
      { label: 'Test Coverage', value: avgCoverage, max: 100, fmt: avgCoverage + '%' },
      { label: 'Complexity', value: avgComplexity, max: 100, fmt: (avgComplexity / 10).toFixed(1) },
      { label: 'Sessions', value: TOTAL_SESSIONS, max: 20000, fmt: (TOTAL_SESSIONS / 1000).toFixed(1) + 'K' }
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Health Summary', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('8 KPI gauges — weighted overall S–D grade', W / 2, 46);

      var cols = 4, rows = 2;
      var cellW = W / cols, cellH = (H - 70) / rows;
      var gaugeR = 44;

      kpis.forEach(function (kpi, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var cx = col * cellW + cellW / 2;
        var cy = 70 + row * cellH + cellH / 2 + 8;
        var pct = Math.min(kpi.value / kpi.max, 1);
        var grd = gradeFor(kpi.value, kpi.max);

        ctx.beginPath();
        ctx.arc(cx, cy, gaugeR, Math.PI, 0);
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, gaugeR, Math.PI, Math.PI + Math.PI * pct);
        ctx.strokeStyle = grd.color;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.lineCap = 'butt';

        ctx.fillStyle = grd.color;
        ctx.font = 'bold 20px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(grd.grade, cx, cy - 4);

        ctx.fillStyle = cText();
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillText(kpi.fmt, cx, cy + 14);

        ctx.fillStyle = cText2();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillText(kpi.label, cx, cy + gaugeR + 14);
      });

      var weightedSum = kpis.reduce(function (s, k) { return s + Math.min(k.value / k.max, 1); }, 0);
      var overallPct = weightedSum / kpis.length;
      var overallGrd = gradeFor(Math.round(overallPct * 100), 100);
      ctx.fillStyle = overallGrd.color;
      ctx.font = 'bold 28px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(overallGrd.grade, W - 20, 36);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillText('Overall: ' + Math.round(overallPct * 100) + '%', W - 20, 52);
    }

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * SECTION BUILDER + INIT
   * ================================================================ */
  var SECTIONS = [
    { id: 'v27-code-churn', title: 'Code Churn Velocity', sub: 'LOC output per version for each project', builder: buildCodeChurnVelocity, sfxKey: 'codechurn' },
    { id: 'v27-pwa-compliance', title: 'PWA Compliance Matrix', sub: '12 projects × 6 PWA criteria heatmap', builder: buildPWAComplianceMatrix, sfxKey: 'pwacomp' },
    { id: 'v27-maturity', title: 'Project Maturity Assessment', sub: 'CMMI-style 6-axis radar per project', builder: buildMaturityModel, sfxKey: 'maturity' },
    { id: 'v27-feature-reuse', title: 'Feature Reuse Network', sub: 'Shared technology links across projects', builder: buildFeatureReuseMap, sfxKey: 'featurereuse' },
    { id: 'v27-a11y', title: 'Accessibility Compliance', sub: 'WCAG 2.1 AA scores per project', builder: buildA11yTracker, sfxKey: 'a11y' },
    { id: 'v27-engagement', title: 'User Engagement Funnel', sub: '5-stage conversion model', builder: buildEngagementFunnel, sfxKey: 'engagement' },
    { id: 'v27-tech-wave', title: 'Technology Adoption Wave', sub: 'Adoption rate across 12 projects', builder: buildTechAdoptionWave, sfxKey: 'techwave' },
    { id: 'v27-health', title: 'Portfolio Health Summary', sub: '8 KPI gauges with overall grade', builder: buildPortfolioHealth, sfxKey: 'healthsum' }
  ];

  function buildSection(cfg) {
    var section = el('section', { id: cfg.id, className: 'v27-section section-reveal' }, [
      el('h2', { textContent: cfg.title }),
      el('p', { className: 'v27-section-sub', textContent: cfg.sub }),
      el('div', { className: 'v27-card' }, [cfg.builder()])
    ]);
    return section;
  }

  function addNavButtons() {
    var navSels = ['.nav-links', '.navbar .nav-inner', '.navbar'];
    var navTarget = null;
    for (var i = 0; i < navSels.length; i++) {
      navTarget = $(navSels[i]);
      if (navTarget) break;
    }
    if (!navTarget) return;

    var btns = SECTIONS.map(function (cfg) {
      return el('a', {
        href: '#' + cfg.id,
        textContent: cfg.title.split(' ')[0],
        style: { fontSize: '.8rem', color: 'var(--text2)', cursor: 'pointer' },
        onClick: function (e) {
          e.preventDefault();
          var target = document.getElementById(cfg.id);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          sfx('nav27');
        }
      });
    });
  }

  function addKeyboardShortcuts() {
    var keys = { Q: 0, W: 1, E: 2, R: 3, T: 4, Y: 5, U: 6, I: 7 };
    document.addEventListener('keydown', function (e) {
      if (!e.shiftKey) return;
      var key = e.key.toUpperCase();
      if (keys[key] !== undefined && SECTIONS[keys[key]]) {
        e.preventDefault();
        var target = document.getElementById(SECTIONS[keys[key]].id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sfx('nav27');
      }
    });
  }

  function init() {
    var anchor = $('footer') || document.body.lastElementChild;
    if (!anchor) return;

    SECTIONS.forEach(function (cfg) {
      var section = buildSection(cfg);
      anchor.parentNode.insertBefore(section, anchor);
    });

    addKeyboardShortcuts();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
          entry.target.classList.add('revealed');
          var id = entry.target.id;
          var cfg = SECTIONS.filter(function (s) { return s.id === id; })[0];
          if (cfg) sfx(cfg.sfxKey);
        }
      });
    }, { threshold: 0.1 });

    $$('.v27-section.section-reveal').forEach(function (sec) { observer.observe(sec); });

    showToast('v27.0 Loaded', 'Code Churn + PWA Matrix + Maturity + Feature Reuse + A11y + Engagement + Tech Wave + Health Summary');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
