import { LetterState } from "./word-utils";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
  wordGuess?: LetterState[];
}

export const WordRow: React.FC<WordRowProps> = (props: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - props.letters.length;
  const currentWord = props.letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  return (
    <div className="grid grid-cols-5 gap-4 my-2">
      {currentWord.map((char, idx) => {
        const guess = props.wordGuess?.[idx];
        return <CharacterBox letter={char} guess={guess} key={idx} />;
      })}
    </div>
  );
};

interface CharacterBoxProps {
  guess?: LetterState;
  letter: string;
}
const ColorTailwindHelper = {
  [LetterState.Match]: " border-green-200 bg-green-200",
  [LetterState.Miss]: "border-gray-200 bg-gray-200",
  [LetterState.Present]: "border-yellow-200 bg-yellow-200",
};

const CharacterBox = (props: CharacterBoxProps) => {
  const backgroundStyle =
    props.guess != null
      ? `${ColorTailwindHelper[props.guess]}`
      : "border-gray-200";

  return (
    <span
      key={props.letter}
      className={`border-2 border-gray-500 p-2 uppercase font-bold text-2xl text-center before:inline-block before:content-['_'] ${backgroundStyle} `}
    >
      {props.letter}
    </span>
  );
};
