import { connect } from "react-redux";
import { User } from "../types/User";
import { FormEvent, useCallback, useState } from "react";
import { handleAddQuestion } from "../actions/questions";
import { fetchUsers } from "../actions/users";

type QuestionProps = {
  authedUser: User;
};

const QuestionForm = (props: any) => {
  const [optionOneText, setOptionOneText] = useState<string>("");
  const [optionTwoText, setOptionTwoText] = useState<string>("");

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      props.dispatch(handleAddQuestion(optionOneText, optionTwoText));
      props.dispatch(fetchUsers());
    },
    [optionOneText, optionTwoText, props]
  );

  return (
    <div>
      <h3 className="center">Add a new question</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <input
          name="optionOne"
          type="text"
          placeholder="Option One"
          value={optionOneText}
          onChange={(event) => {
            setOptionOneText(event.target.value);
          }}
        />
        <input
          name="optionTwo"
          type="text"
          placeholder="Option Two"
          value={optionTwoText}
          onChange={(event) => {
            setOptionTwoText(event.target.value);
          }}
        />
        <button
          className="btn"
          type="submit"
          disabled={optionOneText === "" || optionTwoText === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }: QuestionProps) => ({
  authedUser,
});

export default connect(mapStateToProps)(QuestionForm);
