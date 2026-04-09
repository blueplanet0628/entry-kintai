-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SHOP_ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('PART_TIME', 'FULL_TIME', 'TEMPORARY', 'SUBCONTRACTING');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNANSWERED');

-- CreateEnum
CREATE TYPE "Wage" AS ENUM ('HOURLY', 'DAILY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "FareSetting" AS ENUM ('DAILY', 'MONTHLY', 'NON');

-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('SAVING', 'CHECKING');

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shops" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "type" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number1" VARCHAR(13) NOT NULL,
    "phone_number2" VARCHAR(13),
    "phone_number3" VARCHAR(13),
    "phone_number4" VARCHAR(13),
    "address_postcode" VARCHAR(8) NOT NULL,
    "address_prefecture" VARCHAR(8) NOT NULL,
    "address_city" VARCHAR(255) NOT NULL,
    "address_block" VARCHAR(255),
    "address_building" VARCHAR(255),
    "shift_period" SMALLINT NOT NULL,
    "shift_deadline" SMALLINT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cardid" VARCHAR(255),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "is_enabled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "employment_status" "EmploymentStatus",
    "last_name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name_kana" VARCHAR(255),
    "first_name_kana" VARCHAR(255),
    "nickname" VARCHAR(255),
    "address_postcode" VARCHAR(8),
    "address_prefecture" VARCHAR(8),
    "address_city" VARCHAR(255),
    "address_block" VARCHAR(255),
    "address_building" VARCHAR(255),
    "phone_number1" VARCHAR(13),
    "phone_number2" VARCHAR(13),
    "birthday" DATE,
    "gender" "Gender",
    "employee_code" VARCHAR(10) NOT NULL,
    "start_date" DATE,
    "last_date" DATE,
    "retirement_reason" TEXT,
    "wage" "Wage",
    "timeframe1_start_time" TIME(3),
    "timeframe1_end_time" TIME(3),
    "timeframe1_salary" INTEGER DEFAULT 0,
    "timeframe2_start_time" TIME(3),
    "timeframe2_end_time" TIME(3),
    "timeframe2_salary" INTEGER DEFAULT 0,
    "timeframe3_start_time" TIME(3),
    "timeframe3_end_time" TIME(3),
    "timeframe3_salary" INTEGER DEFAULT 0,
    "fare_setting" "FareSetting",
    "daily_rate" INTEGER DEFAULT 0,
    "fixed_month" INTEGER DEFAULT 0,
    "non_payment" INTEGER DEFAULT 0,
    "bank_name" VARCHAR(255),
    "bank_code" CHAR(4),
    "bank_branch_name" VARCHAR(255),
    "bank_branch_code" CHAR(3),
    "bank_account_type" "BankAccountType",
    "bank_account_number" CHAR(10),
    "bank_account_holder" VARCHAR(255),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_user" (
    "shop_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "shop_user_pkey" PRIMARY KEY ("shop_id","user_id")
);

-- CreateTable
CREATE TABLE "attendances" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "clock_in1" TIMESTAMP(3),
    "clock_out1" TIMESTAMP(3),
    "clock_in2" TIMESTAMP(3),
    "clock_out2" TIMESTAMP(3),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fare_between_shops" (
    "id" SERIAL NOT NULL,
    "shop1_id" INTEGER NOT NULL,
    "shop2_id" INTEGER NOT NULL,
    "fare" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "fare_between_shops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cardid_key" ON "users"("cardid");

-- CreateIndex
CREATE UNIQUE INDEX "fare_between_shops_shop1_id_shop2_id_key" ON "fare_between_shops"("shop1_id", "shop2_id");

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_user" ADD CONSTRAINT "shop_user_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_user" ADD CONSTRAINT "shop_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fare_between_shops" ADD CONSTRAINT "fare_between_shops_shop1_id_fkey" FOREIGN KEY ("shop1_id") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
