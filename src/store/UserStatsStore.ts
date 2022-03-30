import { GetState, SetState } from "zustand";
import { RootState, useStore } from "../StateStore";
import { NEW_USER_STATS, UserStats } from "../UserStatistics/UserStatsModel";

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
    set((_) => ({
      userStats: {
        ...state.userStats,
        total_games: state.userStats.total_games + 1,
        total_wins: state.userStats.total_wins + (state.hasWon ? 1 : 0),
        current_streak: state.hasWon ? state.userStats.current_streak + 1 : 0,
        longest_streak: Math.max(
          state.userStats.longest_streak,
          state.userStats.current_streak
        ),
      },
    }));
  },
});

export const useUserStats = () => useStore((store) => store.userStats);
