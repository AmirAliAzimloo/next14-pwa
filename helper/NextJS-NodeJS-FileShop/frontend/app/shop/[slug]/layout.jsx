import { IoSendOutline } from "react-icons/io5";
import Link from "next/link";

const BlogLayout = ({ children }) => {
   return (
      <div className=" flex justify-between items-start container mx-auto gap-4">
         <main className="w-[75%]">{children}</main>
         <aside className=" w-80 max-w-80 rounded-md flex flex-col gap-8">
            <div className=" flex flex-col gap-8">
               <button className=" flex justify-center items-center text-center rounded-md p-2 w-full bg-orange-500 transition-all duration-300 hover:bg-orange-600 text-white">30,000 تومان - افزودن به سبد خرید</button>
               <button className=" flex justify-center items-center text-center rounded-md p-2 w-full bg-blue-500 transition-all duration-300 hover:bg-blue-600 text-white">افزودن به علاقه مندی ها</button>
            </div>
            <div className=" rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
               <ul className=" flex flex-col gap-4">
                  <li className=" flex justify-between items-center">
                     <span>تعداد خرید</span>
                     <span>12</span>
                  </li>
                  <li className=" flex justify-between items-center">
                     <span>تعداد بازدید</span>
                     <span>82</span>
                  </li>
                  <li className=" flex justify-between items-center">
                     <span>تعداد دیدگاه</span>
                     <span>3</span>
                  </li>
               </ul>
            </div>
            <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
               <h3 className=" text-blue-500">معرفی کوتاه</h3>
               <p className="  text-sm  text-justify  leading-8">
                  ر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن
                  می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را
                  صفحه‌آرایی می‌کنند
               </p>
            </div>
            <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
               <h3 className=" text-blue-500">دسته بندی ها</h3>
               <div className=" flex justify-start items-center gap-2 flex-wrap">
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     دسته 1
                  </Link>
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     دسته 1
                  </Link>
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     دسته 1
                  </Link>
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     دسته 1
                  </Link>
               </div>
            </div>
            <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
               <h3 className=" text-blue-500">برچسب ها</h3>
               <div className=" flex justify-start items-center gap-2 flex-wrap">
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     مقاله
                  </Link>
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     مقاله
                  </Link>
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     مقاله
                  </Link>
                  <Link
                     className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                     href={"/"}
                  >
                     مقاله
                  </Link>
               </div>
            </div>
            <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
               <h3 className=" text-blue-500">شرکت در خبرنامه</h3>
               <form className="  border-zinc-700 border-2 px-2 rounded-md flex justify-between items-center">
                  <input
                     type="text"
                     className=" bg-transparent p-2 outline-none text-sm"
                     placeholder="ایمیل خود را وارد کنید..."
                  />
                  <IoSendOutline className=" rotate-180 w-6 h-6" />
               </form>
            </div>
         </aside>
      </div>
   );
};

export default BlogLayout;
