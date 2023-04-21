import FormationCreateForm from "@/components/FormationCreateForm/FormationCreateForm";
import { Container, Typography } from "@mui/material";
import styled from "styled-components";

const PageContainer = styled.div`
	padding-block: 1rem;
	padding-inline: 1rem;
	height: 100%;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		padding-block: 1.5rem;
		padding-inline: 1.5rem;
	}
`;

const FormContainer = styled(Container)`
	display: flex !important;
	flex-direction: column;
	row-gap: 2rem;
	border-radius: 0.25rem;
	padding: 1rem;
	background-color: var(--neutral100);
`;

const FormationCreatePage = () => {
	return (
		<PageContainer>
			<FormContainer maxWidth="md">
				<Typography variant="h5">Commencez à créer votre formation</Typography>
				<FormationCreateForm />
			</FormContainer>
		</PageContainer>
	);
};

export default FormationCreatePage;
