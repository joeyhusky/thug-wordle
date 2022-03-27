class TopGuesses {
  map: Record<string, number>;
  constructor() {
    this.map = {};
  }
  add(word: string) {
    if (this.map[word]) {
      this.map[word]++;
    } else {
      this.map[word] = 1;
    }
    this.pruneList();
  }
  private pruneList() {
    if (Object.keys(this.map).length >= 50) {
      const sorted = Object.keys(this.map).sort(
        (a, b) => this.map[b] - this.map[a]
      );
      delete this.map[sorted[0]];
    }
  }
  getList(): Record<string, number> {
    return this.map;
  }
}

export interface UserStats {
  total_games: number;
  total_wins: number;
  current_streak: number;
  longest_streak: number;
  top_guesses: TopGuesses;
}

export const NEW_USER_STATS: UserStats = {
  total_games: 0,
  total_wins: 0,
  current_streak: 0,
  longest_streak: 0,
  top_guesses: new TopGuesses(),
};
