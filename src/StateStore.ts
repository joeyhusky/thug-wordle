import create, { GetState, SetState } from "zustand";
import { persist } from "zustand/middleware";
import { createGameStore, GameStore } from "./store/GameStore";
import { createUserStatsStore, UserStatsStore } from "./store/UserStatsStore";

const createRootSlice = (
  set: SetState<RootState>,
  get: GetState<RootState>
) => ({
  ...createGameStore(set, get),
  ...createUserStatsStore(set, get),
});

export type RootState = GameStore & UserStatsStore;

export const useStore = create<RootState>(
  persist((set, get) => createRootSlice(set, get), {
    name: "thug-wordle",
    getStorage: () => localStorage,
  })
);

// useStore.persist.clearStorage();
