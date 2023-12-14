import { handleError } from '@/lib/helper';
import axios from 'axios';
import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.cookies.token) {
            res.status(403).json({ message: 'در ابتدا باید وارد شده باشید.' })
            return
        }

        try {
            const resApi = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {},{
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.setHeader('Set-Cookie', cookie.serialize('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                path: '/'
            }))

            res.status(200).json({ message: 'کاربر از سیستم خارج شد' })

        } catch (err) {
            console.log(err.message);
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}