// ==================== VERSION CONTROL ====================
//
// WHEN TO UPDATE THE VERSION:
// - For major updates (CSS/JS changes) that should clear the cache
// - Run ./update-version.sh to auto-generate a new timestamp version
//
// WHEN YOU DON'T NEED TO UPDATE:
// - Minor HTML changes (network-first strategy handles this automatically)
// - Any change to this file triggers a service worker update anyway
// - Small text or content updates
//
const CACHE_VERSION = '2026-01-04-134905';
const CACHE_NAME = `blitz-lesen-${CACHE_VERSION}`;

const urlsToCache = [
  './',
  './index.html',
  './word_db.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ==================== INSTALL EVENT ====================
// Cache all files on install
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing version', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Install complete - waiting for user activation');
        // Don't auto-skip waiting - let the user decide when to update via the update banner
      })
  );
});

// ==================== ACTIVATE EVENT ====================
// Clean up old caches when activating
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating version', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Activation complete');
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// ==================== MESSAGE EVENT ====================
// Handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting...');
    self.skipWaiting();
  }
});

// ==================== FETCH EVENT ====================
// Network-first for HTML, cache-first for other assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // For HTML files (navigation requests), use network-first to ensure fresh content
  if (request.mode === 'navigate' || request.destination === 'document' ||
      url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname === './') {

    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(request);
        })
    );
    return;
  }

  // For other assets (CSS, JS, images), use cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          // Cache hit - return cached response
          return response;
        }

        // Not in cache - fetch from network
        return fetch(request).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone and cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });

          return response;
        });
      })
  );
});
