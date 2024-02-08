"use client";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input1Form {
	shopId: Array<number>;
	shopCode: Array<string>;
	shopName: Array<string>;
	email: string;
	password: string;
	employmentStatus: number | string;
	lastName: string;
	firstName: string;
	lastNameKana: string;
	firstNameKana: string;
	nickname: string | null;
	addressPostcode: string;
	addressPrefecture: string;
	addressCity: string;
	addressBlock: string;
	addressBuilding: string | null;
	phoneNumber1: string;
	phoneNumber2: string | null;
}

function Input1(props: any) {
	useEffect(() => {
		// NOTE: 店舗情報の取得
		const fetchShop = async () => {
			// TODO: 編集画面でも同様の処理を実施するので,pathの場所は変更する可能性有り.
			const response = await fetch("/api/staff/shop/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = await response.json();
			const shop = responseData.shop;
			const shopNameList = shop.map((obj: any) => obj.name);

			setShop(shop);
			setShopNameList(shopNameList);
		};
		fetchShop();

		if (props.formValue.Input1Form) {
			const staff = props.formValue.Input1Form;

			setShopId(staff.shopId);
			setShopCode(staff.shopCode);
			setShopName(staff.shopName);

			setValue("shopCode", staff.shopCode, { shouldDirty: true });
			setValue("shopName", staff.shopName, { shouldDirty: true });
			setValue("email", staff.email, { shouldDirty: true });
			setValue("password", staff.password, { shouldDirty: true });
			setValue("employmentStatus", staff.employmentStatus, {
				shouldDirty: true,
			});
			setValue("lastName", staff.lastName, { shouldDirty: true });
			setValue("firstName", staff.firstName, { shouldDirty: true });
			setValue("lastNameKana", staff.lastNameKana, { shouldDirty: true });
			setValue("firstNameKana", staff.firstNameKana, {
				shouldDirty: true,
			});
			setValue("nickname", staff.nickname, { shouldDirty: true });
			setValue("addressPostcode", staff.addressPostcode, { shouldDirty: true });
			setValue("addressPrefecture", staff.addressPrefecture, {
				shouldDirty: true,
			});
			setValue("addressCity", staff.addressCity, { shouldDirty: true });
			setValue("addressBlock", staff.addressBlock, { shouldDirty: true });
			setValue("addressBuilding", staff.addressBuilding, { shouldDirty: true });
			setValue("phoneNumber1", staff.phoneNumber1, { shouldDirty: true });
			setValue("phoneNumber2", staff.phoneNumber2, { shouldDirty: true });
		}
	}, [props.formValue.Input1Form]);

	const [inputEmailValue, setInputEmailValue] = useState<string>("");
	const [isExistingEmail, setIsExistingEmail] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [shop, setShop] = useState([]);
	const [shopNameList, setShopNameList] = useState([]);
	const [shopId, setShopId] = useState<number[]>([]);
	const [shopCode, setShopCode] = useState<string[]>([]);
	const [shopName, setShopName] = useState<string[]>([]);

	const { control, handleSubmit, setValue } = useForm<Input1Form>({
		defaultValues: {
			shopId: [],
			shopCode: [],
			shopName: [],
			email: "",
			password: "",
			employmentStatus: "",
			lastName: "",
			firstName: "",
			lastNameKana: "",
			firstNameKana: "",
			nickname: "",
			addressPostcode: "",
			addressPrefecture: "",
			addressCity: "",
			addressBlock: "",
			addressBuilding: "",
			phoneNumber1: "",
			phoneNumber2: "",
		},
	});

	// NOTE: 店舗名CSS
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	// NOTE: Email重複確認
	const handleEmailCheck = async (e: any) => {
		const email = e.target.value ? e.target.value : undefined;

		const response = await fetch("/api/staff/register/emailCheck", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
			}),
		});

		const responseData = await response.json();
		const existingEmail = responseData.user;

		existingEmail ? alert("すでに登録済のメールアドレスです。") : null;

		setInputEmailValue(email);
		setIsExistingEmail(existingEmail);
	};

	// NOTE: 店舗名選択
	const handleChangeShopName = (e: SelectChangeEvent<typeof shopName>) => {
		const value = e.target.value;

		const checkedShop = shop
			.map((shopObj: any) => {
				for (const item of value) {
					if (shopObj.name === item) {
						return shopObj;
					}
				}
			})
			.filter((v) => v);

		// TODO: map関数を何度も使用しない形が望ましい.
		const shopIdValue = checkedShop.map((obj: any) => obj.id);
		const shopCodeValue = checkedShop.map((obj: any) => obj.code);
		const shopNameValue = checkedShop.map((obj: any) => obj.name);

		setShopId(shopIdValue);
		setShopCode(shopCodeValue);
		setShopName(shopNameValue);
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const onSubmit = (data: Input1Form) => {
		data.shopId = shopId;
		data.shopCode = shopCode;
		data.shopName = shopName;

		props.handleNext();
		props.setFormValue({ ...props.formValue, Input1Form: data });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="shopId"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ display: "none" }}
							type="text"
							label="ID"
							disabled
							value={shopId.map((row) => row)}
						/>
					)}
				/>
				<Controller
					name="shopCode"
					control={control}
					render={({ field }) => (
						<TextField
							//{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="店舗ID"
							disabled
							value={shopCode.map((row) => row)}
						/>
					)}
				/>
				<Controller
					name="shopName"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}>
							<InputLabel id="demo-multiple-checkbox-label">店舗名</InputLabel>
							<Select
								{...field}
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={shopName}
								onChange={handleChangeShopName}
								input={<OutlinedInput label="店舗名" />}
								renderValue={(selected) => selected.join(", ")}
								MenuProps={MenuProps}
							>
								{shopNameList.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={shopName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				/>

				<Controller
					name="employmentStatus"
					control={control}
					rules={{
						required: {
							value: true,
							message: "雇用形態を選択してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ mt: 1, mr: 2, mb: 1 }}
							error={errors.employmentStatus ? true : false}
						>
							<FormLabel id="row-radio-buttons-group-label">雇用形態</FormLabel>
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
									label="アルバイト"
								/>
								<FormControlLabel
									value={2}
									control={<Radio />}
									label="正社員"
								/>
								<FormControlLabel value={3} control={<Radio />} label="派遣" />
								<FormControlLabel
									value={4}
									control={<Radio />}
									label="業務委託"
								/>
							</RadioGroup>
							<FormHelperText>
								{errors.employmentStatus?.message || ""}
							</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name="email"
					control={control}
					rules={{
						required: {
							value: true,
							message: "メールアドレスを入力してください。",
						},
						maxLength: {
							value: 120,
							message: "メールアドレスは120文字以下で入力してください。",
						},
						pattern: {
							value:
								/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							message: "メールアドレスの書式が正しくありません。",
						},
						validate: () => {
							if (isExistingEmail === true) {
								return "emailが重複しています。";
							}
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ width: "61.5%", mt: 1, mr: 2, mb: 1 }}
							error={errors.email ? true : false}
						>
							<TextField
								{...field}
								type="text"
								label="email(ログインID)"
								onBlur={handleEmailCheck}
								error={errors.email ? true : false}
								helperText={errors.email?.message as string}
							/>
							{inputEmailValue === "" || inputEmailValue === undefined ? (
								<FormHelperText />
							) : isExistingEmail === true ? (
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
					name="password"
					control={control}
					rules={{
						required: {
							value: true,
							message: "パスワードを入力してください。",
						},
						pattern: {
							value: /^[ -~]+$/,
							message: "パスワードは半角英数字、半角記号のみ使用できます。",
						},
						minLength: {
							value: 6,
							message: "パスワードは6文字以上で入力してください。",
						},
						maxLength: {
							value: 200,
							message: "パスワードは200文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<FormControl
							sx={{ width: "61.5%", mt: 1, mr: 30, mb: 1 }}
							variant="outlined"
							error={errors.password ? true : false}
						>
							<InputLabel htmlFor="outlined-adornment-password">
								パスワード
							</InputLabel>
							<OutlinedInput
								{...field}
								id="outlined-adornment-password"
								type={showPassword ? "text" : "password"}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="password"
							/>
							<FormHelperText>{errors.password?.message || ""}</FormHelperText>
						</FormControl>
					)}
				/>

				<Controller
					name="lastName"
					control={control}
					rules={{
						required: {
							value: true,
							message: "お名前(姓)を入力してください。",
						},
						maxLength: {
							value: 10,
							message: "お名前(姓)は10文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="姓"
							error={errors.lastName ? true : false}
							helperText={errors.lastName?.message as string}
						/>
					)}
				/>
				<Controller
					name="firstName"
					control={control}
					rules={{
						required: {
							value: true,
							message: "お名前(名)を入力してください。",
						},
						maxLength: {
							value: 10,
							message: "お名前(名)は10文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="名"
							error={errors.firstName ? true : false}
							helperText={errors.firstName?.message as string}
						/>
					)}
				/>
				<Controller
					name="lastNameKana"
					control={control}
					rules={{
						maxLength: {
							value: 45,
							message: "お名前(せい)は45文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="せい"
							error={errors.lastNameKana ? true : false}
							helperText={errors.lastNameKana?.message as string}
						/>
					)}
				/>
				<Controller
					name="firstNameKana"
					control={control}
					rules={{
						maxLength: {
							value: 45,
							message: "お名前(めい)は45文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="めい"
							error={errors.firstNameKana ? true : false}
							helperText={errors.firstNameKana?.message as string}
						/>
					)}
				/>
				<Controller
					name="nickname"
					control={control}
					rules={{
						maxLength: {
							value: 100,
							message: "ニックネームは100文字以下で入力してください。",
						},
					}}
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: "61.5%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="ニックネーム"
							error={errors.nickname ? true : false}
							helperText={errors.nickname?.message as string}
						/>
					)}
				/>
				<Controller
					name="addressPostcode"
					control={control}
					rules={{
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
					render={({ field }) => (
						<FormControl sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}>
							<InputLabel sx={{ minWidth: 330 }} id="area-label-2">
								都道府県
							</InputLabel>
							<Select {...field} labelId="area-label-2" label="都道府県">
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
						</FormControl>
					)}
				/>
				<Controller
					name="addressCity"
					control={control}
					rules={{
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
					name="phoneNumber1"
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
							sx={{ width: "30%", mt: 1, mr: 50, mb: 1 }}
							type="text"
							label="電話番号2"
							error={errors.phoneNumber2 ? true : false}
							helperText={errors.phoneNumber2?.message as string}
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
