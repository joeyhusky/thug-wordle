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
    expect(document.querySelectorAll("main div")).toHaveLength(11);
  });
});
