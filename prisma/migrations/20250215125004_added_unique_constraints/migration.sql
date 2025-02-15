/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Column_authorId_key" ON "Column"("authorId");
