import BreadCrumb from "@/components/post-page/bread-crumb";
import BlogerBox from "@/components/boxes/bloger-box";
import PostMeta from "@/components/post-page/post-meta";
import RandomPostBox from "@/components/boxes/random-post";
import BlogOtherPosts from "@/components/sliders/blog-other-posts";

import { BsFillBookmarkFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";


import Image from "next/image";

const SinglePostPage = ({ params }) => {

   const data = {
      title: "عنوان مقاله مورد نظر",
      blog_title: "عنوان وبلاگ",
      blog_link: "nextjs_blog",
      blog_image: "/images/ads/5556583.jpg",
      short_desc:"توضیحات کوتاه این مقاله ...",
      blog_short_desc: "این وبلاگ برای بررسی نکست جی اس هست...",
      study_time: 15,
      created_at: "15 اردیبهشت 1410",
      slug: "post_slug",
      image: "/images/posts/tablet2.jpg",
      details: "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.  طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.  طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.  طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
      tags: ["تگ 1", " تگ 2"],
      categories: ["دسته 1", " دسته 2"],
      blog_other_posts: [],
      comments: [],
      likes_number: 10
   };


   const blogerData = {
      img: data.blog_image,
      title: data.blog_title,
      short_desc: data.blog_short_desc,
      link: data.blog_link
   };

   const metaDataCompData = {
      study_time: data.study_time,
      created_at: data.created_at,
      blog_link: data.blog_link,
      slug: data.slug,
   }


   const randomPosts = [
      {
         img: "/images/posts/mobile1.jpg",
         title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
         short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
         link: "/test"
      },
      {
         img: "/images/posts/mobile1.jpg",
         title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
         short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
         link: "/test"
      },
      {
         img: "/images/posts/mobile1.jpg",
         title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
         short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
         link: "/test"
      },
      {
         img: "/images/posts/mobile1.jpg",
         title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
         short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
         link: "/test"
      },
      // {
      //    img: "/images/posts/mobile1.jpg",
      //    title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
      //    short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
      //    link: "/test"
      // },
      // {
      //    img: "/images/posts/mobile1.jpg",
      //    title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
      //    short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
      //    link: "/test"
      // },
      // {
      //    img: "/images/posts/mobile1.jpg",
      //    title: " تسیبخهت خسه تیخبهتس خیهبتهت س",
      //    short_desc: "خهستیخ شسخعیب شسبخشتسیخبهتش سیخهبش سخیبه",
      //    link: "/test"
      // },
   ]



   return (
      <div className="flex flex-col gap-12 ">
         <div className=" flex justify-between items-start gap-4">
            <main className=" flex flex-col gap-12 w-full">
               <div className=" flex flex-col gap-12 w-full bg-zinc-100 p-4 rounded-lg">
                  <div className=" flex justify-between items-center w-full">
                     <BreadCrumb blog_link={data.blog_link} blog_title={data.blog_title} post_title={data.title} />
                     <div className=" bg-white p-2 rounded-xl flex justify-end items-center gap-2">
                        <span>{data.likes_number}</span>
                        <BiLike className=" cursor-pointer w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" />
                     </div>
                  </div>
                  <section className=" flex justify-between items-center gap-4">
                     <BlogerBox data={blogerData} />
                     <PostMeta data={metaDataCompData} />
                  </section>
                  <section className=" flex flex-col gap-12  w-full">
                     <h1 className="title_style">عنوان مقاله این هست...</h1>
                     <p className=" text-justify leading-9 text-zinc-700">
                        معرفی: {data.short_desc}
                     </p>
                     <div className="  flex justify-center items-center">
                        <div className=" relative w-[700px] h-[400px]">
                           <Image src={data.image} fill className=" rounded-lg object-cover" alt={data.title} title={data.title} />
                        </div>
                     </div>
                     <p className=" text-justify leading-9 text-zinc-700">
                        {data.details}
                     </p>
                     <div className=" flex justify-start items-center gap-4 flex-wrap">
                        {
                           data.categories.map((da, i) => (
                              <div key={i} className=" bg-zinc-200 rounded px-3 py-1 text-base sm:text-sm">
                                 {da}
                              </div>
                           ))
                        }
                     </div>
                     <div className=" flex justify-start items-center gap-4 flex-wrap">
                        {
                           data.tags.map((da, i) => (
                              <div key={i} className=" bg-zinc-200 rounded px-3 py-1 text-base sm:text-sm">
                                 #{da}
                              </div>
                           ))
                        }
                     </div>
                  </section>
               </div>
            </main>
            <aside className=" sticky top-[5.8rem]  left-0 w-[360px] min-w-[360px] flex flex-col gap-4">
               <div className="bg-zinc-100 p-4 rounded-lg">
                  <BlogerBox data={blogerData} />
               </div>
               <div className="bg-zinc-100 p-4 rounded-lg flex flex-col  gap-6">
                  {
                     randomPosts.map((da, i) => <RandomPostBox key={i} data={da} />)
                  }
               </div>
            </aside>
         </div>
         <section className=" flex flex-col gap-12  w-full bg-zinc-100 p-4 rounded-lg">
            <BlogOtherPosts />
         </section>
         <section className=" flex flex-col gap-12  w-full bg-zinc-100 p-4 rounded-lg h-[400px]">
            <h2 className="title_style">دیدگاه های این مقاله</h2>
         </section>
         <div className=" fixed bottom-2 right-0 left-0 flex justify-center items-center ">
            <div className=" flex justify-center items-center gap-6  bg-[#ffffffcc] backdrop-blur-sm py-2 px-4 rounded-full">
               <BiLike className=" cursor-pointer w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" />
               <BsFillBookmarkFill className=" cursor-pointer w-[22px] h-[22px] text-zinc-600 transition-all duration-300 hover:text-blue-500" />
            </div>
         </div>
      </div>
   );
}

export default SinglePostPage;