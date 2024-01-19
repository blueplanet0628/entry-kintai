import prismadb from "@/lib/prisma/prismadb";

import { NextResponse } from "next/server";

export const GET = async (params: any, searchParams: any) => {
	try {
		const paramId = Number(searchParams.params.id);

		const shop = await prismadb.shop.findUnique({
			where: { id: paramId },
			select: {
				id: true,
				code: true,
				type: true,
				name: true,
				phoneNumber1: true,
				phoneNumber2: true,
				addressPostcode: true,
				addressPrefecture: true,
				addressCity: true,
				addressBlock: true,
				addressBuilding: true,
				phoneNumber3: true,
				phoneNumber4: true,
				shiftPeriod: true,
				shiftDeadline: true,
				isEnabled: true,
			},
		});

		return NextResponse.json({ shop: shop }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

export const PUT = async (req: Request, res: NextResponse) => {
	try {
		const {
			id,
			code,
			type,
			name,
			phoneNumber1,
			phoneNumber2,
			phoneNumber3,
			phoneNumber4,
			addressPostcode,
			addressPrefecture,
			addressCity,
			addressBlock,
			addressBuilding,
			shiftPeriod,
			shiftDeadline,
			isEnabled,
		} = await req.json();

		// NOTE: 型チェック
		if (
			typeof id !== "number" ||
			typeof code !== "string" ||
			typeof type !== "number" ||
			typeof name !== "string" ||
			typeof phoneNumber1 !== "string" ||
			typeof phoneNumber2 !== "string" ||
			typeof phoneNumber3 !== "string" ||
			typeof phoneNumber4 !== "string" ||
			typeof addressPostcode !== "string" ||
			typeof addressPrefecture !== "string" ||
			typeof addressCity !== "string" ||
			typeof addressBlock !== "string" ||
			typeof addressBuilding !== "string" ||
			typeof shiftPeriod !== "number" ||
			typeof shiftDeadline !== "number" ||
			typeof isEnabled !== "number"
		) {
			// TODO: message,statusは適当なので,修正する.
			return NextResponse.json({ message: "Typeof Error" }, { status: 400 });
		}

		// NOTE: null/undefinedチェック
		if (
			id == null ||
			code == null ||
			type == null ||
			name == null ||
			phoneNumber1 == null ||
			addressPostcode == null ||
			addressPrefecture == null ||
			addressCity == null ||
			addressBlock == null ||
			shiftPeriod == null ||
			shiftDeadline == null ||
			isEnabled == null
		) {
			// TODO: message,statusは適当なので,修正する.
			return NextResponse.json(
				{ message: "Input Null Error" },
				{ status: 400 },
			);
		}

		const shop = await prismadb.shop.update({
			where: {
				id: id,
			},
			data: {
				code,
				type,
				name,
				phoneNumber1,
				phoneNumber2,
				phoneNumber3,
				phoneNumber4,
				addressPostcode,
				addressPrefecture,
				addressCity,
				addressBlock,
				addressBuilding,
				shiftPeriod,
				shiftDeadline,
				isEnabled: Boolean(isEnabled),
			},
		});

		return new Response(null, { status: 204 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
