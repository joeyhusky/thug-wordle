import { describe, expect, it } from "vitest";
import { computeGuess, getRandomWord, LetterState } from "./word-utils";

describe("word utils", () => {
  it("gets a random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

const TEST_ANSWER = "suave";
describe("computeGuess", () => {
  it("handles single present", () => {
    const guess = "allow";
    const expectedResult: LetterState[] = [
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ];
    expect(computeGuess(guess, TEST_ANSWER)).toEqual(expectedResult);
  });

  it("handles all misses", () => {
    const guess = "nnnnn";
    const expectedResult: LetterState[] = [
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ];
    expect(computeGuess(guess, TEST_ANSWER)).toEqual(expectedResult);
  });

  it("handles complex match", () => {
    const TEST_ANSWER = "suese";
    const guess = "dsase";
    const expectedResult: LetterState[] = [
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
    ];
    expect(computeGuess(guess, TEST_ANSWER)).toEqual(expectedResult);
  });

  it("handles full match ", () => {
    const guess = "suave";
    const expectedResult: LetterState[] = [
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ];
    expect(computeGuess(guess, TEST_ANSWER)).toEqual(expectedResult);
  });
});
