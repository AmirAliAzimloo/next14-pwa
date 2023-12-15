import '../styles/globals.css';
import Header from '@/components/header';

export const metadata = {
   title: 'mernfa default next 13 project',
   description: 'mernfa default next 13 project',
}

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className=' container mx-auto my-8 flex flex-col gap-6'><Header/>{children}</body>
      </html>
   )
}
