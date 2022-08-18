import { User } from "../types/User";

export function validateAnsweredQuestion(authedUser: User, questionId: string) {
  return Array.from(Object.keys(authedUser.answers)).some(
    (answer: any) => answer === questionId
  );
}
