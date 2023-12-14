import { NextResponse } from 'next/server'

export default async function middleware(req, res) {

    const token = req.cookies.get('token');

    if (!token && !req.nextUrl.pathname == '/auth/login') {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`);
    }

    if (token && req.nextUrl.pathname == '/auth/login') {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
    }

    return NextResponse.next();
}