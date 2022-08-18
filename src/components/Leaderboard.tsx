import { connect } from "react-redux";
import { User } from "../types/User";

type LeaderboardProps = {
  users: User[];
};

const Leaderboard = (props: any) => {
  const mappableUsers: User[] = Object.values(props.users);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {mappableUsers &&
            mappableUsers.map((user, index) => (
              <tr key={index}>
                <td style={{ display: "flex" }}>
                  <img
                    className="profile-icon"
                    src={user.avatarURL}
                    alt="profile"
                  />
                  <div style={{ marginTop: 5 }}>
                    <small>
                      <strong>{user.name}</strong>
                    </small>
                    <br />
                    <small>{user.id}</small>
                  </div>
                </td>
                <td>{user.answers ? Object.keys(user.answers).length : 0}</td>
                <td>{user.questions ? user.questions.length : 0}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }: LeaderboardProps) => ({
  users,
});

export default connect(mapStateToProps)(Leaderboard);
