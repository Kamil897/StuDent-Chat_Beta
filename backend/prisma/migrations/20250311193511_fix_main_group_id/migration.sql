/*
  Warnings:

  - You are about to drop the column `confirm_password` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[main_group_id]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "confirm_password";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "main_teacher_id" INTEGER;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "main_group_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "teacher_main_group_id_key" ON "teacher"("main_group_id");

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_main_group_id_fkey" FOREIGN KEY ("main_group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_feedback" ADD CONSTRAINT "teacher_feedback_preschooler_id_fkey" FOREIGN KEY ("preschooler_id") REFERENCES "preschooler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_feedback" ADD CONSTRAINT "teacher_feedback_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
