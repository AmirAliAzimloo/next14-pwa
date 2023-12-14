'use client'

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoding] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Check if user logged in
        const checkUserLoggedIn = async () => {
            const res = await fetch('/api/auth/me');
            const data = await res.json();

            if (res.ok) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        }

        checkUserLoggedIn();
    }, []);

    const handleError = (message) => {
        const errors = [];
        Object.keys(message).map((key) => {
            message[key].map((e) => {
                errors.push(e)
            })
        })
        return errors.join();
    }

    // Register user
    const register = async (user) => {
        setLoding(true);
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                c_password: user.confirmPassword
            })
        });
        const data = await res.json();

        if (res.ok) {
            setLoding(false);
            router.push('/');
        } else {
            setError(handleError(data.message))
            setError(null)
            setLoding(false);
        }
    }

    // Login user
    const login = async (user) => {
        setLoding(true);
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });
        const data = await res.json();

        if (res.ok) {
            setUser(data.user)
            setLoding(false);
            router.push('/');
        } else {
            setError(handleError(data.message));
            setLoding(false);
        }
    }

    // Logout user
    const logout = async () => {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        });
        const data = await res.json();

        if (res.ok) {
            setUser(null);
            router.push('/');
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;