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

export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const result: LetterState[] = [];

  const answerArray = answer.split("");
  const guessArray = guess.split("");

  guessArray.forEach((letter, idx) => {
    if (letter === answerArray[idx]) result.push(LetterState.Match);
    else if (answerArray.includes(letter)) result.push(LetterState.Present);
    else result.push(LetterState.Miss);
  });
  return result;
};
