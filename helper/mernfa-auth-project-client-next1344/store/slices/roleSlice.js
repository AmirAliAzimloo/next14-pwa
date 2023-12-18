import { createSlice } from "@reduxjs/toolkit";

const roleSlice=createSlice({
   name:"role",
   initialState:{value:5},
   reducers:{
      userToLogout:(state)=>{state.value=5},
      userToNormal:(state)=>{state.value=3},
      userToAdmin:(state)=>{state.value=1},
   }
});

export const {userToLogout, userToNormal,userToAdmin}=roleSlice.actions;
export default roleSlice.reducer;