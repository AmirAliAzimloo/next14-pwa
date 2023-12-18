import { createSlice } from "@reduxjs/toolkit";

const phoneConfirmedSlice=createSlice({
   name:"phoneConfirmed",
   initialState:{value:-1},
   reducers:{
      userPhoneConfirmTrue:(state)=>{state.value=1},
      userPhoneConfirmFalse:(state)=>{state.value=-1},
   }
});

export const {userPhoneConfirmTrue, userPhoneConfirmFalse}=phoneConfirmedSlice.actions;
export default phoneConfirmedSlice.reducer;