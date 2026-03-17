import { create }   from "zustand";
import { devtools } from "zustand/middleware";
import type { Tables } from "@/types";

export type ProfileRow = Tables<"profiles">;

interface ProfileState {
  profile:    ProfileRow | null;
  isLoading:  boolean;
  error:      string | null;
  setProfile: (profile: ProfileRow | null) => void;
  setLoading: (loading: boolean) => void;
  setError:   (error: string | null) => void;
  reset:      () => void;
}

const initialState: Pick<ProfileState, "profile" | "isLoading" | "error"> = {
  profile:   null,
  isLoading: true,
  error:     null,
};

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set) => ({
      ...initialState,

      setProfile: (profile) =>
        set({ profile }, false, "profile/setProfile"),

      setLoading: (isLoading) =>
        set({ isLoading }, false, "profile/setLoading"),

      setError: (error) =>
        set({ error }, false, "profile/setError"),

      reset: () =>
        set(initialState, false, "profile/reset"),
    }),
    { name: "ZenforgeProfileStore" }
  )
);
