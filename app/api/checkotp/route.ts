

import { cookies } from "next/headers";
import { NextResponse , NextRequest } from "next/server";

export async function POST(
    request: NextRequest,
) {
  try {

    
    if (!cookies().get('login_token') && !cookies().get('token') ) {
        return new NextResponse('Unauthorized', { status: 403 });
    };

  

    cookies().delete('login_token');


    cookies().set({
        name: 'token',
        value: 'OrginalToken',
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1week
        path: '/',
      })

    return NextResponse.json({
        user:{
            name:"amir",
            mobile:"0912"
        }
    })

  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}