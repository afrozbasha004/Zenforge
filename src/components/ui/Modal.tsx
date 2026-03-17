"use client";

import { useEffect, useCallback, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn }    from "@/lib/utils";
import { Button } from "./Button";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen:           boolean;
  onClose:          () => void;
  title?:           string;
  description?:     string;
  size?:            ModalSize;
  persistent?:      boolean;
  hideCloseButton?: boolean;
  footer?:          ReactNode;
  children:         ReactNode;
  className?:       string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size            = "md",
  persistent      = false,
  hideCloseButton = false,
  footer,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !persistent) onClose();
    },
    [onClose, persistent]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!persistent && e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full rounded-2xl border border-surface-border",
          "bg-surface-subtle shadow-2xl shadow-black/50 flex flex-col",
          "animate-slide-up focus:outline-none",
          sizeClasses[size],
          className
        )}
      >
        {(title ?? !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-surface-border px-6 py-5">
            <div className="flex flex-col gap-1">
              {title       && <h2 id="modal-title"       className="text-base font-semibold text-white">{title}</h2>}
              {description && <p  id="modal-description" className="text-sm text-surface-border">{description}</p>}
            </div>
            {!hideCloseButton && (
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal" className="shrink-0 rounded-md p-1.5 h-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        )}

        <div className="overflow-y-auto px-6 py-5 text-sm text-white/80">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-surface-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
