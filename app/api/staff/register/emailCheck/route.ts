import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { email } = await req.json();
		// NOTE: 現段階において,Companyテーブルのレコードは1つのみなので,固定値とする.
		// TODO: 将来的にユーザーが所属する会社を条件にcompanyIdを取得する.
		const user = (await prismadb.user.findUnique({
			where: { email: email },
		}))
			? true
			: false;

		return NextResponse.json({ user: user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
