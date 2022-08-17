import { QuestionOption } from "./QuestionOption";

export type Answer = {
  authedUser: string;
  qid: string;
  answer: QuestionOption;
};
