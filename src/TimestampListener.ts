import { useEffect } from "react";
import { useStore } from "./StateStore";

export const useTimestampListener = () => {
  const lastTimestamp = useStore((store) => store.timestamp);
  const newGame = useStore((store) => store.newGame);
  useEffect(() => {
    const now = Date.now();
    if (lastTimestamp && now) {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const lastPlayed = new Date(lastTimestamp);
      const today = new Date(now);
      if (
        lastPlayed.toLocaleDateString(undefined, options) !==
        today.toLocaleDateString(undefined, options)
      ) {
        newGame();
      }
    }
  }, []);
};
