import { useParams } from "react-router";
import { useFetchLesson } from "./useFetchLesson.hook";
import { Button, CircularProgress, Typography, Container } from "@mui/material";
import styled from "styled-components";
import Lesson from "@/components/Lesson";
import { DRAWER_WIDTH } from "@/components/Drawer";
import Quizz from "@/components/Quizz/Quizz";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useResponsive } from "@/utils/hooks/useResponsive.hook";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	padding-top: calc(80px + 1rem);
	padding-bottom: 1rem;
	padding-inline: 1rem;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		padding-top: calc(60px + 1.5rem);
		padding-bottom: 1.5rem;
		padding-inline: 1.5rem;
	}
`;

const ContentContainer = styled(Container)`
	border-radius: 0.25rem;
	padding: 1rem;
	background-color: var(--neutral100);
`;

const NavigatorContainer = styled.div`
	width: 100%;
	min-height: 80px;
	border-radius: 0.25rem;
	padding-inline: 1rem;
	background-color: var(--neutral100);
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 56px;
	left: 0;
	z-index: 1;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		min-height: 60px;
		left: ${DRAWER_WIDTH}px;
		width: calc(100% - ${DRAWER_WIDTH}px);
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
`;

const NavigatorButton = styled(Button)`
	text-transform: capitalize !important;
`;

const NavigatorThreadWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 0.25rem;
	flex-wrap: wrap;

	a:hover {
		text-decoration: underline;
	}
`;

const NavigatorThread = ({ data }) => (
	<NavigatorThreadWrapper>
		<Typography as={Link} variant="caption">
			{data?.formation.title}
		</Typography>
		<ArrowRightIcon />
		<Typography as={Link} variant="caption">
			{data?.chapter.title}
		</Typography>
		<ArrowRightIcon />
		<Typography as={Link} variant="caption">
			{data?.current.title}
		</Typography>
	</NavigatorThreadWrapper>
);

const Navigator = ({ isLoading, data }) => {
	const { isDesktop } = useResponsive();
	const { formationId } = useParams();
	const prevLessonLink = `/formations/${formationId}/lessons/${data?.prev.id}`;
	const nextLessonLink = `/formations/${formationId}/lessons/${data?.next.id}`;

	return (
		<NavigatorContainer>
			<NavigatorThread data={data} />
			<ButtonsWrapper>
				{isDesktop ? (
					<>
						<NavigatorButton
							component={Link}
							to={prevLessonLink}
							size="small"
							color="secondary"
							disabled={isLoading}
						>
							Leçon précédente
						</NavigatorButton>
						<NavigatorButton
							component={Link}
							to={nextLessonLink}
							size="small"
							variant="contained"
							disabled={isLoading}
						>
							Leçon suivante
						</NavigatorButton>{" "}
					</>
				) : (
					<>
						<Button component={Link} to={prevLessonLink} variant="contained">
							<ArrowLeftIcon />
						</Button>
						<Button component={Link} to={nextLessonLink} variant="contained">
							<ArrowRightIcon />
						</Button>
					</>
				)}
			</ButtonsWrapper>
		</NavigatorContainer>
	);
};

const LessonPage = () => {
	const { lessonId } = useParams();
	const { data, isLoading } = useFetchLesson(lessonId);
	const isQuizz = data && data.current.questions;

	return (
		<PageContainer>
			<Navigator isLoading={isLoading} data={data} />
			{isLoading && <CircularProgress />}
			{data && data.current ? (
				<ContentContainer maxWidth="md">
					{isQuizz ? <Quizz quizz={data} /> : <Lesson lesson={data.current} />}
				</ContentContainer>
			) : (
				<Typography variant="h5">Oups, une erreur est survenue !</Typography>
			)}
		</PageContainer>
	);
};

export default LessonPage;
