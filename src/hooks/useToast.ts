"use client";

import { useCallback }  from "react";
import { useUiStore }   from "@/stores";
import type { ToastVariant } from "@/types";

interface UseToastReturn {
  success: (message: string, duration?: number) => void;
  error:   (message: string, duration?: number) => void;
  info:    (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  toast:   (message: string, variant: ToastVariant, duration?: number) => void;
  dismiss: (id: string) => void;
  clear:   () => void;
}

export function useToast(): UseToastReturn {
  const addToast     = useUiStore((s) => s.addToast);
  const dismissToast = useUiStore((s) => s.dismissToast);
  const clearToasts  = useUiStore((s) => s.clearToasts);

  const toast = useCallback(
    (message: string, variant: ToastVariant, duration?: number) => {
      addToast(message, variant, duration);
    },
    [addToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, "success", duration),
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => addToast(message, "error", duration),
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, "info", duration),
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => addToast(message, "warning", duration),
    [addToast]
  );

  const dismiss = useCallback(
    (id: string) => dismissToast(id),
    [dismissToast]
  );

  const clear = useCallback(() => clearToasts(), [clearToasts]);

  return { toast, success, error, info, warning, dismiss, clear };
}
