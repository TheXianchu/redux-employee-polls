import { hideLoading, showLoading } from "react-redux-loading-bar";
import { loginAuthedUser } from "../utils/api";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const RECEIVE_AUTHED_USER = "RECEIVE_AUTHED_USER";

export function setAuthedUser(id: string) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleSetAuthedUser(authedUser: string) {
  return (dispatch: any) => {
    dispatch(showLoading());

    return loginAuthedUser(authedUser)
      .then((authedUser) => dispatch(setAuthedUser(authedUser)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveAuthedUser(authedUser: string | null) {
  return {
    type: RECEIVE_AUTHED_USER,
    authedUser,
  };
}
