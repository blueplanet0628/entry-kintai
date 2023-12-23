"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StaffTimecard = () => {
	const router = useRouter();
	const [date, setDate] = useState<Dayjs | Date | string | null>(dayjs());
	const [timecardRows, setTimecardRows] = useState([]);

	useEffect(() => {
		// NOTE: タイムカード情報取得処理
		const fetchTimecard = async () => {
			// TODO: PATHについては,adminページ含めて後日整理する.
			const response = await fetch(`/api/timecard/staff/?date=${date}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			const timecard = responseData.attendance;
			setDate(date);
			setTimecardRows(timecard);
		};
		fetchTimecard();
	}, [date]);

	// NOTE: カレンダー表示
	const handleCalenderChange = (e: any) => {
		setDate(e);
	};

	const handleReset = () => {
		router.push("/staff");
	};

	const sliceYMD = (date: string) => {
		if (!date || date === "null" || date === "undefined") {
			return null;
		}

		//const startingPosition = date.indexOf("T") + 1;
		const sliceYMD = date.substring(0, 10);

		return sliceYMD;
	};

	const sliceTime = (date: string) => {
		if (!date || date === "null" || date === "undefined") {
			return null;
		}

		const startingPosition = date.indexOf("T") + 1;
		const sliceTime = date.substring(startingPosition, startingPosition + 5);

		return sliceTime;
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						タイムカード打刻状況
					</Typography>
				</Box>
				<Box
					sx={{
						minWidth: 120,
						mt: 5,
						mb: 5,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<DatePicker
						sx={{ width: "50%", mt: 1, mr: 2, mb: 1 }}
						value={date}
						format="YYYY/M"
						onChange={handleCalenderChange}
						views={["month", "year"]}
					/>
				</Box>
				<TableContainer component={Paper} sx={{ mb: "100px" }}>
					<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ display: "none" }}>ID</TableCell>
								<TableCell align="center">店舗名</TableCell>
								<TableCell align="center">日付</TableCell>
								<TableCell align="center">出勤時刻1</TableCell>
								<TableCell align="center">退勤時刻1</TableCell>
								<TableCell align="center">出勤時刻2</TableCell>
								<TableCell align="center">退勤時刻2</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{timecardRows.map((row: any) => (
								<TableRow
									key={row.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell
										component="th"
										scope="row"
										sx={{ display: "none" }}
									>
										{row.id}
									</TableCell>
									<TableCell align="center">{row.shop.name}</TableCell>
									<TableCell align="center">{sliceYMD(row.clockIn1)}</TableCell>
									<TableCell align="center">
										{sliceTime(row.clockIn1)}
									</TableCell>
									<TableCell align="center">
										{sliceTime(row.clockOut1)}
									</TableCell>
									<TableCell align="center">
										{sliceTime(row.clockIn2)}
									</TableCell>
									<TableCell align="center">
										{sliceTime(row.clockOut2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Box
					sx={{
						marginTop: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Button onClick={handleReset}>戻る</Button>
				</Box>
			</Box>
		</LocalizationProvider>
	);
};

export default StaffTimecard;
