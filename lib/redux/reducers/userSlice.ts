import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        name : "",
        mobile : ""
} as {
        name : string,
        mobile:string
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload
            state.name = user.name
            state.mobile = user.mobile
        }
    }
})

export const { setCredentials } =  userSlice.actions

export default userSlice.reducer