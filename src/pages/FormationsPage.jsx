import Formations from "@components/Formations";
import styled from "styled-components";

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

const FormationsPage = () => {
	return (
		<PageContainer>
			<Formations />
		</PageContainer>
	);
};

export default FormationsPage;
