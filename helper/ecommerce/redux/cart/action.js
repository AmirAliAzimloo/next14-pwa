import { ADD_TO_CART, INCREMENT, DECREMENT, REMOVE_FROM_CART, CLEAR_CART } from "./actionType";

export const addToCart = (product, qty) => {
    return {
        type: ADD_TO_CART,
        payload: { product, qty }
    }
}

export const increment = (productId) => {
    return {
        type: INCREMENT,
        payload: productId
    }
}

export const decrement = (productId) => {
    return {
        type: DECREMENT,
        payload: productId
    }
}

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}