import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";
import { Role } from "@prisma/client";

// ユーザー新規登録API
export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { name, email, password } = await req.json();

		// NOTE: 会社登録フォームが存在しない為,Companyテーブルにレコードが存在しない場合,ID=1のデータを持つレコードを作成する.
		//		 また,ID=1のレコードが存在する場合,Insert処理をスキップする.
		const existingCompany = await prismadb.company.findUnique({
			where: { id: 1 },
		});

		const comapny = !existingCompany
			? await prismadb.company.create({
					data: {
						name: "Entry",
					},
			  })
			: existingCompany;

		const existingUser = await prismadb.user.findUnique({ where: { email } });

		if (existingUser)
			return NextResponse.json({ message: "Email taken" }, { status: 422 });

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				companyId: 1,
				name,
				email,
				password: hashedPassword,
				role: Role.ADMIN, // NOTE: 本登録処理は必然的に管理者ユーザーとなる為,管理者用ロールとする.
				isEnabled: true, // NOTE: 本登録処理は必然的に管理者ユーザーとなる為,有効とする.
			},
		});

		return NextResponse.json({ user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
