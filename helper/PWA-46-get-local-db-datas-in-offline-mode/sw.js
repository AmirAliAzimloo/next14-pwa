// Imports
importScripts("/js/dexie.js");
importScripts("/js/db.js");

// Utils
const limitInCache = (key, size) => {
  caches.open(key).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitInCache(key, size));
      }
    });
  });
};

// Service Worker Codes
const cacheVersion = 5;

const activeCaches = {
  static: `static-v${cacheVersion}`,
  dynamic: `dynamic-v${cacheVersion}`,
};

self.addEventListener("install", (event) => {
  console.log("Service Worker Installed Successfully :))");

  event.waitUntil(
    caches.open(activeCaches["static"]).then((cache) => {
      cache.addAll([
        "/",
        "/fallback.html",
        "js/script.js",
        "js/app.js",
        "js/code.js",
        "css/style.css",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated Successfully :))");

  const activeCacheNames = Object.values(activeCaches);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!activeCacheNames.includes(cacheName)) {
            return caches.delete(cacheName); // :))
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const urls = [
    "https://pwa-app-4c6d6-default-rtdb.firebaseio.com/courses.json",
  ];

  if (urls.includes(event.request.url)) {
    return event.respondWith(
      fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        clonedResponse.json().then((data) => {
          for (let course in data) {
            console.log(course);
            db.courses.put(data[course]);
          }
        });
        return response;
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then((serverResponse) => {
              return caches.open([activeCaches["dynamic"]]).then((cache) => {
                cache.put(event.request, serverResponse.clone());
                return serverResponse;
              });
            })
            .catch((err) => {
              return caches.match("/fallback.html");
            });
        }
      })
    );
  }
});
