"use client";

import { useAuthStore } from "@/stores/authStore";
import { getInitials }  from "@/lib/utils";
import { Badge, Card, Spinner } from "@/components/ui";
import { useHabits }    from "@/hooks/useHabits";
import type { Habit }   from "@/hooks/useHabits";

function HabitRow({ habit }: { habit: Habit }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-surface-border bg-surface-muted/50 px-3 py-2.5 text-xs">
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-4 w-4 shrink-0 items-center justify-center rounded",
            "border transition-colors",
            habit.completed
              ? "border-brand-500 bg-brand-500"
              : "border-surface-border bg-transparent",
          ].join(" ")}
          aria-label={habit.completed ? "Completed" : "Not completed"}
        >
          {habit.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-2.5 w-2.5 text-white"
              aria-hidden="true"
            >
              <path d="M1.5 5l2.5 2.5 4.5-4" />
            </svg>
          )}
        </div>
        <span
          className={[
            "transition-colors",
            habit.completed ? "text-surface-border line-through" : "text-white/80",
          ].join(" ")}
        >
          {habit.title}
        </span>
      </div>
      <Badge variant={habit.completed ? "success" : "default"} size="sm">
        {habit.completed ? "Done" : "Pending"}
      </Badge>
    </div>
  );
}

function HabitsList() {
  const { habits, loading, error } = useHabits();

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4 text-xs text-surface-border">
        <Spinner size="xs" className="text-brand-400" label="Loading habits…" />
        <span>Loading habits…</span>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="rounded-md border border-red-500/20 bg-red-500/5 px-3 py-3 text-xs text-red-400">
        Failed to load habits: {error}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-surface-muted">
          <span className="text-lg" aria-hidden="true">🎯</span>
        </div>
        <p className="text-sm font-medium text-white/60">No habits yet</p>
        <p className="text-xs text-surface-border">
          Create your first habit to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {habits.map((habit) => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

function HabitStats() {
  const { habits, loading } = useHabits();

  const total     = habits.length;
  const completed = habits.filter((h) => h.completed).length;
  const pending   = total - completed;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total",    value: loading ? "—" : String(total),    sub: "Habits"    },
    { label: "Done",     value: loading ? "—" : String(completed), sub: "Completed" },
    { label: "Pending",  value: loading ? "—" : String(pending),   sub: "Remaining" },
    { label: "Progress", value: loading ? "—" : `${pct}%`,         sub: "Today"     },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border border-brand-500/10 bg-surface-subtle p-4">
          <p className="text-[10px] tracking-widest text-brand-400/60 uppercase mb-1 font-mono">
            {s.label}
          </p>
          <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
          <p className="text-[10px] text-surface-border mt-1">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

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
            Welcome back,{" "}
            <span className="text-white/70">{user?.email ?? "user"}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="brand" dot>User</Badge>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-xs font-bold text-brand-300">
            {initials}
          </div>
        </div>
      </div>

      <HabitStats />

      <Card
        title="My Habits"
        subtitle="Today's habit tracker"
        className="border-brand-500/10"
        elevated
      >
        <HabitsList />
      </Card>
    </div>
  );
}
