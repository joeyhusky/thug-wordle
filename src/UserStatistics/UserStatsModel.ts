export interface UserStats {
  total_games: number;
  total_wins: number;
  current_streak: number;
  longest_streak: number;
}

export const NEW_USER_STATS: UserStats = {
  total_games: 0,
  total_wins: 0,
  current_streak: 0,
  longest_streak: 0,
};
