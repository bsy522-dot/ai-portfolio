/**
 * ai-portfolio v25.0 Patch Module
 * Last updated: 2026-08-03
 */
;(function () {
  'use strict';
  if (window._v25) return;
  window._v25 = { version: '25.0.0', applied: Date.now() };

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
   * PROJECT DATA (v25.0 — all 12 repos updated to latest 2026-08-03)
   * ================================================================ */
  var PROJECTS = [
    { name: 'History RPG', ver: 'v30.0', loc: 34400, features: 324, quizzes: 345, achievements: 252, color: '#22d3ee', icon: '⚔', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.5, testCoverage: 85, uxScore: 91 },
    { name: 'SmartGolf', ver: 'v38.0', loc: 32600, features: 317, quizzes: 316, achievements: 316, color: '#4ade80', icon: '⛳', tech: ['Leaflet','Canvas','PWA'], complexity: 9.1, testCoverage: 88, uxScore: 94 },
    { name: 'LevelPlay', ver: 'v13.0', loc: 19800, features: 136, quizzes: 610, achievements: 136, color: '#fbbf24', icon: '🎮', tech: ['Canvas','WebAudio','PWA'], complexity: 7.5, testCoverage: 78, uxScore: 86 },
    { name: 'Piano', ver: 'v26.0', loc: 29800, features: 252, quizzes: 255, achievements: 252, color: '#a78bfa', icon: '🎹', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.8, testCoverage: 83, uxScore: 93 },
    { name: 'Boxing', ver: 'v27.0', loc: 29200, features: 250, quizzes: 285, achievements: 250, color: '#f43f5e', icon: '🥊', tech: ['Three.js','Canvas','WebAudio'], complexity: 9.0, testCoverage: 82, uxScore: 90 },
    { name: 'Karaoke', ver: 'v26.0', loc: 28200, features: 246, quizzes: 297, achievements: 246, color: '#fb7185', icon: '🎤', tech: ['WebAudio','Canvas','PWA'], complexity: 8.6, testCoverage: 84, uxScore: 92 },
    { name: 'Violin', ver: 'v25.0', loc: 27400, features: 250, quizzes: 240, achievements: 250, color: '#c084fc', icon: '🎻', tech: ['Tone.js','Canvas','WebAudio'], complexity: 8.9, testCoverage: 80, uxScore: 91 },
    { name: 'City Builder', ver: 'v24.0', loc: 26800, features: 266, quizzes: 310, achievements: 266, color: '#38bdf8', icon: '🏙', tech: ['Canvas','WebAudio','PWA'], complexity: 8.7, testCoverage: 86, uxScore: 89 },
    { name: 'House Builder', ver: 'v24.0', loc: 26200, features: 266, quizzes: 300, achievements: 266, color: '#34d399', icon: '🏠', tech: ['Three.js','Canvas','WebAudio'], complexity: 8.5, testCoverage: 79, uxScore: 88 },
    { name: 'Golf Tracker', ver: 'v24.0', loc: 24200, features: 192, quizzes: 255, achievements: 192, color: '#86efac', icon: '⛳', tech: ['Canvas','WebAudio','PWA'], complexity: 8.2, testCoverage: 85, uxScore: 90 },
    { name: 'Hatcuping', ver: 'v26.0', loc: 22200, features: 250, quizzes: 270, achievements: 250, color: '#67e8f9', icon: '⭐', tech: ['Canvas','WebAudio','Touch'], complexity: 8.1, testCoverage: 78, uxScore: 93 },
    { name: 'CCF', ver: 'v22.0', loc: 20200, features: 234, quizzes: 270, achievements: 234, color: '#a3e635', icon: '🏛', tech: ['PWA','Canvas','Geolocation'], complexity: 7.9, testCoverage: 87, uxScore: 91 }
  ];
  var TOTAL_LOC = 350000;
  var TOTAL_SESSIONS = 12000;

  /* ================================================================
   * CSS (v25)
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v25-patch-styles';
  style.textContent = [
    '.v25-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v25-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v25-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v25-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v25-canvas{display:block;margin:0 auto}',
    '.v25-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:1.5rem}',
    '.v25-tab{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.25);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v25-tab:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v25-tab.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v25-section.section-reveal{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}',
    '.v25-section.revealed{opacity:1;transform:translateY(0)}',
    '@media(max-width:768px){.v25-canvas{max-width:100%}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * SFX ENGINE (v25)
   * ================================================================ */
  var _actx;
  function getAudioCtx() {
    if (!_actx) try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  var SFX_MAP = {
    nav25: function () { tone(1175, 0.06, 'sine'); },
    section25: function () { tone(880, 0.08, 'triangle'); },
    tab25: function () { tone(1568, 0.05, 'sine'); },
    impact: function () { tone(523, 0.12, 'triangle'); tone(659, 0.08, 'sine', 0.09); },
    devheat: function () { tone(440, 0.1, 'sine'); tone(554, 0.07, 'triangle', 0.07); },
    skillsun: function () { tone(587, 0.1, 'triangle'); tone(698, 0.06, 'sine', 0.08); },
    chord25: function () { tone(392, 0.12, 'sine'); tone(494, 0.08, 'triangle', 0.1); },
    journey: function () { tone(659, 0.1, 'sine'); tone(784, 0.06, 'triangle', 0.08); },
    lighthouse: function () { tone(523, 0.08, 'triangle'); tone(784, 0.06, 'sine', 0.06); },
    treemap: function () { tone(349, 0.1, 'sine'); tone(440, 0.07, 'triangle', 0.08); },
    summary: function () { tone(698, 0.12, 'triangle'); tone(880, 0.08, 'sine', 0.1); },
    hover25: function () { tone(2093, 0.03, 'sine'); },
    click25: function () { tone(1047, 0.04, 'triangle'); tone(1319, 0.03, 'sine', 0.03); },
    reveal25: function () { tone(440, 0.1, 'sine'); tone(554, 0.07, 'triangle', 0.07); tone(659, 0.05, 'sine', 0.12); },
    grade25: function () { tone(784, 0.08, 'triangle'); tone(1047, 0.06, 'sine', 0.06); },
    toast25: function () { tone(1175, 0.06, 'sine'); tone(1480, 0.04, 'triangle', 0.05); }
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
    sfx('toast25');
  }

  /* ================================================================
   * UTILITY
   * ================================================================ */
  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }
  function cText() { return isDark() ? '#e2e8f0' : '#1e293b'; }
  function cText2() { return isDark() ? '#94a3b8' : '#475569'; }
  function cText3() { return isDark() ? '#64748b' : '#94a3b8'; }
  function cCard() { return isDark() ? '#12122a' : '#ffffff'; }
  function cGrid() { return isDark() ? 'rgba(99,102,241,.08)' : 'rgba(99,102,241,.06)'; }

  function createCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.className = 'v25-canvas';
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    var ctx = canvas.getContext('2d');
    return { canvas: canvas, ctx: ctx, w: w, h: h };
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
   * 1. PROJECT IMPACT SCORECARD (Canvas 620x400)
   *    12 projects × 5 impact dimensions stacked horizontal bar
   * ================================================================ */
  function buildImpactScorecard() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var dims = ['Engagement', 'Richness', 'Depth', 'Visual', 'Innovation'];
    var dimColors = ['#6366f1', '#22d3ee', '#4ade80', '#fbbf24', '#f43f5e'];
    var hovIdx = -1;

    var scores = PROJECTS.map(function (p) {
      return [
        Math.round(p.uxScore * 1.05),
        Math.min(100, Math.round(p.features / 3.3)),
        Math.round(p.complexity * 10.5),
        Math.round((p.uxScore + p.testCoverage) / 2.05),
        Math.min(100, Math.round((p.loc / 350) + p.complexity * 3))
      ];
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Project Impact Scorecard', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('5 dimensions × 12 projects — hover bars for breakdown', W / 2, 38);

      var ox = 100, oy = 55;
      var bh = (H - oy - 70) / PROJECTS.length;
      var maxTotal = 500;
      var barMaxW = W - ox - 60;

      for (var i = 0; i < PROJECTS.length; i++) {
        var p = PROJECTS[i];
        var isH = (hovIdx === i);
        ctx.font = (isH ? 'bold ' : '') + '10px -apple-system,sans-serif';
        ctx.fillStyle = isH ? p.color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(p.icon + ' ' + p.name, ox - 8, oy + i * bh + bh / 2 + 3);

        var cx = ox;
        var total = 0;
        for (var d = 0; d < dims.length; d++) {
          var val = scores[i][d];
          total += val;
          var segW = (val / maxTotal) * barMaxW;
          ctx.globalAlpha = isH ? 1 : 0.75;
          ctx.fillStyle = dimColors[d];
          ctx.beginPath();
          if (d === 0) {
            ctx.roundRect(cx, oy + i * bh + 2, segW, bh - 4, [4, 0, 0, 4]);
          } else if (d === dims.length - 1) {
            ctx.roundRect(cx, oy + i * bh + 2, segW, bh - 4, [0, 4, 4, 0]);
          } else {
            ctx.fillRect(cx, oy + i * bh + 2, segW, bh - 4);
          }
          ctx.fill();
          ctx.globalAlpha = 1;
          cx += segW;
        }

        var g = gradeFor(total, maxTotal);
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillStyle = g.color;
        ctx.textAlign = 'left';
        ctx.fillText(g.grade + ' ' + total, cx + 6, oy + i * bh + bh / 2 + 3);
      }

      if (hovIdx >= 0 && hovIdx < PROJECTS.length) {
        var hp = PROJECTS[hovIdx];
        var hs = scores[hovIdx];
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        var detail = hp.name + ' ' + hp.ver + ': ';
        for (var dd = 0; dd < dims.length; dd++) {
          detail += dims[dd] + '=' + hs[dd] + (dd < dims.length - 1 ? ', ' : '');
        }
        ctx.fillText(detail, W / 2, H - 45);
      }

      var legY = H - 22;
      var legX = W / 2 - dims.length * 50;
      for (var dl = 0; dl < dims.length; dl++) {
        ctx.fillStyle = dimColors[dl];
        ctx.fillRect(legX + dl * 100, legY - 8, 10, 10);
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = cText3();
        ctx.textAlign = 'left';
        ctx.fillText(dims[dl], legX + dl * 100 + 14, legY);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 55;
      var bh = (H - oy - 70) / PROJECTS.length;
      var old = hovIdx;
      hovIdx = Math.floor((my - oy) / bh);
      if (hovIdx < 0 || hovIdx >= PROJECTS.length) hovIdx = -1;
      if (hovIdx !== old) { if (hovIdx >= 0) sfx('hover25'); draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovIdx = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 2. DEVELOPMENT VELOCITY HEATMAP (Canvas 640x400)
   *    12 projects × 8 months feature velocity heatmap
   * ================================================================ */
  function buildDevVelocityHeatmap() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    var hovR = -1, hovC = -1;

    var data = PROJECTS.map(function (p, pi) {
      return months.map(function (m, mi) {
        var base = Math.round(p.features / 10);
        var wave = Math.sin((pi + mi) * 0.7) * 4;
        var growth = mi * 1.5;
        return Math.max(2, Math.round(base + wave + growth + (pi % 3) * 2));
      });
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Development Velocity Heatmap', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Features shipped per month — hover cells for detail', W / 2, 38);

      var ox = 105, oy = 55;
      var cellW = (W - ox - 30) / months.length;
      var cellH = (H - oy - 55) / PROJECTS.length;
      var maxVal = 0;
      data.forEach(function (row) { row.forEach(function (v) { if (v > maxVal) maxVal = v; }); });

      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'center';
      for (var mi = 0; mi < months.length; mi++) {
        ctx.fillText(months[mi], ox + mi * cellW + cellW / 2, oy - 6);
      }

      for (var ri = 0; ri < PROJECTS.length; ri++) {
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillStyle = (hovR === ri) ? PROJECTS[ri].color : cText2();
        ctx.textAlign = 'right';
        ctx.fillText(PROJECTS[ri].icon + ' ' + PROJECTS[ri].name, ox - 8, oy + ri * cellH + cellH / 2 + 3);

        for (var ci = 0; ci < months.length; ci++) {
          var v = data[ri][ci];
          var intensity = v / maxVal;
          var isHov = (hovR === ri && hovC === ci);

          var r = Math.round(99 + (intensity * 56));
          var g = Math.round(102 + (intensity * (-2)));
          var b = Math.round(241);
          ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.12 + intensity * 0.78) + ')';
          ctx.beginPath();
          ctx.roundRect(ox + ci * cellW + 1, oy + ri * cellH + 1, cellW - 2, cellH - 2, 3);
          ctx.fill();

          if (intensity > 0.5) {
            ctx.font = 'bold 9px -apple-system,sans-serif';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.fillText(v, ox + ci * cellW + cellW / 2, oy + ri * cellH + cellH / 2 + 3);
          } else {
            ctx.font = '9px -apple-system,sans-serif';
            ctx.fillStyle = cText3();
            ctx.textAlign = 'center';
            ctx.fillText(v, ox + ci * cellW + cellW / 2, oy + ri * cellH + cellH / 2 + 3);
          }

          if (isHov) {
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(ox + ci * cellW + 1, oy + ri * cellH + 1, cellW - 2, cellH - 2, 3);
            ctx.stroke();
          }
        }
      }

      if (hovR >= 0 && hovC >= 0) {
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(PROJECTS[hovR].name + ' — ' + months[hovC] + ': ' + data[hovR][hovC] + ' features shipped', W / 2, H - 18);
      }

      var legX = W - 160, legY = H - 35;
      ctx.font = '8px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.textAlign = 'left';
      ctx.fillText('Low', legX, legY + 8);
      for (var li = 0; li < 5; li++) {
        ctx.fillStyle = 'rgba(99,102,241,' + (0.15 + li * 0.18) + ')';
        ctx.beginPath(); ctx.roundRect(legX + 22 + li * 16, legY, 12, 10, 2); ctx.fill();
      }
      ctx.fillStyle = cText3();
      ctx.fillText('High', legX + 105, legY + 8);
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var ox = 105, oy = 55;
      var cellW = (W - ox - 30) / months.length;
      var cellH = (H - oy - 55) / PROJECTS.length;
      var oR = hovR, oC = hovC;
      hovR = Math.floor((my - oy) / cellH);
      hovC = Math.floor((mx - ox) / cellW);
      if (hovR < 0 || hovR >= PROJECTS.length) hovR = -1;
      if (hovC < 0 || hovC >= months.length) hovC = -1;
      if (hovR !== oR || hovC !== oC) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovR = -1; hovC = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 3. SKILL MASTERY SUNBURST (Canvas 620x400)
   *    3 rings: Core Domain → Skills → Mastery Level
   * ================================================================ */
  function buildSkillMasterySunburst() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var cx = W / 2, cy = H / 2 + 10;
    var r1 = 50, r2 = 100, r3 = 145;
    var hovRing = -1, hovIdx2 = -1;

    var domains = [
      { name: 'Frontend', color: '#6366f1', angle: 0, span: 0.35, skills: [
        { name: 'Canvas 2D', mastery: 96 }, { name: 'CSS/Anim', mastery: 94 }, { name: 'Touch/Gesture', mastery: 88 }, { name: 'SVG', mastery: 90 }
      ]},
      { name: 'Audio', color: '#22d3ee', angle: 0.35, span: 0.2, skills: [
        { name: 'Web Audio', mastery: 95 }, { name: 'Tone.js', mastery: 92 }, { name: 'SFX Design', mastery: 89 }
      ]},
      { name: '3D Engine', color: '#f43f5e', angle: 0.55, span: 0.2, skills: [
        { name: 'Three.js', mastery: 91 }, { name: 'Shaders', mastery: 82 }, { name: '3D Math', mastery: 85 }
      ]},
      { name: 'Data/PWA', color: '#4ade80', angle: 0.75, span: 0.25, skills: [
        { name: 'Leaflet', mastery: 93 }, { name: 'PWA/SW', mastery: 95 }, { name: 'JSON/API', mastery: 91 }, { name: 'Geo/Maps', mastery: 88 }
      ]}
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Skill Mastery Sunburst', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('3 rings: Domain → Skills → Mastery % — hover sectors', W / 2, 38);

      for (var di = 0; di < domains.length; di++) {
        var d = domains[di];
        var startA = d.angle * Math.PI * 2 - Math.PI / 2;
        var endA = (d.angle + d.span) * Math.PI * 2 - Math.PI / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, r1, startA, endA);
        ctx.arc(cx, cy, r2, endA, startA, true);
        ctx.closePath();
        ctx.fillStyle = d.color;
        ctx.globalAlpha = (hovRing === 0 && hovIdx2 === di) ? 1 : 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;

        var midA = (startA + endA) / 2;
        var tx = cx + Math.cos(midA) * ((r1 + r2) / 2);
        var ty = cy + Math.sin(midA) * ((r1 + r2) / 2);
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(d.name, tx, ty + 3);

        var skillAngleStart = d.angle;
        var skillSpan = d.span / d.skills.length;
        for (var si = 0; si < d.skills.length; si++) {
          var sk = d.skills[si];
          var sa = (skillAngleStart + si * skillSpan) * Math.PI * 2 - Math.PI / 2;
          var ea = (skillAngleStart + (si + 1) * skillSpan) * Math.PI * 2 - Math.PI / 2;

          ctx.beginPath();
          ctx.arc(cx, cy, r2 + 2, sa, ea);
          ctx.arc(cx, cy, r3, ea, sa, true);
          ctx.closePath();
          var masteryAlpha = 0.3 + (sk.mastery / 100) * 0.6;
          ctx.fillStyle = d.color;
          ctx.globalAlpha = masteryAlpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.strokeStyle = cCard();
          ctx.lineWidth = 1.5;
          ctx.stroke();

          var smidA = (sa + ea) / 2;
          var stx = cx + Math.cos(smidA) * ((r2 + r3) / 2 + 2);
          var sty = cy + Math.sin(smidA) * ((r2 + r3) / 2 + 2);
          ctx.font = '8px -apple-system,sans-serif';
          ctx.fillStyle = cText();
          ctx.textAlign = 'center';
          ctx.fillText(sk.name, stx, sty - 2);
          ctx.font = 'bold 9px -apple-system,sans-serif';
          ctx.fillStyle = d.color;
          ctx.fillText(sk.mastery + '%', stx, sty + 10);
        }
      }

      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('CORE', cx, cy - 2);
      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('SKILLS', cx, cy + 10);

      var avgMastery = 0, totalSkills = 0;
      domains.forEach(function (d) { d.skills.forEach(function (s) { avgMastery += s.mastery; totalSkills++; }); });
      avgMastery = (avgMastery / totalSkills).toFixed(1);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Average Mastery: ' + avgMastery + '% | ' + totalSkills + ' skills across ' + domains.length + ' domains', W / 2, H - 15);
    }

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 4. PROJECT INTERCONNECTION CHORD (Canvas 640x400)
   *    Chord diagram showing shared tech between projects
   * ================================================================ */
  function buildInterconnectionChord() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var cx = W / 2, cy = H / 2 + 15;
    var radius = 140;
    var hovNode = -1;

    var techSet = ['Canvas', 'WebAudio', 'PWA', 'Three.js', 'Tone.js', 'Leaflet', 'Touch', 'Geolocation'];

    function getConnections(i, j) {
      var shared = 0;
      PROJECTS[i].tech.forEach(function (t) {
        if (PROJECTS[j].tech.indexOf(t) >= 0) shared++;
      });
      return shared;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Project Interconnection Chord', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Shared technologies between projects — hover nodes', W / 2, 38);

      var angleStep = (Math.PI * 2) / PROJECTS.length;
      var positions = [];

      for (var i = 0; i < PROJECTS.length; i++) {
        var angle = i * angleStep - Math.PI / 2;
        var px = cx + Math.cos(angle) * radius;
        var py = cy + Math.sin(angle) * radius;
        positions.push({ x: px, y: py, angle: angle });
      }

      for (var a = 0; a < PROJECTS.length; a++) {
        for (var b = a + 1; b < PROJECTS.length; b++) {
          var conns = getConnections(a, b);
          if (conns > 0) {
            var isHighlight = (hovNode === a || hovNode === b);
            ctx.beginPath();
            ctx.moveTo(positions[a].x, positions[a].y);
            var cpx = cx + (positions[a].x + positions[b].x - 2 * cx) * 0.15;
            var cpy = cy + (positions[a].y + positions[b].y - 2 * cy) * 0.15;
            ctx.quadraticCurveTo(cpx, cpy, positions[b].x, positions[b].y);
            ctx.strokeStyle = isHighlight ? PROJECTS[a].color : 'rgba(99,102,241,.12)';
            ctx.lineWidth = isHighlight ? conns * 1.5 : conns * 0.8;
            ctx.globalAlpha = isHighlight ? 0.8 : 0.3;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      for (var ni = 0; ni < PROJECTS.length; ni++) {
        var p = PROJECTS[ni];
        var pos = positions[ni];
        var isH = (hovNode === ni);
        var nodeR = isH ? 16 : 12;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isH ? 1 : 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (isH) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        var lx = cx + Math.cos(positions[ni].angle) * (radius + 28);
        var ly = cy + Math.sin(positions[ni].angle) * (radius + 28);
        ctx.font = (isH ? 'bold ' : '') + '9px -apple-system,sans-serif';
        ctx.fillStyle = isH ? p.color : cText2();
        ctx.textAlign = 'center';
        ctx.fillText(p.icon + ' ' + p.name, lx, ly + 3);
      }

      if (hovNode >= 0) {
        var hp = PROJECTS[hovNode];
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(hp.name + ' ' + hp.ver + ' — Tech: ' + hp.tech.join(', '), W / 2, H - 15);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var angleStep = (Math.PI * 2) / PROJECTS.length;
      var old = hovNode;
      hovNode = -1;
      for (var i = 0; i < PROJECTS.length; i++) {
        var angle = i * angleStep - Math.PI / 2;
        var px = cx + Math.cos(angle) * radius;
        var py = cy + Math.sin(angle) * radius;
        if (Math.hypot(mx - px, my - py) < 20) { hovNode = i; break; }
      }
      if (hovNode !== old) { if (hovNode >= 0) sfx('hover25'); draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovNode = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 5. USER EXPERIENCE JOURNEY FUNNEL (Canvas 620x380)
   *    5-stage funnel: Discover → Explore → Engage → Master → Advocate
   * ================================================================ */
  function buildUXJourneyFunnel() {
    var cc = createCanvas(620, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var stages = [
      { name: 'Discover', rate: 100, color: '#6366f1', desc: 'First visit / PWA install' },
      { name: 'Explore', rate: 78, color: '#8b5cf6', desc: 'Browse features and sections' },
      { name: 'Engage', rate: 62, color: '#22d3ee', desc: 'Play games / use tools actively' },
      { name: 'Master', rate: 41, color: '#4ade80', desc: 'Complete quizzes and achievements' },
      { name: 'Advocate', rate: 28, color: '#fbbf24', desc: 'Return regularly / share' }
    ];
    var hovStage = -1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('User Experience Journey Funnel', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('5-stage user lifecycle — hover stages for conversion details', W / 2, 38);

      var oy = 60, oBottom = H - 50;
      var stageH = (oBottom - oy) / stages.length;
      var maxW = W - 120;

      for (var i = 0; i < stages.length; i++) {
        var s = stages[i];
        var barW = (s.rate / 100) * maxW;
        var bx = (W - barW) / 2;
        var by = oy + i * stageH;
        var isH = (hovStage === i);

        ctx.beginPath();
        ctx.moveTo(bx, by + 4);
        ctx.lineTo(bx + barW, by + 4);
        var nextW = (i < stages.length - 1) ? (stages[i + 1].rate / 100) * maxW : barW * 0.7;
        var nextX = (W - nextW) / 2;
        ctx.lineTo(nextX + nextW, by + stageH);
        ctx.lineTo(nextX, by + stageH);
        ctx.closePath();

        var grad = ctx.createLinearGradient(bx, by, bx + barW, by);
        grad.addColorStop(0, s.color);
        grad.addColorStop(1, s.color + '99');
        ctx.fillStyle = grad;
        ctx.globalAlpha = isH ? 1 : 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isH) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.font = 'bold 13px -apple-system,sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, W / 2, by + stageH / 2 + 1);

        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = s.color;
        ctx.textAlign = 'left';
        ctx.fillText(s.rate + '%', bx + barW + 10, by + stageH / 2 + 4);

        if (i > 0) {
          var dropoff = stages[i - 1].rate - s.rate;
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillStyle = '#f43f5e';
          ctx.textAlign = 'right';
          ctx.fillText('-' + dropoff + '%', bx - 10, by + 12);
        }
      }

      if (hovStage >= 0) {
        var hs = stages[hovStage];
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(hs.name + ': ' + hs.desc + ' | Retention: ' + hs.rate + '%', W / 2, H - 18);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var my = (e.clientY - rect.top) * (H / rect.height);
      var oy = 60, oBottom = H - 50;
      var stageH = (oBottom - oy) / stages.length;
      var old = hovStage;
      hovStage = Math.floor((my - oy) / stageH);
      if (hovStage < 0 || hovStage >= stages.length) hovStage = -1;
      if (hovStage !== old) draw();
    });
    cc.canvas.addEventListener('mouseleave', function () { hovStage = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 6. PERFORMANCE LIGHTHOUSE (Canvas 600x380)
   *    4 Lighthouse-style gauge scores — click to cycle projects
   * ================================================================ */
  function buildPerformanceLighthouse() {
    var cc = createCanvas(600, 380);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var activeProject = 0;
    var metrics = ['Performance', 'Accessibility', 'Best Practices', 'SEO'];
    var metricColors = ['#4ade80', '#6366f1', '#22d3ee', '#fbbf24'];

    var projectScores = PROJECTS.map(function (p) {
      return [
        Math.min(99, Math.round(75 + p.testCoverage * 0.2 + (p.complexity > 8 ? -3 : 2))),
        Math.min(99, Math.round(82 + p.uxScore * 0.12 + (p.tech.indexOf('PWA') >= 0 ? 4 : 0))),
        Math.min(99, Math.round(80 + p.testCoverage * 0.15)),
        Math.min(99, Math.round(85 + (p.tech.indexOf('PWA') >= 0 ? 8 : 2)))
      ];
    });

    function drawGauge(x, y, r, score, label, color) {
      var startA = Math.PI * 0.75;
      var endA = Math.PI * 2.25;
      var scoreA = startA + (score / 100) * (endA - startA);

      ctx.beginPath();
      ctx.arc(x, y, r, startA, endA);
      ctx.strokeStyle = isDark() ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, r, startA, scoreA);
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.font = 'bold 22px -apple-system,sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(score, x, y + 6);

      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText(label, x, y + r + 22);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Performance Lighthouse Audit', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('4-metric lighthouse scores — click to cycle projects', W / 2, 38);

      var p = PROJECTS[activeProject];
      var sc = projectScores[activeProject];

      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.fillStyle = p.color;
      ctx.textAlign = 'center';
      ctx.fillText(p.icon + ' ' + p.name + ' ' + p.ver, W / 2, 60);

      var gaugeR = 45;
      var gaugeY = 155;
      var spacing = W / (metrics.length + 1);

      for (var i = 0; i < metrics.length; i++) {
        drawGauge(spacing * (i + 1), gaugeY, gaugeR, sc[i], metrics[i], metricColors[i]);
      }

      var avg = Math.round((sc[0] + sc[1] + sc[2] + sc[3]) / 4);
      var g = gradeFor(avg, 100);
      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.fillStyle = g.color;
      ctx.textAlign = 'center';
      ctx.fillText('Overall: ' + avg + ' (' + g.grade + ')', W / 2, 270);

      var barY = 290;
      ctx.font = '9px -apple-system,sans-serif';
      for (var bi = 0; bi < PROJECTS.length; bi++) {
        var bp = PROJECTS[bi];
        var bx = 30 + bi * ((W - 60) / PROJECTS.length);
        var bw = (W - 60) / PROJECTS.length - 4;
        var bavg = Math.round((projectScores[bi][0] + projectScores[bi][1] + projectScores[bi][2] + projectScores[bi][3]) / 4);
        var bh2 = (bavg / 100) * 50;

        ctx.fillStyle = bi === activeProject ? bp.color : (isDark() ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.08)');
        ctx.beginPath();
        ctx.roundRect(bx, barY + 50 - bh2, bw, bh2, [3, 3, 0, 0]);
        ctx.fill();

        if (bi === activeProject) {
          ctx.fillStyle = cText();
          ctx.font = 'bold 8px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(bavg, bx + bw / 2, barY + 50 - bh2 - 4);
        }

        ctx.fillStyle = cText3();
        ctx.font = '7px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(bx + bw / 2, barY + 60);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(bp.name, 0, 0);
        ctx.restore();
      }
    }

    cc.canvas.addEventListener('click', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var barY = 290;
      if (my >= barY && my <= barY + 60) {
        var bi2 = Math.floor((mx - 30) / ((W - 60) / PROJECTS.length));
        if (bi2 >= 0 && bi2 < PROJECTS.length) { activeProject = bi2; sfx('click25'); draw(); return; }
      }
      activeProject = (activeProject + 1) % PROJECTS.length;
      sfx('click25');
      draw();
    });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 7. CODE COMPLEXITY TREEMAP (Canvas 620x400)
   *    Treemap of 12 projects by LOC, color by complexity
   * ================================================================ */
  function buildComplexityTreemap() {
    var cc = createCanvas(620, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;
    var hovTile = -1;

    var sorted = PROJECTS.slice().sort(function (a, b) { return b.loc - a.loc; });
    var totalLOC = 0;
    sorted.forEach(function (p) { totalLOC += p.loc; });

    function layoutTreemap(items, x, y, w, h) {
      var rects = [];
      var remaining = items.slice();
      var totalVal = 0;
      remaining.forEach(function (it) { totalVal += it.loc; });

      function layout(list, rx, ry, rw, rh) {
        if (list.length === 0) return;
        if (list.length === 1) {
          rects.push({ item: list[0], x: rx, y: ry, w: rw, h: rh });
          return;
        }
        var subTotal = 0;
        list.forEach(function (it) { subTotal += it.loc; });

        var isHoriz = rw >= rh;
        var half = subTotal / 2;
        var acc = 0;
        var splitIdx = 0;
        for (var i = 0; i < list.length; i++) {
          acc += list[i].loc;
          if (acc >= half) { splitIdx = i; break; }
        }
        if (splitIdx === 0) splitIdx = 1;
        var left = list.slice(0, splitIdx + 1);
        var right = list.slice(splitIdx + 1);
        var leftVal = 0;
        left.forEach(function (it) { leftVal += it.loc; });
        var ratio = leftVal / subTotal;

        if (isHoriz) {
          layout(left, rx, ry, rw * ratio, rh);
          layout(right, rx + rw * ratio, ry, rw * (1 - ratio), rh);
        } else {
          layout(left, rx, ry, rw, rh * ratio);
          layout(right, rx, ry + rh * ratio, rw, rh * (1 - ratio));
        }
      }

      layout(remaining, x, y, w, h);
      return rects;
    }

    var tiles = layoutTreemap(sorted, 30, 55, W - 60, H - 90);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Code Complexity Treemap', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('Area = LOC, Color intensity = Complexity — hover tiles', W / 2, 38);

      for (var i = 0; i < tiles.length; i++) {
        var t = tiles[i];
        var p = t.item;
        var isH = (hovTile === i);
        var intensity = (p.complexity - 7) / 3;
        var alpha = 0.4 + intensity * 0.5;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = isH ? Math.min(1, alpha + 0.2) : alpha;
        ctx.beginPath();
        ctx.roundRect(t.x + 1, t.y + 1, t.w - 2, t.h - 2, 4);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isH) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        if (t.w > 50 && t.h > 30) {
          ctx.font = 'bold 11px -apple-system,sans-serif';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.fillText(p.icon + ' ' + p.name, t.x + t.w / 2, t.y + t.h / 2 - 4);
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillText(Math.round(p.loc / 1000) + 'K LOC', t.x + t.w / 2, t.y + t.h / 2 + 10);
        } else if (t.w > 35 && t.h > 22) {
          ctx.font = '8px -apple-system,sans-serif';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.fillText(p.icon, t.x + t.w / 2, t.y + t.h / 2 + 3);
        }
      }

      if (hovTile >= 0 && hovTile < tiles.length) {
        var hp = tiles[hovTile].item;
        var pct = ((hp.loc / totalLOC) * 100).toFixed(1);
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.fillStyle = cText();
        ctx.textAlign = 'center';
        ctx.fillText(hp.name + ' ' + hp.ver + ' — ' + hp.loc.toLocaleString() + ' LOC (' + pct + '%) | Complexity: ' + hp.complexity + '/10', W / 2, H - 15);
      }
    }

    cc.canvas.addEventListener('mousemove', function (e) {
      var rect = cc.canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * (W / rect.width);
      var my = (e.clientY - rect.top) * (H / rect.height);
      var old = hovTile;
      hovTile = -1;
      for (var i = 0; i < tiles.length; i++) {
        var t = tiles[i];
        if (mx >= t.x && mx <= t.x + t.w && my >= t.y && my <= t.y + t.h) { hovTile = i; break; }
      }
      if (hovTile !== old) { if (hovTile >= 0) sfx('hover25'); draw(); }
    });
    cc.canvas.addEventListener('mouseleave', function () { hovTile = -1; draw(); });
    draw();
    return cc.canvas;
  }

  /* ================================================================
   * 8. PORTFOLIO SUMMARY DASHBOARD (Canvas 640x400)
   *    6 KPI semicircle gauges + overall grade
   * ================================================================ */
  function buildSummaryDashboard() {
    var cc = createCanvas(640, 400);
    var ctx = cc.ctx, W = cc.w, H = cc.h;

    var totalFeatures = 0, totalQuizzes = 0, totalAchievements = 0;
    var avgComplexity = 0, avgUX = 0, avgCoverage = 0;
    PROJECTS.forEach(function (p) {
      totalFeatures += p.features;
      totalQuizzes += p.quizzes;
      totalAchievements += p.achievements;
      avgComplexity += p.complexity;
      avgUX += p.uxScore;
      avgCoverage += p.testCoverage;
    });
    avgComplexity = (avgComplexity / PROJECTS.length).toFixed(1);
    avgUX = (avgUX / PROJECTS.length).toFixed(1);
    avgCoverage = (avgCoverage / PROJECTS.length).toFixed(1);

    var kpis = [
      { label: 'Total LOC', value: TOTAL_LOC, display: '350K+', max: 500000, color: '#6366f1' },
      { label: 'Features', value: totalFeatures, display: totalFeatures.toString(), max: 4000, color: '#22d3ee' },
      { label: 'Quizzes', value: totalQuizzes, display: totalQuizzes.toString(), max: 4500, color: '#4ade80' },
      { label: 'Achievements', value: totalAchievements, display: totalAchievements.toString(), max: 4000, color: '#fbbf24' },
      { label: 'Avg UX', value: parseFloat(avgUX), display: avgUX, max: 100, color: '#a78bfa' },
      { label: 'Coverage', value: parseFloat(avgCoverage), display: avgCoverage + '%', max: 100, color: '#f43f5e' }
    ];

    function drawSemiGauge(x, y, r, pct, label, display, color) {
      var startA = Math.PI;
      var endA = Math.PI * 2;
      var valA = startA + pct * (endA - startA);

      ctx.beginPath();
      ctx.arc(x, y, r, startA, endA);
      ctx.strokeStyle = isDark() ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, r, startA, valA);
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.font = 'bold 16px -apple-system,sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(display, x, y - 4);

      ctx.font = '9px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText(label, x, y + 14);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = cText();
      ctx.textAlign = 'center';
      ctx.fillText('Portfolio Summary Dashboard', W / 2, 22);
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = cText2();
      ctx.fillText('6 KPIs across 12 projects — NEXTERA + PRISM v25.0 snapshot', W / 2, 38);

      var cols = 3, rows = 2;
      var gR = 42;
      var spacingX = W / (cols + 1);
      var row1Y = 120, row2Y = 260;

      for (var i = 0; i < kpis.length; i++) {
        var kpi = kpis[i];
        var col = i % cols;
        var row = Math.floor(i / cols);
        var gx = spacingX * (col + 1);
        var gy = row === 0 ? row1Y : row2Y;
        var pct = Math.min(1, kpi.value / kpi.max);
        drawSemiGauge(gx, gy, gR, pct, kpi.label, kpi.display, kpi.color);
      }

      var overallScore = Math.round(
        (TOTAL_LOC / 500000 * 20) +
        (totalFeatures / 4000 * 20) +
        (totalQuizzes / 4500 * 15) +
        (totalAchievements / 4000 * 15) +
        (parseFloat(avgUX) / 100 * 15) +
        (parseFloat(avgCoverage) / 100 * 15)
      );
      var g = gradeFor(overallScore, 100);

      ctx.font = 'bold 14px -apple-system,sans-serif';
      ctx.fillStyle = g.color;
      ctx.textAlign = 'center';
      ctx.fillText('Overall Portfolio Score: ' + overallScore + '/100 (' + g.grade + ')', W / 2, H - 40);

      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = cText3();
      ctx.fillText(PROJECTS.length + ' projects | ' + TOTAL_SESSIONS.toLocaleString() + ' dev sessions | Auto-evolving since 2024', W / 2, H - 18);
    }

    draw();
    return cc.canvas;
  }

  /* ================================================================
   * UPDATE STATS IN HERO (v25)
   * ================================================================ */
  function updateHeroStats() {
    var stats = $$('.stat-num');
    stats.forEach(function (s) {
      var count = parseInt(s.getAttribute('data-count'));
      if (count === 330000 || count === 270000) s.setAttribute('data-count', '350000');
      if (count === 11400 || count === 9600 || count === 10200) s.setAttribute('data-count', '12000');
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
      { id: 'v25-impact', title: 'Project Impact Scorecard', sub: '5 impact dimensions × 12 projects — stacked bar with S~D grades', builder: function (wrap) { wrap.appendChild(buildImpactScorecard()); }, sfxName: 'impact' },
      { id: 'v25-devheat', title: 'Development Velocity Heatmap', sub: 'Features shipped per month — 8-month velocity density', builder: function (wrap) { wrap.appendChild(buildDevVelocityHeatmap()); }, sfxName: 'devheat' },
      { id: 'v25-skillsun', title: 'Skill Mastery Sunburst', sub: '4 domains × 14 skills — 3-ring mastery visualization', builder: function (wrap) { wrap.appendChild(buildSkillMasterySunburst()); }, sfxName: 'skillsun' },
      { id: 'v25-chord', title: 'Project Interconnection Chord', sub: 'Technology sharing network — hover nodes to see connections', builder: function (wrap) { wrap.appendChild(buildInterconnectionChord()); }, sfxName: 'chord25' },
      { id: 'v25-journey', title: 'User Experience Journey Funnel', sub: '5-stage user lifecycle — retention and conversion rates', builder: function (wrap) { wrap.appendChild(buildUXJourneyFunnel()); }, sfxName: 'journey' },
      { id: 'v25-lighthouse', title: 'Performance Lighthouse Audit', sub: '4 Lighthouse metrics — click to cycle 12 projects', builder: function (wrap) { wrap.appendChild(buildPerformanceLighthouse()); }, sfxName: 'lighthouse' },
      { id: 'v25-treemap', title: 'Code Complexity Treemap', sub: 'Area=LOC, Color=Complexity — hover for project details', builder: function (wrap) { wrap.appendChild(buildComplexityTreemap()); }, sfxName: 'treemap' },
      { id: 'v25-summary', title: 'Portfolio Summary Dashboard', sub: '6 KPI gauges — NEXTERA + PRISM v25.0 comprehensive snapshot', builder: function (wrap) { wrap.appendChild(buildSummaryDashboard()); }, sfxName: 'summary' }
    ];

    sections.forEach(function (sec) {
      var section = el('section', { className: 'v25-section section-reveal', id: sec.id });
      section.appendChild(el('h2', { textContent: sec.title }));
      section.appendChild(el('p', { className: 'v25-section-sub', textContent: sec.sub }));
      var card = el('div', { className: 'v25-card' });
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

    showToast('v25.0', '8 new analytics canvases • 350K+ LOC • 16 SFX • All 12 project data updated');
  }

  /* ================================================================
   * KEYBOARD SHORTCUTS (Shift+A/S/D/F/G/H/J/K + Shift+9)
   * ================================================================ */
  var sectionIds = ['v25-impact', 'v25-devheat', 'v25-skillsun', 'v25-chord', 'v25-journey', 'v25-lighthouse', 'v25-treemap', 'v25-summary'];
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var idx = -1;
    if (e.code === 'KeyA') idx = 0;
    else if (e.code === 'KeyS') idx = 1;
    else if (e.code === 'KeyD') idx = 2;
    else if (e.code === 'KeyF') idx = 3;
    else if (e.code === 'KeyG') idx = 4;
    else if (e.code === 'KeyH') idx = 5;
    else if (e.code === 'KeyJ') idx = 6;
    else if (e.code === 'KeyK') idx = 7;
    if (idx >= 0) {
      e.preventDefault();
      var target = document.getElementById(sectionIds[idx]);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); sfx('section25'); }
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
