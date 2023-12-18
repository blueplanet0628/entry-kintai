import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { id, email } = await req.json();

		const user = await prismadb.user.findUnique({
			where: { email: email },
			select: {
				id: true,
				email: true,
			},
		});

		const existingEmail = EmailCheck(id, user);

		return NextResponse.json({ existingEmail: existingEmail }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

const EmailCheck = (id: number, user: any) => {
	if (user === null) {
		return false;
	}
	if (id === user.id) {
		return false;
	}
	return true;
};
