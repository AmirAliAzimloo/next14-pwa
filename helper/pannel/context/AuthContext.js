import { handleError } from "@/lib/helper";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn()
    }, [])

    // Login user
    const login = async ({ email, password }) => {
        try {
            setLoading(true);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`, {
                email, password
            })

            setUser(res.data.data.user)

            router.push('/')

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    // Logout user
    const logout = async () => {
        try {
            setLoading(true);

            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/logout`)

            setUser(null)

            router.push('/auth/login')

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    // Check if user logged in
    const checkUserLoggedIn = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/me`)

            setUser(res.data.user)
          
        } catch (err) {
            setUser(null)
            router.push('/auth/login')
        }
    }

    return <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;