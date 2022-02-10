import { describe, expect, it } from "vitest";
import { computeGuess, getRandomWord, LetterState } from "./word-utils";

describe("word utils", () => {
  it("gets a random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

describe("computeGuess", () => {
  it("populates a WordGuess with LetterState and letter", () => {
    expect(computeGuess("album", "suave")).toEqual([
      { letter: "a", guessState: LetterState.Present },
      { letter: "l", guessState: LetterState.Miss },
      { letter: "b", guessState: LetterState.Miss },
      { letter: "u", guessState: LetterState.Present },
      { letter: "m", guessState: LetterState.Miss },
    ]);
  });

  it("handles single present", () => {
    const expectedResult: LetterState[] = [
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ];
    expect(
      computeGuess("allow", "suave").map((guessData) => guessData.guessState)
    ).toEqual(expectedResult);
  });

  it("handles all misses", () => {
    const expectedResult: LetterState[] = [
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ];
    expect(
      computeGuess("nnnnn", "suave").map((guessData) => guessData.guessState)
    ).toEqual(expectedResult);
  });

  it("handles complex match", () => {
    expect(
      computeGuess("dsase", "suese").map((guessData) => guessData.guessState)
    ).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  it("handles full match ", () => {
    const expectedResult: LetterState[] = [
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ];
    expect(
      computeGuess("suave", "suave").map((guessData) => guessData.guessState)
    ).toEqual(expectedResult);
  });

  it("handles one match when two letters are present", () => {
    expect(
      computeGuess("solid", "boost").map((guessData) => guessData.guessState)
    ).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it("when two letters are present but answer has only one letter", () => {
    expect(
      computeGuess("allol", "smelt").map((guessData) => guessData.guessState)
    ).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it("when 1 letter matches but guess has more of the same letter", () => {
    expect(
      computeGuess("allol", "colon").map((guessData) => guessData.guessState)
    ).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
    ]);
  });
});
