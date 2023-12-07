-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop` (
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
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` SMALLINT NOT NULL,
    `is_enabled` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_datail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `employment_status` TINYINT NOT NULL,
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
    `gender` TINYINT NOT NULL,
    `employee_code` VARCHAR(10) NOT NULL,
    `start_date` DATE NULL,
    `last_date` DATE NULL,
    `retirement_reason` TEXT NULL,
    `wage` TINYINT NOT NULL,
    `timeframe1_start_time` TIME(6) NULL,
    `timeframe1_end_time` TIME(6) NULL,
    `timeframe1_salary` INTEGER NULL DEFAULT 0,
    `timeframe2_start_time` TIME(6) NULL,
    `timeframe2_end_time` TIME(6) NULL,
    `timeframe2_salary` INTEGER NULL DEFAULT 0,
    `timeframe3_start_time` TIME(6) NULL,
    `timeframe3_end_time` TIME(6) NULL,
    `timeframe3_salary` INTEGER NULL DEFAULT 0,
    `fare_setting` TINYINT NOT NULL,
    `daily_rate` INTEGER NULL DEFAULT 0,
    `fixed_month` INTEGER NULL DEFAULT 0,
    `non_payment` INTEGER NULL DEFAULT 0,
    `bank_name` VARCHAR(255) NOT NULL,
    `bank_code` CHAR(4) NOT NULL,
    `bank_branch_name` VARCHAR(255) NOT NULL,
    `bank_branch_code` CHAR(3) NOT NULL,
    `bank_account_type` TINYINT NOT NULL,
    `bank_account_number` CHAR(10) NOT NULL,
    `bank_account_holder` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop_user` (
    `shop_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`shop_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL,
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
CREATE TABLE `Fare_between_store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop1_id` INTEGER NOT NULL,
    `shop2_id` INTEGER NOT NULL,
    `fare` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Fare_between_store_shop1_id_shop2_id_key`(`shop1_id`, `shop2_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_datail` ADD CONSTRAINT `User_datail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shop_user` ADD CONSTRAINT `Shop_user_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shop_user` ADD CONSTRAINT `Shop_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fare_between_store` ADD CONSTRAINT `Fare_between_store_shop1_id_fkey` FOREIGN KEY (`shop1_id`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
