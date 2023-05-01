import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllTodo,
  deleteTodo,
  postTodo,
  putTodo,
} from "../redux-thunk/todoThunk";
import { FetchStatus as thunkStatus } from "../utils/global";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    fetchStatus: thunkStatus.Idle,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      console.log(`Slice Entered: addTodo, ${action.payload}`);
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      console.log(`Slice Entered: removeTodo, ${action.payload}`);
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
    updateTodo(state, action) {
      console.log(`Slice Entered: updateTodo, ${action.payload}`);
      state.todos = state.todos.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllTodo.pending, (state) => {
      console.log("Fetching....");
      state.fetchStatus = thunkStatus.Loading;
    });
    builder.addCase(fetchAllTodo.fulfilled, (state, action) => {
      state.fetchStatus = thunkStatus.Success;
      state.todos = action.payload;
      console.log("Fetch Succeed");
    });
    builder.addCase(fetchAllTodo.rejected, (state, action) => {
      console.log("Fetch Failed");
      state.fetchStatus = thunkStatus.Fail;
      state.error = action.payload;
    });
    //
    builder.addCase(deleteTodo.pending, (state) => {
      console.log("Deleting....");
      state.fetchStatus = thunkStatus.Loading;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.filter((task) => task.id !== id);
      state.fetchStatus = thunkStatus.Success;
      console.log(`Delete Succeed`);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      console.log("Delete Failed");
      state.fetchStatus = thunkStatus.Fail;
      state.error = action.payload;
    });
    //
    builder.addCase(postTodo.pending, (state) => {
      console.log("Posting....");
      state.fetchStatus = thunkStatus.Loading;
    });
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.fetchStatus = thunkStatus.Success;
      state.todos.push(action.payload);
      console.log("Post Succeed");
    });
    builder.addCase(postTodo.rejected, (state, action) => {
      console.log("Post Failed");
      state.fetchStatus = thunkStatus.Fail;
      state.error = action.payload;
    });
    //
    builder.addCase(putTodo.pending, (state) => {
      console.log("Updating....");
      state.fetchStatus = thunkStatus.Loading;
    });
    builder.addCase(putTodo.fulfilled, (state, action) => {
      state.fetchStatus = thunkStatus.Success;
      state.todos = state.todos.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      console.log("Update Succeed");
    });
    builder.addCase(putTodo.rejected, (state, action) => {
      console.log("Update Failed");
      state.fetchStatus = thunkStatus.Fail;
      state.error = action.payload;
    });
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
