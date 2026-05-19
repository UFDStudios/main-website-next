import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Neon pooler + Node pg: avoid channel_binding=require (P1001) and allow compute wake-up. */
function neonDatabaseUrl(raw: string): string {
  let url = raw;
  url = url.replace(/channel_binding=require/gi, "channel_binding=disable");
  if (!/[?&]connect_timeout=/i.test(url)) {
    url += `${url.includes("?") ? "&" : "?"}connect_timeout=30`;
  }
  return url;
}

function createPrismaClient() {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string to .env and restart the dev server."
    );
  }

  return new PrismaClient({
    datasources: { db: { url: neonDatabaseUrl(raw) } },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

