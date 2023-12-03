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
    `shift_deadline` INTEGER NOT NULL,
    `is_enabled` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
