
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogBox from "../newBlogs/BlogBox";
import Image from "next/image";

const BlogPageComp = () => {
   const goTopCtrl = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };
   const [posts, setposts] = useState([-1]);

   const [numbersOfBtns, setnumbersOfBtns] = useState([-1]);
   const [filteredBtns, setfilteredBtns] = useState([-1]);
   const [pageNumber, setpageNumber] = useState(1);
   const paginate = 4;

   useEffect(() => {
      axios
         .get(
            `https://mernfa-fileshop-server.iran.liara.run/api/get-blog-page-posts?pn=${pageNumber}&pgn=${paginate}`
         )
         .then((d) => {
            console.log(d.data);
            setposts(d.data.GoalPosts);
            setnumbersOfBtns(
               Array.from(
                  Array(Math.ceil(d.data.AllPostsNum / paginate)).keys()
               )
            );
            setallPostsNumber(d.data.AllPostsNum);
         })
         .catch((e) => console.log(e));
   }, [pageNumber]);

   useEffect(() => {
      if (numbersOfBtns[0] != -1 && numbersOfBtns.length>0) {
         const arr = [];
         numbersOfBtns.map((n) => {
            if (
               n == 0 ||
               (n < pageNumber + 1 && n > pageNumber - 3) ||
               n == numbersOfBtns.length - 1
            ) {
               arr.push(n);
            }
         });
         setfilteredBtns(arr);
      }
      else if(numbersOfBtns.length==0){
         setfilteredBtns([]);
      }
   }, [numbersOfBtns]);

   return (
      <div className=" flex flex-col gap-8">
         <div className=" flex flex-col gap-6">
            {posts[0] == -1 ? (
               <div className=" flex justify-center items-center p-12">
                  <Image
                     alt="loading"
                     width={120}
                     height={120}
                     src={"/loading.svg"}
                  />
               </div>
            ) : posts.length < 1 ? (
               <div className=" flex justify-center items-center w-full p-8">
                  پستی موجود نیست...
               </div>
            ) : (
               <div className=" flex flex-wrap justify-between items-center gap-2">
                {
                    posts.map((da, i) => (
                        <BlogBox
                           key={i}
                           data={da}
                        />
                     ))
                }
               </div>
            )}
         </div>
         <div className=" flex justify-center gap-4 items-center">
            {filteredBtns[0] == -1 ? (
               <div className=" flex justify-center items-center p-12">
                  <Image
                     alt="loading"
                     width={40}
                     height={40}
                     src={"/loading.svg"}
                  />
               </div>
            ) : (
               filteredBtns.map((da, i) => (
                  <button
                     className=" bg-indigo-500 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                     onClick={() => {
                        setpageNumber(da + 1);
                        setposts([-1]);
                        goTopCtrl();
                     }}
                     key={i}
                  >
                     {da + 1}
                  </button>
               ))
            )}
         </div>
      </div>
   );
};

export default BlogPageComp;
