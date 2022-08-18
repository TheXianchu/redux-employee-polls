import { hideLoading, showLoading } from "react-redux-loading-bar";
import { loginAuthedUser, logoutAuthedUser } from "../utils/api";
import { User } from "../types/User";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const RECEIVE_AUTHED_USER = "RECEIVE_AUTHED_USER";

export function setAuthedUser(authedUser: User | Record<any, never>) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  };
}

export function handleSetAuthedUser(authedUser: User | Record<any, never>) {
  return (dispatch: any) => {
    dispatch(showLoading());

    return loginAuthedUser(authedUser)
      .then((authedUser) => dispatch(setAuthedUser(authedUser)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleUnsetAuthedUser() {
  return (dispatch: any) => {
    dispatch(showLoading());

    return logoutAuthedUser()
      .then(() => dispatch(setAuthedUser({})))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveAuthedUser(authedUser: User | Record<any, never>) {
  return {
    type: RECEIVE_AUTHED_USER,
    authedUser,
  };
}
