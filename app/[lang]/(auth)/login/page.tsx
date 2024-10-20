'use client';

import { Locale } from '@/i18n-config'
import { Link } from 'lucide-react';

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale } 
}) {

  return (  
    <div>

      <div className='bg-sky-500 centerAll' >
      {/* <button onClick={()=>{
      if(typeof window !== 'undefined'){
        // window.location.href = 'intent://metrix?slug=ssqzc#Intent;scheme=myscheme;package=ir.metrix.twa.sample;action=NewEvent;end'
        window.location.href = 'intent://myhost?key=value#Intent;scheme=myscheme;package=ir.metrix.twa.sample;action=someaction;end'
      }
    }} >
      Hello Metrix !
    </button> */}
    <Link href="intent://myhost?key=value#Intent;scheme=myscheme;package=ir.metrix.twa.sample;action=someaction;end" mat-flat-button="" target="_blank">
    Hello Metrix !
    </Link>
      </div>
    </div>
  )
}
