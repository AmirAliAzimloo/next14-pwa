import Image from "next/image";
import Link from "next/link";


const RandomPostBox = ({ data }) => {
   return (
      <div className=" flex justify-start items-center gap-2 h-[80px] w-full rounded-lg hover:bg-white transition-all duration-500 p-2">
         <Link className=" min-w-[80px] w-[80px] h-[80px] relative" href={data.link}><Image src={data.img}  fill className=" object-cover rounded-md border-2 border-blue-500" alt={data.title} /></Link>
         <div className=" flex flex-col gap-4 w-full">
            <Link href={data.link}><h3 className=" line-clamp-1  transition-all duration-500 hover:text-blue-500">{data.title}</h3></Link>
            <p className=" line-clamp-1 text-base sm:text-sm">{data.short_desc}</p>
         </div>
      </div>
   );
}

export default RandomPostBox;