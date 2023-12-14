import { handleError } from "lib/helper";
import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.cookies.login_token) {
            res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
            return
        }

        try {
            const resApi = await axios.post('/auth/check-otp', {
                otp: req.body.otp,
                login_token: req.cookies.login_token
            });

            res.setHeader('Set-Cookie', [cookie.serialize('login_token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: new Date(0),
                path: '/'
            }), cookie.serialize('token', resApi.data.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            })])

            res.status(200).json({ user: resApi.data.data.user })

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}