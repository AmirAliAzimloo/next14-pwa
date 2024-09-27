import { AxiosResponse, AxiosError } from "axios";

import axiosInstance from "@/lib/axios/instance";
import { defaultErrorMessage, TApiResponse, TMethods } from "../types/utils.type";



export async function sendRequest<T = any>(
  url: string,
  method: TMethods,
  requestData?: any,
  signal?: AbortSignal
): Promise<TApiResponse<T>> {
  return axiosInstance
    .request({
      method: method,
      url: url,
      data: requestData,
      ...(signal ? { signal } : {}),
    })
    .then((response) => {
      return {
        isSuccess: true,
        data: response.data as T,
        status: response.status,
      }
    })
    .catch((error) => {
      const response = error?.response?.data || {};
      //? Check if the error response status is null and return early to prevent further execution.
      //? This specifically helps avoid axios errors when the request is aborted (e.g., via AbortController).
      const status = error?.response?.status;
      if(status == null){
        return;
      };
      return {
        isSuccess: false,
        ...response,
        message: response?.message || defaultErrorMessage,
      }
    })
}
