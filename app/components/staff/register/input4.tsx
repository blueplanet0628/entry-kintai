"use client";

import { Box, Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input4Form {
	bankName: string;
	bankCode: string;
	bankBranchName: string;
	bankBranchCode: string;
	bankAccountType: number;
	bankAccountNumber: string;
	bankAccountHolder: string;
}

function Input4(props: any) {
	useEffect(() => {
		if (props.formValue.Input4Form) {
			const shop = props.formValue.Input4Form;

			setValue("bankName", shop.bankName, { shouldDirty: true });
			setValue("bankCode", shop.bankCode, { shouldDirty: true });
			setValue("bankBranchName", shop.bankBranchName, {
				shouldDirty: true,
			});
			setValue("bankBranchCode", shop.bankBranchCode, {
				shouldDirty: true,
			});
			setValue("bankAccountType", shop.bankAccountType, {
				shouldDirty: true,
			});
			setValue("bankAccountNumber", shop.bankAccountNumber, {
				shouldDirty: true,
			});
			setValue("bankAccountHolder", shop.bankAccountHolder, {
				shouldDirty: true,
			});
		}
	}, [props.formValue.Input4Form]);

	const { control, handleSubmit, setValue } = useForm<Input4Form>({
		defaultValues: {
			bankName: "",
			bankCode: "",
			bankBranchName: "",
			bankBranchCode: "",
			bankAccountType: 0,
			bankAccountNumber: "",
			bankAccountHolder: "",
		},
	});

	const onSubmit = (data: Input4Form) => {
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input4Form: data });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="bankName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="銀行名"
						/>
					)}
				/>
				<Controller
					name="bankCode"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="銀行コード"
						/>
					)}
				/>
				<Controller
					name="bankBranchName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="支店名"
						/>
					)}
				/>
				<Controller
					name="bankBranchCode"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="支店コード"
						/>
					)}
				/>
				<Controller
					name="bankAccountType"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ mt: 1, mb: 1 }} fullWidth>
							<FormLabel id="row-radio-buttons-group-label">口座種別</FormLabel>
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
								<FormControlLabel value={1} control={<Radio />} label="普通" />
								<FormControlLabel value={2} control={<Radio />} label="当座" />
							</RadioGroup>
						</FormControl>
					)}
				/>
				<Controller
					name="bankAccountNumber"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="口座番号"
						/>
					)}
				/>
				<Controller
					name="bankAccountHolder"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="口座名義"
						/>
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

export default Input4;
