import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifySessionToken,
} from "@/lib/admin-session";

export { SESSION_COOKIE, createSessionToken, sessionCookieOptions };

function timingSafeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/** Validates username/password against the AdminUser table. */
export async function validateAdminLogin(
  inputUsername: string,
  inputPassword: string
): Promise<boolean> {
  const user = await prisma.adminUser.findUnique({
    where: { username: inputUsername },
  });

  if (!user) return false;

  return (
    timingSafeStringEqual(inputUsername, user.username) &&
    timingSafeStringEqual(inputPassword, user.password)
  );
}

const MIN_ADMIN_PASSWORD_LENGTH = 8;

/** Updates password after verifying current credentials. */
export async function changeAdminPassword(
  inputUsername: string,
  currentPassword: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const username = inputUsername.trim();

  if (!username || !currentPassword || !newPassword) {
    return { ok: false, error: "All fields are required" };
  }

  if (newPassword.length < MIN_ADMIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      error: `New password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters`,
    };
  }

  if (timingSafeStringEqual(currentPassword, newPassword)) {
    return { ok: false, error: "New password must be different from the current password" };
  }

  const user = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (
    !user ||
    !timingSafeStringEqual(username, user.username) ||
    !timingSafeStringEqual(currentPassword, user.password)
  ) {
    return { ok: false, error: "Invalid credentials" };
  }

  await prisma.adminUser.update({
    where: { username },
    data: { password: newPassword },
  });

  return { ok: true };
}

export async function getSessionFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getSessionFromCookies();
  if (!token) return false;
  return verifySessionToken(token);
}
