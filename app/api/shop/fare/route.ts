import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (res: NextResponse) => {
	try {
		const session = await getServerSession(options);
		const companyId = session?.user?.companyId;
		const shopIds = await prismadb.shop.findMany({
			where: { companyId: companyId },
			select: {
				id: true,
			},
		});

		const fare = await prismadb.fareBetweenShop.findMany({
			where: {
				shop1Id: {
					in: shopIds.map((ids) => ids.id),
				},
			},
			select: {
				id: true,
				shop1Id: true,
				shop2Id: true,
				fare: true,
			},
			orderBy: [
				{
					shop1Id: "asc",
				},
				{
					shop2Id: "asc",
				},
			],
		});

		return NextResponse.json({ fare: fare }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

export const PUT = async (req: Request, res: NextResponse) => {
	try {
		const { id, fare } = await req.json();

		await prismadb.fareBetweenShop.update({
			where: { id: id },
			data: {
				fare: fare,
			},
		});

		return new Response(null, { status: 204 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
