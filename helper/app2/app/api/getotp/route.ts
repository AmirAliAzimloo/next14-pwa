

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  try {

    cookies().set({
        name: 'login_token',
        value: 'loginToken1234',
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1week
        path: '/',
      })

    return NextResponse.json({ message: 'کد ورود برای شما ارسال شد' })

  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}