import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FormationEditDetails from "@/components/FormationEditDetails";
import FormationEditQuizz from "@/components/FormationEditQuizz";
import FormationEditChapters from "@/components/FormationEditChapters";
import FormationEditLessons from "@/components/FormationEditLessons";
import { Container } from "@mui/system";
import styled from "styled-components";
import { DRAWER_WIDTH } from "@/components/Drawer";

const ContentContainer = styled(Container)`
	border-radius: 0.25rem;
	padding: 1rem;
	background-color: var(--neutral100);
`;

const Tabbar = styled(AppBar)`
	position: fixed;
	top: 0;
	left: 0;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		left: ${DRAWER_WIDTH}px;
		width: calc(100% - ${DRAWER_WIDTH}px) !important;
	}
`;

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <ContentContainer>{children}</ContentContainer>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

export default function FormationEditPage() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Tabbar>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="Formation" {...a11yProps(0)} />
					<Tab label="Chapitre" {...a11yProps(1)} />
					<Tab label="Leçon" {...a11yProps(2)} />
					<Tab label="Quizz" {...a11yProps(3)} />
				</Tabs>
			</Tabbar>
			<TabPanel value={value} index={0} dir={theme.direction}>
				<FormationEditDetails />
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<FormationEditChapters />
			</TabPanel>
			<TabPanel value={value} index={2} dir={theme.direction}>
				<FormationEditLessons />
			</TabPanel>
			<TabPanel value={value} index={3} dir={theme.direction}>
				<FormationEditQuizz />
			</TabPanel>
		</Box>
	);
}
