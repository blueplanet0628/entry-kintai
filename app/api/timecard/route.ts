import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { shopId, date } = await req.json();

		const gteDate = new Date(date);
		const ltDate = new Date(date);
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

		return NextResponse.json({ attendance: attendance }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
