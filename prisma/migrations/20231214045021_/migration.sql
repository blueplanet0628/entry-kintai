/*
  Warnings:

  - You are about to alter the column `employment_status` on the `User_datail` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.
  - You are about to alter the column `gender` on the `User_datail` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.
  - You are about to alter the column `wage` on the `User_datail` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.
  - You are about to alter the column `fare_setting` on the `User_datail` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to alter the column `bank_account_type` on the `User_datail` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `User_datail` MODIFY `employment_status` ENUM('PART_TIME', 'FULL_TIME', 'TEMPORARY', 'SUBCONTRACTING') NOT NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    MODIFY `wage` ENUM('HOURLY', 'DAILY', 'MONTHLY') NOT NULL,
    MODIFY `fare_setting` ENUM('DAILY', 'MONTHLY', 'NON') NOT NULL,
    MODIFY `bank_account_type` ENUM('SAVING', 'CHECKING') NOT NULL;
