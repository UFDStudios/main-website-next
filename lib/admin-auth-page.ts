import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export async function requireAdminPage() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    redirect("/admin/login");
  }
}
