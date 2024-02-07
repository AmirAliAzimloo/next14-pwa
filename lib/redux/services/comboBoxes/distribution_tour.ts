import getCookie from "@/actions/get-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const distributionTourApi = createApi({
  reducerPath: "distributionTourApi",
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
    getDistributionTours: builder.query({
      query: (company_id) =>
        `/order/distribution_tour?comapny_id=${company_id}`,
    }),
  }),
});

export const { useGetDistributionToursQuery } = distributionTourApi;
