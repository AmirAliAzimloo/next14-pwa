import { configureStore } from "@reduxjs/toolkit";
// import {productApi  } from "./services/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
// import cartSlice from "./reducers/cartSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    // [productApi.reducerPath]: productApi.reducer,
    // cart: cartSlice,
    user : userSlice
  },
  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat([productApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
