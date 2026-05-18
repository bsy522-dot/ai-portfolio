(function(){
'use strict';

var CSS=[
'.impact-badge{position:absolute;bottom:8px;right:8px;background:rgba(99,102,241,.85);color:#fff;font-size:.65rem;padding:2px 8px;border-radius:10px;font-weight:600;backdrop-filter:blur(4px);z-index:2;letter-spacing:.3px}',
'.cta-section{text-align:center;padding:4rem 2rem;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(168,85,247,.08));border-radius:16px;margin:2rem auto;max-width:800px}',
'.cta-section h2{font-size:1.8rem;margin-bottom:.5rem;background:linear-gradient(90deg,var(--cyan,#6366f1),var(--purple,#a855f7));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
'.cta-section p{color:var(--text-dim,#888);margin-bottom:1.5rem;font-size:.95rem;line-height:1.6}',
'.cta-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}',
'.cta-links a{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.5rem;border-radius:8px;text-decoration:none;font-size:.9rem;font-weight:500;transition:all .3s}',
'.cta-links a.cta-gh{background:var(--card-bg,#1a1a2e);border:1px solid var(--border,#333);color:var(--text,#eee)}',
'.cta-links a.cta-gh:hover{border-color:var(--cyan,#6366f1);box-shadow:0 0 20px rgba(99,102,241,.3)}',
'.cta-links a.cta-demo{background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none}',
'.cta-links a.cta-demo:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(99,102,241,.4)}',
'.rotation-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.3);border-radius:20px;padding:4px 14px;font-size:.75rem;color:var(--cyan,#6366f1);margin-top:.8rem}',
'.rotation-badge .pulse-dot{width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulseDot 2s infinite}',
'@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}',
'.footer-timestamp{text-align:center;font-size:.7rem;color:var(--text-dim,#888);padding-top:.5rem;opacity:.6}',
'.total-lines{font-variant-numeric:tabular-nums}',

'.tech-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:1.2rem auto;max-width:900px}',
'.tech-chip{padding:4px 12px;border-radius:16px;font-size:.72rem;font-weight:500;cursor:pointer;border:1px solid var(--border,#333);background:var(--card-bg,#1a1a2e);color:var(--text-dim,#aaa);transition:all .25s;user-select:none}',
'.tech-chip:hover{border-color:var(--cyan,#6366f1);color:var(--cyan,#6366f1)}',
'.tech-chip.active{background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border-color:transparent}',

'.activity-feed{max-width:700px;margin:1.5rem auto;position:relative;padding-left:24px}',
'.activity-feed::before{content:"";position:absolute;left:7px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--cyan,#6366f1),var(--purple,#a855f7),transparent)}',
'.af-item{position:relative;padding:8px 0 16px 20px;font-size:.82rem;color:var(--text-dim,#aaa);line-height:1.5}',
'.af-item::before{content:"";position:absolute;left:-20px;top:12px;width:10px;height:10px;border-radius:50%;background:var(--cyan,#6366f1);border:2px solid var(--bg,#0a0a1a)}',
'.af-item strong{color:var(--text,#eee);font-weight:600}',
'.af-date{font-size:.68rem;color:var(--text-dim,#666);margin-left:8px}',

'.metrics-bar{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;max-width:900px;margin:1.5rem auto;padding:0 1rem}',
'.metric-card{background:var(--card-bg,#1a1a2e);border:1px solid var(--border,#222);border-radius:12px;padding:12px 14px;text-align:center;transition:border-color .3s}',
'.metric-card:hover{border-color:var(--cyan,#6366f1)}',
'.metric-val{font-size:1.4rem;font-weight:700;background:linear-gradient(90deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-variant-numeric:tabular-nums}',
'.metric-label{font-size:.65rem;color:var(--text-dim,#888);margin-top:2px;text-transform:uppercase;letter-spacing:.5px}',

'.featured-glow{animation:featGlow 3s ease-in-out infinite}',
'@keyframes featGlow{0%,100%{box-shadow:0 0 0 rgba(99,102,241,0)}50%{box-shadow:0 0 30px rgba(99,102,241,.25)}}',

'.card-entrance{opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease}',
'.card-entrance.entered{opacity:1;transform:translateY(0)}',

'.update-badge-new{display:inline-block;background:#10b981;color:#fff;font-size:.55rem;padding:1px 6px;border-radius:8px;margin-left:6px;font-weight:600;vertical-align:middle;letter-spacing:.3px}',

'.roadmap-section{max-width:800px;margin:2rem auto;padding:0 1rem}',
'.roadmap-section h3{font-size:1.1rem;margin-bottom:1rem;color:var(--text,#eee);display:flex;align-items:center;gap:8px}',
'.rm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}',
'.rm-card{background:var(--card-bg,#1a1a2e);border:1px solid var(--border,#222);border-radius:10px;padding:12px 14px;font-size:.78rem;line-height:1.5;transition:border-color .3s,transform .2s}',
'.rm-card:hover{border-color:var(--cyan,#6366f1);transform:translateY(-2px)}',
'.rm-card .rm-title{font-weight:600;color:var(--text,#eee);margin-bottom:4px}',
'.rm-card .rm-desc{color:var(--text-dim,#888)}',
'.rm-card .rm-tag{display:inline-block;font-size:.6rem;padding:1px 6px;border-radius:8px;margin-top:6px;font-weight:500}',
'.rm-tag.planned{background:rgba(99,102,241,.15);color:#818cf8}',
'.rm-tag.inprog{background:rgba(245,158,11,.15);color:#fbbf24}',
'.rm-tag.done{background:rgba(16,185,129,.15);color:#34d399}'
].join('\n');
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

/* ====== PROJECT DATA v6.0 — ALL 13 REPOS LATEST ====== */
var U={
'History RPG':{ver:'v11.0',desc:'한국사 영걸전 Three.js 3D RPG v11.0. 역사도감 30항목, 캐릭터도감 12종, 연표 17사건, 일일도전 14종, 전략가이드, 퀴즈 60문, SFX 4종.',m:'60 퀴즈',tech:['Three.js','3D','RPG']},
'Piano':{ver:'v7.0',desc:'Tone.js 피아노 리듬게임 v7.0. 45곡, AB구간반복, 일일챌린지, 곡미리듣기, 연습히스토리, 행틱피드백, 26업적, 한국민요 카테고리.',m:'45곡',tech:['Tone.js','Audio','PWA']},
'Violin':{ver:'v6.0',desc:'9배음 하모닉 바이올린 v6.0. 녹음기능, 연주기록, 튜너, 메트로놈, 드론, 템포조절, 22곡, 10레슨, 8업적, 접근성 강화.',m:'22곡',tech:['Tone.js','Audio','PWA']},
'Karaoke':{ver:'v7.0',desc:'MPM 음정검출 노래방 v7.0. 45곡, 일일챌린지, 재생큐, 코러스이펙트, 노래방번호, 20업적, 접근성, SEO 강화.',m:'45곡',tech:['Audio','WebRTC','PWA']},
'Golf Tracker':{ver:'v5.0',desc:'Frame Differencing CV 골프트래커 v5.0. SG분석, 핸디캅추적, 바람보정, 클럽거리매트릭스, 스윙템포, 공유카드, 드릴 8종, 24업적.',m:'24업적',tech:['Canvas','CV','PWA']},
'Boxing Trainer':{ver:'v8.0',desc:'Three.js 3D 복싱 트레이너 v8.0. 일일챌린지, 개인기록, 체형히트맵, 워밍업가이드, 테크닉도감 9종, 명언 8개, 키보드단축키 6종.',m:'9종 도감',tech:['Three.js','3D','WebGL']},
'City Builder':{ver:'v5.0',desc:'아이소메트릭 도시경영 v5.0. 한국사퀴즈 25문, 계절시스템, 선택이벤트 8개, 건물도감 60종, 40업적, 26x26그리드, 인구세분화.',m:'60종 건물',tech:['Canvas','Isometric','PWA']},
'House Builder':{ver:'v5.0',desc:'Three.js 3D 한국전통건축 v5.0. 정자모드 신규, 세이브슬롯 3개, 공유카드, 건축타임라인, 32업적, 퀴즈 18문, 접근성 강화.',m:'32업적',tech:['Three.js','3D','WebGL']},
'Hatcuping Escape Adventure':{ver:'v7.0',desc:'하켄핑 플랫포머 v7.0. 업적모달, 일일챌린지, 통계차트, 명예의전당, 온보딩, 터치스와이프, UI효과음, SEO 강화.',m:'명예의전당',tech:['Canvas','Game','PWA']},
'Hatcuping RPG Adventure':{ver:'v7.0',desc:'하켄핑 RPG v7.0. 업적모달, 일일챌린지, 통계차트, 명예의전당, 온보딩, 터치스와이프, UI효과음, RPG전투.',m:'RPG전투',tech:['Canvas','RPG','PWA']},
'SmartGolf':{ver:'v8.0',desc:'전국 590개 골프장 PWA v8.0. 코스공략 18홀, 스윙다이어리, 그린리딩, 장비추천, 토너먼트모드, 멘탈코칭, 에티켓 25개.',m:'590 골프장',tech:['Leaflet','OSRM','PWA']},
'Culture Center Finder':{ver:'v4.0',desc:'95,064개 문화센터 강좌 v4.0. 기타세분화 20카테고리, AI추천엔진, 주간시간표, 강좌알림, 강사검색, 효과음 6종.',m:'95,064건',tech:['PWA','Data','Search']},
'LevelPlay':{ver:'v3.0',desc:'성취 기반 학습 플랫폼 v3.0. SM-2 간격반복, 플래시카드, 뽀모도로 타이머, 콤보시스템, 빈칸+OX퀴즈, 인성감성과목, 효과음 6종.',m:'140+ 레슨',tech:['PWA','Education','Audio']}
};

var TECHS={};
Object.keys(U).forEach(function(k){
(U[k].tech||[]).forEach(function(t){
if(!TECHS[t])TECHS[t]=[];
TECHS[t].push(k);
});
});

/* ====== UPDATE CARDS ====== */
var cardMap={};
document.querySelectorAll('.card').forEach(function(card){
var te=card.querySelector('.card-title');
if(!te)return;
var t=te.textContent.trim();
cardMap[t]=card;
var u=U[t];
if(!u)return;
var de=card.querySelector('.card-desc');
if(de)de.textContent=u.desc;
var vb=card.querySelector('.version-badge');
if(vb)vb.textContent=u.ver;
var oldBadge=card.querySelector('.impact-badge');
if(oldBadge)oldBadge.remove();
if(u.m){
var th=card.querySelector('.card-thumb');
if(th){
var b=document.createElement('span');
b.className='impact-badge';
b.textContent=u.m;
th.appendChild(b);
}
}
card.setAttribute('data-techs',(u.tech||[]).join(','));
});

/* ====== TECH FILTER CHIPS ====== */
var projSection=document.querySelector('#projects');
if(projSection){
var chipWrap=document.createElement('div');
chipWrap.className='tech-chips';
var allChip=document.createElement('span');
allChip.className='tech-chip active';
allChip.textContent='All';
allChip.setAttribute('data-filter','all');
chipWrap.appendChild(allChip);
var techOrder=['Three.js','Tone.js','Canvas','Audio','PWA','3D','WebGL','RPG','Game','Leaflet','CV','Data','Education','Search','Isometric','WebRTC','OSRM'];
var shown={};
techOrder.forEach(function(t){
if(TECHS[t]&&!shown[t]){
shown[t]=true;
var c=document.createElement('span');
c.className='tech-chip';
c.textContent=t+' ('+TECHS[t].length+')';
c.setAttribute('data-filter',t);
chipWrap.appendChild(c);
}
});
var searchBar=projSection.querySelector('.search-bar')||projSection.querySelector('input');
var grid=projSection.querySelector('.grid');
if(grid){
grid.parentNode.insertBefore(chipWrap,grid);
}else if(searchBar){
searchBar.parentNode.insertBefore(chipWrap,searchBar.nextSibling);
}else{
var sh=projSection.querySelector('.section-header')||projSection.querySelector('h2');
if(sh)sh.parentNode.insertBefore(chipWrap,sh.nextSibling);
}
chipWrap.addEventListener('click',function(e){
var chip=e.target.closest('.tech-chip');
if(!chip)return;
chipWrap.querySelectorAll('.tech-chip').forEach(function(c){c.classList.remove('active')});
chip.classList.add('active');
var f=chip.getAttribute('data-filter');
document.querySelectorAll('.card').forEach(function(card){
if(f==='all'){card.style.display='';return}
var dt=card.getAttribute('data-techs')||'';
card.style.display=dt.indexOf(f)>=0?'':'none';
});
});
}

/* ====== METRICS DASHBOARD ====== */
var statsSection=document.querySelector('.stats')||document.querySelector('#stats');
if(statsSection){
var mb=document.createElement('div');
mb.className='metrics-bar';
var metrics=[
{val:'13',label:'Active Repos'},
{val:'56K+',label:'Lines of Code'},
{val:'v6.0',label:'Latest Version'},
{val:'6h',label:'Update Cycle'},
{val:'280+',label:'Total Achievements'},
{val:'250+',label:'Total Songs/Quizzes'}
];
mb.innerHTML=metrics.map(function(m){
return '<div class="metric-card"><div class="metric-val">'+m.val+'</div><div class="metric-label">'+m.label+'</div></div>';
}).join('');
statsSection.parentNode.insertBefore(mb,statsSection.nextSibling);
}

/* ====== ACTIVITY FEED ====== */
var updatesSection=document.querySelector('#updates');
if(updatesSection){
var feed=document.createElement('div');
feed.className='activity-feed';
var events=[
{date:'2026-05-17',title:'History RPG v11.0',desc:'역사도감 30+캐릭터도감 12+연표+일일도전+전략가이드'},
{date:'2026-05-17',title:'SmartGolf v8.0',desc:'코스공략 18홀+스윙다이어리+토너먼트+멘탈코칭'},
{date:'2026-05-17',title:'Culture Center v4.0',desc:'기타세분화 20카테고리+AI추천엔진+주간시간표'},
{date:'2026-05-16',title:'LevelPlay v3.0',desc:'SM-2 간격반복+플래시카드+뽀모도로+콤보시스템'},
{date:'2026-05-14',title:'Piano v7.0',desc:'45곡+AB구간반복+일일챌린지+행틱피드백+26업적'},
{date:'2026-05-14',title:'Karaoke v7.0',desc:'45곡+코러스이펙트+노래방번호+20업적'},
{date:'2026-05-14',title:'Hatcuping v7.0',desc:'업적모달+일일챌린지+명예의전당+통계차트'},
{date:'2026-05-14',title:'Boxing v8.0',desc:'일일챌린지+체형히트맵+테크닉도감 9종'},
{date:'2026-05-13',title:'Violin v6.0',desc:'녹음+튜너+메트로놈+드론+템포조절+22곡'},
{date:'2026-05-13',title:'House Builder v5.0',desc:'정자모드+세이브슬롯+타임라인+32업적'}
];
feed.innerHTML=events.map(function(ev){
return '<div class="af-item"><strong>'+ev.title+'</strong><span class="af-date">'+ev.date+'</span><br>'+ev.desc+'</div>';
}).join('');
var ug=updatesSection.querySelector('.updates-grid');
if(ug){
ug.parentNode.insertBefore(feed,ug);
}else{
updatesSection.appendChild(feed);
}
}

/* ====== LATEST UPDATES GRID ====== */
var ug2=document.querySelector('.updates-grid');
if(ug2){
var lat=[
{t:'History RPG v11.0',d:'2026-05-17',i:['역사도감 30항목','캐릭터도감 12종','인터랙티브 연표','일일도전 14종','퀴즈60문']},
{t:'SmartGolf v8.0',d:'2026-05-17',i:['코스공략 18홀','스윙다이어리','토너먼트모드','멘탈코칭','에티켓25개']},
{t:'Culture Center v4.0',d:'2026-05-17',i:['기타세분화 20카테고리','AI추천엔진','주간시간표','강좌알림','강사검색']},
{t:'LevelPlay v3.0',d:'2026-05-16',i:['SM-2 간격반복','플래시카드','뽀모도로타이머','콤보시스템','인성감성과목']},
{t:'Piano v7.0',d:'2026-05-14',i:['45곡(+10곡)','AB구간반복','일일챌린지','곡미리듣기','26업적']},
{t:'Karaoke v7.0',d:'2026-05-14',i:['45곡(+10곡)','재생큐','코러스이펙트','노래방번호','20업적']},
{t:'Hatcuping v7.0',d:'2026-05-14',i:['업적모달UI','일일챌린지','통계차트','명예의전당','터치스와이프']},
{t:'Boxing v8.0',d:'2026-05-14',i:['체형히트맵','워밍업가이드','테크닉도감9종','개인기록PR','공유카드']}
];
ug2.innerHTML=lat.map(function(u){return '<div class="update-card"><div class="update-date">'+u.d+'<span class="update-badge-new">NEW</span></div><div class="update-title">'+u.t+'</div><ul>'+u.i.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('');
}
var usub=document.querySelector('#updates .section-sub');
if(usub)usub.textContent='Auto-evolving via NEXTERA+PRISM agent — 13 projects, latest: 2026-05-17';

/* ====== ROADMAP SECTION ====== */
var footer=document.querySelector('footer');
if(footer){
var rm=document.createElement('div');
rm.className='roadmap-section section-reveal';
rm.innerHTML='<h3>🗺 Project Roadmap</h3><div class="rm-grid">'
+'<div class="rm-card"><div class="rm-title">Multiplayer Mode</div><div class="rm-desc">Boxing Trainer + City Builder 실시간 대전</div><span class="rm-tag planned">Planned</span></div>'
+'<div class="rm-card"><div class="rm-title">AI Tutor v2</div><div class="rm-desc">LevelPlay GPT 기반 개인화 학습</div><span class="rm-tag planned">Planned</span></div>'
+'<div class="rm-card"><div class="rm-title">Mobile Native</div><div class="rm-desc">전체 프로젝트 TWA/PWA 최적화</div><span class="rm-tag inprog">In Progress</span></div>'
+'<div class="rm-card"><div class="rm-title">Achievement Hub</div><div class="rm-desc">13개 프로젝트 통합 업적 대시보드</div><span class="rm-tag planned">Planned</span></div>'
+'<div class="rm-card"><div class="rm-title">Audio Engine v3</div><div class="rm-desc">Piano+Violin+Karaoke 통합 엔진</div><span class="rm-tag inprog">In Progress</span></div>'
+'<div class="rm-card"><div class="rm-title">Data Analytics</div><div class="rm-desc">사용자 통계+학습분석 대시보드</div><span class="rm-tag planned">Planned</span></div>'
+'</div>';
footer.parentNode.insertBefore(rm,footer);

/* ====== CTA SECTION ====== */
var cta=document.createElement('section');
cta.className='section cta-section section-reveal';
cta.innerHTML='<h2>Explore the Projects</h2>'
+'<p>All 13 projects are open-source and deployed live. Auto-evolving every 6 hours via NEXTERA+PRISM agent — from education platforms to 3D games.</p>'
+'<div class="rotation-badge"><span class="pulse-dot"></span>Auto-evolution active — 6h rotation · v6.0</div>'
+'<div class="cta-links" style="margin-top:1.5rem">'
+'<a class="cta-gh" href="https://github.com/bsy522-dot" target="_blank" rel="noopener">'
+'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>'
+'GitHub</a>'
+'<a class="cta-demo" href="#projects">🚀 Browse All Projects</a>'
+'</div>';
footer.parentNode.insertBefore(cta,footer);

var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target)}})},{threshold:.1});
obs.observe(rm);obs.observe(cta);
}

