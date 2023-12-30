import { Role } from "@prisma/client";
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
				code: `000${i}`,
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
	for (let i = 1; i <= 13; i++) {
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
				isEnabled: true,
			},
			update: {},
		});
	}

	// 店舗 - ユーザー中間テーブル
	for (let i = 1; i <= 15; i++) {
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
