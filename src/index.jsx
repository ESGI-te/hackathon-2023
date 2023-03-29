import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 20,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssBaseline />
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
