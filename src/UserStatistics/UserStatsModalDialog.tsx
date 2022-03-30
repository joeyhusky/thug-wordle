import Modal from "../components/Modal";
import { useUserStats } from "../store/UserStatsStore";

type UserStatsModalProps = { close: () => void };

function UserStatsModalDialog(props: UserStatsModalProps): JSX.Element {
  const stats = useUserStats();

  return (
    <Modal>
      <ul>
        <li>{`Total games: ${stats.total_games}`}</li>
        <li>{`Wins: ${stats.total_wins}`}</li>
        <li>{`Longest streak: ${stats.longest_streak}`}</li>
        <li>{`Current streak: ${stats.current_streak}`}</li>
      </ul>
      <button
        onClick={() => props.close()}
        className="border-solid border-2 border-gray-400 mx-4 bg-gray-200 rounded w-11/12 h-14 mt-4 shadow"
      >
        Close
      </button>
    </Modal>
  );
}

export default UserStatsModalDialog;
