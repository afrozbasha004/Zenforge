import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Toast, ToastVariant } from "@/types";
import { TOAST_DURATION_MS } from "@/lib/constants";

export type UserTheme = "cyber" | "cosmic" | "tactician" | "focus";

export interface ThemeMeta {
  id:              UserTheme;
  label:           string;
  description:     string;
  requiresPremium: boolean;
}

export const THEME_REGISTRY: Record<UserTheme, ThemeMeta> = {
  cyber: {
    id:              "cyber",
    label:           "Cyber",
    description:     "Sharp edges, neon grids, high contrast. Default interface.",
    requiresPremium: false,
  },
  cosmic: {
    id:              "cosmic",
    label:           "Cosmic",
    description:     "Deep space gradients, orbital animations, ambient glow.",
    requiresPremium: true,
  },
  tactician: {
    id:              "tactician",
    label:           "Tactician",
    description:     "Dense data grids, command-line aesthetic, precision layout.",
    requiresPremium: true,
  },
  focus: {
    id:              "focus",
    label:           "Focus",
    description:     "Minimal chrome, reduced motion, distraction-free workspace.",
    requiresPremium: true,
  },
} as const;

export interface SidebarState {
  isOpen:      boolean;
  isCollapsed: boolean;
}

interface UiState {
  theme:           UserTheme;
  themeLoading:    boolean;
  toasts:          Toast[];
  sidebar:         SidebarState;
  setTheme:        (theme: UserTheme) => void;
  setThemeLoading: (loading: boolean) => void;
  addToast:        (message: string, variant: ToastVariant, duration?: number) => void;
  dismissToast:    (id: string) => void;
  clearToasts:     () => void;
  openSidebar:     () => void;
  closeSidebar:    () => void;
  toggleSidebar:   () => void;
  collapseSidebar: () => void;
  expandSidebar:   () => void;
}

function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        theme:        "cyber",
        themeLoading: false,
        toasts:       [],
        sidebar: {
          isOpen:      false,
          isCollapsed: false,
        },

        setTheme: (theme) =>
          set({ theme }, false, "ui/setTheme"),

        setThemeLoading: (themeLoading) =>
          set({ themeLoading }, false, "ui/setThemeLoading"),

        addToast: (message, variant, duration = TOAST_DURATION_MS) =>
          set(
            (state) => ({
              toasts: [
                ...state.toasts,
                { id: generateToastId(), message, variant, duration },
              ],
            }),
            false,
            "ui/addToast"
          ),

        dismissToast: (id) =>
          set(
            (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
            false,
            "ui/dismissToast"
          ),

        clearToasts: () =>
          set({ toasts: [] }, false, "ui/clearToasts"),

        openSidebar: () =>
          set((s) => ({ sidebar: { ...s.sidebar, isOpen: true } }), false, "ui/openSidebar"),

        closeSidebar: () =>
          set((s) => ({ sidebar: { ...s.sidebar, isOpen: false } }), false, "ui/closeSidebar"),

        toggleSidebar: () =>
          set((s) => ({ sidebar: { ...s.sidebar, isOpen: !s.sidebar.isOpen } }), false, "ui/toggleSidebar"),

        collapseSidebar: () =>
          set((s) => ({ sidebar: { ...s.sidebar, isCollapsed: true } }), false, "ui/collapseSidebar"),

        expandSidebar: () =>
          set((s) => ({ sidebar: { ...s.sidebar, isCollapsed: false } }), false, "ui/expandSidebar"),
      }),
      {
        name:       "zenforge-ui",
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    { name: "ZenforgeUiStore" }
  )
);
