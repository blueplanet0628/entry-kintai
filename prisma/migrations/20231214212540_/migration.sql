/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fare_between_store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_datail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_shop_id_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fare_between_store` DROP FOREIGN KEY `Fare_between_store_shop1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Shop` DROP FOREIGN KEY `Shop_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `Shop_user` DROP FOREIGN KEY `Shop_user_shop_id_fkey`;

-- DropForeignKey
ALTER TABLE `Shop_user` DROP FOREIGN KEY `Shop_user_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_datail` DROP FOREIGN KEY `User_datail_user_id_fkey`;

-- DropTable
DROP TABLE `Attendance`;

-- DropTable
DROP TABLE `Company`;

-- DropTable
DROP TABLE `Fare_between_store`;

-- DropTable
DROP TABLE `Shop`;

-- DropTable
DROP TABLE `Shop_user`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `User_datail`;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `type` TINYINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone_number1` VARCHAR(13) NOT NULL,
    `phone_number2` VARCHAR(13) NULL,
    `phone_number3` VARCHAR(13) NULL,
    `phone_number4` VARCHAR(13) NULL,
    `address_postcode` VARCHAR(8) NOT NULL,
    `address_prefecture` VARCHAR(8) NOT NULL,
    `address_city` VARCHAR(255) NOT NULL,
    `address_block` VARCHAR(255) NOT NULL,
    `address_building` VARCHAR(255) NULL,
    `shift_period` TINYINT NOT NULL,
    `shift_deadline` SMALLINT NOT NULL,
    `is_enabled` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `cardid` VARCHAR(255) NULL,
    `role` ENUM('ADMIN', 'SHOP_ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `is_enabled` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_cardid_key`(`cardid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `employment_status` ENUM('PART_TIME', 'FULL_TIME', 'TEMPORARY', 'SUBCONTRACTING') NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name_kana` VARCHAR(255) NOT NULL,
    `first_name_kana` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(255) NULL,
    `address_postcode` VARCHAR(8) NOT NULL,
    `address_prefecture` VARCHAR(8) NOT NULL,
    `address_city` VARCHAR(255) NOT NULL,
    `address_block` VARCHAR(255) NOT NULL,
    `address_building` VARCHAR(255) NULL,
    `phone_number1` VARCHAR(13) NOT NULL,
    `phone_number2` VARCHAR(13) NULL,
    `birthday` DATE NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `employee_code` VARCHAR(10) NOT NULL,
    `start_date` DATE NULL,
    `last_date` DATE NULL,
    `retirement_reason` TEXT NULL,
    `wage` ENUM('HOURLY', 'DAILY', 'MONTHLY') NULL,
    `timeframe1_start_time` TIME(3) NULL,
    `timeframe1_end_time` TIME(3) NULL,
    `timeframe1_salary` INTEGER NULL DEFAULT 0,
    `timeframe2_start_time` TIME(3) NULL,
    `timeframe2_end_time` TIME(3) NULL,
    `timeframe2_salary` INTEGER NULL DEFAULT 0,
    `timeframe3_start_time` TIME(3) NULL,
    `timeframe3_end_time` TIME(3) NULL,
    `timeframe3_salary` INTEGER NULL DEFAULT 0,
    `fare_setting` ENUM('DAILY', 'MONTHLY', 'NON') NULL,
    `daily_rate` INTEGER NULL DEFAULT 0,
    `fixed_month` INTEGER NULL DEFAULT 0,
    `non_payment` INTEGER NULL DEFAULT 0,
    `bank_name` VARCHAR(255) NULL,
    `bank_code` CHAR(4) NULL,
    `bank_branch_name` VARCHAR(255) NULL,
    `bank_branch_code` CHAR(3) NULL,
    `bank_account_type` ENUM('SAVING', 'CHECKING') NULL,
    `bank_account_number` CHAR(10) NULL,
    `bank_account_holder` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_user` (
    `shop_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`shop_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `clock_in1` DATETIME(3) NULL,
    `clock_out1` DATETIME(3) NULL,
    `clock_in2` DATETIME(3) NULL,
    `clock_out2` DATETIME(3) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fare_between_stores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop1_id` INTEGER NOT NULL,
    `shop2_id` INTEGER NOT NULL,
    `fare` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `fare_between_stores_shop1_id_shop2_id_key`(`shop1_id`, `shop2_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shop_user` ADD CONSTRAINT `shop_user_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shop_user` ADD CONSTRAINT `shop_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fare_between_stores` ADD CONSTRAINT `fare_between_stores_shop1_id_fkey` FOREIGN KEY (`shop1_id`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
