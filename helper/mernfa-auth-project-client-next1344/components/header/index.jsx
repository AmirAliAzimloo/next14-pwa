"use client"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useremailConfirmedFalse } from "@/store/slices/emailConfirmedSlice";
import { useremailConfirmedTrue } from "@/store/slices/emailConfirmedSlice";

import { userLogedFalse } from "@/store/slices/logedSlice";
import { userLogedTrue } from "@/store/slices/logedSlice";

import { userPhoneConfirmFalse } from "@/store/slices/phoneConfirmedSlice";
import { userPhoneConfirmTrue } from "@/store/slices/phoneConfirmedSlice";

import { userToAdmin } from "@/store/slices/roleSlice";
import { userToNormal } from "@/store/slices/roleSlice";
import { userToLogout } from "@/store/slices/roleSlice";


const Header = () => {
   const dispatch=useDispatch();


   const [authToken,setauthToken]=useState(Cookies.get("auth_token"));
   
   useEffect(()=>{
      const theUrl="https://auth-mernfa-course-server.iran.liara.run/api/cookie-to-user";
      
      axios.get(theUrl,{headers:{auth_token:authToken}})
      .then(data=>{
         // console.log(data.data)  
         data.data.data.loged==1?dispatch(userLogedTrue()):dispatch(userLogedFalse());
         data.data.data.email_confirmed==false?dispatch(useremailConfirmedFalse()):dispatch(useremailConfirmedTrue());
         data.data.data.phone_confirmed==false?dispatch(userPhoneConfirmFalse()):dispatch(userPhoneConfirmTrue());
         data.data.data.role==1?dispatch(userToAdmin()):(data.data.data.role==3)?dispatch(userToNormal()):dispatch(userToLogout());
      })
      .catch(err=>{
         console.log(err);
         (err.response.data && err.response.data.clearToken)?Cookies.set("auth_token", "", { expires: 0 }):console.log("");
         dispatch(userLogedFalse());
         dispatch(useremailConfirmedFalse());
         dispatch(userPhoneConfirmFalse());
         dispatch(userToLogout());
      })
   },[]);



   // const logedValue=useSelector(store=>store.loged.value);
   // const emailConfirmedValue=useSelector(store=>store.emailConfirmed.value);
   // const phoneConfirmedValue=useSelector(store=>store.phoneConfirmed.value);
   // const roleValue=useSelector(store=>store.role.value);
   // console.log("loged is",logedValue);
   // console.log("emailConfirmedValue is",emailConfirmedValue);
   // console.log("phoneConfirmedValue is",phoneConfirmedValue);
   // console.log("roleValue is",roleValue);


   return (
      <div className=" text-sm py-8 flex justify-around items-center gap-4">
         <Link href={"/"} className="  bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all duration-500">Home</Link>
         <Link href={"/login"} className="  bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all duration-500">login</Link>
         <Link href={"/register"} className="  bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all duration-500">register</Link>
         <Link href={"/account"} className="  bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all duration-500">account</Link>
         <Link href={"/admin-pannel"} className="  bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all duration-500">admin-pannel</Link>
      </div>
   );
}

export default Header;