import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_API_URL = "https://fakestoreapi.com"

export type Product ={
    id: number,
    image: string,
    title: string
    price: number
    category: string
    description: string
}

export const productApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => "products",
    }),
    getProductById: builder.query<Product, { id: string }>({
      query: ({ id }) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
