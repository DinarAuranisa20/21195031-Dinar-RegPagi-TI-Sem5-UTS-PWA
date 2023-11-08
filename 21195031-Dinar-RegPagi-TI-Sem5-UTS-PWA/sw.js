var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/js/main.js',
  '/js/indexdb.js',
  '/js/notifikasi.js',
  '/img/10.jpg',
  '/img/avatar.jpg',
  '/img/bg.jpg',
  '/img/favicon.ico',
  '/img/pp.jpg',
  '/img/resume_icon.png',
  '/img/reswara.png'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
