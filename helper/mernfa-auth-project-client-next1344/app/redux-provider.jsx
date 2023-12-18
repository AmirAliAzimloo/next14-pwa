"use client"

import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastContainer } from "react-toastify";

const ReduxProvider = ({ children }) => {
   return (
      <Provider store={store}>
         {children}
         <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Provider>
   );
}

export default ReduxProvider;