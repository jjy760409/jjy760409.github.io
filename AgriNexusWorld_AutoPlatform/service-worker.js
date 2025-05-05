
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("AgriNexusStore").then(function(cache) {
      return cache.addAll([
        "/index.html",
        "/assets/css/style.css"
      ]);
    })
  );
});
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
