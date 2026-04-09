import prismadb from "@/lib/prisma/prismadb";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	debug: process.env.NEXTAUTH_DEBUG === "true",
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
		error: "/login",
	},
	logger: {
		error(code, metadata) {
			console.error("[nextauth][error]", code, metadata ?? "");
		},
		warn(code) {
			console.warn("[nextauth][warn]", code);
		},
		debug(code, metadata) {
			if (process.env.NEXTAUTH_DEBUG === "true") {
				console.debug("[nextauth][debug]", code, metadata ?? "");
			}
		},
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
			async authorize(credentials, req) {
				try {
					const email =
						typeof credentials?.email === "string"
							? credentials.email.trim().toLowerCase()
							: "";
					const password =
						typeof credentials?.password === "string" ? credentials.password : "";

					console.info("[auth][authorize] start", {
						hasEmail: Boolean(email),
						hasPassword: Boolean(password),
						hasSecret: Boolean(process.env.NEXTAUTH_SECRET),
						host: req?.headers?.host,
					});

					if (!email || !password) {
						console.warn("[auth][authorize] missing credentials", {
							hasEmail: Boolean(email),
							hasPassword: Boolean(password),
						});
						return null;
					}

					const user = await prismadb.user.findUnique({
						where: { email },
					});

					if (!user?.password) {
						console.warn("[auth][authorize] user not found or no password");
						return null;
					}

					let isCorrectPassword = false;
					try {
						isCorrectPassword = await bcrypt.compare(password, user.password);
					} catch (err) {
						console.error("[auth][authorize] bcrypt.compare failed", err);
						return null;
					}

					if (!isCorrectPassword) {
						console.warn("[auth][authorize] invalid password");
						return null;
					}

					console.info("[auth][authorize] success", {
						userId: user.id,
						role: user.role,
						isEnabled: user.isEnabled,
					});

					return {
						id: user.id.toString(),
						companyId: user.companyId,
						name: user.name,
						email: user.email,
						role: user.role,
						isEnabled: user.isEnabled,
					};
				} catch (err) {
					console.error("[auth][authorize] unexpected error", err);
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account }) => {
			try {
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

				if (process.env.NEXTAUTH_DEBUG === "true") {
					console.debug("[auth][callback][jwt]", {
						hasUser: Boolean(user),
						hasAccount: Boolean(account),
						tokenUserId: token?.id,
					});
				}

				return token;
			} catch (err) {
				console.error("[auth][callback][jwt] error", err);
				return token;
			}
		},
		session: ({ session, token }) => {
			try {
				const nextSession = {
					...session,
					user: {
						...session.user,
						id: token.id,
						companyId: token.companyId,
						name: token.name,
						email: token.email,
						role: token.role,
						isEnabled: token.isEnabled,
					},
				};

				if (process.env.NEXTAUTH_DEBUG === "true") {
					console.debug("[auth][callback][session]", {
						userId: token?.id,
						role: token?.role,
					});
				}

				return nextSession;
			} catch (err) {
				console.error("[auth][callback][session] error", err);
				return session;
			}
		},
	},
};
