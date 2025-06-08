const CACHE_NAME = 'digital-network-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/consejos.html',
  '/estadisticas.html',
  '/recursos.html',
  '/css/style.css',
  '/css/themes.css',
  '/js/app.js',
  '/js/stats.js',
  '/img/favic0n.png',
  '/img/tristan_harris.webp',
  '/img/tim_kendall.jpg',
  '/img/jeff_seibert.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});