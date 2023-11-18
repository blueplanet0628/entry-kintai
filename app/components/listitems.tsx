import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StoreIcon from "@mui/icons-material/Store";
import AlarmIcon from "@mui/icons-material/Alarm";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { signOut } from "next-auth/react";

export const mainListItems = (
	<React.Fragment>
		{/* <ListItemButton href="/schedule">
			<ListItemIcon>
				<EventNoteIcon />
			</ListItemIcon>
			<ListItemText primary="シフト管理" />
		</ListItemButton> */}
		<ListItemButton href="/timecard">
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="タイムカード" />
		</ListItemButton>
		<ListItemButton href="/stamping">
			<ListItemIcon>
				<AlarmIcon />
			</ListItemIcon>
			<ListItemText primary="打刻" />
		</ListItemButton>
		<ListItemButton href="/staff">
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="スタッフ設定" />
		</ListItemButton>
		<ListItemButton href="/shop">
			<ListItemIcon>
				<StoreIcon />
			</ListItemIcon>
			<ListItemText primary="店舗設定" />
		</ListItemButton>
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
