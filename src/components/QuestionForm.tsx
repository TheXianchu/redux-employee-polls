import { connect } from "react-redux";
import { User } from "../types/User";

type QuestionProps = {
  authedUser: User;
};

const QuestionForm = (props: any) => {
  return (
    <div>
      <h3 className="center">Add a new question</h3>
      <ul className="dashboard-list"></ul>
    </div>
  );
};

const mapStateToProps = ({ authedUser }: QuestionProps) => ({
  authedUser,
});

export default connect(mapStateToProps)(QuestionForm);