/* ====== FOOTER TIMESTAMP ====== */
var fb=document.querySelector('.footer-bottom');
if(fb){
var oldTs=fb.querySelector('.footer-timestamp');
if(oldTs)oldTs.remove();
var ts=document.createElement('div');
ts.className='footer-timestamp';
ts.textContent='Last auto-update: 2026-05-18 | v6.0 | 13 repos · 6h rotation · 56K+ lines';
fb.appendChild(ts);
}

/* ====== STATS: UPDATE LINES COUNTER ====== */
var sd=document.querySelector('.stats');
if(sd){
var existing=sd.querySelector('.total-lines');
if(existing){
existing.setAttribute('data-count','56000');
var tgt=56000,dur=1500,startT=performance.now();
(function tick(now){
var p=Math.min((now-startT)/dur,1);
var eased=1-Math.pow(1-p,3);
existing.textContent=Math.floor(tgt*eased).toLocaleString();
if(p<1)requestAnimationFrame(tick);
})(startT);
}else if(sd.querySelectorAll('.stat').length<=5){
var ns=document.createElement('div');
ns.className='stat';
ns.innerHTML='<div class="stat-num total-lines" data-count="56000">0</div><div class="stat-label">Lines of Code</div>';
sd.appendChild(ns);
var el=ns.querySelector('.stat-num');
var tgt2=56000,dur2=1500,st2=performance.now();
(function tick2(now){
var p=Math.min((now-st2)/dur2,1);
var eased=1-Math.pow(1-p,3);
el.textContent=Math.floor(tgt2*eased).toLocaleString();
if(p<1)requestAnimationFrame(tick2);
})(st2);
}
}

