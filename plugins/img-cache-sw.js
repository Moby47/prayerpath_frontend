const CACHE_NAME = 'image-cache-v1';
const IMAGE_URLS_TO_CACHE = [
  '/logo.png', 
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2Q0MWI3ZjJiODlkN2Q4NjU2MzhhNzIwYzc5YzFmNTU4NzljODMwNiZjdD1n/6zdkYKBBTHTITFQ4xA/giphy.gif',
  // add more URLs here as needed
];

self.addEventListener('install', event => {
    console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(IMAGE_URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
    console.log('Service Worker intercepting fetch request');
  if (event.request.url.endsWith('.jpg') || event.request.url.endsWith('.png') || event.request.url.endsWith('.gif')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(response => {
            // Clone the response to add it to the cache
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
            return response;
          });
        }
      })
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
