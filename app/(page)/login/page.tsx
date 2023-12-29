"use client";

import {
	Alert,
	Box,
	Button,
	TextField,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
	searchParams: {
		error?: string;
	};
};

const defaultTheme = createTheme({
	typography: {
		h1: {
			fontSize: 30,
		},
	},
});

export default function SignIn({ searchParams }: Props) {
	const [csrfToken, setCsrfToken] = useState("");
	const hasError = !!searchParams.error;

	useEffect(() => {
		fetch("/api/auth/csrf").then((res) => {
			res.json().then((data) => {
				setCsrfToken(data.csrfToken);
			});
		});
	});

	return (
		<ThemeProvider theme={defaultTheme}>
			<Box maxWidth={400} mt="100px" mr="auto" ml="auto">
				<Typography variant="h1" mb={2} align="center">
					ログイン
				</Typography>
				<form method="post" action="/api/auth/callback/credentials">
					<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
					<TextField
						size="small"
						fullWidth
						type="email"
						name="email"
						label="メールアドレス"
						autoComplete="email"
					/>
					<TextField
						size="small"
						sx={{ mt: 2 }}
						fullWidth
						type="password"
						name="password"
						autoComplete="current-password"
						label="パスワード"
					/>
					<Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>
						ログイン
					</Button>
					{hasError && (
						<Alert severity="error" sx={{ mt: 1 }}>
							メールアドレスまたはパスワードが正しくありません。
						</Alert>
					)}
				</form>
			</Box>
		</ThemeProvider>
	);
}
