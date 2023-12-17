"use client";
import ProductCard from "@next-redux-sample/components/ProductCard/ProductCard";
import { useGetProductsQuery } from "@next-redux-sample/store/services/productsApi";
export default function Page() {

    const { isLoading, isFetching, data, error } = useGetProductsQuery(null);
    if (isLoading) return <p>Loading</p>
    return (
        <div className="mt-8">
            <h2 className="text-3xl text-center font-bold">Products List</h2>

            <div className="grid grid-cols-3 gap-16 m-12">
                {!!data?.length && (
                    data.map((product)=>(
                        <ProductCard key={product.id} {...product}/>
                    ))
                )}
            </div>
        </div>
    )
}
