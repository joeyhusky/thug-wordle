import create from "zustand";
import { persist } from "zustand/middleware";
import wordbank from "./wordbank.json";
import {
  computeGuess,
  getRandomWord,
  isValidWord,
  LetterState,
  WordGuess,
} from "./word-utils";
import { NUMBER_OF_GUESSES } from "./App";

interface StateStore {
  currentGuess: string;
  answer: string;
  userGuesses: WordGuess[];
  isGameOver: boolean;
  hasWon: boolean;
  keyboardLetterState: Record<string, LetterState>;

  newGame: () => void;
  letterPressed: (guess: string) => void;
  enterPressed: () => void;
  backspacePressed: () => void;
}

export const useStore = create<StateStore>(
  persist(
    (set, get) => ({
      currentGuess: "",
      answer: getRandomWord(),
      userGuesses: [],
      isGameOver: false,
      hasWon: false,
      keyboardLetterState: {},
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
        if (!isValidWord(state.currentGuess)) {
          return;
        }
        if (state.answer === state.currentGuess) {
          set(() => ({ isGameOver: true, hasWon: true }));
        } else if (state.userGuesses.length === NUMBER_OF_GUESSES - 1) {
          set(() => ({ isGameOver: true, hasWon: false }));
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
    }),
    {
      name: "thug-wordle",
      getStorage: () => localStorage,
    }
  )
);
