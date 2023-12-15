"use client"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify"; 
import { useDispatch } from 'react-redux';
import { setRoleValue } from '@/store/slices/roleSlice';
import { logedToTrue } from '@/store/slices/logedSlice';
import { setuserImageValue } from '@/store/slices/userImageSlice';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';


const SignUpComponent = () => {
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

   const signUper = () => {
      toast.info("لطفا صبر کنید.", {
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });

      const formData = {
         username: watch("username"),
         displayname: watch("displayname"),
         blog_name: watch("blog_name"),
         phone: watch("phone"),
         password: watch("password"),
      }

      axios.post(`/api/user/sign-up`,formData)
      .then(data=>{
         toast.success("ثبت نام با موفقیت انجام شد.", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });

         // SETTING REDUX DEFAULT VARS
         dispatch(logedToTrue());
         dispatch(setRoleValue(3));
         dispatch(setuserImageValue(data.data.data.user_image));
         setuserBlogSlug(data.data.data.blog_slug);

      })
      .catch((error)=>{
         const message=error.response.data?error.response.data.data:"خطا در فرایند ثبت نام";
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
      username: watch("username")?watch("username"):"",
      displayname: watch("displayname")?watch("displayname"):"",
      blog_name: watch("blog_name")?watch("blog_name"):"",
      phone: watch("phone")?watch("phone"):"",
      password: watch("password")?watch("password"):"",
   }

   return (
      <div className=' w-[400px]'>
         <form onSubmit={handleSubmit(signUper)} className=' flex flex-col gap-8 p-4'>
            <div>
               <input
                  autoComplete="off"
                  type="text"
                  placeholder='نام کاربری( url وبلاگ شما)'
                  className=' border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full '
                  {
                  ...register("username",
                     {
                        required: true,
                        minLength: 8,
                        maxLength: 20
                     }
                  )
                  }
               />
               {
                  errors.username && errors.username.type == "required" &&
                  (<div className=' text-rose-600 text-sm'>
                     لطفا نام کاربری را وارد کنید...
                  </div>)
               }
               {
                  errors.username && errors.username.type == "minLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید بیشتر از 8 کارکتر وارد کنید...
                  </div>)
               }
               {
                  errors.username && errors.username.type == "maxLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید کمتر از 20 کارکتر وارد کنید....
                  </div>)
               }
            </div>
            <div>
               <input
                  autoComplete="off"
                  type="text"
                  placeholder='نام نمایشی'
                  className=' border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full '
                  {
                  ...register("displayname",
                     {
                        required: true,
                        minLength: 8,
                        maxLength: 20
                     }
                  )
                  }
               />
               {
                  errors.displayname && errors.displayname.type == "required" &&
                  (<div className=' text-rose-600 text-sm'>
                     لطفا نام نمایشی را وارد کنید...
                  </div>)
               }
               {
                  errors.displayname && errors.displayname.type == "minLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید بیشتر از 8 کارکتر وارد کنید...
                  </div>)
               }
               {
                  errors.displayname && errors.displayname.type == "maxLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید کمتر از 20 کارکتر وارد کنید....
                  </div>)
               }
            </div>
            <div>
               <input
                  autoComplete="off"
                  type="text"
                  placeholder='نام وبلاگ'
                  className=' border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full '
                  {
                  ...register("blog_name",
                     {
                        required: true,
                        minLength: 4,
                        maxLength: 40
                     }
                  )
                  }
               />
               {
                  errors.blog_name && errors.blog_name.type == "required" &&
                  (<div className=' text-rose-600 text-sm'>
                     لطفا نام وبلاگ را وارد کنید...
                  </div>)
               }
               {
                  errors.blog_name && errors.blog_name.type == "minLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید بیشتر از 4 کارکتر وارد کنید...
                  </div>)
               }
               {
                  errors.blog_name && errors.blog_name.type == "maxLength" &&
                  (<div className=' text-rose-600 text-sm'>
                     باید کمتر از 40 کارکتر وارد کنید....
                  </div>)
               }
            </div>
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
               activeBtn.username.length>0 && 
               activeBtn.displayname.length>0 && 
               activeBtn.blog_name.length>0 && 
               activeBtn.phone.length>0 && 
               activeBtn.password.length>0 
               ?false
               :true
            }
             className={
               activeBtn.username.length>0 && 
               activeBtn.displayname.length>0 && 
               activeBtn.blog_name.length>0 && 
               activeBtn.phone.length>0 && 
               activeBtn.password.length>0 
               ?' bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white flex justify-center items-center h-10 w-full rounded-md'
               :' bg-blue-300 transition-all duration-500 hover:bg-blue-400 text-white flex justify-center items-center h-10 w-full rounded-md'


               
             } type='submit'>ثبت نام</button>
         </form>
      </div>
   );
}

export default SignUpComponent;