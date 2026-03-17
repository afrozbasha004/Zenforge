import { NextResponse }  from "next/server";
import { createClient }  from "@/lib/supabase/server";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code        = searchParams.get("code");
  const redirectTo  = searchParams.get("redirectTo") ?? DASHBOARD_ROUTE;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  return NextResponse.redirect(`${origin}${LOGIN_ROUTE}?error=auth_callback_failed`);
}
