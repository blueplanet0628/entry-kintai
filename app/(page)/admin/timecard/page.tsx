"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Timecard = () => {
	const [shopId, setShopId] = useState(0);
	const [shopIds, setShopIds] = useState([0]);
	const [userId, setUserId] = useState(0);
	const [shopRows, setShopRows] = useState([]);
	const [userRows, setUserRows] = useState([]);
	const [beforeDate, setBeforeDate] = useState<Dayjs | Date | string | null>(
		dayjs(),
	);
	const [afterDate, setAfterDate] = useState<Dayjs | Date | string | null>(
		dayjs(),
	);
	const [timecardRows, setTimecardRows] = useState([]);

	useEffect(() => {
		// NOTE: 店舗情報取得処理(shopsテーブルからデータを取得し,セレクトボックスに件数分データを表示させる為の準備処理)
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

		// NOTE: ユーザー情報取得処理(shopIdからその店舗に属するユーザーを取得し,セレクトボックスに件数分データを表示する)
		const fetchUserRows = async () => {
			const response = await fetch(`/api/staff/${shopId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = await response.json();
			const userRows = responseData.user;
			setUserId(0);
			setUserRows(userRows);
		};

		// NOTE: タイムカード情報取得処理
		const fetchTimecard = async () => {
			const response = await fetch(
				`/api/timecard/${shopId}/${userId}/?beforeDate=${beforeDate}&afterDate=${afterDate}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			const responseData = await response.json();
			const timecard = responseData.attendance;
			setTimecardRows(timecard);
		};

		// NOTE: 初回のみ実行
		if (shopRows.length === 0) {
			fetchShopRows();
		}
		// NOTE: 店舗を変更した時のみ実行(ユーザー選択時の挙動制御)
		if (
			shopId !== 0 &&
			shopIds[shopIds.length - 1] !== shopIds[shopIds.length - 2]
		) {
			fetchUserRows();
		}
		// NOTE: 店舗情報が選択済である場合,実行
		if (shopId !== 0) {
			fetchTimecard();
		}
	}, [shopRows, shopId, userId, beforeDate, afterDate]);

	// NOTE: 店舗選択時処理
	const handleShopChange = (e: any) => {
		setShopId(e.target.value);

		if (shopIds.length > 2) {
			shopIds.shift();
		}
		setShopIds([...shopIds, e.target.value]);
	};

	// NOTE: ユーザー選択時処理
	const handleUserChange = (e: any) => {
		setUserId(e.target.value);

		if (shopIds.length > 2) {
			shopIds.shift();
		}
		setShopIds([...shopIds, shopId]);
	};

	// NOTE: カレンダー(From)選択時処理
	const handleBeforeCalenderChange = (e: any) => {
		setBeforeDate(e);

		if (shopIds.length > 2) {
			shopIds.shift();
		}
		setShopIds([...shopIds, shopId]);
	};

	// NOTE: カレンダー(To)選択時処理
	const handleAfterCalenderChange2 = (e: any) => {
		setAfterDate(e);

		if (shopIds.length > 2) {
			shopIds.shift();
		}
		setShopIds([...shopIds, shopId]);
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
				<Stack direction="row" sx={{ width: "100%" }}>
					<FormControl sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}>
						<InputLabel id="demo-simple-select-label">店舗</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={shopId !== 0 ? shopId : ""}
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
					<FormControl sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}>
						<InputLabel id="demo-simple-select-label">ユーザー</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={userId !== 0 ? userId : ""}
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
					<DatePicker
						sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
						value={beforeDate}
						format="YYYY/M/D"
						onChange={handleBeforeCalenderChange}
					/>
					<Typography sx={{ mt: 2.5, mr: 2, mb: 1 }}>-</Typography>
					<DatePicker
						sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
						value={afterDate}
						format="YYYY/M/D"
						onChange={handleAfterCalenderChange2}
					/>
				</Stack>
			</Box>
			<TableContainer component={Paper} sx={{ mb: "100px" }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ display: "none" }}>ID</TableCell>
							<TableCell align="center">スタッフID</TableCell>
							<TableCell align="center">スタッフ名</TableCell>
							{userId !== 0 ? (
								<TableCell align="center">店舗名</TableCell>
							) : null}
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
								<TableCell component="th" scope="row" sx={{ display: "none" }}>
									{row.id}
								</TableCell>
								<TableCell align="center">
									{row.user.userDetails.map((item: any) => item.employeeCode)}
								</TableCell>
								<TableCell align="center">{row.user.name}</TableCell>
								{userId !== 0 ? (
									<TableCell align="center">{row.shop.name}</TableCell>
								) : null}
								<TableCell align="center">{sliceYMD(row.clockIn1)}</TableCell>
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
