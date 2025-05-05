
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('agrinexus-cache').then(cache => {
      return cache.addAll([
        './index.html',
        './business.js',
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
