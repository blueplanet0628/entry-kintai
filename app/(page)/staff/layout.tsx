import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Container from "./container";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "勤怠管理システム - スタッフ用",
	description: "勤怠管理システム - スタッフ用",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
