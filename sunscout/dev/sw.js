// SunScout Service Worker (DEV dev-v10)
const CACHE_NAME = 'ff-sunscout-dev-cache-v10';
const CACHE_PREFIX = 'ff-sunscout-dev-cache-v';
const ASSETS = ['./', './index.html', './manifest.json', '/assets/images/sunscout/icon-sunscout-dev.svg', '/assets/images/sunscout/icon-sunscout-dev-180.png'];
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => (k.startsWith(CACHE_PREFIX) || k.startsWith('sunscout-dev-')) && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
