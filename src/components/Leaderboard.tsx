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
            mappableUsers.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.answers.length}</td>
                <td>{user.questions.length}</td>
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
