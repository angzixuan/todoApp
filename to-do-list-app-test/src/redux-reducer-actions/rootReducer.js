import { combineReducers } from "redux";

import { todoReducer } from "./todoSlice";
import { filterReducer } from "./filterSlice";

export const rootReducer = combineReducers({
  todo: todoReducer,
  filter: filterReducer,
});
