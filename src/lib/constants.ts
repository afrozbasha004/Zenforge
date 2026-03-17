export const APP_NAME        = "Zenforge"                  as const;
export const APP_DESCRIPTION = "Build better products, faster." as const;
export const APP_VERSION     = "0.1.0"                     as const;

export const DASHBOARD_ROUTE     = "/dashboard"            as const;
export const LOGIN_ROUTE         = "/login"                as const;
export const REGISTER_ROUTE      = "/register"             as const;
export const HOME_ROUTE          = "/"                     as const;
export const SETTINGS_ROUTE      = "/settings"             as const;
export const AUTH_CALLBACK_ROUTE = "/api/auth/callback"    as const;

export const PUBLIC_ROUTES: readonly string[] = [
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  AUTH_CALLBACK_ROUTE,
] as const;

export const PROTECTED_ROUTES: readonly string[] = [
  DASHBOARD_ROUTE,
  SETTINGS_ROUTE,
] as const;

export const AUTH_ROUTES: readonly string[] = [
  LOGIN_ROUTE,
  REGISTER_ROUTE,
] as const;

export const REDIRECT_PARAM            = "redirectTo"  as const;
export const SESSION_WARNING_MINUTES   = 5             as const;
export const TOAST_DURATION_MS         = 4000          as const;
export const SIDEBAR_WIDTH_PX          = 256           as const;
export const SIDEBAR_BREAKPOINT        = "lg"          as const;
export const DEFAULT_PAGE_SIZE         = 20            as const;
export const MAX_PAGE_SIZE             = 100           as const;
