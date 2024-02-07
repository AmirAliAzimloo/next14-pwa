import getCookie from "@/actions/get-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentMethodsApi = createApi({
  reducerPath: "paymentMethodsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await getCookie("token");

      if (token?.value) {
        headers.set("Authorization", `Bearer ${token?.value}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: (company_id) =>
        `/order/payment_method?comapny_ids[0]=${company_id}`,
      transformResponse: (response: any[]) => {
        return response.map((item: any) => ({ ...item.payment_method }));
      },
    }),
  }),
});

export const { useGetPaymentMethodsQuery } = paymentMethodsApi;
