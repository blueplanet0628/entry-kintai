import Dashboard from "@/app/components/dashboard";
import { NextAuthProvider } from "@/app/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "勤怠管理システム",
	description: "勤怠管理システム",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body>
				<NextAuthProvider>
					<Dashboard>{children}</Dashboard>
				</NextAuthProvider>
			</body>
		</html>
	);
}
