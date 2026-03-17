import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default:  `Sign in | ${APP_NAME}`,
  },
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface px-4 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[30%] h-[600px] w-[600px] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-brand-800/10 blur-[100px]" />
      </div>

      <div className="relative mb-8 flex flex-col items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
          <span className="text-lg font-bold text-white">Z</span>
        </div>
        <span className="text-sm font-medium tracking-widest text-surface-border uppercase">
          {APP_NAME}
        </span>
      </div>

      <main aria-label="Authentication" className="relative w-full max-w-md">
        <div className="rounded-2xl border border-surface-border bg-surface-subtle px-8 py-10 shadow-2xl shadow-black/40">
          {children}
        </div>
      </main>

      <p className="relative mt-8 text-center text-xs text-surface-border">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </div>
  );
}
