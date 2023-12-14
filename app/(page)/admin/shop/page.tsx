"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Shop = () => {
	const router = useRouter();
	const [shopRows, setShopRows] = useState([]);

	// NOTE: Shopテーブルデータ取得処理(Shopテーブルからデータを取得し,画面に件数分データを表示させる為の準備処理)
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

	// NOTE: 店舗削除処理
	const deleteShopSubmit = async (e) => {
		e.preventDefault();

		const id = e.target.id;
		const response = await fetch("/api/shop", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: Number(id),
			}),
		});

		if (response.ok) {
			router.push("/shop");
		} else {
			console.log("error");
		}
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
					店舗設定
				</Typography>
			</Box>
			<Box my={2} flexDirection="row" justifyContent="flex-end" display="flex">
				<Link href={{ pathname: "/admin/shop/register" }}>
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
							<TableCell align="center">店舗ID</TableCell>
							<TableCell align="center">店舗名</TableCell>
							<TableCell align="center">電話番号</TableCell>
							<TableCell align="center">状態</TableCell>
							<TableCell align="center">編集</TableCell>
							<TableCell align="center">削除</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{shopRows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" sx={{ display: "none" }}>
									{row.id}
								</TableCell>
								<TableCell align="center">{row.code}</TableCell>
								<TableCell align="center">{row.name}</TableCell>
								<TableCell align="center">{row.phoneNumber1}</TableCell>
								<TableCell align="center">
									{row.isEnabled === true ? "有効" : "無効"}
								</TableCell>
								<TableCell align="center">
									<Link
										href={{
											pathname: "/admin/shop/edit",
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

export default Shop;
