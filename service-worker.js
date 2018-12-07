var cacheName = 'OneMeeting';
var filesToCache = [];
self.addEventListener('install', function (e) {
	e.waitUntil(caches.open(cacheName).then(function (cache) {
		return cache.addAll(filesToCache);
	}));
});
self.addEventListener('activate', function (e) {
	//console.log('[ServiceWorker] Activated');
	e.waitUntil(caches.keys().then(function (keyList) {
		return Promise.all(keyList.map(function (key) {
			if (key !== cacheName) {
				return caches.delete(key);
			}
		}));
	}));
	return self.clients.claim();
});
self.addEventListener("fetch", function (event) {});
