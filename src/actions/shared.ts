import { getInitialData } from "../utils/api";
import { showLoading, resetLoading } from "react-redux-loading-bar";
import { Dispatch } from "react";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { receiveAuthedUser } from "./authedUser";

export function handleInitialData() {
  return (dispatch: Dispatch<any>) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions, authedUser }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(receiveAuthedUser(authedUser));
      dispatch(resetLoading());
    });
  };
}
