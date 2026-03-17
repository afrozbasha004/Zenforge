"use client";

import { useUserProfile }  from "@/hooks/useUserProfile";
import { useRole }         from "@/hooks/useRole";
import { ThemeSwitcher }   from "@/components/theme/ThemeSwitcher";
import { Badge, Card }     from "@/components/ui";
import { cn, getInitials, formatDate } from "@/lib/utils";
import type { AppRole }    from "@/types";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="border-b border-surface-border pb-4">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-surface-border">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function RoleBadge({ role }: { role: AppRole }) {
  const map: Record<AppRole, React.ComponentProps<typeof Badge>["variant"]> = {
    owner: "warning", admin: "danger", moderator: "brand", user: "default",
  };
  return <Badge variant={map[role]} size="sm">{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
}

function ProfileSection() {
  const { profile, isLoading, error } = useUserProfile();
  if (isLoading) {
    return <Card><div className="flex items-center gap-4 animate-pulse"><div className="h-14 w-14 rounded-full bg-surface-muted" /><div className="flex flex-col gap-2"><div className="h-3 w-32 rounded bg-surface-muted" /><div className="h-2 w-48 rounded bg-surface-muted" /></div></div></Card>;
  }
  if (error !== null || profile === null) {
    return <Card><p className="text-xs text-red-400">{error ?? "Profile unavailable."}</p></Card>;
  }
  const initials = getInitials(profile.fullName ?? profile.email);
  return (
    <Card>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-surface-border bg-surface-muted text-sm font-bold text-white">
          {initials}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white">{profile.fullName ?? "No name set"}</p>
            <RoleBadge role={profile.role} />
            {profile.isPremium && <Badge variant="premium" size="sm">Premium</Badge>}
          </div>
          <div className="grid grid-cols-1 gap-1.5 text-xs sm:grid-cols-2">
            <div className="flex flex-col gap-0.5"><span className="text-surface-border">Email</span><span className="text-white/80">{profile.email}</span></div>
            <div className="flex flex-col gap-0.5"><span className="text-surface-border">Member since</span><span className="text-white/80">{formatDate(profile.createdAt)}</span></div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PlanSection() {
  const { profile, isLoading } = useUserProfile();
  if (isLoading || profile === null) return <Card><div className="h-16 animate-pulse rounded bg-surface-muted" /></Card>;
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-white">{profile.isPremium ? "Premium Plan" : "Free Plan"}</p>
          <p className="text-xs text-surface-border">{profile.isPremium ? "All themes and features unlocked." : "Upgrade to unlock Cosmic, Tactician, and Focus themes."}</p>
        </div>
        {profile.isPremium ? <Badge variant="premium">Active</Badge> : (
          <button type="button" className={cn("rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400")}>
            Upgrade to Premium
          </button>
        )}
      </div>
    </Card>
  );
}

function ThemeSection() {
  const { profile, isLoading } = useUserProfile();
  const { isUser } = useRole();
  if (!isUser) return null;
  if (isLoading || profile === null) {
    return <Card noPadding><div className="p-6"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-pulse">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-xl bg-surface-muted" />)}</div></div></Card>;
  }
  return <Card noPadding><div className="p-6"><ThemeSwitcher isPremium={profile.isPremium} variant="grid" /></div></Card>;
}

function DangerZone() {
  const handleSignOut = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };
  return (
    <Card className="border-red-500/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Sign out</p>
          <p className="text-xs text-surface-border">Sign out of your account on this device.</p>
        </div>
        <button type="button" onClick={handleSignOut} className={cn("rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500")}>
          Sign out
        </button>
      </div>
    </Card>
  );
}

export function SettingsPanel() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-surface-border">Manage your profile, plan, and interface preferences.</p>
      </div>
      <Section title="Profile" description="Your account identity and role."><ProfileSection /></Section>
      <Section title="Plan" description="Your current subscription and available features."><PlanSection /></Section>
      <Section title="Interface Theme" description="Personalise your dashboard experience."><ThemeSection /></Section>
      <Section title="Account"><DangerZone /></Section>
    </div>
  );
}
