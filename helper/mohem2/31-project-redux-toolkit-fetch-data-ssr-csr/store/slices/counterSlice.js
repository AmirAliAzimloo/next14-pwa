import { createSlice } from "@reduxjs/toolkit";

const counterSlice=createSlice({
    name:"counter",
    initialState:{value:8},
    reducers:{
        increment:(state)=>{state.value++;},
        decrement:(state)=>{state.value--;},
        cartValueSetter:(state,action)=>{
         state.value=action.payload
        }
    }
});

export const {increment,decrement,cartValueSetter}=counterSlice.actions;
export default counterSlice.reducer;