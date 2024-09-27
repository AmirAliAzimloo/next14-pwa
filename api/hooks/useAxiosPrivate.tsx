"use client";
import { useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";


import { removeAuthToken } from "@/services/user";
import Storage from "@/utils/storage";
import handleErrors from "../utils/handelErrors";
import axiosInstance from "@/lib/axios/instance";
import axiosInstanceClient from "@/lib/axios/client";

const useAxiosPrivate = () => {
  useEffect(() => {
    const requestIntercept = axiosInstanceClient.interceptors.request.use(
      (config) => {
        const accessToken = Storage.getItem<string>('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstanceClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry && Storage.getItem<string>('refreshToken')) {
          originalRequest._retry = true;

          try {
            const refreshToken = Storage.getItem<string>('refreshToken');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            Storage.setItem('accessToken', accessToken);
            Storage.setItem('refreshToken', newRefreshToken);
            axiosInstanceClient.defaults.headers.common['Authorization'] = `${accessToken}`;

            return axiosInstanceClient(originalRequest); // Retry original request
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            removeAuthToken();
            // toast.error("Session expired. Please sign in again.");
            return Promise.reject(refreshError);
          }
        } else if (error.response?.status === 401) {
          removeAuthToken();
          // toast.error("Please sign in again.");
        }

        handleErrors(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstanceClient.interceptors.request.eject(requestIntercept);
      axiosInstanceClient.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosInstanceClient;
};

export default useAxiosPrivate;
