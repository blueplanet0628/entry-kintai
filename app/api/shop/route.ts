import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";
import { Role } from "@prisma/client";

export const GET = async (res: NextResponse) => {
	try {
		const session = await getServerSession(options);
		const companyId = Number(session?.user?.companyId);
		const where =
			session?.user?.role === Role.ADMIN ? {} : { companyId: companyId };
		const shop = await prismadb.shop.findMany({
			where,
			select: {
				id: true,
				code: true,
				name: true,
				phoneNumber1: true,
				isEnabled: true,
			},
		});

		return NextResponse.json({ shop: shop }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

export const DELETE = async (req: Request, res: NextResponse) => {
	try {
		const { id } = await req.json();

		const deletedData = await prismadb.$transaction(async (prismadb) => {
			// NOTE: 店舗 - ユーザー中間テーブルの対象の店舗IDのレコードを全件削除する.
			const shopUser = await prismadb.shopUser.deleteMany({
				where: { shopId: id },
			});

			// NOTE: 店舗 - 店舗間交通費テーブルの対象の店舗IDのレコードを全件削除する.
			const fare = await prismadb.fareBetweenShop.deleteMany({
				where: { OR: [{ shop1Id: id }, { shop2Id: id }] },
			});

			// NOTE: 対象の店舗データを削除する.
			const shop = await prismadb.shop.delete({
				where: { id: id },
			});
		});

		return new Response(null, { status: 204 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
