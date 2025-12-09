const CACHE_NAME = 'kids-club-v99-forced';
const ASSETS = ['./', './index.html', './manifest.json'];

// FORÇA ATUALIZAÇÃO IMEDIATA
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Obriga o novo SW a assumir agora
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// ATIVA E LIMPA O VELHO
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); // Deleta cache antigo na hora
        }
      }));
    })
  );
  return self.clients.claim(); // Toma controle de todas as abas
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
