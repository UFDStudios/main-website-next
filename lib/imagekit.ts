import ImageKit, { toFile } from "@imagekit/nodejs";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB

let client: ImageKit | null = null;

function getImageKitClient(): ImageKit {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY ?? "";
  if (!privateKey) {
    throw new Error("ImageKit is not configured (IMAGEKIT_PRIVATE_KEY)");
  }
  if (!client) {
    client = new ImageKit({ privateKey });
  }
  return client;
}

export async function uploadBufferToImageKit(
  buffer: Buffer,
  fileName: string,
  folder: string
): Promise<string> {
  if (buffer.byteLength > MAX_BYTES) {
    throw new Error(`File is too large (max ${MAX_BYTES / (1024 * 1024)} MB)`);
  }

  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT ?? "";
  if (!endpoint) {
    throw new Error("ImageKit is not configured (IMAGEKIT_URL_ENDPOINT)");
  }

  const response = await getImageKitClient().files.upload({
    file: await toFile(buffer, fileName),
    fileName,
    folder,
    useUniqueFileName: true,
  });

  if (!response.url) {
    throw new Error("ImageKit upload returned no url");
  }

  return response.url;
}
