import { create } from "zustand";
import Cookies from "js-cookie";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserData {
  username: string;
  email: string;
}

interface UserState {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: (user: UserData | null) => {
        set({ user });
      },
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
