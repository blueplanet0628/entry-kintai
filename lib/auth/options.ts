import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prisma/prismadb";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

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

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.password,
				);

				if (isCorrectPassword) {
					console.log("ok");
					return {
						id: user.id,
						name: user.email,
						email: user.email,
						role: "admin",
					};
				} else {
					console.log("ng");
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account }) => {
			if (user) {
				const u = user as any;
				token.id = u.id;
				token.user = user;
				token.role = u.role;
			}
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		session: ({ session, user, token, trigger, newSession }) => {
			token.accessToken;
			return {
				...session,
				user: {
					id: token.id,
					...session.user,
					role: token.role,
				},
			};
		},
	},
};
