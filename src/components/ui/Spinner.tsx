import { cn } from "@/lib/utils";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export interface SpinnerProps {
  size?:      SpinnerSize;
  className?: string;
  label?:     string;
}

const sizes: Record<SpinnerSize, string> = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function Spinner({ size = "md", className, label = "Loading…" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <span
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-full border-current border-t-transparent opacity-80",
          sizes[size],
          className
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
