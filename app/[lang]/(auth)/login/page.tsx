'use client';

import { Locale } from '@/i18n-config'

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale } 
}) {

  return (  
    <div>

      <div className='bg-sky-500 centerAll' >
      <button onClick={()=>{
      if(typeof window !== 'undefined'){ 
        window.location.href = 'intent://metrix?slug=ssqzc#Intent;scheme=myscheme;package=ir.metrix.twa.sample;action=NewEvent;end'
      }
    }} >
      Hello Metrix !
    </button>
      </div>
    </div>
  )
}
