import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";
import reducers from "./reducers";

test("renders homepage", async () => {
  const store = createStore(reducers, middleware);

  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  await waitFor(() => {
    expect(getByText(/Employee Polls/i)).toBeInTheDocument();
  });
});
