import { create } from "zustand";

interface CursorStore {
  cursorVariant: string;
  setCursorVariant: (cursorVariant: string) => void;
  cursorText: string;
  setCursorText: (cursorText: string) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursorVariant: "default",
  setCursorVariant: (cursorVariant: string) => set({ cursorVariant }),
  cursorText: "",
  setCursorText: (cursorText: string) => set({ cursorText })
}));
