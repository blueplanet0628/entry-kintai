import { options } from "@/lib/auth/options";
import prismadb from "@/lib/prisma/prismadb";
import dayjs from "dayjs";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	try {
		const session = await getServerSession(options);
		const userId = Number(session?.user?.id);
		const url = new URL(params.url);
		const date = dayjs(url.searchParams.get("date")).format("YYYY-MM-DD");

		const gteDate = ExtractionMonth(date);
		const ltDate = ExtractionMonth(date);
		ltDate.setMonth(gteDate.getMonth() + 1);

		const attendance = await prismadb.attendance.findMany({
			where: {
				userId: userId,
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
					},
				},
				shop: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				clockIn1: "asc",
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

// NOTE: 誕生日から年齢を算出する処理
const ExtractionMonth = (date: string | null) => {
	const dateY = Number(date?.substring(0, 4));
	const dateM = Number(date?.substring(5, 7));

	const extractionDate = new Date(dateY, dateM - 1, 1, +9);

	return extractionDate;
};
