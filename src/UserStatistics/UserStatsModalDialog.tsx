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
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 border border-blue-700 rounded mx-4 w-11/12 h-14 mt-4"
      >
        Close
      </button>
    </Modal>
  );
}

export default UserStatsModalDialog;

// bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 border border-blue-700 rounded
