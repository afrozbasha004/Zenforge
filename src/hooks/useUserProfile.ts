"use client";

import { useEffect, useCallback, useRef } from "react";
import { createClient }     from "@/lib/supabase/client";
import { useAuthStore }     from "@/stores/authStore";
import { useProfileStore }  from "@/stores/profileStore";
import type { UserProfile } from "@/types";
import type { ProfileRow }  from "@/stores/profileStore";

function mapRowToProfile(row: ProfileRow): UserProfile {
  return {
    id:        row.id,
    email:     row.email,
    fullName:  row.full_name,
    avatarUrl: row.avatar_url,
    role:      row.role,
    isPremium: row.is_premium,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface UseUserProfileReturn {
  profile:   UserProfile | null;
  raw:       ProfileRow  | null;
  isLoading: boolean;
  error:     string | null;
  refetch:   () => Promise<void>;
}

export function useUserProfile(): UseUserProfileReturn {
  const user          = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  const rawProfile = useProfileStore((s) => s.profile);
  const isLoading  = useProfileStore((s) => s.isLoading);
  const error      = useProfileStore((s) => s.error);
  const setProfile = useProfileStore((s) => s.setProfile);
  const setLoading = useProfileStore((s) => s.setLoading);
  const setError   = useProfileStore((s) => s.setError);
  const reset      = useProfileStore((s) => s.reset);

  const isMounted = useRef(true);

  const fetchProfile = useCallback(async () => {
    if (!user || !isInitialized) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!isMounted.current) return;

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }
    if (!data){
      setProfile(null);
      setLoading(false);
      return;
    }

    setProfile(data);
    setLoading(false);
  }, [user, isInitialized, setProfile, setLoading, setError]);

  useEffect(() => {
    isMounted.current = true;

    if (!isInitialized) return;

    if (!user) {
      reset();
      return;
    }

    fetchProfile();

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isInitialized]);

  const profile: UserProfile | null = rawProfile
    ? mapRowToProfile(rawProfile)
    : null;

  return {
    profile,
    raw:      rawProfile,
    isLoading,
    error,
    refetch:  fetchProfile,
  };
}
