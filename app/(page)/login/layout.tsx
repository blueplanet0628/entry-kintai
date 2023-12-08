export const metadata = {
	title: "勤怠管理システム ログイン",
	description: "勤怠管理システム",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
