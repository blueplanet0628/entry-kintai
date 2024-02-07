/*
  Warnings:

  - A unique constraint covering the columns `[employee_code]` on the table `user_details` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_details_employee_code_key` ON `user_details`(`employee_code`);
