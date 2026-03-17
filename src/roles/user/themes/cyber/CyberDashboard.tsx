"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

const CYBER_STATS = [
  { label: "Streak",  value: "12",  sub: "Days active"  },
  { label: "Tasks",   value: "47",  sub: "Completed"    },
  { label: "Points",  value: "840", sub: "Total earned" },
  { label: "Rank",    value: "#34", sub: "Leaderboard"  },
] as const;

const CYBER_ACTIVITY = [
  { action: "Completed task — Morning routine",  time: "09:14"     },
  { action: "Logged habit — Deep work (2h)",     time: "08:55"     },
  { action: "Earned badge — 10-day streak",      time: "08:00"     },
  { action: "Updated goal — Ship feature v1",    time: "Yesterday" },
  { action: "Joined challenge — 30 day focus",   time: "2d ago"    },
];

const CYBER_PROGRESS = [
  { label: "Daily habits", value: "4/5",   pct: 80 },
  { label: "Weekly goal",  value: "3/7",   pct: 43 },
  { label: "Challenge",    value: "12/30", pct: 40 },
];

export function CyberDashboard() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "CY");

  return (
    <div className="min-h-full">
      <div className="mb-6 flex items-center justify-between border-b border-brand-500/20 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brand-400" />
            <span className="text-xs font-mono text-brand-400/80 tracking-[0.2em] uppercase">
              Cyber · User Interface
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-xs text-surface-border">
            Welcome back, <span className="text-white/70">{user?.email ?? "user"}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="brand" dot>User</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-xs font-bold text-brand-300">
            {initials}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {CYBER_STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-brand-500/10 bg-surface-subtle p-4">
            <p className="text-[10px] tracking-widest text-brand-400/60 uppercase mb-1 font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
            <p className="text-[10px] text-surface-border mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Activity" subtitle="Your recent actions" className="lg:col-span-2 border-brand-500/10" elevated>
          <div className="space-y-3">
            {CYBER_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border border-surface-border bg-surface-muted/50 px-3 py-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                  <span className="text-white/80">{item.action}</span>
                </div>
                <span className="font-mono text-surface-border">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Progress" subtitle="This week" className="border-brand-500/10" elevated>
          <div className="space-y-4">
            {CYBER_PROGRESS.map((p) => (
              <div key={p.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{p.label}</span>
                  <span className="font-mono text-brand-400">{p.value}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
                  <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
