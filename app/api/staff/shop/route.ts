import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

//
export const GET = async (req: NextRequest) => {
	try {
		const session = await getServerSession(options);
		const companyId = Number(session?.user?.companyId);

		const shop = await prismadb.shop.findMany({
			where: { companyId: companyId },
			select: {
				id: true,
				code: true,
				name: true,
			},
		});

		return NextResponse.json({ shop: shop }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
