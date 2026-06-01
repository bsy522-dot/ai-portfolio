/**
 * ai-portfolio v8.0 Patch Module
 * Replaces v7_patch.js entirely.
 * Last updated: 2026-06-01
 */
;(function () {
  'use strict';
  if (window._v8) return;
  window._v8 = { version: '8.0.0', applied: Date.now() };

  /* ====================================================================
   * 0. UTILITY HELPERS
   * ==================================================================== */
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

  /* ====================================================================
   * 1. CSS INJECTION
   * ==================================================================== */
  var style = document.createElement('style');
  style.id = 'v8-patch-styles';
  style.textContent = [
    /* Toast */
    '.v8-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v8-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v8-toast.show{transform:translateX(0);opacity:1}',
    '.v8-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    /* Visit counter */
    '.v8-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v8-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v8pulse 1.8s infinite}',
    '@keyframes v8pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    /* Scroll ring */
    '.v8-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v8-scroll-ring:hover{opacity:1}',
    '.v8-scroll-ring svg{transform:rotate(-90deg)}',
    '.v8-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v8-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v8-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    /* Tech pills */
    '.v8-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v8-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v8-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v8-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    /* Compare overlay */
    '.v8-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v8-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v8-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v8-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v8-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v8-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v8-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v8-compare-col .v8c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v8-compare-col .v8c-label{color:var(--text3,#64748b)}',
    '.v8-compare-col .v8c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v8-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v8-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v8-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v8-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Featured Spotlight */
    '.v8-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v8-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v8-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v8-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v8-spot-left{position:relative;z-index:1}',
    '.v8-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v8-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v8-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v8-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v8-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v8-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v8-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v8-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v8-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v8-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v8-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v8-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v8-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    /* Growth Chart */
    '.v8-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v8-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v8-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '.v8-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v8-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v8-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v8-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v8-bar:hover{opacity:.85}',
    '.v8-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v8-bar:hover .bar-tip{opacity:1}',
    '.v8-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    /* Donut */
    '.v8-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v8-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v8-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v8-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health Grid */
    '.v8-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v8-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v8-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v8-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v8-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v8-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v8-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v8-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v8-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v8-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v8-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Contribution Heatmap */
    '.v8-heatmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v8-heatmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v8-heatmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-heatmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v8-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v8-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v8-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v8-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v8-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    /* Aggregate Metrics */
    '.v8-metrics{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v8-metrics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v8-metrics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem}',
    '.v8-metric-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v8-metric-card:hover{transform:translateY(-4px)}',
    '.v8-metric-num{font-size:1.8rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v8-metric-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    /* Stagger animation */
    '.v8-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v8-stagger.v8-visible{opacity:1;transform:translateY(0)}',
    /* What\'s New Banner */
    '.v8-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v8-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v8-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v8bannerPulse 2s ease-in-out infinite}',
    '@keyframes v8bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v8-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v8-banner-text strong{color:var(--text,#e2e8f0)}',
    /* Responsive */
    '@media(max-width:768px){.v8-spot-card{grid-template-columns:1fr}.v8-growth-grid{grid-template-columns:1fr}.v8-compare-grid{grid-template-columns:1fr}.v8-toast{max-width:280px;font-size:13px}.v8-pills{gap:6px}.v8-pill{padding:5px 12px;font-size:12px}.v8-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}.v8-metrics-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ====================================================================
   * 2. PROJECT DATA (all 13 projects — latest versions as of 2026-06-01)
   * ==================================================================== */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v5.0', tech: ['PWA'], impact: '672 topics',
      features: '33 Subjects (Kids 13 + Adult 20), 672 Topics with Content/Quiz/Video, Mastery Challenge, Time Attack, Learning Stories, 30+ Badges, SFX',
      loc: 8200, date: '2026-06-01', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'672',l:'Topics'},{n:'33',l:'Subjects'},{n:'30+',l:'Badges'},{n:'140+',l:'Lessons'}] },
    { title: 'SmartGolf', version: 'v22.0', tech: ['Leaflet', 'PWA'], impact: '590 courses',
      features: 'Pre-shot Routine Builder 12, Club Distance Manager 14 Canvas, Practice Journal 5, Course Strategy Notes, Golf Planner 4, Weather Club Guide, Nutrition Guide 8, Golf IQ v7 15Q, 104 Achievements, 104 SFX',
      loc: 12000, date: '2026-06-01', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'590',l:'Courses'},{n:'v22',l:'Version'},{n:'104',l:'Achievements'},{n:'104',l:'SFX'}] },
    { title: 'Culture Center Finder', version: 'v6.0', tech: ['Leaflet', 'PWA'], impact: '95,064 courses',
      features: 'Curriculum Roadmap 8, Center Compare Dashboard, Season Recommend 4, Monthly Calendar, Review Insights, D-Day Countdown, Aptitude Test 5Q, Weekly Digest, Encyclopedia 12, Quiz 30, 42 Achievements',
      loc: 7500, date: '2026-05-27', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'95K+',l:'Courses'},{n:'42',l:'Achievements'},{n:'30',l:'Quizzes'},{n:'8',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v9.0', tech: ['Canvas', 'PWA'], impact: 'Boss Battle',
      features: 'Boss Battle System, Skill Tree, World Map, Inventory, Puzzle Mode, Quiz Mode, Daily Reward, Character Encyclopedia 12, Soundtrack 7, 34+ Achievements',
      loc: 5800, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v9.0',l:'Version'},{n:'12',l:'Characters'},{n:'7',l:'BGM'},{n:'34+',l:'Achievements'}] },
    { title: 'History RPG', version: 'v13.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '90 quizzes',
      features: 'Formation System 6, Hero Awakening 12, Relic Museum 15, War Chronicle 8, Unit Museum 8, Campaign 8, Era Progress, Battle Stats Dashboard, Quiz 90, 48 Achievements',
      loc: 8500, date: '2026-05-30', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v13',l:'Version'},{n:'90',l:'Quizzes'},{n:'48',l:'Achievements'},{n:'6',l:'Formations'}] },
    { title: 'Piano', version: 'v9.0', tech: ['Tone.js', 'PWA'], impact: '62 songs',
      features: 'Metronome BPM 40-220, Music Theory 15, Performance Dashboard, Transpose &#xb1;6, Duet Mode, AI Song Recommend, Interval Training 12, 62 Songs, 48 Achievements',
      loc: 6800, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'62',l:'Songs'},{n:'48',l:'Achievements'},{n:'15',l:'Theory'},{n:'12',l:'Intervals'}] },
    { title: 'Violin', version: 'v8.0', tech: ['Tone.js', 'PWA'], impact: '54 songs',
      features: 'Interval Training 12, Ensemble 5 Tracks, Fingering Chart 4 Positions, Sight Reading, Practice Analytics, 54 Songs, 80 Lessons, 46 Achievements',
      loc: 6200, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'54',l:'Songs'},{n:'80',l:'Lessons'},{n:'46',l:'Achievements'},{n:'12',l:'Intervals'}] },
    { title: 'Karaoke', version: 'v9.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '65 songs',
      features: 'Duet Mode, Voice EQ 8, Interval Training 12, Vocal Diary, Genre Radio, Practice Stats Dashboard, Warmup Builder 8, Difficulty Chart, 65 Songs, 42 Achievements',
      loc: 6500, date: '2026-05-27', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'65',l:'Songs'},{n:'42',l:'Achievements'},{n:'8',l:'EQ Presets'},{n:'12',l:'Intervals'}] },
    { title: 'Golf Tracker', version: 'v7.0', tech: ['Canvas', 'CV', 'PWA'], impact: 'SG + Weather',
      features: 'Strokes Gained Analysis, Weather Integration, Distance Calculator, Club Gapping, Warmup Routine, Player Profile, Trend Charts, Goal Setting',
      loc: 5500, date: '2026-05-25', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v7.0',l:'Version'},{n:'8',l:'Features'},{n:'14',l:'Clubs'},{n:'CV',l:'Tracking'}] },
    { title: 'Boxing Trainer', version: 'v10.0', tech: ['Three.js', 'PWA'], impact: '30 quiz',
      features: 'Sparring Simulation AI, Combo Encyclopedia 20, Round Timer, Training Calendar, Body Stat Tracker, Technique Tutorial 12, Weekly Challenge, Endurance Test, Quiz 30, 46 Achievements',
      loc: 7000, date: '2026-05-27', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v10',l:'Version'},{n:'30',l:'Quiz'},{n:'46',l:'Achievements'},{n:'20',l:'Combos'}] },
    { title: 'City Builder', version: 'v7.0', tech: ['Canvas', 'PWA'], impact: '60+ buildings',
      features: 'Diplomacy 5 Nations, Policy System 12, Wonders 8, Trade Routes 6, Share Card, Attendance Streak, Quiz 55, 62 Achievements',
      loc: 7200, date: '2026-05-25', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60+',l:'Buildings'},{n:'62',l:'Achievements'},{n:'55',l:'Quizzes'},{n:'8',l:'Wonders'}] },
    { title: 'House Builder', version: 'v7.0', tech: ['Three.js', 'PWA'], impact: '20 furniture',
      features: 'Furniture System 20, Weather Effects 4, Construction Budget, Floor Plan View, Mission 8, Gallery, Material Dictionary 15, Speed Build, Quiz 45, 62 Achievements',
      loc: 5800, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v7.0',l:'Version'},{n:'62',l:'Achievements'},{n:'45',l:'Quizzes'},{n:'20',l:'Furniture'}] }
  ];

  var TOTAL_LOC = PROJECTS.reduce(function(s,p){return s+p.loc},0);
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ====================================================================
   * 3. WEB AUDIO SFX (8 types)
   * ==================================================================== */
  var audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    return audioCtx;
  }
  function playSFX(type) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    var now = ctx.currentTime;
    switch (type) {
      case 'nav': o.frequency.setValueAtTime(880, now); o.type = 'sine'; g.gain.setValueAtTime(0.06, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.stop(now + 0.12); break;
      case 'filter': o.frequency.setValueAtTime(660, now); o.frequency.exponentialRampToValueAtTime(1320, now + 0.08); o.type = 'triangle'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1); o.stop(now + 0.1); break;
      case 'compare': o.frequency.setValueAtTime(523, now); o.frequency.setValueAtTime(659, now + 0.06); o.type = 'sine'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'spotlight': o.frequency.setValueAtTime(440, now); o.frequency.exponentialRampToValueAtTime(880, now + 0.15); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'toast': o.frequency.setValueAtTime(1047, now); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.08); o.stop(now + 0.08); break;
      case 'scroll': o.frequency.setValueAtTime(220, now); o.type = 'sine'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.06); o.stop(now + 0.06); break;
      case 'heatmap': o.frequency.setValueAtTime(392, now); o.frequency.exponentialRampToValueAtTime(784, now + 0.1); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.stop(now + 0.12); break;
      case 'metric': o.frequency.setValueAtTime(587, now); o.frequency.setValueAtTime(880, now + 0.05); o.frequency.setValueAtTime(1175, now + 0.1); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.18); o.stop(now + 0.18); break;
    }
    o.start(now);
  }

  /* ====================================================================
   * 4. UPDATE PROJECT CARDS
   * ==================================================================== */
  function updateProjectCards() {
    var cards = $$('.card');
    PROJECTS.forEach(function (proj) {
      var card = null;
      cards.forEach(function (c) {
        var titleEl = c.querySelector('.card-title');
        if (titleEl) {
          var t = titleEl.textContent.trim();
          if (t === proj.title || t === proj.title.replace(/ /g, '') ||
              proj.title.indexOf(t) !== -1 || t.indexOf(proj.title) !== -1) {
            card = c;
          }
        }
      });
      if (!card) return;
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';

      var vBadge = card.querySelector('.version-badge');
      if (vBadge) vBadge.textContent = proj.version;

      card.setAttribute('data-v8-title', proj.title);
      card.setAttribute('data-v8-version', proj.version);
      card.setAttribute('data-v8-tech', proj.tech.join(','));
      card.setAttribute('data-v8-impact', proj.impact);
      card.setAttribute('data-v8-features', proj.features);
      card.setAttribute('data-v8-loc', proj.loc);
      card.setAttribute('data-v8-category', proj.category);

      var existingBtn = card.querySelector('.v6-compare-btn, .v7-compare-btn, .v8-compare-btn');
      if (existingBtn) existingBtn.remove();
      var btn = el('button', { className: 'v8-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        playSFX('compare');
        toggleCompareSelection(card, btn);
      });
      card.appendChild(btn);
      card.classList.add('v8-stagger');
    });
  }

  /* ====================================================================
   * 5. WHAT'S NEW BANNER
   * ==================================================================== */
  function buildBanner() {
    var projectsSection = $('#projects');
    if (!projectsSection) return;
    var banner = el('div', { className: 'v8-banner' });
    banner.innerHTML = '<div class="v8-banner-inner">' +
      '<span class="v8-banner-badge">New in v8</span>' +
      '<div class="v8-banner-text"><strong>SmartGolf v22.0</strong> &mdash; Pre-shot Routine Builder, Club Distance Manager, 104 Achievements &bull; ' +
      '<strong>History RPG v13.0</strong> &mdash; Formation System, Hero Awakening, 90 Quizzes &bull; ' +
      '<strong>Boxing v10.0</strong> &mdash; Sparring Simulation, Combo Encyclopedia 20 &bull; ' +
      '<strong>+9 more projects updated</strong></div>' +
      '</div>';
    projectsSection.parentNode.insertBefore(banner, projectsSection);
  }

  /* ====================================================================
   * 6. AGGREGATE METRICS DASHBOARD
   * ==================================================================== */
  function buildMetrics() {
    var projectsSection = $('#projects');
    if (!projectsSection) return;

    var totalAchievements = 0;
    var totalQuizzes = 0;
    var totalSongs = 0;
    var totalVersions = 0;
    PROJECTS.forEach(function(p) {
      var ver = parseFloat(p.version.replace('v',''));
      totalVersions += ver;
      p.stats.forEach(function(s) {
        var n = parseInt(s.n.replace(/[^0-9]/g,''),10);
        if (isNaN(n)) return;
        if (s.l === 'Achievements') totalAchievements += n;
        if (s.l === 'Quizzes' || s.l === 'Quiz') totalQuizzes += n;
        if (s.l === 'Songs') totalSongs += n;
      });
    });

    var section = el('section', { className: 'v8-metrics v8-stagger', id: 'v8-metrics' });
    section.innerHTML = '<h2>Aggregate Metrics</h2><p class="v8-metrics-sub">Cross-project statistics at a glance</p>';
    var grid = el('div', { className: 'v8-metrics-grid' });
    var metrics = [
      { n: PROJECTS.length, l: 'Live Projects' },
      { n: TOTAL_LOC.toLocaleString(), l: 'Lines of Code' },
      { n: totalAchievements + '+', l: 'Achievements' },
      { n: totalQuizzes + '+', l: 'Quiz Questions' },
      { n: totalSongs + '+', l: 'Songs & Tracks' },
      { n: Math.round(totalVersions), l: 'Combined Versions' }
    ];
    metrics.forEach(function(m) {
      var card = el('div', { className: 'v8-metric-card' });
      card.innerHTML = '<div class="v8-metric-num">' + m.n + '</div><div class="v8-metric-lbl">' + m.l + '</div>';
      grid.appendChild(card);
    });
    section.appendChild(grid);
    projectsSection.parentNode.insertBefore(section, projectsSection);
  }

  /* ====================================================================
   * 7. FEATURED PROJECT SPOTLIGHT (auto-carousel)
   * ==================================================================== */
  var spotlightIdx = 0;
  var spotlightTimer = null;
  var SPOTLIGHT = [
    { title: 'History RPG', ver: 'v13.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '한국사 영걸전 스타일 3D 전략 RPG v13.0. 진형시스템 6종, 영웅각성 12인, 유물도감 15종, 전쟁사연대기 8편, 유닛도감 8종, 캠페인 8종, 퀴즈 90문, 업적 48개.',
      tags: ['Three.js', 'Canvas', 'Tactics RPG', 'Web Audio'],
      stats: [{n:'v13',l:'Version'},{n:'90',l:'Quizzes'},{n:'48',l:'Achievements'},{n:'6',l:'Formations'}] },
    { title: 'SmartGolf', ver: 'v22.0', tier: 'NEXTERA', tierBg: 'rgba(34,197,94,.2)', tierColor: '#4ade80',
      desc: '전국 590개 골프장 PWA v22.0. 프리샷루틴 빌더 12단계, 클럽거리관리 14종 Canvas, 연습일지 5종, 코스전략노트 홀별, 골프목표플래너, 104개 업적, 104종 SFX.',
      tags: ['Leaflet.js', 'OSRM', 'PWA', 'Canvas'],
      stats: [{n:'590',l:'Courses'},{n:'v22',l:'Version'},{n:'104',l:'Achievements'},{n:'104',l:'SFX'}] },
    { title: 'Piano', ver: 'v9.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: 'Tone.js 피아노 리듬게임 v9.0. 62곡, 메트로놈 BPM 40-220, 음악이론 15항목, 연주분석 대시보드, 조옮김 &#xb1;6, 듀엣모드, AI곡추천, 음정트레이닝 12종, 업적 48개.',
      tags: ['Tone.js', 'Canvas', 'Rhythm Game', 'Web Audio'],
      stats: [{n:'62',l:'Songs'},{n:'48',l:'Achievements'},{n:'15',l:'Theory'},{n:'12',l:'Intervals'}] }
  ];

  function buildSpotlight() {
    var projectsSection = $('#projects');
    if (!projectsSection) return;
    var section = el('section', { className: 'v8-spotlight', id: 'v8-spotlight' });
    section.innerHTML = '<h2>Featured Projects</h2><p class="v8-spotlight-sub">Spotlight on our most ambitious builds</p>';
    var cardWrap = el('div', { className: 'v8-spot-card' });
    section.appendChild(cardWrap);
    var nav = el('div', { className: 'v8-spot-nav' });
    SPOTLIGHT.forEach(function (_, i) {
      var dot = el('button', { className: 'v8-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Spotlight ' + (i + 1) });
      dot.addEventListener('click', function () { goSpotlight(i); playSFX('spotlight'); });
      nav.appendChild(dot);
    });
    section.appendChild(nav);
    projectsSection.parentNode.insertBefore(section, projectsSection);
    renderSpotlight(0);
    spotlightTimer = setInterval(function () { goSpotlight((spotlightIdx + 1) % SPOTLIGHT.length); }, 6000);
  }

  function goSpotlight(idx) {
    spotlightIdx = idx;
    renderSpotlight(idx);
    $$('.v8-spot-dot').forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    if (spotlightTimer) { clearInterval(spotlightTimer); spotlightTimer = setInterval(function () { goSpotlight((spotlightIdx + 1) % SPOTLIGHT.length); }, 6000); }
  }

  function renderSpotlight(idx) {
    var s = SPOTLIGHT[idx];
    var card = $('.v8-spot-card');
    if (!card) return;
    card.innerHTML =
      '<div class="v8-spot-left">' +
        '<span class="spot-tier" style="background:' + s.tierBg + ';color:' + s.tierColor + '">' + s.tier + '</span>' +
        '<div class="spot-title">' + s.title + '</div>' +
        '<div class="spot-ver">' + s.ver + '</div>' +
        '<div class="spot-desc">' + s.desc + '</div>' +
        '<div class="spot-tags">' + s.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="v8-spot-right">' +
        s.stats.map(function (st) { return '<div class="v8-spot-stat"><div class="s-num">' + st.n + '</div><div class="s-lbl">' + st.l + '</div></div>'; }).join('') +
      '</div>';
  }

  /* ====================================================================
   * 8. GROWTH DASHBOARD (bar charts + donut)
   * ==================================================================== */
  function buildGrowthDashboard() {
    var anchor = $('#v8-spotlight') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;
    var section = el('section', { className: 'v8-growth', id: 'v8-growth' });
    section.innerHTML = '<h2>Project Growth Dashboard</h2><p class="v8-growth-sub">Live metrics across all ' + PROJECTS.length + ' projects &mdash; ' + TOTAL_LOC.toLocaleString() + ' total LOC</p>';
    var grid = el('div', { className: 'v8-growth-grid' });

    var locCard = el('div', { className: 'v8-growth-card' });
    locCard.innerHTML = '<h3>Lines of Code by Project</h3>';
    var barChart = el('div', { className: 'v8-bar-chart' });
    var maxLoc = Math.max.apply(null, PROJECTS.map(function (p) { return p.loc; }));
    PROJECTS.forEach(function (p) {
      var pct = (p.loc / maxLoc * 100).toFixed(0);
      var bar = el('div', { className: 'v8-bar' });
      bar.style.height = '0%';
      bar.style.background = p.category === 'NEXTERA' ? 'linear-gradient(180deg,#22c55e,#16a34a)' : 'linear-gradient(180deg,#6366f1,#4f46e5)';
      bar.innerHTML = '<span class="bar-tip">' + p.title.split(' ')[0] + ' ' + p.loc.toLocaleString() + '</span>';
      bar.setAttribute('data-height', pct);
      bar.title = p.title + ': ' + p.loc.toLocaleString() + ' LOC';
      barChart.appendChild(bar);
    });
    locCard.appendChild(barChart);
    var labels = el('div', { className: 'v8-bar-label' });
    labels.innerHTML = '<span>NEXTERA (4)</span><span>PRISM (8)</span>';
    locCard.appendChild(labels);
    grid.appendChild(locCard);

    var donutCard = el('div', { className: 'v8-growth-card' });
    donutCard.innerHTML = '<h3>Project Categories</h3>';
    var nextera = PROJECTS.filter(function (p) { return p.category === 'NEXTERA'; });
    var prism = PROJECTS.filter(function (p) { return p.category === 'PRISM'; });
    var nLoc = nextera.reduce(function (s, p) { return s + p.loc; }, 0);
    var pLoc = prism.reduce(function (s, p) { return s + p.loc; }, 0);
    var total = nLoc + pLoc;
    var nPct = nLoc / total;

    var r = 70, cx = 100, cy = 100, c = 2 * Math.PI * r;
    var donutSvg = '<svg viewBox="0 0 200 200" width="180" height="180">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(99,102,241,.1)" stroke-width="20"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#22c55e" stroke-width="20" stroke-dasharray="' + (c * nPct).toFixed(1) + ' ' + (c * (1 - nPct)).toFixed(1) + '" stroke-dashoffset="' + (c * 0.25).toFixed(1) + '" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#6366f1" stroke-width="20" stroke-dasharray="' + (c * (1 - nPct)).toFixed(1) + ' ' + (c * nPct).toFixed(1) + '" stroke-dashoffset="' + (c * (0.25 - nPct)).toFixed(1) + '" stroke-linecap="round"/>' +
      '<text x="' + cx + '" y="' + (cy - 5) + '" text-anchor="middle" fill="var(--text,#e2e8f0)" font-size="24" font-weight="800">' + PROJECTS.length + '</text>' +
      '<text x="' + cx + '" y="' + (cy + 14) + '" text-anchor="middle" fill="var(--text3,#64748b)" font-size="10">PROJECTS</text>' +
      '</svg>';

    var donutWrap = el('div', { className: 'v8-donut-wrap' });
    donutWrap.innerHTML = donutSvg +
      '<div class="v8-donut-legend">' +
        '<div class="v8-legend-item"><span class="v8-legend-dot" style="background:#22c55e"></span>NEXTERA (' + nextera.length + ') &mdash; ' + (nLoc / 1000).toFixed(1) + 'K LOC</div>' +
        '<div class="v8-legend-item"><span class="v8-legend-dot" style="background:#6366f1"></span>PRISM (' + prism.length + ') &mdash; ' + (pLoc / 1000).toFixed(1) + 'K LOC</div>' +
        '<div class="v8-legend-item" style="margin-top:.5rem;font-weight:700;color:var(--text,#e2e8f0)">Total: ' + TOTAL_LOC.toLocaleString() + ' LOC</div>' +
      '</div>';
    donutCard.appendChild(donutWrap);
    grid.appendChild(donutCard);

    section.appendChild(grid);
    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);

    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $$('.v8-bar').forEach(function (bar, i) {
            setTimeout(function () { bar.style.height = bar.getAttribute('data-height') + '%'; }, i * 60);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    barObserver.observe(barChart);
  }

  /* ====================================================================
   * 9. PROJECT HEALTH GRID
   * ==================================================================== */
  function buildHealthGrid() {
    var anchor = $('#v8-growth') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;
    var section = el('section', { className: 'v8-health v8-stagger', id: 'v8-health' });
    section.innerHTML = '<h2>Project Health Monitor</h2><p class="v8-health-sub">Real-time status of all ' + PROJECTS.length + ' projects</p>';
    var grid = el('div', { className: 'v8-health-grid' });
    PROJECTS.forEach(function (p) {
      var verNum = parseFloat(p.version.replace('v', ''));
      var score = Math.min(100, Math.round(verNum * 6 + p.loc / 120));
      var color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#f43f5e';
      var verBg = p.category === 'NEXTERA' ? 'rgba(34,197,94,.15);color:#4ade80' : 'rgba(99,102,241,.15);color:#a5b4fc';
      var item = el('div', { className: 'v8-health-item' });
      item.innerHTML =
        '<div class="h-head"><span class="h-name">' + p.title + '</span><span class="h-ver" style="background:' + verBg + '">' + p.version + '</span></div>' +
        '<div class="h-bar"><div class="h-fill" style="width:0%;background:' + color + '" data-w="' + score + '%"></div></div>' +
        '<div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span>Score: ' + score + '</span></div>';
      grid.appendChild(item);
    });
    section.appendChild(grid);
    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);

    var healthObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $$('.v8-health-item .h-fill').forEach(function (fill, i) {
            setTimeout(function () { fill.style.width = fill.getAttribute('data-w'); }, i * 50);
          });
          healthObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    healthObserver.observe(grid);
  }

  /* ====================================================================
   * 10. CONTRIBUTION HEATMAP
   * ==================================================================== */
  function buildHeatmap() {
    var anchor = $('#v8-health') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;

    var section = el('section', { className: 'v8-heatmap v8-stagger', id: 'v8-heatmap' });
    section.innerHTML = '<h2>Development Activity</h2><p class="v8-heatmap-sub">Project update frequency over the past 13 weeks</p>';

    var card = el('div', { className: 'v8-heatmap-card' });
    var grid = el('div', { className: 'v8-heatmap-grid' });

    var updateDates = {};
    PROJECTS.forEach(function(p) {
      var d = p.date;
      if (!updateDates[d]) updateDates[d] = [];
      updateDates[d].push(p.title);
    });

    var autoUpdateDates = {
      '2026-06-01': ['SmartGolf v22', 'LevelPlay v5'],
      '2026-05-30': ['History RPG v13'],
      '2026-05-27': ['Culture Center v6', 'Karaoke v9', 'Boxing v10'],
      '2026-05-26': ['Hatcuping v9', 'Piano v9', 'Violin v8', 'House Builder v7'],
      '2026-05-25': ['AI Portfolio v7', 'Golf Tracker v7', 'City Builder v7'],
      '2026-05-24': ['History RPG v12', 'SmartGolf v9'],
      '2026-05-22': ['Culture Center v5'],
      '2026-05-21': ['LevelPlay v4', 'Boxing v9'],
      '2026-05-20': ['Piano v8', 'Violin v7', 'Karaoke v8', 'Hatcuping v8'],
      '2026-05-19': ['City Builder v6', 'House Builder v6'],
      '2026-05-18': ['AI Portfolio v6', 'Golf Tracker v6'],
      '2026-05-17': ['Culture Center v4', 'History RPG v11'],
      '2026-05-14': ['Piano v7', 'Karaoke v7'],
      '2026-05-13': ['Violin v6', 'House Builder v5'],
      '2026-05-12': ['City Builder v5', 'AI Portfolio v5'],
      '2026-05-08': ['AI Portfolio v4'],
      '2026-05-02': ['AI Portfolio v3'],
      '2026-04-04': ['AI Portfolio v2']
    };

    var today = new Date(2026, 5, 1);
    var startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 90);

    for (var week = 0; week < 13; week++) {
      for (var day = 0; day < 7; day++) {
        var cellDate = new Date(startDate);
        cellDate.setDate(cellDate.getDate() + week * 7 + day);
        var dateStr = cellDate.getFullYear() + '-' +
          ('0' + (cellDate.getMonth() + 1)).slice(-2) + '-' +
          ('0' + cellDate.getDate()).slice(-2);

        var updates = autoUpdateDates[dateStr] || [];
        var level = Math.min(4, updates.length);
        var colors = ['rgba(99,102,241,.06)', 'rgba(99,102,241,.25)', 'rgba(99,102,241,.45)', 'rgba(99,102,241,.7)', 'rgba(99,102,241,.95)'];
        var cell = el('div', { className: 'v8-hm-cell' });
        cell.style.background = colors[level];
        if (updates.length > 0) {
          cell.title = dateStr + ': ' + updates.join(', ');
        } else {
          cell.title = dateStr;
        }
        grid.appendChild(cell);
      }
    }

    card.appendChild(grid);

    var legend = el('div', { className: 'v8-hm-legend' });
    legend.innerHTML = 'Less <span style="background:rgba(99,102,241,.06)"></span>' +
      '<span style="background:rgba(99,102,241,.25)"></span>' +
      '<span style="background:rgba(99,102,241,.45)"></span>' +
      '<span style="background:rgba(99,102,241,.7)"></span>' +
      '<span style="background:rgba(99,102,241,.95)"></span> More';
    card.appendChild(legend);

    section.appendChild(card);
    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);
  }

  /* ====================================================================
   * 11. TOAST NOTIFICATIONS
   * ==================================================================== */
  function showToasts() {
    var wrap = el('div', { className: 'v8-toast-wrap' });
    document.body.appendChild(wrap);
    var messages = [
      { title: 'SmartGolf v22.0', body: '104개 업적 + 프리샷 루틴 빌더 업데이트!' },
      { title: 'History RPG v13.0', body: '진형시스템 6종 + 영웅각성 12인 추가' },
      { title: 'Portfolio v8.0', body: '12프로젝트 전면갱신 + 히트맵 + 메트릭스' }
    ];
    messages.forEach(function (msg, i) {
      setTimeout(function () {
        playSFX('toast');
        var toast = el('div', { className: 'v8-toast', innerHTML: '<div class="toast-title">' + msg.title + '</div><div>' + msg.body + '</div>' });
        wrap.appendChild(toast);
        requestAnimationFrame(function () { toast.classList.add('show'); });
        setTimeout(function () {
          toast.classList.remove('show');
          setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
        }, 4000);
      }, 800 + i * 1200);
    });
  }

  /* ====================================================================
   * 12. VISIT COUNTER
   * ==================================================================== */
  function initVisitCounter() {
    var key = 'v8_visit_count';
    var count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, count);
    var target = $('.hero-content, .hero, [class*="hero"]');
    if (!target) return;
    var existing = target.querySelector('.v8-visit, .v7-visit, .v6-visit');
    if (existing) existing.remove();
    var visitEl = el('div', { className: 'v8-visit' }, [
      el('span', { className: 'v8-pulse' }),
      document.createTextNode(count + ' visits')
    ]);
    target.appendChild(visitEl);
  }

  /* ====================================================================
   * 13. SCROLL PROGRESS RING
   * ==================================================================== */
  function initScrollRing() {
    var existing = document.querySelector('.v6-scroll-ring, .v7-scroll-ring, .v8-scroll-ring');
    if (existing) existing.remove();
    var r = 20, c = 2 * Math.PI * r;
    var container = el('div', { className: 'v8-scroll-ring', 'aria-label': 'Scroll progress' });
    container.innerHTML =
      '<svg viewBox="0 0 48 48" width="48" height="48">' +
        '<circle class="ring-bg" cx="24" cy="24" r="' + r + '"/>' +
        '<circle class="ring-fg" cx="24" cy="24" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + c + '"/>' +
        '<polygon class="ring-arrow" points="24,14 30,22 26,22 26,32 22,32 22,22 18,22"/>' +
      '</svg>';
    document.body.appendChild(container);
    var fg = container.querySelector('.ring-fg');
    function onScroll() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = dh > 0 ? st / dh : 0;
      fg.style.strokeDashoffset = c * (1 - pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    container.addEventListener('click', function () { playSFX('scroll'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ====================================================================
   * 14. TECH FILTER PILLS
   * ==================================================================== */
  function initFilterPills() {
    var searchBar = $('.search-bar, [class*="search"]');
    if (!searchBar) return;
    var existing = document.querySelector('.v6-pills, .v7-pills, .v8-pills');
    if (existing) existing.remove();
    var pillWrap = el('div', { className: 'v8-pills' });
    TECH_LIST.forEach(function (tech) {
      var pill = el('button', { className: 'v8-pill' + (tech === 'All' ? ' active' : ''), textContent: tech });
      pill.addEventListener('click', function () {
        playSFX('filter');
        $$('.v8-pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        filterCards(tech);
      });
      pillWrap.appendChild(pill);
    });
    searchBar.parentNode.insertBefore(pillWrap, searchBar.nextSibling);
  }

  function filterCards(tech) {
    $$('[data-v8-tech]').forEach(function (card) {
      var techs = card.getAttribute('data-v8-tech') || '';
      if (tech === 'All' || techs.indexOf(tech) !== -1) {
        card.style.display = ''; card.style.opacity = '1'; card.style.transform = '';
      } else {
        card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
        setTimeout(function () { if (card.style.opacity === '0') card.style.display = 'none'; }, 300);
      }
    });
  }

  /* ====================================================================
   * 15. PROJECT COMPARISON MODE
   * ==================================================================== */
  var compareQueue = [];
  var overlay = null;

  function initCompareModal() {
    var old = document.querySelector('.v6-compare-overlay, .v7-compare-overlay, .v8-compare-overlay');
    if (old) old.remove();
    overlay = el('div', { className: 'v8-compare-overlay' });
    overlay.innerHTML = '<div class="v8-compare-box"><button class="v8-compare-close" aria-label="Close">&times;</button><h3>Project Comparison</h3><div class="v8-compare-grid"></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCompare(); });
    overlay.querySelector('.v8-compare-close').addEventListener('click', closeCompare);
  }

  function toggleCompareSelection(card, btn) {
    var idx = compareQueue.indexOf(card);
    if (idx !== -1) { compareQueue.splice(idx, 1); btn.classList.remove('selected'); btn.textContent = 'Compare'; return; }
    if (compareQueue.length >= 2) {
      var old = compareQueue.shift();
      var oldBtn = old.querySelector('.v8-compare-btn');
      if (oldBtn) { oldBtn.classList.remove('selected'); oldBtn.textContent = 'Compare'; }
    }
    compareQueue.push(card); btn.classList.add('selected'); btn.textContent = 'Selected';
    if (compareQueue.length === 2) openCompare(compareQueue[0], compareQueue[1]);
  }

  function openCompare(a, b) {
    if (!overlay) return;
    var grid = overlay.querySelector('.v8-compare-grid');
    grid.innerHTML = '';
    [a, b].forEach(function (card) {
      var col = el('div', { className: 'v8-compare-col' });
      var title = card.getAttribute('data-v8-title') || 'Unknown';
      var rows = [
        ['Version', card.getAttribute('data-v8-version') || '-'],
        ['Tech', card.getAttribute('data-v8-tech') || '-'],
        ['Impact', card.getAttribute('data-v8-impact') || '-'],
        ['LOC', (parseInt(card.getAttribute('data-v8-loc') || '0', 10)).toLocaleString()],
        ['Category', card.getAttribute('data-v8-category') || '-'],
        ['Features', card.getAttribute('data-v8-features') || '-']
      ];
      col.innerHTML = '<h4>' + title + '</h4>' + rows.map(function (r) {
        return '<div class="v8c-row"><span class="v8c-label">' + r[0] + '</span><span class="v8c-val">' + r[1] + '</span></div>';
      }).join('');
      grid.appendChild(col);
    });
    overlay.classList.add('open');
  }

  function closeCompare() {
    if (overlay) overlay.classList.remove('open');
    compareQueue.forEach(function (card) {
      var btn = card.querySelector('.v8-compare-btn');
      if (btn) { btn.classList.remove('selected'); btn.textContent = 'Compare'; }
    });
    compareQueue = [];
  }

  /* ====================================================================
   * 16. STAGGER ANIMATION
   * ==================================================================== */
  function initStaggerAnimation() {
    if (!('IntersectionObserver' in window)) {
      $$('.v8-stagger').forEach(function (el) { el.classList.add('v8-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = parseInt(entry.target.getAttribute('data-v8-stagger-idx') || '0', 10);
          setTimeout(function () { entry.target.classList.add('v8-visible'); }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    $$('.v8-stagger').forEach(function (el, i) {
      el.setAttribute('data-v8-stagger-idx', i % 6);
      observer.observe(el);
    });
  }

  /* ====================================================================
   * 17. KEYBOARD SHORTCUTS
   * ==================================================================== */
  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCompare();
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      if (e.shiftKey && e.key === 'F') {
        e.preventDefault();
        var target = $('#v8-spotlight');
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); }
      }
      if (e.shiftKey && e.key === 'G') {
        e.preventDefault();
        var target = $('#v8-growth');
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); }
      }
      if (e.shiftKey && e.key === 'H') {
        e.preventDefault();
        var target = $('#v8-health');
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); }
      }
      if (e.shiftKey && e.key === 'M') {
        e.preventDefault();
        var target = $('#v8-metrics');
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); playSFX('metric'); }
      }
      if (e.shiftKey && e.key === 'A') {
        e.preventDefault();
        var target = $('#v8-heatmap');
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); playSFX('heatmap'); }
      }
    });
  }

  /* ====================================================================
   * 18. UPDATE SEO META
   * ==================================================================== */
  function updateMeta() {
    var desc = 'BSY Developer Portfolio v8.0 — 12 interactive web apps auto-evolving: SmartGolf v22.0, History RPG v13.0, Piano v9.0, Boxing v10.0, Karaoke v9.0, Violin v8.0 and more. ' + TOTAL_LOC.toLocaleString() + '+ lines of code. Built with Three.js, Tone.js, Leaflet, Canvas, PWA.';
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    var ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'BSY Portfolio v8.0 — 12 Interactive Web Apps, ' + TOTAL_LOC.toLocaleString() + '+ LOC');
    var twTitle = $('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', 'BSY Portfolio v8.0 — 12 Interactive Web Apps');
    var twDesc = $('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
  }

  /* ====================================================================
   * 19. CLEAN OLD ARTIFACTS
   * ==================================================================== */
  function cleanOldPatches() {
    ['v5-patch-styles', 'v6-patch-styles', 'v7-patch-styles'].forEach(function(id) {
      var s = document.getElementById(id);
      if (s) s.remove();
    });
    if (window._v5) { try { delete window._v5; } catch (e) { window._v5 = undefined; } }
    if (window._v6) { try { delete window._v6; } catch (e) { window._v6 = undefined; } }
    if (window._v7) { try { delete window._v7; } catch (e) { window._v7 = undefined; } }
    $$('.v6-scroll-ring, .v6-pills, .v6-compare-overlay, .v6-toast-wrap, .v6-timeline-section, .v6-radar-section, .v6-visit').forEach(function (el) { el.remove(); });
    $$('.v7-scroll-ring, .v7-pills, .v7-compare-overlay, .v7-toast-wrap, .v7-visit, .v7-spotlight, .v7-growth, .v7-health').forEach(function (el) { el.remove(); });
    $$('[class*="v5-"]').forEach(function (el) { el.remove(); });
  }

  /* ====================================================================
   * INIT
   * ==================================================================== */
  function init() {
    cleanOldPatches();
    updateMeta();
    updateProjectCards();
    initCompareModal();
    initFilterPills();
    buildBanner();
    buildMetrics();
    buildSpotlight();
    buildGrowthDashboard();
    buildHealthGrid();
    buildHeatmap();
    initVisitCounter();
    initScrollRing();
    initStaggerAnimation();
    initKeyboard();
    setTimeout(showToasts, 1500);
    console.log('[v8_patch] Applied successfully — v' + window._v8.version + ' | ' + TOTAL_LOC.toLocaleString() + ' LOC across ' + PROJECTS.length + ' projects');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
