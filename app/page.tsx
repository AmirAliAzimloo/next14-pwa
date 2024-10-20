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

      {/* <div className='bg-sky-500 centerAll' >
     <Link href="intent://metrix?slug=ssqzc#Intent;scheme=myscheme;package=app.vercel.next14_pwa.twa;action=ir.metrix.NewEvent;end" target="_blank">
    Hello Metrix !
    </Link>
      </div> */}
      <div onClick={()=>{
        if(typeof window !== 'undefined'){
          window.location.href = "intent://metrix?slug=ssqzc#Intent;scheme=myscheme;package=app.vercel.next14_pwa.twa;action=ir.metrix.NewEvent;end";
        }
      }} className='bg-sky-500 centerAll p-4 rounded-sm cursor-pointer'>
      Hello Metrix !
      </div>
    
    </div>
  )
}
