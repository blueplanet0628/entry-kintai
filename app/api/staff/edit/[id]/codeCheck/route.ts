import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { id, code } = await req.json();

		const userDetail = await prismadb.userDetail.findUnique({
			where: { employeeCode: code },
			select: {
				userId: true,
				employeeCode: true,
			},
		});

		const existingCode = CodeCheck(id, userDetail);

		return NextResponse.json({ existingCode: existingCode }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

const CodeCheck = (id: number, userDetail: any) => {
	if (userDetail === null) {
		return false;
	}
	if (id === userDetail.userId) {
		return false;
	}
	return true;
};
