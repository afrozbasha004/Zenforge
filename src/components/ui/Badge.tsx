import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default" | "brand" | "success" | "warning" | "danger" | "info" | "premium";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  variant?:   BadgeVariant;
  size?:      BadgeSize;
  dot?:       boolean;
  children:   React.ReactNode;
  className?: string;
}

const base = "inline-flex items-center gap-1.5 font-medium rounded-full border whitespace-nowrap";

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-muted  border-surface-border  text-surface-border",
  brand:   "bg-brand-500/10   border-brand-500/30    text-brand-400",
  success: "bg-emerald-500/10 border-emerald-500/30  text-emerald-400",
  warning: "bg-amber-500/10   border-amber-500/30    text-amber-400",
  danger:  "bg-red-500/10     border-red-500/30      text-red-400",
  info:    "bg-sky-500/10     border-sky-500/30      text-sky-400",
  premium: "border-amber-400/30 text-amber-300 bg-gradient-to-r from-amber-500/10 to-yellow-500/10",
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-2   py-0.5 text-xs",
  md: "px-2.5 py-1   text-xs",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-surface-border",
  brand:   "bg-brand-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger:  "bg-red-400",
  info:    "bg-sky-400",
  premium: "bg-amber-400",
};

export function Badge({ variant = "default", size = "md", dot = false, children, className }: BadgeProps) {
  return (
    <span className={cn(base, variants[variant], sizes[size], className)}>
      {dot && (
        <span
          aria-hidden="true"
          className={cn("inline-block h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
