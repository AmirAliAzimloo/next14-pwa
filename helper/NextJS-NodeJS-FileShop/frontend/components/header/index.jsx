"use client";

import Image from "next/image";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { IoMailOpenOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { HiShoppingCart } from "react-icons/hi";

const Header = () => {
   const [logoHover, setlogoHover] = useState(0);

   return (
      <header className=" container mx-auto py-2 ">
         <div className=" flex justify-between items-start gap-4">
            <div className="  flex flex-col relative h-52 w-48  ">
               <Link
                  onMouseEnter={() => setlogoHover(1)}
                  onMouseLeave={() => setlogoHover(0)}
                  className=" z-30  bg-white logo p-4 rounded-lg shadow-[0px_1px_10px_rgba(0,0,0,0.25)] 
            transition-all duration-500 hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)] text-center"
                  href={"/"}
               >
                  <div className=" flex justify-center">
                     <Image
                        src={"/logo.png"}
                        className="rounded-lg"
                        width={100}
                        height={100}
                        alt="mernfa logo"
                     />
                  </div>
                  <div>فروشگاه فایل مرن فا</div>
               </Link>
               <div
                  onMouseEnter={() => setlogoHover(1)}
                  onMouseLeave={() => setlogoHover(0)}
                  className={
                     logoHover == 0
                        ? " absolute z-10 bottom-20 right-0 left-0 flex justify-around items-center p-2 text-indigo-600  bg-zinc-100  rounded-br-md rounded-bl-md transition-all duration-500 "
                        : " absolute z-20 bottom-0 right-0 left-0 flex justify-around items-center p-2 text-indigo-600  bg-zinc-100  rounded-br-md rounded-bl-md transition-all duration-500 "
                  }
               >
                  <Link
                     className=" text-[1.5rem] transition-all duration-300 hover:text-orange-500"
                     target={"_blank"}
                     href="https://mernfa.ir/nextjs-learning"
                  >
                     <BsTelegram />
                  </Link>
                  <Link
                     className=" text-[1.7rem] transition-all duration-300 hover:text-orange-500"
                     target={"_blank"}
                     href="https://mernfa.ir/nextjs-learning"
                  >
                     <AiOutlineYoutube />
                  </Link>
                  <Link
                     className=" text-[1.7rem] transition-all duration-300 hover:text-orange-500"
                     target={"_blank"}
                     href="https://mernfa.ir/nextjs-learning"
                  >
                     <AiFillTwitterCircle />
                  </Link>
               </div>
            </div>
            <div className=" w-full flex flex-col gap-4 py-4  h-40 justify-between ">
               <div className=" flex justify-between items-center w-full ">
                  <nav className=" ">
                     <ul className=" flex items-center justify-start gap-2">
                        <li>
                           <Link
                              className=" w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                              href="/"
                           >
                              خانه
                           </Link>
                        </li>
                        <li>
                           <Link
                              className=" w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                              href="/"
                           >
                              اپلیکیشن ها
                           </Link>
                        </li>
                        <li>
                           <Link
                              className=" w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                              href="/"
                           >
                              کتاب ها
                           </Link>
                        </li>
                        <li>
                           <Link
                              className=" w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                              href="/"
                           >
                              فایل های گرافیکی
                           </Link>
                        </li>
                        <li>
                           <Link
                              className=" w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                              href="/blog"
                           >
                              وبلاگ
                           </Link>
                        </li>
                        <li>
                           <Link
                              className=" w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                              href="/dashboard"
                           >
                              داشبورد
                           </Link>
                        </li>
                     </ul>
                  </nav>
                  <div className=" flex flex-col items-end gap-2 ">
                     <div className=" flex gap-2 items-center">
                        <div>09124466446</div>
                        <div className=" rotate-12 rounded bg-slate-200  p-2">
                           <BsTelephoneFill className="w-4 h-4  -rotate-12" />
                        </div>
                     </div>
                     <div className=" flex gap-2 items-center">
                        <div>mernfa@gmail.com</div>
                        <div className=" rotate-12 rounded bg-slate-200  p-2">
                           <IoMailOpenOutline className=" w-4 h-4  -rotate-12" />
                        </div>
                     </div>
                  </div>
               </div>
               <div className=" flex justify-between items-center ">
                  <div className=" relative flex justify-start items-center w-full ml-8 ">
                     <input
                        className=" outline-none w-full h-[3.2rem] p-3 rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-[0px_3px_7px_rgba(0,0,0,.25)]"
                        name="productsSearch"
                        id="productsSearch"
                        type="text"
                        placeholder=" جستجو بین محصولات..."
                     />
                     <label
                        htmlFor="productsSearch "
                        className=" absolute left-0 cursor-pointer w-10"
                     >
                        <BiSearchAlt className=" w-8 h-8" />
                     </label>
                  </div>
                  <div className=" flex gap-4 items-center w-[20rem] justify-end">
                     <div>
                        <Link href={"/account"}>
                           <IoPerson className=" bg-zinc-400 text-white rounded p-2 w-12 h-12" />
                        </Link>
                     </div>
                     <Link
                        href={"/cart"}
                        className=" flex gap-2 justify-center items-center  bg-orange-400 p-2 rounded-md"
                     >
                        <div className=" text-orange-500 bg-white rounded-full w-8 h-8 flex justify-center items-center ">
                           2
                        </div>
                        <div className=" text-white ">سبد خرید</div>
                        <div className="  text-orange-500 bg-white rounded-lg w-8 h-8 flex justify-center items-center">
                           <HiShoppingCart className=" cursor-pointer w-6 h-6" />
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
