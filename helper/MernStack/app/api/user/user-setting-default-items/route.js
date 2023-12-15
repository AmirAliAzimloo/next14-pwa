import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";


export async function GET(req){

   try{
      connect();
      const user_id=req.headers.get("user-id");
      const userData=await User.findById(user_id).select({blog_name:1,username:1,displayname:1,details:1,image:1,default_image:1});
      return NextResponse.json({data:userData},{status:200});
   }catch(error){
      console.log(error);
      return NextResponse.json({data:"failed ",},{status:401});
   }

}