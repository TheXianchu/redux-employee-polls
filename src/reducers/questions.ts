import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  RECEIVE_QUESTIONS,
} from "../actions/questions";
import { User } from "../types/User";

export default function questions(state = {}, action: any) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      const {
        qid,
        answer,
        authedUser,
      }: { qid: string; answer: string; authedUser: User } = action.answer;
      // @ts-ignore
      const newAnswer = state[qid][answer];
      newAnswer.votes.concat(authedUser);

      return {
        ...state,
        [qid]: {
          // @ts-ignore
          ...state[qid],
          [answer]: newAnswer,
        },
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
