/*
  Warnings:

  - You are about to drop the column `image_url` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `url` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "image_url",
DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "image_url",
DROP COLUMN "tags",
ADD COLUMN     "url" TEXT NOT NULL;
