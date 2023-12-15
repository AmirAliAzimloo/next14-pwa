import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(req) {
   const path = req.nextUrl.pathname;
   if (
      path == "/api/user/user-setting-default-items" ||
      path == "/api/user/update" || 
      path == "/api/user/update-user-image" 

   ) {
      try {
         const token = req.headers.get("token");
         const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));

         const response = NextResponse.next()
         response.headers.append('user-id', payload._id);
         return response;

      }
      catch (error) {
         console.log(error);
         return NextResponse.json({ message: "عدم دسترسی" }, { status: 402 });
      }

   }
}