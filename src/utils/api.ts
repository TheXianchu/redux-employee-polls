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
  authedUser: User | Record<any, never>;
}> {
  return Promise.all([_getUsers(), _getQuestions(), _getAuthedUser()]).then(
    ([users, questions, authedUser]) => ({
      users,
      questions,
      authedUser,
    })
  );
}

export function saveQuestion(info: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}) {
  return _saveQuestion(info);
}

export function getUsers() {
  return Promise.all([_getUsers()]).then(([users]) => ({
    users,
  }));
}

export function getQuestions() {
  return Promise.all([_getQuestions()]).then(([questions]) => ({
    questions,
  }));
}

export function saveQuestionAnswer(info: Answer) {
  return _saveQuestionAnswer(info);
}

export function loginAuthedUser(info: User | Record<any, never>) {
  return _setAuthedUser(info);
}

export function logoutAuthedUser() {
  return _setAuthedUser({});
}
