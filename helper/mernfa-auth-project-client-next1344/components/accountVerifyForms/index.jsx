"use client"
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


import { useremailConfirmedFalse } from "@/store/slices/emailConfirmedSlice";
import { userLogedFalse } from "@/store/slices/logedSlice";
import { userPhoneConfirmFalse } from "@/store/slices/phoneConfirmedSlice";
import { userToLogout } from "@/store/slices/roleSlice";

const AccountVerifyForms = () => {
   const router = useRouter();
   const [authToken, setauthToken] = useState(Cookies.get("auth_token"));

   const emailVerifyCodeRef = useRef();
   const phoneVerifyCodeRef = useRef();

   const [logoutState, setlogoutState] = useState(-1);


   const sendVerifyEmail = () => {
      const theUrl = "https://auth-mernfa-course-server.iran.liara.run/api/send-register-email";
      axios.get(theUrl, { headers: { auth_token: authToken } })
         .then(data => {
            const msg = data.data ? data.data.msg : "email sended";
            toast.success(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

         })
         .catch(err => {
            console.log(err);
            const msg = (err.response && err.response.data) ? err.response.data.msg : "error happend";
            toast.error(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const verifyEmail = (e) => {
      e.preventDefault();
      const formData = {
         emailCode: emailVerifyCodeRef.current.value
      };
      const theUrl = "https://auth-mernfa-course-server.iran.liara.run/api/confirm-user-email";
      axios.post(theUrl, formData, { headers: { auth_token: authToken } })
         .then(data => {
            const msg = data.data ? data.data.msg : "your email is active now";
            toast.success(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
            emailVerifyCodeRef.current.value = "";
         })
         .catch(err => {
            console.log(err);
            const msg = (err.response && err.response.data) ? err.response.data.msg : "code is wrong";
            toast.error(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }



   const sendVerifyPhone = () => {
      const theUrl = "https://auth-mernfa-course-server.iran.liara.run/api/send-register-phone";
      axios.get(theUrl, { headers: { auth_token: authToken } })
         .then(data => {
            const msg = data.data ? data.data.msg : "SMS sended";
            toast.success(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

         })
         .catch(err => {
            console.log(err);

            const msg = (err.response && err.response.data) ? err.response.data.msg : "error happend";
            toast.error(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }
   const verifyPhone = (e) => {
      e.preventDefault();
      const formData = {
         phoneCode: phoneVerifyCodeRef.current.value
      };
      const theUrl = "https://auth-mernfa-course-server.iran.liara.run/api/confirm-user-phone";
      axios.post(theUrl, formData, { headers: { auth_token: authToken } })
         .then(data => {
            const msg = data.data ? data.data.msg : "your email is active now";
            toast.success(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
            emailVerifyCodeRef.current.value = "";
         })
         .catch(err => {
            console.log(err);
            const msg = (err.response && err.response.data) ? err.response.data.msg : "code is wrong";
            toast.error(msg, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
   }




   const logouter = () => {
      Cookies.set("auth_token", "", { expires: 0 });
      setlogoutState(1);
      dispatch(userLogedFalse());
      dispatch(useremailConfirmedFalse());
      dispatch(userPhoneConfirmFalse());
      dispatch(userToLogout());
   }
   useEffect(() => {
      if (logoutState == 1) {
         router.push("/login");
      }
   }, [logoutState]);






   return (
      <div className=" flex flex-col items-center w-full gap-24 text-sm">
         <div className=" flex-wrap md:flex-nowrap flex justify-between items-start w-full gap-20 text-sm">
            <div className=" flex flex-col gap-4  w-full">
               <div className=" flex justify-between items-center">
                  <h3 className=" text-base font-bold">verify email</h3>
                  <button onClick={() => sendVerifyEmail()} className=" bg-blue-500 transition-all duration-300 p-1 text-white hover:bg-blue-600 rounded">send email</button>
               </div>
               <form onSubmit={verifyEmail} className=" bg-indigo-200 rounded-md p-8 flex flex-col gap-6 items-center w-full">
                  <input
                     ref={emailVerifyCodeRef} placeholder="email verify code" type="text" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
                  <button type="submit" className=" rounded p-1 w-full  text-white bg-indigo-600">VERIFY MY EMAIL</button>
               </form>
            </div>
            <div className=" flex flex-col gap-4  w-full">
               <div className=" flex justify-between items-center">
                  <h3 className=" text-base font-bold">verify phone</h3>
                  <button onClick={() => sendVerifyPhone()} className=" bg-blue-500 transition-all duration-300 p-1 text-white hover:bg-blue-600 rounded">send phone message</button>
               </div>
               <form onSubmit={verifyPhone} className=" bg-indigo-200 rounded-md p-8 flex flex-col gap-6 items-center w-full">
                  <input
                     ref={phoneVerifyCodeRef} placeholder="email verify code" type="text" className=" w-full rounded p-1 outline-none border-transparent border-2 focus:border-indigo-600" />
                  <button type="submit" className=" rounded p-1 w-full  text-white bg-indigo-600">VERIFY MY PHONE</button>
               </form>
            </div>
         </div>
         <div className=" flex justify-start items-center w-full"><button onClick={() => logouter()} className="bg-rose-600 text-white transition-all duration-300 hover:bg-rose-700 rounded p-1">log out</button></div>
      </div>
   );
}

export default AccountVerifyForms;