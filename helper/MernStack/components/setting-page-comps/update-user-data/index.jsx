"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { setuserImageValue } from "@/store/slices/userImageSlice";
import { useDispatch } from "react-redux";


const UpdateUserData = ({ token }) => {

   const dispatch = useDispatch();

   const usernameRef = useRef();
   const blog_nameRef = useRef();
   const displaynameRef = useRef();
   const detailsRef = useRef();
   const passwordRef = useRef();


   const [userDefValues, setuserDefValues] = useState(-1);

   const [userdefvaluesReloader, setuserdefvaluesReloader] = useState(-1);
   useEffect(() => {
      axios.get("/api/user/user-setting-default-items"
         , { headers: { token: token } }
      )
         .then(d => {
            dispatch(setuserImageValue(d.data.data.image != "" ? d.data.data.image : d.data.data.default_image));
            setuserDefValues(d.data.data);
         })
         .catch(error => {
            console.log(error.response.data);
         })
   }, [userdefvaluesReloader]);

   const usernameupdater = (e) => {
      e.preventDefault();
      const formData = {
         username: usernameRef.current.value == "" ? undefined : usernameRef.current.value,
      }
      axios.post("/api/user/update", formData
         , { headers: { token: token } }
      )
         .then(d => {
            toast.success("به روزرسانی با موفقیت انجام شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const blognameupdater = (e) => {
      e.preventDefault();
      const formData = {
         blog_name: blog_nameRef.current.value == "" ? undefined : blog_nameRef.current.value,
      }
      axios.post("/api/user/update", formData
         , { headers: { token: token } }
      )
         .then(d => {
            toast.success("به روزرسانی با موفقیت انجام شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const displaynameupdater = (e) => {
      e.preventDefault();
      const formData = {
         displayname: displaynameRef.current.value == "" ? undefined : displaynameRef.current.value,
      }
      axios.post("/api/user/update", formData
         , { headers: { token: token } }
      )
         .then(d => {
            toast.success("به روزرسانی با موفقیت انجام شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const detailsupdater = (e) => {
      e.preventDefault();
      const formData = {
         details: detailsRef.current.value == "" ? undefined : detailsRef.current.value,
      }
      axios.post("/api/user/update", formData
         , { headers: { token: token } }
      )
         .then(d => {
            toast.success("به روزرسانی با موفقیت انجام شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const passwordupdater = (e) => {
      e.preventDefault();
      const formData = {
         password: passwordRef.current.value == "" ? undefined : passwordRef.current.value,
      }
      axios.post("/api/user/update", formData
         , { headers: { token: token } }
      )
         .then(d => {
            toast.success("به روزرسانی با موفقیت انجام شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const imageupdater = (e) => {
      e.preventDefault();
      axios.post("/api/user/update-user-image", e.target
         , { headers: { token: token } }
      )
         .then(d => {
            setuserdefvaluesReloader(userdefvaluesReloader * -1);
            toast.success("به روزرسانی با موفقیت انجام شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch(error => {
            const message = error.response.data ? error.response.data.data : "خطا در فرایند به روزرسانی";
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }

   const [imagename, setimagename] = useState("");


   return (
      <div className=" flex justify-center items-center">
         <div className="flex flex-col gap-12 p-4 w-[800px]">

            {
               userDefValues == -1
                  ? <div className=" my-12 flex justify-center items-center">
                     <Image width={120} height={120} alt="loding" src={"/loading.svg"} />
                  </div>
                  : <div className="flex flex-col gap-20">
                     <div className=" flex flex-col gap-1">
                        <div>تصویر وبلاگ</div>
                        <div className=" flex  justify-between items-center gap-2">
                           <form onSubmit={imageupdater} className=" w-full  flex justify-start items-center gap-4">
                              <div className=" flex justify-start w-full  gap-2 items-center">
                                 <div className=" relative w-32 h-32">
                                    <Image alt="user image" fill src={userDefValues.image != "" ? userDefValues.image : userDefValues.default_image} className=" rounded-full object-cover" />
                                 </div>
                                 <div>
                                    <div className=" w-40 h-24 flex justify-center items-center">
                                       <input onChange={(e) => {
                                          setimagename(e.target.files[0].name)
                                       }} id="file" type="file" name="file" />
                                       <div className="w-40 h-24 flex justify-center items-center gap-2">
                                          <label className=" w-40 min-w-40 cursor-pointer  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600" htmlFor="file">
                                             {
                                                imagename == ""
                                                   ? "انتخاب عکس جدید"
                                                   : imagename
                                             }
                                          </label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className=" flex flex-col gap-2 text-base text-zinc-600 sm:text-xs">
                                    <div>حجم باید کمتر از 2 مگ باشد.</div>
                                    <div>فقط PNG، JPG و JPEG</div>
                                 </div>
                              </div>
                              <button type="submit" className=" w-24 min-w-24  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">ذخیره عکس</button>
                           </form>
                        </div>
                     </div>
                     <div className=" flex flex-col gap-1">
                        <div>نام کاربری</div>
                        <div className=" flex justify-between items-center gap-2">
                           <input defaultValue={userDefValues.username} ref={usernameRef} type="text" placeholder="نام کاربری جدید" className='border-b-2 border-zinc-200 p-2 outline-none focus:border-blue-500 w-full ' />
                           <button onClick={usernameupdater} className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">ذخیره</button>
                        </div>
                     </div>
                     <div className=" flex flex-col gap-1">
                        <div>نام وبلاگ</div>
                        <div className=" flex justify-between items-center gap-2">
                           <input defaultValue={userDefValues.blog_name} ref={blog_nameRef} type="text" placeholder="نام وبلاگ جدید" className='border-b-2 border-zinc-200 p-2 outline-none focus:border-blue-500 w-full ' />
                           <button onClick={blognameupdater} className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">ذخیره</button>
                        </div>
                     </div>
                     <div className=" flex flex-col gap-1">
                        <div>نام نمایشی</div>
                        <div className=" flex justify-between items-center gap-2">
                           <input defaultValue={userDefValues.displayname} ref={displaynameRef} type="text" placeholder="نام نمایشی جدید" className='border-b-2 border-zinc-200  p-2 outline-none focus:border-blue-500 w-full ' />
                           <button onClick={displaynameupdater} className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">ذخیره</button>
                        </div>
                     </div>
                     <div className=" flex flex-col gap-1">
                        <div>درباره وبلاگ</div>
                        <div className=" flex justify-between items-center gap-2">
                           <input defaultValue={userDefValues.details} ref={detailsRef} type="text" placeholder="درباره وبلاگ جدید" className='border-b-2 border-zinc-200  p-2 outline-none focus:border-blue-500 w-full ' />
                           <button onClick={detailsupdater} className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">ذخیره</button>
                        </div>
                     </div>
                     <div className=" flex flex-col gap-1">
                        <div>رمز عبور </div>
                        <div className=" flex justify-between items-center gap-2">
                           <input ref={passwordRef} type="password" placeholder="رمز عبور جدید جدید" className='border-b-2 border-zinc-200 p-2 outline-none focus:border-blue-500 w-full ' />
                           <button onClick={passwordupdater} className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600">ذخیره</button>
                        </div>
                     </div>
                  </div>
            }
         </div>
      </div>
   );
}

export default UpdateUserData;