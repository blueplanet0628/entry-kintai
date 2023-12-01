"use client";

import { Box, Button, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Confirm(props: any) {
	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/auth/shop/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type: props.formValue.Input1Form.type,
				name: props.formValue.Input1Form.name,
				phone_number1: props.formValue.Input1Form.phone_number1,
				phone_number2: props.formValue.Input1Form.phone_number2,
				phone_number3: props.formValue.Input1Form.phone_number3,
				phone_number4: props.formValue.Input1Form.phone_number4,
				address_postcode: props.formValue.Input1Form.address_postcode,
				address_prefecture: props.formValue.Input1Form.address_prefecture,
				address_city: props.formValue.Input1Form.address_city,
				address_block: props.formValue.Input1Form.address_block,
				address_building: props.formValue.Input1Form.address_building,
				shiftPeriod: props.formValue.Input2Form.shiftPeriod,
				shiftDeadline: props.formValue.Input2Form.shiftDeadline,
				isEnabled: props.formValue.Input2Form.isEnabled,
			}),
		});

		if (response.ok) {
			props.handleNext();
		} else {
			console.log("error");
		}
		console.log(props.formState);
	};

	return (
		<div>
			<Box mt={3}>
				<Grid item container spacing={1} justifyContent="flex-end">
					<Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
						<Box mb={6}>
							<TableContainer>
								<Table aria-label="Customer Input Data">
									<TableHead>
										<TableRow>
											<TableCell>項目</TableCell>
											<TableCell>入力内容</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>店舗ID</TableCell>
											<TableCell>自動的に採番されます</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>店舗タイプ</TableCell>
											<TableCell>
												{props.formValue.Input1Form.type === 1
													? "直営"
													: "フランチャイズ"}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>店舗名</TableCell>
											<TableCell>{props.formValue.Input1Form.name}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>電話番号1</TableCell>
											<TableCell>
												{props.formValue.Input1Form.phone_number1}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>電話番号2</TableCell>
											<TableCell>
												{props.formValue.Input1Form.phone_number2}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>郵便番号</TableCell>
											<TableCell>
												{props.formValue.Input1Form.address_postcode}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>都道府県</TableCell>
											<TableCell>
												{props.formValue.Input1Form.address_prefecture}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>市区町村</TableCell>
											<TableCell>
												{props.formValue.Input1Form.address_city}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>番地</TableCell>
											<TableCell>
												{props.formValue.Input1Form.address_block}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>建物名</TableCell>
											<TableCell>
												{props.formValue.Input1Form.address_building}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>電話番号1</TableCell>
											<TableCell>
												{props.formValue.Input1Form.phone_number3}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>電話番号2</TableCell>
											<TableCell>
												{props.formValue.Input1Form.phone_number4}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>シフト期間設定</TableCell>
											<TableCell>
												{props.formValue.Input2Form.shiftPeriod === 1
													? "月2回(15日、末日)"
													: "月1回"}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>シフト提出締切日</TableCell>
											<TableCell>
												シフト開始日の
												{props.formValue.Input2Form.shiftDeadline}
												日前の営業終了時間
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>状態</TableCell>
											<TableCell>
												{props.formValue.Input2Form.isEnabled === 1
													? "有効"
													: "無効"}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
				<Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
					戻る
				</Button>
				<Button onClick={handleSubmit} variant="outlined">
					提出
				</Button>
			</Box>
		</div>
	);
}

export default Confirm;
