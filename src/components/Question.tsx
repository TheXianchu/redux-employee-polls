import { connect } from "react-redux";
import { Question } from "../types/Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { User } from "../types/User";
import { handleAnswerQuestion } from "../actions/questions";
import { QuestionOption } from "../types/QuestionOption";

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
  }, [props.questionCreator, navigate, props.question]);

  const handleClick = useCallback(
    (answer: string) => {
      props.dispatch(
        handleAnswerQuestion({
          authedUser: props.authedUser.id,
          qid: props.question.id,
          answer,
        })
      );
    },
    [props]
  );

  return (
    <div>
      {props.questionCreator && (
        <>
          <h2 className="center">
            Poll by {props.questionCreator && props.questionCreator.name}
            <br />
            <img
              className="question-profile-icon"
              src={props.questionCreator.avatarURL}
              alt="avatar"
            />
          </h2>
          <h3 className="center">Would you rather</h3>
          <div style={{ float: "left" }}>
            {props.question.optionOne.text}
            <br />
            <br />
            <button className="btn" onClick={() => handleClick("optionOne")}>
              Click
            </button>
          </div>
          <div style={{ float: "right" }}>
            {props.question.optionTwo.text}
            <br />
            <br />
            <button className="btn" onClick={() => handleClick("optionTwo")}>
              Click
            </button>
          </div>
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
