"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/app/admin/components/AdminShell";
import ConfirmDialog from "@/app/admin/components/ConfirmDialog";
import PortfolioSortableList from "@/app/admin/components/PortfolioSortableList";
import type { PortfolioProject } from "@/app/components/portfolio/types";
import { adminUi } from "@/lib/admin-ui";

export default function AdminPortfolioListPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/portfolio", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load projects");
      const data = (await res.json()) as PortfolioProject[];
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const closeDeleteDialog = () => {
    if (deleting) return;
    setPendingDelete(null);
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/admin/portfolio/${pendingDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      setPendingDelete(null);
      await load();
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const listBusy = loading || deleting;

  return (
    <AdminShell title="Portfolio projects">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className={adminUi.mutedSm}>
          Add, edit, or remove portfolio projects shown on the public site.
        </p>
        <Link href="/admin/portfolio/new" className={adminUi.btnPrimary}>
          + Add New Project
        </Link>
      </div>

      {listBusy && (
        <p className={adminUi.mutedSm}>
          {deleting ? "Deleting project…" : "Loading projects…"}
        </p>
      )}

      {error && !listBusy && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {!listBusy && !error && projects.length === 0 && (
        <p className={adminUi.mutedSm}>No projects yet. Create your first one.</p>
      )}

      {!listBusy && !error && projects.length > 0 && (
        <PortfolioSortableList
          projects={projects}
          onProjectsChange={setProjects}
          disabled={deleting}
          onRequestDelete={(project) => {
            setDeleteError(null);
            setPendingDelete(project);
          }}
        />
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete project?"
        variant="danger"
        confirmLabel="Delete project"
        cancelLabel="Keep project"
        loading={deleting}
        error={deleteError}
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
        description={
          <>
            You&apos;re about to permanently remove{" "}
            <span className="font-medium text-foreground">
              &ldquo;{pendingDelete?.title}&rdquo;
            </span>{" "}
            from the portfolio. This action cannot be undone.
          </>
        }
      />
    </AdminShell>
  );
}
