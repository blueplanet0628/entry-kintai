"use client";

import { Box, Button, FormHelperText, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FareSetting, Wage } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input3Form {
	wage: number | null;
	timeframe1StartTime: string | null | undefined;
	timeframe1EndTime: string | null | undefined;
	timeframe1Salary: number | null;
	timeframe2StartTime: string | null | undefined;
	timeframe2EndTime: string | null | undefined;
	timeframe2Salary: number | null;
	timeframe3StartTime: string | null | undefined;
	timeframe3EndTime: string | null | undefined;
	timeframe3Salary: number | null;
	fareSetting: number | null;
	dailyRate: number | null;
	fixedMonth: number | null;
	nonPayment: number | null;
}

function Input3(props: any) {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	// NOTE: ユーザー情報取得
	async function fetchUser() {
		const response = await fetch(`/api/staff/edit/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		}
	}

	useEffect(() => {
		fetchUser().then((data) => {
			const staff = !props.formValue.Input3Form
				? data.user
				: props.formValue.Input3Form;

			const staffDetail = !props.formValue.Input3Form
				? data.user.userDetails[0]
				: props.formValue.Input3Form;

			// TODO: DBから取得した情報を数値型に変換しない形が望ましい.
			const wage =
				!props.formValue.Input3Form && staffDetail != null
					? ConversionToNumberWage(staffDetail.wage)
					: staffDetail
					  ? staffDetail.wage
					  : 0;

			const timeframe1StartTime = staffDetail?.timeframe1StartTime
				? sliceTime(staffDetail.timeframe1StartTime)
				: "";
			const timeframe1EndTime = staffDetail?.timeframe1EndTime
				? sliceTime(staffDetail.timeframe1EndTime)
				: "";
			const timeframe1Salary = staffDetail?.timeframe1Salary
				? staffDetail.timeframe1Salary
				: 0;
			const timeframe2StartTime = staffDetail?.timeframe2StartTime
				? sliceTime(staffDetail.timeframe2StartTime)
				: "";
			const timeframe2EndTime = staffDetail?.timeframe2EndTime
				? sliceTime(staffDetail.timeframe2EndTime)
				: "";
			const timeframe2Salary = staffDetail?.timeframe2Salary
				? staffDetail.timeframe2Salary
				: 0;
			const timeframe3StartTime = staffDetail?.timeframe3StartTime
				? sliceTime(staffDetail.timeframe3StartTime)
				: "";
			const timeframe3EndTime = staffDetail?.timeframe3EndTime
				? sliceTime(staffDetail.timeframe3EndTime)
				: "";
			const timeframe3Salary = staffDetail?.timeframe3Salary
				? staffDetail.timeframe3Salary
				: 0;
			// TODO: DBから取得した情報を数値型に変換しない形が望ましい.
			const fareSetting =
				!props.formValue.Input3Form && staffDetail != null
					? ConversionToNumberFareSetting(staffDetail.fareSetting)
					: staffDetail
					  ? staffDetail.fareSetting
					  : 0;
			const dailyRate = staffDetail?.dailyRate ? staffDetail.dailyRate : 0;
			const fixedMonth = staffDetail?.fixedMonth ? staffDetail.fixedMonth : 0;
			const nonPayment = staffDetail?.nonPayment ? staffDetail.nonPayment : 0;

			setValue("wage", wage, { shouldDirty: true });
			setValue("timeframe1StartTime", timeframe1StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe1EndTime", timeframe1EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe1Salary", timeframe1Salary, {
				shouldDirty: true,
			});
			setValue("timeframe2StartTime", timeframe2StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe2EndTime", timeframe2EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe2Salary", timeframe2Salary, {
				shouldDirty: true,
			});
			setValue("timeframe3StartTime", timeframe3StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe3EndTime", timeframe3EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe3Salary", timeframe3Salary, {
				shouldDirty: true,
			});
			setValue("fareSetting", fareSetting, { shouldDirty: true });
			setValue("dailyRate", dailyRate, { shouldDirty: true });
			setValue("fixedMonth", fixedMonth, { shouldDirty: true });
			setValue("nonPayment", nonPayment, { shouldDirty: true });
		});
	}, [props.formValue.Input3Form]);

	const { control, handleSubmit, setValue } = useForm<Input3Form>({
		defaultValues: {
			wage: 0,
			timeframe1StartTime: "",
			timeframe1EndTime: "",
			timeframe1Salary: 0,
			timeframe2StartTime: "",
			timeframe2EndTime: "",
			timeframe2Salary: 0,
			timeframe3StartTime: "",
			timeframe3EndTime: "",
			timeframe3Salary: 0,
			fareSetting: 0,
			dailyRate: 0,
			fixedMonth: 0,
			nonPayment: 0,
		},
	});

	const ConversionToNumberWage = (wage: string) => {
		if (wage === Wage.HOURLY) {
			return 1;
		}
		if (wage === Wage.DAILY) {
			return 2;
		}
		if (wage === Wage.MONTHLY) {
			return 3;
		}
		return 0;
	};

	const ConversionToNumberFareSetting = (fareSetting: string) => {
		if (fareSetting === FareSetting.DAILY) {
			return 1;
		}
		if (fareSetting === FareSetting.MONTHLY) {
			return 2;
		}
		if (fareSetting === FareSetting.NON) {
			return 3;
		}
		return 0;
	};

	const sliceTime = (time: string) => {
		if (!time) {
			return;
		}

		const startingPosition = time.indexOf("T") + 1;
		const sliceTime = time.substr(startingPosition, 5);

		return sliceTime;
	};

	const onSubmit = (data: Input3Form) => {
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input3Form: data });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="wage"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ mt: 1, mr: 2, mb: 1 }} fullWidth>
							<FormLabel id="row-radio-buttons-group-label">給与形態</FormLabel>
							<RadioGroup
								row
								aria-labelledby="row-radio-buttons-group-label"
								name="type"
								onChange={(e) => {
									const value = parseInt(e.target.value);
									if (!Number.isNaN(value)) {
										field.onChange(value);
									}
								}}
								value={field.value === undefined ? "" : field.value}
							>
								<FormControlLabel value={1} control={<Radio />} label="時給" />
								<FormControlLabel value={2} control={<Radio />} label="月給" />
								<FormControlLabel value={3} control={<Radio />} label="日給" />
							</RadioGroup>
						</FormControl>
					)}
				/>
				<Box>
					<Controller
						name="timeframe1StartTime"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 2, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									時間帯1 開始時間
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1, ml: 8 }}
									type="time"
								/>
							</FormControl>
						)}
					/>
					<FormControl sx={{ mt: 7, mr: 2, mb: 1 }}>〜</FormControl>
					<Controller
						name="timeframe1EndTime"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 2, mb: 1, ml: 2 }}>
								<FormLabel id="row-radio-buttons-group-label">
									終了時間
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="time"
								/>
							</FormControl>
						)}
					/>
					<Controller
						name="timeframe1Salary"
						control={control}
						rules={{
							min: {
								value: 0,
								message: "給与設定は0以上で入力してください。",
							},
						}}
						render={({ field, formState: { errors } }) => (
							<FormControl
								sx={{ mt: 1, mr: 0, mb: 1 }}
								error={errors.timeframe1Salary ? true : false}
							>
								<FormLabel id="row-radio-buttons-group-label">
									給与設定
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="number"
								/>
								<FormHelperText>
									{errors.timeframe1Salary?.message || ""}
								</FormHelperText>
							</FormControl>
						)}
					/>
					<FormControl sx={{ mt: 7, mr: 0, mb: 1 }}>円</FormControl>
				</Box>
				<Box>
					<Controller
						name="timeframe2StartTime"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 2, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									時間帯2 開始時間
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1, ml: 8 }}
									type="time"
								/>
							</FormControl>
						)}
					/>
					<FormControl sx={{ mt: 7, mr: 2, mb: 1 }}>〜</FormControl>
					<Controller
						name="timeframe2EndTime"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 2, mb: 1, ml: 2 }}>
								<FormLabel id="row-radio-buttons-group-label">
									終了時間
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="time"
								/>
							</FormControl>
						)}
					/>
					<Controller
						name="timeframe2Salary"
						control={control}
						rules={{
							min: {
								value: 0,
								message: "給与設定は0以上で入力してください。",
							},
						}}
						render={({ field, formState: { errors } }) => (
							<FormControl
								sx={{ mt: 1, mr: 0, mb: 1 }}
								error={errors.timeframe2Salary ? true : false}
							>
								<FormLabel id="row-radio-buttons-group-label">
									給与設定
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="number"
								/>
								<FormHelperText>
									{errors.timeframe2Salary?.message || ""}
								</FormHelperText>
							</FormControl>
						)}
					/>
					<FormControl sx={{ mt: 7, mr: 0, mb: 1 }}>円</FormControl>
				</Box>
				<Box>
					<Controller
						name="timeframe3StartTime"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 2, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									時間帯3 開始時間
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1, ml: 8 }}
									type="time"
								/>
							</FormControl>
						)}
					/>
					<FormControl sx={{ mt: 7, mr: 2, mb: 1 }}>〜</FormControl>
					<Controller
						name="timeframe3EndTime"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 2, mb: 1, ml: 2 }}>
								<FormLabel id="row-radio-buttons-group-label">
									終了時間
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="time"
								/>
							</FormControl>
						)}
					/>
					<Controller
						name="timeframe3Salary"
						control={control}
						rules={{
							min: {
								value: 0,
								message: "給与設定は0以上で入力してください。",
							},
						}}
						render={({ field, formState: { errors } }) => (
							<FormControl
								sx={{ mt: 1, mr: 0, mb: 1 }}
								error={errors.timeframe3Salary ? true : false}
							>
								<FormLabel id="row-radio-buttons-group-label">
									給与設定
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="number"
								/>
								<FormHelperText>
									{errors.timeframe3Salary?.message || ""}
								</FormHelperText>
							</FormControl>
						)}
					/>
					<FormControl sx={{ mt: 7, mr: 0, mb: 1 }}>円</FormControl>
				</Box>

				<Box>
					<Controller
						name="fareSetting"
						control={control}
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									交通費設定
								</FormLabel>
								<RadioGroup
									row
									aria-labelledby="row-radio-buttons-group-label"
									name="type"
									onChange={(e) => {
										const value = parseInt(e.target.value);
										if (!Number.isNaN(value)) {
											field.onChange(value);
										}
									}}
									value={field.value === undefined ? "" : field.value}
								>
									<FormControlLabel
										value={1}
										control={<Radio />}
										label="日割り"
									/>
									<Controller
										name="dailyRate"
										control={control}
										rules={{
											min: {
												value: 0,
												message: "交通費は0以上で入力してください。",
											},
										}}
										render={({ field, formState: { errors } }) => (
											<TextField
												{...field}
												type="number"
												label="交通費設定 日割り"
												sx={{
													width: "20%",
													mt: 1,
													mr: 2,
													mb: 1,
												}}
												error={errors.dailyRate ? true : false}
												helperText={errors.dailyRate?.message as string}
											/>
										)}
									/>

									<FormControlLabel
										value={2}
										control={<Radio />}
										label="月固定"
									/>
									<Controller
										name="fixedMonth"
										control={control}
										rules={{
											min: {
												value: 0,
												message: "交通費は0以上で入力してください。",
											},
										}}
										render={({ field, formState: { errors } }) => (
											<TextField
												{...field}
												type="number"
												label="交通費設定 月固定"
												sx={{
													width: "20%",
													mt: 1,
													mr: 2,
													mb: 1,
												}}
												error={errors.fixedMonth ? true : false}
												helperText={errors.fixedMonth?.message as string}
											/>
										)}
									/>
									<FormControlLabel
										value={3}
										control={<Radio />}
										label="不支給"
									/>
									<Controller
										name="nonPayment"
										control={control}
										rules={{
											min: {
												value: 0,
												message: "交通費は0以上で入力してください。",
											},
										}}
										render={({ field, formState: { errors } }) => (
											<TextField
												{...field}
												type="number"
												label="交通費設定 不支給"
												sx={{
													width: "20%",
													mt: 1,
													mr: 2,
													mb: 1,
												}}
												error={errors.nonPayment ? true : false}
												helperText={errors.nonPayment?.message as string}
											/>
										)}
									/>
								</RadioGroup>
							</FormControl>
						)}
					/>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
						戻る
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant="outlined"
						sx={{ mr: 1 }}
					>
						次へ
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default Input3;
