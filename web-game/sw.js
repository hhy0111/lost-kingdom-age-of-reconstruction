const CACHE_NAME = 'lost-kingdom-runtime-v28';
const CORE_ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'privacy-policy.html',
  'styles.css',
  'app.js',
  'runtime-core.js',
  'runtime-data.json',
  'audio-manifest.json',
  'icons/app-icon-192.png',
  'icons/app-icon-512.png',
  'icons/app-icon-maskable-512.png'
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
