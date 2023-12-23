-- AlterTable
ALTER TABLE `User_datail` MODIFY `fare_setting` ENUM('DAILY', 'MONTHLY', 'NON') NULL,
    MODIFY `bank_name` VARCHAR(255) NULL,
    MODIFY `bank_code` CHAR(4) NULL,
    MODIFY `bank_branch_name` VARCHAR(255) NULL,
    MODIFY `bank_branch_code` CHAR(3) NULL,
    MODIFY `bank_account_type` ENUM('SAVING', 'CHECKING') NULL,
    MODIFY `bank_account_number` CHAR(10) NULL,
    MODIFY `bank_account_holder` VARCHAR(255) NULL;
