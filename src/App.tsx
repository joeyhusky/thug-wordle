import GameListener from "./GameListener";
import { WordRow } from "./WordRow";

export default function App() {
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Thug-Wordle</h1>
      </header>
      <main>
        <GameListener>
          <WordRow key={0} rowNumber={0} />
          <WordRow key={1} rowNumber={1} />
          <WordRow key={2} rowNumber={2} />
          <WordRow key={3} rowNumber={3} />
          <WordRow key={4} rowNumber={4} />
        </GameListener>
      </main>
    </div>
  );
}