/* ====== FEATURED PROJECT HIGHLIGHT ====== */
var featured=['History RPG','SmartGolf','Piano'];
featured.forEach(function(name){
var c=cardMap[name];
if(c)c.classList.add('featured-glow');
});

/* ====== CARD ENTRANCE ANIMATION ====== */
var cardObs=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('entered');
cardObs.unobserve(entry.target);
}
});
},{threshold:0.05,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.card').forEach(function(card){
card.classList.add('card-entrance');
cardObs.observe(card);
});

/* ====== SEO META UPDATES ====== */
var md=document.querySelector('meta[name="description"]');
if(md)md.content='25+ AI Collaboration Projects — NEXTERA + PRISM Auto-Evolving Portfolio. 13 repos, 56K+ lines, 6-hour rotation. v6.0 (2026-05-18)';
var og=document.querySelector('meta[property="og:description"]');
if(og)og.content='25+ Projects Built Through Human-AI Collaboration. 13 repos auto-evolving every 6h. Three.js 3D, Tone.js Audio, PWA, CV. v6.0';
var kw=document.querySelector('meta[name="keywords"]');
if(kw)kw.content='AI portfolio,Three.js,Tone.js,PWA,Korean history RPG,piano game,violin simulator,karaoke,golf tracker,boxing trainer,city builder,house builder,NEXTERA,PRISM';

/* ====== KEYBOARD SHORTCUT: R = RANDOM PROJECT ====== */
document.addEventListener('keydown',function(e){
if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
if(e.key==='r'||e.key==='R'){
var cards=Array.from(document.querySelectorAll('.card'));
var visible=cards.filter(function(c){return c.style.display!=='none'});
if(visible.length){
var pick=visible[Math.floor(Math.random()*visible.length)];
pick.scrollIntoView({behavior:'smooth',block:'center'});
pick.style.transition='box-shadow .3s';
pick.style.boxShadow='0 0 40px rgba(99,102,241,.5)';
setTimeout(function(){pick.style.boxShadow=''},1500);
}
}
});

window._v6={ver:'6.0',updated:'2026-05-18',repos:13,lines:'56K+'};
})();