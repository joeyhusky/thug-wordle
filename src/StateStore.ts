import create from "zustand";
import wordbank from "./wordbank.json";
import { computeGuess, LetterState, WordGuess } from "./word-utils";

interface StateStore {
  dictionary: Set<string>;
  currentGuess: string;
  answer: string;
  userGuesses: WordGuess[];
  hasWon: boolean;
  keyboardLetterState: Record<string, LetterState>;

  letterPressed: (guess: string) => void;
  enterPressed: () => void;
  backspacePressed: () => void;
}

export const useStore = create<StateStore>((set, get) => ({
  dictionary: new Set(wordbank),
  currentGuess: "",
  answer: "great",
  userGuesses: [],
  hasWon: false,
  keyboardLetterState: {},
  enterPressed: () => {
    if (get().currentGuess.length !== 5) return;
    if (
      get().userGuesses.some(
        (v) => v.map((g) => g.letter).join("") === get().currentGuess
      )
    ) {
      alert("you've already guessed this word!");
      return;
    }
    if (!get().dictionary.has(get().currentGuess)) {
      alert("not a valid word!");
      return;
    }
    if (get().answer === get().currentGuess) {
      set(() => ({ hasWon: true }));
    }
    const keyboardLetterState = get().keyboardLetterState;
    const result = computeGuess(get().currentGuess, get().answer);
    // TODO Update keyboard letter state logic
    // result.forEach((l, idx) => {
    //   const guessedLetter = l.letter;

    //   const curLetterState = keyboardLetterState[guessedLetter];
    //   switch (curLetterState) {
    //     case LetterState.Match:
    //       break;
    //   }
    // });
    set((state) => ({
      userGuesses: [...state.userGuesses, result],
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
