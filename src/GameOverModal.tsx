import { useStore } from "./StateStore";
import { WordRow } from "./WordRow";

interface GameOverModalProps {
  answer: string;
  hasWon: boolean;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ answer, hasWon }) => {
  const newGame = useStore((state) => state.newGame);
  return (
    <div
      role="modal"
      className="absolute shadow-xl bg-slate-100 border border-gray-400 rounded text-center w-11/12 h-1/2 p-6 left-0 right-0 mx-auto top-1/4 grid grid-rows-3"
    >
      <b className="text-2xl">{hasWon ? "Nice job sir" : "Game Over"}</b>
      <WordRow
        letters={answer}
        shouldBreathe={false}
        className="items-center"
      />
      <button
        className="border border-green-500 mx-4 bg-green-500 rounded mt-4 shadow"
        onClick={newGame}
      >
        New Game
      </button>
    </div>
  );
};

export default GameOverModal;
