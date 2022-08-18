import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import middleware from "./middleware";
import { createRoot } from "react-dom/client";
import reducers from "./reducers";

const container = document.getElementById("root")!;
const root = createRoot(container);

const store = createStore(reducers, middleware);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
