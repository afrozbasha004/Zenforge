export type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
  AppRole,
} from "./supabase";

export interface UserProfile {
  id:          string;
  email:       string;
  fullName:    string | null;
  avatarUrl:   string | null;
  role:        import("./supabase").AppRole;
  isPremium:   boolean;
  createdAt:   string;
  updatedAt:   string;
}

export type ApiResponse<T = void> =
  | { success: true;  data: T }
  | { success: false; error: string; code?: string };

export interface NavItem {
  label:      string;
  href:       string;
  icon?:      string;
  protected?: boolean;
}

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id:        string;
  message:   string;
  variant:   ToastVariant;
  duration?: number;
}

export interface WithClassName  { className?:  string }
export interface WithChildren   { children:    React.ReactNode }
