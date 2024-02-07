import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const activityFieldApi = createApi({
  reducerPath: 'activityFieldApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getActivityFields: builder.query({
      query: () => "setting/constant/customerCategory",
    }),
  }),

})
  
export const { useGetActivityFieldsQuery } = activityFieldApi; 