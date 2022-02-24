import { describe, expect, it } from "vitest";
import { useStore } from "./StateStore";
import { render } from "./test/test-utils";
import App from "./App";

describe("TimestampListener", () => {
  it("resets the user guesses when the app renders if the day is different from last", () => {
    const guess = "rocks";
    useStore.setState({
      timestamp: 123456,
      userGuesses: [{ word: guess, result: Array(5).fill(0) }],
    });
    render(<App />);
    expect(useStore.getState().userGuesses).toEqual([]);
  });
});
