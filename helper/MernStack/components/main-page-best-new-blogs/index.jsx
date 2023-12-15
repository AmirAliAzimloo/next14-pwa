import BlogerBox from "../boxes/bloger-box";
import NewBlogBox from "../boxes/new-blog-box";

const MainPageBestBlogsAndNewPosts = () => {

   const blogersInfo = [
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
      {
         img: "/images/ads/5556583.jpg",
         title: "وبلاگ تستی",
         short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
         link:"link1"
      },
   ]

   const posts=[
      {
         image:"/images/posts/tablet3.jpg",
         title:"  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
         short_desc:"به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
         comments_number:10,
         view_number:120,
         slug:"tablet2",
         date:"25 تیر 1420"
      },
      {
         image:"/images/posts/mobile1.jpg",
         title:"قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
         short_desc:"تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
         comments_number:22,
         view_number:582,
         slug:"mobile1",
         date:"15 دی 1480"
      },
      {
         image:"/images/posts/laptop1.jpg",
         title:"گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد",
         short_desc:"متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی",
         comments_number:25,
         view_number:12004,
         slug:"laptop1",
         date:"1 بهمن 1500"
      },
      {
         image:"/images/posts/tablet3.jpg",
         title:"  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
         short_desc:"به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
         comments_number:10,
         view_number:120,
         slug:"tablet2",
         date:"25 تیر 1420"
      },
      {
         image:"/images/posts/mobile1.jpg",
         title:"قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
         short_desc:"تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
         comments_number:22,
         view_number:582,
         slug:"mobile1",
         date:"15 دی 1480"
      },
   ]


   return (
      <section className="  bg-zinc-100 rounded-lg p-4 flex  justify-between items-start gap-4">
         <div className=" flex flex-col gap-12 w-[280px] min-w-[280px]">
            <h2 className=" title_style">برترین وبلاگ ها</h2>
            <div className=" flex flex-col gap-4">
               {
                  blogersInfo.map((da, i) => (<BlogerBox key={i} data={da} />))
               }
            </div>
         </div>
         <div className=" flex flex-col gap-12 w-full">
            <h2 className=" title_style">جدیدترین ها</h2>
            <div className=" flex flex-col gap-4">
               {
                  posts.map((da, i) => (<NewBlogBox key={i} data={da} />))
               }
            </div>
         </div>
      </section>
   );
}

export default MainPageBestBlogsAndNewPosts;