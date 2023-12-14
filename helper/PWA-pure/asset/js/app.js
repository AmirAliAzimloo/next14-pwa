//! Variables

const addCourseBtn = document.querySelector(".courses-btn-add-new-course");
const addDiscountsBtn = document.querySelector(".add-discounts");
const addCourseModal = document.querySelector("#add-new-course-modal");
const addDiscountsModal = document.querySelector("#add-discounts-modal");
const newCourseTitle = document.querySelector(".new-course-title");
const discountInput = document.querySelector(".discount-input");
const modelAddCourseBtn = document.querySelector(".add-course-btn");
const modelAddDiscountBtn = document.querySelector(".add-discount-btn");


const modalContainers = document.querySelectorAll(".modal-container");


//! Utils Action 
modalContainers.forEach((modalContainer) => {
  modalContainer.addEventListener("click", (event) => {
    event.target.classList.remove("visible");
  });
});

//! Register ServiceWorker
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("../../sw.js")
    .then((register)=>{
        console.log("Registered Successfully =>",register)
    })
    .catch(err=>console.log(err))
}else{
    console.log("Not Supported")
}

//! CMS Logic

const fetchCourse = async()=>{
    try {
        const res = await fetch("https://pwa-cms.iran.liara.run/api/courses")
        const data = await res.json()

        return data;

    } catch (error) {
        const data = await db.courses.toArray()
        return data
    }
}

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
              <h5 class="courses-name">${course.title} - (off ${course.discount}%)</h5>
            </div>
            <div class="courses-btns">
              <a href="" class="courses-btn-edit btn">ویرایش</a>
              <a href="" class="courses-btn-delete btn" onclick="removeCourse(event,'${course._id}')" >حذف</a>
            </div>
          </li>
        `
      );
    });
};

const removeCourse = (event, _id) => {
    event.preventDefault();
  
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((sw) => {
        db.removedCourse
          .put({ _id })
          .then((data) =>
            console.log("CourseID inserted successfully :)) =>", data)
          )
          .catch((err) => console.log("Err =>", err));
  
        return sw.sync
          .register("remove-course")
          .then(() => console.log("Task added successfully :))"))
          .catch((err) => console.log("Error =>", err));
      });
    } else {
      // Fetch
    }
};

const showAddCourseModel = (event) => {
    event.preventDefault();
    addCourseModal.classList.add("visible");
};
const showAddDiscountsModel = (event) => {
    event.preventDefault();
    addDiscountsModal.classList.add("visible");
};

const addCourse = (event) => {
    event.preventDefault();
    
    const newCourse = {
      title: newCourseTitle.value,
    };
  
    console.log("New Course Info =>", newCourse);
  
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((sw) => {
        db.newCourses
          .put(newCourse)
          .then((data) =>
            console.log("Course inserted successfully :)) =>", data)
          )
          .catch((err) => console.log("Err =>", err));
  
        return sw.sync
          .register("add-course")
          .then(() => console.log("Task added successfully :))"))
          .catch((err) => console.log("Error =>", err));
      });
    } else {
      // Fetch
    }
};


const addDiscount = (event) => {
  
  event.preventDefault();
  
      
  const discountInfo = {
    discount: discountInput.value,
  };


  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then((sw) => {
      db.discounts
        .put(discountInfo)
        .then((data) =>
          console.log("Discount info inserted successfully :)) =>", data)
        )
        .catch((err) => console.log("Err =>", err));

      return sw.sync
        .register("add-discount")
        .then(() => console.log("Task (Discount) added successfully :))"))
        .catch((err) => console.log("Error =>", err));
    });
  } else {
    // Fetch
  }


    
};

addCourseBtn.addEventListener("click", (event) => {
    showAddCourseModel(event);
  });
addDiscountsBtn.addEventListener("click", (event) => {
    showAddDiscountsModel(event);
  });
  
modelAddCourseBtn.addEventListener("click", addCourse);

modelAddDiscountBtn.addEventListener("click", addDiscount);

window.addEventListener("load",async()=>{
    const courses = await fetchCourse();
    createUi(courses)
})