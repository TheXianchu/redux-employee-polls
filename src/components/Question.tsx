import { connect } from "react-redux";
import { Question } from "../types/Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { User } from "../types/User";
import { fetchQuestions, handleAnswerQuestion } from "../actions/questions";
import { fetchUsers } from "../actions/users";
import { refreshAuthedUser } from "../actions/authedUser";
import { determineIfYourOwn, validateAnsweredQuestion } from "../utils/helpers";

type QuestionProps = {
  questions: Question[];
  authedUser: User;
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
  }, [navigate, props.question, props.questionCreator]);

  const handleClick = useCallback(
    (answer: string) => {
      props
        .dispatch(
          handleAnswerQuestion({
            authedUser: props.authedUser.id,
            qid: props.question.id,
            answer,
          })
        )
        .then(props.dispatch(fetchQuestions()))
        .then(props.dispatch(fetchUsers()));

      setTimeout(() => {
        props.dispatch(refreshAuthedUser());
      }, 1000);
    },
    [props]
  );

  useEffect(() => {
    props.dispatch(fetchQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {!props.hasAnsweredQuestion ? (
            <>
              <div style={{ float: "left" }}>
                {props.question.optionOne.text}
                <br />
                <br />
                <button
                  className="btn"
                  onClick={() => handleClick("optionOne")}
                >
                  Click
                </button>
              </div>
              <div style={{ float: "right" }}>
                {props.question.optionTwo.text}
                <br />
                <br />
                <button
                  className="btn"
                  onClick={() => handleClick("optionTwo")}
                >
                  Click
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ float: "left" }}>
                {determineIfYourOwn(
                  props.authedUser,
                  props.question.optionOne
                ) ? (
                  <strong>{props.question.optionOne.text} (Your answer)</strong>
                ) : (
                  props.question.optionOne.text
                )}
                <br />
                <br />
                Answers: {props.question.optionOne.votes.length}(
                {Math.round(
                  (props.question.optionOne.votes.length /
                    (props.question.optionOne.votes.length +
                      props.question.optionTwo.votes.length)) *
                    100
                )}
                %)
              </div>
              <div style={{ float: "right" }}>
                {determineIfYourOwn(
                  props.authedUser,
                  props.question.optionTwo
                ) ? (
                  <strong>{props.question.optionTwo.text} (Your answer)</strong>
                ) : (
                  props.question.optionTwo.text
                )}
                <br />
                <br />
                Answers: {props.question.optionTwo.votes.length}(
                {Math.round(
                  (props.question.optionTwo.votes.length /
                    (props.question.optionOne.votes.length +
                      props.question.optionTwo.votes.length)) *
                    100
                )}
                %)
              </div>
            </>
          )}
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
    const questionId = newQuestion.id as unknown as string;

    if (author) {
      const questionCreator = Array.from(mappedUsers).find(
        (user) => user.id === author
      );

      return {
        authedUser,
        question: newQuestion,
        questionCreator: questionCreator,
        hasAnsweredQuestion: validateAnsweredQuestion(authedUser, questionId),
      };
    }
  }
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
