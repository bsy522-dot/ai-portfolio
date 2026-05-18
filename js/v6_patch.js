(function(){
'use strict';

/* ===== v6.0 CSS ===== */
var css=document.createElement('style');
css.id='v6-css';
css.textContent=[
'.tech-filter-wrap{text-align:center;margin:1.5rem auto .5rem;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:900px;padding:0 1rem}',
'.tech-pill{padding:5px 14px;border-radius:20px;font-size:.72rem;cursor:pointer;border:1px solid var(--border,#333);background:var(--card-bg,#1a1a2e);color:var(--text-dim,#888);transition:all .25s;user-select:none;white-space:nowrap}',
'.tech-pill:hover,.tech-pill.active{border-color:var(--cyan,#6366f1);color:var(--cyan,#6366f1);background:rgba(99,102,241,.12)}',
'.tech-pill .pill-ct{font-size:.6rem;opacity:.6;margin-left:3px}',

'.wn-fab{position:fixed;bottom:24px;right:24px;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;cursor:pointer;z-index:9999;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 20px rgba(99,102,241,.4);transition:transform .3s,box-shadow .3s}',
'.wn-fab:hover{transform:scale(1.1);box-shadow:0 6px 30px rgba(99,102,241,.6)}',
'.wn-fab .wn-dot{position:absolute;top:2px;right:2px;width:10px;height:10px;border-radius:50%;background:#ef4444;border:2px solid var(--card-bg,#1a1a2e)}',
'.wn-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;display:none;align-items:center;justify-content:center;backdrop-filter:blur(4px)}',
'.wn-overlay.open{display:flex}',
'.wn-modal{background:var(--card-bg,#1a1a2e);border:1px solid var(--border,#333);border-radius:16px;padding:2rem;max-width:520px;width:90vw;max-height:80vh;overflow-y:auto;position:relative;animation:wnUp .3s ease}',
'@keyframes wnUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}',
'.wn-modal h2{font-size:1.3rem;margin:0 0 .3rem;background:linear-gradient(90deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
'.wn-modal .wn-sub{font-size:.75rem;color:var(--text-dim,#888);margin-bottom:1.2rem}',
'.wn-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text-dim,#888);font-size:1.4rem;cursor:pointer;line-height:1}',
'.wn-close:hover{color:var(--text,#eee)}',
'.wn-entry{border-left:2px solid #6366f1;padding:8px 0 8px 14px;margin-bottom:14px}',
'.wn-entry .wn-date{font-size:.63rem;color:#6366f1;font-weight:600;text-transform:uppercase;letter-spacing:.5px}',
'.wn-entry .wn-ttl{font-size:.85rem;color:var(--text,#eee);font-weight:600;margin:3px 0}',
'.wn-entry .wn-items{font-size:.72rem;color:var(--text-dim,#888);line-height:1.6}',

'.evo-wrap{padding:3rem 2rem;max-width:900px;margin:0 auto}',
'.evo-wrap h2{font-size:1.5rem;text-align:center;margin-bottom:.3rem;background:linear-gradient(90deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
'.evo-wrap .evo-sub{text-align:center;color:var(--text-dim,#888);font-size:.8rem;margin-bottom:2rem}',
'.evo-track{position:relative;padding-left:30px}',
'.evo-track::before{content:"";position:absolute;left:9px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#6366f1,#a855f7,#10b981)}',
'.evo-node{position:relative;margin-bottom:18px;padding:12px 16px;background:var(--card-bg,#1a1a2e);border:1px solid var(--border,#333);border-radius:10px;transition:border-color .3s,transform .2s}',
'.evo-node:hover{border-color:var(--cyan,#6366f1);transform:translateX(4px)}',
'.evo-node::before{content:"";position:absolute;left:-25px;top:16px;width:10px;height:10px;border-radius:50%;background:#6366f1;border:2px solid var(--bg,#0a0a1a);z-index:1}',
'.evo-node .evo-ver{font-size:.63rem;color:#6366f1;font-weight:700;letter-spacing:.5px}',
'.evo-node .evo-lbl{font-size:.82rem;color:var(--text,#eee);margin-top:2px;font-weight:500}',
'.evo-node .evo-det{font-size:.68rem;color:var(--text-dim,#888);margin-top:4px;line-height:1.5}',

'.health-badge{display:inline-flex;align-items:center;gap:3px;font-size:.56rem;padding:2px 7px;border-radius:6px;font-weight:700;position:absolute;top:8px;left:8px;z-index:2;letter-spacing:.3px}',
'.health-a{background:rgba(16,185,129,.15);color:#10b981;border:1px solid rgba(16,185,129,.25)}',
'.health-b{background:rgba(245,158,11,.15);color:#f59e0b;border:1px solid rgba(245,158,11,.25)}',

'.v6-splash{position:fixed;inset:0;background:#0a0a1a;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:opacity .6s ease}',
'.v6-splash.done{opacity:0;pointer-events:none}',
'.v6-splash-logo{font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:spPulse 1s ease infinite alternate}',
'.v6-splash-ver{font-size:.7rem;color:var(--text-dim,#888);margin-top:6px;letter-spacing:2px}',
'.v6-splash-bar{width:180px;height:3px;background:rgba(255,255,255,.08);border-radius:3px;margin-top:16px;overflow:hidden}',
'.v6-splash-fill{height:100%;background:linear-gradient(90deg,#6366f1,#a855f7);border-radius:3px;animation:spFill 1s ease forwards}',
'@keyframes spPulse{from{opacity:.5}to{opacity:1}}',
'@keyframes spFill{from{width:0}to{width:100%}}',

'.swipe-hint{display:none;text-align:center;font-size:.68rem;color:var(--text-dim,#888);padding:.5rem 0;opacity:0;animation:swHint 2s ease 1.5s forwards}',
'@media(max-width:768px){.swipe-hint{display:block}}',
'@keyframes swHint{to{opacity:.5}}',

'.card-v6-enter{opacity:0;transform:translateY(18px)}',
'.card-v6-visible{opacity:1;transform:translateY(0);transition:opacity .45s ease,transform .45s ease}',

'.v6-totals-bar{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;padding:1rem 2rem;margin:0 auto;max-width:800px}',
'.v6-total-item{text-align:center}',
'.v6-total-num{font-size:1.6rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-variant-numeric:tabular-nums}',
'.v6-total-lbl{font-size:.65rem;color:var(--text-dim,#888);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}'
].join('\n');
document.head.appendChild(css);

/* ===== SPLASH SCREEN ===== */
var splash=document.createElement('div');
splash.className='v6-splash';
splash.setAttribute('aria-hidden','true');
splash.innerHTML='<div class="v6-splash-logo">AI Portfolio</div><div class="v6-splash-ver">v6.0 LOADING</div><div class="v6-splash-bar"><div class="v6-splash-fill"></div></div>';
document.body.appendChild(splash);
setTimeout(function(){splash.classList.add('done')},1300);
setTimeout(function(){if(splash.parentNode)splash.parentNode.removeChild(splash)},2000);

/* ===== PROJECT DATA v6.0 ===== */
var DATA={
'History RPG':{ver:'v11.0',desc:'Three.js 한국사 영걸전 전략RPG v11.0. 역사도감30항목, 캐릭터도감12종SSR/SR/R, 연표BC2400~AD42, 일일도전14종, 전략가이드, 퀴즈60문, SFX4종, 키보드단축키.',m:'60 퀴즈',hp:'A',tech:['Three.js','3D','Web Audio']},
'Piano':{ver:'v7.0',desc:'Tone.js 피아노 리듬게임 v7.0. 45곡(+10곡추가), AB구간반복, 일일챌린지, 곡미리듣기, 연습히스토리, 햅틱피드백, 26업적, 한국민요카테고리, SEO.',m:'45곡',hp:'A',tech:['Tone.js','Web Audio','PWA']},
'Violin':{ver:'v6.0',desc:'9배음 하모닉 바이올린 v6.0. 녹음기능, 연주기록, 크로매틱튜너, 메트로놈, 드론, 템포조절, 22곡(+8곡), 20레슨(+10레슨), 18업적(+8업적), 접근성.',m:'22곡',hp:'A',tech:['Tone.js','Web Audio','PWA']},
'Karaoke':{ver:'v7.0',desc:'MPM 음정검출 노래방 v7.0. 45곡(+10곡추가), 일일챌린지, 재생큐, 코러스이펙트, 노래방번호, 20업적(+8추가), SEO강화, 접근성.',m:'45곡',hp:'A',tech:['Web Audio','Canvas','PWA']},
'Golf Tracker':{ver:'v5.0',desc:'Frame Differencing CV 골프트래커 v5.0. SG(Strokes Gained)분석, 핸디캅추적, 바람보정, 클럽거리매트릭스, 스윙템포, 세션요약, 공유카드, 드릴8종, 24업적.',m:'24업적',hp:'A',tech:['Canvas','CV','PWA']},
'Boxing Trainer':{ver:'v8.0',desc:'Three.js 3D 복싱 트레이너 v8.0. 일일챌린지14종, 개인기록PR, 체형히트맵SVG, 워밍업가이드6단계, 공유카드Canvas, 테크닉도감9종, 명언8개, 키보드단축키6종.',m:'9종 테크닉',hp:'A',tech:['Three.js','3D','Web Audio','Canvas']},
'City Builder':{ver:'v5.0',desc:'아이소메트릭 도시건설 v5.0. 한국사퀴즈25문, 계절시스템4종, 선택이벤트8개, 건물도감60종, 업적40개, 26x26그리드, 인구세분화, SEO, 접근성.',m:'60종 건물',hp:'A',tech:['Canvas','Isometric','PWA']},
'House Builder':{ver:'v5.0',desc:'Three.js 3D 한국전통건축 v5.0. 정자모드신규, 세이브슬뢿3개, 공유카드, 건축타임라인, 업적32개, 퀴즈18문, SEO강화, 접근성.',m:'32업적',hp:'A',tech:['Three.js','3D','PWA']},
'Hatcuping Escape Adventure':{ver:'v7.0',desc:'하췤핑 플랫포머 v7.0. 업적모달UI, 일일챌린지, 통계차트, 명예의전당, 온보딩 튜토리얼, 터치스와이프, UI효과음, SEO강화.',m:'일일챌린지',hp:'A',tech:['Canvas','Web Audio','PWA']},
'Hatcuping RPG Adventure':{ver:'v7.0',desc:'하췤핑 턴제RPG v7.0. 업적모달, 일일챌린지, 통계차트, 명예의전당, 온보딩, 터치제스처, 효과음, BGM 맵/전투 자동전환.',m:'명예의전당',hp:'A',tech:['Canvas','Web Audio','PWA']},
'SmartGolf':{ver:'v8.0',desc:'전국 590개 골프장 PWA v8.0. 코스공략18홀, 스윙다이어리, 그린리딩가이드, 장비추천12종, 토너먼트모드, 멘탈코칭, 에티켓25개, 계절컨디션, 라운드타임라인.',m:'590 골프장',hp:'A',tech:['Leaflet','OSRM','PWA']},
'Culture Center Finder':{ver:'v4.0',desc:'95,064개 문화센터 강좌 PWA v4.0. 기타세분화20카테고리, AI추천엔진, 주간시간표, 강좌알림, 강사검색, 효과음6종, 키보드단축키8종, SEO.',m:'95,064건',hp:'A',tech:['Leaflet','PWA','Web Audio']},
'LevelPlay':{ver:'v3.0',desc:'11과목 140+레슨 교육플랫폼 v3.0. SM-2 간격반복, 플래시카드, 집중타이머 뽀모도로, 콤보시스템, 일일XP목표, 빈칸채우기+OX퀴즈, 인성감성과목, 효과음6종.',m:'140+ 레슨',hp:'A',tech:['PWA','Web Audio']},
'AI Portfolio':{ver:'v6.0',desc:'25+ AI 협업 프로젝트 쇼케이스 v6.0. 기술필터, What&#39;s New 모달, 진화타임라인, 스플래시, 건강배지, 효과음, 55,000+줄 코드.',m:'v6.0',hp:'A',tech:['PWA','SVG']}
};

document.querySelectorAll('.card').forEach(function(card){
var te=card.querySelector('.card-title');
if(!te)return;
var t=te.textContent.trim();
var u=DATA[t];
if(!u)return;
var de=card.querySelector('.card-desc');
if(de)de.textContent=u.desc;
var vb=card.querySelector('.version-badge');
if(vb)vb.textContent=u.ver;
var ib=card.querySelector('.impact-badge');
if(ib)ib.textContent=u.m;
if(!ib&&u.m){
var th=card.querySelector('.card-thumb');
if(th){
var b=document.createElement('span');
b.className='impact-badge';
b.textContent=u.m;
th.appendChild(b);
}
}
if(u.hp){
var th2=card.querySelector('.card-thumb');
if(th2&&!th2.querySelector('.health-badge')){
var hb=document.createElement('span');
hb.className='health-badge '+(u.hp==='A'?'health-a':'health-b');
hb.textContent=(u.hp==='A'?'A+':'B');
th2.appendChild(hb);
}
}
card.dataset.tech=(u.tech||[]).join(',');
});

/* ===== TECH FILTER PILLS ===== */
var techMap={'All':0,'Three.js':0,'Tone.js':0,'Canvas':0,'Web Audio':0,'Leaflet':0,'PWA':0,'3D':0,'CV':0,'Isometric':0,'SVG':0};
document.querySelectorAll('.card').forEach(function(c){
var ts=(c.dataset.tech||'').split(',').filter(Boolean);
ts.forEach(function(t){if(techMap[t]!==undefined)techMap[t]++;});
techMap['All']++;
});
var projSection=document.querySelector('#projects');
if(projSection){
var filterWrap=document.createElement('div');
filterWrap.className='tech-filter-wrap';
filterWrap.setAttribute('role','toolbar');
filterWrap.setAttribute('aria-label','Filter projects by technology');
Object.keys(techMap).forEach(function(tech){
if(tech!=='All'&&techMap[tech]===0)return;
var pill=document.createElement('button');
pill.className='tech-pill'+(tech==='All'?' active':'');
pill.innerHTML=tech+'<span class="pill-ct">('+techMap[tech]+')</span>';
pill.dataset.filter=tech;
pill.addEventListener('click',function(){
filterWrap.querySelectorAll('.tech-pill').forEach(function(p){p.classList.remove('active')});
pill.classList.add('active');
var f=pill.dataset.filter;
document.querySelectorAll('.card').forEach(function(c){
if(f==='All'){c.style.display='';return;}
var ts=(c.dataset.tech||'').split(',');
c.style.display=ts.indexOf(f)>=0?'':'none';
});
playClick();
});
filterWrap.appendChild(pill);
});
var grid=projSection.querySelector('.grid,.cards-grid,[class*=grid]');
if(grid)grid.parentNode.insertBefore(filterWrap,grid);
else{
var sub=projSection.querySelector('.section-sub');
if(sub)sub.parentNode.insertBefore(filterWrap,sub.nextSibling);
}

var hint=document.createElement('div');
hint.className='swipe-hint';
hint.textContent='← → Swipe or tap filter pills to browse by technology';
filterWrap.parentNode.insertBefore(hint,filterWrap.nextSibling);
}

/* ===== WHAT'S NEW FLOATING BUTTON + MODAL ===== */
var changelog=[
{date:'2026-05-17',title:'History RPG v11.0',items:'역사도감30, 캐릭터도감12, 연표17, 일일도전14, 전략가이드, 퀴즈60문'},
{date:'2026-05-17',title:'SmartGolf v8.0',items:'코스공략18홀, 스윙다이어리, 그린리딩, 장비추천12, 토너먼트, 멘탈코칭'},
{date:'2026-05-17',title:'Culture Center v4.0',items:'기타세분화20카테고리, AI추천엔진, 주간시간표, 강좌알림, 강사검색'},
{date:'2026-05-16',title:'LevelPlay v3.0',items:'SM-2 간격반복, 플래시카드, 뽀모도로 타이머, 콤보시스템, 일일XP'},
{date:'2026-05-14',title:'Piano v7.0',items:'45곡(+10), AB구간반복, 일일챌린지, 미리듣기, 히스토리, 26업적'},
{date:'2026-05-14',title:'Karaoke v7.0',items:'45곡(+10), 재생큐, 코러스이펙트, 노래방번호, 20업적'},
{date:'2026-05-14',title:'Boxing Trainer v8.0',items:'일일챌린지14, 개인기록PR, 체형히트맵, 워밍업6단계, 테크닉도감9'},
{date:'2026-05-14',title:'Hatcuping v7.0',items:'업적모달, 일일챌린지, 통계차트, 명예의전당, 온보딩, 터치'},
{date:'2026-05-13',title:'Violin v6.0',items:'녹음, 튜너, 메트로놈, 드론, 22곡(+8), 20레슨(+10), 18업적'},
{date:'2026-05-13',title:'House Builder v5.0',items:'정자모드, 세이브슬뢿3개, 공유카드, 타임라인, 32업적, 퀴즈18'},
{date:'2026-05-12',title:'City Builder v5.0',items:'한국사퀴즈25, 계절시스템, 선택이벤트8, 건물도감60, 40업적, 26x26'},
{date:'2026-05-12',title:'Golf Tracker v5.0',items:'SG분석, 핸디캅, 바람보정, 클럽매트릭스, 스윙템포, 24업적'}
];

var fab=document.createElement('button');
fab.className='wn-fab';
fab.setAttribute('aria-label','What&#39;s New');
fab.setAttribute('title','What&#39;s New');
fab.innerHTML='✨<span class="wn-dot"></span>';
document.body.appendChild(fab);

var overlay=document.createElement('div');
overlay.className='wn-overlay';
overlay.setAttribute('role','dialog');
overlay.setAttribute('aria-modal','true');
overlay.setAttribute('aria-label','What&#39;s New');
var modal=document.createElement('div');
modal.className='wn-modal';
var modalHTML='<button class="wn-close" aria-label="Close">×</button>';
modalHTML+='<h2>What&#39;s New</h2>';
modalHTML+='<div class="wn-sub">12 projects updated since v5.0 (May 12~17, 2026)</div>';
changelog.forEach(function(e){
modalHTML+='<div class="wn-entry"><div class="wn-date">'+e.date+'</div><div class="wn-ttl">'+e.title+'</div><div class="wn-items">'+e.items+'</div></div>';
});
modal.innerHTML=modalHTML;
overlay.appendChild(modal);
document.body.appendChild(overlay);

fab.addEventListener('click',function(){
overlay.classList.add('open');
var dot=fab.querySelector('.wn-dot');
if(dot)dot.style.display='none';
playClick();
});
overlay.addEventListener('click',function(ev){
if(ev.target===overlay)overlay.classList.remove('open');
});
modal.querySelector('.wn-close').addEventListener('click',function(){
overlay.classList.remove('open');
});
document.addEventListener('keydown',function(ev){
if(ev.key==='Escape'&&overlay.classList.contains('open'))overlay.classList.remove('open');
if(ev.key==='n'&&!ev.ctrlKey&&!ev.metaKey&&document.activeElement.tagName!=='INPUT'){
overlay.classList.toggle('open');
var dot=fab.querySelector('.wn-dot');
if(dot)dot.style.display='none';
}
});

/* ===== EVOLUTION TIMELINE ===== */
var evoData=[
{ver:'v6.0',date:'2026-05-18',label:'Tech Filter + What&#39;s New + Timeline + SFX + Splash',detail:'기술필터, 플로팅 변경로그, 진화타임라인, Web Audio 효과음, 스플래시 로딩, 건강배지, 55,000+ LOC'},
{ver:'v5.0',date:'2026-05-12',label:'13 Project Data Refresh + Impact Badges + CTA',detail:'전체 프로젝트 데이터갱신, 임팩트메트릭배지, CTA섹션, 자동진화상태, 코드라인통계'},
{ver:'v4.0',date:'2026-05-08',label:'Hamburger + Gradient Mesh + Scroll Spy + Updates',detail:'모바일햄버거, 그래디언트메쉬Hero, 스크롤스파이, 버전뱃지, Latest Updates, 키보드단축키'},
{ver:'v3.0',date:'2026-05-02',label:'PRISM Showcase + 3D Tilt + Search + 8 New Cards',detail:'PRISM 8개 카드추가(17→25), Hero 타이핑, 3D틸트, 검색바, 그리드/리스트, 스킬바'},
{ver:'v2.0',date:'2026-04-04',label:'Navigation + Particles + Dark/Light + Modals',detail:'상단네비, Canvas파티클, 다크/라이트토글, 프로젝트 상세모달17개, 반응형3단계'},
{ver:'v1.0',date:'2026-03-01',label:'Initial Portfolio Launch',detail:'단일 index.html, 17개 프로젝트 카드, 다크테마, GitHub Pages 배포'}
];

var ctaSection=document.querySelector('.cta-section');
var insertRef=ctaSection||document.querySelector('footer');
if(insertRef){
var evoWrap=document.createElement('section');
evoWrap.className='section evo-wrap section-reveal';
var evoHTML='<h2>Evolution Timeline</h2><div class="evo-sub">From v1.0 to v6.0 — continuous AI-driven improvement</div><div class="evo-track">';
evoData.forEach(function(n){
evoHTML+='<div class="evo-node"><div class="evo-ver">'+n.ver+' — '+n.date+'</div><div class="evo-lbl">'+n.label+'</div><div class="evo-det">'+n.detail+'</div></div>';
});
evoHTML+='</div>';
evoWrap.innerHTML=evoHTML;
insertRef.parentNode.insertBefore(evoWrap,insertRef);

var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target)}})},{threshold:.1});
obs.observe(evoWrap);

