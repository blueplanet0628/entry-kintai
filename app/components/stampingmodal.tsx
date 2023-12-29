"use client";

import { CardReader } from "@/lib/webusb/card-reader";
import { StampMode as StampModeRaw } from "@/types/shims";
import {
	Alert,
	Box,
	Button,
	Divider,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useRef, useState } from "react";

type StampMode = StampModeRaw | "none";

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

type Props = {
	shopId: number;
	open: boolean;
	onClose: () => void;
	onUpdated: () => void;
};

type Staff = {
	id: number;
	name: string;
	cardid: string;
};

const StampingModal: React.FC<Props> = ({
	shopId,
	open,
	onClose,
	onUpdated,
}) => {
	const [openRegister, setOpenRegister] = useState(false);
	const [innerOpen, setInnerOpen] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");
	const [idm, setIdm] = useState("");
	const [device, setDevice] = useState<CardReader | null>(null);
	const [staffList, setStaffList] = useState<Staff[]>([]);
	const [staff, setStaff] = useState<Staff | null>(null);
	const [detectedStaff, setDetectedStaff] = useState<Staff | null>(null);
	const [mode, setMode] = useState<StampMode>("none");
	const modeRef = useRef<StampMode>();
	modeRef.current = mode;
	// const idmRef = useRef<string>();
	// idmRef.current = idm;
	const staffListRef = useRef<Staff[]>([]);
	staffListRef.current = staffList;
	const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());

	const onClickClose = () => {
		const confirmed = confirm("打刻モードを終了しますか？");
		if (confirmed) {
			if (device) {
				device.stopIDmPolling();
				device.release(); // TODO: キャシュしておきたいが、デバイスエラー時の復旧ができないので都度解放する
				setDevice(null);
			}
			setInnerOpen(false);
			setMode("none");
			onClose();
		}
	};

	const onCardDetected = async (newIdm: string, error?: string) => {
		if (error) {
			console.log("ERRORED");
			alert(error);
			return;
		}
		if (modeRef.current === "none" || idm === newIdm) return;

		setIdm(newIdm);
		const cardStaff = staffListRef.current.find(
			(staff) => staff.cardid === newIdm,
		);
		if (!cardStaff) {
			setDetectedStaff(null);
			alert("登録されていないICカードです。\nICカードを登録して下さい。");
			return;
		}

		setDetectedStaff(cardStaff);

		const res = await fetch("/api/attendance/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				user_id: cardStaff.id,
				shop_id: shopId,
				mode: modeRef.current,
				clock_time: currentTime,
			}),
		});
		if (res.ok) {
			switch (modeRef.current) {
				case "in":
					setMessage(`${cardStaff.name} さんが出勤しました。`);
					break;
				case "out":
					setMessage(`${cardStaff.name} さんが退勤しました。`);
					break;
				case "out-middle":
					setMessage(`${cardStaff.name} さんが一時退勤しました。`);
					break;
			}
			setShowMessage(true);
			setMode("none");
		} else {
			setMode("none");
			const data = await res.json();
			alert(`打刻に失敗しました。${data.message ?? ""} (${res.status})`);
		}
	};

	const fetchStaffList = async () => {
		const res = await fetch(`/api/staff/${shopId}`);
		const data = await res.json();
		setStaffList(data.user);
		setStaff(data.user[0]);
	};

	const onStaffSelected = (e: SelectChangeEvent) => {
		const staffId = Number(e.target.value);
		const staff = staffList.find((staff) => staff.id === staffId);
		setStaff(staff ?? null);
	};

	const onClickState = async (selectedMode: StampMode) => {
		setIdm("");
		setDetectedStaff(null);
		if (mode === selectedMode) {
			setMode("none");
		} else {
			setMode(selectedMode);
		}
	};

	const onClickRegisterCommit = async () => {
		if (!staff) {
			alert("従業員を選択して下さい。");
			return;
		}
		if (!idm) {
			alert("ICカードを読み取らせてください。");
			return;
		}
		const confirmed = confirm(
			"ICカードを登録しますか？\n登録すると以前のカードは再度登録しないと利用できなくなります。",
		);
		if (confirmed) {
			const res = await fetch(`/api/staff/edit/${staff?.id}/card`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cardid: idm,
				}),
			});
			if (res.ok) {
				alert("ICカードの登録に成功しました。");
				setOpenRegister(false);
				fetchStaffList();
			} else {
				alert(
					`ICカードの登録に失敗しました。status: ${res.status}: ${res.statusText}`,
				);
			}
		}
	};

	const onDebugICCard = async () => {
		await onCardDetected("01010312b01bc5");
	};

	useEffect(() => {
		if (open) {
			setIdm("");

			(async () => {
				const dev = await CardReader.getDevice();
				if (dev) {
					setDevice(dev);
					dev.startIDmPolling(onCardDetected);
					setInnerOpen(true);
				} else {
					onClose();
				}
			})();
		}
	}, [open]);

	useEffect(() => {
		if (shopId > 0) {
			fetchStaffList();
		}
	}, [shopId]);

	useEffect(() => {
		const handler = window.setInterval(() => {
			setCurrentTime(new Date().getTime());
		}, 1000);
		return () => {
			window.clearInterval(handler);
		};
	}, []);

	return (
		<>
			<Modal
				open={innerOpen}
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
						カードリーダーにICカードを置いて下さい。
					</Typography>
					<Box mt={1} mb={1}>
						現在時刻:{" "}
						<span style={{ fontWeight: "bold" }}>
							{new Date(currentTime).toLocaleString()}
						</span>
					</Box>
					<Box>
						<TextField
							sx={{ width: "100%" }}
							label="カードID"
							id="standard-size-small"
							size="medium"
							variant="standard"
							value={idm}
							aria-readonly
						/>

						<TextField
							sx={{ width: "100%", mt: 3 }}
							label="従業員名"
							id="standard-size-small"
							size="medium"
							variant="standard"
							value={detectedStaff?.name ?? ""}
							aria-readonly
						/>
					</Box>
					<Box mt={3}>
						<Typography variant="subtitle1">
							打刻の種類を選択して下さい。
						</Typography>
					</Box>
					<Box sx={{ mt: 1, display: "flex" }}>
						<Button
							variant={mode === "in" ? "contained" : "outlined"}
							color="primary"
							sx={{ flex: 1 }}
							onClick={() => onClickState("in")}
						>
							出勤
						</Button>
						<Button
							variant={mode === "out-middle" ? "contained" : "outlined"}
							color="primary"
							onClick={() => onClickState("out-middle")}
							sx={{ ml: 1, flex: 1 }}
						>
							一時退勤
						</Button>
						<Button
							variant={mode === "out" ? "contained" : "outlined"}
							color="primary"
							onClick={() => onClickState("out")}
							sx={{ ml: 1, flex: 1 }}
						>
							退勤
						</Button>
					</Box>
					<Divider sx={{ mt: 2, mb: 2 }} />
					<Box sx={{ display: "flex" }} justifyContent="space-between">
						<Button
							variant="contained"
							color="success"
							onClick={() => setOpenRegister(true)}
						>
							ICカードの登録
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={onClickClose}
						>
							打刻モードを終了
						</Button>
					</Box>
				</Box>
			</Modal>
			{/* ICカード登録モーダル */}
			<Modal open={openRegister} onClose={() => setOpenRegister(false)}>
				<Box sx={style}>
					<Typography variant="h5" fontWeight="bold" component="h2">
						ICカードの登録
					</Typography>
					<Typography sx={{ mt: 2 }}>
						カードリーダーに登録したいICカードを置き、ユーザーを選択して下さい。
					</Typography>
					<Box>
						<TextField
							sx={{ width: "100%" }}
							label="カードID"
							id="standard-size-small"
							size="medium"
							variant="standard"
							value={idm}
						/>
					</Box>
					<Box sx={{ mt: 3 }}>
						<InputLabel id="user-select-label">従業員名</InputLabel>
						<Select
							id="user-select-label"
							variant="standard"
							displayEmpty
							value={staff?.id?.toString() ?? ""}
							onChange={onStaffSelected}
							sx={{ width: "100%" }}
						>
							{staffList.map((staff: Staff) => (
								<MenuItem key={staff.id} value={staff.id}>
									{staff.name}
								</MenuItem>
							))}
						</Select>
					</Box>
					<Box sx={{ display: "flex", mt: 5 }} justifyContent="space-between">
						<Button
							variant="contained"
							color="success"
							onClick={onClickRegisterCommit}
						>
							ICカードを登録する
						</Button>
						<Button variant="contained" color="success" onClick={onDebugICCard}>
							ICカードを置く(debug)
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => setOpenRegister(false)}
						>
							キャンセル
						</Button>
					</Box>
				</Box>
			</Modal>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={showMessage}
				onClose={() => setShowMessage(false)}
			>
				<Alert severity="success" sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default StampingModal;
