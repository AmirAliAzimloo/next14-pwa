import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading } = useContext(AuthContext);

    const handleLogin = async () => {
        if (email == '' || password == '') {
            toast.error("تمامی فیلد ها الزامی هستند")
            return;
        }

        await login({ email, password })
    }

    return (
        <div className="row mt-5 justify-content-center align-items-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body py-5">
                        <h4 className="mb-5 text-center">ورود به پنل ادمین</h4>
                        <div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">ایمیل</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">رمز عبور</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" />
                            </div>
                            <button onClick={handleLogin} type="submit" className="btn btn-dark">
                                ورود
                                {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;