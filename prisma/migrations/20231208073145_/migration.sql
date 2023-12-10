/*
  Warnings:

  - A unique constraint covering the columns `[cardid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `cardid` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cardid_key` ON `User`(`cardid`);
