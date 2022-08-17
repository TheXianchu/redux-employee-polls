import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";
import { Question } from "../types/Question";
import { Answer } from "../types/Answer";
import { User } from "../types/User";

export function getInitialData(): Promise<object> {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(info: Question) {
  return _saveQuestion(info);
}

export function saveQuestionAnswer(info: {
  authedUser: User;
  qid: string;
  answer: Answer;
}) {
  return _saveQuestionAnswer(info);
}
