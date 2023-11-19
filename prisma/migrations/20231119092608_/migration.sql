/*
  Warnings:

  - The values [JS] on the enum `Languages` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Languages_new" AS ENUM ('HTML', 'JAVA', 'JAVASCRIPT', 'MONGODB', 'NEXTJS', 'NODEJS', 'PYTHON', 'REACT', 'TAILWINDCSS', 'TYPESCRIPT');
ALTER TABLE "Playground" ALTER COLUMN "language" TYPE "Languages_new" USING ("language"::text::"Languages_new");
ALTER TABLE "Project" ALTER COLUMN "languagesUsed" TYPE "Languages_new"[] USING ("languagesUsed"::text::"Languages_new"[]);
ALTER TYPE "Languages" RENAME TO "Languages_old";
ALTER TYPE "Languages_new" RENAME TO "Languages";
DROP TYPE "Languages_old";
COMMIT;
