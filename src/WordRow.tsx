import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { ColorTailwindHelper } from "./Color";
import { LetterState } from "./word-utils";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string | undefined;
  wordGuess?: LetterState[];
  className?: string;
  shouldBreathe?: boolean;
  rowKey: number;
}

export const WordRow: React.FC<WordRowProps> = ({
  letters = "",
  wordGuess,
  className = "",
  shouldBreathe = true,
  rowKey,
}: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  const currentWord = letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {currentWord.map((char, idx) => {
        const guess = wordGuess?.[idx];
        return (
          <CharacterBox
            letter={char}
            guess={guess}
            shouldBreathe={shouldBreathe}
            rowKey={rowKey}
            colKey={idx}
          />
        );
      })}
    </div>
  );
};

interface CharacterBoxProps {
  guess?: LetterState;
  letter: string;
  shouldBreathe?: boolean;
  colKey: number;
  rowKey: number;
}

const variants: Variants = {
  hidden: {
    y: "-75vh",
  },
};

const CharacterBox = (props: CharacterBoxProps) => {
  const controls = useAnimation();
  useEffect(() => {
    if (!props.shouldBreathe) return;
    const delay = props.rowKey * 5 + props.colKey;
    controls.set(variants.hidden);
    controls.start({
      transition: {
        delay: delay * 0.05,
      },
      opacity: 1,
      y: 0,
    });
  }, []);

  useEffect(() => {
    if (props.letter && props.shouldBreathe) {
      controls.start((i) => ({
        scale: [1, 1.1, 1],
        transition: {
          type: "spring",
          duration: 0.3,
        },
      }));
    }
  }, [props.letter]);

  const backgroundStyle =
    props.guess != null
      ? `${ColorTailwindHelper[props.guess]}`
      : "border-gray-200 bg-white";

  const letterBox = (
    <motion.span
      animate={controls}
      key={props.letter}
      className={`border-2 border-gray-500 p-2 uppercase font-bold text-2xl text-center before:inline-block before:content-['_'] ${backgroundStyle} `}
    >
      {props.letter}
    </motion.span>
  );

  return letterBox;
};
