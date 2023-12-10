"use client";

import {
	AppBar,
	Container as MUIContainer,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";

const theme = createTheme({
	typography: {
		h1: {
			fontSize: 20,
		},
		h6: {
			fontSize: 14,
		},
	},
});

export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<AppBar position="static" sx={{ padding: 1 }}>
				<Typography variant="h6">勤怠管理システム - スタッフ用</Typography>
			</AppBar>
			<MUIContainer sx={{ padding: 1 }}>{children}</MUIContainer>
		</ThemeProvider>
	);
}
