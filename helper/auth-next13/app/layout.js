import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from "@/components/Toastify"

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />

          {children}

          <Toastify />
        </AuthProvider>
      </body>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      />
    </html>
  )
}
