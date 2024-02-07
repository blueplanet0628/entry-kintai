import {
	BankAccountType,
	EmploymentStatus,
	FareSetting,
	Gender,
	Role,
	Wage,
} from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	try {
		const paramId = Number(searchParams.params.id);

		const user = await prismadb.user.findUnique({
			where: { id: paramId },
			include: { userDetails: true, shopUsers: true },
		});

		// NOTE: ユーザーが所属している店舗情報を取得.
		const shops: Array<object> = await prismadb.shop.findMany({
			where: {
				id: {
					in: user?.shopUsers.map((ids) => ids.shopId),
				},
			},
			select: {
				id: true,
				code: true,
				name: true,
			},
		});

		const mergedData = { ...user, ...{ shops } };

		return NextResponse.json({ user: mergedData }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

export const PUT = async (req: Request, res: NextResponse) => {
	try {
		const {
			// NOTE: Step1 Values
			id,
			shopId,
			email,
			password,
			employmentStatus,
			lastName,
			firstName,
			lastNameKana,
			firstNameKana,
			nickname,
			addressPostcode,
			addressPrefecture,
			addressCity,
			addressBlock,
			addressBuilding,
			phoneNumber1,
			phoneNumber2,
			// NOTE: Step2 Values
			birthday,
			gender,
			employeeCode,
			startDate,
			lastDate,
			retirementReason,
			role,
			isEnabled,
			// NOTE: Step3 Values
			wage,
			timeframe1StartTime,
			timeframe1EndTime,
			timeframe1Salary,
			timeframe2StartTime,
			timeframe2EndTime,
			timeframe2Salary,
			timeframe3StartTime,
			timeframe3EndTime,
			timeframe3Salary,
			fareSetting,
			dailyRate,
			fixedMonth,
			nonPayment,
			// NOTE: Step4 Values
			bankName,
			bankCode,
			bankBranchName,
			bankBranchCode,
			bankAccountType,
			bankAccountNumber,
			bankAccountHolder,
		} = await req.json();

		// NOTE: Format User Table Data
		const name = `${lastName} ${firstName}`;
		const hashedPassword =
			password !== "" ? await bcrypt.hash(password, 12) : "";
		const enumRole = ConversionToEnumRole(role);

		// NOTE: Format UserDetail Table Data
		const enumEmploymentStatus =
			ConversionToEnumEmploymentStatus(employmentStatus);
		const birthdayValue = ConversionToDate(birthday);
		const enumGender = ConversionToEnumGender(gender);
		const startDateValue = ConversionToDate(startDate);
		const lastDateValue = ConversionToDate(lastDate);
		const enumWage = ConversionToEnumWage(wage);
		const timeframe1StartTimeValue = ConversionToTime(timeframe1StartTime);
		const timeframe1EndTimeValue = ConversionToTime(timeframe1EndTime);
		const timeframe2StartTimeValue = ConversionToTime(timeframe2StartTime);
		const timeframe2EndTimeValue = ConversionToTime(timeframe2EndTime);
		const timeframe3StartTimeValue = ConversionToTime(timeframe3StartTime);
		const timeframe3EndTimeValue = ConversionToTime(timeframe3EndTime);
		const enumFareSetting = ConversionToEnumFareSetting(fareSetting);
		const enumBankAccountType =
			ConversionToEnumBankAccountType(bankAccountType);

		// NOTE: データ更新
		const updatedData = await prismadb.$transaction(async (prismadb) => {
			const user = await prismadb.user.update({
				where: {
					id: id,
				},
				data: {
					name: name,
					email,
					role: enumRole,
					isEnabled: Boolean(isEnabled),
				},
			});

			// NOTE: パスワードが入力されている場合,パスワードを更新する.
			hashedPassword !== ""
				? await prismadb.user.update({
						where: {
							id: id,
						},
						data: {
							password: hashedPassword,
						},
				  })
				: "";

			// NOTE: updateメソッドが使用できない為,updateManyで更新する.
			//       usersテーブルとuser_detailsテーブルは1:1関係である為,更新件数によってロールバックを実施する.
			const userDetail = await prismadb.userDetail.updateMany({
				where: {
					userId: id,
				},
				data: {
					userId: id,
					employmentStatus: enumEmploymentStatus,
					lastName,
					firstName,
					lastNameKana,
					firstNameKana,
					nickname,
					addressPostcode,
					addressPrefecture,
					addressCity,
					addressBlock,
					addressBuilding,
					phoneNumber1,
					phoneNumber2,
					birthday: birthdayValue,
					gender: enumGender,
					employeeCode: employeeCode,
					startDate: startDateValue,
					lastDate: lastDateValue,
					retirementReason,
					wage: enumWage,
					timeframe1StartTime: timeframe1StartTimeValue,
					timeframe1EndTime: timeframe1EndTimeValue,
					timeframe1Salary,
					timeframe2StartTime: timeframe2StartTimeValue,
					timeframe2EndTime: timeframe2EndTimeValue,
					timeframe2Salary,
					timeframe3StartTime: timeframe3StartTimeValue,
					timeframe3EndTime: timeframe3EndTimeValue,
					timeframe3Salary,
					fareSetting: enumFareSetting,
					dailyRate,
					fixedMonth,
					nonPayment,
					bankName,
					bankCode,
					bankBranchName,
					bankBranchCode,
					bankAccountType: enumBankAccountType,
					bankAccountNumber,
					bankAccountHolder,
				},
			});

			if (userDetail.count === 0) {
				await prismadb.userDetail.create({
					data: {
						userId: id,
						employmentStatus: enumEmploymentStatus,
						lastName,
						firstName,
						lastNameKana,
						firstNameKana,
						nickname,
						addressPostcode,
						addressPrefecture,
						addressCity,
						addressBlock,
						addressBuilding,
						phoneNumber1,
						phoneNumber2,
						birthday: birthdayValue,
						gender: enumGender,
						employeeCode: employeeCode,
						startDate: startDateValue,
						lastDate: lastDateValue,
						retirementReason,
						wage: enumWage,
						timeframe1StartTime: timeframe1StartTimeValue,
						timeframe1EndTime: timeframe1EndTimeValue,
						timeframe1Salary,
						timeframe2StartTime: timeframe2StartTimeValue,
						timeframe2EndTime: timeframe2EndTimeValue,
						timeframe2Salary,
						timeframe3StartTime: timeframe3StartTimeValue,
						timeframe3EndTime: timeframe3EndTimeValue,
						timeframe3Salary,
						fareSetting: enumFareSetting,
						dailyRate,
						fixedMonth,
						nonPayment,
						bankName,
						bankCode,
						bankBranchName,
						bankBranchCode,
						bankAccountType: enumBankAccountType,
						bankAccountNumber,
						bankAccountHolder,
					},
				});
			}

			if (userDetail.count >= 2) {
				throw new Error("There are two or more results.");
			}

			// NOTE: 店舗とユーザーの紐付けの更新については,再作成を実施する.
			const deletedShopUser = await prismadb.shopUser.deleteMany({
				where: { userId: id },
			});

			const shopUserInsertData = shopId.map((Obj: any) => {
				return { shopId: Obj, userId: user.id };
			});

			const shopUser = await prismadb.shopUser.createMany({
				data: shopUserInsertData,
			});

			return [user, userDetail, shopUser];
		});

		return NextResponse.json({ updatedData }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

const ConversionToDate = (date: string) => {
	if (!date || date === "null" || date === "undefined") {
		return null;
	}

	const ymd = date.split("/");
	return new Date(
		Number(ymd[0]),
		Number(ymd[1]),
		Number(ymd[2]),
		+9, // HOUR
	);
};

const ConversionToTime = (time: string) => {
	if (!time) {
		return null;
	}

	const hm = time.split(":");
	return new Date(
		0, // YEAR
		0, // MONTH
		0 + 1, // DAY
		Number(hm[0]) + 9,
		Number(hm[1]),
	);
};

const ConversionToEnumRole = (role: number) => {
	switch (role) {
		case 1:
			return Role.ADMIN;
		case 2:
			return Role.SHOP_ADMIN;
		case 3:
			return Role.USER;
		default:
			return Role.USER;
	}
};

const ConversionToEnumGender = (gender: number) => {
	switch (gender) {
		case 1:
			return Gender.MALE;
		case 2:
			return Gender.FEMALE;
		default:
			return Gender.UNANSWERED;
	}
};

const ConversionToEnumEmploymentStatus = (employmentStatus: number) => {
	switch (employmentStatus) {
		case 1:
			return EmploymentStatus.PART_TIME;
		case 2:
			return EmploymentStatus.FULL_TIME;
		case 3:
			return EmploymentStatus.TEMPORARY;
		case 4:
			return EmploymentStatus.SUBCONTRACTING;
		default:
			return EmploymentStatus.PART_TIME;
	}
};

const ConversionToEnumWage = (wage: number) => {
	switch (wage) {
		case 1:
			return Wage.HOURLY;
		case 2:
			return Wage.DAILY;
		case 3:
			return Wage.MONTHLY;
		default:
			return null;
	}
};

const ConversionToEnumFareSetting = (fareSetting: number) => {
	switch (fareSetting) {
		case 1:
			return FareSetting.DAILY;
		case 2:
			return FareSetting.MONTHLY;
		case 3:
			return FareSetting.NON;
		default:
			return null;
	}
};

const ConversionToEnumBankAccountType = (bankAccountType: number) => {
	switch (bankAccountType) {
		case 1:
			return BankAccountType.SAVING;
		case 2:
			return BankAccountType.CHECKING;
		default:
			return null;
	}
};
