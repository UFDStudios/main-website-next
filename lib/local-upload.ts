import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB

function sanitizeSegment(segment: string): string {
  return segment.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "") || "file";
}

export async function uploadBufferToLocal(
  buffer: Buffer,
  fileName: string,
  folder: string
): Promise<string> {
  if (buffer.byteLength > MAX_BYTES) {
    throw new Error(`File is too large (max ${MAX_BYTES / (1024 * 1024)} MB)`);
  }

  const ext = path.extname(fileName);
  const base = sanitizeSegment(path.basename(fileName, ext)) || "file";
  const uniqueName = `${base}-${randomBytes(6).toString("hex")}${ext}`;

  const folderParts = folder.split("/").filter(Boolean).map(sanitizeSegment);
  const relDir = path.join("uploads", ...folderParts);
  const absDir = path.join(process.cwd(), "public", relDir);

  await fs.mkdir(absDir, { recursive: true });
  await fs.writeFile(path.join(absDir, uniqueName), buffer);

  const urlPath = [relDir.replaceAll(path.sep, "/"), uniqueName].join("/");
  return `/${urlPath}`;
}
