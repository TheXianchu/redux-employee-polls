import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

test("renders homepage", async () => {
  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);

  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  );

  await waitFor(() => {
    expect(getByText(/Employee Polls/i)).toBeInTheDocument();
  });
});
