import { NextResponse } from "next/server";
import { changeAdminPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      currentPassword?: string;
      newPassword?: string;
    };

    const result = await changeAdminPassword(
      body.username ?? "",
      body.currentPassword ?? "",
      body.newPassword ?? ""
    );

    if (!result.ok) {
      const status = result.error === "Invalid credentials" ? 401 : 400;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/change-password] failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Password change failed" },
      { status: 500 }
    );
  }
}
