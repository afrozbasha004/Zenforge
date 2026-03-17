import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(
    typeof date === "string" ? new Date(date) : date
  );
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getInitials(value: string): string {
  const cleaned = value.trim();
  if (cleaned.includes("@")) {
    return cleaned.split("@")[0]?.slice(0, 2).toUpperCase() ?? "??";
  }
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return (parts[0]?.slice(0, 2) ?? "??").toUpperCase();
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
}

export function isAbsoluteUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
