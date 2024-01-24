"use client";

import { Box, Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Gender, Role } from "@prisma/client";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input2Form {
	birthday: Dayjs | null;
	gender: number;
	employeeCode: string | null;
	startDate: Dayjs | null;
	lastDate: Dayjs | null;
	retirementReason: string | null;
	role: number;
	isEnabled: number;
}

function Input2(props: any) {
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
			const staff = !props.formValue.Input2Form
				? data.user
				: props.formValue.Input2Form;

			const staffDetail = !props.formValue.Input2Form
				? data.user.userDetails[0]
				: props.formValue.Input2Form;

			const birthday = staffDetail?.birthday
				? dayjs(staffDetail.birthday)
				: null;
			// TODO: DBから取得した情報を数値型に変換しない形が望ましい.
			const gender =
				!props.formValue.Input2Form && staffDetail != null
					? ConversionToNumberGender(staffDetail.gender)
					: staffDetail
					  ? staffDetail.gender
					  : 0;
			const employeeCode = staffDetail?.employeeCode
				? staffDetail.employeeCode
				: "";
			const startDate = staffDetail?.startDate
				? dayjs(staffDetail.startDate)
				: null;
			const lastDate = staffDetail?.lastDate
				? dayjs(staffDetail.lastDate)
				: null;
			const retirementReason = staffDetail?.retirementReason
				? staffDetail.retirementReason
				: "";
			// TODO: DBから取得した情報を数値型に変換しない形が望ましい.
			const role = !props.formValue.Input2Form
				? ConversionToNumberRole(staff.role)
				: staff.role;

			setBirthday(birthday);
			setStartDate(startDate);
			setLastDate(lastDate);

			setValue("birthday", birthday, { shouldDirty: true });
			setValue("gender", gender, { shouldDirty: true });
			setValue("employeeCode", employeeCode, { shouldDirty: true });
			setValue("startDate", startDate, { shouldDirty: true });
			setValue("lastDate", lastDate, { shouldDirty: true });
			setValue("retirementReason", retirementReason, {
				shouldDirty: true,
			});
			setValue("role", role, { shouldDirty: true });
			setValue("isEnabled", staff.isEnabled ? 1 : 0, { shouldDirty: true });
		});
	}, [props.formValue.Input2Form]);

	const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
	const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
	const [lastDate, setLastDate] = React.useState<Dayjs | null>(null);

	const { control, handleSubmit, setValue } = useForm<Input2Form>({
		defaultValues: {
			birthday: "",
			gender: 0,
			employeeCode: "",
			startDate: "",
			lastDate: "",
			retirementReason: "",
			role: 0,
			isEnabled: undefined, // NOTE: デフォルト:未定義
		},
	});

	const ConversionToNumberGender = (gender: string) => {
		if (gender === Gender.MALE) {
			return 1;
		}
		if (gender === Gender.FEMALE) {
			return 2;
		}
		return 0;
	};

	const ConversionToNumberRole = (role: string) => {
		if (role === Role.ADMIN) {
			return 1;
		}
		if (role === Role.SHOP_ADMIN) {
			return 2;
		}
		if (role === Role.USER) {
			return 3;
		}
		return 0;
	};

	const onSubmit = (data: Input2Form) => {
		data.birthday = birthday;
		data.startDate = startDate;
		data.lastDate = lastDate;
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input2Form: data });
	};

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
					name="employeeCode"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 60, mb: 2 }}
							type="text"
							label="従業員コード"
						/>
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
