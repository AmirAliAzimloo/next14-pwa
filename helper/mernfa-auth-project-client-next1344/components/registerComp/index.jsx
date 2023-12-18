"use client"
import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userToNormal } from "@/store/slices/roleSlice";
import { userPhoneConfirmFalse } from "@/store/slices/phoneConfirmedSlice";
import { useremailConfirmedFalse } from "@/store/slices/emailConfirmedSlice";
import { userLogedTrue } from "@/store/slices/logedSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const RegisterComp = () => {

   const usernameRef = useRef();
   const displaynameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();
   const passwordRef = useRef();
   const repasswordRef = useRef();

   const [lastError, setlastError] = useState("");

   const dispatch=useDispatch();
   const router=useRouter();


   // ?   displayname:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/
   // ?   username:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/
   // ?   email:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
   // ?   phone:  /^[0][0-9]{10}$/
   // ?   password:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/



   const submmitHandler = (e) => {
      e.preventDefault();
      const formData = {
         username: usernameRef.current.value,
         displayname: displaynameRef.current.value,
         email: emailRef.current.value,
         phone: phoneRef.current.value,
         password: passwordRef.current.value,
         repassword: repasswordRef.current.value,
         joinedAt:new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };


      // * USERNAME REGEX
      if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/.test(formData.username)) {
         //* DISPLAYNAME REGEX
         if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/.test(formData.displayname)) {
            // * EMAIL REGEX
            if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.email)) {
               // * PHONE REGEX
               if (/^[0][0-9]{10}$/.test(formData.phone)) {
                  // * PASSWORD REGEX
                  if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(formData.password)) {
                     if (formData.password == formData.repassword) {
                        setlastError("");
                        toast.info("please wait...", {
                           autoClose: 3000,
                           hideProgressBar: false,
                           closeOnClick: true,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                        });
                        const url="https://auth-mernfa-course-server.iran.liara.run/api/new-user"
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

                     }
                     else {
                        setlastError(
                           <ul className=" text-xs flex-col flex gap-3 ">
                              <li>repassword :</li>
                              <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>password and repassword must be equal...</span> </li>
                           </ul>
                        );
                     }
                  } else {
                     setlastError(
                        <ul className=" text-xs flex-col flex gap-3 ">
                           <li>password :</li>
                           <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 upperCase char</span></li>
                           <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 lowerCase char</span> </li>
                           <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 number</span> </li>
                           <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 char from </span> </li>
                           <li className=" flex items-center justify-start gap-1"><BsChevronRight />  <span>between 8 to 24 characters #?!@$%^&*-</span>  </li>
                        </ul>
                     );
                  }
               } else {
                  setlastError(<ul className=" text-xs flex-col flex gap-3 ">
                     <li>phone number :</li>
                     <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>should be 11 char</span></li>
                     <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>starts with 0</span> </li>
                  </ul>);
               }
            } else {
               setlastError(<ul className=" text-xs flex-col flex gap-3 ">
                  <li>email :</li>
                  <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>email structure is wrong</span></li>
               </ul>);
            }
         } else {
            setlastError(<ul className=" text-xs flex-col flex gap-3 ">
               <li>displayname :</li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 upperCase char</span></li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 lowerCase char</span> </li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 number</span> </li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />  <span>between 8 to 30 characters</span>  </li>
            </ul>);
         }
      } else {
         setlastError(
            <ul className=" text-xs flex-col flex gap-3 ">
               <li>username :</li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 upperCase char</span></li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 lowerCase char</span> </li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />   <span>at least 1 number</span> </li>
               <li className=" flex items-center justify-start gap-1"><BsChevronRight />  <span>between 8 to 30 characters</span>  </li>
            </ul>);
      }
   }



   return (
      <div className=" flex flex-col justify-center items-center gap-8 my-20 w-96 ">
         <div className=" flex justify-center items-center gap-8"><h1 className=" text-lg">Register page</h1>
            <Link href={"/login"} className=" bg-indigo-600 text-white text-sm rounded px-2 py-1">login</Link>
         </div>
         <form onSubmit={submmitHandler} className=" bg-indigo-200 rounded-md p-8 flex flex-col gap-6 items-center w-full">
            {
               lastError == ""
                  ? <div></div>
                  : <div className=" text-sm w-full rounded p-2 bg-rose-200 border-2 border-rose-500">{lastError}</div>
            }
            <input ref={usernameRef} placeholder="username" type="text" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <input ref={displaynameRef} placeholder="displayname" type="text" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <input ref={emailRef} placeholder="email" type="email" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <input
             ref={phoneRef} placeholder="09 - - - - - - - - -" type="text" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <input ref={passwordRef} placeholder="password" type="password" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <input ref={repasswordRef} placeholder="repassword" type="password" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
            <button type="submit" className=" rounded p-1 w-full  text-white bg-indigo-600">REGISTER</button>
         </form>
      </div>
   );
}

export default RegisterComp;