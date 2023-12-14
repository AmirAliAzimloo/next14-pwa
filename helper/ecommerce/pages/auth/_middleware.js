import { NextResponse } from 'next/server'

export default async function middleware(req, res) {
    if (req.cookies.token) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
    }
    return NextResponse.next();
}