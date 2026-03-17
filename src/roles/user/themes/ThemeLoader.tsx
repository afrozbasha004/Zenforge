"use client";

import { Suspense, lazy } from "react";
import { Spinner }        from "@/components/ui/Spinner";
import type { UserTheme } from "@/stores/uiStore";
import { CyberDashboard } from "./cyber/CyberDashboard";

const CosmicDashboard = lazy(() =>
  import("./cosmic/CosmicDashboard").then((m) => ({ default: m.CosmicDashboard }))
);
const TacticianDashboard = lazy(() =>
  import("./tactician/TacticianDashboard").then((m) => ({ default: m.TacticianDashboard }))
);
const FocusDashboard = lazy(() =>
  import("./focus/FocusDashboard").then((m) => ({ default: m.FocusDashboard }))
);

interface ThemeLoaderProps {
  theme:     UserTheme;
  isPremium: boolean;
}

function ThemeLoadingFallback({ theme }: { theme: UserTheme }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Spinner size="lg" className="text-brand-500" label={`Loading ${theme} theme…`} />
      <p className="text-xs tracking-widest text-surface-border uppercase animate-pulse">
        Loading {theme}…
      </p>
    </div>
  );
}

export function ThemeLoader({ theme, isPremium }: ThemeLoaderProps) {
  const resolvedTheme: UserTheme = isPremium ? theme : "cyber";

  if (resolvedTheme === "cyber") return <CyberDashboard />;

  return (
    <Suspense fallback={<ThemeLoadingFallback theme={resolvedTheme} />}>
      {resolvedTheme === "cosmic"    && <CosmicDashboard />}
      {resolvedTheme === "tactician" && <TacticianDashboard />}
      {resolvedTheme === "focus"     && <FocusDashboard />}
    </Suspense>
  );
}
