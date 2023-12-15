import Image from "next/image";
import Link from "next/link";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";



const NewBlogBox = ({ data }) => {
   return (
      <article className="  w-full h-[16.5rem] flex items-center p-3  bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.25)]  rounded-lg transition-all duration-500 hover:shadow-[0px_10px_5px_rgba(0,0,0,0.35)]">
         <div className="   flex justify-start items-start gap-4">
            <div className=" flex justify-center items-center">
               <Link href={data.slug} className=" relative w-[20rem]  rounded-lg  h-[15rem]">
                  <Image src={data.image} alt={data.title} fill className="object-cover rounded-md" />
               </Link>
            </div>
            <div className=" h-[15rem] flex flex-col gap-2 justify-between   p-[.5rem]">
               <div className="flex flex-col gap-12">
                  <Link href={data.slug}><h3 className=" line-clamp-2  h-12  transition-all duration-500 hover:text-blue-500">{data.title}</h3></Link>
                  <p className=" text-zinc-600 line-clamp-3 text-base sm:text-sm h-16">{data.short_desc}</p>
               </div>
               <div className=" flex justify-between items-center gap-1 mt-2  text-base sm:text-sm">
                  <div className=" text-xs sm:text-base flex justify-start items-center gap-3">
                     <div className=" flex justify-center items-center gap-1"><GoComment className=" w-5  h-5 text-blue-600" /><span>{data.comments_number}</span> </div>
                     <div className=" flex justify-center items-center gap-1"><BiLike className=" w-5  h-5 text-blue-600" /><span>{data.view_number}</span> </div>
                  </div>
                  <div className=" flex justify-end items-center gap-4">
                     <div className=" text-white bg-blue-500 px-3 py-1 rounded">{data.date}</div>
                     <Link href={data.slug} className=" text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 px-3 py-1 rounded">ادامه مطلب</Link>
                  </div>
               </div>
            </div>

         </div>
      </article>
   );
}

export default NewBlogBox;