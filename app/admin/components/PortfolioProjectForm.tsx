"use client";

import Image from "next/image";
import { useState } from "react";
import type { PortfolioProject } from "@/app/components/portfolio/types";
import { adminUi } from "@/lib/admin-ui";
import RichTextEditor, { isRichTextEmpty } from "@/app/admin/components/RichTextEditor";

type FormState = {
  title: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  youtubeUrl: string;
  googlePlayLink: string;
  appStoreLink: string;
  enableVideo: boolean;
  genres: string;
  images: string;
};

function plainTextToHtml(text: string) {
  if (!text) return "";
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function toFormState(project?: PortfolioProject | null): FormState {
  return {
    title: project?.title ?? "",
    shortDescription: plainTextToHtml(project?.shortDescription ?? ""),
    longDescription: plainTextToHtml(project?.longDescription ?? ""),
    mainImage: project?.mainImage ?? "",
    youtubeUrl: project?.youtubeUrl ?? "",
    googlePlayLink: project?.googlePlayLink ?? "",
    appStoreLink: project?.appStoreLink ?? "",
    enableVideo: project?.enableVideo ?? false,
    genres: project?.genres?.join(", ") ?? "",
    images: project?.images?.join("\n") ?? "",
  };
}

export default function PortfolioProjectForm({
  projectId,
  initial,
  onSaved,
  onCancel,
}: {
  projectId?: string;
  initial?: PortfolioProject | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(() => toFormState(initial));
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const galleryUrls = form.images
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const isGalleryVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url);

  const uploading = uploadingMain || uploadingGallery;

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const uploadFileToUrl = async (file: File): Promise<string> => {
    const body = new FormData();
    body.set("file", file);
    body.set("folder", projectId ? `/portfolio/${projectId}` : "/portfolio/admin");

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body,
      credentials: "include",
    });

    const contentType = res.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? ((await res.json()) as { url?: string; error?: string })
      : null;

    if (!res.ok) {
      throw new Error(data?.error ?? `Upload failed (${res.status})`);
    }
    if (!data?.url) throw new Error("No URL returned from upload");
    return data.url;
  };

  const uploadFile = async (
    file: File,
    onUrl: (url: string) => void,
    setBusy: (busy: boolean) => void
  ) => {
    setBusy(true);
    setError(null);
    setUploadNotice(null);
    try {
      onUrl(await uploadFileToUrl(file));
      setUploadNotice("Image uploaded.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const appendGalleryUrl = (url: string) => {
    setForm((prev) => {
      const existing = prev.images.trim();
      const next = existing ? `${existing}\n${url}` : url;
      return { ...prev, images: next };
    });
  };

  const uploadGalleryFiles = async (files: File[]) => {
    if (files.length === 0) return;
    setUploadingGallery(true);
    setGalleryUploadProgress({ current: 0, total: files.length });
    setError(null);
    setUploadNotice(null);
    try {
      let completed = 0;
      for (const file of files) {
        const url = await uploadFileToUrl(file);
        appendGalleryUrl(url);
        completed += 1;
        setGalleryUploadProgress({ current: completed, total: files.length });
        setUploadNotice(
          completed === files.length
            ? files.length === 1
              ? "Image uploaded."
              : `${files.length} images uploaded.`
            : `Uploaded ${completed} of ${files.length}…`
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadingGallery(false);
      setGalleryUploadProgress(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (isRichTextEmpty(form.shortDescription) || isRichTextEmpty(form.longDescription)) {
      setError("Short and long descriptions are required.");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      mainImage: form.mainImage,
      youtubeUrl: form.youtubeUrl || null,
      googlePlayLink: form.googlePlayLink || null,
      appStoreLink: form.appStoreLink || null,
      enableVideo: form.enableVideo,
      genres: form.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      images: form.images
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean),
    };

    try {
      const url = projectId
        ? `/api/admin/portfolio/${projectId}`
        : "/api/admin/portfolio";
      const method = projectId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const uploadBtnClass = `${adminUi.btnSecondary} cursor-pointer inline-block`;

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      {saving && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Saving project"
        >
          <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
          <p className="text-sm font-medium text-foreground">Saving project…</p>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {uploadNotice && !error && (
        <p className="rounded-lg border border-neon-green/30 bg-neon-green/10 px-4 py-3 text-sm text-neon-green">
          {uploadNotice}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className={adminUi.label}>Title</span>
          <input
            required
            className={adminUi.input}
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </label>
        <div className="sm:col-span-2">
          <RichTextEditor
            label="Short description"
            required
            minHeight="5rem"
            contentClassName="text-lg"
            value={form.shortDescription}
            onChange={(html) => update("shortDescription", html)}
          />
        </div>
        <div className="sm:col-span-2">
          <RichTextEditor
            label="Long description"
            required
            minHeight="12rem"
            value={form.longDescription}
            onChange={(html) => update("longDescription", html)}
          />
        </div>
        <label className="block sm:col-span-2">
          <span className={adminUi.label}>Genres (comma-separated)</span>
          <input
            className={adminUi.input}
            value={form.genres}
            onChange={(e) => update("genres", e.target.value)}
            placeholder="Action, Puzzle, Casual"
          />
        </label>
      </div>

      <div className={`${adminUi.panel} p-4 space-y-4`}>
        <p className={`text-sm font-medium ${adminUi.body}`}>Main image</p>
        {form.mainImage && (
          <div className="relative h-40 w-64 rounded-lg overflow-hidden border border-foreground/10">
            <Image src={form.mainImage} alt="Main" fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            className={adminUi.input}
            value={form.mainImage}
            onChange={(e) => update("mainImage", e.target.value)}
            placeholder="Image URL"
            required
          />
          <label className={uploadBtnClass}>
            {uploadingMain ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingMain}
              onChange={(e) => {
                const input = e.target;
                const file = input.files?.[0];
                if (file) {
                  void uploadFile(file, (url) => update("mainImage", url), setUploadingMain);
                }
                input.value = "";
              }}
            />
          </label>
        </div>
      </div>

      <div className="block">
        <span className={adminUi.label}>Gallery image URLs (one per line)</span>
        {galleryUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {galleryUrls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5"
              >
                {isGalleryVideo(url) ? (
                  <video
                    src={url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <textarea
          rows={4}
          className={`${adminUi.textarea} text-xs mt-3`}
          value={form.images}
          onChange={(e) => update("images", e.target.value)}
        />
        <label className={`mt-2 ${uploadBtnClass}`}>
          {uploadingGallery && galleryUploadProgress
            ? `Uploading ${galleryUploadProgress.current}/${galleryUploadProgress.total}…`
            : uploadingGallery
              ? "Uploading…"
              : "Add gallery images"}
          <input
            type="file"
            accept="image/*,video/mp4"
            multiple
            className="hidden"
            disabled={uploadingGallery}
            onChange={(e) => {
              const input = e.target;
              const files = input.files ? Array.from(input.files) : [];
              if (files.length > 0) {
                void uploadGalleryFiles(files);
              }
              input.value = "";
            }}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={adminUi.label}>YouTube URL</span>
          <input
            className={adminUi.input}
            value={form.youtubeUrl}
            onChange={(e) => update("youtubeUrl", e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 sm:col-span-2 sm:mt-6">
          <input
            type="checkbox"
            checked={form.enableVideo}
            onChange={(e) => update("enableVideo", e.target.checked)}
            className="rounded border-neon-green/40 accent-neon-green"
          />
          <span className={adminUi.label}>Enable video in modal</span>
        </label>
        <label className="block">
          <span className={adminUi.label}>Google Play link</span>
          <input
            className={adminUi.input}
            value={form.googlePlayLink}
            onChange={(e) => update("googlePlayLink", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={adminUi.label}>App Store link</span>
          <input
            className={adminUi.input}
            value={form.appStoreLink}
            onChange={(e) => update("appStoreLink", e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" disabled={saving || uploading} className={adminUi.btnPrimary}>
          {saving ? "Saving…" : projectId ? "Save changes" : "Create project"}
        </button>
        <button type="button" onClick={onCancel} className={adminUi.btnSecondary}>
          Cancel
        </button>
      </div>
    </form>
  );
}
