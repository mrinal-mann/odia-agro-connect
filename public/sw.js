self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('agri-portal-v1').then((cache) => cache.addAll(['/','/index.html']))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
