import Link from "next/link";

const Header = () => {
   return (
      <div className=" bg-indigo-100  p-8  gap-8 flex justify-start items-center">
         <Link href={"/"} className=" bg-blue-500 text-white p-3 rounded-md">home page</Link>
         <Link href={"/show-text"} className=" bg-blue-500 text-white p-3 rounded-md">show text</Link>
      </div>
   );
}

export default Header;