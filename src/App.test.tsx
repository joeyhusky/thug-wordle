import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./StateStore";
import { render, screen } from "./test/test-utils";

describe("Simple working test", () => {
  it("renders the title", () => {
    render(<App />);
    expect(screen.getByText(/Thug-Wordle/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    useStore.setState({ userGuesses: [] });
    render(<App />);
    expect(screen.queryByText("Game Over")).toBeNull();
    expect(document.querySelectorAll("main > div")).toHaveLength(2);
  });

  it("shows empty rows in empty state", () => {
    useStore.setState({
      userGuesses: [],
    });
    render(<App />);
    const [grid] = document.querySelectorAll("main > div");
    expect(grid).toBeDefined();
    expect(grid.querySelectorAll("div")).toHaveLength(6);
    const letters = document.querySelectorAll("main > div > div > span");
    expect(letters.length).toBe(30);

    letters.forEach((l) => {
      expect(l.textContent).toEqual("");
    });
  });

  it("shows correct characters with populated state", () => {
    const guess = "rocks";
    useStore.setState({
      userGuesses: [
        { word: guess, result: Array(5).fill(0) },
        { word: guess, result: Array(5).fill(0) },
        { word: guess, result: Array(5).fill(0) },
        { word: guess, result: Array(5).fill(0) },
        { word: guess, result: Array(5).fill(0) },
        { word: guess, result: Array(5).fill(0) },
      ],
    });
    render(<App />);
    const [grid] = document.querySelectorAll("main > div");
    expect(grid).toBeDefined();
    expect(grid.querySelectorAll("div")).toHaveLength(6);
    const letters = document.querySelectorAll("main > div > div > span");
    expect(letters.length).toBe(30);

    letters.forEach((l, idx) => {
      expect(l.textContent).toEqual(guess[idx % 5]);
    });
  });

  it("shows keyboard", () => {
    render(<App />);
    const [, keyboard] = document.querySelectorAll("main > div");
    expect(keyboard).toBeDefined();
    expect(keyboard.querySelectorAll("div")).toHaveLength(3);
  });
});
