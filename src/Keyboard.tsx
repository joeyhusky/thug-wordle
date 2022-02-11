import { ColorTailwindHelper } from "./Color";
import { useStore } from "./StateStore";

export const Keyboard: React.FC = () => {
  const keyPressed = useStore((store) => store.letterPressed);
  const backspacePressed = useStore((store) => store.backspacePressed);
  const enterPressed = useStore((store) => store.enterPressed);
  const keyboardLetterState = useStore((store) => store.keyboardLetterState);

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
            let letterState = ColorTailwindHelper[keyboardLetterState[letter]];

            if (letterState) {
              styles += letterState;
            } else if (letter !== "") {
              styles += " bg-gray-300";
            }

            return letter === "Backspace" ? (
              <button
                key={letter + idx}
                className={styles}
                onClick={keypressCallback}
              >
                {backspace}
              </button>
            ) : (
              <button
                key={letter + idx}
                className={styles}
                onClick={keypressCallback}
              >
                {letter === "Backspace" ? backspace : letter}
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

const backspace = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 inline-block m-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
    ></path>
  </svg>
);
