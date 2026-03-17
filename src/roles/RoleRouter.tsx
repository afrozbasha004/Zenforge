"use client";

import { useAuthStore }    from "@/stores/authStore";
import { useRole }         from "@/hooks/useRole";
import { Spinner }         from "@/components/ui/Spinner";
import { TacticianShell }  from "@/roles/owner/layout/TacticianShell";
import { SentinelShell }   from "@/roles/admin/layout/SentinelShell";
import { CosmicShell }     from "@/roles/moderator/layout/CosmicShell";
import { UserShell }       from "@/roles/user/layout/UserShell";

export function RoleRouter() {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const { role, isOwner, isAdmin, isModerator, isUser } = useRole();

  if (!isInitialized || role === null) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Spinner size="lg" className="text-brand-500" label="Resolving interface…" />
        <p className="text-xs tracking-widest text-surface-border uppercase animate-pulse">
          Resolving interface…
        </p>
      </div>
    );
  }

  if (isOwner)     return <TacticianShell />;
  if (isAdmin)     return <SentinelShell />;
  if (isModerator) return <CosmicShell />;
  if (isUser)      return <UserShell />;

  return <UserShell />;
}
