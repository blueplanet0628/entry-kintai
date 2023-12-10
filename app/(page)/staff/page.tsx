"use client";

import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";

const onSignout = () => {
	const out = async () => {
		const confirmed = confirm("ログアウトしますか？");
		if (confirmed) signOut();
	};
	out();
};

const StaffPage = () => {
	return (
		<Box padding={3}>
			<Link href="/staff/timecard">
				<Button
					type="button"
					variant="contained"
					size="large"
					fullWidth
					color="success"
				>
					タイムカード
				</Button>
			</Link>

			<Link href="/staff/account">
				<Button
					type="button"
					variant="contained"
					size="large"
					fullWidth
					color="success"
					sx={{ mt: 2 }}
				>
					登録情報変更
				</Button>
			</Link>

			<Button
				type="button"
				variant="contained"
				size="large"
				fullWidth
				sx={{ mt: 2 }}
				onClick={() => onSignout()}
			>
				ログアウト
			</Button>
		</Box>
	);
};

export default StaffPage;
