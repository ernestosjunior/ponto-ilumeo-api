/*
  Warnings:

  - You are about to drop the column `entryDate` on the `registers` table. All the data in the column will be lost.
  - You are about to drop the column `exitDate` on the `registers` table. All the data in the column will be lost.
  - Added the required column `date` to the `registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registers" DROP COLUMN "entryDate",
DROP COLUMN "exitDate",
ADD COLUMN     "date" TEXT NOT NULL;
