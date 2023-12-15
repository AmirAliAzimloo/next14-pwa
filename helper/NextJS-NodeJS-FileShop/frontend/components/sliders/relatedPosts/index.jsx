"use client";

import BlogBox from "../../newBlogs/BlogBox";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const RelatedPosts = ({title , relPostsData}) => {
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
   const [relPostsDataState,setrelPostsDataState]=useState([-1]);
   const sendingDataForRel={goalIds:relPostsData}
   useEffect(()=>{
      const url="https://mernfa-fileshop-server.iran.liara.run/api/get-related-posts"
      axios.post(url,sendingDataForRel)
      .then(d=>{
         setrelPostsDataState(d.data);
      })
      .catch(e=>console.log(e));
   },[relPostsData])


   return (
      <div>
         <div className="container mx-auto py-8  ">
            <div className="flex flex-col gap-6 px-2">
               <header className=" flex justify-between items-center ">
                  <h2 className=" text-xl">{title}</h2>
                  <div className=" flex gap-1">
                     <div className=" flex items-center gap-1 text-zinc-600">
                        <FaChevronRight
                           onClick={() => {
                              carouselSwitcher(1);
                           }}
                           className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:text-white hover:bg-orange-400 w-10 h-10 p-3 rounded"
                        />
                        <FaChevronLeft
                           onClick={() => {
                              carouselSwitcher(-1);
                           }}
                           className=" cursor-pointer bg-zinc-200 transition-all duration-300 hover:text-white hover:bg-orange-400 w-10 h-10 p-3 rounded"
                        />
                     </div>
                  </div>
               </header>
               <div
                  ref={carouselRef}
                  className="sliderContainer w-full max-w-5xl overflow-x-scroll px-4  "
               >
                  <div className=" flex justify-between items-center gap-4 ">
                     {
                        relPostsDataState[0]==-1?
                        <div className=" flex justify-center items-center p-12">
                           <Image alt="loading" width={120} height={120} src={"/loading.svg"}/>
                           </div>
                           :(relPostsDataState.length<1)
                           ?<div className=" justify-center flex items-center p-4">مقاله مرتبطی موجود نیست.</div>
                           :
                                 relPostsDataState.map((po,i)=>(
                                 <BlogBox data={po} key={i} />
                                 ))
                            
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RelatedPosts;
