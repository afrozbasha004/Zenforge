"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  hint?:       string;
  leftAddon?:  React.ReactNode;
  rightAddon?: React.ReactNode;
}

const inputBase = [
  "w-full rounded-lg border bg-surface-muted px-3.5 py-2.5",
  "text-sm text-white placeholder:text-surface-border",
  "transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-subtle",
].join(" ");

const inputNormal = "border-surface-border hover:border-surface-muted";
const inputError  = "border-red-500/60 focus:ring-red-500 focus:border-red-500";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftAddon, rightAddon, className, id: externalId, required, ...props },
    ref
  ) => {
    const generatedId = useId();
    const id          = externalId ?? generatedId;
    const errorId     = `${id}-error`;
    const hintId      = `${id}-hint`;
    const hasError    = Boolean(error);

    const describedBy =
      [hasError && errorId, hint && hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-white">
            {label}
            {required && <span aria-hidden="true" className="ml-1 text-red-400">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <div className="pointer-events-none absolute left-3 text-surface-border">
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            required={required}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              inputBase,
              hasError ? inputError : inputNormal,
              leftAddon  && "pl-9",
              rightAddon && "pr-9",
              className
            )}
            {...props}
          />

          {rightAddon && (
            <div className="absolute right-3 text-surface-border">{rightAddon}</div>
          )}
        </div>

        {hasError && (
          <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-10a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {hint && !hasError && (
          <p id={hintId} className="text-xs text-surface-border">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
