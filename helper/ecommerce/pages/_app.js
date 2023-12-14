import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Footer from '@/components/layout/Footer';
import Router from 'next/router';
import NProgress from 'nprogress'
import { AuthProvider } from '@/context/AuthContext';
import { SWRConfig } from 'swr'
import { Provider } from 'react-redux'
import store from '@/redux/store';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.js')
  }, []);

  return (
    <AuthProvider>
      <SWRConfig value={{ fetcher: (url) => axios.get(url).then(res => res.data) }}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <ToastContainer />
        </Provider>
      </SWRConfig>
    </AuthProvider>
  )
}

export default MyApp
