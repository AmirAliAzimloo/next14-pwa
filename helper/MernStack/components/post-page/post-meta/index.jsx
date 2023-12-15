import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

const PostMeta = ({ data }) => {
   return (
      <div className=" flex flex-col gap-4  w-[240px] min-w-[240px]">
         <div className=" flex  justify-between items-center gap-4 text-base sm:text-sm ">
            <div className=" flex justify-center items-center">
               <span>مطالعه :</span>
               <span>{data.study_time} دقیقه</span>
            </div>
            <div className=" flex justify-center items-center">
               {data.created_at}
            </div>
         </div>
         <div className=" flex justify-between items-center gap-2">
            <Link href={`https://telegram.me/${data.blog_link}/${data.slug}`}><FaTelegramPlane className=" w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" /></Link>
            <Link href={`https://telegram.me/${data.blog_link}/${data.slug}`}><BsTwitter className=" w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" /></Link>
            <Link href={`https://telegram.me/${data.blog_link}/${data.slug}`}><BsLink45Deg className=" w-7 h-7 text-zinc-600 transition-all duration-300 hover:text-blue-500" /></Link>
            <BiLike className=" cursor-pointer w-6 h-6 text-zinc-600 transition-all duration-300 hover:text-blue-500" />
            <BsFillBookmarkFill className=" cursor-pointer w-[22px] h-[22px] text-zinc-600 transition-all duration-300 hover:text-blue-500" />
         </div>
      </div>
   );
}

export default PostMeta;