"use client";

import { Box, Button, FormHelperText, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { EmploymentStatus } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface Input1Form {
	shopId: Array<number>;
	shopCode: Array<string>;
	shopName: Array<string>;
	email: string;
	password: string;
	employmentStatus: number;
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
		// NOTE: 店舗情報取得
		const fetchShop = async () => {
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

		fetchUser().then((data) => {
			const staff = !props.formValue.Input1Form
				? data.user
				: props.formValue.Input1Form;

			const staffDetail = !props.formValue.Input1Form
				? data.user.userDetails[0]
				: props.formValue.Input1Form;

			const shop = !props.formValue.Input1Form
				? data.user.shops
				: props.formValue.Input1Form;

			// NOTE: パスワードのみ,DBから取得した情報を表示させない.
			const password = !props.formValue.Input1Form
				? ""
				: props.formValue.Input1Form.password;

			// TODO: DBから取得した情報を数値型に変換しない形が望ましい.
			const employmentStatus =
				!props.formValue.Input1Form && staffDetail != null
					? ConversionToNumberEmploymentStatus(staffDetail.employmentStatus)
					: staffDetail
					  ? staffDetail.employmentStatus
					  : 0;
			const lastName = staffDetail?.lastName ? staffDetail.lastName : "";
			const firstName = staffDetail?.firstName ? staffDetail.firstName : "";
			const lastNameKana = staffDetail?.lastNameKana
				? staffDetail.lastNameKana
				: "";
			const firstNameKana = staffDetail?.firstNameKana
				? staffDetail.firstNameKana
				: "";
			const nickname = staffDetail?.nickname ? staffDetail.nickname : "";
			const addressPostcode = staffDetail?.addressPostcode
				? staffDetail.addressPostcode
				: "";
			const addressPrefecture = staffDetail?.addressPrefecture
				? staffDetail.addressPrefecture
				: "";
			const addressCity = staffDetail?.addressCity
				? staffDetail.addressCity
				: "";
			const addressBlock = staffDetail?.addressBlock
				? staffDetail.addressBlock
				: "";
			const addressBuilding = staffDetail?.addressBuilding
				? staffDetail.addressBuilding
				: "";
			const phoneNumber1 = staffDetail?.phoneNumber1
				? staffDetail.phoneNumber1
				: "";
			const phoneNumber2 = staffDetail?.phoneNumber2
				? staffDetail.phoneNumber2
				: "";

			if (!props.formValue.Input1Form) {
				// TODO: map関数を何度も使用しない形が望ましい.
				const shopId = shop.map((obj: any) => obj.id);
				const shopCode = shop.map((obj: any) => obj.code);
				const shopName = shop.map((obj: any) => obj.name);

				setShopId(shopId);
				setShopCode(shopCode);
				setShopName(shopName);
			} else {
				setShopId(shop.shopId);
				setShopCode(shop.shopCode);
				setShopName(shop.shopName);
			}

			setValue("shopCode", shopCode, { shouldDirty: true });
			setValue("shopName", shopName, { shouldDirty: true });

			setValue("email", staff.email, { shouldDirty: true });
			setValue("password", password, { shouldDirty: true });
			setValue("employmentStatus", employmentStatus, {
				shouldDirty: true,
			});
			setValue("lastName", lastName, {
				shouldDirty: true,
			});
			setValue("firstName", firstName, {
				shouldDirty: true,
			});
			setValue("lastNameKana", lastNameKana, {
				shouldDirty: true,
			});
			setValue("firstNameKana", firstNameKana, {
				shouldDirty: true,
			});
			setValue("nickname", nickname, {
				shouldDirty: true,
			});
			setValue("addressPostcode", addressPostcode, {
				shouldDirty: true,
			});
			setValue("addressPrefecture", addressPrefecture, {
				shouldDirty: true,
			});
			setValue("addressCity", addressCity, {
				shouldDirty: true,
			});
			setValue("addressBlock", addressBlock, {
				shouldDirty: true,
			});
			setValue("addressBuilding", addressBuilding, {
				shouldDirty: true,
			});
			setValue("phoneNumber1", phoneNumber1, {
				shouldDirty: true,
			});
			setValue("phoneNumber2", phoneNumber2, {
				shouldDirty: true,
			});
		});
	}, [props.formValue.Input1Form]);

	const [inputEmailValue, setInputEmailValue] = useState<string>("");
	const [isExistingEmail, setIsExistingEmail] = useState(false);

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
			employmentStatus: 0,
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

	const ConversionToNumberEmploymentStatus = (employmentStatus: string) => {
		if (employmentStatus === EmploymentStatus.PART_TIME) {
			return 1;
		}
		if (employmentStatus === EmploymentStatus.FULL_TIME) {
			return 2;
		}
		if (employmentStatus === EmploymentStatus.TEMPORARY) {
			return 3;
		}
		if (employmentStatus === EmploymentStatus.SUBCONTRACTING) {
			return 4;
		}
		return 0;
	};

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

		const response = await fetch(`/api/staff/edit/${id}/emailCheck`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: Number(id),
				email: email,
			}),
		});

		const responseData = await response.json();
		const existingEmail = responseData.existingEmail;

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
					render={({ field }) => (
						<FormControl sx={{ mt: 1, mr: 2, mb: 1 }}>
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
						</FormControl>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ width: "61.5%", mt: 1, mr: 2, mb: 1 }}>
							<TextField
								{...field}
								type="text"
								label="email(ログインID)"
								onBlur={handleEmailCheck}
							/>
							{inputEmailValue === "" || inputEmailValue === undefined ? (
								<FormHelperText />
							) : isExistingEmail === true ? (
								<FormHelperText sx={{ color: "red" }}>NG</FormHelperText>
							) : (
								<FormHelperText sx={{ color: "green" }}>OK</FormHelperText>
							)}
						</FormControl>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<FormControl sx={{ width: "61.5%", mt: 1, mr: 30, mb: 1 }}>
							<TextField {...field} type="text" label="パスワード" />
							<FormHelperText>
								パスワードが未入力の場合、パスワードは変更されません。
							</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name="lastName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="姓"
						/>
					)}
				/>
				<Controller
					name="firstName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="名"
						/>
					)}
				/>
				<Controller
					name="lastNameKana"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="せい"
						/>
					)}
				/>
				<Controller
					name="firstNameKana"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="めい"
						/>
					)}
				/>
				<Controller
					name="nickname"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "61.5%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="ニックネーム"
						/>
					)}
				/>
				<Controller
					name="addressPostcode"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="郵便番号"
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
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "61.5%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="市区町村"
						/>
					)}
				/>
				<Controller
					name="addressBlock"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "37%", mt: 1, mb: 1 }}
							type="text"
							label="番地"
						/>
					)}
				/>
				<Controller
					name="addressBuilding"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ mt: 1, mb: 1 }}
							type="text"
							label="建物名"
							fullWidth
						/>
					)}
				/>
				<Controller
					name="phoneNumber1"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 2, mb: 1 }}
							type="text"
							label="電話番号1"
						/>
					)}
				/>
				<Controller
					name="phoneNumber2"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: "30%", mt: 1, mr: 50, mb: 1 }}
							type="text"
							label="電話番号2"
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
