import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma/prismadb";

async function main() {
	const password = await bcrypt.hash("password", 12);

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

	// 店舗
	await prisma.shop.upsert({
		where: {
			id: 1,
		},
		create: {
			id: 1,
			companyId: 1,
			code: "0001",
			type: 1,
			name: "店舗1",
			phoneNumber1: "000-0000-0000",
			addressPostcode: "000-0000",
			addressCity: "豊島区",
			addressPrefecture: "東京都",
			addressBlock: "東",
			shiftPeriod: 7,
			shiftDeadline: 10,
			isEnabled: true,
		},
		update: {},
	});

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
	await prisma.user.upsert({
		where: {
			id: 3,
		},
		create: {
			id: 3,
			companyId: 1,
			name: "ENTRY店舗管理者",
			email: "staff@entry-kintai.com",
			role: Role.USER,
			password,
			isEnabled: true,
		},
		update: {},
	});

	// 店舗 - ユーザー中間テーブル
	await prisma.shop_user.upsert({
		where: {
			shopId_userId: {
				shopId: 1,
				userId: 2,
			},
		},
		create: {
			shopId: 1,
			userId: 2,
		},
		update: {},
	});
	await prisma.shop_user.upsert({
		where: {
			shopId_userId: {
				shopId: 1,
				userId: 3,
			},
		},
		create: {
			shopId: 1,
			userId: 3,
		},
		update: {},
	});
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
