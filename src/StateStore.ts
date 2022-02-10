import create from "zustand";
import wordbank from "./wordbank.json";
import {
  computeGuess,
  getRandomWord,
  LetterState,
  WordGuess,
} from "./word-utils";
import { NUMBER_OF_GUESSES } from "./App";

interface StateStore {
  dictionary: Set<string>;
  currentGuess: string;
  answer: string;
  userGuesses: WordGuess[];
  isGameOver: boolean;
  hasWon: boolean;
  keyboardLetterState: Record<string, LetterState>;

  letterPressed: (guess: string) => void;
  enterPressed: () => void;
  backspacePressed: () => void;
}

export const useStore = create<StateStore>((set, get) => ({
  dictionary: new Set(wordbank.valid),
  currentGuess: "",
  answer: getRandomWord(),
  userGuesses: [],
  isGameOver: false,
  hasWon: false,
  keyboardLetterState: {},
  enterPressed: () => {
    if (
      !isValidWord(
        get().currentGuess,
        get().dictionary,
        get().userGuesses.map((g) => g.word)
      )
    ) {
      return;
    }
    if (get().answer === get().currentGuess) {
      set(() => ({ isGameOver: true, hasWon: true }));
    } else if (get().userGuesses.length === NUMBER_OF_GUESSES - 1) {
      set(() => ({ isGameOver: true, hasWon: false }));
    }
    const keyboardLetterState = get().keyboardLetterState;
    const guess = computeGuess(get().currentGuess, get().answer);
    // TODO Update keyboard letter state logic
    guess.result.map((l, idx) => {
      const guessedLetter = guess.word[idx];

      const curLetterState = keyboardLetterState[guessedLetter];
      switch (curLetterState) {
        case LetterState.Match:
          break;
        case LetterState.Miss:
          break;
        case LetterState.Present:
          if (l === LetterState.Match) {
            keyboardLetterState[guessedLetter] = l;
          }
          break;

        default:
          keyboardLetterState[guessedLetter] = l;
      }
    });
    set((state) => ({
      userGuesses: [...state.userGuesses, guess],
      keyboardLetterState: {
        ...get().keyboardLetterState,
      },
      currentGuess: "",
    }));
  },
  letterPressed: (letter: string) => {
    if (letter.length !== 1 || get().currentGuess.length === 5) {
      return;
    }
    set((state) => ({
      currentGuess: state.currentGuess + letter,
    }));
  },

  backspacePressed: () => {
    set((state) => ({
      currentGuess: state.currentGuess.substring(
        0,
        state.currentGuess.length - 1
      ),
    }));
  },
}));

const isValidWord = (
  word: string,
  wordBank: Set<string>,
  previousGuesses: string[]
): boolean => {
  if (word.length !== 5) return false;
  if (previousGuesses.some((v) => v === word)) {
    alert("you've already guessed this word!");
    return false;
  }
  if (!wordBank.has(word)) {
    alert("not a valid word!");
    return false;
  }
  return true;
};
