'use client';

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import LoginForm from '../components/LoginForm'
import Link from 'next/link'

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale } 
}) {

  console.log("login page")
  return ( 
    <div>
      <LoginForm />

      <div className='bg-sky-500 centerAll' >
      {/* <button onClick={()=>{
      if(typeof window !== 'undefined'){
        window.location.href = 'intent://metrix?slug=ssqzc#Intent;scheme=myscheme;package=my.app.package;action=ir.metrix.NewEvent;end'
      }
    }} >
      Hello Metrix !
    </button> */}
     <Link href="intent://myhost?key=value#Intent;scheme=myscheme;package=ir.metrix.twa.sample;action=someaction;end" target="_blank">
    Hello Metrix !
    </Link>
      </div>
    </div>
  )
}
