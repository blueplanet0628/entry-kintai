"use client";

import { Box, Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input2Form {
	shiftPeriod: number | string;
	shiftDeadline: number;
	isEnabled: number;
}

function Input2(props: any) {
	useEffect(() => {
		if (props.formValue.Input2Form) {
			const shop = props.formValue.Input2Form;

			setValue("shiftPeriod", shop.shiftPeriod, { shouldDirty: true });
			setValue("shiftDeadline", shop.shiftDeadline, { shouldDirty: true });
			setValue("isEnabled", shop.isEnabled ? 1 : 0, { shouldDirty: true });
		}
	}, [props.formValue.Input2Form]);

	const { control, handleSubmit, setValue } = useForm<Input2Form>({
		defaultValues: {
			shiftPeriod: "",
			shiftDeadline: 0,
			isEnabled: 1, // NOTE: デフォルト:有効
		},
	});

	const onSubmit = (data: Input2Form) => {
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input2Form: data });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="shiftPeriod"
					control={control}
					rules={{
						required: {
							value: true,
							message: "シフト期間設定を選択してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ mb: 3 }}
							fullWidth
							error={errors.shiftPeriod ? true : false}
						>
							<FormLabel id="row-radio-buttons-group-label">
								シフト期間設定
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
									label="月2回(15日、末日)"
								/>
								<FormControlLabel value={2} control={<Radio />} label="月1回" />
							</RadioGroup>
							<FormHelperText>
								{errors.shiftPeriod?.message || ""}
							</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name="shiftDeadline"
					control={control}
					rules={{
						required: {
							value: true,
							message: "シフト提出締切日を入力してください。",
						},
						min: {
							value: 0,
							message: "シフト提出締切日は0日以上で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ mt: 1, mb: 1 }}
							fullWidth
							error={errors.shiftDeadline ? true : false}
						>
							<FormLabel id="row-text--group-label">シフト提出締切日</FormLabel>
							<div>
								<span style={{ position: "relative", top: "25px" }}>
									シフト開始日の
								</span>
								<TextField
									{...field}
									sx={{ width: "7.5%", mt: 1, mb: 1 }}
									type="number"
									InputProps={{
										inputProps: {
											min: 0,
										},
									}}
								/>
								<span style={{ position: "relative", top: "25px" }}>
									日前の営業終了時間
								</span>
							</div>
							<FormHelperText>
								{errors.shiftDeadline?.message || ""}
							</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name="isEnabled"
					control={control}
					rules={{
						required: {
							value: true,
							message: "状態を入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ mt: 1, mb: 1 }}
							fullWidth
							error={errors.isEnabled ? true : false}
						>
							<FormLabel id="row-radio-buttons-group-label">状態</FormLabel>
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
								<FormControlLabel value={1} control={<Radio />} label="有効" />
								<FormControlLabel value={0} control={<Radio />} label="無効" />
							</RadioGroup>
							<FormHelperText>{errors.isEnabled?.message || ""}</FormHelperText>
						</FormControl>
					)}
				/>
				<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
						戻る
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant="outlined"
						sx={{ mr: 1 }}
					>
						確認へ
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default Input2;
