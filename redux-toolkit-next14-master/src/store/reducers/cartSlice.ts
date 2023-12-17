import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../services/productsApi";


const initialState = {
    cart: [],
} as {cart: Product[]}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, actions) => {
            state.cart.push(actions.payload)
        },
        deleteCart: (state, actions) => {
            console.log(state.cart, actions.payload)
            const updatedState=state.cart.filter((cart)=> cart.id !== actions.payload)
            state.cart =  updatedState
        },
    }
})

export const {addToCart, deleteCart} =  cartSlice.actions

export default cartSlice.reducer