import React, { useState } from "react";
import Drawer, { DRAWER_WIDTH } from "@components/Drawer";
import Header from "@components/Header";
import { Route, Routes } from "react-router-dom";
import routes from "@/routes";
import styled from "styled-components";

const Main = styled.main`
	flex-grow: 1;
	background-color: var(--neutral200);
	min-height: 100vh;
	padding-top: 56px;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		width: calc(100% - ${DRAWER_WIDTH}) px;
	}
`;

const Container = styled.div`
	display: flex;
`;

export default function ResponsiveDrawer() {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const handleToggleDrawer = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	return (
		<Container>
			<Header handleToggleDrawer={handleToggleDrawer} />
			<Drawer
				drawerIsOpen={drawerIsOpen}
				handleToggleDrawer={handleToggleDrawer}
			/>
			<Main>
				<Routes>
					{routes.map((route, i) => (
						<Route key={i} {...route} />
					))}
				</Routes>
			</Main>
		</Container>
	);
}
