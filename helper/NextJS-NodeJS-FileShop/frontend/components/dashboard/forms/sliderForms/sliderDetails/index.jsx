"use client";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const SliderDetails = ({ midBanId }) => {
   // FORM SHOULD BE NOT SEND WITH ENTER KEY
   const formKeyNotSuber = (event) => {
      if (event.key == "Enter") {
         event.preventDefault();
      }
   };

   const imageUrlRef = useRef();
   const imageAltRef = useRef();
   const sorterRef = useRef();
   const imageLinkRef = useRef();
   const imageSituationRef = useRef();
   const updater = (e) => {
      e.preventDefault();
      const formData = {
         goalId: midBanId,
         image: imageUrlRef.current.value,
         imageAlt: imageAltRef.current.value,
         sorter: sorterRef.current.value,
         link: imageLinkRef.current.value,
         situation: imageSituationRef.current.value,
         date: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
         }),
      };
      const url = `https://mernfa-fileshop-server.iran.liara.run/api/update-slider/${midBanId}`;
      axios
         .post(url, formData)
         .then((d) => {
            formData.situation == "true"
               ? toast.success("اسلایدر با موفقیت به روزرسانی و منتشر شد.", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 })
               : toast.success(
                    "اسلایدر به روزرسانی و به صورت پیشنویس ذخیره شد.",
                    {
                       autoClose: 3000,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: true,
                       progress: undefined,
                    }
                 );
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
   const [fullData, setfullData] = useState([-1]);

   useEffect(() => {
      axios
         .get(
            `https://mernfa-fileshop-server.iran.liara.run/api/get-slider/${midBanId}`
         )
         .then((d) => {
            setfullData(d.data);
         })
         .catch((e) =>
            toast.error("خطا در لود اطلاعات", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            })
         );
   }, [midBanId]);

   const remover = () => {
      const url = `https://mernfa-fileshop-server.iran.liara.run/api/delete-slider/${midBanId}`;
      axios
         .post(url)
         .then((d) => {
            toast.success("اسلایدر با موفقیت حذف شد.", {
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

   return (
      <div className=" flex flex-col gap-8">
         {fullData[0] == -1 ? (
            <div className=" flex justify-center items-center p-12">
               <Image
                  alt="loading"
                  width={120}
                  height={120}
                  src={"/loading.svg"}
               />
            </div>
         ) : (
            <div className=" flex flex-col gap-8">
               <div className=" flex justify-between items-center">
                  <h2 className=" text-orange-500">جزئیات اسلایدر</h2>
                  <button
                     onClick={() => remover()}
                     className=" bg-rose-600 text-white px-4 py-1 rounded-md text-xs transition-all duration-500 hover:bg-rose-700"
                  >
                     حذف
                  </button>
               </div>
               <div className=" flex justify-between items-center">
                  <div className=" bg-zinc-100 rounded px-3 py-1 text-sm">
                     {fullData._id ? fullData._id : ""}
                  </div>
                  <div className=" bg-zinc-100 rounded px-3 py-1 text-sm">
                     {fullData.date ? fullData.date : ""}
                  </div>
               </div>
               <form
                  onKeyDown={formKeyNotSuber}
                  onSubmit={updater}
                  className=" flex flex-col gap-6"
               >
                  <div className=" flex flex-col gap-2">
                     <div>آدرس جدید عکس</div>
                     <input
                        required={true}
                        defaultValue={fullData.image}
                        ref={imageUrlRef}
                        type="text"
                        className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>آلت جدید عکس</div>
                     <input
                        required={true}
                        defaultValue={fullData.imageAlt}
                        ref={imageAltRef}
                        type="text"
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>سورتر جدید اسلایدر</div>
                     <input
                        required={true}
                        defaultValue={fullData.sorter}
                        ref={sorterRef}
                        type="number"
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>لینک جدید عکس</div>
                     <input
                        required={true}
                        defaultValue={fullData.link}
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
                        {fullData.situation == true ? (
                           <>
                              <option value={true}>روشن</option>
                              <option value={false}>خاموش</option>
                           </>
                        ) : (
                           <>
                              <option value={false}>خاموش</option>
                              <option value={true}>روشن</option>
                           </>
                        )}
                     </select>
                  </div>
                  <button
                     type="submit"
                     className=" p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-500 hover:bg-orange-500"
                  >
                     به روز رسانی
                  </button>
               </form>
            </div>
         )}

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

export default SliderDetails;
