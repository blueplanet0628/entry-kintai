"use client";

import { Box, Button, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSearchParams } from "next/navigation";

function Confirm(props: any) {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response = await fetch(`/api/staff/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			// TODO: 必要に応じて型を直す.
			body: JSON.stringify({
				id: Number(id),
				shopId: props.formValue.Input1Form.shopId,
				email: props.formValue.Input1Form.email,
				password: props.formValue.Input1Form.password,
				employmentStatus: props.formValue.Input1Form.employmentStatus,
				lastName: props.formValue.Input1Form.lastName,
				firstName: props.formValue.Input1Form.firstName,
				lastNameKana: props.formValue.Input1Form.lastNameKana,
				firstNameKana: props.formValue.Input1Form.firstNameKana,
				nickname: props.formValue.Input1Form.nickname,
				addressPostcode: props.formValue.Input1Form.addressPostcode,
				addressPrefecture: props.formValue.Input1Form.addressPrefecture,
				addressCity: props.formValue.Input1Form.addressCity,
				addressBlock: props.formValue.Input1Form.addressBlock,
				addressBuilding: props.formValue.Input1Form.addressBuilding,
				phoneNumber1: props.formValue.Input1Form.phoneNumber1,
				phoneNumber2: props.formValue.Input1Form.phoneNumber2,

				birthday: String(
					props.formValue.Input2Form.birthday !== null
						? `${props.formValue.Input2Form.birthday.$y}/${props.formValue.Input2Form.birthday.$M}/${props.formValue.Input2Form.birthday.$D}`
						: undefined,
				),
				gender: props.formValue.Input2Form.gender,
				employeeCode: props.formValue.Input2Form.employeeCode,
				startDate: String(
					props.formValue.Input2Form.startDate !== null
						? `${props.formValue.Input2Form.startDate.$y}/${props.formValue.Input2Form.startDate.$M}/${props.formValue.Input2Form.startDate.$D}`
						: undefined,
				),
				lastDate: String(
					props.formValue.Input2Form.lastDate !== null
						? `${props.formValue.Input2Form.lastDate.$y}/${props.formValue.Input2Form.lastDate.$M}/${props.formValue.Input2Form.lastDate.$D}`
						: undefined,
				),
				retirementReason: props.formValue.Input2Form.retirementReason,
				role: props.formValue.Input2Form.role,
				isEnabled: props.formValue.Input2Form.isEnabled,

				wage: props.formValue.Input3Form.wage,
				timeframe1StartTime: props.formValue.Input3Form.timeframe1StartTime,
				timeframe1EndTime: props.formValue.Input3Form.timeframe1EndTime,
				timeframe1Salary: Number(props.formValue.Input3Form.timeframe1Salary),
				timeframe2StartTime: props.formValue.Input3Form.timeframe2StartTime,
				timeframe2EndTime: props.formValue.Input3Form.timeframe2EndTime,
				timeframe2Salary: Number(props.formValue.Input3Form.timeframe2Salary),
				timeframe3StartTime: props.formValue.Input3Form.timeframe3StartTime,
				timeframe3EndTime: props.formValue.Input3Form.timeframe3EndTime,
				timeframe3Salary: Number(props.formValue.Input3Form.timeframe3Salary),
				fareSetting: props.formValue.Input3Form.fareSetting,
				dailyRate: Number(props.formValue.Input3Form.dailyRate),
				fixedMonth: Number(props.formValue.Input3Form.fixedMonth),
				nonPayment: Number(props.formValue.Input3Form.nonPayment),

				bankName: props.formValue.Input4Form.bankName,
				bankCode: props.formValue.Input4Form.bankCode,
				bankBranchName: props.formValue.Input4Form.bankBranchName,
				bankBranchCode: props.formValue.Input4Form.bankBranchCode,
				bankAccountType: props.formValue.Input4Form.bankAccountType,
				bankAccountNumber: props.formValue.Input4Form.bankAccountNumber,
				bankAccountHolder: props.formValue.Input4Form.bankAccountHolder,
			}),
		});

		if (response.ok) {
			props.handleNext();
		} else {
			console.log("error");
		}
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
											<TableCell>
												{props.formValue.Input1Form.shopCode.join()}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>店舗名</TableCell>
											<TableCell>
												{props.formValue.Input1Form.shopName.join()}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>email(ログインID)</TableCell>
											<TableCell>{props.formValue.Input1Form.email}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>パスワード</TableCell>
											<TableCell>
												{props.formValue.Input1Form.password === ""
													? "空欄の為、更新されません"
													: props.formValue.Input1Form.password}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>雇用形態</TableCell>
											<TableCell>
												{props.formValue.Input1Form.employmentStatus === 1
													? "アルバイト"
													: props.formValue.Input1Form.employmentStatus === 2
													  ? "正社員"
													  : props.formValue.Input1Form.employmentStatus === 3
														  ? "派遣"
														  : props.formValue.Input1Form.employmentStatus ===
																  4
															  ? "業務委託"
															  : ""}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>名前</TableCell>
											<TableCell>
												{props.formValue.Input1Form.lastName}
												&emsp;
												{props.formValue.Input1Form.firstName}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>なまえ</TableCell>
											<TableCell>
												{props.formValue.Input1Form.lastNameKana}
												&emsp;
												{props.formValue.Input1Form.firstNameKana}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>ニックネーム</TableCell>
											<TableCell>
												{props.formValue.Input1Form.nickname}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>郵便番号</TableCell>
											<TableCell>
												{props.formValue.Input1Form.addressPostcode}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>都道府県</TableCell>
											<TableCell>
												{props.formValue.Input1Form.addressPrefecture}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>市区町村</TableCell>
											<TableCell>
												{props.formValue.Input1Form.addressCity}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>番地</TableCell>
											<TableCell>
												{props.formValue.Input1Form.addressBlock}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>建物名</TableCell>
											<TableCell>
												{props.formValue.Input1Form.addressBuilding}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>電話番号1</TableCell>
											<TableCell>
												{props.formValue.Input1Form.phoneNumber1}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>電話番号2</TableCell>
											<TableCell>
												{props.formValue.Input1Form.phoneNumber2}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>誕生日</TableCell>
											<TableCell>
												{props.formValue.Input2Form.birthday !== null
													? `${props.formValue.Input2Form.birthday.$y}/${Number(
															props.formValue.Input2Form.birthday.$M + 1,
													  )}/${props.formValue.Input2Form.birthday.$D}`
													: undefined}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>性別</TableCell>
											<TableCell>
												{props.formValue.Input2Form.gender === 1
													? "男性"
													: "女性"}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>従業員コード</TableCell>
											<TableCell>
												{props.formValue.Input2Form.employeeCode}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>入社年月日</TableCell>
											<TableCell>
												{props.formValue.Input2Form.startDate !== null
													? `${
															props.formValue.Input2Form.startDate.$y
													  }/${Number(
															props.formValue.Input2Form.startDate.$M + 1,
													  )}/${props.formValue.Input2Form.startDate.$D}`
													: undefined}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>退社年月日</TableCell>
											<TableCell>
												{props.formValue.Input2Form.lastDate !== null
													? `${props.formValue.Input2Form.lastDate.$y}/${Number(
															props.formValue.Input2Form.lastDate.$M + 1,
													  )}/${props.formValue.Input2Form.lastDate.$D}`
													: undefined}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>退職理由</TableCell>
											<TableCell style={{ whiteSpace: "pre-line" }}>
												{props.formValue.Input2Form.retirementReason}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>管理者権限</TableCell>
											<TableCell>
												{props.formValue.Input2Form.role === 1
													? "システム管理者"
													: props.formValue.Input2Form.role === 2
													  ? "店舗管理者"
													  : "一般ユーザー"}
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
										<TableRow>
											<TableCell>給与形態</TableCell>
											<TableCell>
												{props.formValue.Input3Form.wage === 1
													? "時給"
													: props.formValue.Input3Form.wage === 2
													  ? "日給"
													  : "月給"}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>時間帯1</TableCell>
											<TableCell>
												{props.formValue.Input3Form.timeframe1StartTime !== ""
													? props.formValue.Input3Form.timeframe1StartTime
													: "未設定"}
												〜
												{props.formValue.Input3Form.timeframe1EndTime !== ""
													? props.formValue.Input3Form.timeframe1EndTime
													: "未設定"}
												&emsp;
												{props.formValue.Input3Form.timeframe1Salary}
												円
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>時間帯2</TableCell>
											<TableCell>
												{props.formValue.Input3Form.timeframe2StartTime !== ""
													? props.formValue.Input3Form.timeframe2StartTime
													: "未設定"}
												〜
												{props.formValue.Input3Form.timeframe2EndTime !== ""
													? props.formValue.Input3Form.timeframe2EndTime
													: "未設定"}
												&emsp;
												{props.formValue.Input3Form.timeframe2Salary}
												円
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>時間帯3</TableCell>
											<TableCell>
												{props.formValue.Input3Form.timeframe3StartTime !== ""
													? props.formValue.Input3Form.timeframe3StartTime
													: "未設定"}
												〜
												{props.formValue.Input3Form.timeframe3EndTime !== ""
													? props.formValue.Input3Form.timeframe3EndTime
													: "未設定"}
												&emsp;
												{props.formValue.Input3Form.timeframe3Salary}
												円
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>交通費設定</TableCell>
											<TableCell>
												{props.formValue.Input3Form.fareSetting === 1
													? "日割り"
													: props.formValue.Input3Form.fareSetting === 2
													  ? "月固定"
													  : ""}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>日割り</TableCell>
											<TableCell>
												{props.formValue.Input3Form.dailyRate}円
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>月固定</TableCell>
											<TableCell>
												{props.formValue.Input3Form.fixedMonth}円
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>不支給</TableCell>
											<TableCell>
												{props.formValue.Input3Form.nonPayment}円
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>銀行名</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankName}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>銀行コード</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankCode}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>支店名</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankBranchName}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>支店コード</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankBranchCode}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>口座種別</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankAccountType === 1
													? "普通"
													: props.formValue.Input4Form.bankAccountType === 2
													  ? "当座"
													  : ""}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>口座番号</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankAccountNumber}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>口座名義</TableCell>
											<TableCell>
												{props.formValue.Input4Form.bankAccountHolder}
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
					確定
				</Button>
			</Box>
		</div>
	);
}

export default Confirm;
