"use client";

import { Alert, Box, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Shop = () => {
	const router = useRouter();
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");
	const [shopRows, setShopRows] = useState([]);
	const [fareRows, setFareRows] = useState([]);
	const [fare, setFare] = useState([]);
	// NOTE: 店舗削除後,画面が更新されない為,仮置きとして用意.
	const [deteledShopId, setDeteledShopId] = useState(0);

	useEffect(() => {
		// NOTE: Shopテーブルデータ取得処理(Shopテーブルからデータを取得し,画面に件数分データを表示させる為の準備処理)
		const fetchTopShopRows = async () => {
			const responseOfShop = await fetch("/api/shop", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const shopData = await responseOfShop.json();
			const shopRows = shopData.shop;

			// NOTE: 店舗間交通費取得処理
			const responseOfFare = await fetch("/api/shop/fare", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const fareData = await responseOfFare.json();
			const originalFareRows = fareData.fare;
			const fare = originalFareRows.map((obj: any) => {
				return { id: obj.id, fare: obj.fare };
			});

			const fareRows = originalFareRows.map((obj: any) => {
				return {
					id: obj.id,
					shop1Name: shopRows.find((shop: any) => {
						return shop.id === obj.shop1Id;
					}).name,
					shop2Name: shopRows.find((shop: any) => {
						return shop.id === obj.shop2Id;
					}).name,
					fare: obj.fare,
				};
			});

			setShopRows(shopRows);
			setFare(fare);
			setFareRows(fareRows);
			setDeteledShopId(deteledShopId);
		};
		fetchTopShopRows();
	}, [deteledShopId]);

	// NOTE: 店舗削除処理
	const deleteShopSubmit = async (e: any) => {
		e.preventDefault();

		const id = e.target.id;

		await fetch("/api/shop", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: Number(id),
			}),
		});
		setDeteledShopId(id);
	};

	// NOTE: 交通費変更処理
	const changeFare = async (e: any) => {
		const id = Number(e.target.id.substr(5));

		fare
			? fare.filter((fare: any) => {
					if (fare.id === id) {
						fare.id = id;
						fare.fare = Number(e.target.value);
						return fare.id === id;
					}
			  })
			: null;
	};

	// NOTE: 交通費確定処理
	const fareSubmit = async (e: any) => {
		e.preventDefault();

		const id = Number(e.target.id);
		const targetFare: any = fare.filter((fare: any) => fare.id === id);

		const response = await fetch("/api/shop/fare", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: targetFare[0].id,
				fare: targetFare[0].fare,
			}),
		});

		if (response.ok) {
			router.push("/admin/shop");
			setMessage("交通費を変更しました。");
			setShowMessage(true);
		} else {
			console.log("error");
		}
	};

	return (
		<Box>
			<CssBaseline />

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
						{shopRows.map((row: any) => (
							<TableRow
								key={row.id}
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

			<TableContainer component={Paper} sx={{ mb: "100px" }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell align="center" colSpan={6}>
								店舗間交通費設定
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={{ display: "none" }}>ID</TableCell>
							<TableCell align="center">店舗1</TableCell>
							<TableCell align="center">店舗2</TableCell>
							<TableCell align="center">交通費</TableCell>
							<TableCell align="center" />
						</TableRow>
					</TableHead>
					<TableBody>
						{fareRows.map((row: any) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" sx={{ display: "none" }}>
									{row.id}
								</TableCell>
								<TableCell align="center">{row.shop1Name}</TableCell>
								<TableCell align="center">{row.shop2Name}</TableCell>
								<TableCell align="center">
									<TextField
										id={`fare_${row.id}`}
										type="number"
										size="small"
										onChange={changeFare}
										defaultValue={row.fare}
									/>
									<Typography
										sx={{ display: "inline-block", mt: 1, mr: 2, mb: 1 }}
									>
										円
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Button id={row.id} variant="outlined" onClick={fareSubmit}>
										変更
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={showMessage}
				onClose={() => setShowMessage(false)}
			>
				<Alert severity="success" sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Shop;
