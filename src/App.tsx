import React, { ReactElement, useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { User } from "./types/User";
import Dashboard from "./components/Dashboard";
import QuestionForm from "./components/QuestionForm";
import Nav from "./components/Nav";
import Leaderboard from "./components/Leaderboard";
import Question from "./components/Question";
import PageNotFound from "./components/PageNotFound";
import { useAuth } from "./utils/useAuth";
import Login from "./components/Login";

type InitialDataType = {
  authedUser: User;
  users: User[];
};

function RequireAuth({ children }: { children: ReactElement }) {
  const loggedIn = useAuth();
  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

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
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <RequireAuth>
                  <Leaderboard />
                </RequireAuth>
              }
            />
            <Route
              path="/new"
              element={
                <RequireAuth>
                  <QuestionForm />
                </RequireAuth>
              }
            />

            <Route
              path="/questions/:id"
              element={
                <RequireAuth>
                  <Question />
                </RequireAuth>
              }
            />

            <Route path="/login" element={<Login />} />

            <Route path="not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
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
