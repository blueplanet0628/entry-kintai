import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { id, code } = await req.json();

		const companyId = await prismadb.user.findFirst({
			where: { id: id },
			select: {
				companyId: true,
			},
		});

		const userDetail = await prismadb.userDetail.findFirst({
			where: {
				employeeCode: code,
				user: {
					companyId: companyId?.companyId,
				},
			},
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
