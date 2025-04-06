/*
  Warnings:

  - A unique constraint covering the columns `[verification]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "verification" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "teacher_verification_key" ON "teacher"("verification");
