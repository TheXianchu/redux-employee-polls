import { RECEIVE_AUTHED_USER, SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = {}, action: any) {
  switch (action.type) {
    case RECEIVE_AUTHED_USER:
      return {
        ...state,
        ...action.authedUser,
      };
    case SET_AUTHED_USER:
      return action.authedUser;
    default:
      return state;
  }
}
