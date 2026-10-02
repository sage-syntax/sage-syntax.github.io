// SunScout Service Worker (DEV v1.0.0)
const CACHE_NAME = 'sunscout-dev-v1.0.0';
const ASSETS = ['./', './index.html', './manifest.json', '/assets/images/icon-sunscout-dev.svg'];
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith('sunscout-dev-') && k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