evoWrap.querySelectorAll('.evo-node').forEach(function(node,i){
node.style.opacity='0';
node.style.transform='translateX(-20px)';
node.style.transition='opacity .4s ease '+i*0.1+'s, transform .4s ease '+i*0.1+'s';
var nodeObs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateX(0)';nodeObs.unobserve(e.target)}})},{threshold:.2});
nodeObs.observe(node);
});
}

/* ===== AGGREGATE TOTALS BAR ===== */
var statsSection=document.querySelector('.stats');
if(statsSection){
var totalEl=statsSection.querySelector('.total-lines');
if(totalEl){
totalEl.dataset.count='55000';
var tgt=55000,dur=1600,st=performance.now();
(function tick(now){
var p=Math.min((now-st)/dur,1);
var eased=1-Math.pow(1-p,3);
totalEl.textContent=Math.floor(tgt*eased).toLocaleString();
if(p<1)requestAnimationFrame(tick);
})(st);
}

var totalsBar=document.createElement('div');
totalsBar.className='v6-totals-bar';
var totals=[
{n:13,l:'Repositories'},
{n:308,l:'Achievements'},
{n:157,l:'Songs & Lessons'},
{n:55000,l:'Lines of Code'},
{n:6,l:'Versions'}
];
totals.forEach(function(t){
var d=document.createElement('div');
d.className='v6-total-item';
var numEl=document.createElement('div');
numEl.className='v6-total-num';
numEl.textContent='0';
d.appendChild(numEl);
var lblEl=document.createElement('div');
lblEl.className='v6-total-lbl';
lblEl.textContent=t.l;
d.appendChild(lblEl);
totalsBar.appendChild(d);

var target=t.n,duration=1400,start=performance.now();
(function animate(now){
var prog=Math.min((now-start)/duration,1);
var e=1-Math.pow(1-prog,3);
numEl.textContent=target>=1000?Math.floor(target*e).toLocaleString():Math.floor(target*e);
if(prog<1)requestAnimationFrame(animate);
})(start);
});
statsSection.parentNode.insertBefore(totalsBar,statsSection.nextSibling);
}

