"use client";

import { useProfileStore } from "@/stores/profileStore";
import type { AppRole }    from "@/types";

interface UseRoleReturn {
  role:         AppRole | null;
  isOwner:      boolean;
  isAdmin:      boolean;
  isModerator:  boolean;
  isUser:       boolean;
  isPrivileged: boolean;
  isStaff:      boolean;
  hasMinRole:   (minRole: AppRole) => boolean;
}

const ROLE_HIERARCHY: AppRole[] = ["user", "moderator", "admin", "owner"];

export function useRole(): UseRoleReturn {
  const profile = useProfileStore((s) => s.profile);
  const role: AppRole | null = profile?.role ?? null;

  const isOwner     = role === "owner";
  const isAdmin     = role === "admin";
  const isModerator = role === "moderator";
  const isUser      = role === "user";
  const isPrivileged = isOwner || isAdmin;
  const isStaff      = isOwner || isAdmin || isModerator;

  const hasMinRole = (minRole: AppRole): boolean => {
    if (role === null) return false;
    return ROLE_HIERARCHY.indexOf(role) >= ROLE_HIERARCHY.indexOf(minRole);
  };

  return {
    role,
    isOwner,
    isAdmin,
    isModerator,
    isUser,
    isPrivileged,
    isStaff,
    hasMinRole,
  };
}
