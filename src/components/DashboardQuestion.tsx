import { connect } from "react-redux";
import { Question } from "../types/Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";

type DashboardProps = {
  questions: Question[];
};

const withRouter = (Component: any) => {
  return (props: any) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
};

const DashboardQuestion = (props: any) => {
  const navigate = useNavigate();
  const handleOpenQuestion = useCallback(() => {
    navigate(`/questions/${props.id}`);
  }, [navigate, props.id]);

  return props.question ? (
    <div className="container question-card">
      <span>{props.question.author}</span>
      <br />
      <span style={{ color: "grey" }}>{props.question.timestamp}</span>
      <br />
      <button className="btn question-card-button" onClick={handleOpenQuestion}>
        Show
      </button>
    </div>
  ) : null;
};

const mapStateToProps = ({ questions }: DashboardProps, props: any) => {
  const { id } = props;
  const mappedQuestions: Question[] = Object.values(questions);
  const newQuestion: Question | undefined = Array.from(mappedQuestions).find(
    (question: Question) => question.id === id
  );

  return {
    question: newQuestion,
    id,
  };
};

export default withRouter(connect(mapStateToProps)(DashboardQuestion));
