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

// Cms Logic

const fetchCourse = async () => {
  try {
    const res = await fetch("https://pwa-cms.iran.liara.run/api/courses");
    const data = await res.json();

    return data;
  } catch (err) {
    const data = await db.courses.toArray();
    return data;
  }
};

const createUi = (courses) => {
  const coursesParent = document.querySelector(".courses-list");
  courses.forEach((course) => {
    coursesParent.insertAdjacentHTML(
      "beforeend",
      `
        <li class="courses-item">
          <div class="courses-img-title">
            <img
              src="asset/images/courses/PWA.jpg"
              alt=""
              class="courses-img"
            />
            <h5 class="courses-name">${course.title}</h5>
          </div>
          <div class="courses-btns">
            <a href="" class="courses-btn-edit btn">ویرایش</a>
            <a href="" class="courses-btn-delete btn">حذف</a>
          </div>
        </li>
      `
    );
  });
};

window.addEventListener("load", async () => {
  const courses = await fetchCourse();
  createUi(courses);
});
