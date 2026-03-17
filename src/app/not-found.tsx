import Link from "next/link";
import { DASHBOARD_ROUTE } from "@/lib/constants";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-mono text-6xl font-bold text-surface-border">404</p>
        <h1 className="text-lg font-semibold text-white">Page not found</h1>
        <p className="max-w-sm text-sm text-surface-border">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href={DASHBOARD_ROUTE}
        className="rounded-lg border border-surface-border bg-surface-subtle px-4 py-2 text-sm text-white/70 transition-colors hover:bg-surface-muted hover:text-white"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
