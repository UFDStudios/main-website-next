"use client";

import { useRouter } from "next/navigation";
import AdminShell from "@/app/admin/components/AdminShell";
import PortfolioProjectForm from "@/app/admin/components/PortfolioProjectForm";

export default function AdminPortfolioNewPage() {
  const router = useRouter();

  return (
    <AdminShell title="New portfolio project">
      <PortfolioProjectForm
        onSaved={() => {
          router.push("/admin/portfolio");
          router.refresh();
        }}
        onCancel={() => router.push("/admin/portfolio")}
      />
    </AdminShell>
  );
}
