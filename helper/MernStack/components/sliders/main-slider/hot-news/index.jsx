"use client"
import { useState } from "react";
import Link from "next/link";

const HotNews = () => {

   const newsList=[
      {
         title:"محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند",
         link:"/post1",
         value:0
      },
      {
         title:"متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از ",
         link:"/post1",
         value:1
      },
      {
         title:"نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت",
         link:"/post1",
         value:2
      },
      {
         title:"از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در",
         link:"/post4",
         value:3
      },
      {
         title:"بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی",
         link:"/post5",
         value:4
      },
      {
         title:"نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی",
         link:"/post6",
         value:5
      },
      {
         title:"طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری",
         link:"/post7",
         value:6
      },
   ];
   const [activeNews,setactiveNews]=useState(newsList[0]);

   setTimeout(()=>{
      let item=activeNews.value;
      if (item==newsList.length-1) {
         setactiveNews(newsList[0]);
      }else{
         setactiveNews(newsList[item+1]);
      }
   },3000);


   return (
      <div className=" flex justify-start items-center gap-1">
            <span className="title_style w-24 min-w-24 ">داغ ترین ها : </span>
            <Link href={`/posts${activeNews.link}`} className=" w-full text-base sm:text-sm line-clamp-1">{activeNews.title}</Link>
         </div>
   );
}

export default HotNews;