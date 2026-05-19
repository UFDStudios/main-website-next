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

export async function getSessionFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getSessionFromCookies();
  if (!token) return false;
  return verifySessionToken(token);
}
