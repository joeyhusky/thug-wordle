import useGameListener from "./GameListener";
import { Keyboard } from "./Keyboard";
import { useStore } from "./StateStore";
import { WordGuess } from "./word-utils";
import { WordRow } from "./WordRow";

export const NUMBER_OF_GUESSES = 6;

export default function App() {
  useGameListener();
  const currentGuess: string = useStore((store) => store.currentGuess);
  const existingGuesses: WordGuess[] = useStore((store) => store.userGuesses);
  const hasWon = useStore((store) => store.hasWon);
  const isGameOver = useStore((store) => store.isGameOver);
  const answer = useStore((store) => store.answer);
  const newGame = useStore((store) => store.newGame);

  let rows: Partial<WordGuess>[] = [...existingGuesses];
  if (rows.length < NUMBER_OF_GUESSES) {
    rows.push({ word: currentGuess });
  }
  const guessesRemaining = NUMBER_OF_GUESSES - existingGuesses.length - 1;
  if (guessesRemaining > 0) {
    rows = rows.concat(Array(guessesRemaining).fill({ word: "" }));
  }

  const renderRows = () => {
    return rows.map((guess, idx) => (
      <WordRow key={idx} letters={guess.word} wordGuess={guess.result} />
    ));
  };

  const maybeRenderNewGameButton = () => {
    return (
      isGameOver && (
        <div
          role="modal"
          className="absolute bg-slate-100 border border-gray-400 left-0 right-0 rounded text-center w-1/3 h-1/3 p-6 mx-auto top-1/4 grid grid-rows-3"
        >
          <b className="text-2xl">{hasWon ? "Nice job sir" : "Game Over"}</b>
          <WordRow letters={answer} className="items-center" />
          <button
            className="border border-green-500 mx-4 bg-green-500 rounded mt-4 shadow"
            onClick={newGame}
          >
            New Game
          </button>
        </div>
      )
    );
  };

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Thug-Wordle</h1>
      </header>
      <main>
        <div className="grid grid-rows-6 gap-4 my-4">{renderRows()}</div>
        <Keyboard />
        {maybeRenderNewGameButton()}
      </main>
    </div>
  );
}
