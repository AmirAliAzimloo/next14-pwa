"use client"
import LinkItem from "./link-item";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userIsActiveToFalse } from "@/store/slices/user_is_active";
import { setRoleValue } from "@/store/slices/roleSlice";
import { logedToFalse } from "@/store/slices/logedSlice";
import { setuserImageValue } from "@/store/slices/userImageSlice";






const UserMenu = ({ menuIsOpen, setmenuIsOpen }) => {

   const [logoutManager, setlogoutManager] = useState(-1);
   const router = useRouter();
   const dispatch = useDispatch();


   useEffect(() => {
      if (logoutManager == 1) {
         router.push("/sign-in");
      }
   }, [logoutManager]);




   return (
      <div className={
         menuIsOpen == 1
            ? " w-[320px] h-[100vh]  backdrop-blur-lg bg-[#000000cc] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center transition-all duration-500"
            : " w-[320px] h-[100vh]  backdrop-blur-lg bg-[#000000cc] fixed top-0 bottom-0 -left-[320px] -right-[100%] flex justify-center items-center transition-all duration-500"
      }

      >
         <div className=" flex flex-col gap-3 p-4">
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="تنظیمات" link="/setting" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="پیام ها" link="/notifications" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="فالوورها" link="/follow/followers" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="فالووینگ ها" link="/follow/followings" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="ایجاد پست" link="/create-post" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="همه پست های من" link="/my-posts/all" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="پیش نویس های من" link="/my-posts/drafts" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="پست های منتشر شده" link="/my-posts/published" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="در انتظار تایید مدیر" link="/my-posts/waiting" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="پست های بوک مارک شده" link="/my-posts/bookmarked" />
            <LinkItem setmenuIsOpen={setmenuIsOpen} title="پست های لایک شده" link="/my-posts/liked" />
            <button onClick={() => {
               Cookies.set("token", "", { expires: 0 });
               setlogoutManager(1);

               dispatch(setuserImageValue("https://secure.gravatar.com/avatar/username?s=60&d=identicon"));

               dispatch(userIsActiveToFalse());
               dispatch(setRoleValue(4));
               dispatch(logedToFalse());


            }} className="w-[225px] text-center text-white transition-all duration-500 hover:bg-blue-500  py-2 rounded-md">خروج</button>
         </div>
         <IoMdClose onClick={() => setmenuIsOpen(-1 * menuIsOpen)} className=" cursor-pointer w-8 h-8 text-white absolute top-2 left-2 " />
      </div>
   );
}

export default UserMenu;