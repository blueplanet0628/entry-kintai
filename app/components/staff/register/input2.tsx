"use client";

import { Box, Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input2Form {
	birthday: Dayjs | null;
	gender: number;
	startDate: Dayjs | null;
	lastDate: Dayjs | null;
	retirementReason: string | null;
	role: number;
	isEnabled: number;
}

function Input2(props: any) {
	useEffect(() => {
		if (props.formValue.Input2Form) {
			const staff = props.formValue.Input2Form;

			setBirthday(staff.birthday);
			setStartDate(staff.startDate);
			setLastDate(staff.lastDate);

			setValue("birthday", staff.birthday, { shouldDirty: true });
			setValue("gender", staff.gender, { shouldDirty: true });
			setValue("startDate", staff.startDate, { shouldDirty: true });
			setValue("lastDate", staff.lastDate, { shouldDirty: true });
			setValue("retirementReason", staff.retirementReason, {
				shouldDirty: true,
			});
			setValue("role", staff.role, { shouldDirty: true });
			setValue("isEnabled", staff.isEnabled ? 1 : 0, { shouldDirty: true });
		}
	}, [props.formValue.Input2Form]);

	const { control, handleSubmit, setValue } = useForm<Input2Form>({
		defaultValues: {
			birthday: "",
			gender: 0,
			startDate: "",
			lastDate: "",
			retirementReason: "",
			role: 0,
			isEnabled: 1, // NOTE: デフォルト:有効
		},
	});

	const onSubmit = (data: Input2Form) => {
		data.birthday = birthday;
		data.startDate = startDate;
		data.lastDate = lastDate;
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input2Form: data });
	};

	const [birthday, setBirthday] = useState<Dayjs | null>(null);
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [lastDate, setLastDate] = useState<Dayjs | null>(null);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="birthday"
					control={control}
					render={({ field }) => (
						<DemoContainer
							components={["DatePicker"]}
							sx={{ width: "30%", mt: 1, mr: 10, mb: 2 }}
						>
							<DatePicker
								{...field}
								label="誕生日"
								sx={{ width: "30%" }}
								value={birthday}
								onChange={(newBirthday) => setBirthday(newBirthday)}
								format="YYYY/MM/DD"
							/>
						</DemoContainer>
					)}
				/>
				<Controller
					name="gender"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ mb: 1 }} fullWidth>
							<FormLabel id="row-radio-buttons-group-label">性別</FormLabel>
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
								<FormControlLabel value={1} control={<Radio />} label="男性" />
								<FormControlLabel value={2} control={<Radio />} label="女性" />
							</RadioGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="startDate"
					control={control}
					render={({ field }) => (
						<DemoContainer
							components={["DatePicker"]}
							sx={{ display: "inline", width: "30%", mt: 1, mr: 2, mb: 2 }}
						>
							<DatePicker
								{...field}
								label="入社年月日"
								sx={{ width: "30%" }}
								value={startDate}
								onChange={(newstartDate) => setStartDate(newstartDate)}
								format="YYYY/MM/DD"
							/>
						</DemoContainer>
					)}
				/>
				<Controller
					name="lastDate"
					control={control}
					render={({ field }) => (
						<DemoContainer
							components={["DatePicker"]}
							sx={{ display: "inline", width: "30%", mt: 1, mr: 2, mb: 2 }}
						>
							<DatePicker
								{...field}
								label="退社年月日"
								sx={{ width: "30%" }}
								value={lastDate}
								onChange={(newlastDate) => setLastDate(newlastDate)}
								format="YYYY/MM/DD"
							/>
						</DemoContainer>
					)}
				/>
				<Controller
					name="retirementReason"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "61.5%", mt: 2, mr: 30, mb: 1 }}
							type="text"
							label="退職理由"
							multiline
							rows={4}
						/>
					)}
				/>
				<Controller
					name="role"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ mb: 1 }} fullWidth>
							<FormLabel id="row-radio-buttons-group-label">権限</FormLabel>
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
									label="システム管理者"
								/>
								<FormControlLabel
									value={2}
									control={<Radio />}
									label="店舗管理者"
								/>
								<FormControlLabel
									value={3}
									control={<Radio />}
									label="一般ユーザー"
								/>
							</RadioGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="isEnabled"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ mt: 1, mb: 1 }} fullWidth>
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
						次へ
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default Input2;
