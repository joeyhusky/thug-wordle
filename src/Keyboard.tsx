import { ColorTailwindHelper } from "./Color";
import { useStore } from "./StateStore";
import { HiOutlineBackspace as BackspaceIcon } from "react-icons/hi";

export const Keyboard: React.FC = () => {
  const keyPressed = useStore((store) => store.letterPressed);
  const backspacePressed = useStore((store) => store.backspacePressed);
  const enterPressed = useStore((store) => store.enterPressed);
  const keyboardLetterState = useStore((store) => store.keyboardLetterState);

  const setShowInvalidGuess = useStore((store) => store.setShowInvalidGuess);

  const keyboardButtonElements: { [key: string]: JSX.Element } = {
    ["Backspace"]: <BackspaceIcon className="h-6 w-6 mx-auto" />,
    ["Enter"]: <div className="px-2">Enter</div>,
  };

  return (
    <div className={"flex flex-col"} id="keyboard">
      {keyboardKeys.map((keyboardRow, rowIdx) => (
        <div key={rowIdx} className={"my-2 flex justify-center space-x-1"}>
          {keyboardRow.map((letter, idx) => {
            let styles =
              "transition ease-in-out hover:scale-110 rounded font-bold uppercase flex-1 py-2 antialiased ";
            let keypressCallback = () => keyPressed(letter);
            if (letter === "Backspace")
              keypressCallback = () => backspacePressed();
            if (letter === "Enter")
              keypressCallback = () => setShowInvalidGuess(enterPressed());
            let letterState = ColorTailwindHelper[keyboardLetterState[letter]];

            if (letterState) {
              styles += letterState;
            } else if (letter !== "") {
              styles += " bg-gray-300";
            }

            return (
              <button
                key={letter + idx}
                className={styles}
                onClick={keypressCallback}
              >
                {keyboardButtonElements[letter] ?? letter}
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
