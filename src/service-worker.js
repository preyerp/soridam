/* eslint-disable no-restricted-globals */


// This is a basic service worker
self.addEventListener('install', event => {
    console.log('Service worker installed.');
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  