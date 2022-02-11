import GameListener from "./GameListener";
import { Keyboard } from "./Keyboard";
import { useStore } from "./StateStore";
import { WordGuess } from "./word-utils";
import { WordRow } from "./WordRow";

export const NUMBER_OF_GUESSES = 6;

export default function App() {
  const currentGuess: string = useStore((store) => store.currentGuess);
  const existingGuesses: WordGuess[] = useStore((store) => store.userGuesses);
  const hasWon = useStore((store) => store.hasWon);
  const isGameOver = useStore((store) => store.isGameOver);
  const renderGameOver = () => {
    if (isGameOver) {
      return hasWon ? (
        <span className="uppercase text-lime-400"></span>
      ) : (
        <span className="uppercase text-red-400">GG</span>
      );
    }
  };

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

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Thug-Wordle</h1>
      </header>
      <main className="grid grid-rows-6 gap-4 my-4">
        <GameListener>
          {renderRows()}
          {renderGameOver()}
          <Keyboard />
        </GameListener>
      </main>
    </div>
  );
}
