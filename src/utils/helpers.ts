import { User } from "../types/User";
import { Question } from "../types/Question";
import { QuestionOption } from "../types/QuestionOption";

export function validateAnsweredQuestion(authedUser: User, questionId: string) {
  return Array.from(Object.keys(authedUser.answers)).some(
    (answer: any) => answer === questionId
  );
}

export function fetchOpenQuestions(authedUser: User, questions: Question[]) {
  return Array.from(
    Object.values(questions).filter(
      (question) =>
        Object.values(question.optionOne.votes).every(
          (vote) => vote !== authedUser.id
        ) &&
        Object.values(question.optionTwo.votes).every(
          (vote) => vote !== authedUser.id
        )
    )
  ).sort(
    (a, b) =>
      (b.timestamp as unknown as number) - (a.timestamp as unknown as number)
  );
}

export function fetchAnsweredQuestion(authedUser: User, questions: Question[]) {
  return Array.from(
    Object.values(questions).filter((question) =>
      Array.from(Object.keys(authedUser.answers)).some(
        (answer: string) => answer === (question.id as unknown as string)
      )
    )
  ).sort(
    (a, b) =>
      (b.timestamp as unknown as number) - (a.timestamp as unknown as number)
  );
}

export function determineIfYourOwn(
  authedUser: User,
  answerOption: QuestionOption
) {
  const votes = Object.values(answerOption.votes);
  return Array.from(votes).some((vote: string) => vote === authedUser.id);
}

export function orderedLeaderboards(users: User[]) {
  const mappableUsers: User[] = Object.values(users);
  return Array.from(mappableUsers).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers).length + a.questions.length)
  );
}
