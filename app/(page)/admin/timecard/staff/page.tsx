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
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const StaffTimecard = () => {
	const searchParams = useSearchParams();
	const paramShopId = searchParams.get("shopId");
	const paramUserId = searchParams.get("userId");
	const paramDate = searchParams.get("date");

	// NOTE: セレクトボックス挙動制御の為,string型にする.
	const [userId, setUserId] = useState("");
	const [date, setDate] = useState<Dayjs | string | null>();
	const [userRows, setUserRows] = useState([]);
	const [timecardRows, setTimecardRows] = useState([]);

	useEffect(() => {
		// NOTE: ユーザー情報取得処理(セレクトボックスに件数分データを表示させる為の準備処理)
		const fetchUserRows = async () => {
			const response = await fetch(`/api/staff/${paramShopId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = await response.json();
			const userRows = responseData.user;

			// NOTE: DBからデータを取得したタイミングでセレクトボックスの初期値をセットする.
			setUserId(paramUserId ? paramUserId : "");
			setUserRows(userRows);
		};
		fetchUserRows();

		// NOTE: タイムカード情報取得処理
		const fetchTimecard = async () => {
			const response = await fetch(
				`/api/timecard/staff/${paramUserId}/?date=${paramDate}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const responseData = await response.json();
			const timecard = responseData.attendance;

			setDate(paramDate);
			setTimecardRows(timecard);
		};
		fetchTimecard();
	}, [paramShopId, paramUserId, paramDate]);

	// NOTE: ユーザー表示
	const handleUserChange = (e: any) => {
		setUserId(e.target.value);
	};

	// NOTE: カレンダー表示
	const handleCalenderChange = (e: any) => {
		setDate(e.target.value);
	};

	// NOTE: 表示ボタン押下時,タイムカード情報取得処理
	//       表示ボタンを押下したタイミングでデータを取得したい為,初回自動取得時と表示ボタン押下時の処理を分離する.
	const showTimecard = () => {
		const fetchTimecard = async () => {
			const response = await fetch(
				`/api/timecard/staff/${userId}/?date=${date}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const responseData = await response.json();
			const timecard = responseData.attendance;

			setUserId(userId);
			setDate(date);
			setTimecardRows(timecard);
		};
		fetchTimecard();
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
					<InputLabel id="demo-simple-select-label">ユーザー</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={userId}
						label="ユーザー"
						onChange={handleUserChange}
					>
						{userRows.map((row: any) => (
							<MenuItem key={row.id} value={row.id}>
								{row.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
					type="month"
					defaultValue={dayjs(date).format("YYYY-MM")}
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
							<TableCell align="center">日時</TableCell>
							<TableCell align="center">店舗名</TableCell>
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
								<TableCell align="center">{sliceYMD(row.clockIn1)}</TableCell>
								<TableCell align="center">{row.shop.name}</TableCell>
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

export default StaffTimecard;
