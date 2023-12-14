//! Imports
importScripts("/asset/js/dexie.js")
importScripts("/asset/js/db.js")

//! ServiceWorker Codes

const cacheVersion = 1;

const activeCaches = {
  static: `static-v${cacheVersion}`,
  dynamic: `dynamic-v${cacheVersion}`,
};

//*    ******************* Insatll *******************   *//
self.addEventListener("install", (event) => {
  console.log("ServiceWorker Installed Successfully");

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

//*    ******************* Activate *******************   *//
self.addEventListener("activate", (event) => {
  console.log("ServiceWorker Activated Successfully");

  const activeCacheNames = Object.values(activeCaches);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!activeCacheNames.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//*    ******************* Fetch *******************   *//
self.addEventListener("fetch", (event) => {
  const urls = ["https://pwa-cms.iran.liara.run/api/courses"];

  // agar chizahaii ke bayad az server gerefte beshan addresseshoon in boodan az server boro va bgir vali agar iin naboodan aval boro bbin too cache hast ya na age bood aval az hamoon chache bekhoon age ham nabood boro be server darkhast bezan age ham az server nagerefti boro vase safhe fallback va bgoo hanooz cache nashode chon taraf offline boode

  if (urls.includes(event.request.url)) {
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
      caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then((serverResponse) => {
            return caches.open([activeCaches["dynamic"]]).then((cache) => {
                cache.put(event.request,serverResponse.clone())
                return serverResponse
            });
          });
        }
      })
      .catch(err=>{
        return caches.match("/offline.html")
      })
    );
  }
});


//! Do BacGroundSync Tasks

//? Remove Course
function removeHandler() {
    db.removedCourse.toArray().then((courseIDs) => {
      courseIDs.forEach(async (course) => {
        const res = await fetch(
          `https://pwa-cms.iran.liara.run/api/courses/${course._id}`,
          {
            method: "DELETE",
          }
        );
  
        if (res.status === 200) {
          db.removedCourse
            .where({ _id: course._id })
            .delete()
            .then(() =>
              console.log("Course removed successfully from indexedDB :))")
            )
            .catch((err) => console.log("Error in remove course =>", err));
        }
      });
    });
}

//? Add Course
function addHandler(){
    db.newCourses.toArray().then((courses) => {
        courses.forEach(async (course) => {
          const res = await fetch(
            `https://pwa-cms.iran.liara.run/api/courses/`,
            {
              method: "POST",
              headers:{
                "Content-Type" :"Application/json"
              },
              body:JSON.stringify({title : course.title})
            },
            
          );
    
          if (res.status === 201) {
            db.newCourses
              .where({ title: course.title })
              .delete()
              .then(() =>
                console.log("Course removed successfully from indexedDB :))")
              )
              .catch((err) => console.log("Error in remove course =>", err));
          }
        });
      });
}

//? Add discount
function discountHandler(){
  db.discounts.toArray().then((discounts) => {
    discounts.forEach(async (discountInfo) => {
        const res = await fetch(
          `https://pwa-cms.iran.liara.run/api/courses/discount`,
          {
            method: "POST",
            headers:{
              "Content-Type" :"Application/json"
            },
            body:JSON.stringify({discount : discountInfo.discount})
          },
          
        );

        console.log("Add Discount Successfully :)")
  
        if (res.status === 201) {
          db.discounts
            .where({ discount: Number(discountInfo.discount) })
            .delete()
            .then(() =>
              console.log("Discount info removed successfully from indexedDB :))")
            )
            .catch((err) => console.log("Error in remove Discount info =>", err));
        }
      });
    });
}

self.addEventListener("sync",(event)=>{
  console.log("sync event =>",event)
    if(event.tag == "remove-course"){
        removeHandler()
    }else if(event.tag == "add-course"){
        addHandler()
    }else if(event.tag == "add-discount"){
        discountHandler()
    }
})