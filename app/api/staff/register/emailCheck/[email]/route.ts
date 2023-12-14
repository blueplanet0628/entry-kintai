import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const GET = async (
	params: any,
	searchParams: any,
	res: NextResponse,
) => {
	const email = searchParams.params.email;

	try {
		// NOTE: 現段階において,Companyテーブルのレコードは1つのみなので,固定値とする.
		// TODO: 将来的にユーザーが所属する会社を条件にcompanyIdを取得する.
		const user = (await prismadb.user.findUnique({
			where: { email: email },
		}))
			? true
			: false;
		console.log(user);
		return NextResponse.json({ user: user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
