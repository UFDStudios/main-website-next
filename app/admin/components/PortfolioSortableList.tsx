"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import type { PortfolioProject } from "@/app/components/portfolio/types";
import { adminUi } from "@/lib/admin-ui";

type DropIndicator = {
  targetId: string;
  position: "before" | "after";
};

/** Move item from one index to another in the final list order. */
function moveItem(items: PortfolioProject[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return items;
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

function getInsertIndex(fromIndex: number, hoverIndex: number, placeAfter: boolean) {
  let index = placeAfter ? hoverIndex + 1 : hoverIndex;
  if (fromIndex < index) index -= 1;
  return index;
}

function isInteractiveDragTarget(target: EventTarget | null) {
  return Boolean(
    target instanceof Element && target.closest("a, button, input, textarea, select"),
  );
}

export default function PortfolioSortableList({
  projects,
  onProjectsChange,
  onRequestDelete,
  disabled,
}: {
  projects: PortfolioProject[];
  onProjectsChange: (projects: PortfolioProject[]) => void;
  onRequestDelete: (project: { id: string; title: string }) => void;
  disabled?: boolean;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const rowRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  const saveOrder = useCallback(async (ordered: PortfolioProject[]) => {
    setSavingOrder(true);
    setOrderError(null);
    try {
      const res = await fetch("/api/admin/portfolio/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: ordered.map((p) => p.id) }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || "Failed to save order");
      }
    } catch (e) {
      setOrderError(e instanceof Error ? e.message : "Failed to save order");
      throw e;
    } finally {
      setSavingOrder(false);
    }
  }, []);

  const clearDragState = () => {
    setDraggingId(null);
    setDropIndicator(null);
  };

  const updateDropIndicator = (targetId: string, clientY: number) => {
    const row = rowRefs.current.get(targetId);
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const position: DropIndicator["position"] =
      clientY < rect.top + rect.height / 2 ? "before" : "after";
    setDropIndicator((prev) =>
      prev?.targetId === targetId && prev.position === position
        ? prev
        : { targetId, position },
    );
  };

  const applyReorder = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || disabled || savingOrder) return;

    const previous = projects;
    const reordered = moveItem(projects, fromIndex, toIndex);
    onProjectsChange(reordered);

    try {
      await saveOrder(reordered);
    } catch {
      onProjectsChange(previous);
    }
  };

  const handleDrop = async () => {
    const sourceId = draggingId;
    const indicator = dropIndicator;
    clearDragState();

    if (!sourceId || !indicator || disabled || savingOrder) return;

    const fromIndex = projects.findIndex((p) => p.id === sourceId);
    const hoverIndex = projects.findIndex((p) => p.id === indicator.targetId);
    if (fromIndex < 0 || hoverIndex < 0) return;

    const toIndex = getInsertIndex(fromIndex, hoverIndex, indicator.position === "after");
    await applyReorder(fromIndex, toIndex);
  };

  const listDisabled = disabled || savingOrder;

  return (
    <div className="space-y-3">
      <p className={`text-xs ${adminUi.muted}`}>
        Drag a project row up or down to change its rank. The top row is shown first on the
        public portfolio page.
        {savingOrder ? " Saving order…" : null}
      </p>

      {orderError && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {orderError}
        </p>
      )}

      <ul className="space-y-3">
        {projects.map((project, index) => {
          const isDragging = draggingId === project.id;
          const showBefore =
            dropIndicator?.targetId === project.id && dropIndicator.position === "before";
          const showAfter =
            dropIndicator?.targetId === project.id && dropIndicator.position === "after";

          return (
            <li
              key={project.id}
              ref={(el) => {
                if (el) rowRefs.current.set(project.id, el);
                else rowRefs.current.delete(project.id);
              }}
              draggable={!listDisabled}
              onDragStart={(e) => {
                if (listDisabled || isInteractiveDragTarget(e.target)) {
                  e.preventDefault();
                  return;
                }
                setDraggingId(project.id);
                setDropIndicator(null);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", project.id);
              }}
              onDragOver={(e) => {
                if (!draggingId || listDisabled || draggingId === project.id) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                updateDropIndicator(project.id, e.clientY);
              }}
              onDragLeave={(e) => {
                const related = e.relatedTarget;
                if (related instanceof Node && e.currentTarget.contains(related)) return;
                setDropIndicator((prev) =>
                  prev?.targetId === project.id ? null : prev,
                );
              }}
              onDrop={(e) => {
                e.preventDefault();
                void handleDrop();
              }}
              onDragEnd={clearDragState}
              className={`relative flex flex-wrap items-center gap-4 ${adminUi.card} transition-shadow select-none ${
                listDisabled ? "cursor-not-allowed opacity-70" : "cursor-grab active:cursor-grabbing"
              } ${isDragging ? "opacity-40" : ""}`}
            >
              {showBefore && (
                <span
                  className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-0.5 bg-neon-green shadow-[0_0_8px_#11ff00]"
                  aria-hidden
                />
              )}
              {showAfter && (
                <span
                  className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-neon-green shadow-[0_0_8px_#11ff00]"
                  aria-hidden
                />
              )}

              <span
                className="flex h-10 w-8 shrink-0 items-center justify-center text-gray-500"
                aria-hidden
              >
                <HiOutlineBars3 className="h-5 w-5" />
              </span>

              <span
                className={`w-6 shrink-0 text-center text-xs font-semibold tabular-nums ${adminUi.muted}`}
                aria-label={`Rank ${index + 1}`}
              >
                {index + 1}
              </span>

              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-foreground/10 pointer-events-none">
                {project.mainImage ? (
                  <Image
                    src={project.mainImage}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                    draggable={false}
                  />
                ) : (
                  <div className="h-full w-full bg-foreground/5" />
                )}
              </div>

              <div className="min-w-0 flex-1 pointer-events-none">
                <p className="truncate font-medium text-foreground">{project.title}</p>
                <p className={`mt-0.5 text-xs ${adminUi.muted}`}>
                  {project.genres.join(" · ") || "No genres"}
                </p>
              </div>

              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link
                  href={`/admin/portfolio/${project.id}`}
                  className={adminUi.btnSecondary}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={() => onRequestDelete({ id: project.id, title: project.title })}
                  disabled={listDisabled}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
