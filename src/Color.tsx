import { LetterState } from "./word-utils";

export const ColorTailwindHelper = {
  [LetterState.Match]: " border-green-200 bg-green-200",
  [LetterState.Miss]: "border-gray-200 bg-gray-400",
  [LetterState.Present]: "border-yellow-200 bg-yellow-200",
};
