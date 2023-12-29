import type { Metadata } from "next";
import Container from "./container";
import "./globals.css";

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
			<body>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
