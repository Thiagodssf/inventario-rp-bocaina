const CACHE='bocaina-rp-v12';
const ASSETS=['./','./index.html','./styles.css','./header-overrides.css','./script.js','./stock.js','./menu-overrides.js','./municiamento-banco.js','./cardapio.js','./banco-generos-ajuste.js','./planejamento-semanal.js','./manifest.webmanifest','./brasao-bocaina.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request))));