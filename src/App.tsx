import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { User } from "./types/User";

type InitialReturnData = {
  authedUser: User;
};

function App(props: any) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <>
      <LoadingBar />
      <div className="App">
        <h1> Employee Polls </h1>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser }: InitialReturnData) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
