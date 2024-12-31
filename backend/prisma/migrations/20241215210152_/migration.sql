/*
  Warnings:

  - The `description` column on the `Blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `description` column on the `Projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "tags" TEXT[],
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "tags" TEXT[],
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];
