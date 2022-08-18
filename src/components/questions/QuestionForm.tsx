import { connect } from "react-redux";
import { User } from "../../types/User";
import { FormEvent, useCallback, useState } from "react";
import { handleAddQuestion } from "../../actions/questions";
import { fetchUsers } from "../../actions/users";
import { refreshAuthedUser } from "../../actions/authedUser";
import { useNavigate } from "react-router-dom";

type QuestionProps = {
  authedUser: User;
};

const QuestionForm = (props: any) => {
  const [optionOneText, setOptionOneText] = useState<string>("");
  const [optionTwoText, setOptionTwoText] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      props
        .dispatch(handleAddQuestion(optionOneText, optionTwoText))
        .then(props.dispatch(fetchUsers()));

      setTimeout(() => {
        props.dispatch(refreshAuthedUser());

        setOptionOneText("");
        setOptionTwoText("");

        navigate("/dashboard");
      }, 1000);
    },
    [optionOneText, optionTwoText, props]
  );

  return (
    <div>
      <h3 className="center">Would you rather</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <input
          className="text-input"
          name="optionOne"
          type="text"
          placeholder="Option One"
          value={optionOneText}
          onChange={(event) => {
            setOptionOneText(event.target.value);
          }}
        />
        <br />
        <input
          className="text-input"
          name="optionTwo"
          type="text"
          placeholder="Option Two"
          value={optionTwoText}
          onChange={(event) => {
            setOptionTwoText(event.target.value);
          }}
        />
        <br />
        <br />
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
