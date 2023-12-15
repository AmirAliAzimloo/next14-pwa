"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

const LinkItem = ({setmenuIsOpen,title,link}) => {
   const path=usePathname();
   return (
      <Link onClick={()=>setmenuIsOpen(-1)} className={
         path==link
         ?"  w-[225px] text-center text-white transition-all duration-500 hover:bg-blue-500 bg-blue-600 py-2 rounded-md"
         :"  w-[225px] text-center text-white transition-all duration-500 hover:bg-blue-500  py-2 rounded-md"
      }
      
      
      href={`${link}`}>{title}</Link>
   );
}

export default LinkItem;