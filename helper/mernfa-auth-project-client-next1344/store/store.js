import { configureStore } from "@reduxjs/toolkit";
import logedSlice from "./slices/logedSlice";
import emailConfirmedSlice from "./slices/emailConfirmedSlice";
import phoneConfirmedSlice from "./slices/phoneConfirmedSlice";
import roleSlice from "./slices/roleSlice";

const store=configureStore({
   reducer:{
      loged:logedSlice,
      emailConfirmed:emailConfirmedSlice,
      phoneConfirmed:phoneConfirmedSlice,
      role:roleSlice,
   }
})
export default store;