'use client';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default async function IndexPage() {

  const searchParams = useSearchParams();
  const GA_ID = searchParams?.get('gps_adid');

  useEffect(()=>{
    window.dataLayer.push({event: "gtm.load", "gtm.uniqueEventId": 3})
  },[])

  return ( 
    <div className="w-full h-full flex items-center justify-center flex-col gap-8">

      <div className="text-white">
        Youre Google Ads Id is {`${GA_ID ?? ''}`}
      </div>

      
      
    
    </div>
  )
}
