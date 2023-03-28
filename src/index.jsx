import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
