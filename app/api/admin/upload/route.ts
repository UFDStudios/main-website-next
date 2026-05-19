import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { uploadBufferToImageKit } from "@/lib/imagekit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "/portfolio/admin";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadBufferToImageKit(buffer, file.name, folder);

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[api/admin/upload] failed", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
