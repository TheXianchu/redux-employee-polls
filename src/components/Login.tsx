import { ChangeEvent, useCallback, useState } from "react";
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

  const [selectedUser, setSelectedUser] = useState<User | Record<any, never>>(
    {}
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const user = mappableUsers.find((user) => user.id === event.target.value);
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser({});
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

  return (
    <div className="form">
      <div className="input-container">
        <label>Choose an account</label>
        <select
          value={selectedUser.id ? selectedUser.id : "-"}
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
