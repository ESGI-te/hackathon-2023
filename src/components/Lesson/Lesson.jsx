import { Typography, Stack } from "@mui/material";
import styled from "styled-components";

const Title = styled(Typography)`
	padding-bottom: 1rem;
	border-bottom: solid 1px var(--neutral200);
`;

const Lesson = ({ lesson }) => {
	const hasVideo = lesson.video_url;
	return (
		<Stack gap="2rem">
			<Stack gap="0.5rem">
				<Title variant="h5">{lesson.title}</Title>
				<Typography color="var(--neutral800)">{lesson.intro}</Typography>
			</Stack>
			{hasVideo && (
				<video controls>
					<source src={lesson.video_url} />
				</video>
			)}
			<div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
		</Stack>
	);
};

export default Lesson;
