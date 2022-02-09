import { useStore } from "./StateStore";
import { WordGuess } from "./word-utils";

const LETTER_LENGTH = 5;

interface WordRowProps {
  rowNumber: number;
}

export const WordRow: React.FC<WordRowProps> = (props: WordRowProps) => {
  const isActivelyGuessing =
    useStore((store) => store.userGuesses.length) === props.rowNumber;
  const letters = useStore((store) => store.currentGuess);

  if (!isActivelyGuessing) {
    return null;
  }

  const lettersRemaining = LETTER_LENGTH - letters.length;
  const currentWord = letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      {currentWord.map((char, idx) =>
        char ? (
          <CharacterBox value={char} key={idx} />
        ) : (
          <EmptyCharacterBox key={idx} />
        )
      )}
    </div>
  );
};

interface CharacterBoxProps {
  value: string;
}
const CharacterBox = ({ value }: CharacterBoxProps) => {
  return (
    <div
      key={value}
      className="inline-block border-2 border-gray-500 p-4 uppercase font-bold text-2xl text-center"
    >
      {value}
    </div>
  );
};

const EmptyCharacterBox = () => {
  return <div className="inline-block border-2 border-gray-500 h-18 w-15" />;
};
