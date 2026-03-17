"use client";

import { useState } from "react";
import Link         from "next/link";
import { useRouter } from "next/navigation";
import { createClient }  from "@/lib/supabase/client";
import { Button, Input } from "@/components/ui";
import { useToast }      from "@/hooks/useToast";
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from "@/lib/constants";

export function RegisterForm() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const [fullName,  setFullName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState<{ fullName?: string; email?: string; password?: string }>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!fullName.trim())                    next.fullName = "Full name is required.";
    if (!email)                              next.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))   next.email    = "Enter a valid email address.";
    if (!password)                           next.password = "Password is required.";
    else if (password.length < 8)            next.password = "Password must be at least 8 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      showError(error.message);
      setLoading(false);
      return;
    }

    success("Account created! Check your email to confirm your address.");
    router.push(DASHBOARD_ROUTE);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white">Create your account</h1>
        <p className="text-sm text-surface-border">Get started with Zenforge today.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          required
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          hint="Minimum 8 characters."
          required
        />

        <Button type="submit" isLoading={loading} className="w-full mt-2">
          Create account
        </Button>
      </form>

      <p className="text-center text-xs text-surface-border">
        Already have an account?{" "}
        <Link href={LOGIN_ROUTE} className="text-brand-400 hover:text-brand-300 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
