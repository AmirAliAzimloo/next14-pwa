import RegisterComp from "@/components/registerComp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getData = async (authToken) => {
   const data = await fetch("https://auth-mernfa-course-server.iran.liara.run/api/cookie-to-user", { cache: "no-store", headers: { auth_token: authToken } });

   const outData = await data.json();
   if (outData.data.loged == 1) {
      redirect("/account");
   }
   return outData;
}



const RegisterPage = async () => {
   const cookieStore = cookies();
   const authToken = cookieStore.get("auth_token") ? cookieStore.get("auth_token").value : "";
   const data = await getData(authToken);
   return (
      <div className=" flex justify-center items-center ">
         <RegisterComp />
      </div>
   );
}

export default RegisterPage;