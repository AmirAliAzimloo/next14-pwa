"use client"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify"; 
import { useDispatch } from 'react-redux';
import { setRoleValue } from '@/store/slices/roleSlice';
import { logedToTrue } from '@/store/slices/logedSlice';
import { userIsActiveToFalse } from '@/store/slices/user_is_active';
import { userIsActiveToTrue } from '@/store/slices/user_is_active';
import { setuserImageValue } from '@/store/slices/userImageSlice';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';


const SignInComponent = () => {

   const dispatch=useDispatch();
   const router=useRouter();
   const [userBlogSlug,setuserBlogSlug]=useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch
   } = useForm({});

   useEffect(()=>{
      if(userBlogSlug!=false){
         router.push(`/blog/${userBlogSlug}`)
      }
   },[userBlogSlug]);

   const signIner = () => {

      toast.info("لطفا صبر کنید.", {
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });


      const formData = {
         phone: watch("phone"),
         password: watch("password"),
      }



      axios.post(`/api/user/sign-in`,formData)
      .then(data=>{
         toast.success("خوش آمدید.", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });

         console.log(data.data.data)

         // SETTING REDUX DEFAULT VARS
         dispatch(logedToTrue());
         dispatch(setRoleValue(data.data.data.role));
         
         if(data.data.data.user_is_active==true){
            dispatch(userIsActiveToTrue());
         }else{
            dispatch(userIsActiveToFalse());
         }

         dispatch(setuserImageValue(data.data.data.user_image));
         setuserBlogSlug(data.data.data.blog_slug);

      })
      .catch((error)=>{
         const message=error.response.data?error.response.data.data:"خطا در فرایند ورود";
         toast.error(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      })

   }


   const activeBtn = {
      phone: watch("phone")?watch("phone"):"",
      password: watch("password")?watch("password"):"",
   }



   return (
      <div className=' w-[400px]'>
         <form onSubmit={handleSubmit(signIner)} className=' flex flex-col gap-8 p-4'>
            <div>
               <input
                  autoComplete="off"
                  type="text"
                  placeholder='9 1 2 * * * * * * * * '
                  className='ltr_dir border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full '
                  {
                  ...register("phone",
                     {
                        required: true,
                        minLength: 10,
                        maxLength: 10
                     }
                  )
                  }
               />
               {
                  errors.phone && errors.phone.type == "required" &&
                  (<div className=' text-rose-600 text-sm'>
                     لطفا شماره تلفن را وارد کنید...
                  </div>)
               }
               {
                  errors.phone && errors.phone.type == "minLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید 10 کارکتر وارد کنید...
                  </div>)
               }
               {
                  errors.phone && errors.phone.type == "maxLength" &&
                  (<div>
                     <div className=' text-rose-600 text-sm'>
                        باید 10 کارکتر وارد کنید...
                     </div>
                     <div className=' text-rose-600 text-sm'>
                        لطفا از 0 و 98+ در ابتدای شماره همراه استفاده نکنید...
                     </div>
                  </div>)
               }
            </div>
            <div>
               <input
                  autoComplete="off"
                  type="password"
                  placeholder='رمز عبور'
                  className='border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full '
                  {
                  ...register("password",
                     {
                        required: true,
                        minLength: 8,
                        maxLength: 24
                     }
                  )
                  }
               />
               {
                  errors.password && errors.password.type == "required" &&
                  (<div className=' text-rose-600 text-sm'>
                     لطفا رمز عبور را وارد کنید...
                  </div>)
               }
               {
                  errors.password && errors.password.type == "minLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید بیشتر از 8 کارکتر وارد کنید...
                  </div>)
               }
               {
                  errors.password && errors.password.type == "maxLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید کمتر از 24 کارکتر وارد کنید....
                  </div>)
               }
            </div>
            <button
               disabled={
                  activeBtn.phone.length > 0 &&
                     activeBtn.password.length > 0
                     ? false
                     : true
               }
               className={
                  activeBtn.phone.length > 0 &&
                     activeBtn.password.length > 0
                     ? ' bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white flex justify-center items-center h-10 w-full rounded-md'
                     : ' bg-blue-300 transition-all duration-500 hover:bg-blue-400 text-white flex justify-center items-center h-10 w-full rounded-md'
               }
               type='submit'>ورود</button>
         </form>
      </div>
   );
}

export default SignInComponent;