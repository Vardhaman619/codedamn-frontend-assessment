/*
  Warnings:

  - Added the required column `image` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageKey` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "imageKey" TEXT NOT NULL,
ALTER COLUMN "credentialLink" DROP NOT NULL;
