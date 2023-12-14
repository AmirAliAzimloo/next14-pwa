import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify"

const Login = ({ setStep }) => {
    const { login, loading } = useContext(AuthContext);
    const [cellphone, setCellphone] = useState('')

    const handleLogin = async () => {
        if (cellphone === '') {
            toast.error('شماره موبایل الزامی است');
            return;
        }

        const pattern = /^(\+98|0)?9\d{9}$/;
        if (!pattern.test(cellphone)) {
            toast.error("فرمت شماره موبایل معتبر نیست")
            return;
        }

        await login(cellphone)

        setStep(2)
    }

    return (
        <div className="form_container">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">شماره موبایل</label>
                <input onChange={(e) => setCellphone(e.target.value)} type="email" className="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            <button onClick={handleLogin} disabled={loading} className="btn btn-primary btn-auth">
                ورود
                {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
            </button>
        </div>
    )
}

export default Login;