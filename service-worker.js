const CACHE_NAME = 'image-cache-v1';
const urlsToCache = [
  '/src/assets/herroBanner.webp',
  '/src/assets/logo.webp',
  '/src/assets/Bento/cs.webp',
  '/src/assets/Bento/epsi.webp',
  '/src/assets/Bento/france.webp',
  '/src/assets/Bento/logo-react.webp',
  '/src/assets/Bento/me.webp',
  '/src/assets/Bento/Wallet.webp',
  '/src/assets/Contact/github.webp',
  '/src/assets/Contact/img.icons8.com.webp',
  '/src/assets/Card/actifit.webp',
  '/src/assets/Card/Carto.webp',
  '/src/assets/Card/ctk.webp',
  '/src/assets/Card/ctk2.webp',
  '/src/assets/Card/instagram-2.webp',
  '/src/assets/Card/Logo-BUT.svg.webp',
  '/src/assets/Card/mario.webp',
  '/src/assets/Card/unif.webp',
  '/src/assets/Card/virus.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Ouverture du cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; 
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});