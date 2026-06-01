-- AlterTable
ALTER TABLE "Project" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Preserve current display order (newest first → lowest sortOrder)
WITH ranked AS (
  SELECT id, (ROW_NUMBER() OVER (ORDER BY "createdAt" DESC) - 1)::INTEGER AS rn
  FROM "Project"
)
UPDATE "Project" SET "sortOrder" = ranked.rn FROM ranked WHERE "Project".id = ranked.id;

-- CreateIndex
CREATE INDEX "Project_sortOrder_idx" ON "Project"("sortOrder");
