import handleErrors from "@/api/utils/handelErrors";
import { removeAuthToken } from "@/services/user";
import Storage from "@/utils/storage";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(function(config) {
  const accessToken = Storage.getItem<string>('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `${accessToken}`;
  }
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

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
        axiosInstance.defaults.headers.common['Authorization'] = `${accessToken}`;
        
        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        removeAuthToken();
        return Promise.reject(refreshError);
      }
    }
    else if(error.response?.status === 401){
      removeAuthToken();
    }
    // handleErrors(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;