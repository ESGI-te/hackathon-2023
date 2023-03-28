import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer, { DRAWER_WIDTH } from "@components/Drawer";
import Header from "@components/Header";
import { Route, Routes } from "react-router-dom";
import routes from "@/routes";

export default function ResponsiveDrawer() {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const handleToggleDrawer = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Header handleToggleDrawer={handleToggleDrawer} />
			<Drawer
				drawerIsOpen={drawerIsOpen}
				handleToggleDrawer={handleToggleDrawer}
			/>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
				}}
			>
				<Toolbar />
				<Routes>
					{routes.map((route, i) => (
						<Route key={i} {...route} />
					))}
				</Routes>
			</Box>
		</Box>
	);
}
