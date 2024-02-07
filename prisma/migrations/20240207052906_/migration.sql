/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `shops` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `shops` MODIFY `address_block` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user_details` MODIFY `last_name_kana` VARCHAR(255) NULL,
    MODIFY `first_name_kana` VARCHAR(255) NULL,
    MODIFY `address_postcode` VARCHAR(8) NULL,
    MODIFY `address_prefecture` VARCHAR(8) NULL,
    MODIFY `address_city` VARCHAR(255) NULL,
    MODIFY `address_block` VARCHAR(255) NULL,
    MODIFY `phone_number1` VARCHAR(13) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'UNANSWERED') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `shops_code_key` ON `shops`(`code`);
