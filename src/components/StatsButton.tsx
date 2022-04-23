import { useStore } from "../StateStore";
import { IoStatsChart } from "react-icons/io5";

export function StatsButton(props: {
  setShowStats: (show: boolean) => void;
}): JSX.Element {
  const isGameOver = useStore((store) => store.isGameOver);
  const disabledClass = "opacity-50 cursor-not-allowed";
  let buttonClass =
    "absolute right-0 top-1 text-xs bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 border border-blue-700 rounded ";
  if (isGameOver) buttonClass += disabledClass;
  return (
    <button
      className={buttonClass}
      disabled={isGameOver}
      onClick={() => props.setShowStats(true)}
    >
      <IoStatsChart className="h-4 w-4 mx-auto" />
    </button>
  );
}
