/**
 * ai-portfolio v7.0 Patch Module
 * Replaces v6_patch.js entirely.
 * Injected via Service Worker into index.html.
 * Last updated: 2026-05-25
 */
;(function () {
  'use strict';
  if (window._v7) return;
  window._v7 = { version: '7.0.0', applied: Date.now() };

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
  style.id = 'v7-patch-styles';
  style.textContent = [
    /* Toast */
    '.v7-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v7-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v7-toast.show{transform:translateX(0);opacity:1}',
    '.v7-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    /* Visit counter */
    '.v7-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v7-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v7pulse 1.8s infinite}',
    '@keyframes v7pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    /* Scroll ring */
    '.v7-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v7-scroll-ring:hover{opacity:1}',
    '.v7-scroll-ring svg{transform:rotate(-90deg)}',
    '.v7-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v7-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v7-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    /* Tech pills */
    '.v7-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v7-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v7-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v7-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    /* Compare overlay */
    '.v7-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v7-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v7-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v7-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v7-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v7-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v7-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v7-compare-col .v7c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v7-compare-col .v7c-label{color:var(--text3,#64748b)}',
    '.v7-compare-col .v7c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v7-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v7-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v7-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v7-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Featured Spotlight */
    '.v7-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v7-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v7-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v7-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v7-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v7-spot-left{position:relative;z-index:1}',
    '.v7-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v7-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v7-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v7-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v7-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v7-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v7-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v7-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v7-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v7-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v7-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v7-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v7-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    /* Growth Chart */
    '.v7-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v7-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v7-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v7-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '.v7-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v7-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v7-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v7-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v7-bar:hover{opacity:.85}',
    '.v7-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v7-bar:hover .bar-tip{opacity:1}',
    '.v7-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    /* Donut */
    '.v7-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v7-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v7-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v7-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health Grid */
    '.v7-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v7-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v7-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v7-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v7-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v7-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v7-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v7-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v7-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v7-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v7-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v7-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Stagger animation */
    '.v7-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v7-stagger.v7-visible{opacity:1;transform:translateY(0)}',
    /* Responsive */
    '@media(max-width:768px){.v7-spot-card{grid-template-columns:1fr}.v7-growth-grid{grid-template-columns:1fr}.v7-compare-grid{grid-template-columns:1fr}.v7-toast{max-width:280px;font-size:13px}.v7-pills{gap:6px}.v7-pill{padding:5px 12px;font-size:12px}.v7-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ====================================================================
   * 2. PROJECT DATA (all 13 projects — latest versions as of 2026-05-25)
   * ==================================================================== */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v4.0', tech: ['PWA'], impact: '140+ lessons',
      features: 'Mastery Challenge, Time Attack, Learning Stories 3, 30 Badges, Listening Quiz, Learning Calendar, Level Test, 70+ Quizzes, SFX 6',
      loc: 5500, date: '2026-05-21', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'140+',l:'Lessons'},{n:'11',l:'Subjects'},{n:'30',l:'Badges'},{n:'70+',l:'Quizzes'}] },
    { title: 'SmartGolf', version: 'v9.0', tech: ['Leaflet', 'PWA'], impact: '590 courses',
      features: 'Round Tracker, Buddy System, Weather Integration, Course Strategy, Community Reviews, Green Reading, Mental Coach, Tournament',
      loc: 7200, date: '2026-05-24', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'590',l:'Courses'},{n:'v9.0',l:'Version'},{n:'18',l:'Regions'},{n:'PWA',l:'Offline'}] },
    { title: 'Culture Center Finder', version: 'v5.0', tech: ['Leaflet', 'PWA'], impact: '95,064 courses',
      features: 'Review System, Price Analysis, Center Profile, Learning Planner, Time Heatmap, 30 Achievements, Quiz 15, Difficulty Guide, Share Card',
      loc: 5800, date: '2026-05-22', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'95K+',l:'Courses'},{n:'30',l:'Achievements'},{n:'15',l:'Quizzes'},{n:'8',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v8.0', tech: ['Canvas', 'PWA'], impact: '12 characters',
      features: 'Character Encyclopedia 12, Soundtrack 7 songs, Strategy Guide 12, Memory Game, Share Card, Daily Streak, Season Events, 34 Achievements',
      loc: 4800, date: '2026-05-20', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'12',l:'Characters'},{n:'34',l:'Achievements'},{n:'7',l:'BGM'},{n:'12',l:'Guides'}] },
    { title: 'History RPG', version: 'v12.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '75 quizzes',
      features: 'Faction Map 8, Character Relations 13, Battle Replay, Gallery 8, Art of War 12, Practice Mode 6, Share Card, 36 Achievements',
      loc: 6500, date: '2026-05-24', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v12.0',l:'Version'},{n:'75',l:'Quizzes'},{n:'36',l:'Achievements'},{n:'8',l:'Factions'}] },
    { title: 'Piano', version: 'v8.0', tech: ['Tone.js', 'PWA'], impact: '52 songs',
      features: '4 Timbres, Chord Learning 24, Scale Practice 8, Learning Path 4, Song Search, Particle Effects, Share Card, Rankings, Practice Planner',
      loc: 5200, date: '2026-05-20', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'52',l:'Songs'},{n:'36',l:'Achievements'},{n:'24',l:'Chords'},{n:'4',l:'Timbres'}] },
    { title: 'Violin', version: 'v7.0', tech: ['Tone.js', 'PWA'], impact: '44 songs',
      features: 'Daily Challenge, Scale Library 8, Practice Calendar, Share Card, Bowing Guide 8, Music Theory 15, 10 Songs Added, 70 Lessons, 34 Achievements',
      loc: 4600, date: '2026-05-20', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'44',l:'Songs'},{n:'70',l:'Lessons'},{n:'34',l:'Achievements'},{n:'8',l:'Scales'}] },
    { title: 'Karaoke', version: 'v8.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '55 songs',
      features: 'Vocal Guide, Practice Planner, Personal Rankings, Share Card, Range Test, Lyrics Memorize, 12 Tips, Season Theme, 30 Achievements',
      loc: 5000, date: '2026-05-20', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'55',l:'Songs'},{n:'30',l:'Achievements'},{n:'12',l:'Tips'},{n:'4',l:'Seasons'}] },
    { title: 'Golf Tracker', version: 'v6.0', tech: ['Canvas', 'CV', 'PWA'], impact: '9 hole sim',
      features: 'Course Strategy Simulator 9 holes, AI Insight Engine, Club Fitting Report, Practice Planner Calendar, Shot Journal, K-means Clustering, Leaderboard',
      loc: 4800, date: '2026-05-18', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v6.0',l:'Version'},{n:'9',l:'Holes'},{n:'7',l:'Shot Types'},{n:'K-means',l:'Clustering'}] },
    { title: 'Boxing Trainer', version: 'v9.0', tech: ['Three.js', 'PWA'], impact: '15 quiz',
      features: 'AI Advisor, Recovery Cooldown, Intensity Chart, Punch Speed Grade, Hydration Tracker, Boxing Quiz 15, 9 Milestones, 6 Workout Templates',
      loc: 5100, date: '2026-05-21', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v9.0',l:'Version'},{n:'15',l:'Quiz'},{n:'9',l:'Milestones'},{n:'6',l:'Templates'}] },
    { title: 'City Builder', version: 'v6.0', tech: ['Canvas', 'PWA'], impact: '60 buildings',
      features: 'Tech Tree 15, Great People 10, Adjacency Bonus, Demand Indicator, Prestige Restart, Quiz 40, Choice Events 14, 50 Achievements',
      loc: 5800, date: '2026-05-19', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60',l:'Buildings'},{n:'50',l:'Achievements'},{n:'40',l:'Quizzes'},{n:'15',l:'Tech Tree'}] },
    { title: 'House Builder', version: 'v6.0', tech: ['Three.js', 'PWA'], impact: '30 encyclopedia',
      features: 'Architecture Encyclopedia 30, History Timeline 20, Daily Challenge 14, Master Grade 5, Architecture Tips 10, Quiz 30, 50 Achievements',
      loc: 4500, date: '2026-05-19', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v6.0',l:'Version'},{n:'50',l:'Achievements'},{n:'30',l:'Quizzes'},{n:'5',l:'Grades'}] }
  ];

  var TOTAL_LOC = 70000;
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ====================================================================
   * 3. WEB AUDIO SFX (6 types)
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

      card.setAttribute('data-v7-title', proj.title);
      card.setAttribute('data-v7-version', proj.version);
      card.setAttribute('data-v7-tech', proj.tech.join(','));
      card.setAttribute('data-v7-impact', proj.impact);
      card.setAttribute('data-v7-features', proj.features);
      card.setAttribute('data-v7-loc', proj.loc);
      card.setAttribute('data-v7-category', proj.category);

      var existingBtn = card.querySelector('.v6-compare-btn, .v7-compare-btn');
      if (existingBtn) existingBtn.remove();
      var btn = el('button', { className: 'v7-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        playSFX('compare');
        toggleCompareSelection(card, btn);
      });
      card.appendChild(btn);
      card.classList.add('v7-stagger');
    });
  }

  /* ====================================================================
   * 5. FEATURED PROJECT SPOTLIGHT (auto-carousel)
   * ==================================================================== */
  var spotlightIdx = 0;
  var spotlightTimer = null;
  var SPOTLIGHT = [
    { title: 'History RPG', ver: 'v12.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '한국사 영걸전 스타일 3D 전략 RPG. 세력도 8세력, 인물관계도 13인물, 전투복기, 명장면 8장, 병법서 12전술, 연습모드 6종, 퀴즈 75문, 업적 36개.',
      tags: ['Three.js', 'Canvas', 'Tactics RPG', 'Web Audio'],
      stats: [{n:'v12.0',l:'Version'},{n:'75',l:'Quizzes'},{n:'36',l:'Achievements'},{n:'8',l:'Factions'}] },
    { title: 'SmartGolf', ver: 'v9.0', tier: 'NEXTERA', tierBg: 'rgba(34,197,94,.2)', tierColor: '#4ade80',
      desc: '전국 590개 골프장 PWA. 라운드 추적, 버디 시스템, 날씨 통합, 코스 전략, 커뮤니티 리뷰, 그린 리딩 가이드, 멘탈 코칭, 토너먼트 모드.',
      tags: ['Leaflet.js', 'OSRM', 'PWA', 'GeoJSON'],
      stats: [{n:'590',l:'Courses'},{n:'v9.0',l:'Version'},{n:'18',l:'Regions'},{n:'PWA',l:'Offline'}] },
    { title: 'Piano', ver: 'v8.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: 'Tone.js 피아노 리듬게임 v8.0. 52곡 내장, 4음색 선택, 코드학습 24종, 스케일연습 8종, 학습경로 4단계, 파티클 이펙트, 업적 36개.',
      tags: ['Tone.js', 'Canvas', 'Rhythm Game', 'Web Audio'],
      stats: [{n:'52',l:'Songs'},{n:'36',l:'Achievements'},{n:'24',l:'Chords'},{n:'4',l:'Timbres'}] }
  ];

  function buildSpotlight() {
    var projectsSection = $('#projects');
    if (!projectsSection) return;

    var section = el('section', { className: 'v7-spotlight', id: 'v7-spotlight' });
    section.innerHTML = '<h2>Featured Projects</h2><p class="v7-spotlight-sub">Spotlight on our most ambitious builds</p>';

    var cardWrap = el('div', { className: 'v7-spot-card' });
    section.appendChild(cardWrap);

    var nav = el('div', { className: 'v7-spot-nav' });
    SPOTLIGHT.forEach(function (_, i) {
      var dot = el('button', { className: 'v7-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Spotlight ' + (i + 1) });
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
    $$('.v7-spot-dot').forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    if (spotlightTimer) { clearInterval(spotlightTimer); spotlightTimer = setInterval(function () { goSpotlight((spotlightIdx + 1) % SPOTLIGHT.length); }, 6000); }
  }

  function renderSpotlight(idx) {
    var s = SPOTLIGHT[idx];
    var card = $('.v7-spot-card');
    if (!card) return;
    card.innerHTML =
      '<div class="v7-spot-left">' +
        '<span class="spot-tier" style="background:' + s.tierBg + ';color:' + s.tierColor + '">' + s.tier + '</span>' +
        '<div class="spot-title">' + s.title + '</div>' +
        '<div class="spot-ver">' + s.ver + '</div>' +
        '<div class="spot-desc">' + s.desc + '</div>' +
        '<div class="spot-tags">' + s.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="v7-spot-right">' +
        s.stats.map(function (st) { return '<div class="v7-spot-stat"><div class="s-num">' + st.n + '</div><div class="s-lbl">' + st.l + '</div></div>'; }).join('') +
      '</div>';
  }

  /* ====================================================================
   * 6. GROWTH DASHBOARD (bar charts + donut)
   * ==================================================================== */
  function buildGrowthDashboard() {
    var anchor = $('#v7-spotlight') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;

    var section = el('section', { className: 'v7-growth', id: 'v7-growth' });
    section.innerHTML = '<h2>Project Growth Dashboard</h2><p class="v7-growth-sub">Live metrics across all 13 projects</p>';

    var grid = el('div', { className: 'v7-growth-grid' });

    // LOC Bar Chart
    var locCard = el('div', { className: 'v7-growth-card' });
    locCard.innerHTML = '<h3>Lines of Code by Project</h3>';
    var barChart = el('div', { className: 'v7-bar-chart' });
    var maxLoc = Math.max.apply(null, PROJECTS.map(function (p) { return p.loc; }));
    PROJECTS.forEach(function (p) {
      var pct = (p.loc / maxLoc * 100).toFixed(0);
      var bar = el('div', { className: 'v7-bar' });
      bar.style.height = '0%';
      bar.style.background = p.category === 'NEXTERA' ? 'linear-gradient(180deg,#22c55e,#16a34a)' : 'linear-gradient(180deg,#6366f1,#4f46e5)';
      bar.innerHTML = '<span class="bar-tip">' + p.title.split(' ')[0] + ' ' + p.loc.toLocaleString() + '</span>';
      bar.setAttribute('data-height', pct);
      bar.title = p.title + ': ' + p.loc.toLocaleString() + ' LOC';
      barChart.appendChild(bar);
    });
    locCard.appendChild(barChart);
    var labels = el('div', { className: 'v7-bar-label' });
    labels.innerHTML = '<span>NEXTERA</span><span>PRISM</span>';
    locCard.appendChild(labels);
    grid.appendChild(locCard);

    // Category Donut
    var donutCard = el('div', { className: 'v7-growth-card' });
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

    var donutWrap = el('div', { className: 'v7-donut-wrap' });
    donutWrap.innerHTML = donutSvg +
      '<div class="v7-donut-legend">' +
        '<div class="v7-legend-item"><span class="v7-legend-dot" style="background:#22c55e"></span>NEXTERA (' + nextera.length + ') &mdash; ' + (nLoc / 1000).toFixed(1) + 'K LOC</div>' +
        '<div class="v7-legend-item"><span class="v7-legend-dot" style="background:#6366f1"></span>PRISM (' + prism.length + ') &mdash; ' + (pLoc / 1000).toFixed(1) + 'K LOC</div>' +
        '<div class="v7-legend-item" style="margin-top:.5rem;font-weight:700;color:var(--text,#e2e8f0)">Total: ' + (total / 1000).toFixed(1) + 'K LOC</div>' +
      '</div>';
    donutCard.appendChild(donutWrap);
    grid.appendChild(donutCard);

    section.appendChild(grid);
    if (nextEl) anchor.parentNode.insertBefore(section, nextEl);
    else anchor.parentNode.appendChild(section);

    // Animate bars on intersection
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $$('.v7-bar').forEach(function (bar, i) {
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
    var anchor = $('#v7-growth') || $('#projects');
    if (!anchor) return;
    var nextEl = anchor.nextElementSibling;

    var section = el('section', { className: 'v7-health v7-stagger', id: 'v7-health' });
    section.innerHTML = '<h2>Project Health Monitor</h2><p class="v7-health-sub">Real-time status of all 13 projects</p>';

    var grid = el('div', { className: 'v7-health-grid' });
    PROJECTS.forEach(function (p) {
      var verNum = parseFloat(p.version.replace('v', ''));
      var score = Math.min(100, Math.round(verNum * 8 + p.loc / 100));
      var color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#f43f5e';
      var verBg = p.category === 'NEXTERA' ? 'rgba(34,197,94,.15);color:#4ade80' : 'rgba(99,102,241,.15);color:#a5b4fc';

      var item = el('div', { className: 'v7-health-item' });
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
          $$('.v7-health-item .h-fill').forEach(function (fill, i) {
            setTimeout(function () { fill.style.width = fill.getAttribute('data-w'); }, i * 50);
          });
          healthObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    healthObserver.observe(grid);
  }

  /* ====================================================================
   * 8. TOAST NOTIFICATIONS (latest 3 updates)
   * ==================================================================== */
  function showToasts() {
    var wrap = el('div', { className: 'v7-toast-wrap' });
    document.body.appendChild(wrap);
    var messages = [
      { title: 'History RPG v12.0', body: '세력도 8세력 + 병법서 12전술 업데이트!' },
      { title: 'SmartGolf v9.0', body: '라운드 추적 + 버디 시스템 추가' },
      { title: 'Portfolio v7.0', body: '13개 프로젝트 전체 갱신 + Growth Dashboard' }
    ];
    messages.forEach(function (msg, i) {
      setTimeout(function () {
        playSFX('toast');
        var toast = el('div', { className: 'v7-toast', innerHTML: '<div class="toast-title">' + msg.title + '</div><div>' + msg.body + '</div>' });
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
   * 9. VISIT COUNTER
   * ==================================================================== */
  function initVisitCounter() {
    var key = 'v7_visit_count';
    var count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, count);
    var target = $('.hero-content, .hero, [class*="hero"]');
    if (!target) return;
    var existing = target.querySelector('.v7-visit, .v6-visit');
    if (existing) existing.remove();
    var visitEl = el('div', { className: 'v7-visit' }, [
      el('span', { className: 'v7-pulse' }),
      document.createTextNode(count + ' visits')
    ]);
    target.appendChild(visitEl);
  }

  /* ====================================================================
   * 10. SCROLL PROGRESS RING
   * ==================================================================== */
  function initScrollRing() {
    var existing = document.querySelector('.v6-scroll-ring, .v7-scroll-ring');
    if (existing) existing.remove();
    var r = 20, c = 2 * Math.PI * r;
    var container = el('div', { className: 'v7-scroll-ring', 'aria-label': 'Scroll progress' });
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
   * 11. TECH FILTER PILLS
   * ==================================================================== */
  function initFilterPills() {
    var searchBar = $('.search-bar, [class*="search"]');
    if (!searchBar) return;
    var existing = document.querySelector('.v6-pills, .v7-pills');
    if (existing) existing.remove();
    var pillWrap = el('div', { className: 'v7-pills' });
    TECH_LIST.forEach(function (tech) {
      var pill = el('button', { className: 'v7-pill' + (tech === 'All' ? ' active' : ''), textContent: tech });
      pill.addEventListener('click', function () {
        playSFX('filter');
        $$('.v7-pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        filterCards(tech);
      });
      pillWrap.appendChild(pill);
    });
    searchBar.parentNode.insertBefore(pillWrap, searchBar.nextSibling);
  }

  function filterCards(tech) {
    $$('[data-v7-tech]').forEach(function (card) {
      var techs = card.getAttribute('data-v7-tech') || '';
      if (tech === 'All' || techs.indexOf(tech) !== -1) {
        card.style.display = ''; card.style.opacity = '1'; card.style.transform = '';
      } else {
        card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
        setTimeout(function () { if (card.style.opacity === '0') card.style.display = 'none'; }, 300);
      }
    });
  }

  /* ====================================================================
   * 12. PROJECT COMPARISON MODE
   * ==================================================================== */
  var compareQueue = [];
  var overlay = null;

  function initCompareModal() {
    var old = document.querySelector('.v6-compare-overlay, .v7-compare-overlay');
    if (old) old.remove();
    overlay = el('div', { className: 'v7-compare-overlay' });
    overlay.innerHTML = '<div class="v7-compare-box"><button class="v7-compare-close" aria-label="Close">&times;</button><h3>Project Comparison</h3><div class="v7-compare-grid"></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCompare(); });
    overlay.querySelector('.v7-compare-close').addEventListener('click', closeCompare);
  }

  function toggleCompareSelection(card, btn) {
    var idx = compareQueue.indexOf(card);
    if (idx !== -1) { compareQueue.splice(idx, 1); btn.classList.remove('selected'); btn.textContent = 'Compare'; return; }
    if (compareQueue.length >= 2) {
      var old = compareQueue.shift();
      var oldBtn = old.querySelector('.v7-compare-btn');
      if (oldBtn) { oldBtn.classList.remove('selected'); oldBtn.textContent = 'Compare'; }
    }
    compareQueue.push(card); btn.classList.add('selected'); btn.textContent = 'Selected';
    if (compareQueue.length === 2) openCompare(compareQueue[0], compareQueue[1]);
  }

  function openCompare(a, b) {
    if (!overlay) return;
    var grid = overlay.querySelector('.v7-compare-grid');
    grid.innerHTML = '';
    [a, b].forEach(function (card) {
      var col = el('div', { className: 'v7-compare-col' });
      var title = card.getAttribute('data-v7-title') || 'Unknown';
      var rows = [
        ['Version', card.getAttribute('data-v7-version') || '-'],
        ['Tech', card.getAttribute('data-v7-tech') || '-'],
        ['Impact', card.getAttribute('data-v7-impact') || '-'],
        ['LOC', (parseInt(card.getAttribute('data-v7-loc') || '0', 10)).toLocaleString()],
        ['Category', card.getAttribute('data-v7-category') || '-'],
        ['Features', card.getAttribute('data-v7-features') || '-']
      ];
      col.innerHTML = '<h4>' + title + '</h4>' + rows.map(function (r) {
        return '<div class="v7c-row"><span class="v7c-label">' + r[0] + '</span><span class="v7c-val">' + r[1] + '</span></div>';
      }).join('');
      grid.appendChild(col);
    });
    overlay.classList.add('open');
  }

  function closeCompare() {
    if (overlay) overlay.classList.remove('open');
    compareQueue.forEach(function (card) {
      var btn = card.querySelector('.v7-compare-btn');
      if (btn) { btn.classList.remove('selected'); btn.textContent = 'Compare'; }
    });
    compareQueue = [];
  }

  /* ====================================================================
   * 13. STAGGER ANIMATION (IntersectionObserver)
   * ==================================================================== */
  function initStaggerAnimation() {
    if (!('IntersectionObserver' in window)) {
      $$('.v7-stagger').forEach(function (el) { el.classList.add('v7-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = parseInt(entry.target.getAttribute('data-v7-stagger-idx') || '0', 10);
          setTimeout(function () { entry.target.classList.add('v7-visible'); }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    $$('.v7-stagger').forEach(function (el, i) {
      el.setAttribute('data-v7-stagger-idx', i % 6);
      observer.observe(el);
    });
  }

  /* ====================================================================
   * 14. KEYBOARD SHORTCUTS
   * ==================================================================== */
  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCompare();
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      if (e.shiftKey && e.key === 'F') {
        e.preventDefault();
        var el = $('#v7-spotlight');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); }
      }
      if (e.shiftKey && e.key === 'G') {
        e.preventDefault();
        var el = $('#v7-growth');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); }
      }
      if (e.shiftKey && e.key === 'H') {
        e.preventDefault();
        var el = $('#v7-health');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); }
      }
    });
  }

  /* ====================================================================
   * 15. UPDATE SEO META
   * ==================================================================== */
  function updateMeta() {
    var desc = 'BSY Developer Portfolio v7.0 — 13 interactive web apps: LevelPlay v4.0, SmartGolf v9.0, History RPG v12.0, Piano v8.0, Violin v7.0, Karaoke v8.0 and more. 70,000+ lines of code. Built with Three.js, Tone.js, Leaflet, Canvas, PWA.';
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    var ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'BSY Portfolio v7.0 — 13 Interactive Web Apps, 70K+ LOC');
    var twDesc = $('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
  }

  /* ====================================================================
   * 16. CLEAN V5/V6 ARTIFACTS
   * ==================================================================== */
  function cleanOldPatches() {
    var v5Style = document.getElementById('v5-patch-styles');
    if (v5Style) v5Style.remove();
    var v6Style = document.getElementById('v6-patch-styles');
    if (v6Style) v6Style.remove();
    if (window._v5) { try { delete window._v5; } catch (e) { window._v5 = undefined; } }
    if (window._v6) { try { delete window._v6; } catch (e) { window._v6 = undefined; } }
    $$('.v6-scroll-ring, .v6-pills, .v6-compare-overlay, .v6-toast-wrap, .v6-timeline-section, .v6-radar-section, .v6-visit').forEach(function (el) { el.remove(); });
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
    buildSpotlight();
    buildGrowthDashboard();
    buildHealthGrid();
    initVisitCounter();
    initScrollRing();
    initStaggerAnimation();
    initKeyboard();
    setTimeout(showToasts, 1500);
    console.log('[v7_patch] Applied successfully — v' + window._v7.version);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
