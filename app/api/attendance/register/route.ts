import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

import { ApiHandler } from "@/lib/api/handler";
import prismadb from "@/lib/prisma/prismadb";
import { StampMode } from "@/types/shims";
import { ApiError } from "next/dist/server/api-utils";

export const POST = ApiHandler(async (req: NextRequest) => {
	const {
		user_id,
		shop_id,
		mode: modeRaw,
		clock_time,
		force,
	} = await req.json();

	const user = await prismadb.user.findUnique({
		where: { id: user_id },
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
		throw new ApiError(400, "従業員が見つかりません。");
	}
	if (!user.isEnabled) {
		throw new ApiError(400, "従業員が無効になっています。");
	}
	if (shop === null) {
		throw new ApiError(400, "店舗が見つかりません。");
	}
	if (!shop.isEnabled) {
		throw new ApiError(400, "店舗が無効になっています。");
	}
	if (
		typeof modeRaw !== "string" ||
		!["in", "out", "out-middle"].includes(modeRaw)
	) {
		throw new ApiError(400, `modeが不正です。(mode: ${modeRaw})`);
	}
	const mode = modeRaw as StampMode;

	// 出勤（clock_in1）が昨日の0時以降の最新のattendanceを取得する
	const current = dayjs(clock_time - (clock_time % 1000)); // ミリ秒を切り捨てる
	const date = current.toDate();
	let todayAttendance = await prismadb.attendance.findFirst({
		where: {
			userId: user.id,
			shopId: shop.id,
			// 本日の出勤
			clockIn1: {
				gte: current.add(-1, "days").startOf("day").toDate(),
			},
		},
		orderBy: { clockIn1: "desc" },
	});

	if (todayAttendance === null) {
		if (mode !== "in" && !force) {
			throw new ApiError(400, "本日はまだ出勤していません。");
		}

		todayAttendance = await prismadb.attendance.create({
			data: {
				userId: user.id,
				shopId: shop.id,
				clockIn1: mode === "in" ? date : null,
				clockOut1: mode === "out" || mode === "out-middle" ? date : null,
				clockIn2: null,
				clockOut2: null,
			},
		});
	} else {
		if (mode === "in") {
			if (
				todayAttendance.clockOut1 === null ||
				todayAttendance.clockIn2 !== null
			) {
				throw new ApiError(400, "すでに出勤しています。");
			}
			await prismadb.attendance.update({
				where: { id: todayAttendance.id },
				data: { clockIn2: date },
			});
		}
		// 一時退勤
		if (mode === "out-middle") {
			if (todayAttendance.clockOut1 !== null) {
				throw new ApiError(400, "すでに退勤しています。");
			}
			await prismadb.attendance.update({
				where: { id: todayAttendance.id },
				data: { clockOut1: date },
			});
		}
		// 退勤
		if (mode === "out") {
			if (todayAttendance.clockIn2 === null) {
				// 再出勤していない場合
				if (todayAttendance.clockOut2 !== null) {
					throw new ApiError(400, "すでに退勤しています。");
				}
				await prismadb.attendance.update({
					where: { id: todayAttendance.id },
					data: { clockOut1: date },
				});
			} else {
				// 再出勤している場合
				if (todayAttendance.clockOut2 !== null) {
					throw new ApiError(400, "すでに退勤しています。");
				}
				await prismadb.attendance.update({
					where: { id: todayAttendance.id },
					data: { clockOut2: date },
				});
			}
		}
	}

	return NextResponse.json({ attendance: todayAttendance }, { status: 200 });
});
