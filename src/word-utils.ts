import wordbank from "./wordbank.json";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordbank.length);
  return wordbank[randomIndex];
}

export enum LetterState {
  Miss,
  Present,
  Match,
}

export const computeGuess = (guess: string, wordStr: string): LetterState[] => {
  const result: LetterState[] = [];

  const answerArray = wordStr.split("");
  const guessArray = guess.split("");

  guessArray.forEach((letter, idx) => {
    if (letter === answerArray[idx]) result.push(LetterState.Match);
    else if (answerArray.includes(letter)) result.push(LetterState.Present);
    else result.push(LetterState.Miss);
  });
  return result;
};
