import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"

const CheckOtp = () => {
    const { checkOtp, resendOtp, loading } = useContext(AuthContext);
    const [otp, setOtp] = useState('');
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState('');
    const [loadingResend, setLoadingResend] = useState(false);

    useEffect(() => {
        let time = "0:10";
        let interval = setInterval(() => {
            let countdown = time.split(':');
            let minutes = parseInt(countdown[0], 10);
            let seconds = parseInt(countdown[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            if (minutes < 0) {
                clearInterval(interval);
                setShow(true)
            };
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            time = minutes + ':' + seconds;
            setTimer(time);
        }, 1000);

        return () => {
            clearInterval(interval);
            setTimer('')
        }
    }, [loadingResend])

    const handleCheckOtp = async () => {
        if (otp === '') {
            toast.error('کد ورود الزامی است');
            return;
        }

        const pattern = /^[0-9]{6}$/;
        if (!pattern.test(otp)) {
            toast.error("فرمت کد ورود معتبر نیست")
            return;
        }

        await checkOtp(otp)
    }

    const handleResendOtp = async () => {
        setLoadingResend(true)
        await resendOtp()
        setLoadingResend(false)
        setShow(false)
    }

    return (
        <div className="form_container">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">کد ورود</label>
                <input onChange={(e) => setOtp(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <button onClick={handleCheckOtp} disabled={loading} className="btn btn-primary btn-auth">
                    ارسال
                    {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                </button>
                <div>
                    {show ? (<button onClick={handleResendOtp} disabled={loadingResend} className="btn btn-dark">
                        ارسال دوباره
                        {loadingResend && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>) : (<div className="mt-3">
                        {timer}
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default CheckOtp;