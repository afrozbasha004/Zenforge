"use client";

import { type ReactNode }  from "react";
import { useAuthStore }    from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { Spinner }         from "@/components/ui/Spinner";

function ProfileSkeleton() {
  return (
    <div role="status" aria-label="Loading your profile…" className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Spinner size="lg" className="text-brand-500" label="Loading profile…" />
      <p className="text-xs tracking-widest text-surface-border uppercase animate-pulse">Loading profile…</p>
    </div>
  );
}

function ProfileError({ error }: { error: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
        <span className="text-xl" aria-hidden="true">⚠</span>
      </div>
      <p className="text-sm font-medium text-white">Failed to load profile</p>
      <p className="max-w-sm text-center text-xs text-surface-border">{error}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-2 rounded-lg border border-surface-border px-4 py-2 text-xs text-white/70 hover:bg-surface-muted transition-colors"
      >
        Reload page
      </button>
    </div>
  );
}

interface ProfileGuardProps { children: ReactNode }

export function ProfileGuard({ children }: ProfileGuardProps) {
  const isInitialized = useAuthStore((s)    => s.isInitialized);
  const profile       = useProfileStore((s) => s.profile);
  const isLoading     = useProfileStore((s) => s.isLoading);
  const error         = useProfileStore((s) => s.error);

  if (!isInitialized)                     return <ProfileSkeleton />;
  if (isLoading && profile === null)      return <ProfileSkeleton />;
  if (error !== null && profile === null) return <ProfileError error={error} />;
  if (profile === null)                   return <ProfileSkeleton />;

  return <>{children}</>;
}
