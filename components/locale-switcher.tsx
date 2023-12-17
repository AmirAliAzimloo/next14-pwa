'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '../i18n-config'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='bg-white border-b-2' >
      <ul className='flex' >
        {i18n.locales.map((locale) => {
          return (
            <li className='bg-neutral-600 rounded-sm text-neutral-200 w-7 h-7 m-1 text-sm centerAll' key={locale}>
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          )
        })} 
      </ul>
    </div>
  )
}
