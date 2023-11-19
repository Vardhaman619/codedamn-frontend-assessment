/*
  Warnings:

  - Added the required column `imageKey` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coverImageKey" TEXT,
ADD COLUMN     "imageKey" TEXT;
