"use client"

import { toast, ToastOptions } from "react-toastify";
// import { handleError } from "lib/helper";
import { createContext, useEffect, useState } from "react";
import axios from "@/lib/axios/axios";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  login: (cellphone: string) => Promise<void>;
//   logout: () => Promise<void>;
  checkOtp: (otp: string) => Promise<void>;
//   resendOtp: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (cellphone: string): Promise<void> => {
    try {
      setLoading(true);

      const res = await axios.post(`getotp`, {
        cellphone,
      });

      toast.success(res.data.message);
    } catch (err) {
    //   toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const checkOtp = async (otp: string): Promise<void> => {
    try {
      setLoading(true);

      const res = await axios.post(`/auth/checkotp`, {
        otp,
      });

      setUser(res.data.user);
      router.push("/");
    } catch (err) {
    //   toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

//   const resendOtp = async (): Promise<void> => {
//     try {
//       const res = await axios.post(`/auth/resendotp`);

//       toast.success("کد ورود دوباره برای شما ارسال شد");
//     } catch (err) {
//     //   toast.error(handleError(err));
//     }
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       setLoading(true);

//       const res = await axios.post(`/auth/logout`);

//       setUser(null);
//       router.push("/");
//     } catch (err) {
//     //   toast.error(handleError(err));
//     } finally {
//       setLoading(false);
//     }
//   };

  const checkUserLoggedIn = async (): Promise<void> => {
    try {
      const res = await axios.post(`me`);

      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login,  checkOtp, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;