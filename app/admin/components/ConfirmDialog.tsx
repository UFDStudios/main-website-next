"use client";

import { useEffect, useId, useRef } from "react";
import { adminUi } from "@/lib/admin-ui";

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  loading?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
};

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
  error = null,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("modal-open");
    cancelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm admin-dialog-backdrop"
        aria-label="Close dialog"
        disabled={loading}
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`relative w-full max-w-md ${adminUi.panelLg} p-6 sm:p-7 shadow-2xl shadow-black/50 admin-dialog-panel`}
      >
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-5">
          <div
            className={`mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border sm:mb-0 ${
              isDanger
                ? "border-red-500/30 bg-red-500/15 text-red-400"
                : "border-neon-green/30 bg-neon-green/10 text-neon-green"
            }`}
          >
            {isDanger ? <TrashIcon className="h-7 w-7" /> : null}
          </div>

          <div className="min-w-0 flex-1">
            <h2 id={titleId} className={`${adminUi.heading} text-lg sm:text-xl`}>
              {title}
            </h2>
            <p id={descId} className={`mt-2 text-sm leading-relaxed ${adminUi.muted}`}>
              {description}
            </p>
            {error && (
              <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            disabled={loading}
            onClick={onCancel}
            className={`${adminUi.btnSecondary} w-full sm:w-auto disabled:opacity-50`}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={
              isDanger
                ? "w-full sm:w-auto rounded-lg border border-red-500/50 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(239,68,68,0.35)] transition-all duration-300 hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                : `${adminUi.btnPrimary} w-full sm:w-auto`
            }
          >
            {loading ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}