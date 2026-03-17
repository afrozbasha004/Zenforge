import type { Metadata } from "next";
import { APP_NAME }       from "@/lib/constants";
import { ProfileGuard }   from "@/components/profile/ProfileGuard";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default:  `Dashboard | ${APP_NAME}`,
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        aria-label="Sidebar navigation"
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-surface-border bg-surface-subtle lg:flex"
      >
        <div className="flex h-16 items-center gap-3 border-b border-surface-border px-6">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
            <span className="text-sm font-bold text-white">Z</span>
          </div>
          <span className="text-sm font-semibold tracking-wide text-white">{APP_NAME}</span>
        </div>
        <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-4 py-6">
          <p className="text-xs text-surface-border">Navigation renders in next phase.</p>
        </nav>
        <div className="border-t border-surface-border px-4 py-4">
          <p className="text-xs text-surface-border">User profile renders in next phase.</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:pl-64">
        <header
          aria-label="Topbar"
          className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-border bg-surface-subtle/80 px-6 backdrop-blur-sm"
        >
          <button type="button" aria-label="Open sidebar" className="flex h-8 w-8 items-center justify-center rounded-md text-surface-border transition-colors hover:bg-surface-muted hover:text-white lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-surface-muted" aria-hidden="true" />
          </div>
        </header>

        <main id="main-content" aria-label="Page content" className="flex-1 px-6 py-8">
          <ProfileGuard>
            {children}
          </ProfileGuard>
        </main>
      </div>
    </div>
  );
}
