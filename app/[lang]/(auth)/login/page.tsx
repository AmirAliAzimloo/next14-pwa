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
        <Link href={`/${lang}/register`} >
        create account
        </Link>
      </div>
    </div>
  )
}
