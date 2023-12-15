import './globals.css';
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import Header from '@/components/header';

export default function RootLayout({ children, params }) {
  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html  lang={locale} className={
      locale=="en"?"ltr":"rtl"
    }>
      <body>
        <Header/>
        {children}</body>
    </html>
  )
}
