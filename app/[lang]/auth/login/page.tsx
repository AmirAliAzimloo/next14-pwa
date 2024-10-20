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
     <Link href="intent://metrix?slug=ssqzc#Intent;scheme=myscheme;package=app.vercel.next14_pwa.twa;action=ir.metrix.NewEvent;end" target="_blank">
    Hello Metrix !
    </Link>
      </div>
    </div>
  )
}
