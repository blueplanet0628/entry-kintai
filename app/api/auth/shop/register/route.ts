import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

// GETでTOPに情報を表示したい
export const POST = async (req: Request, res: NextResponse) => {
	try {
		const {
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
			return NextResponse.json({ message: "Typeof Error" }, { status: 0 });
		}

		// NOTE: null/undefinedチェック
		if (
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
			return NextResponse.json({ message: "Input Null Error" }, { status: 0 });
		}

		// NOTE: 現段階において,Companyテーブルのレコードは1つのみなので,固定値とする.
		// TODO: 将来的にユーザーが所属する会社を条件にcompanyIdを取得する.
		const companyId = 1;

		//NOTE: 店舗コードは,"A+各会社の店舗レコード数+1"とする.
		const codeCounts =
			(await prismadb.shop.count({
				where: { companyId: companyId },
			})) + 1;
		const code = `A${codeCounts}`;

		const shop = await prismadb.shop.create({
			data: {
				companyId,
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

		return NextResponse.json({ shop }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
