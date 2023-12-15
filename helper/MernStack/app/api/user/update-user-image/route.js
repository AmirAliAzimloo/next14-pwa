import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";



export async function POST(req) {

   try {
      connect();

      const formData = await req.formData();

      const file = formData.get("file");
      if (!file) {
         return NextResponse.json({}, { status: 400 });
      }
      if (file.size < 1) {
         return NextResponse.json({ data: "لطفا فایلی را انتخاب کنید" }, { status: 400 });
      }
      if (file.size > 2000000) {
         return NextResponse.json({ data: "حجم فایل باید کمتر از 2 مگ باشد" }, { status: 400 });
      }
      if (file.type!="image/jpeg" && file.type!="image/jpg" && file.type!='image/png' ) {
         return NextResponse.json({ data: "لطفا فایل png یا jpeg آپلود کنید." }, { status: 400 });
      }
      

      const destinationDirPath = path.join(process.cwd(), "public/uploads/avatars");
      const fileArrayBuffer = await file.arrayBuffer();


      if (!existsSync(destinationDirPath)) {
         fs.mkdir(destinationDirPath, { recursive: true });
      }


      const newname = Date.now() + file.name;
      const fileUrl = "/uploads/avatars/" + newname;

      await fs.writeFile(
         path.join(destinationDirPath, newname),
         Buffer.from(fileArrayBuffer)
      );

      const newData={
         image:fileUrl
      }
      const user_id = req.headers.get("user-id");
      await User.findByIdAndUpdate(user_id, newData, { new: true })

      return NextResponse.json({ data: "تصویر به روزرسانی شد." }, { status: 200 });

     
   } catch (error) {
      console.log(error);
      return NextResponse.json({ data: "خطا ", }, { status: 401 });
   }

}