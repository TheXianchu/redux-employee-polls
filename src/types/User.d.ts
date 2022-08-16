import { Question } from "./Question";
import {Answer} from "./Answer";

export type User = {
    id: string;
    password: string;
    name: string;
    avatarURL?: string;
    answers: Answer[];
    questions: Question[];
}