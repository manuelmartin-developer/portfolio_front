import { create } from "zustand";

interface AdminStore {
  isAdminLoggedIn: boolean;
  setAdminLoggedIn: (isAdminLoggedIn: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAdminLoggedIn: false,
  setAdminLoggedIn: (isAdminLoggedIn: boolean) => set({ isAdminLoggedIn })
}));
