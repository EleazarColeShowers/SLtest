const CACHE_NAME = 'sustainable-living-cache-v1';

// Include all asset files from the manifest.json into the cache
const CACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
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
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching resources:', CACHE_URLS);
        return cache.addAll(CACHE_URLS)
          .then(() => {
            console.log('All resources cached successfully');
          })
          .catch((error) => {
            console.error('Error during caching resources:', error);
          });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('Deleting old cache:', cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        console.log('Old caches deleted, ready to activate');
      })
      .catch((error) => {
        console.error('Error during activation:', error);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {
        console.error('Error fetching resource:', event.request.url, error);
      })
  );
});
