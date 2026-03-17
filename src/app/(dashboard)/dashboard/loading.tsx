import { Spinner } from "@/components/ui/Spinner";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Spinner size="lg" className="text-brand-500" label="Loading dashboard…" />
      <p className="text-xs tracking-widest text-surface-border uppercase animate-pulse">
        Initializing…
      </p>
    </div>
  );
}
