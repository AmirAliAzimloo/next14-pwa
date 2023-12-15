import { createSlice } from "@reduxjs/toolkit";

const userImageSlice=createSlice({
   name:"userImage",
   // 1 => admin
   // 2 => editor
   // 3 => normal user
   // 4 => not loged
   initialState:{value:"https://secure.gravatar.com/avatar/username?s=60&d=identicon"},
   reducers:{
      setuserImageValue:(state,action)=>{state.value=action.payload},
   }
});

export const {setuserImageValue}=userImageSlice.actions;
export default userImageSlice.reducer;