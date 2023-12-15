import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";


export async function POST(req){

   try{
      connect();
      const inputData=await req.json();


      // LENGTH VALIDATIONS
      
      function is_numeric(str){
         return /^\d+$/.test(str);
     }
      if(is_numeric(inputData.phone)==false){
         return NextResponse.json({data:"شماره همراه باید عدد باشد... ",},{status:402});
      }
      if(inputData.phone.length!=10){
         return NextResponse.json({data:"شماره همراه باید بین 10 کارکتر باشد بدون 98+ یا صفر ابتدایی... ",},{status:402});
      }
      if(inputData.password.length<8 || inputData.password.length>24 ){
         return NextResponse.json({data:"رمز عبور باید بین 8 تا 24 کارکتر باشد... ",},{status:402});
      }



      // FOR PASSWORD SPACES MUST BE REMOVED
      const newPassword=inputData.password.replace(/\s+/g, '').toLowerCase();



      // FOUND USER WITH THIS PHONE NUMBER
      const foundPhone=await User.findOne({phone:inputData.phone});
      if(!foundPhone){return NextResponse.json({data:"لطفا ثبت نام کنید... ",},{status:402});}




      // PASSWORD WITH THIS PHONE NUMBER IS TRUE OR WROND
      const validPassword=await bcrypt.compare(newPassword,foundPhone.password);
      if(validPassword==false){return NextResponse.json({data:"رمز عبور اشتباه است... ",},{status:402});}




      // MAKING JWT TOKEN
      const createdToken=foundPhone.token;
      
      // SETTING TOKEN IN COOKIE
      const cookieStore=cookies();
      cookieStore.set("token",createdToken,{maxAge:60*60*24*60});



      // SEND DATA TO FRONT
      const send_data={
         role:foundPhone.role,
         user_is_active:foundPhone.user_is_active,
         user_image:foundPhone.image!=""
         ?foundPhone.image
         :foundPhone.default_image,
         blog_slug:foundPhone.username
      }

      return NextResponse.json({data:send_data,message:"خوش آمدید..."},{status:200});


   }catch(error){
      console.log(error)
      return NextResponse.json({data:"خطا در ثبت نام",},{status:401});
   }

}