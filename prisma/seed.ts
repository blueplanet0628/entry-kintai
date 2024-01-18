import { Role } from "@prisma/client";
import { EmploymentStatus } from "@prisma/client";
import { Gender } from "@prisma/client";
import { Wage } from "@prisma/client";
import { FareSetting } from "@prisma/client";
import { BankAccountType } from "@prisma/client";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma/prismadb";

const PASSWORD = "entrypassword";

const generrateAttendance = (userId: number, shopIds: number[]) => {};

function getCombinations<T>(elements: T[], k: number): T[][] {
	const result: T[][] = [];

	function generateCombinations(currentCombination: T[], start: number) {
		if (currentCombination.length === k) {
			result.push([...currentCombination]);
			return;
		}

		for (let i = start; i < elements.length; i++) {
			currentCombination.push(elements[i]);
			generateCombinations(currentCombination, i + 1);
			currentCombination.pop();
		}
	}

	generateCombinations([], 0);

	return result;
}

async function main() {
	const password = await bcrypt.hash(PASSWORD, 12);

	// 会社
	await prisma.company.upsert({
		where: {
			id: 1,
		},
		create: {
			id: 1,
			name: "株式会社ENTRY",
		},
		update: {},
	});
	await prisma.company.upsert({
		where: {
			id: 2,
		},
		create: {
			id: 2,
			name: "株式会社ENTRYカフェ",
		},
		update: {},
	});
	await prisma.company.upsert({
		where: {
			id: 2,
		},
		create: {
			id: 2,
			name: "株式会社ENTRYゲーム",
		},
		update: {},
	});

	// 店舗
	for (let i = 1; i <= 3; i++) {
		await prisma.shop.upsert({
			where: {
				id: i,
			},
			create: {
				id: i,
				companyId: 1,
				code: `A0000${i}`,
				type: 1,
				name: `ENTRY店舗${i}`,
				phoneNumber1: "000-0000-0000",
				addressPostcode: "000-0000",
				addressCity: "豊島区",
				addressPrefecture: "東京都",
				addressBlock: `東-${i}`,
				shiftPeriod: 7,
				shiftDeadline: 10,
				isEnabled: true,
			},
			update: {},
		});
	}

	// ユーザー（管理者）
	await prisma.user.upsert({
		where: {
			id: 1,
		},
		create: {
			id: 1,
			companyId: 1,
			name: "ENTRY管理者",
			email: "admin@entry-kintai.com",
			role: Role.ADMIN,
			password,
			isEnabled: true,
		},
		update: {},
	});
	// ユーザー（店舗管理者）
	await prisma.user.upsert({
		where: {
			id: 2,
		},
		create: {
			id: 2,
			companyId: 1,
			name: "ENTRY店舗管理者",
			email: "shopadmin@entry-kintai.com",
			role: Role.SHOP_ADMIN,
			password,
			isEnabled: true,
		},
		update: {},
	});
	// ユーザー（被雇用者）
	for (let i = 1; i <= 22; i++) {
		await prisma.user.upsert({
			where: {
				id: 2 + i,
			},
			create: {
				id: 2 + i,
				companyId: 1,
				name: `ENTRY一般ユーザー${i}`,
				email: `staff_${i}@entry-kintai.com`,
				role: Role.USER,
				password,
				isEnabled: i % 4 !== 0 ? true : false,
			},
			update: {},
		});
	}

	// ユーザー詳細（管理者）
	await prisma.userDetail.upsert({
		where: {
			id: 1,
		},
		create: {
			id: 1,
			userId: 1,
			employmentStatus: EmploymentStatus.FULL_TIME,
			lastName: "管理者",
			firstName: "ENTRY",
			lastNameKana: "かんりしゃ",
			firstNameKana: "えんとりー",
			nickname: "ENTRY管理者",
			addressPostcode: "000-0000",
			addressPrefecture: "東京都",
			addressCity: "北区",
			addressBlock: "西-1",
			phoneNumber1: "000-0000-0000",
			birthday: convertDate("1990/1/1"),
			gender: Gender.MALE,
			employeeCode: "B00001",
			startDate: convertDate("2020/1/1"),
			wage: Wage.MONTHLY,
			timeframe1StartTime: convertTime("1:00"),
			timeframe1EndTime: convertTime("9:00"),
			fareSetting: FareSetting.MONTHLY,
			fixedMonth: 30000,
			bankName: "ENTRY銀行",
			bankCode: "0001",
			bankBranchName: "ENTRY支店",
			bankBranchCode: "001",
			bankAccountType: BankAccountType.SAVING,
			bankAccountNumber: "0000001",
			bankAccountHolder: "ENTRY",
		},
		update: {},
	});
	// ユーザー詳細（店舗管理者）
	await prisma.userDetail.upsert({
		where: {
			id: 2,
		},
		create: {
			id: 2,
			userId: 2,
			employmentStatus: EmploymentStatus.SUBCONTRACTING,
			lastName: "店舗管理者",
			firstName: "ENTRY",
			lastNameKana: "てんぽかんりしゃ",
			firstNameKana: "えんとりー",
			nickname: "ENTRY店舗管理者",
			addressPostcode: "000-0000",
			addressPrefecture: "東京都",
			addressCity: "北区",
			addressBlock: "西-2",
			phoneNumber1: "000-0000-0000",
			birthday: convertDate("1990/1/2"),
			gender: Gender.FEMALE,
			employeeCode: "B00002",
			startDate: convertDate("2020/2/1"),
			wage: Wage.MONTHLY,
			timeframe1StartTime: convertTime("2:00"),
			timeframe1EndTime: convertTime("10:00"),
			fareSetting: FareSetting.NON,
			nonPayment: 0,
			bankName: "ENTRY銀行",
			bankCode: "0002",
			bankBranchName: "ENTRY支店",
			bankBranchCode: "002",
			bankAccountType: BankAccountType.SAVING,
			bankAccountNumber: "0000002",
			bankAccountHolder: "ENTRY",
		},
		update: {},
	});
	for (let i = 1; i <= 22; i++) {
		await prisma.userDetail.upsert({
			where: {
				id: 2 + i,
			},
			create: {
				id: 2 + i,
				userId: 2 + i,
				employmentStatus: EmploymentStatus.PART_TIME,
				lastName: `一般ユーザー${i}`,
				firstName: "ENTRY",
				lastNameKana: `いっぱんゆーざー${i}`,
				firstNameKana: "えんとりー",
				nickname: "ENTRY",
				addressPostcode: "000-0000",
				addressPrefecture: "東京都",
				addressCity: "北区",
				addressBlock: `西-${i}`,
				phoneNumber1: "000-0000-0000",
				birthday: convertDate(`1990/1/${2 + i}`),
				gender: Gender.MALE,
				employeeCode: `B0000${2 + i}`,
				startDate: convertDate(`2020/3/${2 + i}`),
				wage: Wage.MONTHLY,
				timeframe1StartTime: convertTime(`${2 + i}:00`),
				timeframe1EndTime: convertTime(`${10 + i}:00`),
				fareSetting: FareSetting.DAILY,
				dailyRate: 500,
				bankName: "ENTRY銀行",
				bankCode: i < 10 ? `000${i}` : `00${i}`,
				bankBranchName: "ENTRY支店",
				bankBranchCode: i < 10 ? `00${i}` : `0${i}`,
				bankAccountType: BankAccountType.SAVING,
				bankAccountNumber: `000000${i}`,
				bankAccountHolder: "ENTRY",
			},
			update: {},
		});
	}

	// 店舗 - ユーザー中間テーブル
	for (let i = 1; i <= 22; i++) {
		if (i <= 12) {
			await prisma.shopUser.upsert({
				where: {
					shopId_userId: {
						shopId: 1,
						userId: i,
					},
				},
				create: {
					shopId: 1,
					userId: i,
				},
				update: {},
			});
		} else if (i <= 17) {
			await prisma.shopUser.upsert({
				where: {
					shopId_userId: {
						shopId: 2,
						userId: i,
					},
				},
				create: {
					shopId: 2,
					userId: i,
				},
				update: {},
			});
		} else {
			await prisma.shopUser.upsert({
				where: {
					shopId_userId: {
						shopId: 3,
						userId: i,
					},
				},
				create: {
					shopId: 3,
					userId: i,
				},
				update: {},
			});
		}
	}

	// 店舗間交通費
	const shopFares = getCombinations([1, 2, 3], 2);
	for (const shopFare of shopFares) {
		await prisma.fareBetweenShop.upsert({
			where: {
				shop1Id_shop2Id: {
					shop1Id: shopFare[0],
					shop2Id: shopFare[1],
				},
			},
			create: {
				shop1Id: shopFare[0],
				shop2Id: shopFare[1],
				fare: 1000,
			},
			update: {},
		});
	}

	// タイムカード
	let attendanceId = 1;
	// タイムカード(2023年12月分)
	for (let j = 1; j <= 22; j++) {
		for (let k = 1; k <= 20; k++) {
			await prisma.attendance.upsert({
				where: {
					id: attendanceId++,
				},
				create: {
					shopId: j <= 12 ? 1 : j <= 17 ? 2 : 3,
					userId: j,
					clockIn1: convertDateTime(`2023/12/${k} ${k}:59:51`),
					clockOut1: convertDateTime(`2023/12/${k} ${k + 1}:59:52`),
					clockIn2:
						k > 15 ? convertDateTime(`2023/12/${k} ${k + 2}:58:51`) : null,
					clockOut2:
						k > 15 ? convertDateTime(`2023/12/${k} ${k + 3}:58:51`) : null,
				},
				update: {},
			});
		}
	}
	// タイムカード(2024年1月分)
	for (let j = 1; j <= 22; j++) {
		for (let k = 1; k <= 15; k++) {
			await prisma.attendance.upsert({
				where: {
					id: attendanceId++,
				},
				create: {
					shopId: j <= 12 ? 1 : j <= 17 ? 2 : 3,
					userId: j,
					clockIn1: convertDateTime(`2024/01/${k} ${k}:59:51`),
					clockOut1: convertDateTime(`2024/01/${k} ${k + 1}:59:52`),
					clockIn2:
						k > 15 ? convertDateTime(`2024/01/${k} ${k + 2}:58:51`) : null,
					clockOut2:
						k > 15 ? convertDateTime(`2024/01/${k} ${k + 3}:58:51`) : null,
				},
				update: {},
			});
		}
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

function convertDate(string: any) {
	const date = string.split("/");
	return new Date(date[0], date[1] - 1, date[2]);
}

function convertTime(string: any) {
	const time = string.split(":");
	return new Date(0, 0, 0, time[0], time[1]);
}

function convertDateTime(string: any) {
	const datetime = string.split(" ");
	const date = datetime[0].split("/");
	const time = datetime[1].split(":");
	return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
}
