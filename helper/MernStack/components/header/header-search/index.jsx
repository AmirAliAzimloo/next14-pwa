"use client"

import { BsArrowLeftShort } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import { useState, useEffect } from "react";

const HeaderSearch = () => {
   const [arrowShow, setarrowShow] = useState(false);



   return (
      <form className=" flex justify-center items-center border-2 bg-zinc-100 rounded-full w-[300px]  py-1 px-2" >
         <input onChange={(e) => {
            e.target.value.length > 0 ? setarrowShow(true) : setarrowShow(false);
         }} placeholder="جستجو در مرن بلاگ ..." type="text" className=" placeholder-zinc-500 focus:placeholder-zinc-400 w-60 outline-none p-1 bg-transparent" />
         <div className=" w-6">
            <BsArrowLeftShort className={
               arrowShow == false
                  ? " hidden w-8 h-8 text-zinc-600 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-300 rounded"
                  : " w-8 h-8 text-zinc-600 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-300 rounded"
            } />
            <BsSearch className=
            {
               arrowShow == false
                  ? " w-5 h-5 text-zinc-600"
                  : " hidden w-5 h-5 text-zinc-600"
            }
         />
         </div>
         
      </form>
   );
}

export default HeaderSearch;