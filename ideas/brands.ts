import getCookie from "@/actions/get-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
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
    getBrandsForFilter: builder.query({
      query: () => "/product/brand",
      transformResponse: (response:any[]) => {
        if (response.length === 0) return [];

        return response.map(item=>({
            id:item.id,
            name:item.name_fa,
            isChecked:false
        }))

       
      },
    //   async onQueryStarted(uniqueIdentifier, { dispatch, queryFulfilled }) {
    //     const { data }= await queryFulfilled;
    //     // Update state with new data from response
    //     const patchResult = dispatch(
    //       brandsApi.util.updateQueryData(
    //         'getBrandsForFilter',
    //         uniqueIdentifier,
    //         () => {
    //           return data;
    //         }
    //       )
    //     );
    //   },
    }),
  }),
});

export const { useGetBrandsForFilterQuery } = brandsApi;
