import { uploadBufferToImageKit, isImageKitConfigured } from "@/lib/imagekit";
import { uploadBufferToLocal } from "@/lib/local-upload";

function useLocalStorageOnly(): boolean {
  return process.env.UPLOAD_STORAGE === "local";
}

function isImageKitNetworkError(err: unknown): boolean {
  const codes = new Set(["ENOTFOUND", "ECONNREFUSED", "ETIMEDOUT", "EAI_AGAIN"]);
  let current: unknown = err;

  for (let depth = 0; depth < 6 && current; depth++) {
    if (current instanceof Error) {
      const code = (current as NodeJS.ErrnoException).code;
      if (code && codes.has(code)) return true;
      if (/connection error|fetch failed/i.test(current.message)) return true;
      current = current.cause;
      continue;
    }
    break;
  }

  return false;
}

/** Admin uploads: ImageKit in production; local disk when configured or ImageKit is unreachable in dev. */
export async function uploadAdminFile(
  buffer: Buffer,
  fileName: string,
  folder: string
): Promise<string> {
  if (useLocalStorageOnly()) {
    return uploadBufferToLocal(buffer, fileName, folder);
  }

  if (!isImageKitConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[upload] ImageKit not configured — saving to public/uploads");
      return uploadBufferToLocal(buffer, fileName, folder);
    }
    throw new Error(
      "ImageKit is not configured. Set IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT, or UPLOAD_STORAGE=local for development."
    );
  }

  try {
    return await uploadBufferToImageKit(buffer, fileName, folder);
  } catch (err) {
    if (process.env.NODE_ENV === "development" && isImageKitNetworkError(err)) {
      console.warn(
        "[upload] ImageKit unreachable (DNS/network). Saving to public/uploads instead."
      );
      return uploadBufferToLocal(buffer, fileName, folder);
    }
    if (isImageKitNetworkError(err)) {
      throw new Error(
        "Could not reach ImageKit (upload.imagekit.io). Check network/DNS or use UPLOAD_STORAGE=local in development."
      );
    }
    throw err;
  }
}