/* ===== WEB AUDIO SFX ===== */
var audioCtx=null;
function getAudioCtx(){
if(!audioCtx){
try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}
}
return audioCtx;
}

function playClick(){
var ctx=getAudioCtx();
if(!ctx)return;
try{
var o=ctx.createOscillator();
var g=ctx.createGain();
o.connect(g);g.connect(ctx.destination);
o.type='sine';
o.frequency.setValueAtTime(800,ctx.currentTime);
o.frequency.exponentialRampToValueAtTime(1200,ctx.currentTime+0.06);
g.gain.setValueAtTime(0.08,ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.1);
o.start(ctx.currentTime);
o.stop(ctx.currentTime+0.1);
}catch(e){}
}

function playHover(){
var ctx=getAudioCtx();
if(!ctx)return;
try{
var o=ctx.createOscillator();
var g=ctx.createGain();
o.connect(g);g.connect(ctx.destination);
o.type='sine';
o.frequency.setValueAtTime(600,ctx.currentTime);
g.gain.setValueAtTime(0.03,ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.06);
o.start(ctx.currentTime);
o.stop(ctx.currentTime+0.06);
}catch(e){}
}

function playSuccess(){
var ctx=getAudioCtx();
if(!ctx)return;
try{
var now=ctx.currentTime;
[523.25,659.25,783.99].forEach(function(freq,i){
var o=ctx.createOscillator();
var g=ctx.createGain();
o.connect(g);g.connect(ctx.destination);
o.type='sine';
o.frequency.setValueAtTime(freq,now+i*0.12);
g.gain.setValueAtTime(0.06,now+i*0.12);
g.gain.exponentialRampToValueAtTime(0.001,now+i*0.12+0.2);
o.start(now+i*0.12);
o.stop(now+i*0.12+0.2);
});
}catch(e){}
}

