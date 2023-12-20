import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	try {
		const shopId = Number(searchParams.params.shopId);

		const url = new URL(params.url);
		const date = url.searchParams.get("date");

		const gteDate = new Date(date ?? "");
		const ltDate = new Date(date ?? "");
		ltDate.setDate(gteDate.getDate() + 1);

		const attendance = await prismadb.attendance.findMany({
			where: {
				shopId: shopId,
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
