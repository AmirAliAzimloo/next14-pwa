"use client";
import ProductCard from "@next-redux-sample/components/ProductCard/ProductCard"
import withRemoveCartProductCard from "@next-redux-sample/components/hoc/withRemoveCartProductCard"
import { useAppSelector } from "@next-redux-sample/store/hooks"
import { Product } from "@next-redux-sample/store/services/productsApi";


export default function Page() {

    const RemoveCartWithActions =  withRemoveCartProductCard(ProductCard)
    const cart =  useAppSelector(state=> state.cart.cart)
    console.log({cart})

    return(
        <div className="mt-8">
            <h2 className="text-3xl text-center font-bold">Products List</h2>

            <div className="grid grid-cols-3 gap-16 m-12">
                {!!cart?.length && (
                    cart.map((product)=>(
                        <RemoveCartWithActions key={product.id} {...product}/>
                    ))
                )}
            </div>
        </div>
    )

}