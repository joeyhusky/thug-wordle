import { prependOnceListener } from "process";
import { useState } from "react";
import { useStore } from "./StateStore";
import { LetterState } from "./word-utils";

export const Keyboard: React.FC = () => {
  const keyPressed = useStore((store) => store.letterPressed);
  const backspacePressed = useStore((store) => store.backspacePressed);
  const enterPressed = useStore((store) => store.enterPressed);
  const [keyGuesses, setKeyGuesses] = useState<Record<string, LetterState>>({});

  return (
    <div className={"flex flex-col"}>
      {keyboardKeys.map((keyboardRow, rowIdx) => (
        <div key={rowIdx} className={"my-2 flex justify-center space-x-1"}>
          {keyboardRow.map((letter, idx) => {
            let styles = "rounded font-bold uppercase flex-1 py-2";
            let keypressCallback = () => keyPressed(letter);
            if (letter === "Backspace")
              keypressCallback = () => backspacePressed();
            if (letter === "Enter") keypressCallback = () => enterPressed();

            return (
              <button
                key={letter + idx}
                className={styles}
                onClick={keypressCallback}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];
