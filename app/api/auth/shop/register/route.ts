import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma/prismadb";

// GETでTOPに情報を表示したい
export const POST = async (req: Request, res: NextResponse) => {
	try {
		console.log("test");

		const {
			type,
			name,
			phone_number1,
			phone_number2,
			phone_number3,
			phone_number4,
			address_postcode,
			address_prefecture,
			address_city,
			address_block,
			address_building,
			shiftPeriod,
			shiftDeadline,
			isEnabled,
		} = await req.json();

		console.log(type);
		console.log(name);
		console.log(phone_number1);
		console.log(phone_number2);
		console.log(phone_number3);
		console.log(phone_number4);
		console.log(address_postcode);
		console.log(address_prefecture);
		console.log(address_city);
		console.log(address_block);
		console.log(address_building);
		console.log(shiftPeriod);
		console.log(shiftDeadline);
		console.log(isEnabled);

		/*
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
        */

		return NextResponse.json({ user }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};
