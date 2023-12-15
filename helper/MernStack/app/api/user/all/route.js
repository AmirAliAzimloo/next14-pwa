import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";


export async function GET(req){

   try{
      connect();
      const users=(await User.find()).reverse();
      return NextResponse.json({data:users,},{status:200});
   }catch(error){
      console.log(error);
      return NextResponse.json({data:"failed ",},{status:401});
   }

}