"use client";

import StampingModal from "@/app/components/stampingmodal";
import { Button, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";

type Shop = {
	id: number;
	name: string;
};

export default function Stamping() {
	const [open, setOpen] = React.useState(false);
	const [shop, setShop] = React.useState<Shop | null>(null);
	const [shopList, setShopList] = React.useState<Shop[]>([]);

	const handleOpen = () => setOpen(true);

	const handleUpdated = () => {};

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/shop");
			const { shop: list } = await res.json();
			setShopList(list);
			setShop(list[0]);
		})();
	}, [setShopList, setShop]);

	return (
		<>
			<Select value={shop?.id ?? ""} size="small" sx={{ mr: 1 }}>
				{shopList.map((shop) => (
					<MenuItem key={shop.id} value={shop.id}>
						{shop.name}
					</MenuItem>
				))}
			</Select>
			<Button onClick={handleOpen} variant="contained" disabled={shop === null}>
				打刻モードを開始
			</Button>
			<StampingModal
				shopId={shop?.id ?? 0}
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				onUpdated={handleUpdated}
			/>
		</>
	);
}
