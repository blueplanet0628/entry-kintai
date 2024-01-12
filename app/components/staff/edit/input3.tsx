"use client";

import { Box, Button, TextField } from "@mui/material";
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
	wage: number;
	timeframe1StartTime: string;
	timeframe1EndTime: string;
	timeframe1Salary: number;
	timeframe2StartTime: string;
	timeframe2EndTime: string;
	timeframe2Salary: number;
	timeframe3StartTime: string;
	timeframe3EndTime: string;
	timeframe3Salary: number;
	fareSetting: number;
	dailyRate: number;
	fixedMonth: number;
	nonPayment: number;
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
			const wage = !props.formValue.Input3Form
				? ConversionToNumberWage(staffDetail.wage)
				: staffDetail.wage;
			const timeframe1StartTime = !props.formValue.Input3Form
				? sliceTime(staffDetail.timeframe1StartTime)
				: staffDetail.timeframe1StartTime;
			const timeframe1EndTime = !props.formValue.Input3Form
				? sliceTime(staffDetail.timeframe1EndTime)
				: staffDetail.timeframe1EndTime;
			const timeframe2StartTime = !props.formValue.Input3Form
				? sliceTime(staffDetail.timeframe2StartTime)
				: staffDetail.timeframe2StartTime;
			const timeframe2EndTime = !props.formValue.Input3Form
				? sliceTime(staffDetail.timeframe2EndTime)
				: staffDetail.timeframe2EndTime;
			const timeframe3StartTime = !props.formValue.Input3Form
				? sliceTime(staffDetail.timeframe3StartTime)
				: staffDetail.timeframe3StartTime;
			const timeframe3EndTime = !props.formValue.Input3Form
				? sliceTime(staffDetail.timeframe3EndTime)
				: staffDetail.timeframe3EndTime;
			// TODO: DBから取得した情報を数値型に変換しない形が望ましい.
			const fareSetting = !props.formValue.Input3Form
				? ConversionToNumberFareSetting(staffDetail.fareSetting)
				: staffDetail.fareSetting;

			setValue("wage", wage, { shouldDirty: true });
			setValue("timeframe1StartTime", timeframe1StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe1EndTime", timeframe1EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe1Salary", staffDetail.timeframe1Salary, {
				shouldDirty: true,
			});
			setValue("timeframe2StartTime", timeframe2StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe2EndTime", timeframe2EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe2Salary", staffDetail.timeframe2Salary, {
				shouldDirty: true,
			});
			setValue("timeframe3StartTime", timeframe3StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe3EndTime", timeframe3EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe3Salary", staffDetail.timeframe3Salary, {
				shouldDirty: true,
			});
			setValue("fareSetting", fareSetting, { shouldDirty: true });
			setValue("dailyRate", staffDetail.dailyRate, { shouldDirty: true });
			setValue("fixedMonth", staffDetail.fixedMonth, { shouldDirty: true });
			setValue("nonPayment", staffDetail.nonPayment, { shouldDirty: true });
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
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 0, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									給与設定
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="number"
								/>
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
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 0, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									給与設定
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="number"
								/>
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
						render={({ field }) => (
							<FormControl sx={{ mt: 1, mr: 0, mb: 1 }}>
								<FormLabel id="row-radio-buttons-group-label">
									給与設定
								</FormLabel>
								<TextField
									{...field}
									sx={{ mt: 1, mr: 2, mb: 1 }}
									type="number"
								/>
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
										render={({ field }) => (
											<TextField
												{...field}
												type="text"
												label="交通費設定 日割り"
												sx={{
													width: "20%",
													mt: 1,
													mr: 2,
													mb: 1,
												}}
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
										render={({ field }) => (
											<TextField
												{...field}
												type="text"
												label="交通費設定 月固定"
												sx={{
													width: "20%",
													mt: 1,
													mr: 2,
													mb: 1,
												}}
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
										render={({ field }) => (
											<TextField
												{...field}
												type="text"
												label="交通費設定 不支給"
												sx={{
													width: "20%",
													mt: 1,
													mr: 2,
													mb: 1,
												}}
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
