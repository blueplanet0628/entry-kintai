import prismadb from "@/lib/prisma/prismadb";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	debug: true,
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
		error: "/login",
	},
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

				if (!credentials) {
					throw new Error("Invalid credentials");
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.password,
				);

				if (isCorrectPassword) {
					console.log("ok");
					return {
						id: user.id.toString(),
						companyId: user.companyId,
						name: user.name,
						email: user.email,
						role: user.role,
						isEnabled: user.isEnabled,
					};
				}
				console.log("ng");
				return null;
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account }) => {
			if (user) {
				const u = user;
				token.id = u.id;
				token.companyId = u.companyId;
				token.name = u.name;
				token.email = u.email;
				token.role = u.role;
				token.isEnabled = u.isEnabled;
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
					companyId: token.companyId,
					name: token.name,
					email: token.email,
					role: token.role,
					isEnabled: token.isEnabled,
				},
			};
		},
	},
};