document.querySelectorAll('.card').forEach(function(card){
card.addEventListener('mouseenter',function(){playHover()});
card.addEventListener('click',function(){playClick()});
});

document.querySelectorAll('.nav-link,nav a,[class*=btn],.cta-links a').forEach(function(el){
el.addEventListener('click',function(){playClick()});
});

/* ===== CARD ENTRANCE ANIMATION ===== */
var cardObs=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
var delay=Array.prototype.indexOf.call(entry.target.parentNode.children,entry.target)*0.06;
entry.target.style.transitionDelay=delay+'s';
entry.target.classList.add('card-v6-visible');
cardObs.unobserve(entry.target);
}
});
},{threshold:.15});
document.querySelectorAll('.card').forEach(function(card){
card.classList.add('card-v6-enter');
cardObs.observe(card);
});

/* ===== LATEST UPDATES REFRESH ===== */
var ug=document.querySelector('.updates-grid');
if(ug){
var lat=[
{t:'History RPG v11.0',d:'2026-05-17',i:['역사도감30항목','캐릭터도감12종','연표BC2400~AD42','일일도전14종','퀴즈60문']},
{t:'SmartGolf v8.0',d:'2026-05-17',i:['코스공략18홀','스윙다이어리','그린리딩가이드','장비추천12종','토너먼트모드']},
{t:'Culture Center v4.0',d:'2026-05-17',i:['기타세분화20카테고리','AI추천엔진','주간시간표','강좌알림','강사검색']},
{t:'LevelPlay v3.0',d:'2026-05-16',i:['SM-2 간격반복','플래시카드','뽀모도로타이머','콤보시스템','일일XP목표']},
{t:'Piano v7.0',d:'2026-05-14',i:['45곡(+10곡추가)','AB구간반복','일일챌린지','햅틱피드백','26업적']},
{t:'Karaoke v7.0',d:'2026-05-14',i:['45곡(+10곡)','재생큐','코러스이펙트','노래방번호','20업적']},
{t:'Boxing v8.0',d:'2026-05-14',i:['일일챌린지14종','개인기록PR','체형히트맵','워밍업6단계','테크닉도감9']},
{t:'Violin v6.0',d:'2026-05-13',i:['녹음기능','크로매틱튜너','메트로놈','22곡(+8곡)','18업적']}
];
ug.innerHTML=lat.map(function(u){return '<div class="update-card"><div class="update-date">'+u.d+'</div><div class="update-title">'+u.t+'</div><ul>'+u.i.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('');
}
var usub=document.querySelector('#updates .section-sub');
if(usub)usub.textContent='Auto-evolving via NEXTERA+PRISM agent — 13 projects, latest: 2026-05-17';

/* ===== FOOTER TIMESTAMP UPDATE ===== */
var fts=document.querySelector('.footer-timestamp');
if(fts)fts.textContent='Last auto-update: 2026-05-18 | v6.0 | 13 repos · 6h rotation · 55,000+ LOC';

/* ===== ROTATION BADGE UPDATE ===== */
var rb=document.querySelector('.rotation-badge');
if(rb){
var span=rb.querySelector('span:not(.pulse-dot)');
if(!span){
var spans=rb.childNodes;
for(var i=0;i<spans.length;i++){
if(spans[i].nodeType===3&&spans[i].textContent.indexOf('Auto')>=0){
spans[i].textContent='Auto-evolution active — 6h rotation · v6.0 · 55,000+ LOC';
break;
}
}
}
}

/* ===== META / SEO UPDATE ===== */
var md=document.querySelector('meta[name="description"]');
if(md)md.content='25+ AI Collaboration Projects — NEXTERA + PRISM Auto-Evolving Portfolio v6.0. Tech filters, evolution timeline, 55,000+ LOC across 13 repos.';
var og=document.querySelector('meta[property="og:description"]');
if(og)og.content='25+ Projects Built Through Human-AI Collaboration. NEXTERA + PRISM auto-evolution v6.0. Tech filters, timeline, 55K+ LOC.';
var tw=document.querySelector('meta[name="twitter:description"]');
if(tw)tw.content='25+ AI Collaboration Projects — NEXTERA + PRISM v6.0. 13 repos, 55,000+ lines.';

/* ===== KEYBOARD SHORTCUT ENHANCEMENTS ===== */
document.addEventListener('keydown',function(ev){
if(document.activeElement.tagName==='INPUT'||document.activeElement.tagName==='TEXTAREA')return;
if(ev.ctrlKey||ev.metaKey)return;
switch(ev.key){
case 't':case 'T':
var fw=document.querySelector('.tech-filter-wrap');
if(fw)fw.scrollIntoView({behavior:'smooth',block:'center'});
break;
case 'e':case 'E':
var ew=document.querySelector('.evo-wrap');
if(ew)ew.scrollIntoView({behavior:'smooth',block:'start'});
break;
}
});

/* ===== PERFORMANCE: LAZY LOAD CARD IMAGES ===== */
if('IntersectionObserver' in window){
document.querySelectorAll('.card-thumb img, .card-thumb svg').forEach(function(img){
if(img.dataset.src&&!img.src){
var lo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){img.src=img.dataset.src;lo.unobserve(img)}})},{rootMargin:'200px'});
lo.observe(img);
}
});
}

window._v6={ver:'6.0',updated:'2026-05-18'};
})();
