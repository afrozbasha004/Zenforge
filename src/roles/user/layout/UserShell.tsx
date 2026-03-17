"use client";

import { useUserProfile }  from "@/hooks/useUserProfile";
import { useUiStore }      from "@/stores/uiStore";
import { ThemeLoader }     from "@/roles/user/themes/ThemeLoader";
import { Spinner }         from "@/components/ui/Spinner";

export function UserShell() {
  const { profile, isLoading } = useUserProfile();
  const theme                  = useUiStore((s) => s.theme);

  if (isLoading || profile === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" className="text-brand-500" label="Loading interface…" />
      </div>
    );
  }

  return <ThemeLoader theme={theme} isPremium={profile.isPremium} />;
}
