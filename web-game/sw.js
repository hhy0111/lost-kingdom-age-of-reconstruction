const CACHE_NAME = 'lost-kingdom-runtime-v26';
const CORE_ASSETS = [
  '/web-game/',
  '/web-game/index.html',
  '/web-game/privacy-policy.html',
  '/web-game/styles.css',
  '/web-game/app.js',
  '/web-game/runtime-core.js',
  '/web-game/runtime-data.json',
  '/web-game/audio-manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});
