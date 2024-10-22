/*
  Warnings:

  - You are about to drop the `Wiki` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `text` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "text" TEXT NOT NULL,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "News" ADD CONSTRAINT "News_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Wiki";
