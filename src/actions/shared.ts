import { getInitialData } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Dispatch } from "react";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export function handleInitialData() {
  return (dispatch: Dispatch<any>) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
