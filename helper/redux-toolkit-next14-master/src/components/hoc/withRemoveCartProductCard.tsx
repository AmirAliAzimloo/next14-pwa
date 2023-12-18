"use client";

import { useAppDispatch } from "@next-redux-sample/store/hooks";
import {  deleteCart } from "@next-redux-sample/store/reducers/cartSlice";
import { Product } from "@next-redux-sample/store/services/productsApi";

const withRemoveCartProductCard = (Component: React.FC<any>) => {


    const ProductCardWithActions = (product: Product) => {
        const dispatch = useAppDispatch()
        const handleAddToCart = () => {
            dispatch(deleteCart(product.id))
        }
        return (
            <div className="relative" >
                <Component {...product} />
                <div className="absolute md:flex md:items-center bottom-0 w-full left-85">
                    <div ></div>
                    <div>
                        <button onClick={handleAddToCart} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                            Remove from cart
                        </button>
                    </div>
                </div>
            </div >
        )
       
    }
    return ProductCardWithActions
}

    export default withRemoveCartProductCard