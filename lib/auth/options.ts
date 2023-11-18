import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prisma/prismadb";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
	debug: true,
	session: { strategy: "jwt" },
	providers: [
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			// メルアド認証処理
			async authorize(credentials) {
				const user = await prismadb.user.findUnique({
					where: { email: credentials?.email },
				});

				if (!user || !user.password) {
					throw new Error("Email does not exists");
				}

				if (user && user?.password === credentials?.password) {
					return {
						id: user.id,
						name: user.email,
						email: user.email,
						role: "admin",
					};
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account, profile, isNewUser }) => {
			// 注意: トークンをログ出力してはダメです。
			// console.log('in jwt', {user, token, account, profile})

			if (user) {
				token.user = user;
				const u = user as any;
				token.role = u.role;
			}
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		session: ({ session, token }) => {
			// console.log("in session", {session, token});
			token.accessToken;
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			};
		},
	},
};
