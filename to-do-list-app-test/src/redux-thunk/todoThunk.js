import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllTodo = createAsyncThunk(
  "todos/fetchAllTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5170/todoitems`);
      return response.data;
    } catch (error) {
      return rejectWithValue([error.name, error.message].join(":"));
    }
  }
);

export const putTodo = createAsyncThunk(
  "todos/putTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5170/todoitems/${todo.id}`,
        todo
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue([error.name, error.message].join(":"));
    }
  }
);

export const postTodo = createAsyncThunk(
  "todos/postTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5170/todoitems`,
        todo
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue([error.name, error.message].join(":"));
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/addTodoBackend",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5170/todoitems/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue([error.name, error.message].join(":"));
    }
  }
);
