"use client"
import BlogMainBox from "@/components/boxes/blog-main-box";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useRef } from "react";

const BlogOtherPosts = () => {

    const carouselRef=useRef();
    const carouselSwitcher=(data)=>{
        if (carouselRef.current) {
            const width=carouselRef.current.offsetWidth;
            carouselRef.current.scrollTo(
                carouselRef.current.scrollLeft+width*data,0
            )
        }
    }

    const posts=[
      {
         image:"/images/posts/tablet3.jpg",
         title:"  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
         short_desc:"به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
         comments_number:10,
         view_number:120,
         slug:"tablet2",
      },
      {
         image:"/images/posts/mobile1.jpg",
         title:"قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
         short_desc:"تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
         comments_number:22,
         view_number:582,
         slug:"mobile1",
      },
      {
         image:"/images/posts/laptop1.jpg",
         title:"گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد",
         short_desc:"متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی",
         comments_number:25,
         view_number:12004,
         slug:"laptop1",
      },
      {
         image:"/images/posts/tablet3.jpg",
         title:"  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
         short_desc:"به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
         comments_number:10,
         view_number:120,
         slug:"tablet2",
      },
      {
         image:"/images/posts/mobile1.jpg",
         title:"قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
         short_desc:"تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
         comments_number:22,
         view_number:582,
         slug:"mobile1",
      },
      {
         image:"/images/posts/laptop1.jpg",
         title:"گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد",
         short_desc:"متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی",
         comments_number:25,
         view_number:12004,
         slug:"laptop1",
      },
      {
         image:"/images/posts/tablet3.jpg",
         title:"  در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با در همان حال کار آنها به می‌با شد",
         short_desc:"به  نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن نظر می‌رسد و قلم‌ها و  حق تکثیر متون را ندارن د",
         comments_number:10,
         view_number:120,
         slug:"tablet2",
      },
      {
         image:"/images/posts/mobile1.jpg",
         title:"قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است",
         short_desc:"تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن",
         comments_number:22,
         view_number:582,
         slug:"mobile1",
      },
      {
         image:"/images/posts/laptop1.jpg",
         title:"گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد",
         short_desc:"متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی",
         comments_number:25,
         view_number:12004,
         slug:"laptop1",
      },
   ]

   return (
      <div className=" container mx-auto ">
         <section className="flex flex-col gap-4 px-2">
            <header className=" flex justify-between items-center">
               <h2 className=" title_style">
               مقالات دیگر این وبلاگ
               </h2>
               <div className=" flex items-center gap-1 text-zinc-800">
                  <FaChevronRight onClick={()=>{carouselSwitcher(1)}} className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-orange-400 w-10 h-10 p-2 rounded" />
                  <FaChevronLeft onClick={()=>{carouselSwitcher(-1)}} className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:bg-orange-400 w-10 h-10 p-2 rounded" />
               </div>
            </header>
            <div ref={carouselRef} className="sliderContainer h-[24rem] w-full max-[50rem] overflow-x-scroll px-4  ">
               <div className=" flex justify-between items-center gap-8 ">
                  {
                     posts.map((da,i)=><BlogMainBox key={i} data={da}/>)
                  }
                  
               </div>
            </div>
         </section>
      </div>
   );
};

export default BlogOtherPosts;
