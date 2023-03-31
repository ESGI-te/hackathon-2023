import * as React from "react";
import formationsData from "./formationsData.json";
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

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	padding-top: calc(80px + 1rem);
	padding-block: 1rem;
	padding-inline: 1rem;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		padding-block: 1.5rem;
		padding-inline: 1.5rem;
	}
`;

const Pannel = styled(TabPanel)`
	padding-top: 80px;
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
		<PageContainer>
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
			<Pannel value={value} index={0} dir={theme.direction}>
				<FormationEditDetails data={formationsData}/>
			</Pannel>
			<Pannel value={value} index={1} dir={theme.direction}>
				<FormationEditChapters />
			</Pannel>
			<Pannel value={value} index={2} dir={theme.direction}>
				<FormationEditLessons />
			</Pannel>
			<Pannel value={value} index={3} dir={theme.direction}>
				<FormationEditQuizz />
			</Pannel>
		</PageContainer>
	);
}
