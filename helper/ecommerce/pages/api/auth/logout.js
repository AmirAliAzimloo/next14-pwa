import { handleError } from "lib/helper";
import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.cookies.token) {
            res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
            return
        }

        try {
            const resApi = await axios.post('/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.setHeader('Set-Cookie', cookie.serialize('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: new Date(0),
                path: '/'
            }))

            res.status(200).json({ message: 'کاربر از سیستم خارج شد' })

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}