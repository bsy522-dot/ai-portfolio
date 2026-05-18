const CACHE='ai-portfolio-v6';
const ASSETS=['./index.html','./manifest.json','./og-image.svg','./js/v6_patch.js','./games/hatcuping-game.html','./games/hatcuping-rpg.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
const url=new URL(e.request.url);
const isNav=url.pathname.endsWith('.html')||url.pathname.endsWith('/')||url.pathname==='';
if(!isNav){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));return;}
const isIndex=url.pathname.endsWith('index.html')||url.pathname.endsWith('/')||url.pathname==='';
e.respondWith(
(isIndex?injectPatch(e.request):fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c))}return r}))
.catch(()=>isIndex?caches.match(e.request).then(r=>r?injectIntoResponse(r):r):caches.match(e.request))
);
});
async function injectPatch(req){
try{
const r=await fetch(req);
if(!r.ok)throw new Error('net');
const c=r.clone();
caches.open(CACHE).then(cache=>cache.put(req,c));
return injectIntoResponse(r);
}catch(e){
const cached=await caches.match(req);
return cached?injectIntoResponse(cached):cached;
}
}
async function injectIntoResponse(resp){
if(!resp)return resp;
const html=await resp.text();
if(html.indexOf('v6_patch')>=0)return new Response(html,{headers:{'Content-Type':'text/html'}});
const tag='<scr'+'ipt src="./js/v6_patch.js"></scr'+'ipt>';
const injected=html.replace('</body>',tag+'</body>');
return new Response(injected,{headers:{'Content-Type':'text/html'}});
}