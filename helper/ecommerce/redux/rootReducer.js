import { combineReducers } from "redux";
import cartReducer from "./cart/reducer";

const rootReducer = combineReducers({
    shoppingCart: cartReducer
})

export default rootReducer;