"use client";

import { CardReader } from "@/lib/webusb/card-reader";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 450,
	// minWidth: 200,
	maxHeight: "80vh",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const loadingStyle = {
	textAlign: "center",
	padding: 4,
	width: "100%",
};

type Props = {
	open: boolean;
	onClose: () => void;
	onUpdated: () => void;
};

const StampingModal: React.FC<Props> = ({ open, onClose, onUpdated }) => {
	const [loading, setLoading] = useState(false);
	const [innerOpen, setInnerOpen] = useState(false);
	const [idm, setIdm] = useState("");
	const [device, setDevice] = useState<CardReader | null>(null);

	const onClickClose = () => {
		const confirmed = confirm("打刻モードを終了しますか？");
		if (confirmed) {
			if (device) {
				device.stopIDmPolling();
			}
			setInnerOpen(false);
			setLoading(false);
			onClose();
		}
	};

	useEffect(() => {
		if (open) {
			setIdm("");

			(async () => {
				const dev = await CardReader.getDevice();
				if (dev) {
					setDevice(dev);
					dev.startIDmPolling((idm, error) => {
						if (error) {
							console.log("ERRORED");
						} else {
							setIdm(idm);
						}
					});
					setInnerOpen(true);
				} else {
					onClose();
				}
			})();
		}
	}, [open, onClose]);

	return (
		<Modal
			open={innerOpen}
			onClose={onClickClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h5"
					fontWeight="bold"
					component="h2"
				>
					打刻モード
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					カードリーダーにICカードをかざしてください。
				</Typography>
				<p>現在時刻: {new Date().toLocaleString()}</p>
				<Box>
					<TextField
						sx={{ width: "100%", mt: 1 }}
						label="カードID"
						id="standard-size-small"
						size="medium"
						variant="standard"
						value={idm}
					/>
					<TextField
						sx={{ width: "100%", mt: 1 }}
						label="従業員名"
						id="standard-size-small"
						size="medium"
						variant="standard"
					/>
				</Box>
				<Button
					variant="contained"
					color="secondary"
					onClick={onClickClose}
					sx={{ mt: 5 }}
				>
					打刻モードを終了
				</Button>
			</Box>
		</Modal>
	);
};

export default StampingModal;
