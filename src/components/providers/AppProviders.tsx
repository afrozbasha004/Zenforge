"use client";

import { type ReactNode }   from "react";
import { useAuth }          from "@/hooks/useAuth";
import { useUserProfile }   from "@/hooks/useUserProfile";
import { useAuthStore }     from "@/stores/authStore";
import { useUiStore }       from "@/stores/uiStore";
import { ToastContainer }   from "@/components/ui/Toast";
import { Spinner }          from "@/components/ui/Spinner";

function AuthInitializer() {
  useAuth();
  return null;
}

function ProfileInitializer() {
  useUserProfile();
  return null;
}

function ToastRenderer() {
  const toasts       = useUiStore((s) => s.toasts);
  const dismissToast = useUiStore((s) => s.dismissToast);
  return <ToastContainer toasts={toasts} onDismiss={dismissToast} />;
}

function AppShellGuard({ children }: { children: ReactNode }) {
  const isInitialized = useAuthStore((s) => s.isInitialized);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface">
        <Spinner size="lg" className="text-brand-500" label="Starting Zenforge…" />
        <span className="text-xs tracking-widest text-surface-border uppercase">Starting…</span>
      </div>
    );
  }

  return <>{children}</>;
}

interface AppProvidersProps { children: ReactNode }

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      <AuthInitializer />
      <ToastRenderer />
      <AppShellGuard>
        <ProfileInitializer />
        {children}
      </AppShellGuard>
    </>
  );
}
