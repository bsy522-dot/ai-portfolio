/**
 * ai-portfolio v9.0 Patch Module
 * Replaces v8_patch.js entirely.
 * Last updated: 2026-06-05
 */
;(function () {
  'use strict';
  if (window._v9) return;
  window._v9 = { version: '9.0.0', applied: Date.now() };

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
   * 1. CSS
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v9-patch-styles';
  style.textContent = [
    '.v9-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v9-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v9-toast.show{transform:translateX(0);opacity:1}',
    '.v9-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v9-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v9-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v9pulse 1.8s infinite}',
    '@keyframes v9pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v9-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v9-scroll-ring:hover{opacity:1}',
    '.v9-scroll-ring svg{transform:rotate(-90deg)}',
    '.v9-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v9-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v9-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v9-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v9-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v9-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v9-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v9-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v9-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v9-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v9-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v9-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v9-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v9-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v9-compare-col .v9c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v9-compare-col .v9c-label{color:var(--text3,#64748b)}',
    '.v9-compare-col .v9c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v9-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v9-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v9-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v9-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Spotlight */
    '.v9-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v9-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v9-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v9-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v9-spot-left{position:relative;z-index:1}',
    '.v9-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v9-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v9-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v9-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v9-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v9-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v9-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v9-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v9-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v9-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v9-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v9-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v9-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    /* Growth */
    '.v9-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v9-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '.v9-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v9-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v9-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v9-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v9-bar:hover{opacity:.85}',
    '.v9-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v9-bar:hover .bar-tip{opacity:1}',
    '.v9-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    '.v9-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v9-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v9-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v9-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health */
    '.v9-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v9-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v9-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v9-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v9-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v9-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v9-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v9-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v9-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v9-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Heatmap */
    '.v9-heatmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v9-heatmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-heatmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-heatmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v9-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v9-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v9-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v9-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v9-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    /* Metrics */
    '.v9-metrics{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v9-metrics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-metrics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem}',
    '.v9-metric-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v9-metric-card:hover{transform:translateY(-4px)}',
    '.v9-metric-num{font-size:1.8rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v9-metric-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    /* Banner */
    '.v9-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v9-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v9-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v9bannerPulse 2s ease-in-out infinite}',
    '@keyframes v9bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v9-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v9-banner-text strong{color:var(--text,#e2e8f0)}',
    /* Version Evolution */
    '.v9-evolution{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v9-evolution h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-evolution-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-evo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v9-evo-canvas{width:100%;height:220px;min-width:600px}',
    /* Tech Radar */
    '.v9-radar{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v9-radar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-radar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-radar-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v9-radar-canvas{width:320px;height:320px}',
    /* Milestone Ticker */
    '.v9-milestone{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v9-milestone h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-milestone-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-mile-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v9-mile-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.5rem;text-align:center;position:relative;overflow:hidden}',
    '.v9-mile-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 12px 12px}',
    '.v9-mile-num{font-size:2.2rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v9-mile-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    '.v9-mile-icon{font-size:1.5rem;margin-bottom:.5rem}',
    /* Pulse Board */
    '.v9-pulse-board{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v9-pulse-board h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v9-pulse-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v9-pulse-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}',
    '.v9-pulse-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;align-items:center;gap:1rem;transition:transform .2s}',
    '.v9-pulse-item:hover{transform:translateY(-2px)}',
    '.v9-pulse-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;animation:v9pulse 1.8s infinite}',
    '.v9-pulse-info{flex:1}',
    '.v9-pulse-info .p-name{font-weight:700;font-size:.9rem}',
    '.v9-pulse-info .p-ver{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600}',
    '.v9-pulse-info .p-updated{font-size:.65rem;color:var(--text3,#64748b)}',
    '.v9-pulse-score{font-size:1.2rem;font-weight:800;font-family:"Courier New",Consolas,monospace}',
    /* Stagger */
    '.v9-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v9-stagger.v9-visible{opacity:1;transform:translateY(0)}',
    /* Responsive */
    '@media(max-width:768px){.v9-spot-card{grid-template-columns:1fr}.v9-growth-grid{grid-template-columns:1fr}.v9-compare-grid{grid-template-columns:1fr}.v9-toast{max-width:280px;font-size:13px}.v9-pills{gap:6px}.v9-pill{padding:5px 12px;font-size:12px}.v9-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}.v9-metrics-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}.v9-mile-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * 2. PROJECT DATA (all 12 projects — latest versions as of 2026-06-05)
   * ================================================================ */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v6.0', tech: ['PWA'], impact: '672 topics',
      features: '33 Subjects (Kids 13 + Adult 20), Certificates Canvas, Flashcard Spaced Repetition, Gem Currency, XP Boost Events, Daily Quiz Challenge, Progress Dashboard, Avatar 20+Titles 7, Learning Stories 3, Quiz 50+, 52 Badges, SFX 8',
      loc: 8600, date: '2026-06-04', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'672',l:'Topics'},{n:'52',l:'Badges'},{n:'33',l:'Subjects'},{n:'v6',l:'Version'}] },
    { title: 'SmartGolf', version: 'v23.0', tech: ['Leaflet', 'PWA'], impact: '590 courses',
      features: 'Golf Glossary 150, Swing Checkpoint 6 Canvas, Practice Drill 12, Round Reminder D-day, Performance Trend Canvas, Course Review Stars, Golf Quotes 25, Golf IQ v8 15Q, 116 Achievements, 116 SFX',
      loc: 13000, date: '2026-06-04', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'590',l:'Courses'},{n:'v23',l:'Version'},{n:'116',l:'Achievements'},{n:'150',l:'Glossary'}] },
    { title: 'Culture Center Finder', version: 'v7.0', tech: ['Leaflet', 'PWA'], impact: '95,064 courses',
      features: 'Progress Tracker 12, Instructor Rating 5-Star, Wishlist Collections, Trend Analysis Canvas, Cost Planner, Companion Matching 6, Learning Goals, Center Check-in, Study Journal, Quiz 45, 54 Achievements',
      loc: 8200, date: '2026-06-04', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'95K+',l:'Courses'},{n:'54',l:'Achievements'},{n:'45',l:'Quizzes'},{n:'8',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v10.0', tech: ['Canvas', 'PWA'], impact: 'Card Matching',
      features: 'Card Matching 6 Pairs, Weather Effects 4 Canvas Particles, Share Card Canvas, Weekly Challenge, Battle Stats Canvas, Companions 4, Soundtrack 7 Jukebox, Game Guide 12 Tips, Quiz 30, 58 Achievements',
      loc: 6400, date: '2026-06-03', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v10',l:'Version'},{n:'58',l:'Achievements'},{n:'30',l:'Quizzes'},{n:'7',l:'BGM'}] },
    { title: 'History RPG', version: 'v14.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '105 quizzes',
      features: 'Diplomacy 5 Nations, Resource Management 4, Weather Effects 4 Canvas, Construction 5 Buildings, Trade Routes 6, Special Missions 6, Random Events 12, Tactical Map Canvas, Quiz 105, 60 Achievements',
      loc: 9200, date: '2026-06-04', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v14',l:'Version'},{n:'105',l:'Quizzes'},{n:'60',l:'Achievements'},{n:'5',l:'Nations'}] },
    { title: 'Piano', version: 'v10.0', tech: ['Tone.js', 'PWA'], impact: '72 songs',
      features: 'Sight Reading Canvas, Rhythm Training, Favorites Manager, Weekly Challenge, Share Card Canvas, Warmup Routine, Difficulty Guide, 72 Songs, 60 Achievements',
      loc: 7500, date: '2026-06-03', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'72',l:'Songs'},{n:'60',l:'Achievements'},{n:'15',l:'Theory'},{n:'v10',l:'Version'}] },
    { title: 'Violin', version: 'v9.0', tech: ['Tone.js', 'PWA'], impact: '64 songs',
      features: 'Vibrato Trainer 4 Presets Canvas, Duet Mode 5 Songs, Bowing Analysis Canvas, Share Card Canvas, Difficulty Guide, Weekly Challenge, Tone Analyzer 5-Axis Radar, Performance Journal, 64 Songs, 90 Lessons, 58 Achievements',
      loc: 6800, date: '2026-06-02', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'64',l:'Songs'},{n:'90',l:'Lessons'},{n:'58',l:'Achievements'},{n:'v9',l:'Version'}] },
    { title: 'Karaoke', version: 'v10.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '75 songs',
      features: 'Vocal Coaching 8 Techniques, Custom Playlist CRUD, Vocal Battle AI, Analysis Report 5-Axis Radar Canvas, Daily Vocal Challenge, Live Stage Canvas Particles, Lyrics Typing Game, Voice Profile, 75 Songs, Quiz 57, 54 Achievements',
      loc: 7100, date: '2026-06-03', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'75',l:'Songs'},{n:'54',l:'Achievements'},{n:'57',l:'Quizzes'},{n:'v10',l:'Version'}] },
    { title: 'Golf Tracker', version: 'v8.0', tech: ['Canvas', 'CV', 'PWA'], impact: 'WHS Handicap',
      features: 'WHS Handicap Calculator, Virtual Caddie AI, Shot Dispersion Map Canvas, Swing Tempo Trainer, Mental Game Coaching 5, Equipment Manager 14 Clubs, Score Predictor, Golf Quiz 15, 12 Achievements',
      loc: 6000, date: '2026-06-02', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v8.0',l:'Version'},{n:'14',l:'Clubs'},{n:'15',l:'Quiz'},{n:'CV',l:'Tracking'}] },
    { title: 'Boxing Trainer', version: 'v11.0', tech: ['Three.js', 'PWA'], impact: '45 quiz',
      features: 'Heart Rate Zone 5, Workout Classes 8, Punch Speed Analyzer, Recovery Stretching 8, Performance Report Canvas, Community Leaderboard, Training Plan 5, Punch Form Radar Canvas, Boxing Beats 8 BGM, Meditation Guide, Quiz 45, 58 Achievements',
      loc: 8400, date: '2026-06-03', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v11',l:'Version'},{n:'45',l:'Quiz'},{n:'58',l:'Achievements'},{n:'8',l:'BGM'}] },
    { title: 'City Builder', version: 'v8.0', tech: ['Canvas', 'PWA'], impact: '70+ quizzes',
      features: 'Transport Infra 3, Military Defense System, Festivals 4 Seasonal, Citizen Satisfaction 5, Scenario Campaign 8, Quiz 70, 74 Achievements',
      loc: 7800, date: '2026-06-02', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60+',l:'Buildings'},{n:'74',l:'Achievements'},{n:'70',l:'Quizzes'},{n:'8',l:'Campaigns'}] },
    { title: 'House Builder', version: 'v8.0', tech: ['Three.js', 'PWA'], impact: '22 interior',
      features: 'Interior Design 22, Share Card Canvas, Structural Analysis Dashboard, Camera Presets 8, Cost Simulator, Architecture Timeline 20, Daily Challenge 14, Quiz 60, 74 Achievements',
      loc: 6300, date: '2026-06-02', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v8.0',l:'Version'},{n:'74',l:'Achievements'},{n:'60',l:'Quizzes'},{n:'22',l:'Interior'}] }
  ];

  var TOTAL_LOC = PROJECTS.reduce(function(s,p){return s+p.loc},0);
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ================================================================
   * 3. WEB AUDIO SFX (14 types)
   * ================================================================ */
  var audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    return audioCtx;
  }
  function playSFX(type) {
    var ctx = getAudioCtx(); if (!ctx) return;
    var o = ctx.createOscillator(); var g = ctx.createGain();
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
      case 'evolution': o.frequency.setValueAtTime(330, now); o.frequency.exponentialRampToValueAtTime(660, now + 0.2); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'radar': o.frequency.setValueAtTime(440, now); o.frequency.setValueAtTime(554, now + 0.05); o.frequency.setValueAtTime(659, now + 0.1); o.type = 'sine'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'milestone': o.frequency.setValueAtTime(523, now); o.frequency.setValueAtTime(784, now + 0.08); o.frequency.setValueAtTime(1047, now + 0.16); o.type = 'triangle'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'pulse': o.frequency.setValueAtTime(262, now); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'velocity': o.frequency.setValueAtTime(392, now); o.frequency.setValueAtTime(523, now + 0.06); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.14); o.stop(now + 0.14); break;
      case 'connection': o.frequency.setValueAtTime(494, now); o.frequency.exponentialRampToValueAtTime(988, now + 0.12); o.type = 'sine'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
    }
    o.start(now);
  }

  /* ================================================================
   * 4. UPDATE PROJECT CARDS
   * ================================================================ */
  function updateProjectCards() {
    var cards = $$('.card');
    PROJECTS.forEach(function (proj) {
      var card = null;
      cards.forEach(function (c) {
        var titleEl = c.querySelector('.card-title');
        if (titleEl) {
          var t = titleEl.textContent.trim();
          if (t === proj.title || t === proj.title.replace(/ /g, '') ||
              proj.title.indexOf(t) !== -1 || t.indexOf(proj.title) !== -1) card = c;
        }
      });
      if (!card) return;
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      var vBadge = card.querySelector('.version-badge');
      if (vBadge) vBadge.textContent = proj.version;
      card.setAttribute('data-v9-title', proj.title);
      card.setAttribute('data-v9-version', proj.version);
      card.setAttribute('data-v9-tech', proj.tech.join(','));
      card.setAttribute('data-v9-impact', proj.impact);
      card.setAttribute('data-v9-features', proj.features);
      card.setAttribute('data-v9-loc', proj.loc);
      card.setAttribute('data-v9-category', proj.category);
      var existingBtn = card.querySelector('.v6-compare-btn, .v7-compare-btn, .v8-compare-btn, .v9-compare-btn');
      if (existingBtn) existingBtn.remove();
      var btn = el('button', { className: 'v9-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
      btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); playSFX('compare'); toggleCompareSelection(card, btn); });
      card.appendChild(btn);
      card.classList.add('v9-stagger');
    });
  }

  /* ================================================================
   * 5. WHAT'S NEW BANNER
   * ================================================================ */
  function buildBanner() {
    var ps = $('#projects'); if (!ps) return;
    var banner = el('div', { className: 'v9-banner' });
    banner.innerHTML = '<div class="v9-banner-inner">' +
      '<span class="v9-banner-badge">New in v9</span>' +
      '<div class="v9-banner-text"><strong>SmartGolf v23.0</strong> &mdash; Glossary 150, Swing Checkpoint Canvas, 116 Achievements &bull; ' +
      '<strong>History RPG v14.0</strong> &mdash; Diplomacy 5 Nations, Tactical Map Canvas &bull; ' +
      '<strong>Boxing v11.0</strong> &mdash; Heart Rate Zone, Punch Form Radar Canvas &bull; ' +
      '<strong>+9 more projects updated to latest</strong></div></div>';
    ps.parentNode.insertBefore(banner, ps);
  }

  /* ================================================================
   * 6. AGGREGATE METRICS
   * ================================================================ */
  function buildMetrics() {
    var ps = $('#projects'); if (!ps) return;
    var totalAch = 0, totalQuiz = 0, totalSongs = 0, totalVer = 0;
    PROJECTS.forEach(function(p) {
      var ver = parseFloat(p.version.replace('v','')); totalVer += ver;
      p.stats.forEach(function(s) {
        var n = parseInt(s.n.replace(/[^0-9]/g,''),10); if (isNaN(n)) return;
        if (s.l === 'Achievements') totalAch += n;
        if (s.l === 'Quizzes' || s.l === 'Quiz') totalQuiz += n;
        if (s.l === 'Songs') totalSongs += n;
      });
    });
    var section = el('section', { className: 'v9-metrics v9-stagger', id: 'v9-metrics' });
    section.innerHTML = '<h2>Aggregate Metrics</h2><p class="v9-metrics-sub">Cross-project statistics at a glance</p>';
    var grid = el('div', { className: 'v9-metrics-grid' });
    [{n:PROJECTS.length,l:'Live Projects'},{n:TOTAL_LOC.toLocaleString(),l:'Lines of Code'},{n:totalAch+'+',l:'Achievements'},{n:totalQuiz+'+',l:'Quiz Questions'},{n:totalSongs+'+',l:'Songs & Tracks'},{n:Math.round(totalVer),l:'Combined Versions'}].forEach(function(m) {
      var c = el('div', { className: 'v9-metric-card' });
      c.innerHTML = '<div class="v9-metric-num">' + m.n + '</div><div class="v9-metric-lbl">' + m.l + '</div>';
      grid.appendChild(c);
    });
    section.appendChild(grid);
    ps.parentNode.insertBefore(section, ps);
  }

  /* ================================================================
   * 7. FEATURED SPOTLIGHT
   * ================================================================ */
  var spotIdx = 0, spotTimer = null;
  var SPOTLIGHT = [
    { title: 'History RPG', ver: 'v14.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '한국사 영걸전 v14.0. 외교시스템 5국, 자원관리 4종, 날씨효과 4종 Canvas, 건축 5종, 교역 6로, 특수임무 6종, 랜덤이벤트 12종, 전술지도 Canvas, 퀴즈 105문, 업적 60개.',
      tags: ['Three.js', 'Canvas', 'Tactics RPG', 'Web Audio'],
      stats: [{n:'v14',l:'Version'},{n:'105',l:'Quizzes'},{n:'60',l:'Achievements'},{n:'5',l:'Nations'}] },
    { title: 'SmartGolf', ver: 'v23.0', tier: 'NEXTERA', tierBg: 'rgba(34,197,94,.2)', tierColor: '#4ade80',
      desc: '전국 590개 골프장 PWA v23.0. 골프용어사전 150개, 스윙체크포인트 6단계 Canvas, 연습드릴 12종, 퍼포먼스트렌드 Canvas, 코스리뷰 별점, 116개 업적, 116종 SFX.',
      tags: ['Leaflet.js', 'OSRM', 'PWA', 'Canvas'],
      stats: [{n:'590',l:'Courses'},{n:'v23',l:'Version'},{n:'116',l:'Achievements'},{n:'150',l:'Glossary'}] },
    { title: 'Boxing Trainer', ver: 'v11.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '3D 복싱 트레이너 v11.0. 심박수존 5단계, 워크아웃클래스 8종, 펀치스피드 분석기, 퍼포먼스 리포트 Canvas, 펀치폼 6축 레이더, 복싱비트 8곡 BGM, 명상호흡, 퀴즈 45문, 업적 58개.',
      tags: ['Three.js', '3D', 'Web Audio', 'Canvas'],
      stats: [{n:'v11',l:'Version'},{n:'58',l:'Achievements'},{n:'45',l:'Quiz'},{n:'8',l:'BGM'}] }
  ];

  function buildSpotlight() {
    var ps = $('#projects'); if (!ps) return;
    var section = el('section', { className: 'v9-spotlight', id: 'v9-spotlight' });
    section.innerHTML = '<h2>Featured Projects</h2><p class="v9-spotlight-sub">Spotlight on our most ambitious builds</p>';
    var cw = el('div', { className: 'v9-spot-card' }); section.appendChild(cw);
    var nav = el('div', { className: 'v9-spot-nav' });
    SPOTLIGHT.forEach(function (_, i) {
      var dot = el('button', { className: 'v9-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Spotlight ' + (i + 1) });
      dot.addEventListener('click', function () { goSpot(i); playSFX('spotlight'); });
      nav.appendChild(dot);
    });
    section.appendChild(nav);
    ps.parentNode.insertBefore(section, ps);
    renderSpot(0);
    spotTimer = setInterval(function () { goSpot((spotIdx + 1) % SPOTLIGHT.length); }, 6000);
  }

  function goSpot(i) {
    spotIdx = i; renderSpot(i);
    $$('.v9-spot-dot').forEach(function (d, j) { d.classList.toggle('active', j === i); });
    if (spotTimer) { clearInterval(spotTimer); spotTimer = setInterval(function () { goSpot((spotIdx + 1) % SPOTLIGHT.length); }, 6000); }
  }

  function renderSpot(i) {
    var s = SPOTLIGHT[i]; var card = $('.v9-spot-card'); if (!card) return;
    card.innerHTML =
      '<div class="v9-spot-left"><span class="spot-tier" style="background:' + s.tierBg + ';color:' + s.tierColor + '">' + s.tier + '</span>' +
      '<div class="spot-title">' + s.title + '</div><div class="spot-ver">' + s.ver + '</div>' +
      '<div class="spot-desc">' + s.desc + '</div>' +
      '<div class="spot-tags">' + s.tags.map(function(t){return '<span>' + t + '</span>';}).join('') + '</div></div>' +
      '<div class="v9-spot-right">' + s.stats.map(function(st){return '<div class="v9-spot-stat"><div class="s-num">' + st.n + '</div><div class="s-lbl">' + st.l + '</div></div>';}).join('') + '</div>';
  }

  /* ================================================================
   * 8. GROWTH DASHBOARD
   * ================================================================ */
  function buildGrowth() {
    var anchor = $('#v9-spotlight') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-growth', id: 'v9-growth' });
    section.innerHTML = '<h2>Project Growth Dashboard</h2><p class="v9-growth-sub">Live metrics across all ' + PROJECTS.length + ' projects &mdash; ' + TOTAL_LOC.toLocaleString() + ' total LOC</p>';
    var grid = el('div', { className: 'v9-growth-grid' });
    var locCard = el('div', { className: 'v9-growth-card' }); locCard.innerHTML = '<h3>Lines of Code by Project</h3>';
    var barChart = el('div', { className: 'v9-bar-chart' });
    var maxLoc = Math.max.apply(null, PROJECTS.map(function(p){return p.loc;}));
    PROJECTS.forEach(function(p) {
      var pct = (p.loc / maxLoc * 100).toFixed(0);
      var bar = el('div', { className: 'v9-bar' });
      bar.style.height = '0%';
      bar.style.background = p.category === 'NEXTERA' ? 'linear-gradient(180deg,#22c55e,#16a34a)' : 'linear-gradient(180deg,#6366f1,#4f46e5)';
      bar.innerHTML = '<span class="bar-tip">' + p.title.split(' ')[0] + ' ' + p.loc.toLocaleString() + '</span>';
      bar.setAttribute('data-height', pct); bar.title = p.title + ': ' + p.loc.toLocaleString() + ' LOC';
      barChart.appendChild(bar);
    });
    locCard.appendChild(barChart);
    locCard.appendChild(el('div', { className: 'v9-bar-label', innerHTML: '<span>NEXTERA (3)</span><span>PRISM (9)</span>' }));
    grid.appendChild(locCard);

    var donutCard = el('div', { className: 'v9-growth-card' }); donutCard.innerHTML = '<h3>Project Categories</h3>';
    var nex = PROJECTS.filter(function(p){return p.category === 'NEXTERA';}), pri = PROJECTS.filter(function(p){return p.category === 'PRISM';});
    var nL = nex.reduce(function(s,p){return s+p.loc;},0), pL = pri.reduce(function(s,p){return s+p.loc;},0), tot = nL + pL, nP = nL / tot;
    var r = 70, cx = 100, cy = 100, c = 2 * Math.PI * r;
    var dWrap = el('div', { className: 'v9-donut-wrap' });
    dWrap.innerHTML = '<svg viewBox="0 0 200 200" width="180" height="180">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(99,102,241,.1)" stroke-width="20"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#22c55e" stroke-width="20" stroke-dasharray="' + (c*nP).toFixed(1) + ' ' + (c*(1-nP)).toFixed(1) + '" stroke-dashoffset="' + (c*0.25).toFixed(1) + '" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#6366f1" stroke-width="20" stroke-dasharray="' + (c*(1-nP)).toFixed(1) + ' ' + (c*nP).toFixed(1) + '" stroke-dashoffset="' + (c*(0.25-nP)).toFixed(1) + '" stroke-linecap="round"/>' +
      '<text x="' + cx + '" y="' + (cy-5) + '" text-anchor="middle" fill="var(--text,#e2e8f0)" font-size="24" font-weight="800">' + PROJECTS.length + '</text>' +
      '<text x="' + cx + '" y="' + (cy+14) + '" text-anchor="middle" fill="var(--text3,#64748b)" font-size="10">PROJECTS</text></svg>' +
      '<div class="v9-donut-legend"><div class="v9-legend-item"><span class="v9-legend-dot" style="background:#22c55e"></span>NEXTERA (' + nex.length + ') &mdash; ' + (nL/1000).toFixed(1) + 'K LOC</div>' +
      '<div class="v9-legend-item"><span class="v9-legend-dot" style="background:#6366f1"></span>PRISM (' + pri.length + ') &mdash; ' + (pL/1000).toFixed(1) + 'K LOC</div>' +
      '<div class="v9-legend-item" style="margin-top:.5rem;font-weight:700;color:var(--text,#e2e8f0)">Total: ' + TOTAL_LOC.toLocaleString() + ' LOC</div></div>';
    donutCard.appendChild(dWrap); grid.appendChild(donutCard);
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var bo = new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){$$('.v9-bar').forEach(function(b,i){setTimeout(function(){b.style.height=b.getAttribute('data-height')+'%';},i*60);});bo.unobserve(en.target);}});},{threshold:.2});
    bo.observe(barChart);
  }

  /* ================================================================
   * 9. PROJECT HEALTH GRID
   * ================================================================ */
  function buildHealth() {
    var anchor = $('#v9-growth') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-health v9-stagger', id: 'v9-health' });
    section.innerHTML = '<h2>Project Health Monitor</h2><p class="v9-health-sub">Real-time status of all ' + PROJECTS.length + ' projects</p>';
    var grid = el('div', { className: 'v9-health-grid' });
    PROJECTS.forEach(function(p) {
      var vn = parseFloat(p.version.replace('v',''));
      var score = Math.min(100, Math.round(vn * 5.5 + p.loc / 130));
      var color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#f43f5e';
      var vBg = p.category === 'NEXTERA' ? 'rgba(34,197,94,.15);color:#4ade80' : 'rgba(99,102,241,.15);color:#a5b4fc';
      var item = el('div', { className: 'v9-health-item' });
      item.innerHTML = '<div class="h-head"><span class="h-name">' + p.title + '</span><span class="h-ver" style="background:' + vBg + '">' + p.version + '</span></div>' +
        '<div class="h-bar"><div class="h-fill" style="width:0%;background:' + color + '" data-w="' + score + '%"></div></div>' +
        '<div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span>Score: ' + score + '</span></div>';
      grid.appendChild(item);
    });
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var ho = new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){$$('.v9-health-item .h-fill').forEach(function(f,i){setTimeout(function(){f.style.width=f.getAttribute('data-w');},i*50);});ho.unobserve(en.target);}});},{threshold:.15});
    ho.observe(grid);
  }

  /* ================================================================
   * 10. CONTRIBUTION HEATMAP
   * ================================================================ */
  function buildHeatmap() {
    var anchor = $('#v9-health') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-heatmap v9-stagger', id: 'v9-heatmap' });
    section.innerHTML = '<h2>Development Activity</h2><p class="v9-heatmap-sub">Project update frequency over the past 13 weeks</p>';
    var card = el('div', { className: 'v9-heatmap-card' }), grid = el('div', { className: 'v9-heatmap-grid' });
    var dates = {
      '2026-06-05': ['AI Portfolio v9'],
      '2026-06-04': ['SmartGolf v23', 'LevelPlay v6', 'Culture Center v7', 'History RPG v14'],
      '2026-06-03': ['Hatcuping v10', 'Piano v10', 'Karaoke v10', 'Boxing v11'],
      '2026-06-02': ['Violin v9', 'Golf Tracker v8', 'City Builder v8', 'House Builder v8'],
      '2026-06-01': ['SmartGolf v22', 'LevelPlay v5', 'AI Portfolio v8'],
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
      '2026-05-12': ['City Builder v5', 'AI Portfolio v5']
    };
    var today = new Date(2026, 5, 5), start = new Date(today);
    start.setDate(start.getDate() - 90);
    for (var w = 0; w < 13; w++) for (var d = 0; d < 7; d++) {
      var cd = new Date(start); cd.setDate(cd.getDate() + w * 7 + d);
      var ds = cd.getFullYear() + '-' + ('0' + (cd.getMonth()+1)).slice(-2) + '-' + ('0' + cd.getDate()).slice(-2);
      var ups = dates[ds] || []; var lv = Math.min(4, ups.length);
      var cols = ['rgba(99,102,241,.06)','rgba(99,102,241,.25)','rgba(99,102,241,.45)','rgba(99,102,241,.7)','rgba(99,102,241,.95)'];
      var cell = el('div', { className: 'v9-hm-cell' }); cell.style.background = cols[lv];
      cell.title = ups.length > 0 ? ds + ': ' + ups.join(', ') : ds;
      grid.appendChild(cell);
    }
    card.appendChild(grid);
    card.appendChild(el('div', { className: 'v9-hm-legend', innerHTML: 'Less <span style="background:rgba(99,102,241,.06)"></span><span style="background:rgba(99,102,241,.25)"></span><span style="background:rgba(99,102,241,.45)"></span><span style="background:rgba(99,102,241,.7)"></span><span style="background:rgba(99,102,241,.95)"></span> More' }));
    section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
  }

  /* ================================================================
   * 11. VERSION EVOLUTION TIMELINE (Canvas)
   * ================================================================ */
  function buildEvolution() {
    var anchor = $('#v9-heatmap') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-evolution v9-stagger', id: 'v9-evolution' });
    section.innerHTML = '<h2>Version Evolution</h2><p class="v9-evolution-sub">How each project has grown through auto-evolution</p>';
    var card = el('div', { className: 'v9-evo-card' });
    var canvas = el('canvas', { className: 'v9-evo-canvas' }); canvas.width = 900; canvas.height = 220;
    card.appendChild(canvas); section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);

    var evoObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { drawEvolution(canvas); evoObs.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    evoObs.observe(canvas);
  }

  function drawEvolution(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = canvas.width, H = canvas.height;
    var pad = { top: 20, bottom: 30, left: 60, right: 20 };
    var chartW = W - pad.left - pad.right, chartH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);
    var maxVer = Math.max.apply(null, PROJECTS.map(function(p){return parseFloat(p.version.replace('v',''));}));
    var colors = ['#22c55e','#16a34a','#4ade80','#22d3ee','#6366f1','#8b5cf6','#a78bfa','#f43f5e','#f59e0b','#fbbf24','#14b8a6','#fb7185'];

    for (var g = 0; g <= 4; g++) {
      var gy = pad.top + chartH - (g / 4) * chartH;
      ctx.strokeStyle = 'rgba(99,102,241,.08)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(W - pad.right, gy); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText('v' + (maxVer * g / 4).toFixed(0), pad.left - 8, gy + 4);
    }

    PROJECTS.forEach(function(p, i) {
      var ver = parseFloat(p.version.replace('v',''));
      var x = pad.left + (i / (PROJECTS.length - 1)) * chartW;
      var y = pad.top + chartH - (ver / maxVer) * chartH;
      var col = colors[i % colors.length];
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.3; ctx.stroke(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(p.title.split(' ')[0], x, H - 8);
      ctx.fillStyle = col; ctx.font = 'bold 10px monospace';
      ctx.fillText(p.version, x, y - 14);
    });

    if (PROJECTS.length > 1) {
      ctx.beginPath(); ctx.strokeStyle = 'rgba(99,102,241,.2)'; ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
      PROJECTS.forEach(function(p, i) {
        var ver = parseFloat(p.version.replace('v',''));
        var x = pad.left + (i / (PROJECTS.length - 1)) * chartW;
        var y = pad.top + chartH - (ver / maxVer) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke(); ctx.setLineDash([]);
    }
  }

  /* ================================================================
   * 12. TECHNOLOGY RADAR (Canvas)
   * ================================================================ */
  function buildRadar() {
    var anchor = $('#v9-evolution') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-radar v9-stagger', id: 'v9-radar' });
    section.innerHTML = '<h2>Technology Radar</h2><p class="v9-radar-sub">Skill proficiency across 8 technology domains</p>';
    var card = el('div', { className: 'v9-radar-card' });
    var canvas = el('canvas', { className: 'v9-radar-canvas' }); canvas.width = 320; canvas.height = 320;
    card.appendChild(canvas); section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);

    var radarObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { drawRadar(canvas); radarObs.unobserve(entry.target); }
      });
    }, { threshold: 0.3 });
    radarObs.observe(canvas);
  }

  function drawRadar(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, R = 120;
    var axes = ['Frontend', '3D/WebGL', 'Audio', 'Data', 'AI', 'PWA', 'Canvas', 'Game'];
    var values = [95, 80, 85, 88, 92, 90, 88, 82];
    var n = axes.length;
    ctx.clearRect(0, 0, W, H);

    for (var ring = 1; ring <= 4; ring++) {
      var rr = R * ring / 4;
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var x = cx + rr * Math.cos(angle), y = cy + rr * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(99,102,241,' + (ring === 4 ? '.15' : '.08') + ')'; ctx.lineWidth = 1; ctx.stroke();
    }

    for (var i = 0; i < n; i++) {
      var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = 'rgba(99,102,241,.1)'; ctx.lineWidth = 1; ctx.stroke();
      var lx = cx + (R + 18) * Math.cos(angle), ly = cy + (R + 18) * Math.sin(angle);
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(axes[i], lx, ly);
    }

    ctx.beginPath();
    for (var i = 0; i <= n; i++) {
      var idx = i % n;
      var angle = (Math.PI * 2 * idx / n) - Math.PI / 2;
      var vr = R * values[idx] / 100;
      var x = cx + vr * Math.cos(angle), y = cy + vr * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.fillStyle = 'rgba(99,102,241,.15)'; ctx.fill();
    ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.stroke();

    for (var i = 0; i < n; i++) {
      var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      var vr = R * values[i] / 100;
      var x = cx + vr * Math.cos(angle), y = cy + vr * Math.sin(angle);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#6366f1'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(99,102,241,.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    }
  }

  /* ================================================================
   * 13. MILESTONE TICKER
   * ================================================================ */
  function buildMilestone() {
    var anchor = $('#v9-radar') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-milestone v9-stagger', id: 'v9-milestone' });
    section.innerHTML = '<h2>Milestones Reached</h2><p class="v9-milestone-sub">Key achievements across the NEXTERA+PRISM ecosystem</p>';
    var grid = el('div', { className: 'v9-mile-grid' });
    var milestones = [
      {icon:'&#x1F4BB;',num:TOTAL_LOC,label:'Lines of Code',color:'#6366f1'},
      {icon:'&#x1F3AE;',num:12,label:'Live Projects',color:'#22d3ee'},
      {icon:'&#x1F3C6;',num:724,label:'Total Achievements',color:'#f59e0b'},
      {icon:'&#x1F4DD;',num:547,label:'Quiz Questions',color:'#22c55e'},
      {icon:'&#x1F3B5;',num:211,label:'Songs & Tracks',color:'#f43f5e'},
      {icon:'&#x1F527;',num:143,label:'Combined Versions',color:'#8b5cf6'}
    ];
    milestones.forEach(function(m) {
      var card = el('div', { className: 'v9-mile-card' });
      card.innerHTML = '<div class="v9-mile-icon">' + m.icon + '</div><div class="v9-mile-num" data-target="' + m.num + '">0</div><div class="v9-mile-lbl">' + m.label + '</div>';
      card.style.cssText += ';--mile-color:' + m.color;
      card.querySelector('.v9-mile-card, div').style.setProperty && card.style.setProperty('--mile-color', m.color);
      var afterStyle = 'background:' + m.color;
      card.setAttribute('style', card.getAttribute('style') + ';border-bottom:3px solid ' + m.color);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);

    var mileObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { animateCounters(); mileObs.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    mileObs.observe(grid);
  }

  function animateCounters() {
    $$('.v9-mile-num[data-target]').forEach(function(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var duration = 1500, start = Date.now();
      function tick() {
        var elapsed = Date.now() - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(eased * target);
        el.textContent = current >= 1000 ? current.toLocaleString() : current;
        if (progress < 1) requestAnimationFrame(tick);
      }
      tick();
    });
  }

  /* ================================================================
   * 14. LIVE PULSE BOARD
   * ================================================================ */
  function buildPulseBoard() {
    var anchor = $('#v9-milestone') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v9-pulse-board v9-stagger', id: 'v9-pulse' });
    section.innerHTML = '<h2>Live Project Pulse</h2><p class="v9-pulse-sub">Real-time development status of all projects</p>';
    var grid = el('div', { className: 'v9-pulse-grid' });
    var now = new Date(2026, 5, 5);
    PROJECTS.forEach(function(p) {
      var pDate = new Date(p.date);
      var daysAgo = Math.floor((now - pDate) / 86400000);
      var freshness = daysAgo <= 1 ? '#22c55e' : daysAgo <= 3 ? '#f59e0b' : '#f43f5e';
      var statusText = daysAgo === 0 ? 'Updated today' : daysAgo === 1 ? 'Updated yesterday' : daysAgo + ' days ago';
      var verNum = parseFloat(p.version.replace('v',''));
      var score = Math.min(100, Math.round(verNum * 5.5 + p.loc / 130));
      var item = el('div', { className: 'v9-pulse-item' });
      item.innerHTML =
        '<div class="v9-pulse-dot" style="background:' + freshness + '"></div>' +
        '<div class="v9-pulse-info"><div class="p-name">' + p.title + '</div><div class="p-ver">' + p.version + ' &bull; ' + p.category + '</div><div class="p-updated">' + statusText + '</div></div>' +
        '<div class="v9-pulse-score" style="color:' + freshness + '">' + score + '</div>';
      grid.appendChild(item);
    });
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
  }

  /* ================================================================
   * 15. TOAST NOTIFICATIONS
   * ================================================================ */
  function showToasts() {
    var wrap = el('div', { className: 'v9-toast-wrap' }); document.body.appendChild(wrap);
    var msgs = [
      { title: 'SmartGolf v23.0', body: '116개 업적 + 골프용어사전 150개 업데이트!' },
      { title: 'History RPG v14.0', body: '외교시스템 5국 + 전술지도 Canvas 추가' },
      { title: 'Portfolio v9.0', body: '12프로젝트 전면갱신 + Evolution + Radar + Milestone' }
    ];
    msgs.forEach(function(msg, i) {
      setTimeout(function() {
        playSFX('toast');
        var t = el('div', { className: 'v9-toast', innerHTML: '<div class="toast-title">' + msg.title + '</div><div>' + msg.body + '</div>' });
        wrap.appendChild(t);
        requestAnimationFrame(function(){t.classList.add('show');});
        setTimeout(function(){t.classList.remove('show');setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},400);},4000);
      }, 800 + i * 1200);
    });
  }

  /* ================================================================
   * 16. VISIT COUNTER
   * ================================================================ */
  function initVisitCounter() {
    var key = 'v9_visit_count';
    var count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, count);
    var target = $('.hero-content, .hero');
    if (!target) return;
    var existing = target.querySelector('.v9-visit, .v8-visit, .v7-visit, .v6-visit');
    if (existing) existing.remove();
    var v = el('div', { className: 'v9-visit' }, [el('span', { className: 'v9-pulse' }), document.createTextNode(count + ' visits')]);
    target.appendChild(v);
  }

  /* ================================================================
   * 17. SCROLL PROGRESS RING
   * ================================================================ */
  function initScrollRing() {
    var existing = document.querySelector('.v6-scroll-ring, .v7-scroll-ring, .v8-scroll-ring, .v9-scroll-ring');
    if (existing) existing.remove();
    var r = 20, c = 2 * Math.PI * r;
    var container = el('div', { className: 'v9-scroll-ring', 'aria-label': 'Scroll progress' });
    container.innerHTML = '<svg viewBox="0 0 48 48" width="48" height="48"><circle class="ring-bg" cx="24" cy="24" r="' + r + '"/><circle class="ring-fg" cx="24" cy="24" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + c + '"/><polygon class="ring-arrow" points="24,14 30,22 26,22 26,32 22,32 22,22 18,22"/></svg>';
    document.body.appendChild(container);
    var fg = container.querySelector('.ring-fg');
    window.addEventListener('scroll', function() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      fg.style.strokeDashoffset = c * (1 - (dh > 0 ? st / dh : 0));
    }, { passive: true });
    container.addEventListener('click', function(){playSFX('scroll');window.scrollTo({top:0,behavior:'smooth'});});
  }

  /* ================================================================
   * 18. TECH FILTER PILLS
   * ================================================================ */
  function initFilterPills() {
    var sb = $('.search-bar'); if (!sb) return;
    var existing = document.querySelector('.v6-pills, .v7-pills, .v8-pills, .v9-pills');
    if (existing) existing.remove();
    var wrap = el('div', { className: 'v9-pills' });
    TECH_LIST.forEach(function(tech) {
      var pill = el('button', { className: 'v9-pill' + (tech === 'All' ? ' active' : ''), textContent: tech });
      pill.addEventListener('click', function() {
        playSFX('filter');
        $$('.v9-pill').forEach(function(p){p.classList.remove('active');});
        pill.classList.add('active'); filterCards(tech);
      });
      wrap.appendChild(pill);
    });
    sb.parentNode.insertBefore(wrap, sb.nextSibling);
  }

  function filterCards(tech) {
    $$('[data-v9-tech]').forEach(function(card) {
      var techs = card.getAttribute('data-v9-tech') || '';
      if (tech === 'All' || techs.indexOf(tech) !== -1) { card.style.display = ''; card.style.opacity = '1'; card.style.transform = ''; }
      else { card.style.opacity = '0'; card.style.transform = 'scale(0.95)'; setTimeout(function(){if(card.style.opacity==='0')card.style.display='none';},300); }
    });
  }

  /* ================================================================
   * 19. COMPARE MODE
   * ================================================================ */
  var compareQueue = [], overlay = null;
  function initCompareModal() {
    var old = document.querySelector('.v6-compare-overlay, .v7-compare-overlay, .v8-compare-overlay, .v9-compare-overlay');
    if (old) old.remove();
    overlay = el('div', { className: 'v9-compare-overlay' });
    overlay.innerHTML = '<div class="v9-compare-box"><button class="v9-compare-close" aria-label="Close">&times;</button><h3>Project Comparison</h3><div class="v9-compare-grid"></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e){if(e.target===overlay)closeCompare();});
    overlay.querySelector('.v9-compare-close').addEventListener('click', closeCompare);
  }
  function toggleCompareSelection(card, btn) {
    var idx = compareQueue.indexOf(card);
    if (idx !== -1) { compareQueue.splice(idx, 1); btn.classList.remove('selected'); btn.textContent = 'Compare'; return; }
    if (compareQueue.length >= 2) { var old = compareQueue.shift(); var ob = old.querySelector('.v9-compare-btn'); if (ob) {ob.classList.remove('selected');ob.textContent='Compare';} }
    compareQueue.push(card); btn.classList.add('selected'); btn.textContent = 'Selected';
    if (compareQueue.length === 2) openCompare(compareQueue[0], compareQueue[1]);
  }
  function openCompare(a, b) {
    if (!overlay) return;
    var grid = overlay.querySelector('.v9-compare-grid'); grid.innerHTML = '';
    [a, b].forEach(function(card) {
      var col = el('div', { className: 'v9-compare-col' });
      var rows = [['Version',card.getAttribute('data-v9-version')||'-'],['Tech',card.getAttribute('data-v9-tech')||'-'],['Impact',card.getAttribute('data-v9-impact')||'-'],['LOC',(parseInt(card.getAttribute('data-v9-loc')||'0',10)).toLocaleString()],['Category',card.getAttribute('data-v9-category')||'-'],['Features',card.getAttribute('data-v9-features')||'-']];
      col.innerHTML = '<h4>' + (card.getAttribute('data-v9-title')||'Unknown') + '</h4>' + rows.map(function(r){return '<div class="v9c-row"><span class="v9c-label">' + r[0] + '</span><span class="v9c-val">' + r[1] + '</span></div>';}).join('');
      grid.appendChild(col);
    });
    overlay.classList.add('open');
  }
  function closeCompare() {
    if (overlay) overlay.classList.remove('open');
    compareQueue.forEach(function(card){var btn=card.querySelector('.v9-compare-btn');if(btn){btn.classList.remove('selected');btn.textContent='Compare';}});
    compareQueue = [];
  }

  /* ================================================================
   * 20. STAGGER ANIMATION
   * ================================================================ */
  function initStagger() {
    if (!('IntersectionObserver' in window)) { $$('.v9-stagger').forEach(function(e){e.classList.add('v9-visible');}); return; }
    var obs = new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){var idx=parseInt(entry.target.getAttribute('data-v9-si')||'0',10);setTimeout(function(){entry.target.classList.add('v9-visible');},idx*80);obs.unobserve(entry.target);}});},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    $$('.v9-stagger').forEach(function(e,i){e.setAttribute('data-v9-si',i%6);obs.observe(e);});
  }

  /* ================================================================
   * 21. KEYBOARD SHORTCUTS
   * ================================================================ */
  function initKeyboard() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCompare();
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      var map = {F:'v9-spotlight',G:'v9-growth',H:'v9-health',M:'v9-metrics',A:'v9-heatmap',T:'v9-evolution',R:'v9-radar',L:'v9-milestone',P:'v9-pulse'};
      if (e.shiftKey && map[e.key]) {
        e.preventDefault();
        var t = $('#' + map[e.key]);
        if (t) { t.scrollIntoView({behavior:'smooth'}); playSFX('nav'); }
      }
    });
  }

  /* ================================================================
   * 22. UPDATE SEO META
   * ================================================================ */
  function updateMeta() {
    var desc = 'BSY Developer Portfolio v9.0 — 12 interactive web apps auto-evolving: SmartGolf v23.0, History RPG v14.0, Boxing v11.0, Piano v10.0, Karaoke v10.0, Violin v9.0 and more. ' + TOTAL_LOC.toLocaleString() + '+ lines of code. Built with Three.js, Tone.js, Leaflet, Canvas, PWA.';
    var metaDesc = $('meta[name="description"]'); if (metaDesc) metaDesc.setAttribute('content', desc);
    var ogDesc = $('meta[property="og:description"]'); if (ogDesc) ogDesc.setAttribute('content', desc);
    var ogTitle = $('meta[property="og:title"]'); if (ogTitle) ogTitle.setAttribute('content', 'BSY Portfolio v9.0 — 12 Interactive Web Apps, ' + TOTAL_LOC.toLocaleString() + '+ LOC');
    var twTitle = $('meta[name="twitter:title"]'); if (twTitle) twTitle.setAttribute('content', 'BSY Portfolio v9.0 — 12 Interactive Web Apps');
    var twDesc = $('meta[name="twitter:description"]'); if (twDesc) twDesc.setAttribute('content', desc);
  }

  /* ================================================================
   * 23. CLEAN OLD PATCHES
   * ================================================================ */
  function cleanOld() {
    ['v5-patch-styles','v6-patch-styles','v7-patch-styles','v8-patch-styles'].forEach(function(id){var s=document.getElementById(id);if(s)s.remove();});
    ['_v5','_v6','_v7','_v8'].forEach(function(k){if(window[k]){try{delete window[k];}catch(e){window[k]=undefined;}}});
    $$('.v6-scroll-ring,.v6-pills,.v6-compare-overlay,.v6-toast-wrap,.v6-visit,.v7-scroll-ring,.v7-pills,.v7-compare-overlay,.v7-toast-wrap,.v7-visit,.v7-spotlight,.v7-growth,.v7-health,.v8-scroll-ring,.v8-pills,.v8-compare-overlay,.v8-toast-wrap,.v8-visit,.v8-spotlight,.v8-growth,.v8-health,.v8-heatmap,.v8-metrics,.v8-banner').forEach(function(e){e.remove();});
    $$('[class*="v5-"],[class*="v6-"],[class*="v7-"],[class*="v8-"]').forEach(function(e) {
      if (e.tagName === 'STYLE' || e.tagName === 'SCRIPT') return;
      if (e.id && e.id.indexOf('v8') === 0) e.remove();
    });
  }

  /* ================================================================
   * INIT
   * ================================================================ */
  function init() {
    cleanOld();
    updateMeta();
    updateProjectCards();
    initCompareModal();
    initFilterPills();
    buildBanner();
    buildMetrics();
    buildSpotlight();
    buildGrowth();
    buildHealth();
    buildHeatmap();
    buildEvolution();
    buildRadar();
    buildMilestone();
    buildPulseBoard();
    initVisitCounter();
    initScrollRing();
    initStagger();
    initKeyboard();
    setTimeout(showToasts, 1500);
    console.log('[v9_patch] Applied successfully — v' + window._v9.version + ' | ' + TOTAL_LOC.toLocaleString() + ' LOC across ' + PROJECTS.length + ' projects');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
