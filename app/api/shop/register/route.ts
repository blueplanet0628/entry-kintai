import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

// GETでTOPに情報を表示したい
export const POST = async (req: Request, res: NextResponse) => {
	const session = await getServerSession(options);
	const companyId = Number(session?.user?.companyId);

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

		// NOTE: 店舗コードは,"A+各店舗のレコード数(0埋め後桁数5)"とする.
		//       また、店舗コードは一意であり,連番で振り分けたい為,既存の店舗コードと重複した場合は+1する.
		// TODO: 将来的に,会社単位で店舗コードを連番にする場合は,店舗コードの一意性をなくし,各会社ごとにA00001から振り分けることにする.
		const codeCounts = (await prismadb.shop.count({})) + 1;

		const existingCodes = await prismadb.shop.findMany({
			select: { code: true },
		});
		const codes = existingCodes.map((code) => {
			return code.code;
		});

		let i = 0;
		while (codes.includes(`A${(codeCounts + i).toString().padStart(5, "0")}`)) {
			i++;
		}
		const code = `A${(codeCounts + i).toString().padStart(5, "0")}`;

		const insertedData = await prismadb.$transaction(async (prismadb) => {
			// NOTE: 店舗データ挿入
			const shop = await prismadb.shop.create({
				data: {
					companyId: companyId,
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

			// NOTE: 店舗間交通費に挿入するshop1Idデータ取得
			const shopIds = await prismadb.shop.findMany({
				where: { companyId: companyId },
				select: {
					id: true,
				},
			});

			// NOTE: 店舗間交通費挿入データ作成
			const tmpInsertFareBetweenStoreData = shopIds.map((ids: any) => {
				if (ids.id !== shop.id) {
					return { shop1Id: Number(ids.id), shop2Id: shop.id };
				}
			});

			// NOTE: undefined削除
			const insertFareBetweenStoreData: any =
				tmpInsertFareBetweenStoreData.filter((v) => v);

			// NOTE: 店舗間交通費データ挿入
			const fare = await prismadb.fareBetweenShop.createMany({
				data: insertFareBetweenStoreData,
			});
		});

		return NextResponse.json({ insertedData }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
