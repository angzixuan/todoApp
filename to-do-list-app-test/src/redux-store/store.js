import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "../redux-reducer-actions/rootReducer";

// initialize a default middleware
const middleware = [thunk];

// if it is development inject logger along with thunk
if (process.env.NODE_ENV === "development") {
  console.log("Logger Added");
  middleware.push(logger);
}

// well, configure store offer more configuration
export default configureStore({
  reducer: rootReducer,
  middleware: middleware,
});
