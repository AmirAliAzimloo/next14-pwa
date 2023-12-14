import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://moviesapi.ir/api/v1/' }),
  endpoints: (builder) => ({
    getFilmApi: builder.query({
      query: (name) => `movies/${name}`,
    }),
  }),

})

export const { useGetFilmApiQuery } = filmApi