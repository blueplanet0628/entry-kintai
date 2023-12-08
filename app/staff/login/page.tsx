import { Box } from "@mui/material";
import { getCsrfToken } from "next-auth/react";
import { cookies } from "next/headers";

export default async function SignIn() {
	const csrfToken = await getCsrfToken({
		req: {
			headers: {
				cookie: cookies().toString(),
			},
		},
	});

	return (
		<Box>
			<h1>ログイン</h1>
			<form method="post" action="/api/auth/signin/email">
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<label>
					Email address
					<input type="email" id="email" name="email" />
				</label>
				<label>
					password
					<input type="password" id="password" name="password" />
				</label>
				<button type="submit">Sign in with Email</button>
			</form>
		</Box>
	);
}
