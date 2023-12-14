// Service Worker Codes
const cacheVersion = 1;

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
        "/offline.html",
        "asset/js/app.js",
        "asset/style/style.css",
        "asset/style/fa.min.css",
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
  const urls = ["https://pwa-cms.iran.liara.run/api/courses"];

  if (urls.includes(event.request.url)) {
    console.log("loaded from server");
    return event.respondWith(
      fetch(event.request).then((response) => {
        const clonedResponse = response.clone();
        clonedResponse.json().then((data) => {
          for (let course of data) {
            db.courses.put(course);
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
              return caches.match("/offline.html");
            });
        }
      })
    );
  }
});
