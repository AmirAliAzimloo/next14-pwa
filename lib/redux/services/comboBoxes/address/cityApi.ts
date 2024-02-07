import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getCitiesByProvince: builder.query({
      query: (provice_id) => `/setting/location/cities?provinces=${provice_id}`,
    }),
  }),

})
  
export const { useGetCitiesByProvinceQuery } = cityApi;