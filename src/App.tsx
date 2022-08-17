import React, { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Navigate, Route, Routes } from "react-router-dom";
import { User } from "./types/User";
import Login from "./components/Login";

type InitialDataType = {
  authenticatedUser: User;
  users: User[];
};

function App(props: any) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <>
      <LoadingBar />
      <div className="App">
        <h1>Employee Polls</h1>

        {props.loading ? null : (
          <Routes>
            <Route
              path="/"
              element={
                props.loggedIn ? <Navigate to="/dashboard" /> : <Login />
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

const mapStateToProps = ({ authenticatedUser, users }: InitialDataType) => ({
  authenticatedUser,
  users,
  loading: Object.keys(users).length < 1,
});

export default connect(mapStateToProps)(App);
