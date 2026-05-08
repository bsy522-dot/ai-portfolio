const CACHE='ai-portfolio-v4';
const ASSETS=['./index.html','./manifest.json','./og-image.svg','./games/hatcuping-game.html','./games/hatcuping-rpg.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
const url=new URL(e.request.url);
if(url.pathname.endsWith('.html')||url.pathname==='/'){
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c))}return r}).catch(()=>caches.match(e.request)));
}else{
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
}
});
