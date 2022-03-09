import { useStore } from "./StateStore";
import { WordRow } from "./WordRow";
import norb from "./public/norb.jpg";

const GameOverModal: React.FC = () => {
  const newGame = useStore((state) => state.newGame);
  const answer = useStore((state) => state.answer);
  const hasWon = useStore((state) => state.hasWon);
  return (
    <div
      role="modal"
      className="absolute shadow-xl bg-slate-100 border border-gray-400 rounded text-center flex flex-col space-y-6 w-11/12 p-6 left-0 right-0 mx-auto top-24"
    >
      <b className="text-4xl">
        {hasWon ? "Nice Work Norberdler!" : "Game Over"}
      </b>
      <img src={norb} />
      <WordRow
        letters={answer}
        shouldBreathe={false}
        className="items-center"
      />
      <button
        className="border border-green-500 mx-4 bg-green-500 rounded w-11/12 h-14 mt-4 shadow"
        onClick={newGame}
      >
        New Game
      </button>
    </div>
  );
};

export default GameOverModal;
