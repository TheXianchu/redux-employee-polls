import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _getAuthedUser,
  _setAuthedUser,
} from "./_DATA.js";
import { Question } from "../types/Question";
import { Answer } from "../types/Answer";
import { User } from "../types/User";

export function getInitialData(): Promise<{
  users: User[];
  questions: Question[];
  authedUser: string | null;
}> {
  return Promise.all([_getUsers(), _getQuestions(), _getAuthedUser()]).then(
    ([users, questions, authedUser]) => ({
      users,
      questions,
      authedUser,
    })
  );
}

export function saveQuestion(info: Question) {
  return _saveQuestion(info);
}

export function saveQuestionAnswer(info: Answer) {
  return _saveQuestionAnswer(info);
}

export function loginAuthedUser(info: string) {
  return _setAuthedUser(info);
}
