import wordbank from "./wordbank.json";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordbank.length);
  return wordbank[randomIndex];
}

export type WordGuess = LetterGuessed[];

interface LetterGuessed {
  letter: string;
  guessState: LetterState;
}

export enum LetterState {
  Miss,
  Present,
  Match,
}

export const computeGuess = (guess: string, answer: string): WordGuess => {
  const result: LetterGuessed[] = [];

  const answerArray = answer.split("");
  const guessArray = guess.split("");

  guessArray.forEach((letter, idx) => {
    if (letter === answerArray[idx])
      result.push({ guessState: LetterState.Match, letter: letter });
    else if (answerArray.includes(letter))
      result.push({ guessState: LetterState.Present, letter: letter });
    else result.push({ guessState: LetterState.Miss, letter: letter });
  });
  return result;
};
