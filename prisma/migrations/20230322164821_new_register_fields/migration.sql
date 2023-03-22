/*
  Warnings:

  - Added the required column `entryDate` to the `registers` table without a default value. This is not possible if the table is not empty.
  - Made the column `entryHour` on table `registers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "registers" ADD COLUMN     "entryDate" TEXT NOT NULL,
ADD COLUMN     "exitDate" TEXT,
ALTER COLUMN "entryHour" SET NOT NULL,
ALTER COLUMN "entryHour" SET DATA TYPE TEXT,
ALTER COLUMN "exitHour" SET DATA TYPE TEXT;
