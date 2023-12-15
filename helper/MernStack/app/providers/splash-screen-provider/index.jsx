"use client"
// import { usePathname} from "next/navigation";
import { useState } from "react";
import SplashScreenBox from "@/components/splash-screen-box";

const SplashScreenProvider = ({children}) => {
   // const pathname=usePathname();

   // const isHome=pathname==="/";

   const [isLoading,setisLoading]=useState(true);
   setTimeout(()=>{setisLoading(false)},2000);


   return (
      <div>
         {
            isLoading
            ?<SplashScreenBox/>
            :children
         }
      </div>
   );
}

export default SplashScreenProvider;