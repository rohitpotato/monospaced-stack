/*
  Warnings:

  - You are about to drop the column `quicklinks` on the `Config` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "quicklinks",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github_url" TEXT NOT NULL,
ADD COLUMN     "linkedin_url" TEXT NOT NULL,
ADD COLUMN     "twitter_url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
