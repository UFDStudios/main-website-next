import { requireAdminPage } from "@/lib/admin-auth-page";

export default async function AdminPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminPage();
  return children;
}
