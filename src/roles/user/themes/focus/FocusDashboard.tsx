"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card }  from "@/components/ui";

const FOCUS_TASKS = [
  { label: "Review pull request #42",      done: true  },
  { label: "Write weekly retrospective",   done: true  },
  { label: "Prep tomorrow's standup",      done: false },
  { label: "30-min deep work block",       done: false },
  { label: "Log end-of-day reflection",    done: false },
];

export function FocusDashboard() {
  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.email ?? "FU");

  const done  = FOCUS_TASKS.filter((t) => t.done).length;
  const total = FOCUS_TASKS.length;
  const pct   = Math.round((done / total) * 100);

  return (
    <div className="min-h-full">
      <div className="mb-8 flex items-center justify-between border-b border-surface-border pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            <span className="text-xs tracking-widest text-surface-border uppercase">
              Focus Theme · Premium
            </span>
          </div>
          <h1 className="text-xl font-semibold text-white">Today</h1>
          <p className="text-xs text-surface-border">{user?.email ?? "user"}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="premium">Premium</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-border bg-surface-subtle text-xs font-semibold text-white/70">
            {initials}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-8">
        {[
          { label: "Today's tasks",  value: `${total - done} remaining` },
          { label: "Focus time",     value: "1h 24m"                   },
          { label: "Streak",         value: "12 days"                  },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-surface-border bg-surface-subtle p-5">
            <p className="text-xs text-surface-border mb-1">{s.label}</p>
            <p className="text-lg font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Focus Queue" subtitle="Tasks for today" className="lg:col-span-2 border-surface-border" elevated>
          <div className="space-y-2">
            {FOCUS_TASKS.map((task, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface-muted/40">
                <div className={`h-4 w-4 shrink-0 rounded border flex items-center justify-center transition-colors ${task.done ? "border-brand-500 bg-brand-500/20" : "border-surface-border"}`}>
                  {task.done && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 text-brand-400" aria-hidden="true">
                      <path d="M2 5l2.5 2.5 3.5-4" />
                    </svg>
                  )}
                </div>
                <span className={task.done ? "line-through text-surface-border" : "text-white/80"}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Day Progress" className="border-surface-border" elevated>
          <div className="flex flex-col items-center gap-5 py-2">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#26262e" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none"
                  stroke="#5561f5"
                  strokeWidth="2.5"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round"
                  strokeDashoffset="0"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold text-white">{pct}%</span>
                <span className="text-[10px] text-surface-border">done</span>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Completed</span><span className="tabular-nums text-brand-400">{done}/{total}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Focus blocks</span><span className="tabular-nums text-brand-400">3</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Breaks taken</span><span className="tabular-nums text-brand-400">2</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
