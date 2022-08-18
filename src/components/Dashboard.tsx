import { connect } from "react-redux";
import { Question } from "../types/Question";
import { User } from "../types/User";

type DashboardProps = {
  questions: Question[];
  authedUser: User;
};

const Dashboard = (props: any) => {
  const mappableQuestions: Question[] = Object.values(props.questions);

  return (
    <div>
      <h3 className="center">New Questions</h3>
      <ul className="dashboard-list"></ul>

      <h3 className="center">Done</h3>
      <ul className="dashboard-list"></ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }: DashboardProps) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);
