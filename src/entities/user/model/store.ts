import { create } from "zustand";
import type { User } from "./types";

interface UserState {
  currentUser: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
}));
