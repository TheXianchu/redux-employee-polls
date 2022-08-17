import { ChangeEvent, useCallback, useState } from "react";
import { connect } from "react-redux";
import { User } from "../types/User";
import { handleSetAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

type LoginScreenType = {
  users: User[];
};

function Login(props: any) {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target?.value);
  }, []);

  const handleLogin = useCallback(() => {
    if (selectedUser) {
      props.dispatch(handleSetAuthedUser(selectedUser));
    }

    if (props.authedUser) {
      navigate("/");
    }
  }, [props.dispatch, props.authedUser]);

  return (
    <div className="form">
      <form>
        <div className="input-container">
          <label>Choose an account</label>
          <select
            value={selectedUser ? selectedUser : undefined}
            name={props.name}
            onChange={handleChange}
            disabled={props.disabled}
          >
            {props.users &&
              props.users.map((user: User, index: number) => (
                <option key={index} value={user.id}>
                  {user.name as string}
                </option>
              ))}
          </select>
          <button
            className="btn"
            onClick={handleLogin}
            disabled={!selectedUser}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = ({ users }: LoginScreenType) => ({
  users: Array.from(users),
});

export default connect(mapStateToProps)(Login);
