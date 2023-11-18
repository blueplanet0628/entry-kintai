import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

// ユーザー新規登録API
export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { name, email, password } = await req.json();

		const existingUser = await prismadb.user.findUnique({ where: { email } });

		if (existingUser)
			return NextResponse.json({ message: "Email taken" }, { status: 422 });

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				image: "",
				emailVerified: new Date(),
			},
		});

		return NextResponse.json({ user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
