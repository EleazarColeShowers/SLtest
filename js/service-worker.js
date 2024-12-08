

const CACHE_NAME = 'sustainable-living-cache-v1';

// Include all asset files from the manifest.json into the cache
const CACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/assets/favcon.png',
  '/assets/favcon2.png',
  '/assets/pointer-1.svg',
  '/assets/pointer-2.svg',
  '/assets/pointer-3.svg',
  '/assets/western-hem.svg',
  '/assets/eastern-hem.svg',
  '/assets/triangles-1.svg',
  '/assets/triangles-2.svg',
  '/assets/bar-breaker.svg',
  '/assets/scan.svg',
  '/assets/eye.svg',
  '/assets/lennon.svg',
  '/assets/pie-1.svg',
  '/assets/pie-2.svg',
  '/assets/pie-3.svg',
  '/assets/pie-4.svg',
  '/assets/pie-5.svg',
  '/assets/pie-6.svg',
  '/assets/pie-7.svg',
  '/assets/pie-8.svg',
  '/assets/webis-9.svg',
  '/assets/webis-1.svg',
  '/assets/webis-7.svg',
  '/assets/webis-3.svg',
  '/assets/webis-4.svg',
  '/assets/webis-5.svg',
  '/assets/logoTransparent.png',
  '/assets/weglotis-5-2.svg',
  '/assets/weglotis-5-1.svg',
  '/assets/palm-1.svg',
  '/assets/palm-2.svg',
  '/assets/palm-3.svg',
  '/assets/palm-4.svg',
  '/assets/palm-5.svg'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});