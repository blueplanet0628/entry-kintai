"use client";

import {
	Box,
	Button,
	Container,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Confirm from "@/app/components/staff/register/confirm";
import Input1 from "@/app/components/staff/register/input1";
import Input2 from "@/app/components/staff/register/input2";
import Input3 from "@/app/components/staff/register/input3";
import Input4 from "@/app/components/staff/register/input4";

const steps = ["基本情報", "基本情報2", "基本給与設定", "振込先情報", "確認"];

export default function Home() {
	const router = useRouter();

	const [activeStep, setActiveStep] = useState(0);
	const [formValue, setFormValue] = useState({});

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		activeStep === 0
			? router.push("/admin/staff")
			: setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		router.push("/admin/staff");
	};

	const changeFormConponent = (activeStep: number) => {
		switch (activeStep) {
			case 0:
				return (
					<Input1
						handleBack={handleBack}
						handleNext={handleNext}
						formValue={formValue}
						setFormValue={setFormValue}
					/>
				);
			case 1:
				return (
					<Input2
						handleBack={handleBack}
						handleNext={handleNext}
						formValue={formValue}
						setFormValue={setFormValue}
					/>
				);
			case 2:
				return (
					<Input3
						handleBack={handleBack}
						handleNext={handleNext}
						formValue={formValue}
						setFormValue={setFormValue}
					/>
				);
			case 3:
				return (
					<Input4
						handleBack={handleBack}
						handleNext={handleNext}
						formValue={formValue}
						setFormValue={setFormValue}
					/>
				);
			case 4:
				return (
					<Confirm
						handleBack={handleBack}
						handleNext={handleNext}
						formValue={formValue}
					/>
				);
		}
	};
	return (
		<Container>
			<Box sx={{ width: "100%" }}>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length ? (
					<div>
						<Typography sx={{ mt: 2, mb: 1 }}>登録が完了しました。</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button onClick={handleReset}>戻る</Button>
						</Box>
					</div>
				) : (
					<div>
						<Typography sx={{ mt: 3, mb: 5, fontSize: "h6.fontSize" }}>
							スタッフ登録
						</Typography>
						{changeFormConponent(activeStep)}
					</div>
				)}
			</Box>
		</Container>
	);
}
