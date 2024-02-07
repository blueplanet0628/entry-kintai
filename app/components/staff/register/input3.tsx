"use client";

import { Box, Button, FormHelperText, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
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
	useEffect(() => {
		if (props.formValue.Input3Form) {
			const staff = props.formValue.Input3Form;

			setValue("wage", staff.wage, { shouldDirty: true });
			setValue("timeframe1StartTime", staff.timeframe1StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe1EndTime", staff.timeframe1EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe1Salary", staff.timeframe1Salary, {
				shouldDirty: true,
			});
			setValue("timeframe2StartTime", staff.timeframe2StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe2EndTime", staff.timeframe2EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe2Salary", staff.timeframe2Salary, {
				shouldDirty: true,
			});
			setValue("timeframe3StartTime", staff.timeframe3StartTime, {
				shouldDirty: true,
			});
			setValue("timeframe3EndTime", staff.timeframe3EndTime, {
				shouldDirty: true,
			});
			setValue("timeframe3Salary", staff.timeframe3Salary, {
				shouldDirty: true,
			});
			setValue("fareSetting", staff.fareSetting, { shouldDirty: true });
			setValue("dailyRate", staff.dailyRate, { shouldDirty: true });
			setValue("fixedMonth", staff.fixedMonth, { shouldDirty: true });
			setValue("nonPayment", staff.nonPayment, { shouldDirty: true });
		}
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
								error={errors.timeframe2Salary ? true : false}
							>
								<FormLabel
									id="row-radio-buttons-group-label"
									error={errors.timeframe3Salary ? true : false}
								>
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
