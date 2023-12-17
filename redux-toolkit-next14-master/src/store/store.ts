import { configureStore } from "@reduxjs/toolkit";
import {productApi  } from "./services/productsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import cartSlice from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart: cartSlice
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([productApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
