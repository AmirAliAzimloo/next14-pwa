import { handleError } from "@/lib/helper";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        if (!req.cookies.token) {
            res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
            return
        }

        try {
            const resApi = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/me`, {}, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json({ user: resApi.data.data })

        } catch (err) {
            console.log(err.message);
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}