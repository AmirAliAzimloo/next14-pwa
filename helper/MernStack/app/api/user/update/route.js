import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {

   try {
      connect();
      const user_id = req.headers.get("user-id");
      const inputData = await req.json();


      const newData = {
         username: undefined,
         blog_name:undefined,
         displayname:undefined,
         password:undefined,
      }


      // USERNAME VALIDATIONS
      if(inputData.username!=undefined){
         if (!/^[\w\d\s-]+$/.test(inputData.username)) {
            return NextResponse.json({ data: "برای بخش نام کاربری، فقط اعداد و عبارات انگلیسی را بدون فاصله وارد کنید... ", }, { status: 402 });
         }
         if (inputData.username.length < 8 || inputData.username.length > 20) {
            return NextResponse.json({ data: "نام کاربری باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
         }
         const usernameFound = await User.findOne({ username: inputData.username });
         if(!usernameFound || usernameFound._id == user_id){
            const newUsername = inputData.username.replace(/\s+/g, '-').toLowerCase();
            newData.username=newUsername;
         }
         else{
            return NextResponse.json({ data: "لطفا نام کاربری دیگری انتخاب کنید... ", }, { status: 402 });
         }
      }


      

      // DISPLAYNAME VALIDATIONS
      if(inputData.displayname!=undefined){
         if (inputData.displayname.length < 8 || inputData.displayname.length > 20) {
            return NextResponse.json({ data: "نام نمایشی باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
         }
         newData.displayname=inputData.displayname;
      }


      

      // DETAILS VALIDATIONS
      if(inputData.details!=undefined){
         if (inputData.details.length < 8 || inputData.details.length > 200) {
            return NextResponse.json({ data: "درباره وبلاگ باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
         }
         newData.details=inputData.details;
      }


      // BLOG NAME VALIDATIONS
      if(inputData.blog_name!=undefined){
         if (inputData.blog_name.length < 4 || inputData.blog_name.length > 40) {
            return NextResponse.json({ data: "نام وبلاگ باید بین 4 تا 40 کارکتر باشد... ", }, { status: 402 });
         }
         const blog_nameFound = await User.findOne({ blog_name: inputData.blog_name });
         if(!blog_nameFound || blog_nameFound._id == user_id){
            newData.blog_name=inputData.blog_name;
         }
         else{
            return NextResponse.json({ data: "لطفا نام وبلاگ دیگری انتخاب کنید... ", }, { status: 402 });
         }
         
      }
      


      // PASSWORD VALIDATIONS
      if(inputData.password!=undefined){
         if (inputData.password.length < 8 || inputData.password.length > 24) {
            return NextResponse.json({ data: "رمز عبور باید بین 8 تا 24 کارکتر باشد... ", }, { status: 402 });
         }
         const newPassword = inputData.password.replace(/\s+/g, '').toLowerCase();
         const hashedPassword = await bcrypt.hash(newPassword, 10);
         newData.password=hashedPassword;
      }



      await User.findByIdAndUpdate(user_id,newData,{new:true})

      return NextResponse.json({ data: "اطلاعات به روزرسانی شد." }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ data: "خطا ", }, { status: 401 });
   }

}