import { createSlice } from "@reduxjs/toolkit";

const logedSlice=createSlice({
   name:"loged",
   initialState:{value:false},
   reducers:{
      logedToFalse:(state)=>{state.value=false},
      logedToTrue:(state)=>{state.value=true},
   }
});

export const {logedToFalse, logedToTrue}=logedSlice.actions;
export default logedSlice.reducer;