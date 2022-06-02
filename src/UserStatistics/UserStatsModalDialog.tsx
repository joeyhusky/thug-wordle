import { useUserStats } from "../store/UserStatsStore";
import { motion } from "framer-motion";

type UserStatsModalProps = { close: () => void };

function UserStatsModalDialog(props: UserStatsModalProps): JSX.Element {
  const stats = useUserStats();
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      role="modal"
      className="absolute shadow-xl bg-slate-100 border border-gray-400 rounded text-center flex flex-col space-y-6 w-11/12 p-6 left-0 right-0 mx-auto top-24"
    >
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
    </motion.div>
  );
}

export default UserStatsModalDialog;
