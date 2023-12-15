import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(req) {

   try {
      connect();
      const inputData = await req.json();


      
      // IS USERNAME JUST ENGLISH AND NUMBER OR NOT
      if (!/^[\w\d\s-]+$/.test(inputData.username)) {
         return NextResponse.json({ data: "برای بخش نام کاربری، فقط اعداد و عبارات انگلیسی را بدون فاصله وارد کنید... ", }, { status: 402 });
      }





      // LENGTH VALIDATIONS

      if (inputData.username.length < 8 || inputData.username.length > 20) {
         return NextResponse.json({ data: "نام کاربری باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
      }
      if (inputData.displayname.length < 8 || inputData.displayname.length > 20) {
         return NextResponse.json({ data: "نام نمایشی باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
      }
      if (inputData.blog_name.length < 4 || inputData.blog_name.length > 40) {
         return NextResponse.json({ data: "نام وبلاگ باید بین 4 تا 40 کارکتر باشد... ", }, { status: 402 });
      }
      function is_numeric(str) {
         return /^\d+$/.test(str);
      }
      if (is_numeric(inputData.phone) == false) {
         return NextResponse.json({ data: "شماره همراه باید عدد باشد... ", }, { status: 402 });
      }
      if (inputData.phone.length != 10) {
         return NextResponse.json({ data: "شماره همراه باید بین 10 کارکتر باشد بدون 98+ یا صفر ابتدایی... ", }, { status: 402 });
      }
      if (inputData.password.length < 8 || inputData.password.length > 24) {
         return NextResponse.json({ data: "رمز عبور باید بین 8 تا 24 کارکتر باشد... ", }, { status: 402 });
      }


      // UNIQUE VALIDATIONS
      const phoneFound = await User.findOne({ phone: inputData.phone });
      if (phoneFound) {
         return NextResponse.json({ data: "شما قبلا در سایت ثبت نام کرده اید... ", }, { status: 402 });
      }
      const usernameFound = await User.findOne({ username: inputData.username });
      if (usernameFound) {
         return NextResponse.json({ data: "لطفا نام کاربری دیگری انتخاب کنید... ", }, { status: 402 });
      }
      const blog_nameFound = await User.findOne({ blog_name: inputData.blog_name });
      if (blog_nameFound) {
         return NextResponse.json({ data: "لطفا نام وبلاگ دیگری انتخاب کنید... ", }, { status: 402 });
      }



      // FOR USERNAME SPACES MUST CONVERT TO DASH
      // FOR PASSWORD SPACES MUST BE REMOVED
      const newUsername = inputData.username.replace(/\s+/g, '-').toLowerCase();
      const newPassword = inputData.password.replace(/\s+/g, '').toLowerCase();



      // BCRYPT PASSORD
      const hashedPassword = await bcrypt.hash(newPassword, 10);


      // MAKING ACTIVE CODE
      function generateRandomNumber(n) {
         return Math.floor(Math.pow(10, n - 1) + Math.random() * 9 * Math.pow(10, n - 1));
      }
      const active_code = generateRandomNumber(6);




      //  CREATING USER
      const date = new Date()


      const userFullData = {
         blog_name: inputData.blog_name,
         username: newUsername,
         displayname: inputData.displayname,
         password: hashedPassword,
         phone: inputData.phone,
         createdAt: date.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }),
         default_image: `https://secure.gravatar.com/avatar/${newUsername}?s=60&d=identicon`,
         role: 3,
         active_code: active_code,
         active_code_number: 5,
         user_is_active: false,
         viewed: false,
         liked_posts: [],
         bookmarked_posts: [],
         followings: [],
         notifications: [],
         token: "default",
      }
      const createdUserData = await User.create(userFullData);



      // MAKING JWT TOKEN
      const createdToken = Jwt.sign({ _id: createdUserData._id, username: createdUserData.username }, process.env.TOKEN_SECRET);
      const userToken = {
         token: createdToken
      };
      // ADDING TOKEN TO USER MODEL
      await User.findByIdAndUpdate(createdUserData._id, userToken, { new: true });
      // SETTING TOKEN IN COOKIE
      const cookieStore = cookies();
      cookieStore.set("token", createdToken, { maxAge: 60 * 60 * 24 * 60 });



      // SEND DATA TO FRONT
      const send_data = {
         user_image: userFullData.default_image,
         blog_slug: userFullData.username
      }

      return NextResponse.json({ data: send_data, message: "ثبت نام با موفقیت انجام شد..." }, { status: 200 });


   } catch (error) {
      console.log(error)
      return NextResponse.json({ data: "خطا در ثبت نام", }, { status: 401 });
   }

}