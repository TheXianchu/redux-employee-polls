import { Link, NavLink } from "react-router-dom";
import { User } from "../types/User";
import { connect } from "react-redux";
import { useCallback } from "react";
import { handleUnsetAuthedUser } from "../actions/authedUser";

type NavProps = {
  authedUser: User;
  loggedIn: boolean;
};

const Nav = (props: any) => {
  const handleLogout = useCallback(() => {
    props.dispatch(handleUnsetAuthedUser());
  }, [props]);

  return (
    <nav id="nav">
      <ul className="nav-ul">
        <li className="nav-li">
          {props.loggedIn && (
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/dashboard"
            >
              Home
            </NavLink>
          )}
        </li>
        <li className="nav-li">
          {props.loggedIn && (
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/new"
            >
              New Question
            </NavLink>
          )}
        </li>
        <li className="nav-li float-right">
          {props.loggedIn ? (
            <div className="profile-item"></div>
          ) : (
            <NavLink to="/">Login</NavLink>
          )}
        </li>
        <li className="nav-li float-right">
          {props.loggedIn && (
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              onClick={handleLogout}
              to="#"
            >
              Logout
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }: NavProps) => ({
  loggedIn: Object.keys(authedUser).length !== 0,
  authedUser,
});

export default connect(mapStateToProps)(Nav);
