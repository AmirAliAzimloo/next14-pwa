import { handleError } from "lib/helper";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name === '', email === '', subject === '', text === '') {
            toast.error("تمام موارد فرم تماس با ما الزامی است.")
            return
        }

        try {
            setLoading(true)
            const res = await axios.post("/contact-us", {
                name,
                email,
                subject,
                text
            })
            toast.success('پیام شما ثبت شد');
        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="نام و نام خانوادگی" />
            </div>
            <div>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" placeholder="ایمیل" />
            </div>
            <div>
                <input onChange={(e) => setSubject(e.target.value)} value={subject} type="text" className="form-control" placeholder="موضوع پیام" />
            </div>
            <div>
                <textarea onChange={(e) => setText(e.target.value)} value={text} rows="10" style={{ height: '100px' }} className="form-control"
                    placeholder="متن پیام"></textarea>
            </div>
            <div className="btn_box">
                <button type="submit" disabled={loading}>
                    ارسال پیام
                    {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                </button>
            </div>
        </form>
    )
}

export default ContactForm;