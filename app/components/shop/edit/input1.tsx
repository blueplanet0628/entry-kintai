"use client";

import { Box, Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input1Form {
	code: string | number;
	type: string | number;
	name: string;
	phoneNumber1: string;
	phoneNumber2: string | null;
	addressPostcode: string;
	addressPrefecture: string;
	addressCity: string;
	addressBlock: string;
	addressBuilding: string | null;
	phoneNumber3: string | null;
	phoneNumber4: string | null;
}

function Input1(props: any) {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	async function fetchData() {
		const response = await fetch(`/api/shop/edit/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.log("error");
		}
	}

	useEffect(() => {
		fetchData().then((data) => {
			const shop = !props.formValue.Input1Form
				? data.shop
				: props.formValue.Input1Form;

			const phoneNumber2 = shop.phoneNumber2 ? shop.phoneNumber2 : "";
			const phoneNumber3 = shop.phoneNumber3 ? shop.phoneNumber3 : "";
			const phoneNumber4 = shop.phoneNumber4 ? shop.phoneNumber4 : "";
			const addressBuilding = shop.addressBuilding ? shop.addressBuilding : "";

			setValue("code", shop.code, { shouldDirty: true });
			setValue("type", shop.type, { shouldDirty: true });
			setValue("name", shop.name, { shouldDirty: true });
			setValue("phoneNumber1", shop.phoneNumber1, { shouldDirty: true });
			setValue("phoneNumber2", phoneNumber2, { shouldDirty: true });
			setValue("addressPostcode", shop.addressPostcode, { shouldDirty: true });
			setValue("addressPrefecture", shop.addressPrefecture, {
				shouldDirty: true,
			});
			setValue("addressCity", shop.addressCity, { shouldDirty: true });
			setValue("addressBlock", shop.addressBlock, { shouldDirty: true });
			setValue("addressBuilding", addressBuilding, { shouldDirty: true });
			setValue("phoneNumber3", phoneNumber3, { shouldDirty: true });
			setValue("phoneNumber4", phoneNumber4, { shouldDirty: true });
		});
	}, [props.formValue.Input1Form]);

	const { control, handleSubmit, setValue } = useForm<Input1Form>({
		defaultValues: {
			code: "",
			type: "",
			name: "",
			phoneNumber1: "",
			phoneNumber2: "",
			addressPostcode: "",
			addressPrefecture: "",
			addressCity: "",
			addressBlock: "",
			addressBuilding: "",
			phoneNumber3: "",
			phoneNumber4: "",
		},
	});

	const [inputCodeValue, setInputCodeValue] = useState<string>("");
	const [isExistingCode, setIsExistingCode] = useState(false);

	// NOTE: Code重複確認
	const handleCodeCheck = async (e: any) => {
		const code = e.target.value ? e.target.value : undefined;
		console.log(code);
		const response = await fetch(`/api/shop/edit/${id}/codeCheck`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: Number(id),
				code: code,
			}),
		});

		const responseData = await response.json();
		const existingCode = responseData.existingCode;

		existingCode ? alert("他の店舗IDと重複しています。") : null;

		setInputCodeValue(code);
		setIsExistingCode(existingCode);
	};

	const onSubmit = (data: Input1Form) => {
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input1Form: data });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="code"
					control={control}
					rules={{
						required: { value: true, message: "店舗IDを入力してください。" },
						pattern: {
							value: /^[a-zA-Z]+[a-zA-Z0-9]*$/,
							message:
								"店舗IDは英字で始まる3文字以上10文字以内の半角英数字で入力してください。",
						},
						minLength: {
							value: 3,
							message:
								"店舗IDは英字で始まる3文字以上10文字以内の半角英数字で入力してください。",
						},
						maxLength: {
							value: 10,
							message:
								"店舗IDは英字で始まる3文字以上10文字以内の半角英数字で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}>
							<TextField
								{...field}
								sx={{ width: "100%", mt: 1, mr: 100, mb: 1 }}
								type="text"
								label="店舗ID"
								onBlur={handleCodeCheck}
								fullWidth
								error={errors.code ? true : false}
								helperText={errors.code?.message as string}
							/>
							{inputCodeValue === "" || inputCodeValue === undefined ? (
								<FormHelperText />
							) : isExistingCode === true ? (
								<FormHelperText sx={{ color: "red" }}>
									重複確認:NG
								</FormHelperText>
							) : (
								<FormHelperText sx={{ color: "green" }}>
									重複確認:OK
								</FormHelperText>
							)}
						</FormControl>
					)}
				/>
				<Controller
					name="type"
					control={control}
					rules={{
						required: {
							value: true,
							message: "店舗タイプを選択してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl error={errors.type ? true : false}>
							<FormLabel id="row-radio-buttons-group-label">
								店舗タイプ
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
								<FormControlLabel value={1} control={<Radio />} label="直営" />
								<FormControlLabel
									value={2}
									control={<Radio />}
									label="フランチャイズ"
								/>
							</RadioGroup>
							<FormHelperText>{errors.type?.message || ""}</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name="name"
					control={control}
					rules={{
						required: { value: true, message: "店舗名を入力してください。" },
						maxLength: {
							value: 100,
							message: "店舗名は100文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ mt: 1, mb: 1 }}
							type="text"
							label="店舗名"
							fullWidth
							error={errors.name ? true : false}
							helperText={errors.name?.message as string}
						/>
					)}
				/>
				<Controller
					name="phoneNumber1"
					control={control}
					rules={{
						required: { value: true, message: "電話番号を入力してください。" },
						maxLength: {
							value: 13,
							message: "電話番号は13文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="電話番号1"
							error={errors.phoneNumber1 ? true : false}
							helperText={errors.phoneNumber1?.message as string}
						/>
					)}
				/>
				<Controller
					name="phoneNumber2"
					control={control}
					rules={{
						maxLength: {
							value: 13,
							message: "電話番号は13文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="電話番号2"
							error={errors.phoneNumber2 ? true : false}
							helperText={errors.phoneNumber2?.message as string}
						/>
					)}
				/>
				<Controller
					name="addressPostcode"
					control={control}
					rules={{
						required: { value: true, message: "郵便番号を入力してください。" },
						maxLength: {
							value: 8,
							message: "郵便番号は8文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="郵便番号"
							error={errors.addressPostcode ? true : false}
							helperText={errors.addressPostcode?.message as string}
						/>
					)}
				/>
				<Controller
					name="addressPrefecture"
					control={control}
					rules={{
						validate: (form) => {
							if (!form) {
								return "都道府県を選択してください。";
							}
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							error={errors.addressPrefecture ? true : false}
						>
							<InputLabel sx={{ minWidth: 330 }} id="area-label">
								都道府県
							</InputLabel>
							<Select {...field} labelId="area-label" label="都道府県">
								<MenuItem value={"北海道"}>北海道</MenuItem>
								<MenuItem value={"青森県"}>青森県</MenuItem>
								<MenuItem value={"岩手県"}>岩手県</MenuItem>
								<MenuItem value={"宮城県"}>宮城県</MenuItem>
								<MenuItem value={"秋田県"}>秋田県</MenuItem>
								<MenuItem value={"山形県"}>山形県</MenuItem>
								<MenuItem value={"福島県"}>福島県</MenuItem>
								<MenuItem value={"茨城県"}>茨城県</MenuItem>
								<MenuItem value={"栃木県"}>栃木県</MenuItem>
								<MenuItem value={"群馬県"}>群馬県</MenuItem>
								<MenuItem value={"埼玉県"}>埼玉県</MenuItem>
								<MenuItem value={"千葉県"}>千葉県</MenuItem>
								<MenuItem value={"東京都"}>東京都</MenuItem>
								<MenuItem value={"神奈川県"}>神奈川県</MenuItem>
								<MenuItem value={"新潟県"}>新潟県</MenuItem>
								<MenuItem value={"富山県"}>富山県</MenuItem>
								<MenuItem value={"石川県"}>石川県</MenuItem>
								<MenuItem value={"福井県"}>福井県</MenuItem>
								<MenuItem value={"山梨県"}>山梨県</MenuItem>
								<MenuItem value={"長野県"}>長野県</MenuItem>
								<MenuItem value={"岐阜県"}>岐阜県</MenuItem>
								<MenuItem value={"静岡県"}>静岡県</MenuItem>
								<MenuItem value={"愛知県"}>愛知県</MenuItem>
								<MenuItem value={"三重県"}>三重県</MenuItem>
								<MenuItem value={"滋賀県"}>滋賀県</MenuItem>
								<MenuItem value={"京都府"}>京都府</MenuItem>
								<MenuItem value={"大阪府"}>大阪府</MenuItem>
								<MenuItem value={"兵庫県"}>兵庫県</MenuItem>
								<MenuItem value={"奈良県"}>奈良県</MenuItem>
								<MenuItem value={"和歌山県"}>和歌山県</MenuItem>
								<MenuItem value={"鳥取県"}>鳥取県</MenuItem>
								<MenuItem value={"島根県"}>島根県</MenuItem>
								<MenuItem value={"岡山県"}>岡山県</MenuItem>
								<MenuItem value={"広島県"}>広島県</MenuItem>
								<MenuItem value={"山口県"}>山口県</MenuItem>
								<MenuItem value={"徳島県"}>徳島県</MenuItem>
								<MenuItem value={"香川県"}>香川県</MenuItem>
								<MenuItem value={"愛媛県"}>愛媛県</MenuItem>
								<MenuItem value={"高知県"}>高知県</MenuItem>
								<MenuItem value={"福岡県"}>福岡県</MenuItem>
								<MenuItem value={"佐賀県"}>佐賀県</MenuItem>
								<MenuItem value={"長崎県"}>長崎県</MenuItem>
								<MenuItem value={"熊本県"}>熊本県</MenuItem>
								<MenuItem value={"大分県"}>大分県</MenuItem>
								<MenuItem value={"宮崎県"}>宮崎県</MenuItem>
								<MenuItem value={"鹿児島県"}>鹿児島県</MenuItem>
								<MenuItem value={"沖縄県"}>沖縄県</MenuItem>
							</Select>
							<FormHelperText>
								{errors.addressPrefecture?.message || ""}
							</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name="addressCity"
					control={control}
					rules={{
						required: { value: true, message: "住所を入力してください。" },
						maxLength: {
							value: 200,
							message: "住所は200文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "61.5%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="市区町村"
							error={errors.addressCity ? true : false}
							helperText={errors.addressCity?.message as string}
						/>
					)}
				/>
				<Controller
					name="addressBlock"
					control={control}
					rules={{
						maxLength: {
							value: 200,
							message: "番地は200文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "37%", mt: 1, mb: 1 }}
							type="text"
							label="番地"
							error={errors.addressBlock ? true : false}
							helperText={errors.addressBlock?.message as string}
						/>
					)}
				/>
				<Controller
					name="addressBuilding"
					control={control}
					rules={{
						maxLength: {
							value: 200,
							message: "建物名は200文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ mt: 1, mb: 1 }}
							type="text"
							label="建物名"
							fullWidth
							error={errors.addressBuilding ? true : false}
							helperText={errors.addressBuilding?.message as string}
						/>
					)}
				/>
				<Controller
					name="phoneNumber3"
					control={control}
					rules={{
						maxLength: {
							value: 13,
							message: "電話番号は13文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="電話番号1"
							error={errors.phoneNumber3 ? true : false}
							helperText={errors.phoneNumber3?.message as string}
						/>
					)}
				/>
				<Controller
					name="phoneNumber4"
					control={control}
					rules={{
						maxLength: {
							value: 13,
							message: "電話番号は13文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 50, mb: 1 }}
							type="text"
							label="電話番号2"
							error={errors.phoneNumber4 ? true : false}
							helperText={errors.phoneNumber4?.message as string}
						/>
					)}
				/>
				<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
						戻る
					</Button>
					<Button onClick={handleSubmit(onSubmit)} variant="outlined">
						次へ
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default Input1;
