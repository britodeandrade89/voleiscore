const CACHE_NAME = 'placar-touch-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Adicione os ícones do manifest.json aqui para garantir que sejam cacheados
  'https://www.gstatic.com/images/icons/material/apps/light/sports_volleyball_FILL0_wght400_GRAD0_opsz24_192.png',
  'https://www.gstatic.com/images/icons/material/apps/light/sports_volleyball_FILL0_wght400_GRAD0_opsz24_512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
