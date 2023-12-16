import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	try {
		const shopId = Number(searchParams.params.shopId);

		const userIds = await prismadb.shopUser.findMany({
			where: { shopId: shopId },
			select: {
				userId: true,
			},
			orderBy: {
				userId: "asc",
			},
		});

		const user = await prismadb.user.findMany({
			where: {
				id: {
					in: userIds.map((ids) => ids.userId),
				},
			},
			select: {
				id: true,
				name: true,
				isEnabled: true,
				userDetails: {
					select: {
						nickname: true,
						employmentStatus: true,
						employeeCode: true,
						birthday: true,
					},
				},
			},
		});

		return NextResponse.json({ user: user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
