"use client";
import ProductCard from "@next-redux-sample/components/ProductCard/ProductCard";
import withAddToCartProductCard from "@next-redux-sample/components/hoc/withAddToCartProductCard";
import { useGetProductByIdQuery } from "@next-redux-sample/store/services/productsApi";


export default function Page({ params }: { params: { id: string } }) {
    const { isLoading, isFetching, data, error } = useGetProductByIdQuery({id: params.id.toString()});
    const ProductCardWithAction =  withAddToCartProductCard(ProductCard)
    if(isLoading) return <p>Loading...</p>
    return (
    <div className="mt-8 w-6/12 flex flex-col text-center mx-auto">
        <h2 className="text-3xl  font-bold">Products Details</h2>
        <div >
            {data && <ProductCardWithAction {...data}/>}
        </div>
    </div>
    )
  }