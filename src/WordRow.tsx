const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}
export const WordRow: React.FC<WordRowProps> = ({
  letters = "",
}: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  const currentWord = letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  return (
    <div className="grid grid-cols-5 gap-4">
      {currentWord.map((char) => (
        <CharacterBox value={char} />
      ))}
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
