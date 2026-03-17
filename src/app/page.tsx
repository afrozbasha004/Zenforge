import { redirect } from "next/navigation";
import { DASHBOARD_ROUTE } from "@/lib/constants";

export default function HomePage() {
  redirect(DASHBOARD_ROUTE);
}
