import { connect } from "react-redux";
import { Question } from "../types/Question";

type DashboardProps = {
  questions: Question[];
};

const Dashboard = (props: any) => {
  const mappableQuestions: Question[] = Object.values(props.questions);

  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul className="dashboard-list"></ul>
    </div>
  );
};

const mapStateToProps = ({ questions }: DashboardProps) => ({
  questions,
});

export default connect(mapStateToProps)(Dashboard);
