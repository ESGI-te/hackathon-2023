import React, { useState } from "react";
import Drawer, { DRAWER_WIDTH } from "@components/Drawer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
	flex-grow: 1;
	background-color: var(--neutral200);
	min-height: 100vh;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		width: calc(100% - ${DRAWER_WIDTH}) px;
	}
`;

const Container = styled.div`
	display: flex;
`;

export default function MainLayout() {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const handleToggleDrawer = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	return (
		<>
			<Drawer
				drawerIsOpen={drawerIsOpen}
				handleToggleDrawer={handleToggleDrawer}
			/>
			<Main>
				<Outlet />
			</Main>
		</>
	);
}
