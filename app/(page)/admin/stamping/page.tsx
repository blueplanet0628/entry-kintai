"use client";

import StampingModal from "@/app/components/stampingmodal";
import { Button, Typography } from "@mui/material";
import React from "react";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function Stamping() {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);

	const handleUpdated = () => {};

	return (
		<>
			<Typography variant="h1">打刻</Typography>

			<Button onClick={handleOpen} variant="contained">
				打刻モードを開始
			</Button>
			<StampingModal
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				onUpdated={handleUpdated}
			/>
		</>
	);
}
