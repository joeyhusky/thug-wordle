import GameListener from "./GameListener";
import { useStore } from "./StateStore";
import { WordRow } from "./WordRow";

export default function App() {
  const currentGuess = useStore((store) => store.currentGuess);
  const existingGuesses = useStore((store) => store.userGuesses);
  const hasWon = useStore((store) => store.hasWon);
  const maybeRenderAdditionalRow = () => {
    const isCurrentlyGuessing = existingGuesses.length < 6;
    if (isCurrentlyGuessing) {
      return (
        <WordRow key={existingGuesses.length + 1} letters={currentGuess} />
      );
    }
  };
  const renderGameOver = () => {
    if (hasWon) {
      return <span className="uppercase text-lime-400">Nice job!</span>;
    }
  };
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Thug-Wordle</h1>
      </header>
      <main className="grid grid-rows-6 gap-4 my-4">
        <GameListener>
          {existingGuesses.map((guess, idx) => (
            <WordRow
              key={idx}
              letters={guess.map((g) => g.letter).join("")}
              wordGuess={guess.map((g) => g.guessState)}
            />
          ))}
          {maybeRenderAdditionalRow()}
          {renderGameOver()}
        </GameListener>
      </main>
    </div>
  );
}
