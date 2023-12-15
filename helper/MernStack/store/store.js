import { configureStore } from "@reduxjs/toolkit";

import logedSlice from "./slices/logedSlice";
import roleSlice from "./slices/roleSlice";
import user_is_active from "./slices/user_is_active";
import userImageSlice from "./slices/userImageSlice";

const store=configureStore({
   reducer:{
      logedSlice:logedSlice,
      roleSlice:roleSlice,
      user_is_active:user_is_active,
      userImageSlice:userImageSlice,
   }
});

export default store;