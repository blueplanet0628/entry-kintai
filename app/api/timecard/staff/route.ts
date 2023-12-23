import { options } from "@/lib/auth/options";
import prismadb from "@/lib/prisma/prismadb";
import dayjs from "dayjs";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

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

		console.log(date);
		const gteDate = ExtractionMonth(date);
		const ltDate = ExtractionMonth(date);
		ltDate.setMonth(gteDate.getMonth() + 1);

		console.log(session, userId, gteDate, ltDate);

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

		return NextResponse.json({ attendance: attendance }, { status: 200 });
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
