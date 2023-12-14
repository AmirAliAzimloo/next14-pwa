import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import {filmApi} from "./slices/filmApi";

const store = configureStore({
    reducer:{
        counter:counterSlice,
        [filmApi.reducerPath]: filmApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmApi.middleware),
})

export default store;