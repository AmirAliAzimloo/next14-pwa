import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './libs/i18n/i18n-config'
import { cookies } from 'next/headers';


export function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const authToken = cookies().get("token");
  const language = cookies().get("lng");

  
  
  

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/sw.js',
      '/sw.js.map',
      '/swe-worker-development.js',
      '/workbox-7144475a.js',
      '/workbox-7144475a.js.map',
      '/logo192.png',
      '/logo512.png',
      '/logo144.png',
      '/assets',
      '/public',
      '/public/assets/icons/logo144.png',
      '/public/assets/icons/logo192.png',
      '/public/assets/icons/logo512.png',
      "/assets/icons/logo144.png",
      "/assets/icons/logo192.png",
      "/assets/icons/logo512.png",
      "/video/1.mp4"
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
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        // `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        `/${!!language?.value ? language?.value : i18n.defaultLocale }${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }

  if(!authToken && pathname?.toString()?.split("/")?.[2] !== "auth"){
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if(authToken && pathname?.toString()?.split("/")?.[2] == "auth"){
    return NextResponse.redirect(new URL('/', request.url))
  }

}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}