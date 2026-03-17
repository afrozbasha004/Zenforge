import type { Metadata } from "next";
import { RoleRouter }     from "@/roles/RoleRouter";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return <RoleRouter />;
}
