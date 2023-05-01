import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./css/index.module.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux-store/store";

import App from "./components/App";
import TodoForm from "./components/TodoForm";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/addTodo",
        element: <TodoForm />,
      },
      {
        path: ":id",
        element: <TodoForm />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
