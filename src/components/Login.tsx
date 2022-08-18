import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "../types/User";
import { handleSetAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

type LoginScreenType = {
  users: User[];
  authedUser: User;
};

const Login = (props: any) => {
  const navigate = useNavigate();
  const mappableUsers: User[] = Object.values(props.users);

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const user = mappableUsers.find((user) => user.id === event.target.value);
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser(undefined);
    }
  }, []);

  const handleLogin = useCallback(() => {
    if (selectedUser) {
      props.dispatch(handleSetAuthedUser(selectedUser));
    }

    if (props.authedUser) {
      navigate("/dashboard");
    }
  }, [props, selectedUser, navigate]);

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <div className="form">
      <div className="input-container">
        <label>Choose an account</label>
        <select
          value={selectedUser ? selectedUser.id : -1}
          name={props.name}
          onChange={handleChange}
          disabled={props.disabled}
        >
          {mappableUsers &&
            mappableUsers.map((value: User, index: number) => (
              <option key={index} value={value.id}>
                {value.name}
              </option>
            ))}
          <option key={-1} value={-1}>
            -
          </option>
        </select>
        <button className="btn" onClick={handleLogin} disabled={!selectedUser}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }: LoginScreenType) => ({
  users,
  authedUser,
});

export default connect(mapStateToProps)(Login);
