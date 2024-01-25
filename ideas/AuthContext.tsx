"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import handleErrors from "@/utils/handleErrors";

export type User = Record<string, any>;

interface AuthContextProps {
  user: User | null | undefined;
  loginWithPassword: (
    mobile: string,
    password: string,
    kind: string
  ) => Promise<void>;
  checkOtp: (mobile_number: string, otp: string) => Promise<void>;
  sendOtp: (mobile_number: string) => Promise<void>;
  checkUserLoggedIn: () => Promise<void>;
  registerFunc: (formData: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const loginWithPassword = async (
    mobile: string,
    password: string,
    kind: string
  ) => {
    try {
      const { data } = await axios.post("/api/auth/loginWithPassword", {
        mobile,
        password,
        kind,
      });

      if (data.status) {
        setUser(data.user);
        toast.success("خوش آمدید");
        window.location.assign("/");
      } else if (!data.status) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOtp = async (mobile_number: string, otp: string) => {
    try {
      const { data } = await axios.post("/api/auth/checkOtp", {
        mobile_number,
        otp,
      });

      if (data.status) {
        setUser(data.user);
        toast.success("خوش آمدید");
        window.location.assign("/");
      } else if (!data.status) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async (mobile_number: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/sendSmsCodeNew`,
        { mobile_number }
      );

      if (data.status) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get("/api/auth/checkUserLoggedIn");

      if (!!data.status) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
      router.push("/auth/login");
    }
  };

  const registerFunc = async (formData: Record<string, any>) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          ...formData,
        }
      );

      if (data.status) {
        const { mobile_number } = formData;

        toast.success("لطفا کد پیامک شده را وارد کنید");
        router.push(`/auth/checkotp/${mobile_number}`);
      }
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");

      if (data.status) {
        setUser(null);
        window.location.assign("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!window?.navigator?.onLine) {
      checkUserLoggedIn();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        loginWithPassword,
        checkOtp,
        sendOtp,
        checkUserLoggedIn,
        registerFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
