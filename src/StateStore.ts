import create from "zustand";
import { computeGuess, LetterState } from "./word-utils";

type UserGuess = LetterState[];

interface StateStore {
  answer: string;
  userGuesses: UserGuess[];
  addGuess: (guess: string) => void;
}

const useStore = create<StateStore>((set) => ({
  answer: "potot",
  userGuesses: [],
  addGuess: (guess: string) => {
    set((state) => ({
      userGuesses: [...state.userGuesses, computeGuess(guess, state.answer)],
    }));
  },
}));
