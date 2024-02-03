import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters : {}
} as{
    filters : {
        company_id : string;
        search_name ?: string;
        page: string
    }
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
      setFilter: (state, action) => {
     state.filters = action.payload;

    },
  },
});

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
