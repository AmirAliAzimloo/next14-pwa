import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { parse } from 'cookie';


function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))



  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

 

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}


export function middleware(request: NextRequest) { 
  const pathname = request.nextUrl.pathname;


  const cookies = parse(request.headers.get('cookie') || '');

  const { token } = cookies;

  // console.log('Parsed Cookies:', cookies);

  // console.log("***********************************")
  // console.log(request.cookies)
  // console.log(request.cookies.token)
  // console.log(token)
  // console.log("***********************************")

  // if(!token){
  //     console.log("***********************************")
  //   console.log(pathname)
  //     console.log("***********************************")

  //     return NextResponse.redirect(new URL('/fa/login', request.url), { status: 303 });

  // }




  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    [
      '/firebase-messaging-sw.js',
      '/icomoon/style.css',
      '/icomoon/fonts/custom-icon-font.eot',
      '/icomoon/fonts/custom-icon-font.svg',
      '/icomoon/fonts/custom-icon-font.ttf',
      '/icomoon/fonts/custom-icon-font.woff',
      '/manifest.json',
      '/favicon.ico',
      '/sw.js',
      '/next.svg',
      '/sw.js.map',
      '/swe-worker-development.js',
      '/vercel.svg',
      '/workbox-7144475a.js',
      '/workbox-7144475a.js.map',
      '/icons/android-chrome-192x192.png',
      '/icons/android-chrome-384*384.png',
      '/icons/android-chrome-512*512.png',
      // Your other files in `public`


    ].includes(pathname)
  )
    return



  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )


  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products

    return NextResponse.redirect(
      new URL(
        `/${i18n.defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }

}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}




