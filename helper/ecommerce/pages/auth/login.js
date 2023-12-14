import CheckOtp from "@/components/auth/CheckOtp";
import Login from "@/components/auth/Login";
import { useState } from "react";

const LoginPage = () => {
    const [setp, setStep] = useState(1);

    return (
        <section className="auth_section book_section">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4 offset-md-4">
                        <div className="card">
                            <div className="card-body">
                                {setp === 1 && <Login setStep={setStep} />}
                                {setp === 2 && <CheckOtp />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;