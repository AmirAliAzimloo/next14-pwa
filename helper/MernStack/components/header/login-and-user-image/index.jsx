"use client"

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import UserMenu from "../user-menu";
import { useState } from "react";



const LoginAndUserImage = () => {
   const loged=useSelector(store=>store.logedSlice.value);
   const user_image=useSelector(store=>store.userImageSlice.value);

   const [menuIsOpen,setmenuIsOpen]=useState(-1);

   return (
      <div>
         {
            loged == false
               ? <Link href={"/sign-in"} className=" bg-blue-500 px-3 py-1 rounded-md text-white text-base sm:text-sm">ورود/ثبت نام</Link>
               : <div className=" relative w-[60px] h-[60px]">
                  <Image onClick={()=>setmenuIsOpen(-1*menuIsOpen)} className=" object-cover cursor-pointer rounded-full border-2 border-blue-500 transition-all duration-300 hover:border-blue-600"
                  src={user_image} fill alt="test" />
               </div>
         }
         <UserMenu menuIsOpen={menuIsOpen} setmenuIsOpen={setmenuIsOpen}/>
      </div>
   );
}

export default LoginAndUserImage;