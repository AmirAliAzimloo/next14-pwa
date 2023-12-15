"use client";
import { useRef } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const NewMidBanner = () => {
   const imageUrlRef = useRef();
   const imageAltRef = useRef();
   const imageLinkRef = useRef();
   const imageSituationRef = useRef();
   const submiter = (e) => {
      e.preventDefault();
      const formData = {
         image: imageUrlRef.current.value,
         imageAlt: imageAltRef.current.value,
         link: imageLinkRef.current.value,
         situation: imageSituationRef.current.value,
         date: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
         }),
      };
      const url = `https://mernfa-fileshop-server.iran.liara.run/api/new-middle-banner`;
      axios
         .post(url, formData)
         .then((d) => {
            formData.situation == "true"
               ? toast.success("بنر تبلیغاتی با موفقیت منتشر شد.", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 })
               : toast.success("بنر تبلیغاتی به صورت پیشنویس ذخیره شد.", {
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
         <h2 className=" text-orange-500">بنر جدید</h2>
         <form
            onSubmit={submiter}
            onKeyDown={formKeyNotSuber}
            className=" flex flex-col gap-6"
         >
            <div className=" flex flex-col gap-2">
               <div>آدرس عکس</div>
               <input
                  required={true}
                  ref={imageUrlRef}
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
               <div>لینک عکس</div>
               <input
                  required={true}
                  ref={imageLinkRef}
                  type="text"
                  className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               />
            </div>
            <div className=" flex flex-col gap-2">
               <div>روشن و خاموش</div>
               <select
                  ref={imageSituationRef}
                  className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
               >
                  <option value={true}>روشن</option>
                  <option value={false}>خاموش</option>
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
            bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
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

export default NewMidBanner;
