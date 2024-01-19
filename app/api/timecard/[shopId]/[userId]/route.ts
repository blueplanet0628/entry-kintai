import prismadb from "@/lib/prisma/prismadb";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NextResponse } from "next/server";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	try {
		const shopId = Number(searchParams.params.shopId);
		const userId = Number(searchParams.params.userId);

		const url = new URL(params.url);
		const beforeDate = dayjs(url.searchParams.get("beforeDate")).format(
			"YYYY-MM-DD",
		);
		const afterDate = dayjs(url.searchParams.get("afterDate")).format(
			"YYYY-MM-DD",
		);

		const [comparedBeforeDate, comparedAfterDate] = ComparisonDate(
			beforeDate,
			afterDate,
		);

		const gteDate = dayjs(comparedBeforeDate).toDate();
		const ltDate = dayjs(
			dayjs(
				dayjs(comparedAfterDate)
					.toDate()
					.setDate(dayjs(comparedAfterDate).toDate().getDate() + 1),
			).format("YYYY-MM-DD"),
		).toDate();

		const attendance = await prismadb.attendance.findMany({
			where: {
				shopId: shopId,
				userId: userId !== 0 ? userId : undefined,
				clockIn1: {
					gte: gteDate,
					lt: ltDate,
				},
			},
			select: {
				id: true,
				shopId: true,
				userId: true,
				clockIn1: true,
				clockOut1: true,
				clockIn2: true,
				clockOut2: true,
				user: {
					select: {
						name: true,
						userDetails: {
							select: {
								employeeCode: true,
							},
						},
					},
				},
				shop: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				userId: "asc",
			},
		});

		const rows = attendance.map((row) => ({
			...row,
			clockIn1: row.clockIn1 ? dayjs(row.clockIn1).tz().format() : null,
			clockOut1: row.clockOut1 ? dayjs(row.clockOut1).tz().format() : null,
			clockIn2: row.clockIn2 ? dayjs(row.clockIn2).tz().format() : null,
			clockOut2: row.clockOut2 ? dayjs(row.clockOut2).tz().format() : null,
		}))

		return NextResponse.json({ attendance: rows }, { status: 200 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

const ComparisonDate = (beforeDate: string, afterDate: string) => {
	if (beforeDate > afterDate) {
		return [afterDate, beforeDate];
	}
	return [beforeDate, afterDate];
};
