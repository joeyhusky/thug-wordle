import { useCallback, useState } from "react";
import { StatsButton } from "./components/StatsButton";
import useGameListener from "./GameListener";
import GameOverModal from "./components/GameOverModal";
import { Keyboard } from "./components/Keyboard";
import { useStore } from "./StateStore";
import { useTimestampListener } from "./TimestampListener";
import UserStatsModalDialog from "./UserStatistics/UserStatsModalDialog";
import { WordGuess } from "./word-utils";
import { WordRow } from "./WordRow";
import { AnimatePresence } from "framer-motion";

export const NUMBER_OF_GUESSES = 6;
export const TITLE = "Norberdle";
const SUBTITLE = "a wordle clone";

export default function App() {
  useTimestampListener();
  const showInvalidGuess = useGameListener();
  const currentGuess: string = useStore((store) => store.currentGuess);
  const existingGuesses: WordGuess[] = useStore((store) => store.userGuesses);
  const isGameOver = useStore((store) => store.isGameOver);
  const [showStats, setShowStats] = useState(false);
  const closeStats = useCallback(() => setShowStats(false), []);

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
      <WordRow
        key={idx}
        rowKey={idx}
        letters={guess.word}
        wordGuess={guess.result}
        className={
          showInvalidGuess && idx === existingGuesses.length ? "animate" : ""
        }
      />
    ));
  };

  return (
    <AnimatePresence>
      <div className="mx-auto relative w-96 px-2 lg:px-0">
        <header className="border-b border-gray-500 pb-2 my-2">
          <h1 className="text-4xl text-center">{TITLE}</h1>
          <h2 className="text-sm text-center">{SUBTITLE}</h2>
          <StatsButton isShowingStats={showStats} setShowStats={setShowStats} />
        </header>
        <main className="grid grid-rows-6 gap-4 my-4">{renderRows()}</main>
        <Keyboard />
        {showStats && <UserStatsModalDialog close={closeStats} />}
        {isGameOver && <GameOverModal />}
      </div>
    </AnimatePresence>
  );
}
