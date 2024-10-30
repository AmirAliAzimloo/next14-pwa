'use client';

import { useSearchParams } from "next/navigation";

export default async function IndexPage() {

  const searchParams = useSearchParams();
  const GA_ID = searchParams?.get('gps_adid');

  return ( 
    <div className="w-full h-full flex items-center justify-center flex-col gap-8">

      <div className="text-white">
        Youre Google Ads Id is {`${GA_ID ?? ''}`}
      </div>

      
      
    
    </div>
  )
}
