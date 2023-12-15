import { createSlice } from "@reduxjs/toolkit";

const userIsActiveSlice=createSlice({
   name:"userIsActive",
   initialState:{value:false},
   reducers:{
      userIsActiveToFalse:(state)=>{state.value=false},
      userIsActiveToTrue:(state)=>{state.value=true},
   }
});

export const {userIsActiveToFalse, userIsActiveToTrue}=userIsActiveSlice.actions;
export default userIsActiveSlice.reducer;