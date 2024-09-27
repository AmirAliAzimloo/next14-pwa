"use client";

import { useQuery } from "@tanstack/react-query";

import { GET_ALL_POSTS } from "@/api/urls/post";
import { sendRequest } from "@/api/utils/sendRequest";

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await sendRequest(GET_ALL_POSTS, "GET");
        console.log('response =>',response)
      if (!response?.isSuccess) {
        console.log(response.message);
      }

      return response.data;
    },
  });

  return query;
};

export const test = async ()=>{
    const data  =  await sendRequest(GET_ALL_POSTS, "GET");
    
    return data;
}