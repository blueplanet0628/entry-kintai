import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	try {
		const userId = Number(searchParams.params.userId);

		const url = new URL(params.url);
		const date = url.searchParams.get("date");

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
