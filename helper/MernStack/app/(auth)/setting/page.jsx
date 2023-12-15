import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import UpdateUserData from "@/components/setting-page-comps/update-user-data";

const getData=async(token)=>{
   const data=await fetch(`${process.env.SERVER_URL}/api/user/token-to-user`,{cache:"no-store",headers:{
      token:token
   }});
   
   const outData=await data.json();
   if(outData.data.loged==false){
      redirect("/sign-in")
   }else{
      return outData
   }
}


const Setting = async () => {

   const cookieStore=cookies();
   const token=cookieStore.get("token")?cookieStore.get("token").value:undefined;
   await getData(token);


   return (
      <div>
         <div>setting</div>
         <UpdateUserData token={token}/>
      </div>
   );
}

export default Setting;