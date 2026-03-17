"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

const SENTINEL_METRICS = [
  { label: "Reports",   value: "14",  status: "4 unreviewed",     alertColor: "text-amber-400/80"   },
  { label: "Flagged",   value: "3",   status: "All low priority",  alertColor: "text-emerald-400/80" },
  { label: "Banned",    value: "271", status: "+2 this week",      alertColor: "text-surface-border" },
  { label: "Admin Log", value: "88",  status: "This month",        alertColor: "text-surface-border" },
] as const;

const MOD_QUEUE = [
  { target: "user@domain.com",  reason: "Spam report × 3",       priority: "high" as const },
  { target: "Post #4471",       reason: "Inappropriate content",  priority: "med"  as const },
  { target: "user2@domain.com", reason: "Duplicate account flag", priority: "low"  as const },
];

const ADMIN_ACTIONS = [
  { time: "09:38", action: "Suspended",  detail: "user #8821 — ToS violation"         },
  { time: "09:22", action: "Approved",   detail: "appeal from user #7740"              },
  { time: "08:55", action: "Deleted",    detail: "post #4389 — spam content confirmed" },
  { time: "08:41", action: "Escalated",  detail: "report #902 → owner review"          },
  { time: "08:10", action: "Bulk clear", detail: "47 resolved reports archived"        },
];

export function SentinelShell() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "AD");

  return (
    <div className="min-h-full">
      <div className="mb-6 flex items-center justify-between border-b border-red-500/20 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-mono text-red-400/80 tracking-[0.2em] uppercase">
              Sentinel — Admin Interface
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Control Centre</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="danger" dot>Admin</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-xs font-bold text-red-300">
            {initials}
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <p className="text-xs text-emerald-300 font-mono">
          ALL SYSTEMS NOMINAL · No active incidents · Last scan 2 min ago
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {SENTINEL_METRICS.map((m) => (
          <div key={m.label} className="rounded-lg border border-red-500/10 bg-surface-subtle p-4">
            <p className="text-[10px] tracking-widest text-red-500/60 uppercase mb-1 font-mono">{m.label}</p>
            <p className="text-2xl font-bold text-white tabular-nums">{m.value}</p>
            <p className={`text-[10px] mt-1 font-mono ${m.alertColor}`}>{m.status}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="MODERATION QUEUE" className="border-red-500/10" elevated>
          <div className="space-y-3">
            {MOD_QUEUE.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border border-surface-border bg-surface-muted/50 px-3 py-2.5 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/80 font-medium">{item.target}</span>
                  <span className="text-surface-border">{item.reason}</span>
                </div>
                <Badge variant={item.priority === "high" ? "danger" : item.priority === "med" ? "warning" : "default"} size="sm">
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="RECENT ACTIONS" className="border-red-500/10" elevated>
          <div className="space-y-3">
            {ADMIN_ACTIONS.map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="shrink-0 font-mono text-surface-border tabular-nums">{a.time}</span>
                <div>
                  <span className="text-white/80">{a.action} </span>
                  <span className="text-surface-border">{a.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
