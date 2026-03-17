"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

const TACTICIAN_STATS = [
  { label: "Objectives", value: "8",    sub: "Active"       },
  { label: "Completed",  value: "134",  sub: "All time"     },
  { label: "Efficiency", value: "87%",  sub: "This week"    },
  { label: "Command",    value: "Lv.4", sub: "Current rank" },
] as const;

const OPS_LOG = [
  { time: "09:14", status: "OK",   action: "Morning briefing complete — 3 objectives set"  },
  { time: "08:55", status: "EXEC", action: "Deep work block initiated — 2h allocated"      },
  { time: "08:00", status: "OK",   action: "10-day streak maintained — bonus XP awarded"   },
  { time: "YEST",  status: "INFO", action: "Objective updated — Ship feature v1 by Friday" },
  { time: "2D",    status: "INFO", action: "New operation joined — 30-day focus campaign"  },
] as const;

const statusColor: Record<string, string> = {
  OK:   "text-emerald-400/80",
  EXEC: "text-amber-400/80",
  INFO: "text-sky-400/80",
  WARN: "text-red-400/80",
};

export function TacticianDashboard() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "TC");

  return (
    <div className="min-h-full font-mono">
      <div className="mb-6 flex items-center justify-between border-b border-amber-500/20 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <span className="text-xs tracking-[0.2em] text-amber-400/80 uppercase">
              Tactician Theme · Premium
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Ops Grid</h1>
          <p className="text-xs text-surface-border">
            Operative: <span className="text-amber-300/70">{user?.email ?? "user"}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="premium" dot>Premium</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-300">
            {initials}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {TACTICIAN_STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-amber-500/10 bg-surface-subtle p-4">
            <p className="text-[10px] tracking-widest text-amber-500/60 uppercase mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-amber-300 tabular-nums">{s.value}</p>
            <p className="text-[10px] text-surface-border mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="OPS LOG" className="lg:col-span-2 border-amber-500/10" elevated>
          <div className="space-y-2.5">
            {OPS_LOG.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="shrink-0 text-amber-500/50 tabular-nums w-10">{entry.time}</span>
                <span className={statusColor[entry.status] ?? "text-surface-border"}>[{entry.status}]</span>
                <span className="text-white/70">{entry.action}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="MISSION STATUS" className="border-amber-500/10" elevated>
          <div className="space-y-4">
            {[
              { label: "Daily ops",     value: "4/5",   pct: 80 },
              { label: "Weekly quota",  value: "6/7",   pct: 86 },
              { label: "Campaign",      value: "12/30", pct: 40 },
            ].map((p) => (
              <div key={p.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{p.label}</span>
                  <span className="font-mono text-amber-400">{p.value}</span>
                </div>
                <div className="h-1 w-full rounded-sm bg-surface-muted overflow-hidden">
                  <div
                    className="h-full bg-amber-400/60 transition-all"
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
