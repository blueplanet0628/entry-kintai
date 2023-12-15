import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const DELETE = async (req: Request, res: NextResponse) => {
	try {
		const id = await req.json();
		const userId = Number(id.id);

		// NOTE: データ削除
		await prismadb.$transaction(async (prismadb) => {
			// NOTE: 複数の店舗に所属する可能性もある為,deleteManyで削除
			const shopUser = await prismadb.shopUser.deleteMany({
				where: { userId: userId },
			});

			// NOTE: deleteメソッドが使用できない為,deleteManyで削除する.
			//       usersテーブルとuser_detailsテーブルは1:1関係である為,削除件数によってロールバックを実施する.
			const userDetail = await prismadb.userDetail.deleteMany({
				where: { userId: userId },
			});
			if (userDetail.count >= 2) {
				throw new Error("There are two or more results.");
			}

			const user = await prismadb.user.delete({
				where: { id: userId },
			});
		});

		return new Response(null, { status: 204 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
