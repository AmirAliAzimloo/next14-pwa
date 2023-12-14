import { handleError } from "lib/helper";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.cookies.token) {
            res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
            return
        }

        try {
            const resApi = await axios.post('/profile/addresses/create', {
                title: req.body.data.title,
                cellphone: req.body.data.cellphone,
                postal_code: req.body.data.postal_code,
                province_id: req.body.data.province_id,
                city_id: req.body.data.city_id,
                address: req.body.data.address
            }, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json(resApi.data.data)

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}