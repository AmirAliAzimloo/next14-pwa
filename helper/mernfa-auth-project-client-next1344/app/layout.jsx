import '../styles/globals.css';
import ReduxProvider from './redux-provider';
import "react-toastify/dist/ReactToastify.css"; 
import Header from '@/components/header';

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body ><ReduxProvider><Header/>{children}</ReduxProvider></body>
      </html>
   )
}
