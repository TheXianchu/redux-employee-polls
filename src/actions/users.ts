import { User } from "../types/User";

export const RECEIVE_USERS = "RECEIVE_USERS";

export function receiveUsers(users: User[]) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
