"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Dayjs } from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const Timecard = () => {
	// NOTE: セレクトボックス挙動制御の為,string型にする.
	const [shopId, setShopId] = useState("");
	const [shopRows, setShopRows] = useState([]);
	const [date, setDate] = useState<Dayjs | null>(null);
	const [timecardRows, setTimecardRows] = useState([]);

	// NOTE: 店舗情報取得処理(shopsテーブルからデータを取得し,セレクトボックスに件数分データを表示させる為の準備処理)
	useEffect(() => {
		const fetchShopRows = async () => {
			const response = await fetch("/api/shop", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			const shopRows = responseData.shop;
			setShopRows(shopRows);
		};
		fetchShopRows();
	});

	// NOTE: 店舗表示
	const handleShopChange = (e: any) => {
		setShopId(e.target.value);
	};

	// NOTE: カレンダー表示
	const handleCalenderChange = (e: any) => {
		setDate(e.target.value);
	};

	// NOTE: 表示押下時,タイムカード情報取得処理
	const showTimecard = () => {
		const fetchTimecard = async () => {
			const response = await fetch("/api/timecard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					shopId: Number(shopId),
					date: date,
				}),
			});

			const responseData = await response.json();
			const timecard = responseData.attendance;

			setTimecardRows(timecard);
		};
		fetchTimecard();
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
				<FormControl sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}>
					<InputLabel id="demo-simple-select-label">店舗</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={shopId}
						label="店舗"
						onChange={handleShopChange}
					>
						{shopRows.map((row: any) => (
							<MenuItem key={row.name} value={row.id}>
								{row.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
					type="date"
					onChange={handleCalenderChange}
				/>
				<Button
					sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
					variant="outlined"
					onClick={showTimecard}
				>
					表示
				</Button>
			</Box>
			<TableContainer component={Paper} sx={{ mb: "100px" }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ display: "none" }}>ID</TableCell>
							<TableCell align="center">スタッフID</TableCell>
							<TableCell align="center">スタッフ名</TableCell>
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
								<TableCell component="th" scope="row" sx={{ display: "none" }}>
									{row.id}
								</TableCell>
								<TableCell align="center">
									{row.user.userDetails.map((item: any) => item.employeeCode)}
								</TableCell>
								<TableCell
									align="center"
									sx={{ color: "blue", textDecoration: "underline" }}
								>
									<Link
										href={{
											pathname: "/admin/timcard/staff",
											query: { id: row.id },
										}}
									>
										{row.user.name}
									</Link>
								</TableCell>
								<TableCell align="center">{sliceTime(row.clockIn1)}</TableCell>
								<TableCell align="center">{sliceTime(row.clockOut1)}</TableCell>
								<TableCell align="center">{sliceTime(row.clockIn2)}</TableCell>
								<TableCell align="center">{sliceTime(row.clockOut2)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Timecard;
