import Link from "next/link";
import Image from "next/image";

const AdsBox = ({goal_link,goal_alt,goal_img_link}) => {
   return (
      <Link href={goal_link} className=" w-full flex justify-center items-center">
            <Image  width={185} height={185} className=" border-4 border-blue-500 transition-all duration-500 hover:border-orange-400  object-cover rounded-md" alt={goal_alt} src={goal_img_link} />
         </Link>
   );
}

export default AdsBox;