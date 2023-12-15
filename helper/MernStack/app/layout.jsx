import '../styles/globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
   title: 'mernfa default next 13 project',
   description: 'mernfa default next 13 project',
}

// PROVIDERS
import SplashScreenProvider from './providers/splash-screen-provider';
import ReduxToolkitProvider from './providers/redux_toolkit-provider';
import ToastProvider from './providers/toast-provider';


export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <ReduxToolkitProvider>
               <SplashScreenProvider>
                  <ToastProvider>
                     <div className=' flex flex-col gap-12'>
                        <Header />
                        <div className=' container mx-auto flex flex-col gap-12'>
                           {children}
                           <Footer />
                        </div>
                     </div>
                  </ToastProvider>
               </SplashScreenProvider>
            </ReduxToolkitProvider>
         </body>
      </html>
   )
}
