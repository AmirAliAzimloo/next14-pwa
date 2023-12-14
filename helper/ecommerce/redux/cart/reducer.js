import { ADD_TO_CART, INCREMENT, DECREMENT, REMOVE_FROM_CART, CLEAR_CART } from "./actionType";
import { getStorage, saveStorage } from "./localStorage";

const initialState = {
    cart: getStorage()
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            state.cart = [...state.cart, { ...action.payload.product, qty: action.payload.qty }]
            saveStorage(state.cart)

            return {
                ...state,
                cart: state.cart
            }

        case INCREMENT:
            state.cart = state.cart.map(p => p.id === action.payload ? { ...p, qty: p.qty + 1 } : p);
            saveStorage(state.cart)

            return {
                ...state,
                cart: state.cart
            }

        case DECREMENT:
            state.cart = state.cart.map(p => p.id === action.payload ? { ...p, qty: p.qty - 1 } : p);
            saveStorage(state.cart)

            return {
                ...state,
                cart: state.cart
            }

        case REMOVE_FROM_CART:
            state.cart = state.cart.filter(p => p.id !== action.payload)
            saveStorage(state.cart)

            return {
                ...state,
                cart: state.cart
            }

        case CLEAR_CART:
            saveStorage([])

            return {
                ...state,
                cart: []
            }

        default:
            return state
    }
}

export default cartReducer;