import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function assertEnv() {
  const missing = ["IMAGEKIT_PRIVATE_KEY", "IMAGEKIT_URL_ENDPOINT"].filter(
    (k) => !process.env[k]
  );
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(", ")} (set them in .env)`);
  }
}

function publicUrlToLocalFile(publicUrl: string) {
  if (!publicUrl.startsWith("/")) return null;
  // Works for Next public/ assets like "/images/..."
  return path.join(process.cwd(), "public", publicUrl.replaceAll("/", path.sep));
}

async function uploadFile(localFilePath: string, destPath: string) {
  const file = await fs.promises.readFile(localFilePath);
  const fileName = path.basename(localFilePath);

  console.log(`[upload] ${destPath}/${fileName}`);

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY ?? "";
  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT ?? "";
  const uploadEndpoint = "https://upload.imagekit.io/api/v1/files/upload";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const form = new FormData();
    form.set("file", new Blob([file]), fileName);
    form.set("fileName", fileName);
    form.set("folder", destPath);
    form.set("useUniqueFileName", "false");

    const res = await fetch(uploadEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
      },
      body: form as any,
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`ImageKit upload failed (${res.status}): ${text.slice(0, 500)}`);
    }

    const json = (await res.json()) as { url?: string };
    if (!json.url) throw new Error("ImageKit upload returned no url");

    // Quick sanity: url should start with your ImageKit endpoint
    if (!json.url.startsWith(endpoint)) {
      console.warn(`[warn] Uploaded url doesn't match IMAGEKIT_URL_ENDPOINT: ${json.url}`);
    }

    return json.url;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  assertEnv();

  const projects = await prisma.project.findMany({
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  const cache = new Map<string, string>(); // localUrl -> imagekitUrl
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  let processed = 0;

  for (const project of projects) {
    const folder = `/portfolio/${project.id}`;

    // mainImage
    if (project.mainImage.startsWith("/")) {
      const local = publicUrlToLocalFile(project.mainImage);
      if (!local || !fs.existsSync(local)) {
        console.warn(`[warn] mainImage file missing: ${project.mainImage}`);
      } else {
        try {
          const existing = cache.get(project.mainImage);
          const url = existing ?? (await uploadFile(local, folder));
          if (!url) throw new Error("ImageKit upload returned no url");

          if (!existing) {
            cache.set(project.mainImage, url);
            uploaded++;
          } else {
            skipped++;
          }

          await prisma.project.update({
            where: { id: project.id },
            data: { mainImage: url },
          });
        } catch (e) {
          failed++;
          console.warn(`[warn] mainImage upload failed: ${project.mainImage}`, e);
        } finally {
          processed++;
          console.log(`Progress: processed=${processed} uploaded=${uploaded} reused=${skipped} failed=${failed}`);
        }
      }
    }

    // media
    for (const m of project.media) {
      if (!m.url.startsWith("/")) continue; // already remote
      const local = publicUrlToLocalFile(m.url);
      if (!local || !fs.existsSync(local)) {
        console.warn(`[warn] media file missing: ${m.url}`);
        continue;
      }

      try {
        const existing = cache.get(m.url);
        const url = existing ?? (await uploadFile(local, folder));
        if (!url) throw new Error("ImageKit upload returned no url");

        if (!existing) {
          cache.set(m.url, url);
          uploaded++;
        } else {
          skipped++;
        }

        await prisma.media.update({
          where: { id: m.id },
          data: { url },
        });
      } catch (e) {
        failed++;
        console.warn(`[warn] media upload failed: ${m.url}`, e);
      } finally {
        processed++;
        console.log(`Progress: processed=${processed} uploaded=${uploaded} reused=${skipped} failed=${failed}`);
      }
    }
  }

  console.log(`Done. Uploaded: ${uploaded}, reused: ${skipped}, failed: ${failed}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

