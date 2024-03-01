import { create } from "zustand";
import { Doc } from "../../convex/_generated/dataModel";

interface State {
  currentUser: Doc<"synchubAccount"> | null;
  setUser: (user: Doc<"synchubAccount"> | null) => void;
}

export const useCurrentUser = create<State>((set) => ({
  currentUser: null,
  setUser: (currentUser) => set({ currentUser }),
}));
