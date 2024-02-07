import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const provinceApi = createApi({
  reducerPath: 'provinceApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getProvinceByCountry: builder.query({
      query: (country_id) => `setting/location/provinces?countries=${country_id}`,
    }),
  }),

})
  
export const { useGetProvinceByCountryQuery } = provinceApi;