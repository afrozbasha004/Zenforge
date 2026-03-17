"use client";

import { useState } from "react";
import Link         from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient }  from "@/lib/supabase/client";
import { Button, Input } from "@/components/ui";
import { useToast }      from "@/hooks/useToast";
import { DASHBOARD_ROUTE, REGISTER_ROUTE, REDIRECT_PARAM } from "@/lib/constants";

export function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { error: showError } = useToast();

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState<{ email?: string; password?: string }>({});

  const redirectTo = searchParams.get(REDIRECT_PARAM) ?? DASHBOARD_ROUTE;

  function validate(): boolean {
    const next: typeof errors = {};
    if (!email)                         next.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email address.";
    if (!password)                      next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-surface-border">Sign in to your account to continue.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />

        <Button type="submit" isLoading={loading} className="w-full mt-2">
          Sign in
        </Button>
      </form>

      <p className="text-center text-xs text-surface-border">
        Don&apos;t have an account?{" "}
        <Link href={REGISTER_ROUTE} className="text-brand-400 hover:text-brand-300 transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}
