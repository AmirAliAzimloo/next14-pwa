import { toast } from "react-toastify";
import { handleError } from "lib/helper";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn()
    }, [])

    const login = async (cellphone) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`, {
                cellphone
            })

            toast.success(res.data.message);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    const checkOtp = async (otp) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`, {
                otp
            })

            setUser(res.data.user);
            router.push('/')
        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    const resendOtp = async (otp) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/resendOtp`)

            toast.success('کد ورود دوباره برای شما ارسال شد');

        } catch (err) {
            toast.error(handleError(err))
        }
    }

    const logout = async () => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/logout`)

            setUser(null);
            router.push('/')

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    const checkUserLoggedIn = async (otp) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/me`)

            setUser(res.data.user);

        } catch (err) {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, checkOtp, resendOtp, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;