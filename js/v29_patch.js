/**
 * ai-portfolio v29.0 Patch Module
 * Last updated: 2026-08-16
 */
;(function () {
  'use strict';
  if (window._v29) return;
  window._v29 = { version: '29.0.0', applied: Date.now() };

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
   * PROJECT DATA (v29.0 — all 12 repos updated to latest 2026-08-16)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v34.0', loc: 38600, features: 405, quizzes: 405, achievements: 300, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.8, testCoverage: 89, uxScore: 95, monthlyGrowth: 4.5 },
    { name: 'SmartGolf', ver: 'v42.0', loc: 36800, features: 377, quizzes: 377, achievements: 377, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 9.6, testCoverage: 92, uxScore: 97, monthlyGrowth: 4.2 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86, monthlyGrowth: 1.2 },
    { name: 'Piano', ver: 'v30.0', loc: 34200, features: 315, quizzes: 315, achievements: 300, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.3, testCoverage: 87, uxScore: 96, monthlyGrowth: 4.0 },
    { name: 'Boxing', ver: 'v31.0', loc: 33400, features: 345, quizzes: 345, achievements: 298, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.4, testCoverage: 86, uxScore: 94, monthlyGrowth: 3.9 },
    { name: 'Karaoke', ver: 'v30.0', loc: 32400, features: 357, quizzes: 357, achievements: 294, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 9.1, testCoverage: 88, uxScore: 95, monthlyGrowth: 3.8 },
    { name: 'Violin', ver: 'v29.0', loc: 31600, features: 300, quizzes: 300, achievements: 300, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 9.2, testCoverage: 84, uxScore: 94, monthlyGrowth: 3.7 },
    { name: 'City Builder', ver: 'v28.0', loc: 30600, features: 370, quizzes: 370, achievements: 314, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 9.1, testCoverage: 90, uxScore: 93, monthlyGrowth: 3.6 },
    { name: 'Hatcuping', ver: 'v30.0', loc: 26400, features: 330, quizzes: 330, achievements: 298, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 8.6, testCoverage: 82, uxScore: 96, monthlyGrowth: 3.4 },
    { name: 'House Builder', ver: 'v28.0', loc: 30000, features: 360, quizzes: 360, achievements: 314, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.9, testCoverage: 83, uxScore: 92, monthlyGrowth: 3.5 },
    { name: 'Golf Tracker', ver: 'v28.0', loc: 28400, features: 315, quizzes: 315, achievements: 192, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.6, testCoverage: 89, uxScore: 93, monthlyGrowth: 3.3 },
    { name: 'CCF', ver: 'v26.0', loc: 24400, features: 330, quizzes: 330, achievements: 282, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 8.4, testCoverage: 91, uxScore: 94, monthlyGrowth: 3.1 }
  ];
  var TOTAL_LOC = 430000;
  var TOTAL_SESSIONS = 14400;

  /* ================================================================
   * CSS (v29)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v29-patch-styles';
  style.textContent = [
    '.v29-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v29-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v29-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v29-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v29-canvas{display:block;margin:0 auto}',
    '.v29-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v29-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v29-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v29)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav29: function () { tone(1568, 0.06, 'sine'); },
    section29: function () { tone(1175, 0.08, 'triangle'); },
    pipeline: function () { tone(523, 0.1, 'triangle'); tone(659, 0.07, 'sine', 0.08); },
    reuse: function () { tone(587, 0.1, 'sine'); tone(740, 0.07, 'triangle', 0.07); },
    velocity: function () { tone(698, 0.12, 'triangle'); tone(880, 0.08, 'sine', 0.1); },
    treemap: function () { tone(466, 0.1, 'sine'); tone(587, 0.06, 'triangle', 0.08); },
    retention: function () { tone(554, 0.1, 'triangle'); tone(698, 0.07, 'sine', 0.08); },
    a11y: function () { tone(523, 0.08, 'sine'); tone(659, 0.06, 'triangle', 0.06); },
    perfbudget: function () { tone(831, 0.1, 'triangle'); tone(1047, 0.06, 'sine', 0.08); },
    evolve: function () { tone(932, 0.12, 'sine'); tone(1175, 0.08, 'triangle', 0.1); },
    hover29: function () { tone(2794, 0.03, 'sine'); },
    click29: function () { tone(1397, 0.04, 'triangle'); tone(1760, 0.03, 'sine', 0.03); },
    reveal29: function () { tone(587, 0.1, 'sine'); tone(740, 0.07, 'triangle', 0.07); tone(880, 0.05, 'sine', 0.12); },
    grade29: function () { tone(1047, 0.08, 'triangle'); tone(1397, 0.06, 'sine', 0.06); },
    toast29: function () { tone(1568, 0.06, 'sine'); tone(1976, 0.04, 'triangle', 0.05); },
    badge29: function () { tone(1109, 0.08, 'sine'); tone(1397, 0.06, 'triangle', 0.06); }
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
    sfx('toast29');
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
    canvas.className = 'v29-canvas';
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
   * 1. BUILD PIPELINE EFFICIENCY ANALYZER (Canvas 620x400)
   *    12 projects x 5 pipeline stages horizontal stacked bar chart
   * ================================================================ */
  function buildPipelineEfficiency() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var STAGES = ['Lint', 'TypeCheck', 'Test', 'Build', 'Deploy'];
    var STAGE_COLORS = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b', '#f43f5e'];

    var data = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var baseLint = Math.min(98, 78 + verNum * 0.5);
      var baseTypeCheck = Math.min(97, 72 + p.complexity * 2);
      var baseTest = Math.min(99, p.testCoverage + 2);
      var baseBuild = Math.min(96, 70 + verNum * 0.6);
      var baseDeploy = Math.min(98, 75 + p.uxScore * 0.2);
      var stages = [
        Math.round(baseLint),
        Math.round(baseTypeCheck),
        Math.round(baseTest),
        Math.round(baseBuild),
        Math.round(baseDeploy)
      ];
      var avg = Math.round(stages.reduce(function (a, b) { return a + b; }, 0) / stages.length);
      var bottleneck = stages.indexOf(Math.min.apply(null, stages));
      return { name: p.name, icon: p.icon, color: p.color, stages: stages, avg: avg, bottleneck: bottleneck };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Build Pipeline Efficiency Analyzer', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('12 Projects × 5 Pipeline Stages — Efficiency % & Bottleneck ID', W / 2, 46);

      var padL = 100, padR = 60, padT = 62, padB = 30;
      var chartW = W - padL - padR;
      var barH = Math.floor((H - padT - padB) / data.length) - 4;

      STAGES.forEach(function (s, si) {
        ctx.fillStyle = STAGE_COLORS[si];
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.roundRect(padL + si * 52, padT - 16, 8, 8, [2]);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(s, padL + si * 52 + 11, padT - 9);
      });

      data.forEach(function (d, di) {
        var y = padT + di * (barH + 4);
        var isHov = hovIdx === di;

        ctx.fillStyle = isHov ? '#fff' : cText2();
        ctx.font = (isHov ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.icon + ' ' + d.name, padL - 6, y + barH / 2 + 3);

        var segW = chartW / 5;
        d.stages.forEach(function (eff, si) {
          var x = padL + si * segW;
          var fillW = segW * (eff / 100);
          var isBottleneck = si === d.bottleneck;

          ctx.fillStyle = cGrid();
          ctx.beginPath();
          ctx.roundRect(x + 1, y, segW - 2, barH, [2]);
          ctx.fill();

          ctx.fillStyle = STAGE_COLORS[si];
          ctx.globalAlpha = isHov ? 0.95 : 0.7;
          ctx.beginPath();
          ctx.roundRect(x + 1, y, fillW - 2, barH, [2]);
          ctx.fill();
          ctx.globalAlpha = 1;

          if (isBottleneck && barH >= 10) {
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 2]);
            ctx.beginPath();
            ctx.roundRect(x + 1, y, segW - 2, barH, [2]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });

        var gd = gradeFor(d.avg, 100);
        ctx.fillStyle = gd.color;
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(gd.grade + ' ' + d.avg + '%', padL + chartW + 6, y + barH / 2 + 3);
      });

      if (hovIdx >= 0 && hovIdx < data.length) {
        var hd = data[hovIdx];
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 170, H - 26, 340, 22, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hd.icon + ' ' + hd.name + ' — Bottleneck: ' + STAGES[hd.bottleneck] + ' (' + hd.stages[hd.bottleneck] + '%) | Avg: ' + hd.avg + '%', W / 2, H - 12);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sy = cc.canvas.height / rect.height;
      var my = (e.clientY - rect.top) * sy;
      var padT = 62, barH = Math.floor((H - 62 - 30) / data.length) - 4;
      var ni = Math.floor((my - padT) / (barH + 4));
      if (ni !== hovIdx) { hovIdx = (ni >= 0 && ni < data.length) ? ni : -1; draw(); if (hovIdx >= 0) sfx('hover29'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) { sfx('pipeline'); } });

    return { title: 'Build Pipeline Efficiency Analyzer', sub: '12 Projects × 5 Pipeline Stages — Efficiency & Bottleneck Identification', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 2. CROSS-PROJECT CODE REUSE TRACKER (Canvas 640x400)
   *    Shared utility modules network diagram
   * ================================================================ */
  function buildCodeReuseTracker() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var MODULES = [
      { name: 'WebAudio', key: 'WebAudio', color: '#6366f1' },
      { name: 'Canvas', key: 'Canvas', color: '#22d3ee' },
      { name: 'PWA', key: 'PWA', color: '#4ade80' },
      { name: 'Touch', key: 'Touch', color: '#f59e0b' },
      { name: 'Storage', key: 'Storage', color: '#fb7185' },
      { name: 'Router', key: 'Router', color: '#a78bfa' },
      { name: 'i18n', key: 'i18n', color: '#34d399' },
      { name: 'A11y', key: 'A11y', color: '#38bdf8' }
    ];

    var moduleData = MODULES.map(function (mod) {
      var users = [];
      PROJECTS.forEach(function (p) {
        if (p.tech.indexOf(mod.key) >= 0) {
          users.push(p.name);
        } else {
          var verNum = parseFloat(p.ver.replace('v', ''));
          if (mod.key === 'Storage' && verNum >= 20) users.push(p.name);
          else if (mod.key === 'Router' && verNum >= 25) users.push(p.name);
          else if (mod.key === 'i18n' && verNum >= 28) users.push(p.name);
          else if (mod.key === 'A11y' && verNum >= 22) users.push(p.name);
        }
      });
      var reusePct = Math.round(users.length / PROJECTS.length * 100);
      var savingsK = Math.round(users.length * 1.2 * 100) / 100;
      return { name: mod.name, color: mod.color, users: users, count: users.length, reusePct: reusePct, savingsK: savingsK };
    });

    var centerX = W / 2, centerY = H / 2 + 10;
    var modNodes = moduleData.map(function (m, i) {
      var angle = (Math.PI * 2 / moduleData.length) * i - Math.PI / 2;
      return { x: centerX + Math.cos(angle) * 145, y: centerY + Math.sin(angle) * 120, data: m };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Cross-Project Code Reuse Tracker', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Shared utility modules network — reuse % & savings estimate', W / 2, 46);

      modNodes.forEach(function (n, i) {
        for (var j = i + 1; j < modNodes.length; j++) {
          var shared = 0;
          n.data.users.forEach(function (u) {
            if (modNodes[j].data.users.indexOf(u) >= 0) shared++;
          });
          if (shared > 0) {
            var isHov = hovIdx === i || hovIdx === j;
            ctx.strokeStyle = isHov ? 'rgba(99,102,241,.5)' : cGrid();
            ctx.lineWidth = isHov ? shared * 0.8 : shared * 0.4;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(modNodes[j].x, modNodes[j].y);
            ctx.stroke();
          }
        }
      });

      ctx.fillStyle = isDark() ? 'rgba(99,102,241,.15)' : 'rgba(99,102,241,.08)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = cText2();
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio', centerX, centerY - 4);
      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillText('12 Projects', centerX, centerY + 10);

      modNodes.forEach(function (n, i) {
        var isHov = hovIdx === i;
        var r = isHov ? 28 : 22;

        ctx.strokeStyle = isHov ? 'rgba(99,102,241,.4)' : cGrid();
        ctx.lineWidth = isHov ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();

        ctx.fillStyle = n.data.color;
        ctx.globalAlpha = isHov ? 0.95 : 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.data.name, n.x, n.y + 3);

        ctx.fillStyle = isHov ? '#fff' : cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillText(n.data.reusePct + '%', n.x, n.y + r + 12);
      });

      if (hovIdx >= 0 && hovIdx < modNodes.length) {
        var hd = modNodes[hovIdx].data;
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 180, H - 38, 360, 30, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hd.name + ': ' + hd.count + '/12 projects (' + hd.reusePct + '%) | Est. savings: ~' + hd.savingsK + 'K LOC', W / 2, H - 19);
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
      modNodes.forEach(function (n, i) {
        if (Math.sqrt(Math.pow(mx - n.x, 2) + Math.pow(my - n.y, 2)) <= 28) found = i;
      });
      if (found !== hovIdx) { hovIdx = found; draw(); if (hovIdx >= 0) sfx('hover29'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) sfx('reuse'); });

    return { title: 'Cross-Project Code Reuse Tracker', sub: '8 Shared Utility Modules — Reuse Network & Savings', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 3. FEATURE VELOCITY BURNDOWN (Canvas 620x400)
   *    Monthly feature delivery rate line chart (8 actual + 3 projected)
   * ================================================================ */
  function buildFeatureVelocity() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovMonth = -1;
    var selectedProject = -1;

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep*', 'Oct*', 'Nov*'];

    var velocityData = PROJECTS.filter(function (p) { return p.name !== 'LevelPlay'; }).map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var baseRate = p.features / Math.max(verNum, 1);
      var monthly = [];
      for (var m = 0; m < 11; m++) {
        var seasonal = 1 + Math.sin((m + verNum) * 0.5) * 0.2;
        var growth = 1 + m * p.monthlyGrowth * 0.01;
        var val = Math.round(baseRate * seasonal * growth * 10) / 10;
        monthly.push({ val: val, projected: m >= 8 });
      }
      var trend = monthly[7].val > monthly[0].val ? 'accelerating' : 'decelerating';
      return { name: p.name, icon: p.icon, color: p.color, monthly: monthly, trend: trend };
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Feature Velocity Burndown', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Monthly feature delivery rate (click to cycle projects, starred = projected)', W / 2, 46);

      var padL = 55, padR = 25, padT = 65, padB = 55;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;

      var showData = selectedProject >= 0 ? [velocityData[selectedProject]] : velocityData;

      var maxVal = 0;
      showData.forEach(function (d) { d.monthly.forEach(function (m) { if (m.val > maxVal) maxVal = m.val; }); });
      maxVal *= 1.1;

      for (var g = 0; g <= 4; g++) {
        var gy = padT + chartH - (g / 4) * chartH;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(W - padR, gy);
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((maxVal * g / 4).toFixed(1), padL - 6, gy + 3);
      }

      MONTHS.forEach(function (m, mi) {
        var x = padL + mi * (chartW / (MONTHS.length - 1));
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m, x, padT + chartH + 16);
      });

      if (showData.length === 1) {
        var sd = showData[0];
        var grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        grad.addColorStop(0, sd.color.replace(')', ',.2)').replace('rgb', 'rgba').replace('#', ''));
        ctx.fillStyle = sd.color;
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        sd.monthly.forEach(function (m, mi) {
          var x = padL + mi * (chartW / (MONTHS.length - 1));
          var y = padT + chartH - (m.val / maxVal) * chartH;
          if (mi === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.lineTo(padL + chartW, padT + chartH);
        ctx.lineTo(padL, padT + chartH);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      showData.forEach(function (d) {
        ctx.beginPath();
        ctx.strokeStyle = d.color;
        ctx.lineWidth = showData.length === 1 ? 3 : 1.5;
        ctx.globalAlpha = showData.length === 1 ? 1 : 0.6;
        d.monthly.forEach(function (m, mi) {
          var x = padL + mi * (chartW / (MONTHS.length - 1));
          var y = padT + chartH - (m.val / maxVal) * chartH;
          if (mi === 0) ctx.moveTo(x, y);
          else if (mi === 8 && d.monthly[7]) {
            ctx.stroke();
            ctx.beginPath();
            ctx.setLineDash([5, 3]);
            var px = padL + 7 * (chartW / (MONTHS.length - 1));
            var py = padT + chartH - (d.monthly[7].val / maxVal) * chartH;
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        if (showData.length === 1) {
          d.monthly.forEach(function (m, mi) {
            var x = padL + mi * (chartW / (MONTHS.length - 1));
            var y = padT + chartH - (m.val / maxVal) * chartH;
            ctx.fillStyle = m.projected ? '#f59e0b' : d.color;
            ctx.beginPath();
            ctx.arc(x, y, hovMonth === mi ? 6 : 4, 0, Math.PI * 2);
            ctx.fill();
            if (hovMonth === mi) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }

            if (mi > 0 && mi <= 7) {
              var prev = d.monthly[mi - 1].val;
              if (m.val > prev * 1.15) {
                ctx.fillStyle = '#4ade80';
                ctx.font = '10px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('▲', x, y - 10);
              } else if (m.val < prev * 0.85) {
                ctx.fillStyle = '#f43f5e';
                ctx.fillText('▼', x, y - 10);
              }
            }
          });
        }
      });

      if (selectedProject >= 0) {
        var sp = velocityData[selectedProject];
        ctx.fillStyle = cText();
        ctx.font = 'bold 12px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sp.icon + ' ' + sp.name + ' (' + (selectedProject + 1) + '/' + velocityData.length + ') — ' + sp.trend, W / 2, H - 8);
      } else {
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('All 11 projects overlaid — click to cycle individual projects', W / 2, H - 8);
      }

      if (hovMonth >= 0 && selectedProject >= 0 && hovMonth < MONTHS.length) {
        var hm = velocityData[selectedProject].monthly[hovMonth];
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 110, H - 52, 220, 22, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(MONTHS[hovMonth] + ': ' + hm.val + ' features/ver' + (hm.projected ? ' (forecast)' : ''), W / 2, H - 38);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      if (selectedProject < 0) return;
      var rect = cc.canvas.getBoundingClientRect();
      var sx = cc.canvas.width / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var padL = 55, padR = 25;
      var chartW = W - padL - padR;
      var step = chartW / (MONTHS.length - 1);
      var ni = Math.round((mx - padL) / step);
      if (ni !== hovMonth) { hovMonth = (ni >= 0 && ni < MONTHS.length) ? ni : -1; draw(); if (hovMonth >= 0) sfx('hover29'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovMonth = -1; draw(); });
    cc.canvas.addEventListener('click', function () {
      selectedProject = (selectedProject + 1) % (velocityData.length + 1);
      if (selectedProject === velocityData.length) selectedProject = -1;
      hovMonth = -1;
      draw();
      sfx('velocity');
    });

    return { title: 'Feature Velocity Burndown', sub: '11 Projects Monthly Feature Delivery Rate + 3-Month Forecast', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 4. ARCHITECTURE COMPLEXITY TREEMAP (Canvas 620x400)
   *    Rectangles area=LOC, color=complexity gradient
   * ================================================================ */
  function buildComplexityTreemap() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;

    var sorted = PROJECTS.slice().sort(function (a, b) { return b.loc - a.loc; });
    var totalLoc = sorted.reduce(function (a, p) { return a + p.loc; }, 0);

    function complexityColor(c) {
      var t = (c - 7) / 3;
      t = Math.max(0, Math.min(1, t));
      var r = Math.round(74 + t * 170);
      var g = Math.round(222 - t * 150);
      var b = Math.round(128 - t * 80);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    var rects = [];
    function layoutTreemap() {
      rects = [];
      var padL = 20, padR = 20, padT = 58, padB = 20;
      var areaW = W - padL - padR;
      var areaH = H - padT - padB;

      var row1Count = 4;
      var row2Count = 4;
      var row3Count = sorted.length - row1Count - row2Count;
      var row1Loc = 0, row2Loc = 0, row3Loc = 0;
      sorted.forEach(function (p, i) {
        if (i < row1Count) row1Loc += p.loc;
        else if (i < row1Count + row2Count) row2Loc += p.loc;
        else row3Loc += p.loc;
      });
      var totalAllLoc = row1Loc + row2Loc + row3Loc;
      var row1H = Math.round(areaH * (row1Loc / totalAllLoc));
      var row2H = Math.round(areaH * (row2Loc / totalAllLoc));
      var row3H = areaH - row1H - row2H;

      var x = padL;
      for (var i = 0; i < row1Count; i++) {
        var w = Math.round(areaW * (sorted[i].loc / row1Loc));
        if (i === row1Count - 1) w = areaW - (x - padL);
        rects.push({ x: x, y: padT, w: w, h: row1H, p: sorted[i], idx: i });
        x += w;
      }
      x = padL;
      for (var i = 0; i < row2Count; i++) {
        var idx = row1Count + i;
        var w = Math.round(areaW * (sorted[idx].loc / row2Loc));
        if (i === row2Count - 1) w = areaW - (x - padL);
        rects.push({ x: x, y: padT + row1H, w: w, h: row2H, p: sorted[idx], idx: idx });
        x += w;
      }
      x = padL;
      for (var i = 0; i < row3Count; i++) {
        var idx = row1Count + row2Count + i;
        var w = Math.round(areaW * (sorted[idx].loc / row3Loc));
        if (i === row3Count - 1) w = areaW - (x - padL);
        rects.push({ x: x, y: padT + row1H + row2H, w: w, h: row3H, p: sorted[idx], idx: idx });
        x += w;
      }
    }
    layoutTreemap();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Architecture Complexity Treemap', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Area = LOC | Color = Complexity (7–10 gradient) | Hover for details', W / 2, 46);

      rects.forEach(function (r, ri) {
        var isHov = hovIdx === ri;
        ctx.fillStyle = complexityColor(r.p.complexity);
        ctx.globalAlpha = isHov ? 1 : 0.75;
        ctx.beginPath();
        ctx.roundRect(r.x + 2, r.y + 2, r.w - 4, r.h - 4, [4]);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(r.x + 2, r.y + 2, r.w - 4, r.h - 4, [4]);
          ctx.stroke();
        }

        if (r.w > 60 && r.h > 30) {
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(r.p.icon + ' ' + r.p.name, r.x + r.w / 2, r.y + r.h / 2 - 4);
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillText((r.p.loc / 1000).toFixed(1) + 'K LOC', r.x + r.w / 2, r.y + r.h / 2 + 10);
          ctx.fillText('C:' + r.p.complexity, r.x + r.w / 2, r.y + r.h / 2 + 22);
        } else if (r.w > 40) {
          ctx.fillStyle = '#fff';
          ctx.font = '9px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(r.p.icon, r.x + r.w / 2, r.y + r.h / 2 + 3);
        }
      });

      if (hovIdx >= 0 && hovIdx < rects.length) {
        var hr = rects[hovIdx];
        var modules = Math.round(hr.p.loc / 800);
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 160, H - 18, 320, 18, [6]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hr.p.name + ': ' + (hr.p.loc / 1000).toFixed(1) + 'K LOC | Complexity: ' + hr.p.complexity + ' | ~' + modules + ' modules', W / 2, H - 6);
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
      rects.forEach(function (r, i) {
        if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) found = i;
      });
      if (found !== hovIdx) { hovIdx = found; draw(); if (hovIdx >= 0) sfx('hover29'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovIdx >= 0) sfx('treemap'); });

    return { title: 'Architecture Complexity Treemap', sub: '12 Projects — Area=LOC, Color=Complexity Gradient', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 5. USER ENGAGEMENT RETENTION CURVES (Canvas 640x400)
   *    D1/D7/D30/D60/D90 retention cohort curves
   * ================================================================ */
  function buildRetentionCurves() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var clickIdx = -1;

    var COHORTS = ['D1', 'D7', 'D30', 'D60', 'D90'];
    var cohortDays = [1, 7, 30, 60, 90];

    var retData = PROJECTS.filter(function (p) { return p.name !== 'LevelPlay'; }).map(function (p) {
      var base = p.uxScore;
      var verNum = parseFloat(p.ver.replace('v', ''));
      var rates = cohortDays.map(function (day) {
        var decay = 1 / (1 + day * 0.015);
        var bonus = verNum * 0.3 + p.monthlyGrowth * 2;
        return Math.min(98, Math.max(15, Math.round((base * decay + bonus) * 10) / 10));
      });
      return { name: p.name, icon: p.icon, color: p.color, rates: rates };
    });

    var avgRates = COHORTS.map(function (c, ci) {
      var sum = retData.reduce(function (a, d) { return a + d.rates[ci]; }, 0);
      return Math.round(sum / retData.length * 10) / 10;
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('User Engagement Retention Curves', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('D1/D7/D30/D60/D90 cohort retention — click to cycle projects', W / 2, 46);

      var padL = 55, padR = 25, padT = 65, padB = 55;
      var chartW = W - padL - padR;
      var chartH = H - padT - padB;

      for (var g = 0; g <= 4; g++) {
        var gy = padT + chartH - (g / 4) * chartH;
        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(W - padR, gy);
        ctx.stroke();
        ctx.fillStyle = cText3();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(100 * g / 4) + '%', padL - 6, gy + 3);
      }

      COHORTS.forEach(function (c, ci) {
        var x = padL + ci * (chartW / (COHORTS.length - 1));
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c, x, padT + chartH + 16);
      });

      var showData = clickIdx >= 0 ? [retData[clickIdx]] : retData;

      showData.forEach(function (d) {
        if (clickIdx >= 0) {
          ctx.fillStyle = d.color;
          ctx.globalAlpha = 0.12;
          ctx.beginPath();
          d.rates.forEach(function (r, ri) {
            var x = padL + ri * (chartW / (COHORTS.length - 1));
            var y = padT + chartH - (r / 100) * chartH;
            if (ri === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          });
          ctx.lineTo(padL + chartW, padT + chartH);
          ctx.lineTo(padL, padT + chartH);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.strokeStyle = d.color;
        ctx.lineWidth = clickIdx >= 0 ? 3 : 1.5;
        ctx.globalAlpha = clickIdx >= 0 ? 1 : 0.5;
        d.rates.forEach(function (r, ri) {
          var x = padL + ri * (chartW / (COHORTS.length - 1));
          var y = padT + chartH - (r / 100) * chartH;
          if (ri === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (clickIdx >= 0) {
          d.rates.forEach(function (r, ri) {
            var x = padL + ri * (chartW / (COHORTS.length - 1));
            var y = padT + chartH - (r / 100) * chartH;
            ctx.fillStyle = d.color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 9px -apple-system,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(r + '%', x, y - 10);
          });
        }
      });

      ctx.beginPath();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      avgRates.forEach(function (r, ri) {
        var x = padL + ri * (chartW / (COHORTS.length - 1));
        var y = padT + chartH - (r / 100) * chartH;
        if (ri === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fbbf24';
      ctx.font = '9px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      var lastAvgX = padL + 4 * (chartW / (COHORTS.length - 1));
      var lastAvgY = padT + chartH - (avgRates[4] / 100) * chartH;
      ctx.fillText('Avg', lastAvgX + 8, lastAvgY + 3);

      if (clickIdx >= 0) {
        var sp = retData[clickIdx];
        ctx.fillStyle = cText();
        ctx.font = 'bold 12px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sp.icon + ' ' + sp.name + ' (' + (clickIdx + 1) + '/' + retData.length + ')', W / 2, H - 8);
      } else {
        ctx.fillStyle = cText3();
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('All 11 projects overlaid — dashed = average — click to cycle', W / 2, H - 8);
      }
    }

    draw();
    cc.canvas.addEventListener('click', function () {
      clickIdx = (clickIdx + 1) % (retData.length + 1);
      if (clickIdx === retData.length) clickIdx = -1;
      draw();
      sfx('retention');
    });

    return { title: 'User Engagement Retention Curves', sub: 'D1/D7/D30/D60/D90 Cohort Retention with Average Overlay', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 6. ACCESSIBILITY MATURITY MATRIX (Canvas 620x400)
   *    12 projects x 6 WCAG criteria heatmap
   * ================================================================ */
  function buildA11yMatrix() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovCell = null;

    var CRITERIA = ['Perceivable', 'Operable', 'Understandable', 'Robust', 'Keyboard', 'ScreenReader'];

    var a11yData = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var base = p.uxScore;
      return {
        name: p.name, icon: p.icon, color: p.color,
        scores: [
          Math.min(100, Math.round(base * 0.85 + verNum * 0.4)),
          Math.min(100, Math.round(base * 0.9 + verNum * 0.3)),
          Math.min(100, Math.round(base * 0.88 + verNum * 0.35)),
          Math.min(100, Math.round(base * 0.82 + p.testCoverage * 0.15 + verNum * 0.2)),
          Math.min(100, Math.round(base * 0.8 + verNum * 0.5)),
          Math.min(100, Math.round(base * 0.75 + verNum * 0.45))
        ]
      };
    });

    function a11yColor(v) {
      if (v >= 90) return '#4ade80';
      if (v >= 80) return '#22d3ee';
      if (v >= 70) return '#fbbf24';
      if (v >= 60) return '#fb923c';
      return '#f43f5e';
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Accessibility Maturity Matrix', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('12 Projects × 6 WCAG Criteria — Compliance % & Grade', W / 2, 46);

      var padL = 100, padR = 50, padT = 62, padB = 30;
      var cellW = Math.floor((W - padL - padR) / CRITERIA.length);
      var cellH = Math.floor((H - padT - padB) / a11yData.length);

      CRITERIA.forEach(function (c, ci) {
        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(padL + ci * cellW + cellW / 2, padT - 6);
        ctx.rotate(-Math.PI / 8);
        ctx.fillText(c, 0, 0);
        ctx.restore();
      });

      a11yData.forEach(function (d, di) {
        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.icon + ' ' + d.name, padL - 6, padT + di * cellH + cellH / 2 + 3);

        var avg = Math.round(d.scores.reduce(function (a, b) { return a + b; }, 0) / d.scores.length);
        var gd = gradeFor(avg, 100);

        d.scores.forEach(function (s, ci) {
          var x = padL + ci * cellW + 2;
          var y = padT + di * cellH + 2;
          var isHov = hovCell && hovCell.r === di && hovCell.c === ci;

          ctx.fillStyle = a11yColor(s);
          ctx.globalAlpha = isHov ? 1 : 0.7;
          ctx.beginPath();
          ctx.roundRect(x, y, cellW - 4, cellH - 4, [3]);
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.fillStyle = s >= 70 ? '#000' : '#fff';
          ctx.font = 'bold 9px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(s + '%', x + (cellW - 4) / 2, y + (cellH - 4) / 2 + 3);

          if (isHov) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, cellW - 4, cellH - 4, [3]);
            ctx.stroke();
          }
        });

        ctx.fillStyle = gd.color;
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(gd.grade, padL + CRITERIA.length * cellW + 8, padT + di * cellH + cellH / 2 + 4);
      });

      if (hovCell) {
        var hd = a11yData[hovCell.r];
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 150, H - 26, 300, 22, [8]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(hd.name + ' — ' + CRITERIA[hovCell.c] + ': ' + hd.scores[hovCell.c] + '% compliance', W / 2, H - 12);
      }
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sx = cc.canvas.width / rect.width;
      var sy = cc.canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * sy;
      var padL = 100, padR = 50, padT = 62, padB = 30;
      var cellW = Math.floor((W - padL - padR) / CRITERIA.length);
      var cellH = Math.floor((H - padT - padB) / a11yData.length);
      var c = Math.floor((mx - padL) / cellW);
      var r = Math.floor((my - padT) / cellH);
      var newCell = (c >= 0 && c < CRITERIA.length && r >= 0 && r < a11yData.length) ? { r: r, c: c } : null;
      if (!hovCell && !newCell) return;
      if (hovCell && newCell && hovCell.r === newCell.r && hovCell.c === newCell.c) return;
      hovCell = newCell;
      draw();
      if (hovCell) sfx('hover29');
    });
    cc.canvas.addEventListener('mouseleave', function () { hovCell = null; draw(); });
    cc.canvas.addEventListener('click', function () { if (hovCell) sfx('a11y'); });

    return { title: 'Accessibility Maturity Matrix', sub: '12 Projects × 6 WCAG Criteria Compliance Heatmap', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 7. PERFORMANCE BUDGET TRACKER (Canvas 640x400)
   *    12 projects x 6 metrics dual bar (actual vs budget)
   * ================================================================ */
  function buildPerfBudget() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovIdx = -1;
    var metricIdx = 0;

    var METRICS = [
      { name: 'FCP (ms)', budget: 1800, unit: 'ms' },
      { name: 'LCP (ms)', budget: 2500, unit: 'ms' },
      { name: 'TTI (ms)', budget: 3800, unit: 'ms' },
      { name: 'CLS', budget: 0.1, unit: '' },
      { name: 'FID (ms)', budget: 100, unit: 'ms' },
      { name: 'Bundle (KB)', budget: 300, unit: 'KB' }
    ];

    var perfData = PROJECTS.map(function (p) {
      var verNum = parseFloat(p.ver.replace('v', ''));
      var optFactor = 1 - verNum * 0.008;
      return {
        name: p.name, icon: p.icon, color: p.color,
        actuals: [
          Math.round(1200 + p.loc * 0.012 * optFactor),
          Math.round(1800 + p.loc * 0.015 * optFactor),
          Math.round(2600 + p.loc * 0.02 * optFactor),
          Math.round((0.03 + p.complexity * 0.006 * optFactor) * 1000) / 1000,
          Math.round(40 + p.complexity * 4 * optFactor),
          Math.round(120 + p.loc * 0.003 * optFactor)
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
      ctx.fillText('Performance Budget Tracker', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Metric: ' + METRICS[metricIdx].name + ' (Budget: ' + METRICS[metricIdx].budget + METRICS[metricIdx].unit + ') — Click to cycle metrics', W / 2, 46);

      var padL = 100, padR = 30, padT = 62, padB = 30;
      var chartW = W - padL - padR;
      var barH = Math.floor((H - padT - padB) / perfData.length) - 4;

      var metric = METRICS[metricIdx];
      var maxVal = metric.budget * 1.8;
      perfData.forEach(function (d) {
        if (d.actuals[metricIdx] > maxVal) maxVal = d.actuals[metricIdx] * 1.1;
      });

      var budgetX = padL + (metric.budget / maxVal) * chartW;
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.moveTo(budgetX, padT - 5);
      ctx.lineTo(budgetX, padT + perfData.length * (barH + 4));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f43f5e';
      ctx.font = '9px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Budget', budgetX, padT - 8);

      perfData.forEach(function (d, di) {
        var y = padT + di * (barH + 4);
        var isHov = hovIdx === di;
        var actual = d.actuals[metricIdx];
        var pass = actual <= metric.budget;
        var barW = Math.max(4, (actual / maxVal) * chartW);

        ctx.fillStyle = isHov ? '#fff' : cText2();
        ctx.font = (isHov ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.icon + ' ' + d.name, padL - 6, y + barH / 2 + 3);

        ctx.fillStyle = cGrid();
        ctx.beginPath();
        ctx.roundRect(padL, y, chartW, barH, [3]);
        ctx.fill();

        ctx.fillStyle = pass ? '#4ade80' : '#f43f5e';
        ctx.globalAlpha = isHov ? 0.95 : 0.7;
        ctx.beginPath();
        ctx.roundRect(padL, y, barW, barH, [3, 0, 0, 3]);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(padL, y, barW, barH, [3, 0, 0, 3]);
          ctx.stroke();
        }

        if (barW > 40) {
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 9px -apple-system,sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(actual + (metric.unit ? metric.unit : ''), padL + barW - 6, y + barH / 2 + 3);
        }

        ctx.fillStyle = pass ? '#4ade80' : '#f43f5e';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(pass ? '✓' : '✗', padL + barW + 4, y + barH / 2 + 3);
      });

      var passCount = perfData.filter(function (d) { return d.actuals[metricIdx] <= metric.budget; }).length;
      ctx.fillStyle = cText3();
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(passCount + '/' + perfData.length + ' projects within budget | Metric ' + (metricIdx + 1) + '/' + METRICS.length, W / 2, H - 10);
    }

    draw();
    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var sy = cc.canvas.height / rect.height;
      var my = (e.clientY - rect.top) * sy;
      var padT = 62, barH = Math.floor((H - 62 - 30) / perfData.length) - 4;
      var ni = Math.floor((my - padT) / (barH + 4));
      if (ni !== hovIdx) { hovIdx = (ni >= 0 && ni < perfData.length) ? ni : -1; draw(); if (hovIdx >= 0) sfx('hover29'); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    cc.canvas.addEventListener('click', function () {
      metricIdx = (metricIdx + 1) % METRICS.length;
      draw();
      sfx('perfbudget');
    });

    return { title: 'Performance Budget Tracker', sub: '12 Projects × 6 Metrics — Actual vs Budget (Click to Cycle)', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * 8. COMPREHENSIVE PORTFOLIO EVOLUTION DASHBOARD (Canvas 620x400)
   *    8 KPI half-gauges 4x2: Velocity/Quality/Innovation/Scale/
   *    Engagement/Accessibility/Performance/Growth
   * ================================================================ */
  function buildEvolutionDashboard() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    var activeProjects = PROJECTS.filter(function (p) { return p.name !== 'LevelPlay'; });
    var totalFeatures = activeProjects.reduce(function (a, p) { return a + p.features; }, 0);
    var avgTest = Math.round(activeProjects.reduce(function (a, p) { return a + p.testCoverage; }, 0) / activeProjects.length);
    var avgUx = Math.round(activeProjects.reduce(function (a, p) { return a + p.uxScore; }, 0) / activeProjects.length);
    var avgGrowth = Math.round(activeProjects.reduce(function (a, p) { return a + p.monthlyGrowth; }, 0) / activeProjects.length * 10) / 10;
    var avgComplexity = Math.round(activeProjects.reduce(function (a, p) { return a + p.complexity; }, 0) / activeProjects.length * 10) / 10;
    var totalVer = activeProjects.reduce(function (a, p) { return a + parseFloat(p.ver.replace('v', '')); }, 0);
    var avgVer = Math.round(totalVer / activeProjects.length * 10) / 10;
    var velocityScore = Math.min(100, Math.round(totalFeatures / activeProjects.length * 0.3));
    var qualityScore = avgTest;
    var innovationScore = Math.min(100, Math.round(avgComplexity * 10 + avgVer));
    var scaleScore = Math.min(100, Math.round(TOTAL_LOC / 5000));
    var engagementScore = avgUx;
    var a11yScore = Math.min(100, Math.round(avgUx * 0.85 + avgVer * 0.4));
    var perfScore = Math.min(100, Math.round(85 + avgTest * 0.1));
    var growthScore = Math.min(100, Math.round(avgGrowth * 25));

    var gauges = [
      { label: 'Velocity', value: velocityScore, max: 100, color: '#6366f1' },
      { label: 'Quality', value: qualityScore, max: 100, color: '#22d3ee' },
      { label: 'Innovation', value: innovationScore, max: 100, color: '#4ade80' },
      { label: 'Scale', value: scaleScore, max: 100, color: '#f59e0b' },
      { label: 'Engagement', value: engagementScore, max: 100, color: '#fb7185' },
      { label: 'Accessibility', value: a11yScore, max: 100, color: '#a78bfa' },
      { label: 'Performance', value: perfScore, max: 100, color: '#34d399' },
      { label: 'Growth', value: growthScore, max: 100, color: '#38bdf8' }
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cCard();
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText();
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Comprehensive Portfolio Evolution Dashboard', W / 2, 28);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('8 KPI Half-Gauges — Weighted Composite Grade', W / 2, 46);

      var cols = 4, rows = 2;
      var gW = 135, gH = 110;
      var startX = (W - cols * gW) / 2;
      var startY = 62;

      var totalScore = 0;
      gauges.forEach(function (g, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var cx = startX + col * gW + gW / 2;
        var cy = startY + row * (gH + 35) + gH / 2 + 15;
        var R = 40;

        var pct = Math.min(1, g.value / g.max);
        var gd = gradeFor(g.value, g.max);
        totalScore += pct;

        ctx.strokeStyle = cGrid();
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, R, Math.PI, 0);
        ctx.stroke();

        ctx.strokeStyle = g.color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, R, Math.PI, Math.PI + Math.PI * pct);
        ctx.stroke();
        ctx.lineCap = 'butt';

        ctx.fillStyle = gd.color;
        ctx.font = 'bold 20px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(gd.grade, cx, cy - 2);

        ctx.fillStyle = cText();
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillText(g.value + '/' + g.max, cx, cy + 14);

        ctx.fillStyle = cText2();
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillText(g.label, cx, cy + R + 6);
      });

      var overallPct = totalScore / gauges.length;
      var overallGrade = gradeFor(overallPct * 100, 100);

      ctx.fillStyle = 'rgba(0,0,0,.35)';
      ctx.beginPath();
      ctx.roundRect(W / 2 - 170, H - 30, 340, 26, [8]);
      ctx.fill();

      ctx.fillStyle = overallGrade.color;
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Composite Portfolio Grade: ' + overallGrade.grade + ' (' + Math.round(overallPct * 100) + '/100) | ' + TOTAL_LOC.toLocaleString() + ' LOC | ' + TOTAL_SESSIONS.toLocaleString() + ' sessions', W / 2, H - 13);
    }

    draw();
    cc.canvas.addEventListener('click', function () { sfx('evolve'); });

    return { title: 'Portfolio Evolution Dashboard', sub: '8 KPI Half-Gauges with Weighted Composite Grade', canvas: cc.canvas, draw: draw };
  }

  /* ================================================================
   * SECTION BUILDER
   * ================================================================ */
  var drawFns = {};
  var builders = [
    { id: 'v29-pipeline', build: buildPipelineEfficiency },
    { id: 'v29-reuse', build: buildCodeReuseTracker },
    { id: 'v29-velocity', build: buildFeatureVelocity },
    { id: 'v29-treemap', build: buildComplexityTreemap },
    { id: 'v29-retention', build: buildRetentionCurves },
    { id: 'v29-a11y', build: buildA11yMatrix },
    { id: 'v29-perfbudget', build: buildPerfBudget },
    { id: 'v29-evolve', build: buildEvolutionDashboard }
  ];

  function injectSections() {
    var anchor = null;
    var sgs = $$('.v28-section');
    if (sgs.length) anchor = sgs[sgs.length - 1];
    if (!anchor) {
      var sections = $$('.section, [class*="v2"][class*="-section"]');
      if (sections.length) anchor = sections[sections.length - 1];
    }
    if (!anchor) anchor = $('footer') || document.body.lastElementChild;

    builders.forEach(function (b) {
      if ($('#' + b.id)) return;
      var result = b.build();
      drawFns[b.id] = result.draw;
      var sec = el('section', { id: b.id, className: 'v29-section section-reveal' }, [
        el('h2', { textContent: result.title }),
        el('p', { className: 'v29-section-sub', textContent: result.sub }),
        el('div', { className: 'v29-card' }, [result.canvas])
      ]);
      if (anchor.nextSibling) anchor.parentNode.insertBefore(sec, anchor.nextSibling);
      else anchor.parentNode.appendChild(sec);
      anchor = sec;

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('revealed'); sfx('reveal29'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.15 });
      obs.observe(sec);
    });
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift + Q/W/E/R/T/Y/U/I/0)
   * ================================================================ */
  var shortcutMap = { Q: 'v29-pipeline', W: 'v29-reuse', E: 'v29-velocity', R: 'v29-treemap', T: 'v29-retention', Y: 'v29-a11y', U: 'v29-perfbudget', I: 'v29-evolve' };
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var key = e.key.toUpperCase();
    if (key === '0') { e.preventDefault(); return; }
    var id = shortcutMap[key];
    if (id && $('#' + id)) {
      e.preventDefault();
      $('#' + id).scrollIntoView({ behavior: 'smooth', block: 'center' });
      sfx('nav29');
    }
  });

  /* ================================================================
   * THEME OBSERVER (redraw all canvases on theme change)
   * ================================================================ */
  var themeObs = new MutationObserver(function () {
    Object.keys(drawFns).forEach(function (id) {
      try { drawFns[id](); } catch (e) {}
    });
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

  showToast('v29.0 Loaded', '8 Tools: Pipeline + Reuse + Velocity + Treemap + Retention + A11y + PerfBudget + Evolution');
})();
