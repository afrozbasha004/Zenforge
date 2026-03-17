import { cn } from "@/lib/utils";
import type { WithClassName, WithChildren } from "@/types";

export interface CardProps extends WithClassName, WithChildren {
  header?:       React.ReactNode;
  title?:        string;
  subtitle?:     string;
  headerAction?: React.ReactNode;
  noPadding?:    boolean;
  elevated?:     boolean;
  interactive?:  boolean;
  as?:           React.ElementType;
}

export function CardHeader({ children, className }: WithChildren & WithClassName) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-surface-border px-6 py-4", className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, noPadding = false }: WithChildren & WithClassName & { noPadding?: boolean }) {
  return (
    <div className={cn(!noPadding && "px-6 py-5", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: WithChildren & WithClassName) {
  return (
    <div className={cn("flex items-center gap-3 border-t border-surface-border px-6 py-4", className)}>
      {children}
    </div>
  );
}

export function Card({
  title,
  subtitle,
  header,
  headerAction,
  noPadding   = false,
  elevated    = false,
  interactive = false,
  children,
  className,
  as: Tag = "div",
}: CardProps) {
  const hasDefaultHeader = (title ?? subtitle ?? headerAction) !== undefined;

  return (
    <Tag
      className={cn(
        "rounded-xl border border-surface-border bg-surface-subtle overflow-hidden",
        elevated     && "shadow-lg shadow-black/30",
        interactive  && "cursor-pointer transition-all duration-150 hover:border-brand-500/40 hover:shadow-md hover:shadow-brand-500/10 active:scale-[0.99]",
        className
      )}
    >
      {header ?? (
        hasDefaultHeader && (
          <CardHeader>
            <div className="flex flex-col gap-0.5">
              {title    && <h3 className="text-sm font-semibold text-white">{title}</h3>}
              {subtitle && <p  className="text-xs text-surface-border">{subtitle}</p>}
            </div>
            {headerAction && <div className="shrink-0">{headerAction}</div>}
          </CardHeader>
        )
      )}
      <CardBody noPadding={noPadding}>{children}</CardBody>
    </Tag>
  );
}

Card.Header = CardHeader;
Card.Body   = CardBody;
Card.Footer = CardFooter;
