const CACHE='ai-portfolio-v1';
const ASSETS=['./index.html','./manifest.json','./games/hatcuping-game.html','./games/hatcuping-rpg.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
