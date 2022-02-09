import wordbank from "./wordbank.json";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordbank.length);
  return wordbank[randomIndex];
}
