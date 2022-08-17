import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Navigate, Route, Routes } from "react-router-dom";
import { User } from "./types/User";
import Login from "./components/Login";

type InitialDataType = {
  authedUser: User;
  users: User[];
};

function App(props: any) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  console.log(props);
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

const mapStateToProps = ({ authedUser, users }: InitialDataType) => ({
  loggedIn: !!authedUser.id,
  users,
  loading: Object.keys(users).length < 1,
});

export default connect(mapStateToProps)(App);