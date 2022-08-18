import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { User } from "../types/User";
import { handleSetAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

type LoginScreenType = {
  users: User[];
  authedUser: User;
};

const Login = (props: any) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const mappableUsers: User[] = Object.values(props.users);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const user = mappableUsers.find((user) => user.id === event.target.value);
      if (user) {
        setSelectedUser(user);
      } else {
        setSelectedUser(undefined);
      }
    },
    [mappableUsers]
  );

  const handleLogin = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (selectedUser) {
        const userOfChoice = mappableUsers.find(
          (user: User) => user.id === selectedUser.id
        );

        if (userOfChoice) {
          if (userOfChoice.password === password) {
            props.dispatch(handleSetAuthedUser(selectedUser));
          } else {
            alert(
              "The password associated with this account is incorrect, please try again"
            );
            setPassword("");
          }
        }
      }

      if (props.authedUser) {
        navigate("/dashboard");
      }
    },
    [props, password, selectedUser, navigate, mappableUsers]
  );

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleLogin} className="form">
      <div className="input-container">
        <label>Choose an account</label>
        <br />
        <select
          data-testid="account-selection"
          style={{ marginTop: 10, width: 150 }}
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
        <br />
        <input
          style={{ marginTop: 10, marginBottom: 10 }}
          name="password"
          type="password"
          data-testid="password"
          autoComplete="off"
          autoFocus
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <button
          data-testid="submit-button"
          className="btn"
          disabled={!selectedUser || !password}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ users, authedUser }: LoginScreenType) => ({
  users,
  authedUser,
});

export default connect(mapStateToProps)(Login);
