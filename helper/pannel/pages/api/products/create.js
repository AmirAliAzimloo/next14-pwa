import formidable from 'formidable';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';
import { handleError } from '@/lib/helper';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    if (!req.cookies.token) {
        res.status(403).json({ message: 'ورود نا موفق یکبار دیگر تلاش کنید' })
        return
    }

    if (req.method === 'POST') {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            // console.log(fields, files);

            var formData = new FormData();

            for (let i = 0; i < files.images.length; i++) {
                formData.append("images[]", fs.createReadStream(files.images[i].filepath))
            }
            formData.append("primary_image", fs.createReadStream(files.primary_image.filepath));
            formData.append("name", fields.name);
            formData.append("category_id", fields.category_id);
            formData.append("status", fields.status);
            formData.append("price", fields.price);
            formData.append("quantity", fields.quantity);
            formData.append("primary_image_blurDataURL", fields.primary_image_blurDataURL);
            formData.append("sale_price", fields.sale_price);
            formData.append("date_on_sale_from", fields.date_on_sale_from);
            formData.append("date_on_sale_to", fields.date_on_sale_to);
            formData.append("description", fields.description);

            try {
                const resApi = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`, formData, {
                    headers: {
                        'Authorization': `Bearer ${req.cookies.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                res.status(200).json(resApi.data.data)

            } catch (err) {
                res.status(422).json({ message: { 'err': [handleError(err)] } })
            }

            if (err) {
                res.status(422).json({ err: String(err) })
            }
        });

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}