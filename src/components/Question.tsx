import { connect } from "react-redux";
import { Question } from "../types/Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../types/User";

type QuestionProps = {
  questions: Question[];
  authedUser: Question[];
  users: User[];
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.question || !props.questionCreator) {
      navigate("*");
    }
  }, []);

  return (
    <div>
      {props.questionCreator && (
        <>
          <h2 className="center">
            Poll by {props.questionCreator && props.questionCreator.name}
          </h2>
          <h3 className="center">Would you rather</h3>
          <div style={{ float: "left" }}>{props.question.optionOne.text}</div>
          <div style={{ float: "right" }}>{props.question.optionTwo.text}</div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (
  { authedUser, questions, users }: QuestionProps,
  props: any
) => {
  const { id } = props.router.params;
  const mappedQuestions: Question[] = Object.values(questions);
  const mappedUsers: User[] = Object.values(users);

  const newQuestion: Question | undefined = Array.from(mappedQuestions).find(
    (question: Question) => question.id === id
  );

  if (newQuestion) {
    const author = newQuestion.author as unknown as string;
    if (author) {
      const questionCreator = Array.from(mappedUsers).find(
        (user) => user.id === author
      );

      return {
        authedUser,
        question: newQuestion,
        questionCreator: questionCreator,
      };
    }
  }
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
