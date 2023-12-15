"use client";
import { HiOutlineArrowUp } from "react-icons/hi";
import { TfiAngleLeft } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
   const goTopCtrl = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };
   return (
      <footer className=" container mx-auto flex flex-col gap-8 py-6">
         <div className=" flex justify-between items-center p-8 bg-zinc-100 rounded-lg">
            <div className=" w-72 max-w-72 flex flex-col gap-4">
               <div className=" flex justify-center">
                  <Image
                     src={"/logo.png"}
                     className="rounded-lg"
                     width={100}
                     height={100}
                     alt="mernfa logo"
                  />
               </div>
               <p className=" text-center text-base sm:text-sm">
                  ه نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات
                  ساختگی، صفحه گرافیکی خود را صفح
               </p>
            </div>
            <div className=" flex justify-around items-start gap-16">
               <div className=" flex flex-col gap-4">
                  <div className=" text-xl">دسترسی سریع</div>
                  <ul className=" flex flex-col gap-4 text-base sm:text-sm">
                     <li>
                        <Link
                           href={"/about"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>درباره ما</span>
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/contact"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>تماس با ما</span>
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/help"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>حریم خصوصی</span>
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/blog"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>وبلاگ</span>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className=" flex flex-col gap-4">
                  <div className=" text-xl">راهنمای خرید</div>
                  <ul className=" flex flex-col gap-4 text-base sm:text-sm">
                     <li>
                        <Link
                           href={"/help"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>سوالات متداول</span>
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/help"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>چگونه خرید کنم؟</span>
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/help"}
                           className="  w-32 flex gap-1 items-center transition-all duration-300 hover:gap-2 hover:text-orange-500"
                        >
                           <TfiAngleLeft />
                           <span>قوانین سایت</span>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
            <div className=" flex justify-center items-center">
               <div className=" flex justify-center gap-4 items-center ">
                  <Image
                     src={"/images/Licenses/1.png"}
                     className="rounded-lg"
                     width={120}
                     height={120}
                     alt="mernfa logo"
                  />
                  <Image
                     src={"/images/Licenses/2.png"}
                     className="rounded-lg"
                     width={120}
                     height={120}
                     alt="mernfa logo"
                  />
               </div>
            </div>
         </div>
         <div className=" flex justify-between items-center">
            <p>
               تمامی حقوق مادی و معنوی این وب سایت متعلق به مرن فا می باشد.
               mernfa.ir
            </p>
            <HiOutlineArrowUp
               onClick={() => goTopCtrl()}
               className=" fixed left-4 bottom-4 cursor-pointer border-2 border-black w-12 h-12 p-2 rounded-md bg-yellow-500 transition-all duration-500 hover:bg-indigo-400 text-black"
            />
         </div>
      </footer>
   );
};

export default Footer;
