import { Box, Typography } from "@mui/material";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Fragment, useState } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ManagerFormationImg from "./assets-mock/manager-formation.jpeg";
import { useFetchFormation } from "../../hooks/fecthFormation";

const BorderLinearProgress = styled(LinearProgress)`
	height: 15px !important;
	border-radius: 10px;
	width: 100%;

	.${linearProgressClasses.colorPrimary} {
		background-color: #b2dfdb;
		height: 42px;
	}

	.${linearProgressClasses.bar} {
		border-radius: 5px;
		height: 40px;
		background-color: var(--red500);
	}
`;

const Page = styled.div`
	justify-content: center;
	height: 100vh;
	width: 100%;

	@media (min-width: 958px) {
		width: 70%;
	}

	margin: auto;

	img {
		width: 40%;
	}
`;

const StyledProgressContainer = styled.div`
	display: flex;
	background-color: white;
	align-items: center;
	margin-top: 2em;
	padding: 2rem;
	border-radius: 1rem;
`;

export const Formation = () => {
	// keek the opened Id
	const [open, setOpen] = useState("");
	const navigate = useNavigate();

	const handleClick = (id) => {
		if (open === id) {
			setOpen("");
			return;
		}
		setOpen(id);
	};

	const redirectToLesson = () => {
		// TODO

		navigate("/lesson");
	};

	const { data: formation, isLoading, error } = useFetchFormation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) return "An error has occurred: " + error.message;

	return (
		<Page>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant="h3" mb={3}>
						{formation.title}
					</Typography>
					<Typography variant="subtitle1" mb={3}>
						{formation.description}
					</Typography>
				</Box>
				<img
					src={ManagerFormationImg}
					style={{
						borderRadius: "50%",
						width: "40%",
						height: "40%",
					}}
				></img>
			</Box>

			<StyledProgressContainer>
				<BorderLinearProgress
					variant="determinate"
					value={formation.progress}
				/>
				<Typography variant="substitle1" ml={2}>
					{formation.progress}%
				</Typography>
			</StyledProgressContainer>

			<List
				sx={{ width: "100%", bgcolor: "background.paper", marginTop: "1em" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Chapitres
					</ListSubheader>
				}
			>
				{formation.chapters.map((chapter, index) => (
					<Fragment key={index}>
						<ListItemButton onClick={() => handleClick(chapter.id)}>
							<ListItemIcon>
								<CheckCircleIcon />
							</ListItemIcon>
							<ListItemText primary={chapter.title} />
							{open === chapter.id ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open === chapter.id} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{formation.chapters[index].lessons.map((lesson) => (
									<ListItemButton
										sx={{ pl: 4 }}
										LinkComponent={Link}
										to={`/formations/${formation?.id}/lessons/${lesson.id}`}
										key={lesson.id}
									>
										<ListItemIcon>
											{lesson.isCompleted ? (
												<CheckCircleIcon color="success" />
											) : (
												<CheckBoxOutlineBlankIcon />
											)}
										</ListItemIcon>
										<ListItemText primary={lesson.title} />
									</ListItemButton>
								))}
							</List>
						</Collapse>
					</Fragment>
				))}
			</List>
		</Page>
	);
};
