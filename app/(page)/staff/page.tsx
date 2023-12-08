"use client";

import { signOut } from "next-auth/react";

const onSignout = () => {
	const out = async () => {
		const confirmed = confirm("ログアウトしますか？");
		if (confirmed) signOut();
	};
	out();
};

const StaffPage = () => {
	return (
		<div>
			<h1>Staff Page</h1>
			<button type="button" onClick={() => onSignout()}>
				ログアウト
			</button>
		</div>
	);
};

export default StaffPage;
