/**
 * ai-portfolio v8.0 Patch Module
 * Replaces v7_patch.js entirely.
 * Injected via Service Worker into index.html.
 * Last updated: 2026-06-01
 */
;(function () {
  'use strict';
  if (window._v8) return;
  window._v8 = { version: '8.0.0', applied: Date.now() };
  if (window._v7) { window._v7 = null; }

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
    /* Command Palette */
    '.v8-cmd-overlay{position:fixed;inset:0;z-index:10002;background:rgba(0,0,0,.6);display:flex;align-items:flex-start;justify-content:center;padding-top:18vh;opacity:0;transition:opacity .2s;pointer-events:none;backdrop-filter:blur(4px)}',
    '.v8-cmd-overlay.open{opacity:1;pointer-events:auto}',
    '.v8-cmd-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.3);border-radius:16px;width:92%;max-width:560px;box-shadow:0 20px 60px rgba(0,0,0,.6);overflow:hidden}',
    '.v8-cmd-input{width:100%;padding:16px 20px;background:transparent;border:none;border-bottom:1px solid rgba(99,102,241,.15);color:var(--text,#e2e8f0);font-size:16px;font-family:inherit;outline:none}',
    '.v8-cmd-input::placeholder{color:var(--text3,#64748b)}',
    '.v8-cmd-list{max-height:320px;overflow-y:auto;padding:8px}',
    '.v8-cmd-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;cursor:pointer;transition:background .15s;color:var(--text2,#94a3b8);font-size:14px}',
    '.v8-cmd-item:hover,.v8-cmd-item.active{background:rgba(99,102,241,.12);color:var(--text,#e2e8f0)}',
    '.v8-cmd-item .cmd-icon{font-size:18px;width:28px;text-align:center;flex-shrink:0}',
    '.v8-cmd-item .cmd-label{font-weight:600}',
    '.v8-cmd-item .cmd-hint{margin-left:auto;font-size:11px;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    /* Radar Chart */
    '.v8-radar{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v8-radar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v8-radar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-radar-wrap{display:flex;justify-content:center;align-items:center;gap:2rem;flex-wrap:wrap}',
    '.v8-radar-legend{display:flex;flex-direction:column;gap:.8rem}',
    '.v8-radar-leg{display:flex;align-items:center;gap:.6rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v8-radar-leg .leg-bar{width:60px;height:6px;border-radius:3px;overflow:hidden;background:rgba(99,102,241,.1)}',
    '.v8-radar-leg .leg-fill{height:100%;border-radius:3px;background:var(--accent,#6366f1)}',
    /* Evo Timeline */
    '.v8-evo{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v8-evo h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v8-evo-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v8-evo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v8-evo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem;text-align:center;transition:transform .2s}',
    '.v8-evo-card:hover{transform:translateY(-3px)}',
    '.v8-evo-card .evo-name{font-weight:700;font-size:.9rem;margin-bottom:.4rem}',
    '.v8-evo-card .evo-ver{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;margin-bottom:.3rem}',
    '.v8-evo-card .evo-date{font-size:.65rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    '.v8-evo-card .evo-bar{height:4px;background:rgba(99,102,241,.1);border-radius:2px;margin-top:.6rem;overflow:hidden}',
    '.v8-evo-card .evo-fill{height:100%;border-radius:2px;transition:width 1s ease-out}',
    /* Stagger animation */
    '.v8-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v8-stagger.v8-visible{opacity:1;transform:translateY(0)}',
    /* Responsive */
    '@media(max-width:768px){.v8-spot-card{grid-template-columns:1fr}.v8-growth-grid{grid-template-columns:1fr}.v8-compare-grid{grid-template-columns:1fr}.v8-toast{max-width:280px;font-size:13px}.v8-pills{gap:6px}.v8-pill{padding:5px 12px;font-size:12px}.v8-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}.v8-cmd-box{width:96%}.v8-radar-wrap{flex-direction:column}}'
  ].join('\n');
  document.head.appendChild(style);
  var oldStyle = document.getElementById('v7-patch-styles');
  if (oldStyle) oldStyle.remove();

  /* ====================================================================
   * 2. PROJECT DATA (all 13 projects — latest versions as of 2026-06-01)
   * ==================================================================== */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v5.0', tech: ['PWA'], impact: '672 topics',
      features: '672 Topics with Content/Quiz/Video, 33 Subjects (Kids 13 + Adult 20), Subject Color Cards, Progress Bars, Hero Banner, Game Meta 34, Dream Design',
      loc: 7000, date: '2026-06-01', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'672',l:'Topics'},{n:'33',l:'Subjects'},{n:'34',l:'Games'},{n:'140+',l:'Lessons'}] },
    { title: 'SmartGolf', version: 'v22.0', tech: ['Leaflet', 'PWA'], impact: '590 courses',
      features: 'Pre-shot Routine Builder 12, Club Distance 14 Canvas, Practice Journal 5, Course Strategy Notes, Goal Planner 4, Weather Club Guide, Nutrition Guide 8, Golf IQ v7, 104 Achievements, 104 SFX',
      loc: 12000, date: '2026-06-01', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'590',l:'Courses'},{n:'v22',l:'Version'},{n:'104',l:'Achievements'},{n:'PWA',l:'Offline'}] },
    { title: 'Culture Center Finder', version: 'v6.0', tech: ['Leaflet', 'PWA'], impact: '95,064 courses',
      features: 'Curriculum Roadmap 8, Center Compare Dashboard, Season Recommend 4, Monthly Calendar, Review Insight, D-Day Countdown, Aptitude Test, Weekly Digest, Encyclopedia 12, Quiz 30, 42 Achievements',
      loc: 7000, date: '2026-05-27', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'95K+',l:'Courses'},{n:'42',l:'Achievements'},{n:'30',l:'Quizzes'},{n:'8',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v9.0', tech: ['Canvas', 'PWA'], impact: '12 characters',
      features: 'Boss Battle System, Skill Tree, World Map, Inventory System, Puzzle Mode, Quiz Mode, Daily Reward, Character Encyclopedia 12, Soundtrack 7, 34+ Achievements',
      loc: 5500, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'12',l:'Characters'},{n:'v9.0',l:'Version'},{n:'7',l:'BGM'},{n:'12',l:'Guides'}] },
    { title: 'History RPG', version: 'v13.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '90 quizzes',
      features: 'Formation System 6, Hero Awakening 12, Artifact Museum 15, War Chronicle 8, Unit Encyclopedia 8, Campaign 8, Era Progress, Battle Stats Dashboard, 48 Achievements',
      loc: 8000, date: '2026-05-30', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v13.0',l:'Version'},{n:'90',l:'Quizzes'},{n:'48',l:'Achievements'},{n:'6',l:'Formations'}] },
    { title: 'Piano', version: 'v9.0', tech: ['Tone.js', 'PWA'], impact: '62 songs',
      features: 'Metronome BPM 40-220, Music Theory 15, Performance Dashboard, Transpose +/-6, Duet Mode, AI Song Recommend, Interval Training 12, 62 Songs, 48 Achievements',
      loc: 6000, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'62',l:'Songs'},{n:'48',l:'Achievements'},{n:'15',l:'Theory'},{n:'12',l:'Intervals'}] },
    { title: 'Violin', version: 'v8.0', tech: ['Tone.js', 'PWA'], impact: '54 songs',
      features: 'Interval Training 12, Ensemble 5 Tracks, Fingering Chart 4 Positions, Sight Reading, Practice Analytics, 54 Songs, 80 Lessons, 46 Achievements',
      loc: 5500, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'54',l:'Songs'},{n:'80',l:'Lessons'},{n:'46',l:'Achievements'},{n:'12',l:'Intervals'}] },
    { title: 'Karaoke', version: 'v9.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '65 songs',
      features: 'Duet Mode, Voice EQ 8, Interval Training 12, Vocal Diary, Genre Radio, Practice Dashboard, Warmup Builder 8, Difficulty Chart, 65 Songs, 42 Achievements',
      loc: 5800, date: '2026-05-27', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'65',l:'Songs'},{n:'42',l:'Achievements'},{n:'8',l:'EQ Presets'},{n:'12',l:'Intervals'}] },
    { title: 'Golf Tracker', version: 'v7.0', tech: ['Canvas', 'CV', 'PWA'], impact: 'Smart Gapping',
      features: 'Swing Grade AI, Weather Advisory, Distance Calculator, Club Gapping Chart, Warmup Routine, Golfer Profile, Trend Analysis, Goal Setting, Shot Journal',
      loc: 5500, date: '2026-05-25', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v7.0',l:'Version'},{n:'14',l:'Clubs'},{n:'AI',l:'Swing Grade'},{n:'K-means',l:'Clustering'}] },
    { title: 'Boxing Trainer', version: 'v10.0', tech: ['Three.js', 'PWA'], impact: '30 quiz',
      features: 'Sparring Simulation AI, Combo Encyclopedia 20, Round Timer, Training Calendar, Body Stat Tracker, Technique Tutorial 12, Weekly Challenge, Endurance Test, 46 Achievements',
      loc: 6200, date: '2026-05-27', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v10.0',l:'Version'},{n:'30',l:'Quiz'},{n:'46',l:'Achievements'},{n:'20',l:'Combos'}] },
    { title: 'City Builder', version: 'v7.0', tech: ['Canvas', 'PWA'], impact: '60+ buildings',
      features: 'Diplomacy 5 Nations, Policy System 12, Wonders 8, Trade Routes 6, Share Card, Daily Streak, Quiz 55, 62 Achievements, Advisor 50 Tips',
      loc: 6500, date: '2026-05-25', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60+',l:'Buildings'},{n:'62',l:'Achievements'},{n:'55',l:'Quizzes'},{n:'8',l:'Wonders'}] },
    { title: 'House Builder', version: 'v7.0', tech: ['Three.js', 'PWA'], impact: '20 furniture',
      features: 'Furniture Placement 20, Weather Effects 4, Construction Budget, Floor Plan View, Missions 8, Gallery, Material Dictionary 15, Speed Build, Quiz 45, 62 Achievements',
      loc: 5500, date: '2026-05-26', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v7.0',l:'Version'},{n:'62',l:'Achievements'},{n:'45',l:'Quizzes'},{n:'20',l:'Furniture'}] }
  ];

  var TOTAL_LOC = 90500;
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ====================================================================
   * 3. WEB AUDIO SFX (12 types: 6 from v7 + 6 new)
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
      case 'cmd_open': o.frequency.setValueAtTime(587, now); o.frequency.setValueAtTime(784, now + 0.05); o.type = 'sine'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.stop(now + 0.12); break;
      case 'cmd_select': o.frequency.setValueAtTime(1175, now); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.08); o.stop(now + 0.08); break;
      case 'radar': o.frequency.setValueAtTime(392, now); o.frequency.exponentialRampToValueAtTime(523, now + 0.1); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'evo': o.frequency.setValueAtTime(330, now); o.frequency.setValueAtTime(440, now + 0.08); o.frequency.setValueAtTime(554, now + 0.16); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'health': o.frequency.setValueAtTime(698, now); o.type = 'triangle'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1); o.stop(now + 0.1); break;
      case 'growth': o.frequency.setValueAtTime(262, now); o.frequency.exponentialRampToValueAtTime(524, now + 0.2); o.type = 'sawtooth'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22); o.stop(now + 0.22); break;
    }
    o.start(now);
  }

  /* ====================================================================
   * 4. UPDATE PROJECT CARDS (version badges + data attributes)
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

      var existingBtn = card.querySelector('.v7-compare-btn, .v8-compare-btn');
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
   * 5. FEATURED PROJECT SPOTLIGHT (auto-carousel, updated data)
   * ==================================================================== */
  var spotlightIdx = 0;
  var spotlightTimer = null;
  var SPOTLIGHT = [
    { title: 'History RPG', ver: 'v13.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '한국사 영걸전 스타일 3D 전략 RPG v13.0. 진형시스템 6종, 영웅각성 12인, 유물도감 15종, 전쟁사연대기 8편, 캠페인 8종, 퀴즈 90문, 업적 48개.',
      tags: ['Three.js', 'Canvas', 'Tactics RPG', 'Web Audio'],
      stats: [{n:'v13.0',l:'Version'},{n:'90',l:'Quizzes'},{n:'48',l:'Achievements'},{n:'6',l:'Formations'}] },
    { title: 'SmartGolf', ver: 'v22.0', tier: 'NEXTERA', tierBg: 'rgba(34,197,94,.2)', tierColor: '#4ade80',
      desc: '전국 590개 골프장 PWA v22.0. 프리샷루틴빌더 12단계, 클럽거리관리 14종, 연습일지, 코스전략노트, 골프목표플래너, Golf IQ v7, 104개 업적.',
      tags: ['Leaflet.js', 'OSRM', 'PWA', 'Canvas'],
      stats: [{n:'590',l:'Courses'},{n:'v22',l:'Version'},{n:'104',l:'Achievements'},{n:'PWA',l:'Offline'}] },
    { title: 'Piano', ver: 'v9.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: 'Tone.js 피아노 리듬게임 v9.0. 62곡 내장, 메트로놈, 음악이론 15, 조옮김 +/-6, 듀엣모드, AI곡추천, 음정트레이닝 12종, 업적 48개.',
      tags: ['Tone.js', 'Canvas', 'Rhythm Game', 'Web Audio'],
      stats: [{n:'62',l:'Songs'},{n:'48',l:'Achievements'},{n:'15',l:'Theory'},{n:'12',l:'Intervals'}] }
  ];

  function buildSpotlight() {
    var projectsSection = $('#projects');
    if (!projectsSection) return;
    var old = document.getElementById('v7-spotlight');
    if (old) old.remove();

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
   * 6. GROWTH DASHBOARD (bar charts + donut)
   * ==================================================================== */
  function buildGrowthDashboard() {
    var anchor = $('#v8-spotlight') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;
    var old = document.getElementById('v7-growth');
    if (old) old.remove();

    var section = el('section', { className: 'v8-growth', id: 'v8-growth' });
    section.innerHTML = '<h2>Project Growth Dashboard</h2><p class="v8-growth-sub">Live metrics across all 13 projects &mdash; 90,500 LOC</p>';

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
    labels.innerHTML = '<span>NEXTERA (4)</span><span>PRISM (9)</span>';
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

    var donutSvg = '<svg viewBox="0 0 200 200" width="180" height="180">';
    var r = 70, cx = 100, cy = 100, c = 2 * Math.PI * r;
    donutSvg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(99,102,241,.1)" stroke-width="20"/>';
    donutSvg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#22c55e" stroke-width="20" stroke-dasharray="' + (c * nPct).toFixed(1) + ' ' + (c * (1 - nPct)).toFixed(1) + '" stroke-dashoffset="' + (c * 0.25).toFixed(1) + '" stroke-linecap="round"/>';
    donutSvg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#6366f1" stroke-width="20" stroke-dasharray="' + (c * (1 - nPct)).toFixed(1) + ' ' + (c * nPct).toFixed(1) + '" stroke-dashoffset="' + (c * (0.25 - nPct)).toFixed(1) + '" stroke-linecap="round"/>';
    donutSvg += '<text x="' + cx + '" y="' + (cy - 5) + '" text-anchor="middle" fill="var(--text,#e2e8f0)" font-size="24" font-weight="800">' + PROJECTS.length + '</text>';
    donutSvg += '<text x="' + cx + '" y="' + (cy + 14) + '" text-anchor="middle" fill="var(--text3,#64748b)" font-size="10">PROJECTS</text>';
    donutSvg += '</svg>';

    var donutWrap = el('div', { className: 'v8-donut-wrap' });
    donutWrap.innerHTML = donutSvg +
      '<div class="v8-donut-legend">' +
        '<div class="v8-legend-item"><span class="v8-legend-dot" style="background:#22c55e"></span>NEXTERA (' + nextera.length + ') &mdash; ' + (nLoc / 1000).toFixed(1) + 'K LOC</div>' +
        '<div class="v8-legend-item"><span class="v8-legend-dot" style="background:#6366f1"></span>PRISM (' + prism.length + ') &mdash; ' + (pLoc / 1000).toFixed(1) + 'K LOC</div>' +
        '<div class="v8-legend-item" style="margin-top:.5rem;font-weight:700;color:var(--text,#e2e8f0)">Total: ' + (total / 1000).toFixed(1) + 'K LOC</div>' +
      '</div>';
    donutCard.appendChild(donutWrap);
    grid.appendChild(donutCard);

    section.appendChild(grid);
    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);

    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          playSFX('growth');
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
   * 7. PROJECT HEALTH GRID
   * ==================================================================== */
  function buildHealthGrid() {
    var anchor = $('#v8-growth') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;
    var old = document.getElementById('v7-health');
    if (old) old.remove();

    var section = el('section', { className: 'v8-health v8-stagger', id: 'v8-health' });
    section.innerHTML = '<h2>Project Health Monitor</h2><p class="v8-health-sub">Real-time status of all 13 projects</p>';

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
          playSFX('health');
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
   * 8. COMMAND PALETTE (Ctrl+K)
   * ==================================================================== */
  var cmdOverlay = null;
  var cmdActiveIdx = 0;
  var CMD_ITEMS = [
    { icon: '\u{1F3AF}', label: 'Featured Projects', hint: 'Shift+F', action: function () { scrollTo('#v8-spotlight'); } },
    { icon: '\u{1F4CA}', label: 'Growth Dashboard', hint: 'Shift+G', action: function () { scrollTo('#v8-growth'); } },
    { icon: '\u{1F3E5}', label: 'Health Monitor', hint: 'Shift+H', action: function () { scrollTo('#v8-health'); } },
    { icon: '\u{1F4E1}', label: 'Tech Radar', hint: 'Shift+R', action: function () { scrollTo('#v8-radar'); } },
    { icon: '\u{1F4C8}', label: 'Evolution Timeline', hint: 'Shift+E', action: function () { scrollTo('#v8-evo'); } },
    { icon: '\u{1F4BB}', label: 'All Projects', hint: '', action: function () { scrollTo('#projects'); } },
    { icon: '\u{1F4F0}', label: 'Latest Updates', hint: '', action: function () { scrollTo('#updates'); } },
    { icon: '\u{1F4D6}', label: 'The Story', hint: '', action: function () { scrollTo('#story'); } },
    { icon: '\u{2699}', label: 'Tech Stack', hint: '', action: function () { scrollTo('#tech'); } },
    { icon: '\u{1F51D}', label: 'Back to Top', hint: '', action: function () { window.scrollTo({ top: 0, behavior: 'smooth' }); } }
  ];

  function scrollTo(sel) {
    var target = $(sel);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  function buildCommandPalette() {
    cmdOverlay = el('div', { className: 'v8-cmd-overlay' });
    var box = el('div', { className: 'v8-cmd-box' });
    var input = el('input', { className: 'v8-cmd-input', placeholder: 'Search sections, features...', type: 'text', 'aria-label': 'Command palette search' });
    var list = el('div', { className: 'v8-cmd-list' });
    box.appendChild(input);
    box.appendChild(list);
    cmdOverlay.appendChild(box);
    document.body.appendChild(cmdOverlay);

    function renderList(filter) {
      list.innerHTML = '';
      var filtered = CMD_ITEMS.filter(function (item) {
        return !filter || item.label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });
      filtered.forEach(function (item, i) {
        var row = el('div', { className: 'v8-cmd-item' + (i === 0 ? ' active' : '') });
        row.innerHTML = '<span class="cmd-icon">' + item.icon + '</span><span class="cmd-label">' + item.label + '</span>' +
          (item.hint ? '<span class="cmd-hint">' + item.hint + '</span>' : '');
        row.addEventListener('click', function () { closeCmdPalette(); playSFX('cmd_select'); item.action(); });
        row.addEventListener('mouseenter', function () {
          $$('.v8-cmd-item').forEach(function (r) { r.classList.remove('active'); });
          row.classList.add('active');
          cmdActiveIdx = i;
        });
        list.appendChild(row);
      });
      cmdActiveIdx = 0;
    }

    input.addEventListener('input', function () { renderList(input.value); });
    input.addEventListener('keydown', function (e) {
      var items = $$('.v8-cmd-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); cmdActiveIdx = Math.min(cmdActiveIdx + 1, items.length - 1); items.forEach(function (r, i) { r.classList.toggle('active', i === cmdActiveIdx); }); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cmdActiveIdx = Math.max(cmdActiveIdx - 1, 0); items.forEach(function (r, i) { r.classList.toggle('active', i === cmdActiveIdx); }); }
      else if (e.key === 'Enter') { if (items[cmdActiveIdx]) items[cmdActiveIdx].click(); }
      else if (e.key === 'Escape') { closeCmdPalette(); }
    });

    cmdOverlay.addEventListener('click', function (e) { if (e.target === cmdOverlay) closeCmdPalette(); });
    renderList('');
  }

  function openCmdPalette() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.add('open');
    playSFX('cmd_open');
    var input = cmdOverlay.querySelector('.v8-cmd-input');
    if (input) { input.value = ''; input.dispatchEvent(new Event('input')); setTimeout(function () { input.focus(); }, 50); }
  }

  function closeCmdPalette() {
    if (cmdOverlay) cmdOverlay.classList.remove('open');
  }

  /* ====================================================================
   * 9. TECH SKILL RADAR CHART (SVG)
   * ==================================================================== */
  var SKILLS = [
    { name: 'JavaScript', pct: 96 },
    { name: 'Three.js / 3D', pct: 85 },
    { name: 'Web Audio', pct: 88 },
    { name: 'Canvas / WebGL', pct: 90 },
    { name: 'Python', pct: 92 },
    { name: 'AI Integration', pct: 94 },
    { name: 'PWA / Offline', pct: 87 },
    { name: 'Data Pipeline', pct: 83 }
  ];

  function buildRadarChart() {
    var anchor = $('#v8-health') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;

    var section = el('section', { className: 'v8-radar v8-stagger', id: 'v8-radar' });
    section.innerHTML = '<h2>Tech Skill Radar</h2><p class="v8-radar-sub">Proficiency across core technology areas</p>';

    var wrap = el('div', { className: 'v8-radar-wrap' });
    var size = 280, mid = size / 2, rMax = 110;
    var n = SKILLS.length;
    var svg = '<svg viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '">';

    for (var lvl = 1; lvl <= 4; lvl++) {
      var rr = rMax * lvl / 4;
      var pts = [];
      for (var j = 0; j < n; j++) {
        var angle = (Math.PI * 2 * j / n) - Math.PI / 2;
        pts.push((mid + rr * Math.cos(angle)).toFixed(1) + ',' + (mid + rr * Math.sin(angle)).toFixed(1));
      }
      svg += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="rgba(99,102,241,' + (0.06 + lvl * 0.03) + ')" stroke-width="1"/>';
    }

    for (var i = 0; i < n; i++) {
      var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      var ex = mid + rMax * Math.cos(angle), ey = mid + rMax * Math.sin(angle);
      svg += '<line x1="' + mid + '" y1="' + mid + '" x2="' + ex.toFixed(1) + '" y2="' + ey.toFixed(1) + '" stroke="rgba(99,102,241,.08)" stroke-width="1"/>';
      var lx = mid + (rMax + 18) * Math.cos(angle), ly = mid + (rMax + 18) * Math.sin(angle);
      var anchor = Math.abs(angle + Math.PI / 2) < 0.1 ? 'middle' : (lx > mid ? 'start' : 'end');
      svg += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 4).toFixed(1) + '" text-anchor="' + anchor + '" fill="var(--text3,#64748b)" font-size="9">' + SKILLS[i].name + '</text>';
    }

    var dataPts = [];
    for (var k = 0; k < n; k++) {
      var a2 = (Math.PI * 2 * k / n) - Math.PI / 2;
      var rVal = rMax * SKILLS[k].pct / 100;
      dataPts.push((mid + rVal * Math.cos(a2)).toFixed(1) + ',' + (mid + rVal * Math.sin(a2)).toFixed(1));
    }
    svg += '<polygon points="' + dataPts.join(' ') + '" fill="rgba(99,102,241,.15)" stroke="var(--accent,#6366f1)" stroke-width="2" stroke-linejoin="round"/>';

    for (var m = 0; m < n; m++) {
      var a3 = (Math.PI * 2 * m / n) - Math.PI / 2;
      var rv = rMax * SKILLS[m].pct / 100;
      svg += '<circle cx="' + (mid + rv * Math.cos(a3)).toFixed(1) + '" cy="' + (mid + rv * Math.sin(a3)).toFixed(1) + '" r="4" fill="var(--accent,#6366f1)" stroke="var(--bg,#0a0a1a)" stroke-width="2"/>';
    }
    svg += '</svg>';

    var svgWrap = el('div');
    svgWrap.innerHTML = svg;

    var legend = el('div', { className: 'v8-radar-legend' });
    SKILLS.forEach(function (s) {
      var leg = el('div', { className: 'v8-radar-leg' });
      leg.innerHTML = '<span style="width:90px;font-weight:600;font-size:.8rem">' + s.name.split(' ')[0] + '</span>' +
        '<div class="leg-bar"><div class="leg-fill" style="width:' + s.pct + '%"></div></div>' +
        '<span style="font-family:Courier New,monospace;font-size:.75rem;width:30px;text-align:right">' + s.pct + '%</span>';
      legend.appendChild(leg);
    });

    wrap.appendChild(svgWrap);
    wrap.appendChild(legend);
    section.appendChild(wrap);

    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);
  }

  /* ====================================================================
   * 10. PROJECT EVOLUTION TIMELINE
   * ==================================================================== */
  function buildEvoTimeline() {
    var anchor = $('#v8-radar') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;

    var section = el('section', { className: 'v8-evo v8-stagger', id: 'v8-evo' });
    section.innerHTML = '<h2>Project Evolution</h2><p class="v8-evo-sub">Version milestones for every project in the portfolio</p>';

    var grid = el('div', { className: 'v8-evo-grid' });
    var maxVer = Math.max.apply(null, PROJECTS.map(function (p) { return parseFloat(p.version.replace('v', '')); }));
    PROJECTS.forEach(function (p) {
      var verNum = parseFloat(p.version.replace('v', ''));
      var pct = Math.round(verNum / maxVer * 100);
      var clr = p.category === 'NEXTERA' ? '#22c55e' : '#6366f1';
      var card = el('div', { className: 'v8-evo-card' });
      card.innerHTML =
        '<div class="evo-name">' + p.title + '</div>' +
        '<div class="evo-ver" style="color:' + clr + '">' + p.version + '</div>' +
        '<div class="evo-date">' + p.date + '</div>' +
        '<div class="evo-bar"><div class="evo-fill" style="width:0%;background:' + clr + '" data-w="' + pct + '%"></div></div>';
      grid.appendChild(card);
    });
    section.appendChild(grid);

    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);

    var evoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          playSFX('evo');
          $$('.v8-evo-card .evo-fill').forEach(function (fill, i) {
            setTimeout(function () { fill.style.width = fill.getAttribute('data-w'); }, i * 60);
          });
          evoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    evoObserver.observe(grid);
  }

  /* ====================================================================
   * 11. TOAST NOTIFICATIONS (latest updates)
   * ==================================================================== */
  function showToasts() {
    var oldWrap = document.querySelector('.v7-toast-wrap');
    if (oldWrap) oldWrap.remove();
    var wrap = el('div', { className: 'v8-toast-wrap' });
    document.body.appendChild(wrap);
    var messages = [
      { title: 'SmartGolf v22.0', body: '프리샷루틴 12단계 + Golf IQ v7 + 104업적!' },
      { title: 'History RPG v13.0', body: '진형시스템 6종 + 영웅각성 12인 + 퀸즈 90문' },
      { title: 'Portfolio v8.0', body: '13프로젝트 전면 갱신 + Command Palette + Radar Chart' }
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
    var existing = document.querySelector('.v7-scroll-ring, .v8-scroll-ring');
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
    var existing = document.querySelector('.v7-pills, .v8-pills');
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
    var old = document.querySelector('.v7-compare-overlay, .v8-compare-overlay');
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
      if (e.key === 'Escape') { closeCompare(); closeCmdPalette(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCmdPalette();
        return;
      }
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      if (e.shiftKey && e.key === 'F') { e.preventDefault(); scrollTo('#v8-spotlight'); playSFX('nav'); }
      if (e.shiftKey && e.key === 'G') { e.preventDefault(); scrollTo('#v8-growth'); playSFX('nav'); }
      if (e.shiftKey && e.key === 'H') { e.preventDefault(); scrollTo('#v8-health'); playSFX('nav'); }
      if (e.shiftKey && e.key === 'R') { e.preventDefault(); scrollTo('#v8-radar'); playSFX('nav'); }
      if (e.shiftKey && e.key === 'E') { e.preventDefault(); scrollTo('#v8-evo'); playSFX('nav'); }
    });
  }

  /* ====================================================================
   * INIT: Run all modules on DOMContentLoaded
   * ==================================================================== */
  function init() {
    updateProjectCards();
    buildSpotlight();
    buildGrowthDashboard();
    buildHealthGrid();
    buildRadarChart();
    buildEvoTimeline();
    buildCommandPalette();
    initCompareModal();
    initFilterPills();
    initScrollRing();
    initVisitCounter();
    initKeyboard();
    showToasts();
    setTimeout(initStaggerAnimation, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
