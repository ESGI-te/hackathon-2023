import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "@/routes";
import styled from "styled-components";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";

const Container = styled.div`
	display: flex;
`;

export default function App() {
	return (
		<Container>
			<Routes>
				<Route element={<MainLayout />}>
					{routes.map((route, i) => (
						<Route key={i} {...route} />
					))}
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</Container>
	);
}
