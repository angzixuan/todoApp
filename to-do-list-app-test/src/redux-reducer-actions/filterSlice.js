import { createSlice } from "@reduxjs/toolkit";
import { DefaultFilter, SortBy } from "../utils/global";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    status: DefaultFilter.ALL,
    sortBy: SortBy.NAME,
  },
  reducers: {
    setFilter(state, action) {
      console.log(`filterSlice Entered: setFiler, ${action.payload}`);
      state.status = action.payload;
    },
    setSortBy(state, action) {
      console.log(`filterSlice Entered: setSortBy, ${action.payload}`);
      state.sortBy = action.payload;
    },
  },
});

export const { setFilter, setSortBy } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
