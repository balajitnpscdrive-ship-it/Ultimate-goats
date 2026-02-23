const CACHE_NAME = 'ultimate-goats-v1';

const ASSETS = [
  '/Ultimate-goats/',
  '/Ultimate-goats/index.html',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Great+Vibes&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
  'https://unpkg.com/html5-qrcode'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST') return;
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
