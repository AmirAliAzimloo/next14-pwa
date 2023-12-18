import { createSlice } from "@reduxjs/toolkit";

const emailConfirmedSlice=createSlice({
   name:"emailConfirmed",
   initialState:{value:-1},
   reducers:{
      useremailConfirmedTrue:(state)=>{state.value=1},
      useremailConfirmedFalse:(state)=>{state.value=-1},
   }
});

export const {useremailConfirmedTrue, useremailConfirmedFalse}=emailConfirmedSlice.actions;
export default emailConfirmedSlice.reducer;