import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";

const SlideBox = () => {
   return (
      <article className="sliderItem p-2  hover:pt-0 transition-all duration-300 ">
         <div className="relative bg-white h-[22rem] w-72 rounded-lg ">
            <Link
               href={"/shop"}
               className=" flex justify-center items-center pt-2"
            >
               <Image
                  width={270}
                  height={150}
                  className=" rounded-md"
                  src={"/images/products/ganj.jpg"}
                  alt="alt"
               />
            </Link>
            <div>
               <div className=" flex flex-col gap-6 p-2">
                  <Link href={"/shop"}>
                     <h3 className=" line-clamp-2">
                        عنوان محصول هستنوان محصول هستنوان محصول هستنوان محصول
                        هستنوان محصول هست اوان محصول هست اوان محصول هست این
                     </h3>
                  </Link>
                  <div className=" categories flex justify-start items-center flex-wrap gap-1">
                     <Link
                        className=" py-1 px-2 rounded bg-zinc-200 transition-all duration-300 hover:bg-zinc-300"
                        href={"/"}
                     >
                        رمان
                     </Link>
                     <Link
                        className=" py-1 px-2 rounded bg-zinc-200 transition-all duration-300 hover:bg-zinc-300"
                        href={"/"}
                     >
                        رمان
                     </Link>
                     <Link
                        className=" py-1 px-2 rounded bg-zinc-200 transition-all duration-300 hover:bg-zinc-300"
                        href={"/"}
                     >
                        رمان
                     </Link>
                     <Link
                        className=" py-1 px-2 rounded bg-zinc-200 transition-all duration-300 hover:bg-zinc-300"
                        href={"/"}
                     >
                        داستانی
                     </Link>
                     <Link
                        className=" py-1 px-2 rounded bg-zinc-200 transition-all duration-300 hover:bg-zinc-300"
                        href={"/"}
                     >
                        آل احمد
                     </Link>
                  </div>
               </div>
               <div className=" absolute bottom-2  w-full flex justify-between items-center">
                  <div className=" flex gap-2 justify-start items-center mr-1">
                     <div className=" bg-zinc-200  flex justify-center items-center w-9 h-9 rounded-lg transition-all duration-500 hover:bg-zinc-300 cursor-pointer ">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5  font-bold"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                           />
                        </svg>
                     </div>
                     <div className=" bg-zinc-200  flex justify-center items-center w-9 h-9 rounded-lg transition-all duration-500 hover:bg-zinc-300 cursor-pointer ">
                        <Link href={"/shop"}>
                           <AiOutlineSearch />
                        </Link>
                     </div>
                  </div>
                  <div className=" flex gap-2 justify-end items-center">
                     <HiOutlineShoppingCart className=" mr-1 w-9 h-9 p-2 rounded bg-zinc-200 text-indigo-600  cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-white" />
                     <div className=" bg-zinc-500 text-white h-9 px-1 flex justify-center items-center rounded-tr-md rounded-br-md">
                        5000 تومان
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </article>
   );
};

export default SlideBox;
