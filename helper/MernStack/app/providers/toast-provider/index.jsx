"use client"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
   return (
      <div>
         {children}
         <ToastContainer
            bodyClassName={() => "font-[vazirmedium] text-sm flex items-center"}
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
      </div>
   );
}

export default ToastProvider;