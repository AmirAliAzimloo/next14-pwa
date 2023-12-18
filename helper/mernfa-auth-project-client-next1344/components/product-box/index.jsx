"use client"
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";


const ProductBox = () => {
   const [authToken,setauthToken]=useState(Cookies.get("auth_token"));

   const logedValue=useSelector(store=>store.loged.value);
   const emailConfirmedValue=useSelector(store=>store.emailConfirmed.value);
   const phoneConfirmedValue=useSelector(store=>store.phoneConfirmed.value);
   
   

   const submiter=()=>{
      const theUrl="https://auth-mernfa-course-server.iran.liara.run/api/add-to-cart";
      const formData={
         produt_id:"1234"
      }
      if(logedValue==-1){
         toast.error("please login", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }else{
         if(emailConfirmedValue==-1){
            toast.error("please confirm your email", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }else{
            if(phoneConfirmedValue==-1){
               toast.error("please confirm your phone", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               });
            }else{
               axios.post(theUrl,formData,{headers:{auth_token:authToken}})
               .then(data=>{
                  const msg=data.data?.msg?data.data.msg:"product added"
                  toast.success(msg, {
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                  });
               })
               .catch(err=>{
                  console.log(err);
                  const errorMsg=err.response?.data?.msg?err.response.data.msg:"خطا";
                  toast.error(errorMsg, {
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                  });
               });
            }
         }
      }
      
   }
   

   return (
      <div className=" flex flex-col gap-6 rounded shadow-md p-2 shadow-slate-400">
         <div className=" flex justify-center">
            <Image className=" rounded-md" src={"/book.jpg"} width={200} height={100} alt="aiojsdofj"/>
         </div>
         <h3>this is product box</h3>
         <button  onClick={submiter} className=" rounded bg-blue-500 transition-all duration-500 hover:bg-blue-600">add to cart</button>
      </div>
   );
}

export default ProductBox;