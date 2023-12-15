"use client"

import SliderBtn from "../button";
import SliderImage from "../slider-image";

import { useState } from "react";


const SliderComp = () => {

   const postsData = [
      {
         title: "وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی متن می‌باشد آنها با استفاده از محتویات ساختگی متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود",
         value: 1,
         link: "/posts/post1",
         src: "/images/posts/laptop2.jpg"
      },
      {
         title: "ظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها ",
         value: 2,
         link: "/posts/post2",
         src: "/images/posts/tablet1.jpg"
      },
      {
         title: "و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن",
         value: 3,
         link: "/posts/post3",
         src: "/images/posts/tablet4.jpg"
      },
      {
         title: "طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به ",
         value: 4,
         link: "/posts/post4",
         src: "/images/posts/tablet2.jpg"
      },
      {
         title: "معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند",
         value: 5,
         link: "/posts/post5",
         src: "/images/posts/laptop1.jpg"
      },

   ]
   const [activeSlide, setactiveSlide] = useState(postsData[0]);
   const [animationHandler, setanimationHandler] = useState(1);


   return (
      <div className=" relative flex justify-start gap-4 items-center w-full h-[400px]">
         <div className=" flex flex-col justify-between h-[400px]">
            {
               postsData.map((da, i) => (
                  <SliderBtn key={i} setanimationHandler={setanimationHandler} value={da} text={da.title} setactiveSlide={setactiveSlide} activeSlide={activeSlide} />
               ))
            }
         </div>
         <div className=" w-full flex justify-center items-center  bg-zinc-200 rounded-lg ">
            <SliderImage data={activeSlide} animationHandler={animationHandler} />
         </div>
         <div className=" absolute top-0 bottom-0  flex items-center left-4  ">
            <div className=" flex flex-col gap-2">
               {
                  postsData.map((da,i)=>(
                     <div key={i} onClick={() => {
                        if (activeSlide.value != da.value) {
                           setanimationHandler(0);
                           setTimeout(() => {
                              setactiveSlide(da);
                              setanimationHandler(1);
                           }, 800);
                        }
                     }} className={
                        activeSlide.value == da.value
                           ? " bg-blue-500 border-2 border-blue-500 rounded-full h-5 w-5 cursor-pointer"
                           : " bg-white border-2 border-blue-500 rounded-full h-5 w-5 cursor-pointer"
                     }></div>
                  ))
               }
               
            </div>
         </div>
         <div className=" text-sm  border-2 border-blue-500 text-blue-500 bg-white rounded p-1 z-40 absolute top-2 left-2">پیشنهاد سردبیر</div>
      </div>
   );
}

export default SliderComp;