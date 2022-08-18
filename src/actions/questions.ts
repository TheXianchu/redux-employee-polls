import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Question } from "../types/Question";
import { Answer } from "../types/Answer";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question: Question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(
  optionOneText: string,
  optionTwoText: string
) {
  return (dispatch: any, getState: any) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText: optionOneText,
      optionTwoText: optionTwoText,
      author: authedUser.id,
    }).then((question) => dispatch(addQuestion(question)));
  };
}

function answerQuestion(answer: Answer) {
  return {
    type: ANSWER_QUESTION,
    answer,
  };
}

export function handleAnswerQuestion(answer: Answer) {
  return (dispatch: any) => {
    dispatch(showLoading());

    return saveQuestionAnswer(answer)
      .then((tweet) => dispatch(answerQuestion(tweet)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions: Question[]) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
