import React from "react";
import {
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import { createStore } from "redux";
import middleware from "../middleware";
import { BrowserRouter as Router } from "react-router-dom";
import reducers from "../reducers";

test("renders login screen", async () => {
  const store = createStore(reducers, middleware);
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  fireEvent.change(getByTestId(container, "account-selection"), {
    target: { value: -1 },
  });

  fireEvent.change(getByTestId(container, "password"), {
    target: { value: "asdad" },
  });

  await waitFor(() => {
    expect(getByTestId(container, "password")).toHaveValue("asdad");
  });

  await waitFor(() => {
    expect(getByTestId(container, "submit-button")).toBeDisabled();
  });
});
