import { useStore } from "../StateStore";
import { WordRow } from "../WordRow";
import norb from "../public/norb.jpg";
import { motion } from "framer-motion";

let preloadedImg;
function preloadImages() {
  preloadedImg = new Image();
  preloadedImg.src = norb;
}
preloadImages();

const GameOverModal: React.FC = () => {
  const newGame = useStore((state) => state.newGame);
  const answer = useStore((state) => state.answer);
  const hasWon = useStore((state) => state.hasWon);

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
      className="absolute shadow-xl bg-slate-100 border border-gray-400 rounded text-center flex flex-col space-y-6 w-11/12 p-6 left-0 right-0 mx-auto top-12 md:top-24"
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
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 border border-blue-700 rounded mx-4 w-11/12 h-14 mt-4"
        onClick={newGame}
      >
        New Game
      </button>
    </motion.div>
  );
};

export default GameOverModal;
