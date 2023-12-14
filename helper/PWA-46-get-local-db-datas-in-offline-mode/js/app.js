// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((regiter) => {
      console.log("Registered Successfylly => ", regiter);
    })
    .catch((err) => console.log(err));
} else {
  console.log("Not Support");
}

// Dom Manipulation

const fetchCourse = async () => {
  try {
    const res = await fetch(
      "https://pwa-app-4c6d6-default-rtdb.firebaseio.com/courses.json"
    );
    const data = await res.json();
    const courses = [];

    for (let course in data) {
      courses.push(data[course]);
    }

    return courses;
  } catch (err) {
    const data = await db.courses.toArray();
    return data;
  }
};

const createUi = (items) => {
  const coursesParent = document.querySelector("#courses-parent");
  console.log("courses =>", items);
  items.forEach((item) => {
    coursesParent.insertAdjacentHTML(
      "beforeend",
      `
        <div class="col">
          <div class="card" style="width: 18rem">
            <img
              src="/assets/images/post02.png"
              class="card-img-top"
              alt="Course Cover"
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
    `
    );
  });
};

window.addEventListener("load", async () => {
  const courses = await fetchCourse();
  createUi(courses);

  // Test
  // const res = fetch(
  //   "https://pwa-app-4c6d6-default-rtdb.firebaseio.com/courses.json",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: 1,
  //       title: "دوره جامع Pwa",
  //       price: 4500000,
  //     }),
  //   }
  // );
});
