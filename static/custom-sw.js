//console.log('Custom service worker!');

const CACHE_NAME = 'image-cache-v10' + new Date().getTime();
const IMAGE_URLS_TO_CACHE = [
  '/logo.png', 
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2Q0MWI3ZjJiODlkN2Q4NjU2MzhhNzIwYzc5YzFmNTU4NzljODMwNiZjdD1n/6zdkYKBBTHTITFQ4xA/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmI4ZmExN2Y5NjA0OTFhODE4ODc3ZDQ0ODZlZjQ2NTFmZWRmYWE3YSZjdD1n/15aGGXfSlat2dP6ohs/giphy.gif',
  'https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg',
  'https://media.giphy.com/media/eKrgVyZ7zLvJrgZNZn/giphy.gif',
  'https://media.giphy.com/media/3o7bui8qZJeSQuXgMo/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTM1NzU3ZTEzNzE3NmZmYjk2ZmZlNWFlMjcxOGNkZWJhYzIzZDhkMSZjdD1n/9T3kjrLQH2JUQmMwsU/giphy.gif',
  'https://media.giphy.com/media/psmj7c3DbrJKkbRYFj/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmQ5ZmU4ZmQyMDk3ZWU4ODIyYWNkNTlhMDg0ODYzYmE4MDYxNGZjOSZjdD1n/Oj7yTCLSZjSt2JMwi2/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWE5YTIyYmIxNGEyOGE1ODc2YmY1MzJlNTYyYzVhMjFlMDQ2ZGU4NSZjdD1n/MAtrUwwKKcMzuMUKU8/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTU5NTJhMTdjZTczZDhlMTlmNGI3ZjQ4NGM2M2IwNDU5MGQxZTI1OSZjdD1n/K4849SW5Womc0/giphy.gif',
  'https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDljNjE2NzVlODhhNTAyY2QxYWQ2MWQ5ZWQ1ODA0MmJjMWMzZjc2NiZjdD1n/5BaJ6438Qp6RJQRRQn/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDU2NGJlZTgzMmQzODc4NTE2Yjg2MTVmMjM3MDU2M2NkMjg1YzE4OSZjdD1n/26hkhPJ5hmdD87HYA/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzExZDI2NTNhY2U5MjcxZTBkYTgyZDg0M2NlY2MwZTQwNDE1M2Y5MCZjdD1n/S3Ot3hZ5bcy8o/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzllNjdjZTMwNzdhNjA5ZjljOTM3NTVmYzQ2NDRhZjBmMTE3ZmM0YiZjdD1n/j7wBU7aHcKf7y/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWI5ODZkMThmYTljNGQ0MjljOWVmNDM0YjYyODg2YTU3ZDFmYTMzOSZjdD1n/fLyf3Ag08wABnyqMNY/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTFlMTc3NzRjMzUwYjk1MjNjMDFjYWVkZTVlMmI2NDA5ZThmMGNjOCZjdD1n/kiBcwEXegBTACmVOnE/giphy-downsized-large.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc2OGE0Y2ViZTQxMDVkNTI5ODUzMzNhYTlmMmYzZWRmNjEyYTg2YyZjdD1n/IzigK4GlBmchkTqIrG/giphy.gif',
  'https://media.giphy.com/media/l0HlOBZcl7sbV6LnO/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjFmMzhhZWFiODgyMzA4OTNiNjhmN2MyYTMxNDQwODg5NmQzMzk5NCZjdD1n/3osxY9kuM2NGUfvThe/giphy.gif',
  'https://media.giphy.com/media/YoYOhif8otaJI8uIMT/giphy.gif',
  'https://media.giphy.com/media/LrG5hpEkf2XqjyK4AY/giphy.gif',
  'https://media.giphy.com/media/PwWDPvnQdLv8vcZkx5/giphy.gif'
];

self.addEventListener('install', event => {
   // console.log('Service Worker installed - running from custom-sw');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(IMAGE_URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
   // console.log('Service Worker intercepting fetch request - running from custom-sw');
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
