import { options } from "@/lib/auth/options";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

// ユーザー新規登録API
export const POST = async (req: Request, res: NextResponse) => {
	const session = await getServerSession(options);

	try {
		const { email, password } = await req.json();

		// NOTE: セッションからIDを取得する.
		const id = Number(session?.user?.id);
		// TODO: エラーレスポンスコードは改めて記載する.
		if (!id)
			return NextResponse.json({ message: "ID not found." }, { status: 422 });

		// NOTE: 取得したID(ユーザー)がDBに存在するか確認する.
		const existingUser = await prismadb.user.findUnique({ where: { id } });
		if (!existingUser)
			return NextResponse.json({ message: "User not found." }, { status: 422 });

		// NOTE: 登録するEmailがDBに存在するEmailと重複しているか確認する.
		const existingEmailUser = await prismadb.user.findUnique({
			where: { email },
		});
		// NOTE: 同じ場合(自分自身は含まない)
		if (existingEmailUser && email !== existingUser.email)
			return NextResponse.json(
				{ message: "Duplicate email addresses of other users." },
				{ status: 422 },
			);

		// NOTE: ハッシュ化は改めて実施する?
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.update({
			data: {
				email,
				password: hashedPassword,
			},
			where: { id: id },
		});

		return NextResponse.json({ user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
