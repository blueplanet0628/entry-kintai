import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

// GETでTOPに情報を表示したい
export const POST = async (
	req: NextRequest,
	req_: { params: { id: number } },
) => {
	try {
		const id = Number(req_.params.id);
		const { cardid } = await req.json();

		// NOTE: 型チェック
		if (typeof cardid !== "string") {
			// TODO: message,statusは適当なので,修正する.
			return NextResponse.json({ message: "Typeof Error" }, { status: 400 });
		}

		// NOTE: null/undefinedチェック
		if (id === 0 || cardid == null) {
			return NextResponse.json(
				{ message: "Input Null Error" },
				{ status: 400 },
			);
		}

		const currentUser = await prismadb.user.findUnique({
			where: { cardid },
		});

		if (currentUser != null) {
			return NextResponse.json(
				{ message: "このICカードはすでに使用されています。" },
				{ status: 400 },
			);
		}

		const user = await prismadb.user.update({
			where: { id: id },
			data: {
				cardid: cardid,
			},
		});

		return NextResponse.json({ user }, { status: 201 });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
