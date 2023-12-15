import SignUpComponent from "@/components/auth-components/sign-up-form";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getData=async(token)=>{
   const data=await fetch(`${process.env.SERVER_URL}/api/user/token-to-user`,{cache:"no-store",headers:{
      token:token
   }});
   const outData=await data.json();
   if(outData.data.loged==true){
      redirect("/setting")
   }else{
      return outData
   }
}

const SignUpPage =  async() => {

   const cookieStore=cookies();
   const token=cookieStore.get("token")?cookieStore.get("token").value:undefined;
   const data=await getData(token);



   return (
      <div className=" flex justify-center items-center">
         <div className=" flex flex-col gap-8 p-4 rounded-lg bg-zinc-100 ">
            <div className=" flex justify-between items-center">
               <h1 className="title_style">ثبت نام در سایت</h1>
               <Link href={"/sign-in"} className=" bg-zinc-200 px-3 py-1 rounded-md hover:text-blue-500 transition-all duration-500">ورود</Link>
            </div>
            <SignUpComponent />
         </div>
      </div>
   );
}

export default SignUpPage;