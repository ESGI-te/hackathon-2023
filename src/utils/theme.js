import { createTheme } from "@mui/material";
import { MEDIA_QUERIES } from "./constants";

export const StyledComponentsTheme = {
	mediaQueries: {
		mobile: MEDIA_QUERIES.MOBILE,
		tabletAndUp: MEDIA_QUERIES.TABLET_AND_UP,
		desktopAndUp: MEDIA_QUERIES.DESKTOP_AND_UP,
		desktopLargeAndUp: MEDIA_QUERIES.DESKTOP_LARGE_AND_UP,
	},
};

export const MuiTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#355070",
			dark: "#1F2F42",
			light: "#EBEFF5",
		},
		secondary: {
			main: "#75A3E3",
			light: "#ACC8EE",
			dark: "#466288",
		},
		error: {
			main: "#E67377",
			light: "#EEA0A2",
			dark: "#AB494C",
		},
		warning: {
			main: "#FFBE1A",
			dark: "#CC9200",
			light: "#FFE7AA",
		},
		success: {
			main: "#458E9D",
			dark: "#336A75",
			light: "#A1D7E2",
		},
	},
	typography: {
		overline: {
			fontFamily: '"Source Sans Pro"',
		},
		caption: {
			fontFamily: '"Source Sans Pro"',
		},
		button: {
			fontFamily: '"Source Sans Pro"',
		},
		body2: {
			fontFamily: '"Source Sans Pro"',
		},
		body1: {
			fontFamily: '"Source Sans Pro"',
		},
		subtitle2: {
			fontFamily: '"Prompt"',
		},
		subtitle1: {
			fontFamily: '"Prompt"',
		},
		h6: {
			fontFamily: '"Prompt"',
		},
		h5: {
			fontFamily: '"Prompt"',
		},
		h4: {
			fontFamily: '"Prompt"',
		},
		h3: {
			fontFamily: '"Prompt"',
		},
		h2: {
			fontFamily: '"Prompt"',
		},
		h1: {
			fontFamily: '"Prompt"',
		},
		fontFamily: ["Prompt", "Source Sans Pro"].join(","),
	},
});
