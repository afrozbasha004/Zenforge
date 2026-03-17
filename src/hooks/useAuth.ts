"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

export function useAuth() {
  const supabase = createClient();
  const { user, isInitialized, loading, setUser, setInitialized, setLoading, reset } =
    useAuthStore();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const handleAuthChange = (
      event: AuthChangeEvent,
      session: Session | null
    ) => {
      if (!isMounted.current) return;

      const currentUser: User | null = session?.user ?? null;

      switch (event) {
        case "INITIAL_SESSION": {
          setUser(currentUser);
          setLoading(false);
          setInitialized(true);
          break;
        }
        case "SIGNED_IN": {
          setUser(currentUser);
          setLoading(false);
          break;
        }
        case "SIGNED_OUT": {
          reset();
          break;
        }
        case "TOKEN_REFRESHED": {
          setUser(currentUser);
          break;
        }
        case "USER_UPDATED": {
          setUser(currentUser);
          break;
        }
        default:
          break;
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isInitialized, loading };
}
