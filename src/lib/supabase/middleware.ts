import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase";
import { PROTECTED_ROUTES, AUTH_ROUTES, LOGIN_ROUTE, DASHBOARD_ROUTE, REDIRECT_PARAM } from "@/lib/constants";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet)any[] {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = LOGIN_ROUTE;
    redirectUrl.searchParams.set(REDIRECT_PARAM, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = DASHBOARD_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
