/*
  Warnings:

  - You are about to drop the column `taskId` on the `Column` table. All the data in the column will be lost.
  - Added the required column `columnId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_taskId_fkey";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "columnId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
