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
