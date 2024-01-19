import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

import { ApiHandler } from "@/lib/api/handler";
import prismadb from "@/lib/prisma/prismadb";

const getAttendance = async (req: NextRequest) => {
	const { cardid, shop_id, is_in } = await req.json();

	const user = await prismadb.user.findUnique({
		where: { cardid },
		select: {
			id: true,
			isEnabled: true,
		},
	});
	const shop = await prismadb.shop.findUnique({
		where: { id: shop_id },
		select: {
			id: true,
			isEnabled: true,
		},
	});

	if (user === null) {
		throw new Error("従業員が見つかりません。");
	}
	if (!user.isEnabled) {
		throw new Error("従業員が無効になっています。");
	}
	if (shop === null) {
		throw new Error("店舗が見つかりません。");
	}
	if (!shop.isEnabled) {
		throw new Error("店舗が無効になっています。");
	}

	// 今日作成されたattendanceを取得する
	const clock_time = new Date();
	const current = dayjs(clock_time);
	const c = {
		gte: current.startOf("day").toDate(),
		lt: current.endOf("day").toDate(),
	};
	console.log(c);
	const todayAttendance = await prismadb.attendance.findFirst({
		where: {
			userId: user.id,
			shopId: shop.id,
			// 本日の出勤
			clockIn1: {
				gte: current.startOf("day").toDate(),
				lt: current.endOf("day").toDate(),
			},
		},
	});

	if (todayAttendance === null) {
		await prismadb.attendance.create({
			data: {
				userId: user.id,
				shopId: shop.id,
				clockIn1: is_in ? current.toDate() : null,
				clockOut1: is_in ? null : current.toDate(),
			},
		});
	} else {
		if (is_in) {
			await prismadb.attendance.update({
				where: { id: todayAttendance.id },
				data: { clockIn1: current.toDate() },
			});
		} else {
			await prismadb.attendance.update({
				where: { id: todayAttendance.id },
				data: { clockOut1: current.toDate() },
			});
		}
	}

	return NextResponse.json(
		{ message: "Hello, World!", todayAttendance },
		{ status: 200 },
	);
};

export const GET = ApiHandler(getAttendance);
