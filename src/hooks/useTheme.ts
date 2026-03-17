"use client";

import { useCallback, useEffect } from "react";
import { useUiStore, THEME_REGISTRY } from "@/stores";
import type { UserTheme } from "@/stores";

interface UseThemeReturn {
  theme:       UserTheme;
  isLoading:   boolean;
  isPremium:   boolean;
  canUse:      (theme: UserTheme) => boolean;
  switchTheme: (theme: UserTheme) => void;
  registry:    typeof THEME_REGISTRY;
}

export function useTheme(isPremiumUser: boolean = false): UseThemeReturn {
  const theme      = useUiStore((s) => s.theme);
  const isLoading  = useUiStore((s) => s.themeLoading);
  const setTheme   = useUiStore((s) => s.setTheme);
  const setLoading = useUiStore((s) => s.setThemeLoading);

  const resolvedTheme: UserTheme = isPremiumUser ? theme : "cyber";

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    return () => {
      root.setAttribute("data-theme", "cyber");
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!isPremiumUser && theme !== "cyber") {
      setTheme("cyber");
    }
  }, [isPremiumUser, theme, setTheme]);

  const canUse = useCallback(
    (t: UserTheme): boolean => {
      const meta = THEME_REGISTRY[t];
      if (!meta.requiresPremium) return true;
      return isPremiumUser;
    },
    [isPremiumUser]
  );

  const switchTheme = useCallback(
    (t: UserTheme) => {
      if (t === resolvedTheme) return;
      if (!canUse(t)) return;

      if (t === "cyber") {
        setTheme("cyber");
        return;
      }

      setLoading(true);
      setTheme(t);
      const safety = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(safety);
    },
    [resolvedTheme, canUse, setTheme, setLoading]
  );

  return {
    theme:    resolvedTheme,
    isLoading,
    isPremium: isPremiumUser,
    canUse,
    switchTheme,
    registry: THEME_REGISTRY,
  };
}
