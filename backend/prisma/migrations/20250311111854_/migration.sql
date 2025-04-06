-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_preschooler_id_fkey";

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_id_fkey" FOREIGN KEY ("id") REFERENCES "preschooler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
