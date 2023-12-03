import Dashboard from "@/app/components/dashboard";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>
				<Dashboard>{children}</Dashboard>
			</body>
		</html>
	);
}
