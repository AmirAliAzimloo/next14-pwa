import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountVerifyForms from "@/components/accountVerifyForms";

const getData=async(authToken)=>{
   const data=await fetch("https://auth-mernfa-course-server.iran.liara.run/api/cookie-to-user",{cache:"no-store",headers:{auth_token:authToken}});
  
   const outData=await data.json();
   if(outData.data.loged==-1){
      redirect("/login");
   }
   return outData;
}

const getUserData=async(authToken)=>{
   const data=await fetch("https://auth-mernfa-course-server.iran.liara.run/api/get-one-user",{cache:"no-store",headers:{auth_token:authToken}});
   return data.json();
}



const Account = async () => {

   const cookieStore=cookies();
   const authToken=cookieStore.get("auth_token")?cookieStore.get("auth_token").value:"";
   const data=await getData(authToken);
   const userFullData=await getUserData(authToken);
   console.log(userFullData)
   

   return (
      <div className=" flex justify-center items-center flex-col p-8 gap-20 text-lg">
         <div>MY ACCOUNT</div>
         <div className=" flex justify-between items-center gap-4 text-sm flex-wrap">
            <div className=" bg-zinc-100 rounded p-2">User ID: {userFullData.data._id}</div>
            <div className=" bg-zinc-100 rounded p-2">Username: {userFullData.data.username}</div>
            <div className=" bg-zinc-100 rounded p-2">Displayname: {userFullData.data.displayname}</div>
            <div className=" bg-zinc-100 rounded p-2">Email: {userFullData.data.email}</div>
            <div className=" bg-zinc-100 rounded p-2">Phone: {userFullData.data.phone}</div>
            <div className=" bg-zinc-100 rounded p-2">JoinedAt: {userFullData.data.joinedAt}</div>
         </div>
         <AccountVerifyForms/>
      </div>
   );
}

export default Account;