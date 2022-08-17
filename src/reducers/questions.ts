import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  RECEIVE_QUESTIONS,
} from "../actions/questions";

export default function questions(state = {}, action: any) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      const { question } = action;

      const newQuestion = {
        question,
        ...action.answer,
      };

      return {
        ...state,
        [action.qid]: newQuestion,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
