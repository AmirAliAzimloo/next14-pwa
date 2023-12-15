"use client"

import SlideBox from "../graphic-slider-box";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useRef } from "react";
import Link from "next/link";

const GraphicSlider = () => {
   const carouselRef = useRef();
   const carouselSwitcher = (data) => {
      if (carouselRef.current) {
         const width = carouselRef.current.offsetWidth;
         carouselRef.current.scrollTo(
            carouselRef.current.scrollLeft + width * data,
            0
         );
      }
   };

   return (
      <div className=" bg-[#ffc422] ">
         <div className="container mx-auto py-8  ">
            <section className="flex flex-col gap-4 px-2">
               <header className=" flex justify-between items-center ">
                  <h2 className="  text-2xl border-r-black border-r-2 pr-1 text-black">
                     فایل های گرافیکی
                  </h2>
                  <div className=" flex gap-1">
                     <div className=" flex items-center gap-1 text-zinc-600">
                        <FaChevronRight
                           onClick={() => {
                              carouselSwitcher(1);
                           }}
                           className=" cursor-pointer bg-white transition-all duration-300 hover:text-white hover:bg-indigo-400 w-10 h-10 p-3 rounded"
                        />
                        <FaChevronLeft
                           onClick={() => {
                              carouselSwitcher(-1);
                           }}
                           className=" cursor-pointer bg-white transition-all duration-300 hover:text-white hover:bg-indigo-400 w-10 h-10 p-3 rounded"
                        />
                     </div>
                     <Link  className=" text-white border-white border-2 bg-indigo-500 px-4 py-1 rounded-md transition-all duration-500 hover:bg-indigo-600" href={`/`}>مشاهده همه</Link>
                  </div>
               </header>
               {/* for an element that have overflow, you must introduce 
            with and max-width. 
            whitout these, your code is not responsive. 
            must introduce */}
               <div
                  ref={carouselRef}
                  className="sliderContainer w-full max-w-7xl overflow-x-scroll px-4  "
               >
                  <div className=" flex justify-between items-center gap-4 ">
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                     <SlideBox />
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default GraphicSlider;
