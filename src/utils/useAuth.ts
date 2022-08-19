import { useSelector } from "react-redux";
import { User } from "../types/User";

export function useAuth() {
  const authedUser: User = useSelector((state: any) => state.authedUser);

  if (authedUser) {
    return Object.keys(authedUser).length > 0;
  }

  return false;
}
