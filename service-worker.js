const CACHE = 'hidroponia-cache-v1';
const ASSETS = [
  '/', '/index.html',
  '/manifest.webmanifest',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/js/sheets.js',
  '/assets/js/dashboard.js',
  '/pages/preparacion.html',
  '/pages/monitoreo.html',
  '/pages/dashboard.html',
  '/pages/modelos.html',
  '/pages/ticket.html',
  '/pages/guias.html',
  '/quiz/quiz.html',
  '/quiz/js/quiz.js',
  '/assets/icons/favicon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(()=>caches.match('/index.html')))
  );
});
