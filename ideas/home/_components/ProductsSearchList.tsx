"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import InfinitieScrollLoader from "@/components/loaders/InfinitieScrollLoader";
import Product from "@/components/product/Product";
import { useGetProductsBySearchQuery } from "@/libs/redux/features/services/search";
import DefaultPageLoader from "@/components/loaders/DefaultPageLoader";
import useConvertRouter from "@/hooks/useConvertRouter";
import { useGetComapnyProductsQuery } from "@/libs/redux/features/services/companies";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { setFilter } from "@/libs/redux/features/reducers/filters";

interface ProductsProps<T> {
  locales: T;
  company_id: string;
}

const ProductsSearchList: React.FC<
  ProductsProps<{ [key: string]: string }>
> = ({ locales, company_id }) => {
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const sortQuery = searchParams.get("sort");
  const brandQuery = searchParams.get("brand_ids");
  const categoryQuery = searchParams.get("category_ids");
  const pageQuery = searchParams.get("p");

  const { handleConvertRoutePaginate } = useConvertRouter();
  const intObserver = useRef<IntersectionObserver | null>(null);

  // const { data, isFetching } = useGetProductsBySearchQuery({
  //   search_name: search,
  //   order: sortQuery,
  //   brand_ids: !!brandQuery
  //     ? brandQuery
  //         ?.toString()
  //         ?.split(",")
  //         ?.map((item, index) => `brand_ids[${index}]=${item}`)
  //         ?.join("&")
  //     : NaN,
  //   category_ids: !!categoryQuery
  //     ? categoryQuery
  //         ?.toString()
  //         ?.split(",")
  //         ?.map((item, index) => `category_ids[${index}]=${item}`)
  //         ?.join("&")
  //     : NaN,
  //   page: !!pageQuery ? pageQuery : 1,
  // });



  const filter = useAppSelector(state=>state.filters.filters);
  const dispatch = useAppDispatch();

  useEffect(()=>{

    if(!!searchQuery){

      dispatch(
        setFilter(
          {
            company_id,
            search_name:`&search_name=${searchQuery}`,
            page,
          }
        )
       )

    }else{
      dispatch(
        setFilter(
          {
            company_id,
            page,
          }
        )
       )
    }

 
    
  },[company_id,searchQuery,page]);

  useEffect(()=>{
    setPage(1);
  },[searchQuery])

  console.log("filter=>",filter)

  const { data, isFetching } = useGetComapnyProductsQuery(!!filter?.company_id ? filter : {company_id,
    search_name:!!searchQuery ? `&search_name=${searchQuery}` : "",
    page:1});

  const lastProductRef = useCallback(
    (product: HTMLDivElement) => {
      if (isFetching) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!data.next_page_url) {
          setPage((prev) => prev + 1);
          // handleConvertRoutePaginate(
          //   `/search?q=${!!search ? search : ""}&sort=${
          //     !!sortQuery ? sortQuery : ""
          //   }&brand_ids=${!!brandQuery ? brandQuery : ""}&category_ids=${
          //     !!categoryQuery ? categoryQuery : ""
          //   }&p=${!!pageQuery ? Number(pageQuery) + 1 : 1}`
          // );
        }
      });

      if (product) intObserver.current.observe(product);
    },
    [isFetching, data?.next_page_url]
  );

  if (!!isFetching && pageQuery == "1") {
    return <DefaultPageLoader />;
  }

  if (data?.data?.length == 0) {
    return (
      <div className="w-full">
        <div className="mx-auto w-fit my-4">{locales.notFoundProduct}</div>
      </div>
    );
  }

  return (
    <>
      <div
        className="
    grid
    grid-cols-2
    gap-4
    "
      >
        {data?.data.map((product: Record<string, any>, index: number) => {
          if (data?.data?.length === index + 1) {
            return (
              <Product
                key={product.id}
                ref={lastProductRef}
                product={product}
                locales={locales}
              />
            );
          } else {
            return (
              <Product key={product.id} product={product} locales={locales} />
            );
          }
        })}
      </div>

      {isFetching && pageQuery !== "1" && (
        <div className="pb-16">
          <InfinitieScrollLoader />
        </div>
      )}
    </>
  );
};

export default ProductsSearchList;
