"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error:  Error & { digest?: string };
  reset:  () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
        ⚠
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-lg font-semibold text-white">Something went wrong</h1>
        <p className="max-w-sm text-sm text-surface-border">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-surface-border">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset} variant="secondary">
        Try again
      </Button>
    </div>
  );
}
