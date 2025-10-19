const CACHE_NAME = 'tef-itsm-cache-v1';
const URLS_TO_CACHE = [
  './indexx.html',
  './assets/css/style.css',
  './assets/vendors/bootstrap/bootstrap.min.css',
  './assets/vendors/bootstrap/bootstrap.bundle.min.js',
  './assets/vendors/swiper/swiper-bundle.min.css',
  './assets/vendors/swiper/swiper-bundle.min.js',
  './assets/vendors/aos/aos.css',
  './assets/vendors/aos/aos.js',
  './assets/js/custom.js',
  './assets/images/ITSM LOGO.jpg',
  './assets/images/whatsapp.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached)
    )
  );
});


