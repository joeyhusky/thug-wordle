import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./StateStore";

const useEventListener = (
  eventName: string,
  handler: React.EventHandler<any>
) => {
  const savedHandler = useRef<React.EventHandler<any>>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: React.KeyboardEvent) =>
      savedHandler.current!(event);
    //@ts-ignore
    window.addEventListener(eventName, eventListener);
    //@ts-ignore
    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName, window]);
};

const useGameListener = () => {
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1000);
    }
    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  const guessLetter = useStore((store) => store.letterPressed);
  const removeLetter = useStore((store) => store.backspacePressed);
  const enterPressed = useStore((store) => store.enterPressed);

  const keyDownListener = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key.charCodeAt(0) >= "a".charCodeAt(0) &&
      event.key.charCodeAt(0) <= "z".charCodeAt(0)
    ) {
      guessLetter(event.key);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      removeLetter();
    } else if (event.key === "Enter") {
      setInvalidGuess(enterPressed());
    }
  };
  useEventListener("keydown", keyDownListener);
  return showInvalidGuess;
};

export default useGameListener;
