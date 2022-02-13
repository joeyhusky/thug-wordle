import wordbank from "./wordbank.json";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordbank.valid.length);
  return wordbank.valid[randomIndex];
}

export const isValidWord = (word: string): boolean => {
  if (word.length !== 5) return false;
  if (wordbank.valid.concat(wordbank.invalid).includes(word)) {
    return true;
  }
  return false;
};

export type WordGuess = {
  word: string;
  result: LetterState[];
};

export enum LetterState {
  Miss,
  Present,
  Match,
}

export const computeGuess = (guess: string, answer: string): WordGuess => {
  const result: { guessState: LetterState; letter: string }[] = [];
  const answerArray = answer.split("");
  const guessArray = guess.split("");

  const answerLetterCount: Record<string, number> = {};
  answerArray.forEach((letter) => {
    if (letter in answerLetterCount) {
      answerLetterCount[letter] += 1;
    } else answerLetterCount[letter] = 1;
  });

  guessArray.forEach((letter, idx) => {
    if (letter === answerArray[idx]) {
      result.push({ guessState: LetterState.Match, letter: letter });
      answerLetterCount[letter] -= 1;
    } else if (answerArray.includes(letter)) {
      result.push({ guessState: LetterState.Present, letter: letter });
    } else result.push({ guessState: LetterState.Miss, letter: letter });
  });

  result.forEach((ans) => {
    if (ans.guessState === LetterState.Present) {
      if (answerLetterCount[ans.letter] > 0) {
        answerLetterCount[ans.letter] -= 1;
      } else {
        ans.guessState = LetterState.Miss;
      }
    }
  });

  return { result: result.map((r) => r.guessState), word: guess };
};
