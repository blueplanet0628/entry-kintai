import AlarmIcon from "@mui/icons-material/Alarm";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

import { signOut } from "next-auth/react";
import Link from "next/link";

export const mainListItems = (
	<React.Fragment>
		{/* <ListItemButton href="/schedule">
			<ListItemIcon>
				<EventNoteIcon />
			</ListItemIcon>
			<ListItemText primary="シフト管理" />
		</ListItemButton> */}
		<Link href="/timecard">
			<ListItemButton>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="タイムカード" />
			</ListItemButton>
		</Link>
		<Link href="/stamping">
			<ListItemButton>
				<ListItemIcon>
					<AlarmIcon />
				</ListItemIcon>
				<ListItemText primary="打刻" />
			</ListItemButton>
		</Link>
		<Link href="/staff">
			<ListItemButton>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="スタッフ設定" />
			</ListItemButton>
		</Link>
		<Link href="/shop">
			<ListItemButton>
				<ListItemIcon>
					<StoreIcon />
				</ListItemIcon>
				<ListItemText primary="店舗設定" />
			</ListItemButton>
		</Link>
	</React.Fragment>
);

const onSignout = () => {
	const out = async () => {
		const confirmed = confirm("ログアウトしますか？");
		if (confirmed) signOut();
	};
	out();
};

export const secondaryListItems = (
	<React.Fragment>
		{/* <ListSubheader component="div" inset>
			Saved reports
		</ListSubheader> */}
		<ListItemButton href="/account">
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="アカウント設定" />
		</ListItemButton>
		<ListItemButton onClick={onSignout}>
			<ListItemIcon>
				<LogoutIcon />
			</ListItemIcon>
			<ListItemText primary="ログアウト" />
		</ListItemButton>
	</React.Fragment>
);
