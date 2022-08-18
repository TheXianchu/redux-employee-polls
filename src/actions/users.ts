import { User } from "../types/User";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getUsers } from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";

export function receiveUsers(users: User[]) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function fetchUsers() {
  return (dispatch: any) => {
    dispatch(showLoading());

    return getUsers()
      .then(({ users }) => dispatch(receiveUsers(users)))
      .then(() => dispatch(hideLoading()));
  };
}
