import { connect } from "react-redux";
import { Question } from "../../types/Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type QuestionProps = {
  questions: Question[];
  authedUser: Question[];
};

const withRouter = (Component: any) => {
  return (props: any) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
};

const QuestionPage = (props: any) => {
  const mappableQuestions: Question[] = Object.values(props.questions);

  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul className="dashboard-list"></ul>
    </div>
  );
};

const mapStateToProps = (
  { authedUser, questions }: QuestionProps,
  props: any
) => {
  const { id } = props.router.params;
  const mappedQuestions: Question[] = Object.values(questions);
  const newQuestion = mappedQuestions.find(
    // @ts-ignore
    (question: Question) => question.id === id
  );

  return {
    authedUser,
    newQuestion,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
