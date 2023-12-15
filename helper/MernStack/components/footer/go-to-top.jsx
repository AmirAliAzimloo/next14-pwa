"use client"

import { CiLocationArrow1 } from "react-icons/ci";


const GoToTop = () => {

   const goTopCtrl = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };


   return (
      <CiLocationArrow1 onClick={() => goTopCtrl()} className=" w-[3.2rem] h-[3.2rem] border-2 cursor-pointer border-zinc-400 transition-all duration-500 hover:border-blue-500  text-blue-600 hover:bg-white  -rotate-45 p-2 fixed bottom-4 left-12 bg-[#ddddddaa] rounded-full" />
   );
}

export default GoToTop;