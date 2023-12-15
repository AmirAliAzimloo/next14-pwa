import Post from "@/models/Post";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req){
   try{
      dbConnect();
      const formData= await req.json();
      await Post.create(formData);
      return NextResponse.json({message:"post added succ"},{status:201});
   }catch(err){
      console.log(err);
      return NextResponse.json({message:"error in adding post"},{status:400});
   }
}