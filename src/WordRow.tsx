import { useEffect, useState } from "react";
import { ColorTailwindHelper } from "./Color";
import { LetterState } from "./word-utils";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string | undefined;
  wordGuess?: LetterState[];
  className?: string;
}

export const WordRow: React.FC<WordRowProps> = ({
  letters = "",
  wordGuess,
  className = "",
}: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  const currentWord = letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {currentWord.map((char, idx) => {
        const guess = wordGuess?.[idx];
        return <CharacterBox letter={char} guess={guess} key={idx} />;
      })}
    </div>
  );
};

interface CharacterBoxProps {
  guess?: LetterState;
  letter: string;
}

const CharacterBox = (props: CharacterBoxProps) => {
  const [animate, shouldAnimate] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (animate) {
      id = setTimeout(() => shouldAnimate(false), 1000);
    }
    return () => clearTimeout(id);
  }, [animate]);
  useEffect(() => {
    if (props.letter != "") {
      shouldAnimate(true);
    }
  }, [props.letter]);

  let backgroundStyle =
    props.guess != null
      ? `${ColorTailwindHelper[props.guess]}`
      : "border-gray-200 bg-white";

  if (animate) backgroundStyle += " animate-breathe";
  return (
    <span
      key={props.letter}
      className={`border-2 border-gray-500 p-2 uppercase font-bold text-2xl text-center before:inline-block before:content-['_'] ${backgroundStyle} `}
    >
      {props.letter}
    </span>
  );
};
