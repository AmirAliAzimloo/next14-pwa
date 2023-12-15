"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const NewPost = () => {
   const titleRef = useRef();
   const slugRef = useRef();
   const imageRef = useRef();
   const imageAltRef = useRef();
   const shortDescRef = useRef();
   const longDescRef = useRef();
   const publishedRef = useRef();

   // TAG MANAGING
   const tagRef = useRef();
   const [tag, setTag] = useState([]);
   console.log(tag)
   const tagSuber = (e) => {
      if (e.key === "Enter") {
         let tagList = [...tag];
         const data = tagRef.current.value;
         if (data.length > 0) {
            tagList = [...tag, data.replace(/\s+/g, '_').toLowerCase()];
            setTag(tagList);
         }
         tagRef.current.value = "";
      }
   };
   const tagDeleter = (indexToRemove) => {
      setTag(tag.filter((_, index) => index !== indexToRemove));
   };

   // RELATED
   const [posts, setposts] = useState([-1]);
   useEffect(() => {
      const postsUrl =
         "https://mernfa-fileshop-server.iran.liara.run/api/posts-rel";
      axios
         .get(postsUrl)
         .then((d) => {
            setposts(d.data);
         })
         .catch((e) => console.log("error in loading posts"));
   }, []);
   const [relPosts, setrelPosts] = useState([]);
   const postsRelatedMan = (v) => {
      let related = [...relPosts];
      if (v.target.checked) {
         related = [...related, v.target.value];
      } else {
         related.splice(relPosts.indexOf(v.target.value), 1);
      }
      setrelPosts(related);
   };

   const submiter = (e) => {
      e.preventDefault();
      const formData = {
         title: titleRef.current.value,
         createdAt: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
         }),
         updatedAt: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
         }),
         slug: slugRef.current.value,
         image: imageRef.current.value,
         imageAlt: imageAltRef.current.value,
         shortDesc: shortDescRef.current.value,
         longDesc: longDescRef.current.value,
         tags: tag,
         type: "post",
         pageView: 0,
         published: publishedRef.current.value,
         comments: [],
         relatedPosts: relPosts,
      };
      const url = `https://mernfa-fileshop-server.iran.liara.run/api/new-post`;
      axios
         .post(url, formData)
         .then((d) => {
            formData.published == "true"
               ? toast.success("مقاله با موفقیت منتشر شد.", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 })
               : toast.success("مقاله به صورت پیشنویس ذخیره شد.", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 });
         })
         .catch((e) => {
            let message = "متاسفانه ناموفق بود.";
            if (e.response.data.msg) {
               message = e.response.data.msg;
            }
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         });
   };

   // FORM SHOULD BE NOT SEND WITH ENTER KEY
   const formKeyNotSuber = (event) => {
      if (event.key == "Enter") {
         event.preventDefault();
      }
   };

   return (
      <div className=" flex flex-col gap-8">
         <h2 className=" text-orange-500">پست جدید</h2>
         <form
            onKeyDown={formKeyNotSuber}
            onSubmit={submiter}
            className=" flex flex-col gap-6"
         >
            <div className=" flex flex-col gap-2">
               <div>عنوان مقاله</div>
               <input
                  required={true}
                  ref={titleRef}
                  type="text"
                  className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               />
            </div>
            <div className=" flex flex-col gap-2">
               <div>اسلاگ پست</div>
               <input
                  required={true}
                  ref={slugRef}
                  type="text"
                  className=" inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               />
            </div>
            <div className=" flex flex-col gap-2">
               <div>آدرس عکس</div>
               <input
                  required={true}
                  ref={imageRef}
                  type="text"
                  className=" inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               />
            </div>
            <div className=" flex flex-col gap-2">
               <div>آلت عکس</div>
               <input
                  required={true}
                  ref={imageAltRef}
                  type="text"
                  className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               />
            </div>
            <div className=" flex flex-col gap-2">
               <div>توضیحات کوتاه</div>
               <input
                  required={true}
                  ref={shortDescRef}
                  type="text"
                  className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               />
            </div>
            <div className=" flex flex-col gap-2">
               <div>توضیحات کامل</div>
               <textarea
                  required={true}
                  ref={longDescRef}
                  type="text"
                  className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                  rows="8"
               />
            </div>
            <div className="tags flex flex-col gap-2">
               <h3>برچسب ها</h3>
               <div className="tags w-full flex flex-col gap-4">
                  <div className="input flex gap-2 items-center">
                     <input
                        type="text"
                        onKeyDown={tagSuber}
                        ref={tagRef}
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                        placeholder="تگ را وارد کنید و انتر بزنید..."
                     />
                  </div>
                  <div className="tagResults flex gap-3 justify-start flex-wrap">
                     {tag.map((t, index) => {
                        return (
                           <div
                              key={t}
                              className="res flex gap-1 text-sm py-1 px-2 rounded-md border-2 border-zinc-300"
                           >
                              <i
                                 className="text-indigo-500 flex items-center"
                                 onClick={() => {
                                    tagDeleter(index);
                                 }}
                              >
                                 <span className="text-xs">{t}</span>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M6 18L18 6M6 6l12 12"
                                    />
                                 </svg>
                              </i>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
            <div className="tags flex flex-col gap-2">
               <h3>مقالات مرتبط</h3>
               {posts[0] == -1 ? (
                  <div className=" flex justify-center items-center p-12">
                     <Image
                        alt="loading"
                        width={40}
                        height={40}
                        src={"/loading.svg"}
                     />
                  </div>
               ) : posts.length < 1 ? (
                  <div className=" p-3">مقاله ای یافت نشد</div>
               ) : (
                  <div className=" flex justify-start items-center flex-wrap gap-2">
                     {posts.map((po, i) => (
                        <div key={i} className=" px-2 py-1 bg-zinc-100 rounded">
                           {po.title}{" "}
                           <input
                              value={po._id}
                              onChange={postsRelatedMan}
                              type="checkbox"
                           />
                        </div>
                     ))}
                  </div>
               )}
            </div>
            <div className=" flex flex-col gap-2">
               <div>منتشر شود</div>
               <select
                  ref={publishedRef}
                  className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               >
                  <option value={true}>انتشار</option>
                  <option value={false}>پیشنویس</option>
               </select>
            </div>
            <button
               type="submit"
               className=" p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-500 hover:bg-orange-500"
            >
               ارسال
            </button>
         </form>
         <ToastContainer
            bodyClassName={() => "font-[shabnam] text-sm"}
            position="top-right"
            autoClose={3000}
            theme="colored"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </div>
   );
};

export default NewPost;
