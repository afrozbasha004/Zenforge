import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user:          User | null;
  isInitialized: boolean;
  loading:       boolean;
  setUser:       (user: User | null) => void;
  setInitialized:(initialized: boolean) => void;
  setLoading:    (loading: boolean) => void;
  reset:         () => void;
}

const initialState = {
  user:          null,
  isInitialized: false,
  loading:       true,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      ...initialState,

      setUser: (user) =>
        set({ user }, false, "auth/setUser"),

      setInitialized: (isInitialized) =>
        set({ isInitialized }, false, "auth/setInitialized"),

      setLoading: (loading) =>
        set({ loading }, false, "auth/setLoading"),

      reset: () =>
        set(
          { user: null, loading: false, isInitialized: true },
          false,
          "auth/reset"
        ),
    }),
    { name: "ZenforgeAuthStore" }
  )
);
