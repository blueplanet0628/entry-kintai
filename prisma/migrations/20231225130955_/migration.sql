/*
  Warnings:

  - You are about to drop the `fare_between_stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fare_between_stores` DROP FOREIGN KEY `fare_between_stores_shop1_id_fkey`;

-- DropTable
DROP TABLE `fare_between_stores`;

-- CreateTable
CREATE TABLE `fare_between_shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop1_id` INTEGER NOT NULL,
    `shop2_id` INTEGER NOT NULL,
    `fare` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `fare_between_shops_shop1_id_shop2_id_key`(`shop1_id`, `shop2_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fare_between_shops` ADD CONSTRAINT `fare_between_shops_shop1_id_fkey` FOREIGN KEY (`shop1_id`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
