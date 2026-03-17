/**
 * Supabase Database Types — Zenforge
 *
 * Replace with CLI-generated output when schema is finalised:
 *   npx supabase gen types typescript --project-id YOUR_ID > src/types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = "owner" | "admin" | "moderator" | "user";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:          string;
          created_at:  string;
          updated_at:  string;
          email:       string;
          full_name:   string | null;
          avatar_url:  string | null;
          role:        AppRole;
          is_premium:  boolean;
        };
        Insert: {
          id:          string;
          created_at?: string;
          updated_at?: string;
          email:       string;
          full_name?:  string | null;
          avatar_url?: string | null;
          role?:       AppRole;
          is_premium?: boolean;
        };
        Update: {
          id?:         string;
          created_at?: string;
          updated_at?: string;
          email?:      string;
          full_name?:  string | null;
          avatar_url?: string | null;
          role?:       AppRole;
          is_premium?: boolean;
        };
        Relationships: [];
      };
    };
    Views:            { [_ in never]: never };
    Functions:        { [_ in never]: never };
    Enums: {
      user_role: AppRole;
    };
    CompositeTypes:   { [_ in never]: never };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
