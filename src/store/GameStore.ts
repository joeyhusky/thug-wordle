import { GetState, SetState } from "zustand";
import { NUMBER_OF_GUESSES } from "../App";
import { RootState } from "../StateStore";
import {
  computeGuess,
  getRandomWord,
  isValidWord,
  LetterState,
  WordGuess,
} from "../word-utils";

export interface GameStore {
  timestamp: number;
  currentGuess: string;
  answer: string;
  userGuesses: WordGuess[];
  isGameOver: boolean;
  hasWon: boolean;
  keyboardLetterState: Record<string, LetterState>;
  showInvalidGuess: boolean;

  setShowInvalidGuess: (show: boolean) => void;
  newGame: () => void;
  letterPressed: (guess: string) => void;
  enterPressed: () => boolean;
  backspacePressed: () => void;
}

export const createGameStore = (
  set: SetState<RootState>,
  get: GetState<RootState>
) => ({
  timestamp: Date.now(),
  currentGuess: "",
  answer: getRandomWord(),
  userGuesses: [],
  isGameOver: false,
  hasWon: false,
  keyboardLetterState: {},
  showInvalidGuess: false,
  setShowInvalidGuess: (shouldShow: boolean) => {
    set((_) => ({ showInvalidGuess: shouldShow }));
  },
  newGame: () => {
    set((_) => ({
      isGameOver: false,
      userGuesses: [],
      answer: getRandomWord(),
      hasWon: false,
      keyboardLetterState: {},
      currentGuess: "",
    }));
  },
  enterPressed: () => {
    const state = get();
    if (state.isGameOver) {
      state.newGame();
      return false;
    }

    if (!isValidWord(state.currentGuess)) {
      return true;
    }
    if (state.answer === state.currentGuess) {
      set(() => ({ isGameOver: true, hasWon: true }));
      state.updateUserStats();
    } else if (state.userGuesses.length === NUMBER_OF_GUESSES - 1) {
      set(() => ({ isGameOver: true, hasWon: false }));
      state.updateUserStats();
    }
    const keyboardLetterState = state.keyboardLetterState;
    const guess = computeGuess(state.currentGuess, state.answer);

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
        ...state.keyboardLetterState,
      },
      currentGuess: "",
    }));
    return false;
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
});
