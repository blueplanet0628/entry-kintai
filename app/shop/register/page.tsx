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

import Confirm from "@/app/components/shop/register/confirm";
import Input1 from "@/app/components/shop/register/input1";
import Input2 from "@/app/components/shop/register/input2";

const steps = ["基本情報", "シフト設定", "確認"];

export default function Home() {
	const router = useRouter();

	const [activeStep, setActiveStep] = useState(0);
	const [formValue, setFormValue] = useState({});

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		activeStep === 0
			? router.push("/shop")
			: setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		//setActiveStep(0);
		router.push("/shop");
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
							店舗登録
						</Typography>
						{changeFormConponent(activeStep)}
					</div>
				)}
			</Box>
		</Container>
	);
}
