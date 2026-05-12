(function(){
'use strict';

/* ====== CSS INJECTION ====== */
var s=document.createElement('style');
s.textContent=[
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
'.card-entrance{opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease}',
'.card-entrance.entered{opacity:1;transform:translateY(0)}'
].join('\n');
document.head.appendChild(s);

/* ====== PROJECT DATA UPDATES ====== */
var U={
'History RPG':{ver:'v10.0',desc:'한국사 영걸전 스타일 전략 RPG v10.0. 24업적시스템, 전적통계20+항목, 턴순서패널, 역사퀴즈 40문, SFX 4종, SW스크립트주입, SEO강화.',m:'40 퀴즈'},
'Piano':{ver:'v6.0',desc:'Tone.js 피아노 리듬게임 v6.0. 35곡, 즐겨찾기, 최고점수, 손별연습, 정렬, 최근연주 기록, 18업적, 메트로놘.',m:'35곡'},
'Violin':{ver:'v5.0',desc:'9배음 하모닉 바이올린 v5.0. 오디오엔진 재작성, 14곡+10레슨, 업적, 통계 대시보드, 다크/라이트 모드, 151KB.',m:'14곡'},
'Karaoke':{ver:'v6.0',desc:'MPM 음정검출 노래방 v6.0. 35곡, 하단탭네비, 난이도필터, 통계대시보드, 12업적, 에코이펙트, 박수SFX, 정렬5종.',m:'35곡'},
'Golf Tracker':{ver:'v4.0',desc:'Frame Differencing CV 골프트래커 v4.0. 다크라이트모드, 멀티샷비교, 클럽AI추천, 거리캘리브레이션, 16업적, 트렌드차트.',m:'16업적'},
'Boxing Trainer':{ver:'v7.0',desc:'Three.js 3D 복싱 트레이너 v7.0. 랭크시스템, 24업적, 히트맵, 펌치분석도넛, 훈련플래너, 팁, 내보내기, 펌치타입추적.',m:'24업적'},
'City Builder':{ver:'v4.0',desc:'아이소메트릭 도시 건설 v4.0. 정책시스템, 퀴스트10개, 교역8개, 건물업그레이드, 샌드박스, 22x22그리드, 30업적.',m:'30업적'},
'House Builder':{ver:'v4.0',desc:'Three.js 3D 한국전통건축 v4.0. 서원(書院)모드 신규, 다크라이트모드, 비교모달, 24업적, 퀴즈15문, ARIA접근성.',m:'24업적'},
'Hatcuping Escape Adventure':{ver:'v6.0',desc:'v6.0 통합 엔진. 다크모드토글, 난이도선택, 업적시스템, 통계 대시보드, 접근성ARIA, 보스3페이즈, BGM 5종.',m:'3페이즈'},
'Hatcuping RPG Adventure':{ver:'v6.0',desc:'v6.0 통합 RPG. 다크모드토글, 난이도선택, 업적시스템, 통계, 접근성, 데미지팝업, BGM 맵/전투 자동전환.',m:'5종 BGM'},
'SmartGolf':{ver:'v5.0',desc:'전국 590개 골프장 PWA v5.0. 리뷰시스템, 난이도분석, 레이더차트, 라운드기록, 공유카드, 계절테마, 키보드단축키.',m:'590 골프장'},
'Culture Center Finder':{ver:'v3.0',desc:'95,064개 문화센터 강좌 v3.0. 지역필터, 가격분석, 무한스크롤, 온보딩 튜토리얼, 접근성, 통계, Footer.',m:'95,064건'},
'LevelPlay':{ver:'v2.0',desc:'성취 기반 학습 플랫폼 v2.0. 주간챌린지, Canvas 수료증, 오프라인표시, 과목마스터리, Notification알림, 접근성, 인쇄지원.',m:'Lv.100'}
};

document.querySelectorAll('.card').forEach(function(card){
var te=card.querySelector('.card-title');
if(!te)return;
var t=te.textContent.trim();
var u=U[t];
if(!u)return;
var de=card.querySelector('.card-desc');
if(de)de.textContent=u.desc;
var vb=card.querySelector('.version-badge');
if(vb)vb.textContent=u.ver;
if(u.m){
var th=card.querySelector('.card-thumb');
if(th&&!th.querySelector('.impact-badge')){
var b=document.createElement('span');
b.className='impact-badge';
b.textContent=u.m;
th.appendChild(b);
}
}
});

/* ====== LATEST UPDATES SECTION ====== */
var ug=document.querySelector('.updates-grid');
if(ug){
var lat=[
{t:'History RPG v10.0',d:'2026-05-12',i:['24업적시스템','전적통계20+항목','턴순서패널','퀴즈40문','SFX4종']},
{t:'SmartGolf v5.0',d:'2026-05-12',i:['리뷰시스템','레이더차트','라운드기록','공유카드','계절테마']},
{t:'LevelPlay v2.0',d:'2026-05-11',i:['주간챌린지','Canvas수료증','과목마스터리','알림','접근성']},
{t:'Culture Center v3.0',d:'2026-05-11',i:['지역필터','가격분석','무한스크롤','온보딩','통계강화']},
{t:'Boxing Trainer v7.0',d:'2026-05-10',i:['랭크시스템','24업적','히트맵','펌치분석','플래너']},
{t:'Piano v6.0',d:'2026-05-10',i:['8곡추가(35곡)','즐겨찾기','최고점수','손별연습','18업적']},
{t:'Karaoke v6.0',d:'2026-05-10',i:['10곡추가(35곡)','하단탭네비','난이도필터','12업적','에코이펙트']},
{t:'Hatcuping v6.0',d:'2026-05-10',i:['다크모드토글','난이도선택','업적시스템','통계','접근성']}
];
ug.innerHTML=lat.map(function(u){return '<div class="update-card"><div class="update-date">'+u.d+'</div><div class="update-title">'+u.t+'</div><ul>'+u.i.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('');
}
var usub=document.querySelector('#updates .section-sub');
if(usub)usub.textContent='Auto-evolving via NEXTERA+PRISM agent — 13 projects, latest: 2026-05-12';

/* ====== CTA SECTION ====== */
var footer=document.querySelector('footer');
if(footer){
var cta=document.createElement('section');
cta.className='section cta-section section-reveal';
cta.innerHTML='<h2>Explore the Projects</h2>'
+'<p>All projects are open-source and deployed live. 13 PRISM projects auto-evolve every 6 hours via the NEXTERA+PRISM agent.</p>'
+'<div class="rotation-badge"><span class="pulse-dot"></span>Auto-evolution active — 6h rotation cycle</div>'
+'<div class="cta-links" style="margin-top:1.5rem">'
+'<a class="cta-gh" href="https://github.com/bsy522-dot" target="_blank" rel="noopener">'
+'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>'
+'GitHub</a>'
+'<a class="cta-demo" href="#projects">Browse All Projects</a>'
+'</div>';
footer.parentNode.insertBefore(cta,footer);
var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target)}})},{threshold:.1});
obs.observe(cta);
}

