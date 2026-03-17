"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  isLoading?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-medium rounded-lg border",
  "transition-all duration-150 ease-in-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  "disabled:pointer-events-none disabled:opacity-40",
  "select-none",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary: [
    "bg-brand-500 border-brand-500 text-white",
    "hover:bg-brand-600 hover:border-brand-600",
    "active:bg-brand-700",
    "focus-visible:ring-brand-500",
    "shadow-sm shadow-brand-500/20",
  ].join(" "),
  secondary: [
    "bg-surface-muted border-surface-border text-white",
    "hover:bg-surface-border hover:border-surface-border",
    "active:bg-surface-muted",
    "focus-visible:ring-surface-border",
  ].join(" "),
  ghost: [
    "bg-transparent border-transparent text-surface-border",
    "hover:bg-surface-muted hover:text-white",
    "active:bg-surface-subtle",
    "focus-visible:ring-surface-border",
  ].join(" "),
  danger: [
    "bg-red-500/10 border-red-500/30 text-red-400",
    "hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300",
    "active:bg-red-500/30",
    "focus-visible:ring-red-500",
  ].join(" "),
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8  px-3 text-xs  gap-1.5",
  md: "h-10 px-4 text-sm  gap-2",
  lg: "h-12 px-5 text-base gap-2.5",
};

const spinnerSizes: Record<ButtonSize, "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "primary",
      size      = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={spinnerSizes[size]} className="text-current" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon  && <span aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
