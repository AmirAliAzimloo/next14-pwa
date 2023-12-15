"use client";
import { useState, useEffect } from "react";

import AllPosts from "./allPosts";
import NewPost from "./newPost";
import PostDetails from "./postDetails";

const PostsMain = () => {
   const [midBanDetCtrl, setmidBanDetCtrl] = useState("");
   const [randNumForBannerClick, setrandNumForBannerClick] = useState(1);
   const [det, setdet] = useState(<AllPosts setrandNumForBannerClick={setrandNumForBannerClick} setmidBanDetCtrl={setmidBanDetCtrl} />);
   
   useEffect(() => {
      if (midBanDetCtrl!="") {
         setdet(<PostDetails goalId={midBanDetCtrl} />);
      }
   }, [randNumForBannerClick]);
   
   return (
      <div className=" flex flex-col gap-8">
         <section className=" flex justify-between items-center gap-2">
            <h1 className=" text-blue-500 text-lg">پست ها</h1>
            <div className=" flex justify-end items-center gap-2">
               <button
                  onClick={() =>
                     setdet(
                        <AllPosts  setrandNumForBannerClick={setrandNumForBannerClick} setmidBanDetCtrl={setmidBanDetCtrl} />
                     )
                  }
                  className=" flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-500' hover:bg-orange-500"
               >
                  همه
               </button>
               <button
                  onClick={() => setdet(<NewPost />)}
                  className=" flex justify-center items-center w-32 h-10 rounded-md bg-indigo-600 text-white transition-all duration-500' hover:bg-orange-500"
               >
                  پست جدید
               </button>
            </div>
         </section>
         <section>{det}</section>
      </div>
   );
};

export default PostsMain;
