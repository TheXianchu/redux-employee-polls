import { connect } from "react-redux";
import { Question } from "../types/Question";
import { User } from "../types/User";
import DashboardQuestion from "./DashboardQuestion";
import { fetchAnsweredQuestion, fetchOpenQuestions } from "../utils/helpers";

type DashboardProps = {
  questions: Question[];
  authedUser: User;
};

const Dashboard = (props: any) => {
  return props.openQuestions ? (
    <div>
      <h3 className="center">New Questions</h3>
      <ul className="question-container">
        {props.openQuestions.map((question: Question) => (
          <DashboardQuestion
            key={question.id as unknown as string}
            id={question.id}
          />
        ))}
      </ul>

      <h3 className="center">Done</h3>
      <ul className="question-container">
        {props.answeredQuestions.map((question: Question) => (
          <DashboardQuestion
            key={question.id as unknown as string}
            id={question.id}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

const mapStateToProps = ({ questions, authedUser }: DashboardProps) => ({
  openQuestions: fetchOpenQuestions(authedUser, questions),
  answeredQuestions: fetchAnsweredQuestion(authedUser, questions),
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);
