import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserData } from "@/lib/models/auth.model";

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
