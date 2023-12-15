//* https://mernfa-server-sj.iran.liara.run/api/posts-pointer
//? .startsWith
//? .includes
"use client"
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchBox = () => {

   const router=useRouter()
   const [query, setquery] = useState("");
   const [searched, setsearched] = useState([]);

   const serachHandler = (query) => {
      axios
         .get("https://mernfa-server-sj.iran.liara.run/api/posts-pointer")
         .then((data) => {
            const a = data.data
               .filter((po) => po.title.includes(query))
               .slice(0, 5);
            setsearched(a);
         })
         .catch((err) => console.log(err));
   };

   const searchBtn=()=>{
      router.push("/search");
   }

   return (
      <div className=" h-[40vh] bg-green-500 flex justify-center items-center w-full">
         <div
            className={
               query == ""
                  ? " w-[40rem] bg-white  relative  rounded-lg"
                  : " w-[40rem] bg-white  relative  rounded-tr-lg rounded-tl-lg"
            }
         >
            <input
               onChange={(e) => {
                  setsearched(-1);
                  setquery(e.target.value);
                  serachHandler(e.target.value);
               }}
               placeholder="لطفا جستجو کنید..."
               type="text"
               className=" w-full pl-12 rounded-lg p-4 shadow-black transition-all duration-300 focus:shadow-2xl outline-none"
            />
            <div className=" shadow-lg shadow-zinc-300 bg-white rounded-br-lg rounded-bl-lg absolute top-12 right-0 left-0">
               <ul className=" flex flex-col gap-2">
                  {query == "" ? (
                     <li></li>
                  ) :(searched==-1)
                  ?<li className=" m-4">لطفا صبر کنید ...</li> 
                  :(searched.length==0)
                  ?<li className=" m-4">نتیجه‌ای یافت نشد.</li>
                  :(
                     searched.map((po, i) => (
                        <li
                           key={i}
                           className=" px-2 py-3 rounded-md duration-200 transition-all
                                 hover:bg-zinc-200 m-2 w-[95%] "
                        >
                           <Link
                           target={"_blank"} className=" w-full"
                              href={`https://mernfa.ir/blog/posts/${po.slug}`}
                           >
                                 {po.title}
                           </Link>
                        </li>
                     ))
                  )}
               </ul>
            </div>
            <div className=" text-2xl text-green-700 absolute left-2 top-4 cursor-pointer">
               <BsSearch onClick={()=>searchBtn()} />
            </div>
         </div>
      </div>
   );
};

export default SearchBox;
