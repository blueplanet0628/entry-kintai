import { Role } from "@prisma/client";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		if (req.nextauth.token) {
			const url = new URL(req.url);
			const path = url.pathname;
			const role = req.nextauth.token.role;

			// 管理者ページは管理者か店舗管理者のみ閲覧可能
			if (
				path.startsWith("/admin") &&
				role !== Role.ADMIN &&
				role !== Role.SHOP_ADMIN
			) {
				return NextResponse.redirect(`${url.origin}/staff`);
			}
			// スタッフページは店舗管理者かスタッフのみ閲覧可能
			if (
				path.startsWith("/staff") &&
				role !== Role.SHOP_ADMIN &&
				role !== Role.USER
			) {
				return NextResponse.redirect(`${url.origin}/admin`);
			}
		}
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				return !!token;
			},
		},
	},
);

export const config = {
	matcher: ["/((?!register|api/auth|auth|login).*)"],
};