/* ====== FOOTER TIMESTAMP ====== */
var fb=document.querySelector('.footer-bottom');
if(fb){
var ts=document.createElement('div');
ts.className='footer-timestamp';
ts.textContent='Last auto-update: 2026-05-12 | v5.0 | 13 repos · 6h rotation';
fb.appendChild(ts);
}

/* ====== STATS: ADD LINES OF CODE ====== */
var sd=document.querySelector('.stats');
if(sd&&sd.querySelectorAll('.stat').length===5){
var ns=document.createElement('div');
ns.className='stat';
ns.innerHTML='<div class="stat-num total-lines" data-count="48000">0</div><div class="stat-label">Lines of Code</div>';
sd.appendChild(ns);
var el=ns.querySelector('.stat-num');
var tgt=48000,dur=1500,st=performance.now();
(function tick(now){
var p=Math.min((now-st)/dur,1);
var eased=1-Math.pow(1-p,3);
el.textContent=Math.floor(tgt*eased).toLocaleString();
if(p<1)requestAnimationFrame(tick);
})(st);
}

/* ====== META UPDATES ====== */
var md=document.querySelector('meta[name="description"]');
if(md)md.content='25+ AI Collaboration Projects — NEXTERA + PRISM Auto-Evolving Portfolio. 13 repos on 6-hour rotation. v5.0 (2026-05-12)';
var og=document.querySelector('meta[property="og:description"]');
if(og)og.content='25+ Projects Built Through Human-AI Collaboration. NEXTERA + PRISM auto-evolution system. v5.0';

window._v5={ver:'5.0',updated:'2026-05-12'};
})();
