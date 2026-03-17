"use client";

import { useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Toast as ToastType, ToastVariant } from "@/types";

interface ToastItemProps {
  toast:     ToastType;
  onDismiss: (id: string) => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error:   "border-red-500/30     bg-red-500/10     text-red-300",
  warning: "border-amber-500/30   bg-amber-500/10   text-amber-300",
  info:    "border-sky-500/30     bg-sky-500/10     text-sky-300",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5zm0 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5zm0 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25 9.25a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-1.5 0v5.25z" clipRule="evenodd" />
    </svg>
  ),
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { id, message, variant, duration = 4000 } = toast;
  const dismiss = useCallback(() => onDismiss(id), [id, onDismiss]);

  useEffect(() => {
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [dismiss, duration]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3.5",
        "shadow-lg shadow-black/30 backdrop-blur-sm animate-slide-up",
        variantStyles[variant]
      )}
    >
      {variantIcons[variant]}
      <p className="flex-1 text-sm font-medium leading-snug">{message}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22z" />
        </svg>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts:    ToastType[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div aria-label="Notifications" className="fixed bottom-4 right-4 z-[9999] flex flex-col-reverse gap-3 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export { ToastItem };
