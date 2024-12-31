/*
  Warnings:

  - Added the required column `designation` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "designation" TEXT NOT NULL;
