"use client";

import useConvertRouter from "@/hooks/useConvertRouter";
import { setFilter } from "@/libs/redux/features/reducers/filters";
import { useGetBrandsForFilterQuery } from "@/libs/redux/features/services/brands";
import { useGetCategoriesForFilterQuery } from "@/libs/redux/features/services/categories";
import { useAppDispatch } from "@/libs/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchInputProps<T> {
  locales: T;
  company_id:string;
}

const SearchInput: React.FC<SearchInputProps<{ [key: string]: string }>> = ({
  locales,
  company_id
}) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [search, setSearch] = useState(!!searchQuery?.trim() ? searchQuery : "" );
  const { handleReplaceRoute , handleConvertRoute } = useConvertRouter();
  // const { refetch: refetchBrands } = useGetBrandsForFilterQuery(null);
  // const { refetch: refetchCategories } = useGetCategoriesForFilterQuery(null);

  // const sortQuery = searchParams.get("sort");
  // const brandQuery = searchParams.get("brand_ids");
  // const categoryQuery = searchParams.get("category_ids");

  // useEffect(() => {
  //   if (!brandQuery) {
  //     refetchBrands();
  //   }
  //   if (!categoryQuery) {
  //     refetchCategories();
  //   }
  //   if (!!searchQuery) {
  //     setSearch(searchQuery);
  //   }
  // }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!!search.trim()){

      dispatch(
        setFilter({
          company_id,
          search_name:`&search_name=${search.trim()}`,
          page:1
        })
      )

      var timer = setTimeout(() => {
        handleConvertRoute(`/companies/${company_id}/home?q=${search.trim()}`)
       

      }, 2000);
    }
  

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <div
        className=" 
      relative 
      mx-4 
      pt-6 
      rounded-md
      flex
      items-center
      justify-between
      
      "
      >
        <input
          type="text"
          className=" 
          w-full
          cursor-text 
          bg-neutral-100 
          py-2 
          px-3 
          rounded-md 
          flex 
          justify-between 
          items-center 
          dark:bg-neutral-800 
          dark:border 
          dark:border-white/50 
          text-sm
          tracking-tight
          focus:border-teal-600
          focus:outline-teal-600
          pl-8
          "
          value={search}
          placeholder={locales.search}
          onChange={(e) => {
            if(!!e.target.value.trim()){
              setSearch(e.target.value?.trim())
            }else{
              setSearch("");
              handleConvertRoute(`/companies/${company_id}/home`)
            }
          }}
        />

        <div className="absolute left-2  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
