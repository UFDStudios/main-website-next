-- AlterTable
ALTER TABLE "Project" ADD COLUMN "youtubeUrl" TEXT,
ADD COLUMN "googlePlayLink" TEXT,
ADD COLUMN "appStoreLink" TEXT,
ADD COLUMN "enableVideo" BOOLEAN NOT NULL DEFAULT false;
