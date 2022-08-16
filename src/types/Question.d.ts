import { QuestionOption } from "./QuestionOption";

export type Question = {
    [id: string]: {
        id: string;
        author: string;
        timestamp: number;
        optionOne: QuestionOption;
        optionTwo: QuestionOption;
    },
}