"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

const COSMIC_STATS = [
  { label: "In Queue",     value: "23",  sub: "Pending review",    glowColor: "#a78bfa" },
  { label: "Approved",     value: "184", sub: "This week",         glowColor: "#34d399" },
  { label: "Removed",      value: "12",  sub: "Policy violations", glowColor: "#f87171" },
  { label: "Avg Response", value: "4m",  sub: "Review time",       glowColor: "#60a5fa" },
] as const;

const CONTENT_STREAM = [
  { title: "How to optimize Supabase queries…",        author: "u/devcoder",  time: "2m ago",  type: "report" as const },
  { title: "Weekly habit tracker — my 90 day results", author: "u/healthapp", time: "14m ago", type: "review" as const },
  { title: "PROMO: Use code ZENF for 50% off",         author: "u/spambot22", time: "21m ago", type: "report" as const },
  { title: "Feature request: dark mode toggle",        author: "u/ui_fan",    time: "34m ago", type: "review" as const },
];

const WEEK_ACTIVITY = [
  { label: "Mon", count: 34, pct: 68  },
  { label: "Tue", count: 41, pct: 82  },
  { label: "Wed", count: 28, pct: 56  },
  { label: "Thu", count: 50, pct: 100 },
  { label: "Fri", count: 38, pct: 76  },
  { label: "Sat", count: 19, pct: 38  },
  { label: "Sun", count: 12, pct: 24  },
];

export function CosmicShell() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "MO");

  return (
    <div className="relative min-h-full overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-800/10 blur-[80px]" />
      </div>

      <div className="relative mb-6 flex items-center justify-between border-b border-violet-500/20 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-violet-400/80 tracking-[0.2em] uppercase">
              Cosmic — Moderator Interface
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Content Observatory</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="brand" dot>Moderator</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-bold text-violet-300">
            {initials}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {COSMIC_STATS.map((s) => (
          <div key={s.label} className="relative overflow-hidden rounded-xl border border-violet-500/10 bg-surface-subtle p-4">
            <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.glowColor }} aria-hidden="true" />
            <p className="text-[10px] tracking-widest text-violet-400/60 uppercase mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
            <p className="text-[10px] text-surface-border mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Content Stream" subtitle="Recent submissions requiring review" className="lg:col-span-2 border-violet-500/10" elevated>
          <div className="space-y-3">
            {CONTENT_STREAM.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-3 rounded-lg border border-surface-border bg-surface-muted/40 p-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{item.title}</p>
                  <p className="text-[11px] text-surface-border">{item.author} · {item.time}</p>
                </div>
                <Badge variant={item.type === "report" ? "danger" : "info"} size="sm">{item.type}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Activity Nebula" subtitle="7-day moderation pattern" className="border-violet-500/10" elevated>
          <div className="flex flex-col gap-2">
            {WEEK_ACTIVITY.map((day) => (
              <div key={day.label} className="flex items-center gap-3 text-xs">
                <span className="w-7 shrink-0 text-surface-border">{day.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-surface-muted overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400" style={{ width: `${day.pct}%` }} />
                </div>
                <span className="w-6 text-right tabular-nums text-surface-border">{day.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
