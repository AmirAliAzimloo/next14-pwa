import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosFromServer = createAsyncThunk(
  "Todos/getTodosFromServer",
  async (url) => {
    console.log("url", url);
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "Todos",
  initialState: [],
  reducers: {
    addTodo: (todos, action) => {
      todos.push(action.payload);
    },
    removeTodo: (todos, action) => {
      // Coding
    },
    doTodo: (state, action) => {
      // Coding
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosFromServer.fulfilled, (state, action) => {
      console.log("state:", state);
      console.log("action:", action.payload);

      state.push(...action.payload.todos);
    });
  },
});

export const { addTodo, removeTodo } = slice.actions;
export default slice.reducer;
