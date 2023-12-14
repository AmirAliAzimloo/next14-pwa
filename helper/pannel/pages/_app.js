import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'
import { useEffect } from 'react'
import Layout from '@/components/layout/Layout';
import { ToastContainer } from "react-toastify";
import { AuthProvider } from '@/context/AuthContext';
import NProgress from 'nprogress';
import axios from 'axios';
import Router from 'next/router';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.js')
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
