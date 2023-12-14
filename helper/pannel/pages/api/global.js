import { handleError } from "@/lib/helper";
import axios from "axios";

export default async function handler(req, res) {
    if (!req.cookies.token) {
        res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
        return
    } else if (req.method === 'GET') {

        let page = req.query.hasOwnProperty('page') ? `?page=${req.query.page}` : '';
        // console.log(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${req.query.url}${page}`);
        try {
            const resApi = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${req.query.url}${page}`, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json(resApi.data.data)

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else if (req.method === 'POST') {

        try {
            const resApi = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${req.query.url}`, {
                ...req.body
            }, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json(resApi.data.data)

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else if (req.method === 'DELETE') {

        try {
            const resApi = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${req.query.url}`, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json(resApi.data.data)

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else if (req.method === 'PUT') {

        try {
            const resApi = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${req.query.url}`, {
                ...req.body
            }, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json(resApi.data.data)

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    }
}