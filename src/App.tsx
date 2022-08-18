import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Navigate, Route, Routes } from "react-router-dom";
import { User } from "./types/User";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import QuestionForm from "./components/QuestionForm";
import Nav from "./components/Nav";

type InitialDataType = {
  authedUser: User;
  users: User[];
};

function App(props: any) {
  useEffect(() => {
    props.dispatch(handleInitialData());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <LoadingBar />
      <Nav />
      <div className="container">
        <h1>Employee Polls</h1>

        {props.loading ? null : (
          <Routes>
            <Route
              path="/"
              element={
                props.loggedIn ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/dashboard"
              element={props.loggedIn ? <Dashboard /> : <Login />}
            />
            <Route
              path="/new"
              element={props.loggedIn ? <QuestionForm /> : <Login />}
            />

            <Route
              path="*"
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
  loggedIn: Object.keys(authedUser).length !== 0,
  users,
  loading: Object.keys(users).length < 1,
});

export default connect(mapStateToProps)(App);
