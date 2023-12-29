import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

type Context = {
	params: Record<string, string | string[]>;
};

type Handler = (req: NextRequest, context?: Context) => Promise<NextResponse>;

const wrapper = async (
	handler: Handler,
	req: NextRequest,
	context: Context,
) => {
	try {
		const ret = await handler(req, context);
		return ret;
	} catch (err: any) {
		console.log(err);
		if (err instanceof ApiError) {
			return NextResponse.json(
				{ message: err.message },
				{ status: err.statusCode },
			);
		}
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
};

export const ApiHandler = (handler: Handler) => {
	return (req: NextRequest, context: Context) => {
		return wrapper(handler, req, context);
	};
};
