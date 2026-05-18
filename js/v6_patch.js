/**
 * ai-portfolio v6.0 Patch Module
 * Replaces v5_patch.js entirely.
 * Injected via Service Worker into index.html.
 * Last updated: 2026-05-18
 */
;(function () {
  'use strict';
  if (window._v6) return;
  window._v6 = { version: '6.0.0', applied: Date.now() };

  /* ======================================================================
   * 0. UTILITY HELPERS
   * ====================================================================== */
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

  /* ======================================================================
   * 1. CSS INJECTION
   * ====================================================================== */
  var style = document.createElement('style');
  style.id = 'v6-patch-styles';
  style.textContent = [
    '.v6-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v6-toast{pointer-events:auto;background:rgba(30,30,46,.95);color:#cdd6f4;padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid #89b4fa;backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v6-toast.show{transform:translateX(0);opacity:1}',
    '.v6-toast .toast-title{font-weight:700;color:#89b4fa;margin-bottom:2px}',
    '.v6-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#a6adc8;margin-top:8px}',
    '.v6-pulse{width:8px;height:8px;background:#a6e3a1;border-radius:50%;display:inline-block;animation:v6pulse 1.8s infinite}',
    '@keyframes v6pulse{0%,100%{box-shadow:0 0 0 0 rgba(166,227,161,.6)}50%{box-shadow:0 0 0 8px rgba(166,227,161,0)}}',
    '.v6-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v6-scroll-ring:hover{opacity:1}',
    '.v6-scroll-ring svg{transform:rotate(-90deg)}',
    '.v6-scroll-ring .ring-bg{fill:none;stroke:rgba(205,214,244,.15);stroke-width:4}',
    '.v6-scroll-ring .ring-fg{fill:none;stroke:#89b4fa;stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v6-scroll-ring .ring-arrow{fill:#cdd6f4;transition:fill .2s}',
    '.v6-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v6-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(137,180,250,.3);background:transparent;color:#cdd6f4;transition:all .25s}',
    '.v6-pill:hover{border-color:#89b4fa;background:rgba(137,180,250,.1)}',
    '.v6-pill.active{background:#89b4fa;color:#1e1e2e;border-color:#89b4fa}',
    '.v6-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v6-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v6-compare-box{background:#1e1e2e;border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:#cdd6f4}',
    '.v6-compare-box h3{text-align:center;color:#89b4fa;margin:0 0 20px;font-size:20px}',
    '.v6-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v6-compare-col{background:rgba(205,214,244,.04);border-radius:12px;padding:18px}',
    '.v6-compare-col h4{margin:0 0 10px;color:#cba6f7;font-size:16px}',
    '.v6-compare-col .v6c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(205,214,244,.06);font-size:13px}',
    '.v6-compare-col .v6c-label{color:#a6adc8}',
    '.v6-compare-col .v6c-val{color:#cdd6f4;font-weight:600}',
    '.v6-compare-btn{position:absolute;top:8px;right:8px;background:rgba(137,180,250,.15);color:#89b4fa;border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2}',
    '.v6-compare-btn:hover{background:rgba(137,180,250,.3)}',
    '.v6-compare-btn.selected{background:#89b4fa;color:#1e1e2e}',
    '.v6-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#a6adc8;font-size:22px;cursor:pointer}',
    '.v6-timeline-section{padding:60px 20px;max-width:900px;margin:0 auto}',
    '.v6-timeline-section h2{text-align:center;color:#cdd6f4;font-size:28px;margin-bottom:40px}',
    '.v6-timeline{position:relative;padding-left:40px}',
    '.v6-timeline::before{content:"";position:absolute;left:14px;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#89b4fa,#cba6f7,#a6e3a1);border-radius:2px}',
    '.v6-tl-item{position:relative;margin-bottom:28px;opacity:0;transform:translateY(20px);transition:all .5s cubic-bezier(.22,1,.36,1)}',
    '.v6-tl-item.visible{opacity:1;transform:translateY(0)}',
    '.v6-tl-dot{position:absolute;left:-33px;top:4px;width:14px;height:14px;border-radius:50%;border:3px solid #89b4fa;background:#1e1e2e;z-index:1}',
    '.v6-tl-item:nth-child(3n+2) .v6-tl-dot{border-color:#cba6f7}',
    '.v6-tl-item:nth-child(3n) .v6-tl-dot{border-color:#a6e3a1}',
    '.v6-tl-card{background:rgba(205,214,244,.04);border-radius:12px;padding:16px 20px;border:1px solid rgba(205,214,244,.06)}',
    '.v6-tl-card .tl-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}',
    '.v6-tl-card .tl-name{font-weight:700;color:#89b4fa;font-size:15px}',
    '.v6-tl-card .tl-ver{background:rgba(137,180,250,.15);color:#89b4fa;padding:2px 10px;border-radius:10px;font-size:12px;font-weight:600}',
    '.v6-tl-card .tl-date{font-size:12px;color:#a6adc8;margin-bottom:4px}',
    '.v6-tl-card .tl-desc{font-size:13px;color:#bac2de;line-height:1.5}',
    '.v6-radar-section{padding:60px 20px;text-align:center;max-width:700px;margin:0 auto}',
    '.v6-radar-section h2{color:#cdd6f4;font-size:28px;margin-bottom:30px}',
    '.v6-radar-svg{max-width:420px;margin:0 auto;display:block}',
    '.v6-radar-label{font-size:12px;fill:#cdd6f4;font-weight:600;text-anchor:middle}',
    '.v6-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v6-stagger.v6-visible{opacity:1;transform:translateY(0)}',
    '@media(max-width:640px){.v6-compare-grid{grid-template-columns:1fr}.v6-toast{max-width:280px;font-size:13px}.v6-pills{gap:6px}.v6-pill{padding:5px 12px;font-size:12px}.v6-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ======================================================================
   * 2. PROJECT DATA (all 13 projects)
   * ====================================================================== */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v3.0', tech: ['PWA'], impact: '140+ 레슨',
      features: '간격반복 SM-2, 힌트시스템, 일일XP목표, 콤보시스템, 집중타이머 뽀모도로, 플래시카드, 효과음6종, 빈칸/OX퀴즈, 인성감성콘텐츠',
      loc: 4800, date: '2026-05-16' },
    { title: 'SmartGolf', version: 'v8.0', tech: ['Leaflet', 'PWA'], impact: '590 골프장',
      features: '코스공략18홀, 스윙다이어리, 그린리딩가이드, 장비추천, 토너먼트모드, 멘탈코칭, 에티켓25, 계절컨디션, 라운드타임라인, 효과음5종',
      loc: 6200, date: '2026-05-17' },
    { title: 'Culture Center Finder', version: 'v4.0', tech: ['Leaflet', 'PWA'], impact: '95,064건',
      features: '기타세분화20카테고리, AI추천엔진, 주간시간표, 강좌알림, 강사검색, 효과음6종, 키보드단축키8종',
      loc: 5100, date: '2026-05-17' },
    { title: 'Hatcuping Escape Adventure', version: 'v7.0', tech: ['Canvas', 'PWA'], impact: '일일챌린지',
      features: '업적모달UI, 일일챌린지, 통계차트, 명예의전당, 온보딩, 터치스와이프, UI효과음',
      loc: 4200, date: '2026-05-14' },
    { title: 'Hatcuping RPG Adventure', version: 'v7.0', tech: ['Canvas', 'PWA'], impact: 'RPG v7',
      features: '업적모달UI, 일일챌린지, 통계차트, 명예의전당, 온보딩, 터치스와이프',
      loc: 4500, date: '2026-05-14' },
    { title: 'History RPG', version: 'v11.0', tech: ['Canvas', 'PWA'], impact: '60 퀴즈',
      features: '역사도감30, 캐릭터도감12, 연표17, 일일도전14, 전략가이드, 퀴즈60문, SFX4종',
      loc: 5500, date: '2026-05-17' },
    { title: 'Piano', version: 'v7.0', tech: ['Tone.js', 'PWA'], impact: '45곡',
      features: '10곡추가(35→45), AB구간반복, 일일챌린지, 곡미리듣기, 연습히스토리, 햅틱피드백, 26업적, 한국민요',
      loc: 4600, date: '2026-05-14' },
    { title: 'Violin', version: 'v6.0', tech: ['Tone.js', 'PWA'], impact: '22곡',
      features: '녹음기능, 연주기록, 튜너, 메트로놈, 드론, 템포조절, 8곡추가, 10레슨추가, 8업적',
      loc: 3900, date: '2026-05-13' },
    { title: 'Karaoke', version: 'v7.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '45곡',
      features: '10곡추가(35→45), 일일챌린지, 재생큐, 코러스이펙트, 노래방번호, 8업적추가(12→20)',
      loc: 4400, date: '2026-05-14' },
    { title: 'Golf Tracker', version: 'v5.0', tech: ['Canvas', 'PWA'], impact: '24업적',
      features: 'SG분석, 핸디캅, 바람보정, 클럽거리매트릭스, 스윙템포, 세션요약, 공유카드, 드릴8종, 24업적',
      loc: 4000, date: '2026-05-12' },
    { title: 'Boxing Trainer', version: 'v8.0', tech: ['Canvas', 'CV', 'PWA'], impact: '9테크닉',
      features: '일일챌린지, 개인기록(PR), 체형히트맵, 워밍업가이드, 공유카드, 테크닉도감9종, 명언8개',
      loc: 4300, date: '2026-05-14' },
    { title: 'City Builder', version: 'v5.0', tech: ['Canvas', 'PWA'], impact: '60종 건물',
      features: '한국사퀴즈25문, 계절시스템, 선택이벤트8개, 건물도감60종, 업적40개, 26x26그리드, 인구세분화',
      loc: 5200, date: '2026-05-12' },
    { title: 'House Builder', version: 'v5.0', tech: ['Three.js', 'PWA'], impact: '32업적',
      features: '정자모드, 세이브슬롯, 공유카드, 타임라인, 업적32개, 퀴즈18문',
      loc: 3800, date: '2026-05-13' }
  ];

  var TOTAL_LOC = 58000;
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ======================================================================
   * 3. SEO META UPDATES
   * ====================================================================== */
  function updateMeta() {
    var desc = 'BSY Developer Portfolio v6.0 — 13 interactive web apps including LevelPlay v3.0, SmartGolf v8.0, History RPG v11.0, Piano v7.0 and more. 58,000+ lines of code. Built with Three.js, Tone.js, Leaflet, Canvas, PWA.';
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    else document.head.appendChild(el('meta', { name: 'description', content: desc }));

    var ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    else document.head.appendChild(el('meta', { property: 'og:description', content: desc }));

    var ogTitle = $('meta[property="og:title"]');
    var titleText = 'BSY Portfolio v6.0 — 13 Interactive Web Apps';
    if (ogTitle) ogTitle.setAttribute('content', titleText);
    else document.head.appendChild(el('meta', { property: 'og:title', content: titleText }));
  }

  /* ======================================================================
   * 4. UPDATE PROJECT CARDS
   * ====================================================================== */
  function updateProjectCards() {
    var cards = $$('.project-card, [class*="project-card"], [data-project]');
    if (!cards.length) cards = $$('.card, .portfolio-card, .grid-item');

    PROJECTS.forEach(function (proj) {
      var card = null;
      cards.forEach(function (c) {
        var text = c.textContent || '';
        if (text.indexOf(proj.title) !== -1 || text.indexOf(proj.title.replace(/ /g, '')) !== -1) {
          card = c;
        }
      });
      if (!card) return;

      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';

      var versionEls = card.querySelectorAll('span, .badge, .version, .tag, [class*="version"], [class*="badge"]');
      versionEls.forEach(function (ve) {
        if (/v\d+\.\d+/.test(ve.textContent) && ve.textContent.trim().length < 12) {
          ve.textContent = proj.version;
        }
      });

      card.setAttribute('data-v6-title', proj.title);
      card.setAttribute('data-v6-version', proj.version);
      card.setAttribute('data-v6-tech', proj.tech.join(','));
      card.setAttribute('data-v6-impact', proj.impact);
      card.setAttribute('data-v6-features', proj.features);
      card.setAttribute('data-v6-loc', proj.loc);

      var existingBtn = card.querySelector('.v6-compare-btn');
      if (!existingBtn) {
        var btn = el('button', { className: 'v6-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggleCompareSelection(card, btn);
        });
        card.appendChild(btn);
      }

      card.classList.add('v6-stagger');
    });
  }

  /* ======================================================================
   * 5. UPDATE STATS (Lines of Code counter)
   * ====================================================================== */
  function updateStats() {
    var statEls = $$('.stat-number, .stat-value, .counter, [data-count], [class*="stat"]');
    statEls.forEach(function (el) {
      var text = el.textContent.replace(/,/g, '').trim();
      var num = parseInt(text, 10);
      if (num >= 45000 && num <= 52000) {
        animateCounter(el, num, TOTAL_LOC, 1500);
      }
    });
  }

  function animateCounter(element, from, to, duration) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + (to - from) * eased);
      element.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ======================================================================
   * 6. TOAST NOTIFICATIONS
   * ====================================================================== */
  function showToasts() {
    var wrap = el('div', { className: 'v6-toast-wrap' });
    document.body.appendChild(wrap);

    var messages = [
      { title: 'History RPG v11.0', body: '역사도감30종 + 퀴즈60문 업데이트!' },
      { title: 'Karaoke v7.0', body: '45곡 돌파! 코러스 이펙트 추가' },
      { title: 'Portfolio v6.0', body: '13개 프로젝트 전체 업데이트 완료' }
    ];

    messages.forEach(function (msg, i) {
      setTimeout(function () {
        var toast = el('div', { className: 'v6-toast', innerHTML: '<div class="toast-title">' + msg.title + '</div><div>' + msg.body + '</div>' });
        wrap.appendChild(toast);
        requestAnimationFrame(function () { toast.classList.add('show'); });
        setTimeout(function () {
          toast.classList.remove('show');
          setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
        }, 4000);
      }, 800 + i * 1200);
    });
  }

  /* ======================================================================
   * 7. VISIT COUNTER
   * ====================================================================== */
  function initVisitCounter() {
    var key = 'v6_visit_count';
    var count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, count);

    var target = $('.hero-stats, .stats-container, .stat-row, [class*="stats"], [class*="hero"] [class*="stat"]');
    if (!target) {
      target = $('.hero, .hero-content, [class*="hero"]');
    }
    if (!target) return;

    var visitEl = el('div', { className: 'v6-visit' }, [
      el('span', { className: 'v6-pulse' }),
      document.createTextNode('총 ' + count + '회 방문')
    ]);
    target.appendChild(visitEl);
  }

  /* ======================================================================
   * 8. SCROLL PROGRESS RING
   * ====================================================================== */
  function initScrollRing() {
    var r = 20, c = 2 * Math.PI * r;
    var container = el('div', { className: 'v6-scroll-ring', 'aria-label': '스크롤 진행률 / 상단으로 이동' });
    container.innerHTML =
      '<svg viewBox="0 0 48 48" width="48" height="48">' +
        '<circle class="ring-bg" cx="24" cy="24" r="' + r + '"/>' +
        '<circle class="ring-fg" cx="24" cy="24" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + c + '"/>' +
        '<polygon class="ring-arrow" points="24,14 30,22 26,22 26,32 22,32 22,22 18,22"/>' +
      '</svg>';
    document.body.appendChild(container);

    var fg = container.querySelector('.ring-fg');
    function onScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? scrollTop / docHeight : 0;
      fg.style.strokeDashoffset = c * (1 - pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    container.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ======================================================================
   * 9. TECH FILTER PILLS
   * ====================================================================== */
  function initFilterPills() {
    var searchBar = $('input[type="search"], input[type="text"][placeholder*="search" i], .search-bar, .search-input, [class*="search"]');
    var insertTarget = searchBar ? searchBar.parentNode : null;
    if (!insertTarget) {
      var grid = $('.project-grid, .projects-grid, .grid, [class*="project"][class*="grid"], [class*="portfolio"][class*="grid"]');
      insertTarget = grid ? grid.parentNode : null;
    }
    if (!insertTarget) return;

    var pillWrap = el('div', { className: 'v6-pills' });

    TECH_LIST.forEach(function (tech) {
      var pill = el('button', {
        className: 'v6-pill' + (tech === 'All' ? ' active' : ''),
        textContent: tech
      });
      pill.addEventListener('click', function () {
        $$('.v6-pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        filterCards(tech);
      });
      pillWrap.appendChild(pill);
    });

    if (searchBar && searchBar.parentNode) {
      searchBar.parentNode.insertBefore(pillWrap, searchBar.nextSibling);
    } else if (insertTarget) {
      var grid = insertTarget.querySelector('.project-grid, .projects-grid, .grid, [class*="grid"]');
      if (grid) insertTarget.insertBefore(pillWrap, grid);
      else insertTarget.appendChild(pillWrap);
    }
  }

  function filterCards(tech) {
    var cards = $$('[data-v6-tech]');
    cards.forEach(function (card) {
      var techs = card.getAttribute('data-v6-tech') || '';
      if (tech === 'All' || techs.indexOf(tech) !== -1) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(function () {
          if (card.style.opacity === '0') card.style.display = 'none';
        }, 300);
      }
    });
  }

  /* ======================================================================
   * 10. PROJECT COMPARISON MODE
   * ====================================================================== */
  var compareQueue = [];
  var overlay = null;

  function initCompareModal() {
    overlay = el('div', { className: 'v6-compare-overlay' });
    overlay.innerHTML = '<div class="v6-compare-box" style="position:relative"><button class="v6-compare-close" aria-label="Close">&times;</button><h3>프로젝트 비교</h3><div class="v6-compare-grid"></div></div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCompare();
    });
    overlay.querySelector('.v6-compare-close').addEventListener('click', closeCompare);
  }

  function toggleCompareSelection(card, btn) {
    var idx = compareQueue.indexOf(card);
    if (idx !== -1) {
      compareQueue.splice(idx, 1);
      btn.classList.remove('selected');
      btn.textContent = 'Compare';
      return;
    }
    if (compareQueue.length >= 2) {
      var old = compareQueue.shift();
      var oldBtn = old.querySelector('.v6-compare-btn');
      if (oldBtn) { oldBtn.classList.remove('selected'); oldBtn.textContent = 'Compare'; }
    }
    compareQueue.push(card);
    btn.classList.add('selected');
    btn.textContent = 'Selected';

    if (compareQueue.length === 2) {
      openCompare(compareQueue[0], compareQueue[1]);
    }
  }

  function openCompare(a, b) {
    if (!overlay) return;
    var grid = overlay.querySelector('.v6-compare-grid');
    grid.innerHTML = '';
    [a, b].forEach(function (card) {
      var col = el('div', { className: 'v6-compare-col' });
      var title = card.getAttribute('data-v6-title') || 'Unknown';
      var rows = [
        ['버전', card.getAttribute('data-v6-version') || '-'],
        ['기술', card.getAttribute('data-v6-tech') || '-'],
        ['임팩트', card.getAttribute('data-v6-impact') || '-'],
        ['코드량', (parseInt(card.getAttribute('data-v6-loc') || '0', 10)).toLocaleString() + ' LOC'],
        ['주요기능', card.getAttribute('data-v6-features') || '-']
      ];
      col.innerHTML = '<h4>' + title + '</h4>' + rows.map(function (r) {
        return '<div class="v6c-row"><span class="v6c-label">' + r[0] + '</span><span class="v6c-val">' + r[1] + '</span></div>';
      }).join('');
      grid.appendChild(col);
    });
    overlay.classList.add('open');
  }

  function closeCompare() {
    if (overlay) overlay.classList.remove('open');
    compareQueue.forEach(function (card) {
      var btn = card.querySelector('.v6-compare-btn');
      if (btn) { btn.classList.remove('selected'); btn.textContent = 'Compare'; }
    });
    compareQueue = [];
  }

  /* ======================================================================
   * 11. PROJECT EVOLUTION TIMELINE
   * ====================================================================== */
  function buildTimeline() {
    var sorted = PROJECTS.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    var section = el('section', { className: 'v6-timeline-section', id: 'v6-timeline' });
    section.innerHTML = '<h2>Project Evolution Timeline</h2>';
    var tl = el('div', { className: 'v6-timeline' });

    sorted.forEach(function (p) {
      var item = el('div', { className: 'v6-tl-item' });
      var highlights = p.features.split(', ').slice(0, 3).join(' · ');
      item.innerHTML =
        '<div class="v6-tl-dot"></div>' +
        '<div class="v6-tl-card">' +
          '<div class="tl-head"><span class="tl-name">' + p.title + '</span><span class="tl-ver">' + p.version + '</span></div>' +
          '<div class="tl-date">' + p.date + '</div>' +
          '<div class="tl-desc">' + highlights + '</div>' +
        '</div>';
      tl.appendChild(item);
    });
    section.appendChild(tl);

    var projectsSection = $('[id*="project"], [class*="projects-section"], section.projects');
    if (projectsSection && projectsSection.nextSibling) {
      projectsSection.parentNode.insertBefore(section, projectsSection.nextSibling);
    } else {
      var main = $('main, .main, .content, #app');
      if (main) main.appendChild(section);
      else document.body.appendChild(section);
    }
  }

  /* ======================================================================
   * 12. TECHNOLOGY RADAR SVG
   * ====================================================================== */
  function buildRadar() {
    var techs = [
      { name: 'Three.js', label: '3D', level: 0.8 },
      { name: 'Tone.js', label: 'Audio', level: 0.85 },
      { name: 'Leaflet', label: 'Maps', level: 0.9 },
      { name: 'Web Audio', label: 'WebAudio', level: 0.75 },
      { name: 'Canvas', label: 'Canvas', level: 0.95 },
      { name: 'PWA', label: 'PWA', level: 0.92 },
      { name: 'CSS Grid', label: 'CSS', level: 0.88 },
      { name: 'CV', label: 'CV', level: 0.7 }
    ];

    var cx = 200, cy = 200, maxR = 150;
    var n = techs.length;
    var rings = [0.33, 0.66, 1.0];

    var svg = '<svg class="v6-radar-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">';

    rings.forEach(function (r) {
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (maxR * r) + '" fill="none" stroke="rgba(205,214,244,0.08)" stroke-width="1"/>';
    });

    for (var i = 0; i < n; i++) {
      var angle = (2 * Math.PI * i / n) - Math.PI / 2;
      var x = cx + maxR * Math.cos(angle);
      var y = cy + maxR * Math.sin(angle);
      svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="rgba(205,214,244,0.06)" stroke-width="1"/>';
    }

    var points = techs.map(function (t, i) {
      var angle = (2 * Math.PI * i / n) - Math.PI / 2;
      var r = maxR * t.level;
      return (cx + r * Math.cos(angle)).toFixed(1) + ',' + (cy + r * Math.sin(angle)).toFixed(1);
    }).join(' ');
    svg += '<polygon points="' + points + '" fill="rgba(137,180,250,0.15)" stroke="#89b4fa" stroke-width="2"/>';

    techs.forEach(function (t, i) {
      var angle = (2 * Math.PI * i / n) - Math.PI / 2;
      var r = maxR * t.level;
      var dx = cx + r * Math.cos(angle);
      var dy = cy + r * Math.sin(angle);
      svg += '<circle cx="' + dx.toFixed(1) + '" cy="' + dy.toFixed(1) + '" r="5" fill="#89b4fa"/>';

      var lx = cx + (maxR + 26) * Math.cos(angle);
      var ly = cy + (maxR + 26) * Math.sin(angle);
      svg += '<text class="v6-radar-label" x="' + lx.toFixed(1) + '" y="' + (ly + 4).toFixed(1) + '">' + t.label + '</text>';
    });

    svg += '</svg>';

    var section = el('section', { className: 'v6-radar-section', id: 'v6-radar' });
    section.innerHTML = '<h2>Technology Radar</h2>' + svg;

    var timelineSec = $('#v6-timeline');
    if (timelineSec && timelineSec.nextSibling) {
      timelineSec.parentNode.insertBefore(section, timelineSec.nextSibling);
    } else {
      var main = $('main, .main, .content, #app');
      if (main) main.appendChild(section);
      else document.body.appendChild(section);
    }
  }

  /* ======================================================================
   * 13. CARD STAGGER ANIMATION (IntersectionObserver)
   * ====================================================================== */
  function initStaggerAnimation() {
    if (!('IntersectionObserver' in window)) {
      $$('.v6-stagger').forEach(function (el) { el.classList.add('v6-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = parseInt(entry.target.getAttribute('data-v6-stagger-idx') || '0', 10);
          setTimeout(function () {
            entry.target.classList.add('v6-visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.v6-stagger').forEach(function (el, i) {
      el.setAttribute('data-v6-stagger-idx', i % 6);
      observer.observe(el);
    });

    var tlObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    $$('.v6-tl-item').forEach(function (item, i) {
      setTimeout(function () { tlObserver.observe(item); }, i * 50);
    });
  }

  /* ======================================================================
   * 14. KEYBOARD SHORTCUT: ESC to close compare modal
   * ====================================================================== */
  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCompare();
    });
  }

  /* ======================================================================
   * 15. REMOVE v5 PATCH ARTIFACTS (if present)
   * ====================================================================== */
  function cleanV5() {
    var v5Style = document.getElementById('v5-patch-styles');
    if (v5Style) v5Style.remove();
    if (window._v5) {
      try { delete window._v5; } catch (e) { window._v5 = undefined; }
    }
    $$('[class*="v5-"]').forEach(function (el) {
      if (el.id !== 'v5-compat') el.remove();
    });
  }

  /* ======================================================================
   * INIT: Run everything on DOM ready
   * ====================================================================== */
  function init() {
    cleanV5();
    updateMeta();
    updateProjectCards();
    updateStats();
    initCompareModal();
    initFilterPills();
    buildTimeline();
    buildRadar();
    initVisitCounter();
    initScrollRing();
    initStaggerAnimation();
    initKeyboard();

    setTimeout(showToasts, 1200);

    console.log('[v6_patch] Applied successfully — v' + window._v6.version);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
