import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";

test("renders homepage", () => {
  const store = createStore(reducer, middleware);

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Employee Polls/i)).toBeInTheDocument();
});
