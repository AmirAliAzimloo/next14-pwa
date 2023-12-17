import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(req:NextRequest){

    if (!cookies().get('token') ) {
        return new NextResponse('Unauthorized', { status: 403 });
    };

    
        // if (!req.cookies.token) {
        //     res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
        //     return
        // }

        try {
            // const resApi = await axios.post('/auth/me', {}, {
            //     headers: {
            //         'Authorization': `Bearer ${req.cookies.token}`
            //     }
            // });

            return NextResponse.json({
                user:{
                    name:"amir",
                    mobile:"0912"
                }
            })

        } catch (err) {
            return new NextResponse('Internal Error', { status: 500 });
        }

}