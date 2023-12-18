"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userToNormal } from "@/store/slices/roleSlice";
import { userToAdmin } from "@/store/slices/roleSlice";
import { userPhoneConfirmFalse } from "@/store/slices/phoneConfirmedSlice";
import { useremailConfirmedFalse } from "@/store/slices/emailConfirmedSlice";
import { userLogedTrue } from "@/store/slices/logedSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginComp = () => {

   const itemOneRef = useRef();
   const passwordRef = useRef();

   const [lastError, setlastError] = useState("");
   const dispatch=useDispatch();
   const router=useRouter();

   // ?   email:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
   // ?   password:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/

   const [cookieForRedirectFlag,setcookieForRedirectFlag]=useState(-1);
   useEffect(()=>{
      if(cookieForRedirectFlag==1){
         router.push("/account");
      }
   },[cookieForRedirectFlag])


   const submmitHandler = (e) => {
      e.preventDefault();
      const formData = {
         itemOne: itemOneRef.current.value,
         password: passwordRef.current.value,
      };

      if (!formData.itemOne.includes("@")) {
         // * PHONE REGEX
         if (/^[0][0-9]{10}$/.test(formData.itemOne)) {
            // * PASSWORD REGEX
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(formData.password)) {
               setlastError("");
               toast.info("please wait...", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               });
               const url="https://auth-mernfa-course-server.iran.liara.run/api/login-user"
               axios.post(url,formData)
               .then(data=>{
                     dispatch(userToNormal());
                     dispatch(userPhoneConfirmFalse());
                     dispatch(useremailConfirmedFalse());
                     dispatch(userLogedTrue());
                     Cookies.set("auth_token",data.data.auth_token,{expires:30});
                     toast.success("successfully you loged in...", {
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     });
                     router.push("/account");
               })
               .catch(err=>{
                  const errMsg=err?.response?.data?.msg?err.response.data.msg:"error in creating user";
                  toast.error(errMsg, {
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                  });
               })

            } else {
               setlastError(<ul className=" text-xs flex-col flex gap-3 ">
                  <li>password :</li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 upperCase char</span></li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 lowerCase char</span> </li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 number</span> </li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 char from </span> </li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />  <span>between 8 to 24 characters #?!@$%^&*-</span>  </li>
               </ul>);
            }
         }else {
            setlastError(<ul className=" text-xs flex-col flex gap-3 ">
               <li>phone number :</li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>should be 11 char</span></li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>starts with 0</span> </li>
            </ul>);
         }
      } else {
         // * EMAIL REGEX
         if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.itemOne)) {
            // * PASSWORD REGEX
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(formData.password)) {
               setlastError("");
               toast.info("please wait...", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               });
               const url="https://auth-mernfa-course-server.iran.liara.run/api/login-user"
               axios.post(url,formData)
               .then(data=>{
                     data.data.role==3?dispatch(userToNormal()):dispatch(userToAdmin());
                     dispatch(userPhoneConfirmFalse());
                     dispatch(useremailConfirmedFalse());
                     dispatch(userLogedTrue());
                     Cookies.set("auth_token",data.data.auth_token,{expires:30});
                     toast.success("successfully you loged in...", {
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     });
                     setcookieForRedirectFlag(1);
                     
               })
               .catch(err=>{
                  const errMsg=err?.response?.data?.msg?err.response.data.msg:"error in creating user";
                  toast.error(errMsg, {
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                  });
               })

            } else {
               setlastError(<ul className=" text-xs flex-col flex gap-3 ">
                  <li>password :</li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 upperCase char</span></li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 lowerCase char</span> </li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 number</span> </li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 char from </span> </li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />  <span>between 8 to 24 characters #?!@$%^&*-</span>  </li>
               </ul>);
            }
         } else {
            setlastError(<ul className=" text-xs flex-col flex gap-3 ">
               <li>email :</li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>email structure is wrong</span></li>
            </ul>);
         }
      }

   }



   return (
      <div className=" flex flex-col justify-center items-center gap-8 my-20 w-96 ">
         <div className=" flex justify-center items-center gap-8"><h1 className=" text-lg">Login page</h1>
            <Link href={"/register"} className=" bg-indigo-600 text-white text-sm rounded px-2 py-1">register</Link>
         </div>
         <form onSubmit={submmitHandler} className=" bg-indigo-200 rounded-md p-8 flex flex-col gap-6 items-center w-full">
            {
               lastError == ""
                  ? <div></div>
                  : <div className=" text-sm w-full rounded p-1 bg-rose-200 border-2 border-rose-500">{lastError}</div>
            }
            <input
               ref={itemOneRef} placeholder="email or phone (09 - - - - - - - - -)" type="text" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <input ref={passwordRef} placeholder="password" type="password" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <button type="submit" className=" rounded p-1 w-full  text-white bg-indigo-600">LOGIN</button>
         </form>
      </div>
   );
}

export default LoginComp;