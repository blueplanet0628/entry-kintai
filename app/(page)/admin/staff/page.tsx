"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { EmploymentStatus } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Staff = () => {
	// NOTE: セレクトボックス挙動制御の為,string型にする.
	const [shopId, setShopId] = useState("");
	const [shopRows, setShopRows] = useState([]);
	const [userRows, setUserRows] = useState([]);

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

	// NOTE: 店舗選択時,ユーザー情報取得処理
	const handleChange = (e: SelectChangeEvent) => {
		const shopId = e.target.value;

		const fetchUser = async () => {
			const response = await fetch(`/api/staff/${shopId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = await response.json();
			const userRows = responseData.user;
			setUserRows(userRows);
		};
		fetchUser();

		setShopId(e.target.value as string);
	};

	// NOTE: ユーザー削除後,ユーザー情報取得処理
	// TODO : handleChange関数とほぼ同等である為,可能であれば1つにしたい.
	const fetchUserdeletedUser = (shopId: string) => {
		const fetchUser = async () => {
			const response = await fetch(`/api/staff/${shopId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = await response.json();
			const userRows = responseData.user;
			setUserRows(userRows);
		};
		fetchUser();

		setShopId(shopId as string);
	};

	// NOTE: 誕生日から年齢を算出する処理
	const ConversionToAge = (birthday: string[]) => {
		if (birthday == null || !birthday.length) {
			return "-";
		}

		const today = new Date();
		const birthdayStr = String(birthday);

		const birthdayY = Number(birthdayStr.substring(0, 4));
		const birthdayM = Number(birthdayStr.substring(5, 7));
		const birthdayD = Number(birthdayStr.substring(8, 10));

		const thisYearsBirthday = new Date(
			today.getFullYear(),
			birthdayM - 1,
			birthdayD,
		);

		const tmpAge = Number(today.getFullYear()) - birthdayY;
		const age = today < thisYearsBirthday ? tmpAge - 1 : tmpAge;

		return age;
	};

	// NOTE: ユーザー削除処理
	const deleteShopSubmit = async (e: any) => {
		e.preventDefault();

		const id = e.target.id;
		const response = await fetch("/api/staff", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: Number(id),
			}),
		});

		fetchUserdeletedUser(shopId);
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
					スタッフ設定
				</Typography>
			</Box>
			<Box
				sx={{
					minWidth: 120,
					marginTop: 5,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<FormControl sx={{ width: "30%" }}>
					<InputLabel id="demo-simple-select-label">店舗</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={shopId}
						label="店舗"
						onChange={handleChange}
					>
						{shopRows.map((row: any) => (
							<MenuItem key={row.name} value={row.id}>
								{row.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box my={2} flexDirection="row" justifyContent="flex-end" display="flex">
				<Link href={{ pathname: "/admin/staff/register" }}>
					<Button variant="outlined" sx={{ align: "right" }}>
						新規登録
					</Button>
				</Link>
			</Box>
			<TableContainer component={Paper} sx={{ mb: "100px" }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ display: "none" }}>ID</TableCell>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">スタッフ名</TableCell>
							<TableCell align="center">ニックネーム</TableCell>
							<TableCell align="center">年齢</TableCell>
							<TableCell align="center">雇用形態</TableCell>
							<TableCell align="center">状態</TableCell>
							<TableCell align="center">編集</TableCell>
							<TableCell align="center">削除</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userRows.map((row: any) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" sx={{ display: "none" }}>
									{row.id}
								</TableCell>
								<TableCell align="center">
									{row.userDetails.map((detail: any) => detail.employeeCode)}
								</TableCell>
								<TableCell align="center">{row.name}</TableCell>
								<TableCell align="center">
									{row.userDetails.map((detail: any) => detail.nickname)}
								</TableCell>
								<TableCell align="center">
									{ConversionToAge(
										row.userDetails.map((detail: any) => detail.birthday),
									)}
								</TableCell>
								<TableCell align="center">
									{row.userDetails.map((detail: any) =>
										detail.employmentStatus === EmploymentStatus.PART_TIME
											? "アルバイト"
											: detail.employmentStatus === EmploymentStatus.FULL_TIME
											  ? "正社員"
											  : detail.employmentStatus === EmploymentStatus.TEMPORARY
												  ? "派遣"
												  : detail.employmentStatus ===
														  EmploymentStatus.SUBCONTRACTING
													  ? "業務委託"
													  : "アルバイト",
									)}
								</TableCell>
								<TableCell align="center">
									{row.isEnabled === true ? "有効" : "無効"}
								</TableCell>
								<TableCell align="center">
									<Link
										href={{
											pathname: "/admin/staff/edit",
											query: { id: row.id },
										}}
									>
										<Button variant="outlined">編集</Button>
									</Link>
								</TableCell>
								<TableCell align="center">
									{row.isEnabled !== true ? (
										<Button
											id={row.id}
											onClick={deleteShopSubmit}
											variant="outlined"
										>
											削除
										</Button>
									) : (
										""
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Staff;
