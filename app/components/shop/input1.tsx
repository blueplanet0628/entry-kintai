"use client";

import { Box, Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";

export interface Input1Form {
	type: number;
	name: string;
	phoneNumber1: string;
	phoneNumber2: string;
	addressPostcode: string;
	addressPrefecture: string;
	addressCity: string;
	addressBlock: string;
	addressBuilding: string;
	phoneNumber3: string;
	phoneNumber4: string;
}

function Input1(props: any) {
	const { control, handleSubmit, setValue } = useForm<Input1Form>({
		defaultValues: {
			type: 0,
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

	const onSubmit = (data: Input1Form) => {
		props.handleNext();
		props.setFormValue({ ...props.formValue, Input1Form: data });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<FormControl>
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
						</FormControl>
					)}
				/>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ mt: 1, mb: 1 }}
							type="text"
							label="店舗名"
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
							sx={{ width: "30%", mt: 1, mr: 30, mb: 1 }}
							type="text"
							label="電話番号2"
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
					name="phoneNumber3"
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
					name="phoneNumber4"
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
					<Button variant="outlined" disabled sx={{ mr: 1 }}>
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
