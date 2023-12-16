import type { Metadata, Viewport } from 'next'
import '../globals.css'


import { i18n } from '../../i18n-config'
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  manifest:"/manifest.json",
  title: 'Next14-PWA',
  description: 'Generated by Amir Ali Azimloo',
}

export const viewport: Viewport = {
  themeColor : "#FFFFFF"
}

export default function RootLayout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: { lang: string }
}) { 
  return (
    <html lang={params.lang} dir={params.lang == "fa" ? "rtl" : "ltr"}>
      <body className='bg-green-400' >{children}</body>
    </html>
  )
}
