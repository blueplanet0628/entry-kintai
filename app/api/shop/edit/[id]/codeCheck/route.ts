import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { id, code } = await req.json();

		const companyId = await prismadb.shop.findFirst({
			where: { id: id },
			select: {
				companyId: true,
			},
		});

		const shop = await prismadb.shop.findFirst({
			where: { companyId: companyId?.companyId, code: code },
			select: {
				id: true,
				code: true,
			},
		});

		const existingCode = CodeCheck(id, shop);

		return NextResponse.json({ existingCode: existingCode }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

const CodeCheck = (id: number, shop: any) => {
	if (shop === null) {
		return false;
	}
	if (id === shop.id) {
		return false;
	}
	return true;
};
