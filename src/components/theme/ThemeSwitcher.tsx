"use client";

import { cn }             from "@/lib/utils";
import { useTheme }       from "@/hooks/useTheme";
import { Badge, Spinner } from "@/components/ui";
import { THEME_REGISTRY } from "@/stores";
import type { UserTheme } from "@/stores";

const THEME_PREVIEWS: Record<UserTheme, React.FC<{ active: boolean }>> = {
  cyber: ({ active }) => (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#0f0f11]">
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #5561f515 1px, transparent 1px), linear-gradient(to bottom, #5561f515 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
      <div className={cn("absolute left-0 top-0 h-full w-1 transition-colors", active ? "bg-brand-500" : "bg-brand-500/40")} />
      <div className="absolute left-4 top-3 flex flex-col gap-1.5">
        {[40, 60, 30].map((w, i) => (
          <div key={i} className="h-1.5 rounded-sm bg-brand-500/30" style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className={cn("absolute bottom-0 left-0 right-0 h-px transition-opacity", active ? "bg-brand-400/60" : "bg-brand-500/20")} />
      <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-brand-500/50" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-brand-500/50" />
    </div>
  ),
  cosmic: ({ active }) => (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#0e0c16]">
      <div aria-hidden="true" className={cn("absolute -right-4 -top-4 h-16 w-16 rounded-full transition-opacity", active ? "opacity-100" : "opacity-50")} style={{ background: "radial-gradient(circle, #8b5cf640 0%, transparent 70%)" }} />
      <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full" style={{ background: "radial-gradient(circle, #7c3aed30 0%, transparent 70%)" }} />
      {[[20, 15], [55, 30], [80, 12], [35, 50], [70, 55]].map(([x, y], i) => (
        <div key={i} aria-hidden="true" className="absolute h-0.5 w-0.5 rounded-full bg-white/40" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      <div className="absolute left-4 top-4 flex flex-col gap-1.5">
        {[50, 70, 40].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-violet-500/20" style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className={cn("absolute bottom-3 right-3 h-6 w-6 rounded-full border transition-colors", active ? "border-violet-400/60 bg-violet-500/15" : "border-violet-500/20 bg-transparent")} />
    </div>
  ),
  tactician: ({ active }) => (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#100f08] font-mono">
      <div className={cn("absolute left-0 right-0 h-px transition-opacity", active ? "opacity-80" : "opacity-30")} style={{ top: "30%", background: "linear-gradient(to right, transparent, #f59e0b60, transparent)" }} />
      <div className="absolute left-3 top-3 flex flex-col gap-1">
        {["SYS:OK", "OPS:04", "TGT:12"].map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-amber-400/60" />
            <div className="h-1 rounded-sm bg-amber-500/25" style={{ width: `${[36, 28, 40][i]}px` }} />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, #f59e0b08 1px, transparent 1px)", backgroundSize: "10px 100%" }} />
      <div className="absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center">
        <div className="absolute h-px w-full bg-amber-500/40" />
        <div className="absolute h-full w-px bg-amber-500/40" />
      </div>
    </div>
  ),
  focus: ({ active }) => (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#111114]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
        <div className={cn("h-0.5 w-12 rounded-full transition-colors", active ? "bg-brand-500/70" : "bg-surface-border")} />
        <div className="flex flex-col items-center gap-1.5">
          {[60, 80, 45].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-white/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className={cn("h-0.5 w-6 rounded-full transition-colors", active ? "bg-brand-500/40" : "bg-surface-border/40")} />
      </div>
    </div>
  ),
};

interface ThemeCardProps {
  themeId:   UserTheme;
  isActive:  boolean;
  isLocked:  boolean;
  isLoading: boolean;
  onSelect:  (theme: UserTheme) => void;
}

function ThemeCard({ themeId, isActive, isLocked, isLoading, onSelect }: ThemeCardProps) {
  const meta    = THEME_REGISTRY[themeId];
  const Preview = THEME_PREVIEWS[themeId];

  return (
    <div
      role="radio"
      aria-checked={isActive}
      aria-disabled={isLocked}
      aria-label={`${meta.label} theme${isLocked ? " (Premium required)" : ""}`}
      tabIndex={isLocked ? -1 : 0}
      onClick={() => { if (!isLocked && !isActive) onSelect(themeId); }}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !isLocked && !isActive) { e.preventDefault(); onSelect(themeId); } }}
      className={cn(
        "group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        !isLocked && !isActive && "cursor-pointer hover:scale-[1.02]",
        isActive   && "border-brand-500/70 shadow-lg scale-[1.02]",
        !isActive  && "border-surface-border",
        isLocked   && "cursor-not-allowed"
      )}
      style={isActive ? { boxShadow: "0 0 20px #5561f525, 0 4px 20px #00000040" } : undefined}
    >
      <div className="relative h-24 w-full overflow-hidden">
        <Preview active={isActive} />
        {isActive && isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Spinner size="sm" className="text-brand-400" label="Loading theme…" />
          </div>
        )}
        {isLocked && (
          <div className="theme-lock-overlay">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white/70" aria-hidden="true">
                <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v4A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
              </svg>
            </div>
            <Badge variant="premium" size="sm">Premium</Badge>
          </div>
        )}
        {isActive && !isLoading && (
          <div className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white" aria-hidden="true">
              <path d="M2 6l3 3 5-5" />
            </svg>
          </div>
        )}
      </div>

      <div className={cn("flex flex-col gap-0.5 px-3 py-2.5 border-t transition-colors", isActive ? "border-brand-500/30 bg-brand-500/5" : "border-surface-border bg-surface-subtle", isLocked && "opacity-50")}>
        <div className="flex items-center justify-between gap-2">
          <span className={cn("text-xs font-semibold transition-colors", isActive ? "text-white" : "text-white/70")}>{meta.label}</span>
          {themeId === "cyber" && <span className="text-[10px] text-surface-border">Free</span>}
        </div>
        <p className={cn("text-[10px] leading-tight transition-colors line-clamp-2", isActive ? "text-white/50" : "text-surface-border")}>{meta.description}</p>
      </div>
    </div>
  );
}

interface ThemeSwitcherProps {
  isPremium?: boolean;
  className?: string;
  variant?:   "grid" | "row";
}

export function ThemeSwitcher({ isPremium = false, className, variant = "grid" }: ThemeSwitcherProps) {
  const { theme, switchTheme, canUse, isLoading } = useTheme(isPremium);
  const themes = Object.keys(THEME_REGISTRY) as UserTheme[];

  return (
    <div className={cn("flex flex-col gap-3", className)} role="radiogroup" aria-label="Select dashboard theme">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold text-white">Interface Theme</h3>
          <p className="text-xs text-surface-border">
            {isPremium ? "All themes available — switch any time." : "Upgrade to Premium to unlock Cosmic, Tactician, and Focus."}
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center gap-1.5 text-xs text-surface-border animate-in-fade">
            <Spinner size="xs" className="text-brand-400" label="Switching theme" />
            <span>Switching…</span>
          </div>
        )}
      </div>

      <div className={cn(variant === "grid" ? "grid grid-cols-2 gap-3 sm:grid-cols-4" : "flex gap-3 overflow-x-auto pb-1 scrollbar-none")}>
        {themes.map((t) => (
          <ThemeCard key={t} themeId={t} isActive={theme === t} isLocked={!canUse(t)} isLoading={isLoading && theme === t} onSelect={switchTheme} />
        ))}
      </div>

      {!isPremium && (
        <div className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="text-amber-400" aria-hidden="true">✦</span>
            <div>
              <p className="text-xs font-medium text-amber-300">Unlock all themes with Premium</p>
              <p className="text-[11px] text-amber-400/60">Cosmic, Tactician, and Focus — each a completely different experience.</p>
            </div>
          </div>
          <button type="button" className={cn("shrink-0 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/20 hover:border-amber-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400")}>
            Upgrade
          </button>
        </div>
      )}
    </div>
  );
}
