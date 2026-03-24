"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";

export interface Habit {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

interface UseHabitsReturn {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useHabits(): UseHabitsReturn {
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);

  const fetchHabits = useCallback(async () => {
    if (!isInitialized) return;

    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { data, error: fetchError } = await supabase
      .from("habits")
      .select("id, user_id, title, completed, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!isMounted.current) return;

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setHabits(data ?? []);
    setLoading(false);
  }, [user, isInitialized]);

  useEffect(() => {
    isMounted.current = true;
    alert("RUNNING");

    if (!isInitialized) return;

    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    fetchHabits();

    return () => {
      isMounted.current = false;
    };
  }, [user?.id, isInitialized, fetchHabits]);

  return { habits, loading, error, refetch: fetchHabits };
}
