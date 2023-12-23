import prismadb from "@/lib/prisma/prismadb";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

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

		return NextResponse.json({ attendance: attendance }, { status: 200 });
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
