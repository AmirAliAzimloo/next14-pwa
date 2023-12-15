import { createSlice } from "@reduxjs/toolkit";

const roleSlice=createSlice({
   name:"role",
   // 1 => admin
   // 2 => editor
   // 3 => normal user
   // 4 => not loged
   initialState:{value:4},
   reducers:{
      setRoleValue:(state,action)=>{state.value=action.payload},
   }
});

export const {setRoleValue}=roleSlice.actions;
export default roleSlice.reducer;