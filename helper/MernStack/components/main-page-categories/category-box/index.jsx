import Link from "next/link";

const CategoryBox = ({data}) => {
   return (
      <Link href={data.link} className=" text-base sm:text-sm hover:text-white p-[9px] rounded-full min-w-[150px] flex justify-center items-center border-2 border-blue-500 transition-all duration-500 hover:bg-blue-500">
         {data.title}
      </Link>
   );
}

export default CategoryBox;