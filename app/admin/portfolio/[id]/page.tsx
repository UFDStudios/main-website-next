"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/app/admin/components/AdminShell";
import PortfolioProjectForm from "@/app/admin/components/PortfolioProjectForm";
import type { PortfolioProject } from "@/app/components/portfolio/types";
import { adminUi } from "@/lib/admin-ui";

export default function AdminPortfolioEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Project not found");
      const data = (await res.json()) as PortfolioProject;
      setProject(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <AdminShell title={project ? `Edit: ${project.title}` : "Edit project"}>
      <Link href="/admin/portfolio" className={`inline-block mb-6 ${adminUi.link}`}>
        ← Back to portfolio
      </Link>

      {loading && <p className={adminUi.mutedSm}>Loading…</p>}
      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && project && (
        <PortfolioProjectForm
          projectId={project.id}
          initial={project}
          onSaved={() => {
            router.push("/admin/portfolio");
            router.refresh();
          }}
          onCancel={() => router.push("/admin/portfolio")}
        />
      )}
    </AdminShell>
  );
}
