import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(req) {

    const { email, password } = await req.json();

    const resApi = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await resApi.json();

    if (resApi.ok) {
        cookies().set({
            name: 'token',
            value: data.token,
            httpOnly: true,
            path: '/',
        });

        return NextResponse.json({ user: data.user }, { status: 200 });
    } else {
        return NextResponse.json({ message: data }, { status: resApi.status });
    }

}