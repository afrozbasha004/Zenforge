"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

const COSMIC_STATS = [
  { label: "Orbit",   value: "7",    sub: "Days in flow"  },
  { label: "Nebulas", value: "23",   sub: "Goals active"  },
  { label: "Energy",  value: "91%",  sub: "Focus level"   },
  { label: "Stars",   value: "1.2k", sub: "Points earned" },
] as const;

const COSMIC_ACTIVITY = [
  { action: "Completed cosmic ritual — Morning flow", time: "09:14"     },
  { action: "Orbital goal updated — Deep work",       time: "08:55"     },
  { action: "New constellation unlocked",             time: "08:00"     },
  { action: "7-day orbit streak achieved",            time: "Yesterday" },
  { action: "Joined nebula challenge — 30 days",      time: "2d ago"    },
];

export function CosmicDashboard() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "CU");

  return (
    <div className="relative min-h-full overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-purple-900/15 blur-[100px]" />
      </div>

      <div className="relative mb-6 flex items-center justify-between border-b border-violet-500/20 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            <span className="text-xs tracking-[0.2em] text-violet-400/80 uppercase">
              Cosmic Theme · Premium
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Your Universe</h1>
          <p className="text-xs text-surface-border">
            Welcome back, <span className="text-white/70">{user?.email ?? "user"}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="premium" dot>Premium</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-bold text-violet-300">
            {initials}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {COSMIC_STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-violet-500/10 bg-surface-subtle p-4">
            <p className="text-[10px] tracking-widest text-violet-400/60 uppercase mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
            <p className="text-[10px] text-surface-border mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Cosmic Stream" subtitle="Your recent orbital activity" className="lg:col-span-2 border-violet-500/10" elevated>
          <div className="space-y-3">
            {COSMIC_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-muted/40 px-3 py-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                  <span className="text-white/80">{item.action}</span>
                </div>
                <span className="font-mono text-surface-border">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Orbit Energy" subtitle="This cycle" className="border-violet-500/10" elevated>
          <div className="space-y-4">
            {[
              { label: "Daily rituals", value: "4/5",   pct: 80 },
              { label: "Weekly orbit",  value: "5/7",   pct: 71 },
              { label: "Nebula quest",  value: "12/30", pct: 40 },
            ].map((p) => (
              <div key={p.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{p.label}</span>
                  <span className="font-mono text-violet-400">{p.value}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
