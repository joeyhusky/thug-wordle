import { GetState, SetState } from "zustand";
import { RootState } from "../StateStore";
import { NEW_USER_STATS, UserStats } from "./UserStatsModel";

export interface UserStatsStore {
  userStats: UserStats;
  updateUserStats: () => void;
}

export const createUserStatsStore = (
  set: SetState<RootState>,
  get: GetState<RootState>
) => ({
  userStats: NEW_USER_STATS,
  updateUserStats: () => {
    const state = get();
    const topGuesses = state.userStats.top_guesses;
    state.userGuesses.forEach(({ word }) => topGuesses.add(word));
    set((_) => ({
      userStats: {
        ...state.userStats,
        total_games: state.userStats.total_games + 1,
        total_wins: state.userStats.total_wins + (state.hasWon ? 1 : 0),
        current_streak: state.hasWon ? state.userStats.current_streak + 1 : 0,
        longest_streak:
          state.userStats.longest_streak < state.userStats.current_streak
            ? state.userStats.current_streak
            : state.userStats.longest_streak,
        top_guesses: topGuesses,
      },
    }));
    console.log(state.userStats);
  },
});
