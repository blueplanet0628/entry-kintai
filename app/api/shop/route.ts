import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (res: NextResponse) => {
	try {
		// NOTE: 現段階において,Companyテーブルのレコードは1つのみなので,固定値とする.
		// TODO: 将来的にユーザーが所属する会社を条件にcompanyIdを取得する.
		const shop = await prismadb.shop.findMany({
			where: { companyId: 1 },
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

		// TODO: 店舗 - ユーザー中間テーブルの対象の店舗IDのレコードを全件削除する.

		const shop = await prismadb.shop.delete({
			where: { id: id },
		});

		return NextResponse.json({ shop: shop }, { status: 204 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
