import Post from "@/models/Post";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";


export async function GET(req){
   try{
      dbConnect();
      const allPosts=(await Post.find()).reverse();
      return NextResponse.json({message:"post added succ",data:allPosts},{status:201});
   }catch(err){
      console.log(err);
      return NextResponse.json({message:"error in finding posts"},{status:400});
   }
}