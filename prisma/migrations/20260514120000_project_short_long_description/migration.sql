-- AlterTable
ALTER TABLE "Project" RENAME COLUMN "description" TO "longDescription";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "shortDescription" TEXT NOT NULL DEFAULT '';

ALTER TABLE "Project" ALTER COLUMN "shortDescription" DROP DEFAULT;
