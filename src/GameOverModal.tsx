import { useStore } from "./StateStore";
import { WordRow } from "./WordRow";
import norb from "./public/norb.jpg";
import Modal from "./components/Modal";

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
    <Modal>
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
    </Modal>
  );
};

export default GameOverModal;
