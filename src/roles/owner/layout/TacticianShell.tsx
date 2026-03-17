"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

type LogLevel = "INFO" | "WARN" | "ERROR" | "OK";

const logLevelColor: Record<LogLevel, string> = {
  INFO:  "text-sky-400/80",
  WARN:  "text-amber-400/80",
  ERROR: "text-red-400/80",
  OK:    "text-emerald-400/80",
};

const OWNER_STATS = [
  { label: "Total Users",   value: "2,847",  delta: "+12 this week"   },
  { label: "Active Now",    value: "341",    delta: "↑ 8% vs avg"     },
  { label: "Revenue / Mo",  value: "$14.2k", delta: "+3.1% MoM"       },
  { label: "System Health", value: "99.8%",  delta: "All ops nominal" },
] as const;

const SYSTEM_LOGS: { time: string; level: LogLevel; message: string }[] = [
  { time: "09:41:02", level: "OK",    message: "Supabase auth service: healthy"          },
  { time: "09:40:55", level: "INFO",  message: "Session refresh — user id 7f3a…"         },
  { time: "09:39:18", level: "WARN",  message: "Rate limit threshold at 78% — 3 sources" },
  { time: "09:38:44", level: "OK",    message: "Edge deployment verified — iad1 region"  },
  { time: "09:35:01", level: "INFO",  message: "5 new user registrations this hour"      },
  { time: "09:30:00", level: "OK",    message: "Scheduled snapshot complete (v0.1.0)"    },
];

const ROLE_MANIFEST = [
  { role: "user",      count: 2610, pct: 92 },
  { role: "moderator", count: 140,  pct: 24 },
  { role: "admin",     count: 94,   pct: 14 },
  { role: "owner",     count: 3,    pct: 2  },
] as const;

export function TacticianShell() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "OW");

  return (
    <div className="min-h-full font-mono">
      <div className="mb-6 flex items-center justify-between border-b border-amber-500/20 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-amber-400/80 tracking-[0.2em] uppercase">
              Tactician — Owner Interface
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Command Centre</h1>
          <p className="text-xs text-surface-border">
            {new Date().toUTCString()} · Session active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" dot>Owner</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-300">
            {initials}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {OWNER_STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-amber-500/10 bg-surface-subtle p-4">
            <p className="text-[10px] tracking-[0.15em] text-amber-500/60 uppercase mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-amber-300 tabular-nums">{stat.value}</p>
            <p className="text-[10px] text-surface-border mt-1">{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="SYSTEM LOG" className="lg:col-span-2 border-amber-500/10" elevated>
          <div className="space-y-2.5">
            {SYSTEM_LOGS.map((log, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="shrink-0 text-amber-500/50 tabular-nums">{log.time}</span>
                <span className={logLevelColor[log.level]}>[{log.level}]</span>
                <span className="text-white/70">{log.message}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="ROLE MANIFEST" className="border-amber-500/10" elevated>
          <div className="space-y-3">
            {ROLE_MANIFEST.map((item) => (
              <div key={item.role} className="flex items-center justify-between text-xs">
                <span className="text-white/70">{item.role}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-16 rounded-full bg-surface-muted overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400/60" style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="w-6 text-right tabular-nums text-surface-border">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
