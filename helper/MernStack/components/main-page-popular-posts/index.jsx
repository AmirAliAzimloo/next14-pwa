import Link from "next/link";
import BlogMainBox from "../boxes/blog-main-box";
import BlogBigBox from "../boxes/big-blog-box";

const MainPagePopularPosts = () => {

   const posts = [
      {
         image: "/images/posts/tablet3.jpg",
         title: "  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
         short_desc: "به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
         comments_number: 10,
         view_number: 120,
         slug: "tablet2",
      },
      {
         image: "/images/posts/mobile1.jpg",
         title: "قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
         short_desc: "تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
         comments_number: 22,
         view_number: 582,
         slug: "mobile1",
      },
      {
         image: "/images/posts/laptop1.jpg",
         title: "گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد",
         short_desc: "متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی",
         comments_number: 25,
         view_number: 12004,
         slug: "laptop1",
      },
   ]

   return (
      <section className=" p-4 bg-zinc-100 rounded-lg flex flex-col gap-6 ">
         <header className="flex justify-between items-center w-full">
            <div className=" flex justify-start items-center gap-6">
               <h2 className="title_style">پرمخاطب ترین ها</h2>
               <div className=" flex justify-start items-center gap-4  ">
                  <button className=" px-3 py-[2px] rounded border-2 text-base sm:text-sm bg-white hover:text-white border-blue-500 transition-all duration-500 hover:bg-blue-600">پربازدیدترین ها</button>
                  <button className=" px-3 py-[2px] rounded border-2 text-base sm:text-sm bg-white hover:text-white border-blue-500 transition-all duration-500 hover:bg-blue-600">مفیدترین ها</button>
                  <button className=" px-3 py-[2px] rounded border-2 text-base sm:text-sm bg-white hover:text-white border-blue-500 transition-all duration-500 hover:bg-blue-600">پردیدگاه‌ترین ها</button>
               </div>
            </div>
            <div>
               <Link href={"/"} className=" px-3 py-1 rounded bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white">همه</Link>
            </div>
         </header>
         <div className=" flex justify-between items-center gap-4 ">
            <BlogBigBox data={posts[0]} />
            <BlogMainBox data={posts[1]} />
            <BlogMainBox data={posts[2]} />
         </div>
      </section>
   );
}

export default MainPagePopularPosts;